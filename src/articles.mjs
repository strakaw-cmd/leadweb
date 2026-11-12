import { CEZ, CEZ_SRC, cezCallout } from './cez.mjs';
// Průvodci. Fakta k lhůtám podle ERÚ (eru.gov.cz – „Chci změnit dodavatele energií“, „Smlouva s dodavatelem“,
// „Vzory pro odstoupení, nebo výpověď smlouvy“, „Ceny energií“), ověřeno 12. 11. 2026.
const SRC = {
  zmena: ['ERÚ: Chci změnit dodavatele energií', 'https://eru.gov.cz/chci-zmenit-dodavatele-energii'],
  smlouva: ['ERÚ: Smlouva s dodavatelem', 'https://eru.gov.cz/smlouva-s-dodavatelem'],
  vzory: ['ERÚ: Vzory pro odstoupení, nebo výpověď smlouvy', 'https://eru.gov.cz/vzory-pro-odstoupeni-nebo-vypoved-smlouvy'],
  ceny: ['ERÚ: Ceny energií', 'https://eru.gov.cz/ceny-energii'],
  srovnavac: ['Srovnávač nabídek ERÚ', 'https://srovnavac.eru.gov.cz/'],
  cez0: CEZ_SRC[0], cez1: CEZ_SRC[1], cez2: CEZ_SRC[2], cez3: CEZ_SRC[3], cez4: CEZ_SRC[4], cez5: CEZ_SRC[5], cez6: CEZ_SRC[6],
  varovani: ['ERÚ: Varujeme spotřebitele, na co si dát pozor ve smlouvách', 'https://eru.gov.cz/varujeme-spotrebitele-na-co-si-dat-pozor-ve-smlouvach'],
};
export const articles = [
{
  slug: 'zdrazeni-cez-2027', title: `Zdražení ČEZ od ${CEZ.effective}: co dělat, když máte smlouvu na dobu neurčitou`,
  desc: `ČEZ Prodej od ${CEZ.effectiveShort} zvyšuje ceny elektřiny a plynu u smluv na dobu neurčitou. Koho se to týká, o kolik a do kdy můžete bez sankce odejít.`,
  sources: ['cez0', 'cez1', 'cez2', 'cez3', 'cez4', 'cez5', 'cez6', 'vzory'],
  body: `
<p>ČEZ Prodej 30. října 2026 oznámil, že od <strong>${CEZ.effective}</strong> zvýší ceny elektřiny a plynu zákazníkům se smlouvou <strong>na dobu neurčitou</strong> bez fixace – stávajícím i novým. Podle ČTK se to týká ${CEZ.customers} zákazníků. Kdo má platnou fixaci, toho se zdražení během fixace netýká.</p>
<h2>O kolik se cena mění</h2>
<p>Mění se obchodní (neregulovaná) cena za MWh. Stálá měsíční platba zůstává v cenících stejná. Srovnání ceníků ČEZ platných od 1. 1. 2026 a od 1. 1. 2027 (ceny s DPH):</p>
<table><thead><tr><th>Produkt „Elektřina na dobu neurčitou“</th><th>2026</th><th>od 1. 1. 2027</th><th>Rozdíl</th></tr></thead><tbody>
<tr><td>Domácnosti, sazba D01d / D02d</td><td>3 860 Kč/MWh</td><td>4 190 Kč/MWh</td><td>+330 Kč/MWh</td></tr>
<tr><td>Domácnosti, D25d–D27d (vysoký / nízký tarif)</td><td>3 960 / 3 700–3 650</td><td>4 300 / 4 030–3 980</td><td>+340 / +330</td></tr>
<tr><td>Domácnosti, D35d–D57d (vysoký / nízký tarif)</td><td>4 140 / 4 020</td><td>4 480 / 4 350</td><td>+340 / +330</td></tr>
<tr><td>Podnikatelé, C01d–C03d</td><td>4 100 Kč/MWh</td><td>4 430 Kč/MWh</td><td>+330 Kč/MWh</td></tr>
<tr><td>Podnikatelé, C25d–C56d (VT / NT)</td><td>4 199,99 / 3 900–4 100</td><td>4 530 / 4 230–4 430</td><td>+330</td></tr>
</tbody></table>
<p><strong>Plyn:</strong> podle ČEZ (citováno ČTK a iDNES) vzroste cena plynu bez fixace pro domácnosti o zhruba ${CEZ.plKcMwhVat} Kč/MWh s DPH na 1 740 Kč/MWh. Ceník plynu pro podnikatele jsme neověřili.</p>
<p>ČEZ uvádí, že na celkové faktuře to v průměru znamená +3,5 % u elektřiny a +6,5 % u plynu. Prakticky: rozdíl ceny za MWh × vaše roční spotřeba v MWh. Domácnost se spotřebou 3 MWh elektřiny zaplatí za samotnou dodávku zhruba o 990 Kč ročně víc. Regulovanou část ceny na rok 2027 stanoví ERÚ zvlášť a platí u všech dodavatelů stejně.</p>
<h2>Můžete odejít bez sankce – do ${CEZ.deadline}</h2>
<p>Podle § 11a energetického zákona platí pro <strong>spotřebitele (domácnosti) a podnikající fyzické osoby</strong> (OSVČ na nízkém napětí, u plynu do 630 MWh ročně):</p>
<ul>
<li>Dodavatel musí zdražení oznámit nejpozději 30. den před účinností, tedy u změny od ${CEZ.effectiveShort} do <strong>${CEZ.notifyBy}</strong>, a to způsobem podle smlouvy a s poučením o právu odejít. Bez řádného oznámení zdražení nemá právní účinky.</li>
<li>Pokud se zdražením nesouhlasíte, můžete smlouvu <strong>bez postihu vypovědět kdykoli do 10. dne před účinností</strong> – u změny od ${CEZ.effectiveShort} je to <strong>${CEZ.deadline}</strong>. Lhůta je zachována, pokud výpověď v této době <strong>odešlete</strong>. Smlouva pak skončí ${CEZ.endOld}.</li>
<li>Kdo nic neudělá, od ${CEZ.effectiveShort} platí nové ceny. Smlouvu na dobu neurčitou lze i potom vypovědět standardně s tříměsíční výpovědní dobou.</li>
</ul>
<p>Výpověď posílejte tak, abyste mohli doložit datum odeslání (zákaznický účet, datová schránka, doporučený dopis). ERÚ zveřejňuje <a href="https://eru.gov.cz/vzory-pro-odstoupeni-nebo-vypoved-smlouvy" target="_blank" rel="noopener">vzory výpovědí</a>.</p>
<h2>Firmy, SVJ a další právnické osoby</h2>
<p>Zákonné právo odejít bez postihu podle § 11a se vztahuje na spotřebitele a podnikající fyzické osoby. U s.r.o., a.s., SVJ či družstva rozhodují obchodní podmínky a smlouva s ČEZ – zkontrolujte, co uvádí oznámení o změně ceny a obchodní podmínky. Smlouvu na dobu neurčitou lze vypovědět s výpovědní dobou podle smlouvy (zákon uvádí tři měsíce).</p>
<h2>Jak postupovat</h2>
<ol>
<li>Ověřte na vyúčtování nebo v zákaznickém účtu ČEZ, že máte produkt na dobu neurčitou.</li>
<li>Porovnejte nabídky podle ceny za MWh, stálého platu, délky závazku a pokut (<a href="/kalkulacky/uspora-elektrina">kalkulačka úspory</a>, <a href="https://srovnavac.eru.gov.cz/" target="_blank" rel="noopener">srovnávač ERÚ</a>).</li>
<li>Podepište novou smlouvu s předstihem – nový dodavatel obvykle podá výpověď za vás a změnu zaregistruje tak, aby dodávka navázala od ${CEZ.effectiveShort}.</li>
<li>Nepodepisujte zároveň protinabídku stávajícího dodavatele, dokud nevíte, kterou smlouvu ukončíte.</li>
</ol>
<p><a class="btn" href="/zdrazeni-cez">Ověřit, jestli se vás zdražení týká</a></p>`,
},
{
  slug: 'jak-zmenit-dodavatele-energii', title: 'Jak změnit dodavatele elektřiny a plynu krok za krokem',
  desc: 'Praktický postup změny dodavatele energií: co zjistit ve smlouvě, jak vybrat nabídku, kdo podává výpověď a na co si dát pozor.',
  sources: ['zmena', 'smlouva', 'srovnavac'],
  body: `
${cezCallout('')}
<p>Změna dodavatele elektřiny nebo plynu není složitá, ale má pevné pořadí kroků. Kdo je přeskočí, riskuje smluvní pokutu nebo dvě platné smlouvy najednou. Tady je postup, který funguje pro domácnosti i menší firmy.</p>
<h2>1. Zjistěte, jakou smlouvu máte</h2>
<p>Nejdůležitější je, jestli máte smlouvu <strong>na dobu neurčitou</strong>, nebo <strong>na dobu určitou</strong> (často s fixací ceny).</p>
<ul>
<li><strong>Doba neurčitá:</strong> smlouvu můžete podle ERÚ vypovědět kdykoli, bez udání důvodu a bez sankce. Standardně běží tříměsíční výpovědní doba od prvního dne měsíce po doručení výpovědi; kratší lhůta může být ve smlouvě.</li>
<li><strong>Doba určitá:</strong> bez sankce ji lze ukončit jen v situacích daných zákonem nebo smlouvou, typicky ke konci sjednané doby. Pokud se smlouva automaticky prodlužuje (prolongace), výpověď musíte doručit nejpozději 20. den před koncem.</li>
</ul>
<p>Datum konce závazku najdete ve smlouvě a podle ERÚ i ve vyúčtování. Termín si můžete spočítat v naší <a href="/kalkulacky/termin-vypovedi">kalkulačce termínu výpovědi</a>.</p>
<h2>2. Porovnejte nabídky podle celkové ceny</h2>
<p>Dodavatel ovlivňuje jen neregulovanou část ceny: cenu silové elektřiny nebo plynu za MWh a stálý měsíční plat. Distribuce a další regulované složky jsou u všech dodavatelů v daném místě stejné. Srovnávejte proto cenu za MWh, stálý plat, délku závazku, smluvní pokutu a podmínky bonusů. Nezávislé srovnání veřejných nabídek nabízí <a href="https://srovnavac.eru.gov.cz/" rel="noopener" target="_blank">srovnávač ERÚ</a>, rozdíl v korunách si spočítáte v <a href="/kalkulacky/uspora-elektrina">kalkulačce úspory</a>.</p>
<h2>3. Podepište smlouvu s novým dodavatelem</h2>
<p>Nový dodavatel obvykle na základě plné moci vyřídí výpověď u původního dodavatele i samotnou změnu. Ověřte si, k jakému datu dodávka začne – mělo by navazovat na konec staré smlouvy.</p>
<h2>4. Pozor na protinabídku</h2>
<p>Po výpovědi se často ozve původní dodavatel s protinabídkou. ERÚ upozorňuje, že v jednom odběrném místě může dodávat jen jeden dodavatel – nepodepisujte druhou smlouvu, dokud nemáte jistotu, kterou z nich ukončíte a jak. Smlouvu podepsanou na pobočce dodavatele nelze bez pokuty vzít zpět.</p>
<h2>5. Odečet a vyúčtování</h2>
<p>K datu změny se provede odečet (u chytrých nebo dálkově odečítaných měřidel automaticky, jinak podle stavu měřidla). Původní dodavatel vystaví konečné vyúčtování, nový začne účtovat zálohy podle nové smlouvy.</p>
<h2>Co když si to rozmyslíte</h2>
<p>Smlouvu uzavřenou na dálku (online, po telefonu) nebo mimo obchodní prostory může spotřebitel do 14 dnů od uzavření odstoupit. Při změně dodavatele ji navíc může vypovědět až do 15. dne po zahájení dodávky. Podrobně v článku <a href="/pruvodce/vypoved-smlouvy-na-energie">Výpověď smlouvy na energie</a>.</p>`,
},
{
  slug: 'vypoved-smlouvy-na-energie', title: 'Výpověď smlouvy na energie: lhůty, které musíte znát',
  desc: 'Tři měsíce u doby neurčité, 20 dní před prolongací, 14 nebo 30 dní na odstoupení, 15 dní při stěhování. Přehled lhůt podle ERÚ.',
  sources: ['vzory', 'smlouva', 'zmena'],
  body: `
${cezCallout('')}
<p>Lhůty pro ukončení smlouvy na elektřinu nebo plyn se liší podle typu smlouvy a podle toho, kde a jak jste ji uzavřeli. Následující přehled vychází z informací Energetického regulačního úřadu (ERÚ) pro spotřebitele.</p>
<table><thead><tr><th>Situace</th><th>Lhůta</th></tr></thead><tbody>
<tr><td>Smlouva na dobu neurčitou</td><td>Výpověď kdykoli, bez sankce. Standardně tříměsíční výpovědní doba od 1. dne měsíce po doručení (ve smlouvě může být kratší).</td></tr>
<tr><td>Smlouva na dobu určitou s automatickým prodloužením</td><td>Výpověď lze podat kdykoli, nejpozději 20. den před koncem sjednané doby; smlouva skončí k tomuto konci.</td></tr>
<tr><td>Smlouva uzavřená na dálku nebo mimo obchodní prostory</td><td>Odstoupení do 14 dnů od uzavření (§ 1829 občanského zákoníku).</td></tr>
<tr><td>Smlouva z nevyžádané návštěvy doma nebo z prodejní akce</td><td>Odstoupení do 30 dnů od uzavření (§ 1829a občanského zákoníku).</td></tr>
<tr><td>Nová smlouva při změně dodavatele uzavřená na dálku / mimo prostory</td><td>Výpověď od podpisu až do 15. dne po zahájení dodávky, výpovědní doba 15 dnů od 1. dne následujícího měsíce (§ 11b energetického zákona).</td></tr>
<tr><td>Zánik vlastnického nebo užívacího práva k odběrnému místu (stěhování)</td><td>Výpověď bez postihu, výpovědní doba 15 dnů od 1. dne měsíce po doručení.</td></tr>
</tbody></table>
<h2>Prolongace: dodavatel vás musí upozornit</h2>
<p>Pokud se smlouva automaticky prodlužuje, dodavatel vám musí nejméně 30 dnů před prolongací prokazatelně oznámit cenu, platební podmínky, výši smluvní pokuty a dobu, na kterou se smlouva prodlužuje, včetně poučení o právu smlouvu vypovědět. Když to neudělá, hledí se na smlouvu po prolongaci jako na smlouvu na dobu neurčitou.</p>
<p>ERÚ upozorňuje, že někteří dodavatelé ve smlouvách nezákonně požadují výpověď výrazně dříve než 20 dní před koncem. Zákonná lhůta má přednost.</p>
<h2>Jak výpověď podat</h2>
<p>Výpověď musí být doručena dodavateli – rozhoduje datum doručení, ne odeslání. Ve většině případů ji za vás na základě plné moci podá nový dodavatel nebo zprostředkovatel. Pokud ji podáváte sami, ERÚ nabízí <a href="https://eru.gov.cz/vzory-pro-odstoupeni-nebo-vypoved-smlouvy" target="_blank" rel="noopener">vzory výpovědí a odstoupení</a>, které je potřeba upravit podle vaší smlouvy.</p>
<p>Termín pro vaši smlouvu spočítá <a href="/kalkulacky/termin-vypovedi">kalkulačka termínu výpovědi</a>.</p>`,
},
{
  slug: 'konec-fixace-ceny-energii', title: 'Konec fixace ceny energií: co hlídat a kdy jednat',
  desc: 'Jak zjistit, kdy vám končí fixace, co se stane po jejím konci a proč je dobré začít řešit novou smlouvu s předstihem.',
  sources: ['smlouva', 'varovani', 'ceny'],
  body: `
<p>Fixace znamená, že máte cenu silové elektřiny nebo plynu (a obvykle i stálý plat) pevně sjednanou na určitou dobu. Smlouva je pak zpravidla uzavřená na dobu určitou. Co se stane po konci fixace, záleží na smlouvě.</p>
<h2>Kde najdete datum konce</h2>
<ul><li>ve smlouvě nebo dodatku s produktem,</li><li>ve vyúčtování (podle ERÚ tam má být uvedeno datum ukončení závazku),</li><li>v zákaznickém portálu dodavatele.</li></ul>
<h2>Tři možné scénáře po konci fixace</h2>
<ol>
<li><strong>Automatická prolongace</strong> – smlouva se prodlouží o další období, často za ceník, který vám dodavatel oznámí. Oznámení musí přijít nejméně 30 dní předem.</li>
<li><strong>Přechod na dobu neurčitou</strong> – smlouva pokračuje bez závazku, typicky za standardní ceník dodavatele. Pak ji můžete vypovědět s výpovědní dobou podle smlouvy (standardně tři měsíce).</li>
<li><strong>Smlouva skončí</strong> – bez nové smlouvy by vám hrozil konec dodávky, proto je potřeba mít navazující smlouvu.</li>
</ol>
<h2>Kdy začít</h2>
<p>U prolongace musí výpověď dorazit nejpozději 20. den před koncem. Prakticky je rozumné začít srovnávat nabídky zhruba dva až tři měsíce před koncem fixace: máte čas porovnat ceny, podepsat novou smlouvu a nový dodavatel stihne vše vyřídit.</p>
<h2>Na co se dívat u nové fixace</h2>
<ul><li>cena za MWh (u elektřiny zvlášť vysoký a nízký tarif) a stálý měsíční plat,</li><li>délka závazku a smluvní pokuta za předčasné ukončení,</li><li>zda se smlouva sama prodlužuje a za jakou cenu,</li><li>zda je cena opravdu pevná, nebo navázaná na burzu (spotový produkt).</li></ul>
<p>Rozdíl mezi současnou cenou a nabídkou si spočítejte v <a href="/kalkulacky/uspora-elektrina">kalkulačce úspory za elektřinu</a> nebo <a href="/kalkulacky/uspora-plyn">za plyn</a>.</p>`,
},
{
  slug: 'dokumenty-ke-zmene-dodavatele', title: 'Jaké dokumenty a údaje potřebujete ke změně dodavatele',
  desc: 'EAN, EIC, poslední vyúčtování, údaje o odběrateli a plná moc. Kontrolní seznam, co si připravit před změnou dodavatele energií.',
  sources: ['zmena', 'srovnavac'],
  body: `
<p>Nejrychleji se změna vyřídí, když máte všechny údaje po ruce. Většinu najdete na posledním vyúčtování.</p>
<h2>Údaje o odběrném místě</h2>
<ul>
<li><strong>Elektřina – kód EAN:</strong> osmnáctimístné číslo odběrného místa (začíná 859182400…). Je na vyúčtování i ve smlouvě.</li>
<li><strong>Plyn – kód EIC:</strong> šestnáctimístný kód odběrného místa začínající 27ZG.</li>
<li>adresa odběrného místa a číslo elektroměru nebo plynoměru,</li>
<li>u elektřiny distribuční sazba (např. D02d, D25d, D57d) a hodnota hlavního jističe,</li>
<li>roční spotřeba v kWh nebo MWh (u elektřiny zvlášť vysoký a nízký tarif).</li>
</ul>
<h2>Údaje o odběrateli</h2>
<ul>
<li><strong>Domácnost:</strong> jméno, datum narození, adresa trvalého bydliště, kontakt.</li>
<li><strong>Firma / podnikatel:</strong> obchodní firma, IČO, sídlo, kdo za firmu podepisuje.</li>
<li><strong>SVJ:</strong> název a IČO společenství, kdo jedná za SVJ podle stanov (předseda, výbor), případně usnesení výboru nebo shromáždění.</li>
</ul>
<h2>Údaje o současné smlouvě</h2>
<ul><li>název současného dodavatele a produktu,</li><li>typ smlouvy (doba určitá / neurčitá) a datum konce závazku,</li><li>výpovědní doba a případná smluvní pokuta.</li></ul>
<h2>Plná moc</h2>
<p>Nový dodavatel nebo zprostředkovatel vás obvykle požádá o plnou moc, aby mohl za vás podat výpověď u současného dodavatele a vyřídit změnu. Čtěte, k čemu přesně plná moc opravňuje.</p>
<h2>Nevíte, kde co na faktuře je?</h2>
<p>Pošlete nám kontakt přes <a href="/#poptavka">formulář</a> a s fakturou vám pomůžeme. Údaje zpracujeme jen k vyřízení vašeho dotazu.</p>`,
},
{
  slug: 'prepis-odberneho-mista', title: 'Přepis odběrného místa vs. změna dodavatele',
  desc: 'Stěhování, nový nájemník, dědictví: kdy jde o přepis odběrného místa na jinou osobu a kdy o změnu dodavatele, a jak postupovat.',
  sources: ['smlouva', 'vzory'],
  body: `
<p>Dva pojmy, které se často pletou: <strong>změna dodavatele</strong> znamená, že v odběrném místě zůstává stejný odběratel, ale energii mu dodává jiná firma. <strong>Přepis</strong> znamená, že se mění odběratel – například při stěhování, změně nájemníka nebo prodeji nemovitosti.</p>
<h2>Kdy jde o přepis</h2>
<ul><li>stěhujete se a byt nebo dům přebírá někdo jiný,</li><li>pronajímatel mění nájemníka,</li><li>nemovitost se prodává nebo dědí,</li><li>odběrné místo přechází z osoby na firmu nebo naopak.</li></ul>
<h2>Jak přepis probíhá</h2>
<ol><li>Původní a nový odběratel se domluví na datu a stavu měřidla (ideálně společný zápis s fotkou).</li><li>Nový odběratel uzavře smlouvu s dodavatelem podle svého výběru – nemusí zůstat u stejného dodavatele.</li><li>Původní odběratel ukončí svou smlouvu.</li></ol>
<h2>Ukončení smlouvy při odstěhování</h2>
<p>Pokud vám zaniklo vlastnické nebo užívací právo k odběrnému místu, máte podle ERÚ právo smlouvu vypovědět bez postihu, i když je na dobu určitou. Výpovědní doba je 15 dnů a začíná prvním dnem měsíce po doručení výpovědi.</p>
<h2>Nespolupracující předchozí odběratel</h2>
<p>Když původní odběratel nespolupracuje, přepis je složitější a dodavatel může chtít doložit právo k nemovitosti (nájemní nebo kupní smlouvu, výpis z katastru). Napište nám přes <a href="/#poptavka">formulář</a>, s postupem pomůžeme.</p>`,
},
{
  slug: 'energie-pro-svj', title: 'Energie pro SVJ a bytové domy: společné prostory a kdo podepisuje',
  desc: 'Jak SVJ a bytová družstva řeší dodávku elektřiny a plynu pro společné prostory a kotelny, kdo smlouvu podepisuje a na co si dát pozor.',
  sources: ['srovnavac', 'zmena'],
  body: `
<p>Společenství vlastníků jednotek (SVJ) a bytová družstva obvykle odebírají elektřinu pro společné prostory (osvětlení chodeb, výtah, čerpadla) a často i plyn pro společnou kotelnu. Smlouvy uzavírá SVJ jako právnická osoba, ne jednotliví vlastníci.</p>
<h2>Kdo podepisuje</h2>
<p>Za SVJ jedná statutární orgán podle stanov – výbor nebo předseda společenství. Některé stanovy vyžadují k uzavření nebo změně smlouvy souhlas výboru nebo shromáždění. Před podpisem si to ověřte, ať je smlouva platná.</p>
<h2>Jaký typ odběru to je</h2>
<p>SVJ není domácnost: odebírá jako maloodběratel z kategorie podnikatelů a organizací. To má dva praktické dopady:</p>
<ul><li>ceníky se mohou lišit od ceníků pro domácnosti,</li><li>spotřebitelská práva, například odstoupení do 14 dnů podle občanského zákoníku, jsou určena spotřebitelům. U SVJ se řiďte především tím, co je ve smlouvě.</li></ul>
<h2>Na co se dívat</h2>
<ul><li>správnou distribuční sazbu a jistič pro společné prostory – špatná sazba zvyšuje regulovanou část ceny bez ohledu na dodavatele,</li><li>u kotelny délku fixace vůči topné sezóně,</li><li>smluvní pokuty a automatické prodlužování,</li><li>jak a komu se má výpověď doručit.</li></ul>
<h2>Srovnání</h2>
<p>Srovnávač ERÚ pokrývá i podnikatele na nízkém napětí a plyn do 630 MWh ročně. Pro nabídku na míru nám pošlete kontakt přes <a href="/#poptavka">formulář</a> a zvolte typ „SVJ / bytový dům“.</p>`,
},
{
  slug: 'energie-pro-firmy', title: 'Energie pro firmy a podnikatele: čím se liší od domácností',
  desc: 'Maloodběr podnikatelů, sazby C, smlouvy na míru, smluvní pokuty a omezená spotřebitelská ochrana. Co si ohlídat při změně dodavatele pro firmu.',
  sources: ['srovnavac', 'ceny'],
  body: `
${cezCallout('firmy')}
<p>Firmy a podnikatelé (včetně živnostníků s odběrným místem na IČO) odebírají energie za jiných podmínek než domácnosti. Princip změny dodavatele je stejný, rozdíly jsou ve smlouvách a cenách.</p>
<h2>Hlavní rozdíly</h2>
<ul>
<li><strong>Sazby:</strong> podnikatelé na nízkém napětí mají distribuční sazby řady C (např. C01d, C02d, C25d), domácnosti řady D.</li>
<li><strong>Ceny na míru:</strong> u vyšší spotřeby dodavatelé často nabízejí individuální cenu. Ta se ve veřejném srovnávači ERÚ neobjeví – srovnávač porovnává jen veřejné nabídky bez individuálních slev.</li>
<li><strong>Ochrana spotřebitele:</strong> práva určená spotřebitelům (např. odstoupení do 14 dnů podle občanského zákoníku) se na firmy obvykle nevztahují. O to důležitější je číst výpovědní lhůty a smluvní pokuty.</li>
<li><strong>Velikost odběru:</strong> srovnávač ERÚ pokrývá elektřinu z nízkého napětí a plyn do 630 MWh ročně. Odběry na vysokém napětí a velký odběr plynu se sjednávají individuálně.</li>
</ul>
<h2>Co si připravit</h2>
<ul><li>vyúčtování za posledních 12 měsíců u každého odběrného místa,</li><li>seznam odběrných míst (EAN / EIC), sazby a jističe,</li><li>datum konce současných smluv a výpovědní lhůty,</li><li>kdo za firmu podepisuje.</li></ul>
<h2>Více odběrných míst</h2>
<p>Pokud má firma víc odběrných míst s různými konci smluv, vyplatí se je sjednotit na jedno datum a jednoho dodavatele. Pomůže to s přehledem i při vyjednávání ceny.</p>
<p>Chcete nabídku pro firmu? <a href="/#poptavka">Nechte nám kontakt</a> a zvolte „Firma / podnikatel“.</p>`,
},
{
  slug: 'z-ceho-se-sklada-cena-energie', title: 'Z čeho se skládá cena elektřiny a plynu a co změnou dodavatele ovlivníte',
  desc: 'Regulovaná a neregulovaná část ceny, distribuce, daně. Proč změnou dodavatele ušetříte jen na části faktury a jak to spočítat.',
  sources: ['ceny', 'srovnavac'],
  body: `
<p>Podle ERÚ se cena elektřiny i plynu skládá z regulované části, neregulované části a daní. Pochopit to rozdělení je klíčové: změnou dodavatele měníte jen jednu z nich.</p>
<h2>Regulovaná část</h2>
<p>Stanovuje ji ERÚ v cenových výměrech, každoročně do 30. listopadu s platností na celý následující rok. Pokrývá provoz, údržbu a rozvoj sítí (distribuce, přenos/přeprava) a činnost operátora trhu a regulátora. Je stejná u všech dodavatelů v daném místě a sazbě. Změna regulovaných cen podle ERÚ není důvodem k ukončení smlouvy.</p>
<h2>Neregulovaná část</h2>
<p>Cena silové elektřiny nebo zemního plynu a stálý měsíční plat dodavatele. Vychází z velkoobchodních cen a marže dodavatele a ERÚ do ní nezasahuje. <strong>Tuto část změnou dodavatele ovlivníte.</strong> Pokud vám dodavatel neregulovanou část jednostranně zvýší, máte podle ERÚ právo smlouvu vypovědět.</p>
<h2>Daně</h2>
<p>K ceně se připočítává DPH a u elektřiny a plynu také daň z elektřiny, resp. ze zemního plynu.</p>
<h2>Co to znamená pro úsporu</h2>
<p>Úsporu počítejte jen z neregulované části: (rozdíl ceny za MWh × roční spotřeba) + (rozdíl stálého platu × 12), plus DPH. Distribuci do porovnání nepočítejte – změnou dodavatele se nezmění. Na tomhle principu stojí naše <a href="/kalkulacky/uspora-elektrina">kalkulačka úspory</a>.</p>
<h2>Distribuční sazba je samostatná páka</h2>
<p>Regulovanou část ovlivníte jinak: správnou distribuční sazbou a velikostí jističe. Změna sazby nebo jističe se vyřizuje přes distributora a má technické podmínky – vyplatí se ji prověřit, zvlášť u domů s tepelným čerpadlem, akumulací nebo elektrickým ohřevem vody.</p>`,
},
];
export const SOURCES = SRC;
