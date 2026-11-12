import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles, SOURCES } from './articles.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const BRAND = 'Změnit dodavatele';
const SITE_URL = process.env.SITE_URL || '';
const OPERATOR = 'Václav Straka, IČO 86776606, Emilie Floriánové 724/21, 466 01 Jablonec nad Nisou';
const CONTACT_EMAIL = 'info@porovnanienergii.cz';
const write = (rel, s) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const calcs = [
  ['uspora-elektrina', 'Kalkulačka úspory za elektřinu'],
  ['uspora-plyn', 'Kalkulačka úspory za plyn'],
  ['termin-vypovedi', 'Kdy podat výpověď'],
];
function layout({ title, desc, body, canonical = '' }) {
  return `<!doctype html><html lang="cs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
${SITE_URL ? `<link rel="canonical" href="${SITE_URL}${canonical}">` : '<meta name="robots" content="noindex">'}
<link rel="stylesheet" href="/style.css"><link rel="icon" href="/favicon.svg" type="image/svg+xml"></head><body>
<header class="top"><div class="wrap"><a class="logo" href="/">⚡ ${BRAND}</a><nav><a href="/pruvodce/">Průvodci</a><a href="/kalkulacky/">Kalkulačky</a><a class="btn sm" href="/#poptavka">Chci nabídku</a></nav></div></header>
<main class="wrap">${body}</main>
<footer><div class="wrap"><p><strong>${BRAND}</strong> – průvodce změnou dodavatele elektřiny a plynu. Provozovatel: ${OPERATOR}.</p>
<p><a href="/ochrana-osobnich-udaju">Ochrana osobních údajů</a> · Web nepoužívá cookies ani reklamní sledování. · Ceny konkrétních dodavatelů neuvádíme – pro nezávislé srovnání veřejných nabídek viz <a href="https://srovnavac.eru.gov.cz/" target="_blank" rel="noopener">srovnávač ERÚ</a>.</p></div></footer>
<script src="/app.js" defer></script></body></html>`;
}
const leadForm = (id = 'poptavka') => `
<section class="lead" id="${id}"><h2>Chcete pomoct se změnou dodavatele?</h2>
<p>Nechte nám kontakt. Ozve se vám člověk, projde s vámi současnou smlouvu a připraví srovnání. Nezávazně a zdarma.</p>
<form class="leadform" novalidate>
<div class="grid2"><label>Jméno a příjmení<input name="name" autocomplete="name" required></label>
<label>Telefon<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="např. 777 123 456" required></label></div>
<label>E-mail<input name="email" type="email" autocomplete="email" required></label>
<fieldset><legend>Typ odběrného místa</legend>
<label class="ch"><input type="radio" name="segment" value="domacnost" required> Domácnost</label>
<label class="ch"><input type="radio" name="segment" value="firma"> Firma / podnikatel</label>
<label class="ch"><input type="radio" name="segment" value="svj"> SVJ / bytový dům</label></fieldset>
<fieldset><legend>Energie</legend>
<label class="ch"><input type="radio" name="komodita" value="elektrina" required> Elektřina</label>
<label class="ch"><input type="radio" name="komodita" value="plyn"> Plyn</label>
<label class="ch"><input type="radio" name="komodita" value="oboje"> Obojí</label></fieldset>
<label>Poznámka (nepovinné)<textarea name="note" rows="2" placeholder="např. kdy končí fixace, kdy se vám hodí zavolat"></textarea></label>
<div class="hp" aria-hidden="true"><label>Web<input name="website" tabindex="-1" autocomplete="off"></label></div>
<label class="ch gdpr"><input type="checkbox" name="gdpr" required> Souhlasím se zpracováním uvedených osobních údajů za účelem kontaktování a přípravy nabídky energií. Správce: Václav Straka, IČO 86776606. Souhlas mohu kdykoli odvolat. <a href="/ochrana-osobnich-udaju" target="_blank">Více o zpracování</a>.</label>
<button class="btn" type="submit">Odeslat a chci zavolat</button><div class="status" role="status" aria-live="polite"></div>
</form></section>`;

// ---------- domů ----------
const artCards = articles.map((a) => `<a class="card" href="/pruvodce/${a.slug}"><h3>${esc(a.title)}</h3><p>${esc(a.desc)}</p></a>`).join('');
write('index.html', layout({ title: `${BRAND} – průvodce změnou dodavatele elektřiny a plynu`, canonical: '/',
  desc: 'Jak přejít k jinému dodavateli elektřiny a plynu: lhůty výpovědi, konec fixace, potřebné dokumenty, kalkulačky úspory. Pro domácnosti, firmy i SVJ.',
  body: `<section class="hero"><h1>Změna dodavatele elektřiny a plynu bez chyb</h1>
<p class="lead-p">Srozumitelní průvodci a kalkulačky: kdy můžete smlouvu vypovědět, kolik reálně ušetříte a co si připravit. Pro domácnosti, firmy i SVJ.</p>
<p><a class="btn" href="/kalkulacky/termin-vypovedi">Spočítat termín výpovědi</a> <a class="btn ghost" href="/kalkulacky/uspora-elektrina">Spočítat úsporu</a></p></section>
<section><h2>Kalkulačky</h2><div class="cards">${calcs.map(([s, t]) => `<a class="card" href="/kalkulacky/${s}"><h3>${t}</h3></a>`).join('')}</div></section>
<section><h2>Průvodci</h2><div class="cards">${artCards}</div></section>
<section class="facts"><h2>Tři věci, které je dobré vědět</h2><ul>
<li>Smlouvu na dobu neurčitou můžete vypovědět kdykoli bez sankce; standardní výpovědní doba je tři měsíce (zdroj: ERÚ).</li>
<li>Při automatickém prodloužení musí výpověď dorazit nejpozději 20. den před koncem smlouvy (zdroj: ERÚ).</li>
<li>Změnou dodavatele měníte jen neregulovanou část ceny – distribuce zůstává stejná.</li></ul></section>
${leadForm()}` }));

// ---------- průvodci ----------
write('pruvodce/index.html', layout({ title: `Průvodci změnou dodavatele | ${BRAND}`, canonical: '/pruvodce/', desc: 'Články o změně dodavatele energií, výpovědi, fixaci, přepisu, SVJ a firmách.',
  body: `<h1>Průvodci</h1><div class="cards">${artCards}</div>` }));
for (const a of articles) {
  const src = a.sources.map((k) => `<li><a href="${SOURCES[k][1]}" target="_blank" rel="noopener">${SOURCES[k][0]}</a></li>`).join('');
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 4).map((x) => `<li><a href="/pruvodce/${x.slug}">${esc(x.title)}</a></li>`).join('');
  write(`pruvodce/${a.slug}.html`, layout({ title: `${a.title} | ${BRAND}`, desc: a.desc, canonical: `/pruvodce/${a.slug}`,
    body: `<article class="art"><p class="crumbs"><a href="/pruvodce/">Průvodci</a></p><h1>${esc(a.title)}</h1>${a.body}
<aside class="src"><h2>Zdroje</h2><ul>${src}</ul><p class="muted">Text má informativní charakter a nenahrazuje právní poradenství. Rozhodující je znění vaší smlouvy a platných předpisů. Aktualizováno 12. 11. 2026.</p></aside>
<aside><h2>Další průvodci</h2><ul>${others}</ul></aside></article>${leadForm()}` }));
}

// ---------- kalkulačky ----------
write('kalkulacky/index.html', layout({ title: `Kalkulačky | ${BRAND}`, canonical: '/kalkulacky/', desc: 'Kalkulačky úspory za elektřinu a plyn a termínu výpovědi smlouvy.',
  body: `<h1>Kalkulačky</h1><div class="cards">${calcs.map(([s, t]) => `<a class="card" href="/kalkulacky/${s}"><h3>${t}</h3></a>`).join('')}</div>` }));
const calcNote = `<p class="muted">Kalkulačka počítá jen s čísly, která zadáte (z vyúčtování a z nabídky). Ceny dodavatelů ani regulované ceny nedoplňujeme. Distribuce a další regulované složky jsou u všech dodavatelů v daném místě stejné (<a href="https://eru.gov.cz/ceny-energii" target="_blank" rel="noopener">ERÚ: Ceny energií</a>), proto do úspory nevstupují. Veřejné nabídky porovná <a href="https://srovnavac.eru.gov.cz/" target="_blank" rel="noopener">srovnávač ERÚ</a>.</p>`;
const num = (n, l, ph = '', extra = '') => `<label>${l}<input name="${n}" inputmode="decimal" placeholder="${ph}" ${extra}></label>`;
write('kalkulacky/uspora-elektrina.html', layout({ title: `Kalkulačka úspory za elektřinu | ${BRAND}`, canonical: '/kalkulacky/uspora-elektrina',
  desc: 'Spočítejte, kolik ročně ušetříte změnou dodavatele elektřiny: porovnání ceny za MWh, stálého platu a smluvní pokuty.',
  body: `<h1>Kalkulačka úspory za elektřinu</h1><p>Zadejte spotřebu a ceny <strong>bez DPH</strong> z vyúčtování a z nabídky, kterou zvažujete. Spočítáme rozdíl v neregulované části ceny.</p>
<form class="calc" data-calc="el"><fieldset><legend>Roční spotřeba</legend><div class="grid2">${num('vt', 'Vysoký tarif (VT), kWh/rok', 'např. 2500')}${num('nt', 'Nízký tarif (NT), kWh/rok', '0 pokud nemáte')}</div></fieldset>
<fieldset><legend>Současná smlouva</legend><div class="grid3">${num('c_vt', 'Cena VT, Kč/MWh bez DPH')}${num('c_nt', 'Cena NT, Kč/MWh bez DPH')}${num('c_fix', 'Stálý plat, Kč/měsíc bez DPH')}</div></fieldset>
<fieldset><legend>Nová nabídka</legend><div class="grid3">${num('n_vt', 'Cena VT, Kč/MWh bez DPH')}${num('n_nt', 'Cena NT, Kč/MWh bez DPH')}${num('n_fix', 'Stálý plat, Kč/měsíc bez DPH')}</div>
<div class="grid2">${num('penalty', 'Smluvní pokuta při předčasném odchodu, Kč (nepovinné)', '0')}${num('vat', 'Sazba DPH, %', '', 'value="21"')}</div></fieldset>
<button class="btn" type="submit">Spočítat</button><div class="result" aria-live="polite"></div></form>${calcNote}${leadForm()}` }));
write('kalkulacky/uspora-plyn.html', layout({ title: `Kalkulačka úspory za plyn | ${BRAND}`, canonical: '/kalkulacky/uspora-plyn',
  desc: 'Spočítejte roční úsporu při změně dodavatele plynu, včetně přepočtu m³ na kWh podle koeficientu z vyúčtování.',
  body: `<h1>Kalkulačka úspory za plyn</h1><p>Spotřebu zadejte v kWh, nebo v m³ s přepočtovým koeficientem z vyúčtování (objem × koeficient = kWh). Ceny <strong>bez DPH</strong>.</p>
<form class="calc" data-calc="pl"><fieldset><legend>Roční spotřeba</legend><div class="grid3">${num('kwh', 'Spotřeba, kWh/rok', 'např. 15000')}${num('m3', 'nebo spotřeba v m³/rok')}${num('coef', 'Koeficient kWh/m³ z vyúčtování', 'např. 10,6')}</div>
<p class="muted">Koeficient (spalné teplo × přepočet objemu) se mění podle místa a období, proto ho opište z vyúčtování.</p></fieldset>
<fieldset><legend>Současná smlouva</legend><div class="grid2">${num('c_p', 'Cena plynu, Kč/MWh bez DPH')}${num('c_fix', 'Stálý plat, Kč/měsíc bez DPH')}</div></fieldset>
<fieldset><legend>Nová nabídka</legend><div class="grid2">${num('n_p', 'Cena plynu, Kč/MWh bez DPH')}${num('n_fix', 'Stálý plat, Kč/měsíc bez DPH')}</div>
<div class="grid2">${num('penalty', 'Smluvní pokuta při předčasném odchodu, Kč (nepovinné)', '0')}${num('vat', 'Sazba DPH, %', '', 'value="21"')}</div></fieldset>
<button class="btn" type="submit">Spočítat</button><div class="result" aria-live="polite"></div></form>${calcNote}${leadForm()}` }));
write('kalkulacky/termin-vypovedi.html', layout({ title: `Kdy podat výpověď smlouvy na energie | ${BRAND}`, canonical: '/kalkulacky/termin-vypovedi',
  desc: 'Spočítejte nejbližší konec smlouvy na elektřinu nebo plyn a poslední den pro doručení výpovědi podle typu smlouvy.',
  body: `<h1>Kdy podat výpověď</h1><p>Vyberte typ smlouvy. Výpočet vychází z pravidel, která pro spotřebitele popisuje <a href="https://eru.gov.cz/smlouva-s-dodavatelem" target="_blank" rel="noopener">ERÚ</a>. Rozhoduje datum <strong>doručení</strong> výpovědi.</p>
<form class="calc" data-calc="vypoved"><fieldset><legend>Typ smlouvy</legend>
<label class="ch"><input type="radio" name="typ" value="neurcita" checked> Na dobu neurčitou</label>
<label class="ch"><input type="radio" name="typ" value="urcita"> Na dobu určitou s automatickým prodloužením (fixace)</label>
<label class="ch"><input type="radio" name="typ" value="stehovani"> Stěhuji se / zaniklo mi právo užívat odběrné místo</label></fieldset>
<div class="t-neurcita t-stehovani"><div class="grid2"><label>Kdy výpověď dorazí dodavateli<input type="date" name="doruceni"></label>
<label class="t-neurcita">Výpovědní doba (měsíce)<input name="mesice" inputmode="numeric" value="3"></label></div></div>
<div class="t-urcita" hidden><label>Konec sjednané doby smlouvy<input type="date" name="konec"></label></div>
<button class="btn" type="submit">Spočítat</button><div class="result" aria-live="polite"></div></form>
<p class="muted">Kratší výpovědní doba může být sjednaná ve smlouvě. Výpočet je orientační; u právnických osob (firmy, SVJ) se řiďte smlouvou.</p>${leadForm()}` }));

// ---------- ostatní ----------
write('ochrana-osobnich-udaju.html', layout({ title: `Ochrana osobních údajů | ${BRAND}`, canonical: '/ochrana-osobnich-udaju', desc: 'Informace o zpracování osobních údajů z kontaktního formuláře.',
  body: `<article class="art"><h1>Ochrana osobních údajů</h1>
<p><strong>Správce:</strong> ${OPERATOR}. Kontakt pro dotazy a uplatnění práv: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
<h2>Jaké údaje a proč</h2><p>Z formuláře zpracováváme jméno, telefon, e-mail, typ odběrného místa, druh energie a případnou poznámku. Účelem je kontaktovat vás a připravit nabídku nebo srovnání dodávky energií. Právním základem je váš souhlas (čl. 6 odst. 1 písm. a GDPR) a jednání o smlouvě na vaši žádost (čl. 6 odst. 1 písm. b GDPR).</p>
<h2>Kde údaje ukládáme</h2><p>Údaje se uloží na serveru tohoto webu a předají se do zákaznického systému (CRM) porovnanienergii.cz, ve kterém s nimi pracují osoby pověřené správcem. Údaje nepředáváme k reklamním účelům třetím stranám.</p>
<h2>Jak dlouho</h2><p>Po dobu nezbytnou k vyřízení poptávky, nejdéle 2 roky od posledního kontaktu, pokud nevznikne smluvní vztah.</p>
<h2>Vaše práva</h2><p>Máte právo souhlas kdykoli odvolat, požadovat přístup k údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost a podat stížnost u Úřadu pro ochranu osobních údajů (uoou.gov.cz).</p>
<h2>Cookies a měření návštěvnosti</h2><p>Web nepoužívá cookies. Návštěvnost měříme anonymně na vlastním serveru: ukládáme navštívenou stránku, odkazující doménu a denně se měnící anonymní identifikátor, ze kterého nelze zpětně zjistit IP adresu ani vás identifikovat.</p></article>` }));
write('dekujeme.html', layout({ title: `Děkujeme | ${BRAND}`, desc: 'Děkujeme za zprávu.', body: `<h1>Děkujeme</h1><p>Vaše údaje máme. Ozveme se vám zpravidla do jednoho pracovního dne.</p><p><a href="/pruvodce/">Zatím si přečtěte naše průvodce</a></p>` }));
write('404.html', layout({ title: `Stránka nenalezena | ${BRAND}`, desc: '', body: `<h1>Tuhle stránku jsme nenašli</h1><p><a href="/">Zpět na úvod</a></p>` }));
write('robots.txt', SITE_URL ? `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
const urls = ['/', '/pruvodce/', '/kalkulacky/', ...calcs.map(([s]) => `/kalkulacky/${s}`), ...articles.map((a) => `/pruvodce/${a.slug}`), '/ochrana-osobnich-udaju'];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${SITE_URL}${u}</loc></url>`).join('')}</urlset>`);
write('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0b6e4f"/><path d="M13 3 6 13h5l-1 8 7-10h-5z" fill="#ffd23f"/></svg>');
for (const f of ['style.css', 'app.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(OUT, f));
console.log('built', urls.length, 'pages');
