# Kampaň „Zdražení ČEZ od 1. 1. 2027“ – plán, nastavení a texty

Stav k 12. 11. 2026. Funnel běží na <https://strakaw-cmd.github.io/leadweb/zdrazeni-cez/> (repo `strakaw-cmd/leadweb`).
Všechna fakta o zdražení jsou v `src/cez.mjs` (ceníky ČEZ 2026 vs. 2027, § 11a energetického zákona). Do reklam a na web nepíšeme nic jiného.

**Okno kampaně je krátké:** výpověď bez sankce stačí odeslat do **22. 12. 2026** (domácnosti a podnikající fyzické osoby). ČEZ musí zdražení oznámit do **2. 12. 2026** – kolem toho data čekejte nejvíc hledání. Všechny placené kampaně s textem o „odchodu bez sankce“ **musí skončit 22. 12. 2026 ve 23:59**.

## 0. Co musí udělat Václav (krátký seznam)

1. **Koupit doménu `zmenitdodavatele.cz`** (doporučeno Wedos, 193,60 Kč s DPH/rok). Pak mi napsat – DNS a přepnutí webu udělám podle kapitoly 1.
2. **Založit GA4** (vlastnost „Změnit dodavatele“, datový stream Web) a poslat mi **Measurement ID `G-…`**.
3. **Google Ads:** připojit účet přes konektor Adspirer (nebo mi dát přístup). V Ads vytvořit konverzi „Lead – formulář“ (kategorie *Odeslání formuláře pro potenciální zákazníky*, ručně přes kód) a poslat mi **`AW-…` + štítek konverze**. Volitelně druhou konverzi „Klik na telefon“.
4. **Sklik:** účet na Seznamu (pokud ho nemáte), vytvořit konverzi „Lead“ a poslat mi **ID konverze** (číslo). Volitelně ID retargetingu.
5. **Rozpočet:** rozhodnout úroveň (kapitola 4.5) – doporučuji **„Střed“ 1 500 Kč/den** do 22. 12. (cca 55–60 tis. Kč celkem při startu kolem 15. 11.).
6. **Meta (volitelné):** Business Manager + reklamní účet + Pixel ID, pokud chcete i Facebook/Instagram.
7. **Bannery:** vložit (nebo nechat vložit) HTML z `kampan/bannery/` na nejsemosel.cz a porovnanienergii.cz.
8. **Potvrdit správce osobních údajů:** formulář uvádí jako správce Václava Straku (IČO 86776606), poptávky ale zpracovává tým PorovnáníEnergií.cz (M & S fair agency s.r.o.). Pokud je správcem M & S, upravím texty (stačí říct).

ID z bodů 2–4 se zadají jako **proměnné repozitáře** (GitHub → Settings → Secrets and variables → Actions → Variables): `GA4_ID`, `GADS_ID`, `GADS_LEAD_LABEL`, `GADS_CALL_LABEL`, `SKLIK_CONV_ID`, `SKLIK_RTG_ID`, `META_PIXEL_ID`, `CUSTOM_DOMAIN`. Po zadání se web sám přestaví – kód je připravený.

## 1. Doména

### 1.1 Ověřená dostupnost (RDAP CZ.NIC `rdap.nic.cz`, 12. 11. 2026 odpoledne)

| Doména | Stav | Hodnocení |
|---|---|---|
| **zmenitdodavatele.cz** | **volná** | **Doporučuji.** Bez cizí ochranné známky, trvalá (použitelná i po kampani a při dalších zdraženích), shodná se značkou webu „Změnit dodavatele“, popisuje akci, kterou člověk chce udělat. |
| vypovedbezsankce.cz | volná | Silná pro tuto kampaň (přesně to lidé hledají), ale po 22. 12. ztrácí smysl. Případně jako druhá doména s přesměrováním. |
| odejitbezsankce.cz | volná | Podobně jako výše, kampaňová. |
| zdrazenienergii.cz | volná | Evergreen pro budoucí zdražení kohokoli, slabší výzva k akci. |
| zdrazeni2027.cz | volná | Jen na tento rok. |
| neurcitasmlouva.cz | volná | Úzké, málo zapamatovatelné. |
| zmenadodavatele.cz | **obsazená** (registrace 31. 10. 2026, registrátor Wedos) | Pozor na záměnu – někdo ji koupil před dvěma týdny. |
| konecfixace.cz | obsazená (od 2010) | – |
| zdrazenicez.cz, zdrazeni-cez.cz, odejitodcez.cz, cezzdrazuje.cz | volné | **Nekupovat.** „ČEZ“ je ochranná známka ČEZ, a. s. Hrozí spor o doménu (rozhodčí řízení pro .cz), námitka nekalé soutěže / klamání (web by mohl působit jako stránka ČEZ) a odmítnutí reklam kvůli ochranné známce. |

Dostupnost se mění – před nákupem ji registrátor ověří znovu.

### 1.2 Cena .cz (veřejné ceníky, 12. 11. 2026)

| Registrátor | Registrace 1. rok | Prodloužení | Zdroj |
|---|---|---|---|
| **Wedos** | 160 Kč bez DPH / **193,60 Kč s DPH** | stejně (193,60 Kč s DPH) | wedos.cz/domeny/cenik |
| Forpsi | 170 Kč bez DPH / 205,70 Kč s DPH (akce) | 199 Kč bez DPH / 240,79 Kč s DPH | forpsi.com/domain/pricelist |
| Active24 | ceník se nepodařilo načíst (stránka vrací 404) | – | – |

**Doporučení:** `zmenitdodavatele.cz` u Wedosu, na 1 rok (≈ 194 Kč s DPH). DNS nechat u Wedosu (zdarma).

### 1.3 Napojení na GitHub Pages (po koupi, cca 15 minut + čekání na DNS)

Kanonická adresa bude **`www.zmenitdodavatele.cz`**, holá doména se na ni přesměruje (GitHub to udělá sám, když jsou nastavené oba záznamy).

1. **Ověřit doménu na GitHubu** (ochrana proti převzetí): github.com → Settings (účet) → Pages → *Add a domain* → `zmenitdodavatele.cz` → GitHub ukáže TXT záznam.
2. **DNS u Wedosu** (Domény → zmenitdodavatele.cz → DNS záznamy). Smazat výchozí A/AAAA/CNAME pro `@` a `www` od Wedosu a přidat:

   | Název | Typ | Hodnota | TTL |
   |---|---|---|---|
   | `_github-pages-challenge-strakaw-cmd` | TXT | (kód z kroku 1) | 3600 |
   | `@` (prázdné) | A | 185.199.108.153 | 3600 |
   | `@` | A | 185.199.109.153 | 3600 |
   | `@` | A | 185.199.110.153 | 3600 |
   | `@` | A | 185.199.111.153 | 3600 |
   | `@` | AAAA | 2606:50c0:8000::153 | 3600 |
   | `@` | AAAA | 2606:50c0:8001::153 | 3600 |
   | `@` | AAAA | 2606:50c0:8002::153 | 3600 |
   | `@` | AAAA | 2606:50c0:8003::153 | 3600 |
   | `www` | CNAME | `strakaw-cmd.github.io.` | 3600 |

3. Na GitHubu dokončit ověření (*Verify*).
4. Repo `strakaw-cmd/leadweb` → Settings → Pages → *Custom domain* `www.zmenitdodavatele.cz` → Save → po zelené kontrole zaškrtnout **Enforce HTTPS** (certifikát do ~1 hodiny).
   Totéž přes `gh`: `gh api -X PUT repos/strakaw-cmd/leadweb/pages -f cname=www.zmenitdodavatele.cz`, potom `-F https_enforced=true`.
5. Proměnná repozitáře **`CUSTOM_DOMAIN=www.zmenitdodavatele.cz`** a znovu spustit workflow (`gh workflow run pages.yml`). Build pak staví bez podcesty `/leadweb`, s kanonickými URL na doméně a se souborem `CNAME`.
6. Kontrola: `dig +short www.zmenitdodavatele.cz` → `strakaw-cmd.github.io`, `curl -I https://www.zmenitdodavatele.cz/zdrazeni-cez` → 200, stará adresa `strakaw-cmd.github.io/leadweb/...` přesměruje (301).
7. Ve všech reklamách, bannerech a v `kampan/ads.py` (proměnná `D`) nahradit `https://strakaw-cmd.github.io/leadweb` za `https://www.zmenitdodavatele.cz`.
8. Přidat doménu do Google Search Console (ověření TXT záznamem) a do Seznam Webmaster a odeslat `https://www.zmenitdodavatele.cz/sitemap.xml`.

## 2. Měření konverzí (připraveno v kódu, vypnuté)

### 2.1 Jak je to postavené

- **Bez ID = nic.** Když nejsou vyplněné proměnné, web se postaví přesně jako dosud: žádný skript třetí strany, žádná cookie lišta, v patičce dál „Web nepoužívá cookies“. Ověřeno porovnáním buildů a testem v prohlížeči (jediný externí požadavek je odeslání formuláře do CRM).
- **S ID:** `src/build.mjs` vloží do `<head>` výchozí **Google Consent Mode v2** (vše `denied`) a konfiguraci. `src/app.js` ukáže **cookie lištu** (Přijmout vše / Odmítnout / Nastavení, tlačítka stejně výrazná – požadavek ÚOOÚ), volbu uloží v `localStorage` a teprve **po souhlasu** načte:
  - analytické: GA4 (`gtag.js`), 
  - marketingové: Google Ads tag, Sklik `rc.js` (konverze + volitelně retargeting), Meta Pixel.
  Je to „základní“ režim Consent Mode: před souhlasem se k Googlu nic neposílá (přísnější a bezpečnější varianta pro ČR, § 89 odst. 3 ZEK). Odkaz „Nastavení cookies“ v patičce lištu znovu otevře, stránka Ochrana osobních údajů se doplní o tabulku nástrojů.
- **Konverze „lead“** se počítá jen po potvrzení z CRM (odpověď `send-msg` = pole délky 3): před přesměrováním se uloží značka do `sessionStorage` a **na děkovné stránce** se jednou odpálí `generate_lead` (GA4), `conversion` (Ads, štítek `GADS_LEAD_LABEL`), Sklik `conversionHit`, Meta `Lead`. Roboti zachycení honeypotem ani přímé návštěvy děkovné stránky se nepočítají.
- **Konverze „telefon“:** klik na `tel:` odkaz → `phone_click` (GA4) a Ads konverze se štítkem `GADS_CALL_LABEL`, pokud je zadaný.
- **Kroky funnelu** (`quiz_start`, `quiz_done` s výsledkem, `form_start`) jdou při souhlasu s analytikou do GA4 jako události – v GA4 z nich jde postavit trychtýř (Explorations → Funnel).
- Hodnoty ID se při buildu kontrolují (`G-…`, `AW-…`, čísla), neplatná hodnota build zastaví.
- Do Googlu, Seznamu ani Mety se **neposílá jméno, telefon ani e-mail** (Enhanced Conversions záměrně nezapnuté).

### 2.2 Nastavení v GA4 a Ads

1. GA4: Admin → Events → označit `generate_lead` jako **Key event**. Datová retence 14 měsíců. Propojit GA4 s Google Ads (Admin → Product links).
2. Google Ads: Cíle → Konverze → Nová → Web → ručně kódem → kategorie *Odeslání formuláře*, hodnota (volitelně) průměrná hodnota leadu, počítání **Jedna**, okno 30 dní. Opsat `AW-XXXXXXXXX/štítek`.
3. Sklik: Nástroje → Konverze → Nová → typ „Odeslání formuláře“ → opsat ID (číslo z kódu `id: …`).
4. Po zadání proměnných: otevřít web, přijmout cookies, poslat **jeden** testovací lead (označený „TEST“) a ověřit v GA4 DebugView / Ads „Diagnostika konverzí“. Testovací lead pak smazat v CRM.

### 2.3 Lokální test (proveden 12. 11. 2026)

Build s falešnými ID, odeslání do CRM v testu podvržené (žádný lead do CRM nešel): lišta se ukáže, před souhlasem 0 externích požadavků, po „Odmítnout“ 0, po „Přijmout vše“ se načte gtag.js, rc.js a fbevents.js, na děkovné stránce `generate_lead` + `conversion`.

## 3. CRO – úpravy landing pages

### 3.1 Nasazeno (12. 11. 2026)

| Úprava | Proč |
|---|---|
| H1 rozcestníku: „ČEZ od 1. ledna 2027 zdražuje smlouvy bez fixace. Ověřte, jestli můžete odejít bez sankce“ | Spojuje problém a přínos, hned vede k akci (test). |
| Výrazný řádek se lhůtou „Výpověď bez sankce stačí odeslat do 22. prosince 2026 – zbývá N dní“ (počet dní počítá prohlížeč z `cez.mjs`, po lhůtě zmizí) | Skutečný termín ze zákona, žádná vymyšlená urgence. |
| Tlačítka „Ověřit za tři otázky“ / „Chci srovnání nabídek“ hned v hero rozcestníku | Dřív tam CTA chybělo, jen dlaždice. |
| Blok důvěry: registrovaný zprostředkovatel ERÚ č. 742238366, v energetice od roku 2009, 20+ dodavatelů, 0 Kč za službu; kdo poptávky vyřizuje (PorovnáníEnergií.cz, M & S fair agency s.r.o., IČO 28353048), infolinka a e-mail | Jen veřejné údaje z porovnanienergii.cz. Žádné vymyšlené recenze ani čísla. |
| Telefon 737 225 960 (Po–Pá 8–17) jako klikací odkaz u formuláře, ve výsledku testu a na děkovné stránce | Část lidí raději volá; měřitelné jako konverze. |
| Mobil: spodní lišta „Týká se mě to?“ + „Zavolat“ na landing pages | CTA je vždy na dosah palce. |
| Tlačítko formuláře „Chci nezávazné srovnání zdarma“ + pod ním „Ozveme se zpravidla do jednoho pracovního dne. Nic nepodepisujete a za naši službu neplatíte.“ | Konkrétní výsledek místo „Odeslat“, odstraňuje obavy. |
| Na stránkách funnelu vede tlačítko „Chci nabídku“ v hlavičce na formulář na stejné stránce (dřív na úvodní stránku webu) | Návštěvník z reklamy neodchází z landing page. |
| Děkovná stránka: „Co bude dál“ ve 3 krocích + telefon | Méně nejistoty, vyšší dosažitelnost na telefonu. |
| **Oprava chyby na mobilu:** hlavička přetékala o 9 px (stránka šla na telefonu posunout do strany; v emulaci telefonu se kvůli tomu klepnutím vybírala jiná odpověď v testu). Na úzkých displejích se skryjí odkazy Průvodci/Kalkulačky, tabulky v průvodcích se posouvají samy. | Funkční chyba, opraveno a ověřeno na šířce 360 a 390 px. |
| Oprava faktu: sazby pro podnikatele „C01d–C62d“ (dřív „C01d–C56d“, ceník 2027 obsahuje i C62d) | Přesnost. |
| FAQ má kotvu `#otazky` (pro sitelink). | |

### 3.2 Doporučení na další kolo (až poběží měření)

1. **A/B: e-mail nepovinný** (porovnanienergii.cz má „stačí telefon, nebo e-mail“). Nezměnil jsem to naslepo, protože nevím, jestli CRM přijme lead bez e-mailu – nejdřív ověřit s Honzou.
2. **Nahrání vyúčtování** jako alternativa k formuláři (jako na porovnanienergii.cz) – nejsilnější kvalifikace leadu.
3. **Reference:** na porovnanienergii.cz jsou skutečné citace klientů (pekárna, sklář, předseda SVJ). Pokud souhlasíte, můžu je převzít se stejným označením zdroje.
4. **Callback okno:** volba „kdy vám zavolat“ (dopoledne / odpoledne) místo volné poznámky.
5. Po 2.–3. 12. (oznámení ČEZ dorazí) přidat do hero „Přišel vám dopis od ČEZ o změně ceny?“.
6. Po 22. 12. přepnout texty: lhůta bez sankce skončila → smlouvu na dobu neurčitou lze vypovědět s tříměsíční výpovědní dobou; kampaň pokračuje jako „změna dodavatele“.

## 4. Google Ads + Sklik

### 4.1 Struktura

Bez kampaně na vlastní značku (zatím nemá smysl), dvě vyhledávací kampaně podle segmentu – mají jiné právo (§ 11a jen spotřebitelé a OSVČ), jiné landing page a jinou hodnotu leadu.

| Kampaň | Sestavy | Landing page | Cíl |
|---|---|---|---|
| **S – Zdražení ČEZ – Domácnosti** | A1 Zdražení ČEZ · A2 Výpověď bez sankce · A3 Změna dodavatele (obecné) | `/zdrazeni-cez/domacnost` (A3 rozcestník `/zdrazeni-cez`) | Lead – formulář, Klik na telefon |
| **S – Zdražení ČEZ – Firmy a SVJ** | B1 Zdražení ČEZ podnikatelé · B2 SVJ a bytové domy | `/zdrazeni-cez/firmy` | Lead – formulář, Klik na telefon |

Nastavení obou kampaní: jen **Vyhledávací síť** (bez Search Partners a bez Obsahové sítě na začátku), lokalita **Česko – „Přítomnost“** (lidé, kteří v ČR jsou), jazyk čeština, **konec 22. 12. 2026 23:59**. Plán reklam: vše, ale rozšíření o volání jen Po–Pá 8–17 (kdy infolinka funguje).
Sklik: stejná struktura (2 kampaně, 5 sestav), jen Vyhledávání (bez Obsahové sítě), stejné texty – Sklik responzivní textové reklamy mají podobné limity (nadpis 30, popisek 90 znaků; ověřte v rozhraní při zakládání).

**Strategie nabídek:** nový účet bez historie a krátké okno → týden 1 **Maximalizovat kliknutí s limitem CPC** (limit nastavit podle skutečných cen z Plánovače klíčových slov v den spuštění), od ~15–20 konverzí na kampaň přepnout na **Maximalizovat konverze**. Žádná „Max. hodnota konverze“ ani tCPA, dokud není 30+ konverzí.

**Ochranná známka ČEZ:** v EHP Google klíčová slova se značkou konkurenta povoluje. V **textu reklamy** je značka povolená, dokud si majitel nepodá stížnost – pak Google reklamy s „ČEZ“ zamítne. Proto každá RSA obsahuje i nadpisy bez slova „ČEZ“; při zamítnutí stačí nadpisy s ČEZ smazat. Landing page jasně uvádí „Tento web není stránkou společnosti ČEZ“.

### 4.2 Klíčová slova

Typy shody: `[přesná]`, `"frázová"`. Volnou shodu nepoužívat, dokud neběží Max. konverze s daty.

**A1 Zdražení ČEZ (domácnosti)**
`[čez zdražení]` · `[zdražení čez]` · `"čez zdražení 2027"` · `"zdražení čez 2027"` · `"čez zdražuje"` · `"čez zvyšuje ceny"` · `"čez nové ceny 2027"` · `"čez zdražení elektřiny"` · `"čez zdražení plynu"` · `"čez zvýšení ceny elektřiny"` · `"čez dopis změna ceny"` · `"čez oznámení o změně ceny"` · `"čez ceník 2027"` · `"čez na dobu neurčitou"`

**A2 Výpověď ČEZ bez sankce (domácnosti)**
`[výpověď čez]` · `"výpověď smlouvy čez"` · `"čez výpověď bez sankce"` · `"jak vypovědět smlouvu čez"` · `"vypovědět čez"` · `"odstoupení od smlouvy čez"` · `"čez výpověď zdražení"` · `"výpověď smlouvy elektřina zdražení"` · `"výpověď při zdražení energie"` · `"odejít od čez"`

**A3 Změna dodavatele (obecné)** – dražší a konkurenční, zapnout až od rozpočtu „Střed“
`[změna dodavatele elektřiny]` · `[změna dodavatele energie]` · `"změnit dodavatele elektřiny"` · `"jak změnit dodavatele elektřiny"` · `"změna dodavatele plynu"` · `"přechod k jinému dodavateli elektřiny"` · `"levnější dodavatel elektřiny"`

**B1 Zdražení ČEZ (podnikatelé, firmy)**
`"čez zdražení podnikatelé"` · `"čez zdražení firmy"` · `"čez ceník podnikatelé 2027"` · `"čez elektřina podnikatelé 2027"` · `"čez zdražení osvč"` · `"elektřina pro firmy zdražení"` · `[změna dodavatele elektřiny firma]` · `"dodavatel elektřiny pro firmy"` · `"elektřina pro podnikatele"`

**B2 SVJ a bytové domy**
`"energie pro svj"` · `"elektřina pro svj"` · `"plyn pro svj"` · `"dodavatel energie svj"` · `"změna dodavatele svj"` · `"elektřina bytový dům"` · `"energie bytové družstvo"`

**Vylučující slova (seznam na úrovni účtu, frázová shoda)**
- práce: `práce`, `brigáda`, `kariéra`, `zaměstnání`, `nabídka práce`, `plat`, `mzda`
- investice: `akcie`, `akcie čez`, `dividenda`, `burza`, `kurz`, `výsledky hospodaření`, `valná hromada`
- jiné služby ČEZ: `čez distribuce`, `porucha`, `výpadek`, `odstávka`, `přerušení dodávky`, `odečet`, `samoodečet`, `čez mobil`, `nabíjení`, `nabíjecí stanice`, `wallbox`, `fotovoltaika`, `fve`, `výkup elektřiny`, `přetoky`, `tepelné čerpadlo`, `čez esco`, `čez teplárenská`
- přihlášení a kontakt na ČEZ: `přihlášení`, `login`, `zákaznický účet`, `čez online`, `aplikace`, `infolinka`, `telefon čez`, `kontakt`, `pobočka`, `zákaznické centrum`, `adresa`
- elektrárny a zprávy: `elektrárna`, `jaderná`, `dukovany`, `temelín`, `počerady`, `čez aréna`, `čez arena`, `skupina čez`, `stát`, `zestátnění`, `vláda`
- ostatní: `vzor pdf zdarma ke stažení` (jen pokud se ukáže v hledaných výrazech), `wikipedia`, `logo`

Po 3–4 dnech projít přehled **Hledané výrazy** a vylučující slova doplnit (hlavně „čez + adresa/telefon“ – lidé hledající kontakt na ČEZ).

### 4.3 Reklamy (RSA) – 3 na sestavu

Délky jsou zkontrolované skriptem `python3 kampan/ads.py` (zdroj textů, vypíše i tuto tabulku s `--md`). Všechna čísla a data pocházejí z `src/cez.mjs` a veřejných údajů PorovnáníEnergií.cz. Do RSA lze přidat další nadpisy, ale jen pravdivé a ověřitelné.
Připnutí: v A1/A2 připnout na pozici 1 nadpis s tématem (např. „Zdražení ČEZ od 1. 1. 2027“, „Výpověď ČEZ bez sankce“), zbytek nechat volně.

#### A1 Zdražení ČEZ (domácnosti)

Cílová URL: `https://strakaw-cmd.github.io/leadweb/zdrazeni-cez/domacnost?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-domacnost&utm_content=domacnost-zdrazeni&utm_term={keyword}`  
Sklik: stejná URL s `utm_source=seznam&utm_campaign=zdrazeni-cez-domacnost-sklik`

**RSA 1**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Zdražení ČEZ od 1. 1. 2027 | 26 |
| Elektřina +330 Kč/MWh s DPH | 27 |
| Týká se vás zdražení? Ověřte | 28 |
| Smlouva bez fixace? Pozor | 25 |
| Výpověď stačí do 22. 12. | 24 |
| Test o 3 otázkách zdarma | 24 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| ČEZ zvyšuje ceny u smluv na dobu neurčitou od 1. 1. 2027. Ověřte, jestli se vás to týká. | 88 |
| Domácnosti mohou smlouvu vypovědět bez sankce. Výpověď stačí odeslat do 22. 12. 2026. | 85 |

**RSA 2**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Porovnejte nabídky zdarma | 25 |
| 20+ dodavatelů v porovnání | 26 |
| Spočítejte, kolik zaplatíte | 27 |
| Srovnání od zprostředkovatele | 29 |
| Nezávazně a zdarma | 18 |
| Zavolá vám člověk, ne robot | 27 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Spočítáme, o kolik vám cena od 1. 1. 2027 vzroste, a porovnáme nabídky 20+ dodavatelů. | 86 |
| Nic nepodepisujete předem. Rozhodnutí je jen na vás, za naši službu neplatíte. | 78 |

**RSA 3**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Registrovaný zprostředkovatel | 29 |
| Na trhu energií od roku 2009 | 28 |
| Výpověď i smlouvu vyřídíme | 26 |
| Bez sankce do 22. 12. 2026 | 26 |
| Infolinka Po–Pá 8–17 | 20 |
| Ověřte smlouvu s ČEZ zdarma | 27 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| PorovnáníEnergií.cz: registrovaný zprostředkovatel ERÚ, v energetice od roku 2009. | 82 |
| Ozveme se zpravidla do jednoho pracovního dne a projdeme s vámi smlouvu i nabídky. | 82 |

#### A2 Výpověď ČEZ bez sankce (domácnosti)

Cílová URL: `https://strakaw-cmd.github.io/leadweb/zdrazeni-cez/domacnost?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-domacnost&utm_content=domacnost-vypoved&utm_term={keyword}`  
Sklik: stejná URL s `utm_source=seznam&utm_campaign=zdrazeni-cez-domacnost-sklik`

**RSA 1**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Výpověď ČEZ bez sankce | 22 |
| Odeslat stačí do 22. 12. 2026 | 29 |
| Zákonné právo podle § 11a | 25 |
| Pro domácnosti a OSVČ | 21 |
| Ověřte, zda máte nárok | 22 |
| Zdražení od 1. 1. 2027 | 22 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Při zdražení lze smlouvu na dobu neurčitou vypovědět bez sankce. Ověřte to ve 3 krocích. | 88 |
| Smlouva pak skončí 31. 12. 2026 a nový dodavatel může navázat od 1. 1. 2027. | 76 |

**RSA 2**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Výpověď vyřídíme za vás | 23 |
| Nový dodavatel od 1. 1. 2027 | 28 |
| Dodávka se nepřeruší | 20 |
| Srovnání 20+ dodavatelů | 23 |
| Nezávazně a zdarma | 18 |
| Jak vypovědět smlouvu s ČEZ | 27 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Při změně podá výpověď nový dodavatel na základě plné moci. Pomůžeme vám s výběrem. | 83 |
| Projdeme s vámi smlouvu a nabídky. Nic nepodepisujete předem, služba je zdarma. | 79 |

**RSA 3**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Lhůta končí 22. 12. 2026 | 24 |
| Bez fixace? Můžete odejít | 25 |
| Domácnosti a OSVČ bez pokuty | 28 |
| Poradíme zdarma, Po–Pá 8–17 | 27 |
| Zprostředkovatel ERÚ od 2009 | 28 |
| Ověřte to za 3 otázky | 21 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Zprostředkovatel registrovaný u ERÚ. Poradíme, jestli odchod dává smysl, a porovnáme ceny. | 90 |
| Pokud vám nová cena vyhovuje, nemusíte dělat nic. Rozhodnutí je jen na vás. | 75 |

#### A3 Změna dodavatele (obecné, domácnosti)

Cílová URL: `https://strakaw-cmd.github.io/leadweb/zdrazeni-cez?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-domacnost&utm_content=domacnost-zmena&utm_term={keyword}`  
Sklik: stejná URL s `utm_source=seznam&utm_campaign=zdrazeni-cez-domacnost-sklik`

**RSA 1**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Změna dodavatele elektřiny | 26 |
| Porovnejte 20+ dodavatelů | 25 |
| Srovnání zdarma a nezávazně | 27 |
| Vyřídíme změnu za vás | 21 |
| Zprostředkovatel ERÚ | 20 |
| Dodávka se nepřeruší | 20 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Porovnáme nabídky pro vaši spotřebu a vyřídíme změnu dodavatele. Za naši službu neplatíte. | 90 |
| Registrovaný zprostředkovatel ERÚ, na trhu s energiemi od roku 2009. | 68 |

**RSA 2**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Máte ČEZ bez fixace? | 20 |
| Od 1. 1. 2027 zaplatíte víc | 27 |
| Ověřte to třemi otázkami | 24 |
| Změna dodavatele zdarma | 23 |
| Na trhu od roku 2009 | 20 |
| Nezávazná nabídka | 17 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| ČEZ zdražuje smlouvy na dobu neurčitou. Zjistěte, jestli se vás to týká a co můžete dělat. | 90 |
| Domácnosti a OSVČ mohou bez sankce odejít, výpověď stačí odeslat do 22. 12. 2026. | 81 |

**RSA 3**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Změna dodavatele plynu | 22 |
| Kolik ušetříte? Spočítáme | 25 |
| Bez poplatku za naši službu | 27 |
| Infolinka Po–Pá 8–17 | 20 |
| Projdeme vaši smlouvu | 21 |
| Elektřina i plyn | 16 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Nechte kontakt, zavoláme vám a připravíme srovnání nabídek elektřiny i plynu. | 77 |
| Ozveme se zpravidla do jednoho pracovního dne. Nic nepodepisujete předem. | 73 |

#### B1 Zdražení ČEZ (podnikatelé, firmy)

Cílová URL: `https://strakaw-cmd.github.io/leadweb/zdrazeni-cez/firmy?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-firmy&utm_content=firmy-zdrazeni&utm_term={keyword}`  
Sklik: stejná URL s `utm_source=seznam&utm_campaign=zdrazeni-cez-firmy-sklik`

**RSA 1**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Zdražení ČEZ pro podnikatele | 28 |
| Elektřina +330 Kč/MWh s DPH | 27 |
| Ceník bez fixace od 1. 1. 2027 | 30 |
| OSVČ mohou odejít bez sankce | 28 |
| Firmy: rozhoduje smlouva | 24 |
| Individuální nabídka pro firmu | 30 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| ČEZ od 1. 1. 2027 zvyšuje ceník pro podnikatele na dobu neurčitou o 330 Kč/MWh s DPH. | 85 |
| Připravíme nabídku pro OSVČ, s.r.o. i SVJ. Pošlete vyúčtování, zbytek vyřešíme. | 79 |

**RSA 2**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Energie pro firmy a SVJ | 23 |
| Individuální ceny dodavatelů | 28 |
| Více odběrných míst? Vyřešíme | 29 |
| Srovnání 20+ dodavatelů | 23 |
| Na trhu od roku 2009 | 20 |
| Nezávazná nabídka zdarma | 24 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| U partnerských dodavatelů umíme poptat individuální ceny. Nabídka je nezávazná. | 79 |
| Odběrná místa, sazby a smlouvy projdeme za vás. Ozveme se zpravidla do 1 pracovního dne. | 88 |

**RSA 3**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Zprostředkovatel ERÚ | 20 |
| Ověřte smlouvu s ČEZ zdarma | 27 |
| Výpověď a změnu vyřídíme | 24 |
| Pro OSVČ, s.r.o. a SVJ | 22 |
| Spočítejte dopad zdražení | 25 |
| Infolinka Po–Pá 8–17 | 20 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| OSVČ mohou smlouvu vypovědět bez sankce do 22. 12. 2026. U s.r.o. a SVJ rozhoduje smlouva. | 90 |
| PorovnáníEnergií.cz, registrovaný zprostředkovatel ERÚ č. 742238366, od roku 2009. | 82 |

#### B2 SVJ a bytové domy

Cílová URL: `https://strakaw-cmd.github.io/leadweb/zdrazeni-cez/firmy?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-firmy&utm_content=firmy-svj&utm_term={keyword}`  
Sklik: stejná URL s `utm_source=seznam&utm_campaign=zdrazeni-cez-firmy-sklik`

**RSA 1**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Energie pro SVJ a družstva | 26 |
| Zdražení ČEZ od 1. 1. 2027 | 26 |
| Rozhoduje smlouva SVJ | 21 |
| Projdeme smlouvu zdarma | 23 |
| Individuální nabídka pro SVJ | 28 |
| Srovnání 20+ dodavatelů | 23 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| U SVJ a družstev rozhoduje smlouva a obchodní podmínky. Projdeme je a porovnáme nabídky. | 88 |
| Pošlete vyúčtování společných prostor. Připravíme nezávazné srovnání zdarma. | 76 |

**RSA 2**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Na trhu energií od roku 2009 | 28 |
| Zprostředkovatel ERÚ | 20 |
| Vyřídíme změnu dodavatele | 25 |
| Nezávazně a zdarma | 18 |
| Více odběrných míst? Vyřešíme | 29 |
| Ozveme se do 1 prac. dne | 24 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| Registrovaný zprostředkovatel ERÚ, v energetice od roku 2009. Pomáháme i SVJ a družstvům. | 89 |
| Projdeme smlouvu, spotřebu i sazby. O změně rozhoduje výbor, my připravíme srovnání. | 84 |

**RSA 3**

| Nadpisy (≤ 30 znaků) | Znaků |
|---|---|
| Smlouva SVJ bez fixace? | 23 |
| Zjistěte dopad zdražení | 23 |
| Elektřina +330 Kč/MWh s DPH | 27 |
| Nabídka pro SVJ zdarma | 22 |
| Infolinka Po–Pá 8–17 | 20 |
| Porovnání energií pro SVJ | 25 |

| Popisky (≤ 90 znaků) | Znaků |
|---|---|
| ČEZ od 1. 1. 2027 zdražuje produkty na dobu neurčitou. Ověřte, zda se to týká vašeho SVJ. | 89 |
| Nechte kontakt a zavoláme vám. Srovnání je nezávazné a za naši službu neplatíte. | 80 |

#### Rozšíření o odkazy na podstránky (sitelinky)

| Text (≤ 25) | Popis 1 (≤ 35) | Popis 2 (≤ 35) | URL |
|---|---|---|---|
| Týká se mě zdražení? (20) | Test o třech otázkách (21) | Výsledek hned na stránce (24) | `/zdrazeni-cez#kviz` |
| Pro domácnosti (14) | Byt, dům, chata bez IČO (23) | Lhůta výpovědi do 22. 12. (25) | `/zdrazeni-cez/domacnost` |
| Pro firmy a SVJ (15) | OSVČ, s.r.o., SVJ, družstva (27) | Individuální nabídka (20) | `/zdrazeni-cez/firmy` |
| Průvodce zdražením (18) | Co se mění od 1. 1. 2027 (24) | Zdroje: ceníky ČEZ, zákon (25) | `/pruvodce/zdrazeni-cez-2027` |
| Kdy podat výpověď (17) | Kalkulačka termínu (18) | Podle pravidel ERÚ (18) | `/kalkulacky/termin-vypovedi` |
| Časté otázky (12) | Koho se zdražení týká (21) | Co když nepřišlo oznámení (25) | `/zdrazeni-cez#otazky` |

#### Popisky (callouts, ≤ 25 znaků)

Zdarma a nezávazně (18) · Zprostředkovatel ERÚ (20) · Na trhu od roku 2009 (20) · 20+ dodavatelů (14) · Infolinka Po–Pá 8–17 (20) · Výpověď vyřídíme (16)

Rozšíření o volání: **737 225 960**, jen Po–Pá 8–17, s měřením konverzí z hovorů (Google: hovory delší než 60 s).
Strukturovaný úryvek „Služby“: Srovnání nabídek · Kontrola smlouvy · Změna dodavatele · Výpověď za vás.

### 4.4 Finální URL a UTM

| Kanál / sestava | URL |
|---|---|
| Google A1 | `…/zdrazeni-cez/domacnost?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-domacnost&utm_content=domacnost-zdrazeni&utm_term={keyword}` |
| Google A2 | `…/zdrazeni-cez/domacnost?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-domacnost&utm_content=domacnost-vypoved&utm_term={keyword}` |
| Google A3 | `…/zdrazeni-cez?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-domacnost&utm_content=domacnost-zmena&utm_term={keyword}` |
| Google B1 | `…/zdrazeni-cez/firmy?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-firmy&utm_content=firmy-zdrazeni&utm_term={keyword}` |
| Google B2 | `…/zdrazeni-cez/firmy?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-firmy&utm_content=firmy-svj&utm_term={keyword}` |
| Sklik (všechny) | stejně, jen `utm_source=seznam` a `utm_campaign=…-sklik`; `utm_term` v Skliku přes `{keyword}` podle nápovědy Skliku |
| Meta domácnosti | `…/zdrazeni-cez/domacnost?utm_source=facebook&utm_medium=paid_social&utm_campaign=zdrazeni-cez-domacnost&utm_content={{ad.name}}` |
| Meta podnikatelé | `…/zdrazeni-cez/firmy?utm_source=facebook&utm_medium=paid_social&utm_campaign=zdrazeni-cez-firmy&utm_content={{ad.name}}` |

`…` = dnes `https://strakaw-cmd.github.io/leadweb`, po koupi domény `https://www.zmenitdodavatele.cz`. V Google Ads zapnout **automatické označování** (gclid) – web gclid i UTM ukládá a posílá s leadem do CRM, takže u každého leadu v CRM uvidíte zdroj.

### 4.5 Rozpočet

**Ceny za proklik pro tyto fráze jsem neověřil** – veřejný zdroj s CPC pro české energetické fráze jsem nenašel. Skutečné odhady ukáže Plánovač klíčových slov v Google Ads a Návrh klíčových slov ve Skliku hned po připojení účtů; tam je první krok. Do té doby jen scénáře:

| Úroveň | Kč/den celkem | Rozdělení | Za ~38 dní (15. 11.–22. 12.) | Kdy dává smysl |
|---|---|---|---|---|
| Test | 500 | Google 350 (jen A1, A2, B1) · Sklik 150 | ≈ 19 000 Kč | Ověřit, jestli leady z reklamy dotahujete do smlouvy. |
| **Střed (doporučeno)** | **1 500** | Google 900 · Sklik 400 · Meta 200 | ≈ 57 000 Kč | Pokryje hlavní fráze po celé okno i špičku po 2. 12. |
| Agresivní | 3 000 | Google 1 700 · Sklik 700 · Meta 600 | ≈ 114 000 Kč | Jen pokud „Střed“ v prvním týdnu drží cenu za lead pod vaším limitem a fráze nejsou vyčerpané. |

Kolik prokliků to je, závisí na CPC – scénáře, ne odhad: při 1 500 Kč/den a CPC 10 / 20 / 40 Kč je to 150 / 75 / 37 prokliků denně; při konverzním poměru landing page 5 % tedy zhruba 7 / 4 / 2 leady denně. Obě čísla (CPC i konverzní poměr) je nutné nahradit skutečností po prvních dnech.

**Limit ceny za lead** si spočítejte: *maximální CPL = vaše průměrná provize za uzavřenou smlouvu × podíl leadů, které uzavřete*. Kampaně, které jsou po ~7 dnech nad limitem, omezit; rozpočet přesouvat podle CPL, ne podle prokliků. Navýšit rozpočet **2.–14. 12.** (dorazí oznámení ČEZ), od 15. 12. sledovat, jestli lidé ještě stíhají.

## 5. Meta (Facebook, Instagram)

Cíl kampaně **Prodeje/Leady → konverze na webu** (událost Pixelu `Lead`), umístění Advantage+, jen Česko, čeština. Bez Pixelu (nezadané `META_PIXEL_ID`) to nedává smysl – Meta by optimalizovala na prokliky.

**Publikum 1 – Domácnosti:** věk 30–65+, Česko, široké cílení (Advantage+ publikum) s návrhem zájmů „Bydlení“, „Úspora energie“, „Rodinný dům“. Landing `/zdrazeni-cez/domacnost`.
**Publikum 2 – Podnikatelé, OSVČ a SVJ:** věk 25–65, zájmy/demografie „Majitelé malých firem“, „Podnikání“, „Malé a střední podniky“, „Živnostník“ + zájem „Správa nemovitostí“ (SVJ). Landing `/zdrazeni-cez/firmy`.

Primární texty (první řádek musí fungovat sám, Meta zbytek zkrátí):

1. **(domácnosti – fakta)** „Máte od ČEZ elektřinu nebo plyn bez fixace? Od 1. 1. 2027 platíte víc – elektřina +330 Kč/MWh s DPH. Domácnosti mohou smlouvu vypovědět bez sankce, výpověď stačí odeslat do 22. 12. 2026. Ověřte si to ve třech otázkách.“
   Nadpis: „Týká se vás zdražení ČEZ?“ · Tlačítko: Zjistit více
2. **(domácnosti – služba)** „Nevíte, jestli se vás zdražení ČEZ týká? Odpovězte na tři otázky a hned uvidíte výsledek i orientační navýšení. Když budete chtít, porovnáme nabídky 20+ dodavatelů a změnu vyřídíme za vás. Nic nepodepisujete předem, za naši službu neplatíte.“
   Nadpis: „Ověřte smlouvu s ČEZ zdarma“ · Tlačítko: Zjistit více
3. **(podnikatelé a SVJ)** „ČEZ od 1. 1. 2027 zvyšuje ceník pro podnikatele na dobu neurčitou o 330 Kč/MWh s DPH. OSVČ mohou odejít bez sankce do 22. 12. 2026, u s.r.o. a SVJ rozhoduje smlouva. Registrovaný zprostředkovatel ERÚ připraví nezávaznou nabídku na míru.“
   Nadpis: „Zdražení ČEZ pro podnikatele“ · Tlačítko: Získat nabídku

Kreativa: jednoduchý obrázek 1:1 a 9:16 s textem „Zdražení ČEZ od 1. 1. 2027 – týká se vás?“ a datem 22. 12. Bez loga ČEZ (ochranná známka) a bez fotek, které by vypadaly jako dopis ČEZ. Kategorie „speciální reklama“ se netýká.

## 6. Provoz zdarma

### 6.1 Bannery na vlastní weby

- `kampan/bannery/nejsemosel-banner.html` – blok pro nejsemosel.cz (UTM `utm_source=nejsemosel&utm_medium=referral&utm_campaign=zdrazeni-cez&utm_content=banner`).
- `kampan/bannery/porovnanienergii-callout.html` – dvě varianty pro porovnanienergii.cz (domácnosti / firmy a SVJ).

Samostatné HTML s inline styly, bez skriptů a cookies. Weby jsem neměnil, vložení je na vás nebo na Honzovi. Poznámka: porovnanienergii.cz je samo silná konverzní stránka – pokud tam chcete lidi udržet, stačí callout odkazovat na vlastní kalkulačku/nahrání vyúčtování s textem o zdražení; leady stejně končí ve stejném CRM.

### 6.2 Vlastní klienti v CRM

Nejlevnější a nejkvalitnější zdroj: klienti, o kterých víte, že mají ČEZ na dobu neurčitou. Návrh (nic jsem nerozesílal): vytáhnout z CRM seznam, kde je dodavatel ČEZ a produkt bez fixace, a poslat krátkou informaci s odkazem `…/zdrazeni-cez?utm_source=crm&utm_medium=email&utm_campaign=zdrazeni-cez`. Posílat jen těm, kdo k tomu dali souhlas nebo jsou vaši stávající klienti (oprávněný zájem u vlastních klientů a obdobných služeb, s možností odhlášení). Text a seznam připravím, odeslání jen s vaším výslovným souhlasem.

### 6.3 SEO

- **Vlastní doména je pro SEO zásadní** – `github.io` podcesta se špatně buduje. Po přepnutí nastavit Search Console + Seznam Webmaster, odeslat sitemap.
- Stránky už mají: unikátní `title`/`description`, kanonické URL, FAQ strukturovaná data (`FAQPage`), průvodce `/pruvodce/zdrazeni-cez-2027` se zdroji. Hlavní cílové fráze: „zdražení ČEZ 2027“, „výpověď ČEZ bez sankce“, „ČEZ zdražení na dobu neurčitou“, „ČEZ zdražení podnikatelé“.
- **Odkazy:** banner z nejsemosel.cz a porovnanienergii.cz (relevantní odkazy z vlastních webů), sdílení v místních skupinách SVJ a podnikatelů.
- Realisticky: za 5 týdnů nová doména na konkurenční fráze vysoko nevyroste. SEO je investice pro příští zdražení a pro stránku po 22. 12. – placené kanály a vlastní databáze jsou pro toto okno důležitější.

## 7. KPI a kontrolní body

| Kdy | Co zkontrolovat |
|---|---|
| Den 1 | Konverze se propisují (testovací lead), reklamy schválené, hledané výrazy. |
| Den 3–4 | Vylučující slova podle hledaných výrazů, CTR > 5 % u A1/A2 (pod tím přepsat nadpisy). |
| Den 7 | CPL podle kampaní vs. váš limit; přepnout na Max. konverze tam, kde je 15+ konverzí. |
| 2. 12. | Navýšit rozpočet, přidat do landing page větu o dopisu od ČEZ. |
| 22. 12. 23:59 | **Vypnout** všechny reklamy s textem o výpovědi bez sankce. Banner a callouty stáhnout nebo přepsat. |
| Leden | Vyhodnotit: leady → uzavřené smlouvy podle `utm_campaign` v CRM. |

## 8. Rizika a pravidla

- Žádná vymyšlená čísla, recenze ani úspory. Úspora se nikde neslibuje, jen „porovnáme / spočítáme“.
- Text o odchodu bez sankce vždy s omezením na domácnosti a OSVČ; u firem „rozhoduje smlouva“.
- Web ani reklamy se nesmí tvářit jako ČEZ (žádné logo, barvy ani „oficiální“).
- Měření jen se souhlasem; bez ID se nic nenačítá.
- Po 22. 12. přestávají platit hlavní sdělení – viz kapitola 7.
