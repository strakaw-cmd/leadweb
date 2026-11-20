// Cloudflare Pages Function: POST /api/lead → (volitelně) KV `LEADS` jako záloha + přeposlání do CRM porovnanienergii.cz/api/send-msg.
// Žádné e-maily ani SMS se odsud neposílají. Žádný API klíč není potřeba (send-msg je veřejný endpoint webových formulářů).
const SEG = { domacnost: 'Domácnost', firma: 'Firma / podnikatel', svj: 'SVJ / bytový dům' };
const KOM = { elektrina: 'Elektřina', plyn: 'Plyn', oboje: 'Elektřina i plyn' };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
export async function onRequestPost({ request, env }) {
  let d; try { d = await request.json(); } catch { return json({ ok: false }, 400); }
  if (d.website) return json({ ok: true });
  if (typeof d.ts === 'number' && Date.now() - d.ts < 2500) return json({ ok: true });
  const name = String(d.name || '').trim().slice(0, 120), email = String(d.email || '').trim().slice(0, 160);
  const phone = String(d.phone || '').replace(/[\s-]+/g, '').replace(/^(?:\+|00)420(?=\d{9}$)/, '').slice(0, 20);
  const err = {};
  if (name.length < 2) err.name = 'Vyplňte jméno.';
  if (!/^\d{9}$/.test(phone)) err.phone = 'Telefon zadejte jako 9 číslic (případně s +420).';
  if (!/^[^\s()<>@,;:/]+@\w[\w.-]+\.[a-z]{2,}$/i.test(email)) err.email = 'Zkontrolujte e-mail.';
  if (!SEG[d.segment]) err.segment = 'Vyberte typ odběrného místa.';
  if (!KOM[d.komodita]) err.komodita = 'Vyberte elektřinu nebo plyn.';
  if (d.gdpr !== true) err.gdpr = 'Bez souhlasu nemůžeme údaje zpracovat.';
  if (Object.keys(err).length) return json({ ok: false, errors: err }, 422);
  const id = crypto.randomUUID(), t = new Date().toISOString(), tag = env.SITE_TAG || 'zmenitdodavatele-web';
  const lead = { id, t, name, phone, email, segment: d.segment, komodita: d.komodita, note: String(d.note || '').slice(0, 1000), page: String(d.page || '').slice(0, 200), utm: d.utm || {},
    campaign: d.campaign === 'zdrazeni-cez' ? 'zdrazeni-cez' : '', quiz: String(d.quiz || '').slice(0, 600) };
  const camp = lead.campaign ? '[Zdražení ČEZ – neurčitá smlouva] ' : '';
  if (env.LEADS) await env.LEADS.put(`lead:${t}:${id}`, JSON.stringify(lead));
  const message = [`Jméno: ${name}`, `Telefon: ${phone}`, `E-mail: ${email}`, `Typ odběrného místa: ${SEG[d.segment]}`, `Komodita: ${KOM[d.komodita]}`,
    `Poznámka: ${lead.note || '-'}`, ...(lead.campaign ? [`Kampaň: ${lead.campaign}`, `Odpovědi z kvízu: ${lead.quiz || '-'}`] : []), `Stránka: ${lead.page || '-'}`, `Zdroj: ${tag} (obsahový web)`, `Souhlas GDPR: ano (${t})`, `ID na webu: ${id}`].join('\n');
  const body = new URLSearchParams({ h: '1', name, email, t: phone, subject: `${camp}Lead z webu ${tag}: ${SEG[d.segment]} – ${KOM[d.komodita]}`, promo: env.LEAD_SOURCE || 'zmenitdodavatele', marketing_optin: '0', message });
  for (const [k, v] of Object.entries(lead.utm)) if (typeof v === 'string') body.append(k, v.slice(0, 200));
  let ok = false;
  try { const r = await fetch('https://porovnanienergii.cz/api/send-msg', { method: 'POST', body, headers: { Accept: 'application/json' } }); const j = await r.json().catch(() => null); ok = r.ok && Array.isArray(j) && j.length === 3; } catch {}
  if (env.LEADS) await env.LEADS.put(`crm:${id}`, JSON.stringify({ ok, t: new Date().toISOString() }));
  return ok || env.LEADS ? json({ ok: true }) : json({ ok: false, error: 'Odeslání se nepovedlo, zkuste to prosím znovu.' }, 502);
}
