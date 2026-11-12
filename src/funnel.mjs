import { CEZ, CEZ_SRC } from './cez.mjs';

const faq = (seg) => [
  ['Koho se zdražení týká?', `Zákazníků ČEZ Prodej se smlouvou na dobu neurčitou bez fixace – stávajících i nových, u elektřiny i plynu. Podle ČTK jde o ${CEZ.customers} zákazníků. Kdo má platnou fixaci, toho se během fixace netýká.`],
  ['Od kdy nové ceny platí?', `Od ${CEZ.effective}.`],
  ['O kolik se cena zvyšuje?', `Elektřina: podle ceníků ČEZ o 330 Kč/MWh s DPH (u některých dvoutarifních sazeb domácností o 340 Kč/MWh ve vysokém tarifu), u domácností a podnikatelů. Plyn pro domácnosti: podle ČEZ o zhruba ${CEZ.plKcMwhVat} Kč/MWh s DPH. Stálá měsíční platba se nemění.`],
  ['Můžu odejít bez pokuty?', `Domácnosti a podnikající fyzické osoby ano: podle § 11a energetického zákona můžete smlouvu vypovědět bez postihu do 10. dne před účinností zdražení, tedy výpověď odeslat do ${CEZ.deadline}. Smlouva skončí ${CEZ.endOld}.`],
  ['A co s.r.o., SVJ nebo družstvo?', 'Zákonné právo podle § 11a se vztahuje na spotřebitele a podnikající fyzické osoby. U právnických osob rozhodují smlouva a obchodní podmínky ČEZ; zkontrolujte oznámení o změně ceny.'],
  ['Co když jsem žádné oznámení nedostal?', `Dodavatel musí zdražení oznámit nejpozději 30. den před účinností (do ${CEZ.notifyBy}) způsobem podle smlouvy. Bez řádného oznámení zdražení podle zákona nemá právní účinky.`],
  ['Kolik zaplatím navíc?', 'Zhruba rozdíl ceny za MWh × vaše roční spotřeba v MWh. Spotřebu najdete na ročním vyúčtování. Regulovanou část ceny na rok 2027 stanoví ERÚ a je stejná u všech dodavatelů.'],
  ['Musím odejít?', 'Ne. Pokud vám nová cena vyhovuje, nemusíte dělat nic. Smlouvu na dobu neurčitou můžete vypovědět i později s tříměsíční výpovědní dobou.'],
];

const quiz = (seg) => `
<section class="quiz" id="kviz" data-seg="${seg}"><h2>Týká se vás zdražení? Tři otázky</h2>
<form class="quizform" novalidate>
<fieldset><legend>1. Od koho máte energii?</legend>
<label class="ch"><input type="radio" name="q1" value="el"> Elektřinu od ČEZ</label>
<label class="ch"><input type="radio" name="q1" value="pl"> Plyn od ČEZ</label>
<label class="ch"><input type="radio" name="q1" value="oboje"> Elektřinu i plyn od ČEZ</label>
<label class="ch"><input type="radio" name="q1" value="jiny"> Od jiného dodavatele</label>
<label class="ch"><input type="radio" name="q1" value="nevim"> Nevím</label></fieldset>
<fieldset><legend>2. Jakou máte smlouvu?</legend>
<label class="ch"><input type="radio" name="q2" value="neurcita"> Na dobu neurčitou / bez fixace</label>
<label class="ch"><input type="radio" name="q2" value="fixace"> S fixací ceny (na dobu určitou)</label>
<label class="ch"><input type="radio" name="q2" value="nevim"> Nevím</label></fieldset>
${seg === 'firmy' ? `<fieldset><legend>Kdo je odběratel?</legend>
<label class="ch"><input type="radio" name="forma" value="osvc"> Podnikající fyzická osoba (OSVČ)</label>
<label class="ch"><input type="radio" name="forma" value="po"> Firma (s.r.o., a.s.…), SVJ, družstvo</label></fieldset>` : ''}
<fieldset><legend>3. Kolik ročně spotřebujete? (nepovinné)</legend>
<div class="grid3"><label>Elektřina, MWh/rok<input name="q3el" inputmode="decimal" placeholder="např. 3"></label>
<label>Plyn, MWh/rok<input name="q3pl" inputmode="decimal" placeholder="např. 15"></label>
<label>nebo měsíční záloha, Kč<input name="q3z" inputmode="numeric" placeholder="např. 2000"></label></div>
<p class="muted">Spotřebu najdete na ročním vyúčtování (1 MWh = 1 000 kWh).</p></fieldset>
<button class="btn" type="submit">Vyhodnotit</button></form>
<div class="quizres" aria-live="polite" hidden></div></section>`;

const factsBox = (seg) => `
<ul class="facts-list">
<li><strong>Od ${CEZ.effective}</strong> zvyšuje ČEZ Prodej ceny elektřiny a plynu u smluv na dobu neurčitou (bez fixace) – podle ČTK u ${CEZ.customers} zákazníků.</li>
<li><strong>Elektřina +330 Kč/MWh s DPH</strong> ${seg === 'firmy' ? '(ceník pro podnikatele, sazby C01d–C56d)' : '(sazba D02d: z 3 860 na 4 190 Kč/MWh)'}${seg === 'firmy' ? '' : `, <strong>plyn zhruba +${CEZ.plKcMwhVat} Kč/MWh s DPH</strong>`}. Stálá platba se nemění.</li>
<li>${seg === 'firmy' ? 'Podnikající fyzické osoby mohou' : 'Můžete'} smlouvu <strong>bez sankce vypovědět</strong> – výpověď stačí <strong>odeslat do ${CEZ.deadline}</strong> (§ 11a energetického zákona).${seg === 'firmy' ? ' U s.r.o., SVJ a dalších právnických osob rozhoduje smlouva a obchodní podmínky.' : ''}</li>
</ul>`;

export function buildFunnel({ write, layout, leadForm, esc }) {
  const src = `<aside class="src"><h2>Zdroje</h2><ul>${CEZ_SRC.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('')}</ul>
<p class="muted">Ověřeno 12. 11. 2026. Informativní text, nenahrazuje právní poradenství; rozhoduje znění vaší smlouvy a oznámení dodavatele. Tento web není stránkou společnosti ČEZ.</p></aside>`;
  const faqHtml = (seg) => `<section class="faq"><h2>Časté otázky</h2>${faq(seg).map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>`;
  const page = (seg, h1, lead) => `<section class="hero"><p class="crumbs"><a href="/zdrazeni-cez">Zdražení ČEZ</a></p><h1>${h1}</h1><p class="lead-p">${lead}</p>
${factsBox(seg)}<p><a class="btn" href="#kviz">Ověřit, jestli se mě to týká</a> <a class="btn ghost" href="#poptavka">Chci srovnání nabídek</a></p></section>
${quiz(seg)}${leadForm('poptavka', { campaign: 'zdrazeni-cez', segment: seg === 'firmy' ? 'firma' : 'domacnost', title: 'Chcete porovnat nabídky a případně odejít?', thanks: '/zdrazeni-cez/dekujeme' })}
${faqHtml(seg)}<p><a href="/pruvodce/zdrazeni-cez-2027">Podrobný průvodce zdražením ČEZ</a></p>${src}`;
  const ldFaq = (seg) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq(seg).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })}</script>`;

  write('zdrazeni-cez/index.html', layout({ title: `Zdražení ČEZ od ${CEZ.effectiveShort} u smluv na dobu neurčitou – co dělat`, canonical: '/zdrazeni-cez', funnel: true,
    desc: `ČEZ Prodej od ${CEZ.effective} zdražuje elektřinu a plyn u smluv na dobu neurčitou. Ověřte, jestli se vás to týká, a do ${CEZ.deadline} můžete bez sankce odejít.`,
    body: `<section class="hero"><h1>ČEZ od ${CEZ.effective} zdražuje smlouvy na dobu neurčitou</h1>
<p class="lead-p">Domácnosti i podnikatelé bez fixace. Pokud se zdražením nesouhlasíte, můžete smlouvu bez sankce vypovědět – výpověď stačí odeslat do ${CEZ.deadline}.</p>
${factsBox('')}
<div class="cards split"><a class="card" href="/zdrazeni-cez/domacnost"><h3>Jsem domácnost</h3><p>Byt, dům, chata – smlouva na fyzickou osobu bez IČO.</p></a>
<a class="card" href="/zdrazeni-cez/firmy"><h3>Jsem podnikatel / firma / SVJ</h3><p>OSVČ, s.r.o., SVJ, družstvo – odběrné místo na IČO.</p></a></div></section>
${quiz('')}${leadForm('poptavka', { campaign: 'zdrazeni-cez', title: 'Chcete porovnat nabídky a případně odejít?', thanks: '/zdrazeni-cez/dekujeme' })}${faqHtml('')}${src}${ldFaq('')}` }));
  write('zdrazeni-cez/domacnost.html', layout({ title: `Zdražení ČEZ pro domácnosti od ${CEZ.effectiveShort} – co dělat`, canonical: '/zdrazeni-cez/domacnost', funnel: true,
    desc: `Domácnosti se smlouvou ČEZ na dobu neurčitou platí od ${CEZ.effective} víc. Výpověď bez sankce stačí odeslat do ${CEZ.deadline}.`,
    body: page('domacnost', `Zdražení ČEZ od ${CEZ.effective}: domácnosti`, `Máte-li od ČEZ elektřinu nebo plyn na dobu neurčitou, od ${CEZ.effective} zaplatíte víc. Spočítejte si dopad a rozhodněte se v klidu – zákonná lhůta běží do ${CEZ.deadline}.`) + ldFaq('domacnost') }));
  write('zdrazeni-cez/firmy.html', layout({ title: `Zdražení ČEZ pro podnikatele a firmy od ${CEZ.effectiveShort}`, canonical: '/zdrazeni-cez/firmy', funnel: true,
    desc: `ČEZ Prodej zvyšuje od ${CEZ.effective} ceny elektřiny pro podnikatele na dobu neurčitou o 330 Kč/MWh s DPH. Co mohou OSVČ a firmy udělat.`,
    body: page('firmy', `Zdražení ČEZ od ${CEZ.effective}: podnikatelé, firmy a SVJ`, `Ceník ČEZ „Elektřina na dobu neurčitou“ pro podnikatele se od ${CEZ.effective} zvyšuje o 330 Kč/MWh s DPH (272,73 Kč bez DPH). Podnikající fyzické osoby mohou bez sankce odejít; u právnických osob rozhoduje smlouva.`) + ldFaq('firmy') }));
  write('zdrazeni-cez/dekujeme.html', layout({ title: 'Děkujeme – zdražení ČEZ', canonical: '/zdrazeni-cez/dekujeme', funnel: true, desc: 'Děkujeme, ozveme se vám.',
    body: `<section class="hero"><h1>Děkujeme, máme to</h1><p class="lead-p">Ozveme se vám zpravidla do jednoho pracovního dne a projdeme s vámi současnou smlouvu a nabídky. Nic nepodepisujete předem.</p></section>
<section class="art"><h2>Co si připravit</h2><ul>
<li>poslední roční vyúčtování od ČEZ (je na něm spotřeba, EAN u elektřiny / EIC u plynu, sazba a jistič),</li>
<li>oznámení ČEZ o změně ceny, pokud vám přišlo,</li>
<li>údaje odběratele: u domácnosti jméno, datum narození a adresu; u firmy IČO a kdo podepisuje; u SVJ kdo jedná za společenství,</li>
<li>číslo zákaznického účtu ČEZ nebo přístup do zákaznického portálu.</li></ul>
<h2>Důležité datum</h2><p>Výpověď bez sankce kvůli zdražení je potřeba <strong>odeslat do ${CEZ.deadline}</strong> (domácnosti a podnikající fyzické osoby). Pokud změnu vyřídí nový dodavatel, podá výpověď za vás na základě plné moci.</p>
<p><a href="/pruvodce/dokumenty-ke-zmene-dodavatele">Podrobně: jaké dokumenty potřebujete</a> · <a href="/pruvodce/zdrazeni-cez-2027">Průvodce zdražením ČEZ</a></p></section>` }));
  return ['/zdrazeni-cez', '/zdrazeni-cez/domacnost', '/zdrazeni-cez/firmy'];
}
