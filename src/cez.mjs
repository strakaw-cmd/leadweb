// Ověřená fakta ke zdražení ČEZ Prodej u smluv na dobu neurčitou (ověřeno 12. 11. 2026). Při změně upravit jen tady.
export const CEZ = {
  effective: '1. ledna 2027', effectiveShort: '1. 1. 2027', effectiveISO: '2027-01-01',
  deadline: '22. prosince 2026', deadlineISO: '2026-12-22',   // § 11a odst. 6 EZ: do 10. dne přede dnem účinnosti, stačí odeslat
  notifyBy: '2. prosince 2026',                               // § 11a odst. 4 EZ: oznámení nejpozději 30. den přede dnem účinnosti
  endOld: '31. prosince 2026',
  switchBy: '16.&nbsp;12.&nbsp;2026 do 10:00',  // vyhláška č. 408/2015 Sb.: změna dodavatele se hlásí OTE (stejně jako porovnanienergii.cz/zdrazeni-2027)
  contactBy: '12.&nbsp;12.&nbsp;2026',          // náš doporučený termín (ne zákonná lhůta), sjednoceno s porovnanienergii.cz
  customers: 'přibližně 1,6 milionu',
  elKcMwhVat: 330,       // D01d/D02d/D61d +330, D25d–D57d VT +340 / NT +330; podnikatelé C01d–C62d +330 (ceníky ČEZ 2026 vs 2027)
  plKcMwhVat: 180,       // plyn domácnosti, podle ČEZ/ČTK; plyn podnikatelé neověřeno
};
export const CEZ_SRC = [
  ['ČEZ Prodej: Ceník elektřiny pro domácnosti, Elektřina na dobu neurčitou, účinnost od 1. 1. 2027 (PDF)', 'https://www.cez.cz/webpublic/file/edee/2026/10/ceniky_noveceny_domacnosti/elektrina_doba_neurcita_domacnost.pdf'],
  ['ČEZ Prodej: Ceník elektřiny pro domácnosti, Elektřina na dobu neurčitou, účinnost od 1. 1. 2026 (PDF)', 'https://www.cez.cz/file/edee/2025/10/x01_moo_ee_na_dobu_neurcitou.pdf'],
  ['ČEZ Prodej: Ceník elektřiny pro podnikatele, Elektřina na dobu neurčitou, účinnost od 1. 1. 2027 (PDF)', 'https://www.cez.cz/webpublic/file/edee/2026/10/ceniky_noveceny_podnikatele/elektrina_doba_neurcita_podnikatele.pdf'],
  ['ČEZ Prodej: Ceník elektřiny pro podnikatele, Elektřina na dobu neurčitou, účinnost od 1. 1. 2026 (PDF)', 'https://www.cez.cz/file/edee/2025/10/x09_mop_ee_na_dobu_neurcitou.pdf'],
  ['Novinky.cz (ČTK): ČEZ bude zdražovat, pocítí to 1,6 milionu zákazníků', 'https://www.novinky.cz/clanek/ekonomika-cez-bude-pristi-rok-zdrazovat-40605854'],
  ['iDNES.cz: ČEZ od ledna zdražuje energie pro zákazníky bez fixace', 'https://www.idnes.cz/ekonomika/domaci/cez-od-ledna-zdrazuje-energie-pro-zakazniky-bez-fixace-dalsi-budou-nasledovat.A261030_105749_ekonomika_hyk'],
  ['Zákon č. 458/2000 Sb. (energetický zákon), § 11a', 'https://www.zakonyprolidi.cz/cs/2000-458'],
  ['ERÚ: Vzory pro odstoupení, nebo výpověď smlouvy', 'https://eru.gov.cz/vzory-pro-odstoupeni-nebo-vypoved-smlouvy'],
];
export const cezCallout = (seg = '') => `<aside class="callout"><strong>Zdražení ČEZ od ${CEZ.effectiveShort}:</strong> máte-li u ČEZ Prodej elektřinu nebo plyn na dobu neurčitou (bez fixace), cena se od ${CEZ.effective} zvyšuje. Domácnosti a podnikající fyzické osoby mohou podle zákona smlouvu bez sankce vypovědět – výpověď stačí odeslat do ${CEZ.deadline}. Aby od ${CEZ.effectiveShort} dodával nový dodavatel, musí změnu nahlásit operátorovi trhu do ${CEZ.switchBy}. <a href="/zdrazeni-cez/${seg}">Zjistěte, jestli se vás to týká</a> · <a href="/pruvodce/zdrazeni-cez-2027">Průvodce</a></aside>`;
