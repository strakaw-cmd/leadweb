// Lead-gen web: statické stránky z public/, POST /api/lead → data/leads.jsonl + přeposlání do CRM (porovnanienergii.cz/api/send-msg),
// analytika bez cookies (denní hash IP+UA s denně rotovanou solí, sůl se neukládá na disk).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(ROOT, 'public');
const DATA = process.env.DATA_DIR || path.join(ROOT, 'data');
fs.mkdirSync(DATA, { recursive: true });
const PORT = Number(process.env.PORT || 8787);
const CRM_URL = process.env.CRM_URL || 'https://porovnanienergii.cz/api/send-msg';
const CRM_ENABLED = process.env.CRM_ENABLED !== '0';
const SOURCE = process.env.LEAD_SOURCE || 'porovnanienergii.cz';
const SITE_TAG = process.env.SITE_TAG || 'zmenitdodavatele-web';
// tajná cesta ke statistikám (není to heslo do žádného systému, jen neveřejná adresa přehledu)
const STATS_PATH = '/' + (process.env.STATS_PATH || readOrCreate(path.join(DATA, 'stats-path.txt'), () => 'statistiky-' + crypto.randomBytes(6).toString('hex')));

function readOrCreate(f, gen) { try { return fs.readFileSync(f, 'utf8').trim(); } catch { const v = gen(); fs.writeFileSync(f, v); return v; } }
const append = (f, o) => fs.appendFileSync(path.join(DATA, f), JSON.stringify(o) + '\n');
const now = () => new Date().toISOString();

// ---------- analytika ----------
let salt = { day: '', v: '' };
function visitorId(req) {
  const day = new Date().toISOString().slice(0, 10);
  if (salt.day !== day) salt = { day, v: crypto.randomBytes(16).toString('hex') };
  const ip = (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
  return crypto.createHash('sha256').update(salt.v + ip + (req.headers['user-agent'] || '')).digest('hex').slice(0, 16);
}
const BOT_RE = /bot|crawl|spider|slurp|curl|wget|python|headless|monitor|preview|facebookexternalhit|node-fetch|go-http/i;
function track(req, pathname) {
  const ua = req.headers['user-agent'] || '';
  let ref = '';
  try { ref = req.headers.referer ? new URL(req.headers.referer).host : ''; } catch {}
  append('pageviews.jsonl', { t: now(), p: pathname, v: visitorId(req), ref, bot: BOT_RE.test(ua) ? 1 : 0 });
}
function stats() {
  let lines = [];
  try { lines = fs.readFileSync(path.join(DATA, 'pageviews.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)); } catch {}
  const human = lines.filter((l) => !l.bot);
  const byDay = {}, byPage = {}, byRef = {};
  for (const l of human) {
    const d = l.t.slice(0, 10);
    byDay[d] ??= { views: 0, visitors: new Set() }; byDay[d].views++; byDay[d].visitors.add(l.v);
    byPage[l.p] = (byPage[l.p] || 0) + 1;
    if (l.ref) byRef[l.ref] = (byRef[l.ref] || 0) + 1;
  }
  let leads = 0; try { leads = fs.readFileSync(path.join(DATA, 'leads.jsonl'), 'utf8').trim().split('\n').filter(Boolean).length; } catch {}
  const days = Object.entries(byDay).sort().reverse().map(([d, o]) => ({ day: d, views: o.views, visitors: o.visitors.size }));
  return { funnelZdrazeniCez: funnel(), totalViews: human.length, botViews: lines.length - human.length, visitorDaysSum: days.reduce((a, d) => a + d.visitors, 0), leads, days,
    topPages: Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 30), topReferrers: Object.entries(byRef).sort((a, b) => b[1] - a[1]).slice(0, 20) };
}
const escH = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function statsHtml(s) {
  const rows = (arr, f) => arr.map(f).join('');
  return `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Statistiky</title><style>body{font:15px system-ui;margin:2rem;max-width:900px}td,th{padding:.3rem .8rem;border-bottom:1px solid #ddd;text-align:left}</style>
<h1>Návštěvnost (bez cookies)</h1><p>Zobrazení stránek (lidé): <b>${s.totalViews}</b> · boti/nástroje: ${s.botViews} · leady uložené: <b>${s.leads}</b></p>
<p>Unikátní návštěvník = denní anonymní hash, proto se počítá po dnech.</p>
<h2>Funnel Zdražení ČEZ</h2><table><tr><td>Zobrazení landingu</td><td>${s.funnelZdrazeniCez.landingViews} (návštěvníko-dny ${s.funnelZdrazeniCez.landingVisitorDays})</td></tr><tr><td>Start kvízu</td><td>${s.funnelZdrazeniCez.quizStart}</td></tr><tr><td>Dokončený kvíz</td><td>${s.funnelZdrazeniCez.quizDone} ${escH(JSON.stringify(s.funnelZdrazeniCez.quizResults))}</td></tr><tr><td>Začal vyplňovat formulář</td><td>${s.funnelZdrazeniCez.formStart}</td></tr><tr><td>Odeslaný lead (kampaň)</td><td>${s.funnelZdrazeniCez.leads}</td></tr></table>
<h2>Po dnech</h2><table><tr><th>Den (UTC)</th><th>Návštěvníci</th><th>Zobrazení</th></tr>${rows(s.days, (d) => `<tr><td>${d.day}</td><td>${d.visitors}</td><td>${d.views}</td></tr>`)}</table>
<h2>Stránky</h2><table>${rows(s.topPages, ([p, n]) => `<tr><td>${escH(p)}</td><td>${n}</td></tr>`)}</table>
<h2>Odkud přišli</h2><table>${rows(s.topReferrers, ([p, n]) => `<tr><td>${escH(p)}</td><td>${n}</td></tr>`)}</table>`;
}

// ---------- leady ----------
const PHONE_LOCAL = (s) => s.replace(/[\s-]+/g, '').replace(/^(?:\+|00)420(?=\d{9}$)/, '');
const EMAIL_RE = /^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i;
const SEG = { domacnost: 'Domácnost', firma: 'Firma / podnikatel', svj: 'SVJ / bytový dům' };
const KOM = { elektrina: 'Elektřina', plyn: 'Plyn', oboje: 'Elektřina i plyn' };
const rate = new Map();
function limited(ip) {
  const t = Date.now(), arr = (rate.get(ip) || []).filter((x) => t - x < 3600e3);
  arr.push(t); rate.set(ip, arr); return arr.length > 5;
}
async function forwardToCrm(lead) {
  const camp = lead.campaign === 'zdrazeni-cez' ? '[Zdražení ČEZ – neurčitá smlouva] ' : '';
  const subject = `${camp}Lead z webu ${SITE_TAG}: ${SEG[lead.segment]} – ${KOM[lead.komodita]}`;
  const message = [
    `Jméno: ${lead.name}`, `Telefon: ${lead.phone || '-'}`, `E-mail: ${lead.email || '-'}`,
    `Typ odběrného místa: ${SEG[lead.segment]}`, `Komodita: ${KOM[lead.komodita]}`, `Poznámka: ${lead.note || '-'}`,
    ...(lead.campaign ? [`Kampaň: ${lead.campaign}`, `Odpovědi z kvízu: ${lead.quiz || '-'}`] : []),
    `Stránka: ${lead.page || '-'}`, `Zdroj: ${SITE_TAG} (obsahový web)`, `Souhlas GDPR: ano (${lead.t})`, `ID na webu: ${lead.id}`,
  ].join('\n');
  const body = new URLSearchParams({ h: '1', name: lead.name, email: lead.email, t: lead.phone, subject, promo: SOURCE, marketing_optin: '0', message });
  for (const [k, v] of Object.entries(lead.utm || {})) body.append(k, v);
  const r = await fetch(CRM_URL, { method: 'POST', body, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20e3) });
  const text = await r.text();
  let j = null; try { j = JSON.parse(text); } catch {}
  return { status: r.status, ok: r.ok && Array.isArray(j) && j.length === 3, body: text.slice(0, 500) };
}
async function handleLead(req, res) {
  let raw = '';
  for await (const c of req) { raw += c; if (raw.length > 20000) return send(res, 413, { ok: false }); }
  let d; try { d = JSON.parse(raw); } catch { return send(res, 400, { ok: false, error: 'bad json' }); }
  const ip = (req.headers['cf-connecting-ip'] || req.socket.remoteAddress || '').toString();
  if (d.website || d.company_url) { append('spam.jsonl', { t: now(), reason: 'honeypot' }); return send(res, 200, { ok: true }); }
  if (typeof d.ts === 'number' && Date.now() - d.ts < 2500) { append('spam.jsonl', { t: now(), reason: 'too fast' }); return send(res, 200, { ok: true }); }
  if (limited(ip)) return send(res, 429, { ok: false, error: 'Příliš mnoho odeslání, zkuste to později.' });
  const name = String(d.name || '').trim().slice(0, 120), email = String(d.email || '').trim().slice(0, 160);
  const phone = PHONE_LOCAL(String(d.phone || '').trim()).slice(0, 20);
  const segment = SEG[d.segment] ? d.segment : null, komodita = KOM[d.komodita] ? d.komodita : null;
  const err = {};
  if (name.length < 2) err.name = 'Vyplňte jméno.';
  if (!/^\d{9}$/.test(phone)) err.phone = 'Telefon zadejte jako 9 číslic (případně s +420).';
  if (!EMAIL_RE.test(email)) err.email = 'Zkontrolujte e-mail.';
  if (!segment) err.segment = 'Vyberte typ odběrného místa.';
  if (!komodita) err.komodita = 'Vyberte elektřinu nebo plyn.';
  if (d.gdpr !== true) err.gdpr = 'Bez souhlasu nemůžeme údaje zpracovat.';
  if (Object.keys(err).length) return send(res, 422, { ok: false, errors: err });
  const utm = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']) if (d.utm && typeof d.utm[k] === 'string') utm[k] = d.utm[k].slice(0, 200);
  const lead = { id: crypto.randomUUID(), t: now(), name, phone, email, segment, komodita, note: String(d.note || '').slice(0, 1000), page: String(d.page || '').slice(0, 200), utm,
    campaign: d.campaign === 'zdrazeni-cez' ? 'zdrazeni-cez' : '', quiz: String(d.quiz || '').slice(0, 600), consent: { gdpr: true, text: 'v1-2026-11-12' } };
  append('leads.jsonl', lead);
  let crm = { skipped: true };
  if (CRM_ENABLED) { try { crm = await forwardToCrm(lead); } catch (e) { crm = { ok: false, error: String(e) }; } }
  append('crm-log.jsonl', { t: now(), id: lead.id, crm });
  append('events.jsonl', { t: now(), e: 'lead', c: lead.campaign || '', p: lead.page, v: visitorId(req) });
  send(res, 200, { ok: true });
}

// ---------- události funnelu (bez osobních údajů) ----------
const EVENTS = new Set(['quiz_start', 'quiz_done', 'form_start']);
async function handleEvent(req, res) {
  let raw = ''; for await (const c of req) { raw += c; if (raw.length > 2000) break; }
  let d = {}; try { d = JSON.parse(raw); } catch {}
  if (EVENTS.has(d.e) && !BOT_RE.test(req.headers['user-agent'] || '')) append('events.jsonl', { t: now(), e: d.e, c: String(d.c || '').slice(0, 40), r: String(d.r || '').slice(0, 40), p: String(d.p || '').slice(0, 120), v: visitorId(req) });
  res.writeHead(204); res.end();
}
function funnel() {
  let ev = []; try { ev = fs.readFileSync(path.join(DATA, 'events.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)); } catch {}
  let pv = []; try { pv = fs.readFileSync(path.join(DATA, 'pageviews.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((l) => !l.bot); } catch {}
  const land = pv.filter((l) => l.p.startsWith('/zdrazeni-cez') && !l.p.includes('dekujeme'));
  const cnt = (e) => ev.filter((x) => x.e === e && (e !== 'lead' || x.c === 'zdrazeni-cez')).length;
  const results = {}; for (const x of ev) if (x.e === 'quiz_done') results[x.r] = (results[x.r] || 0) + 1;
  return { landingViews: land.length, landingVisitorDays: new Set(land.map((l) => l.t.slice(0, 10) + l.v)).size, quizStart: cnt('quiz_start'), quizDone: cnt('quiz_done'), formStart: cnt('form_start'), leads: cnt('lead'), quizResults: results };
}

// ---------- statika ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.json': 'application/json' };
function send(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); }
function serveFile(req, res, pathname) {
  let p = decodeURIComponent(pathname);
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(PUB, path.normalize(p).replace(/^(\.\.[/\\])+/, ''));
  if (!f.startsWith(PUB)) return false;
  if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  else if (fs.existsSync(f) && fs.statSync(f).isDirectory() && fs.existsSync(path.join(f, 'index.html'))) f = path.join(f, 'index.html');
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) return false;
  const ext = path.extname(f);
  res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
  if (ext === '.html') track(req, pathname);
  fs.createReadStream(f).pipe(res);
  return true;
}
http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  try {
    if (req.method === 'POST' && u.pathname === '/api/lead') return await handleLead(req, res);
    if (req.method === 'POST' && u.pathname === '/api/event') return await handleEvent(req, res);
    if (u.pathname === STATS_PATH) { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); return res.end(statsHtml(stats())); }
    if (u.pathname === STATS_PATH + '.json') return send(res, 200, stats());
    if (u.pathname === '/healthz') return send(res, 200, { ok: true });
    if (req.method === 'GET' || req.method === 'HEAD') { if (serveFile(req, res, u.pathname)) return; }
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(PUB, '404.html')).on('error', () => res.end('404')).pipe(res);
  } catch (e) { console.error(e); if (!res.headersSent) send(res, 500, { ok: false }); }
}).listen(PORT, '127.0.0.1', () => console.log(`leadweb on :${PORT}, stats ${STATS_PATH}`));
