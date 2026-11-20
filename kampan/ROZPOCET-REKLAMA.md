# Návrh měsíčního rozpočtu na reklamu pro zmenitdodavatele.cz (21. 11.–20. 12. 2026)

Stav: **jen návrh, nic není spuštěné ani zaplacené.** Spustit až po schválení rozpočtu Václavem.
**Všechna CPC, konverzní poměry, počty leadů a CPL níže jsou ODHADY.** Plánovač klíčových slov Google ani Sklik pro tyto fráze nemám ověřené (API Google Ads: DEVELOPER_TOKEN_NOT_APPROVED). Po 3–5 dnech je nahradí skutečná čísla.

## Vstupy

- Marže: domácnost **1 400 Kč**, podnikatel/firma/SVJ **4 400 Kč**. Uzavření 30 % → **max. CPL 420 Kč (domácnost), 1 320 Kč (firma/SVJ)**.
- Pozor, rozpor: kill limity v `marketing-agenti` (PE kampaně) jsou přísnější – **175 Kč** domácnost, **586 Kč** firma, 462 Kč SVJ. Tady počítám s limity z plánu leadů (420 / 1 320). Václav by měl rozhodnout, která sada platí.
- Časové okno: výpověď bez sankce do **22. 12.** Nový dodavatel ale musí změnu nahlásit OTE do **16. 12. 10:00**, takže doporučený termín „ozvěte se“ je **12. 12.** Reklamy na zdražení ČEZ má smysl točit **do 14.–16. 12.** Pak přepnout na obecná sdělení (konec fixace, změna dodavatele) s nízkým rozpočtem, nebo vypnout.
- Špička: ČEZ musí zákazníkům poslat oznámení do **2. 12.** Kolem 2.–12. 12. čekám nejvíc hledání.

## Co už běží v Google Ads 582-729-4543 (nezdvojovat)

| Kampaň | Cíl | Kč/den | Poznámka |
|---|---|---|---|
| G7 PE Search Zdražení ČEZ / innogy 2027 | porovnanienergii.cz/zdrazeni-2027 | 250 | do 12. 12., 5 reklam bylo zamítnuto za 404 → stránka teď vrací 200 (ověřeno 20. 11.), čeká na nové posouzení |
| G6 PE SVJ a BD | porovnanienergii.cz/energie-pro-svj | 40 | |
| G4 PE Firmy a OSVČ | porovnanienergii.cz (firmy) | 90 | strop CPC 45 Kč |
| G5 PE Konec smlouvy a vyúčtování | porovnanienergii.cz | 70 | |

Klíčová slova G7 pokrývají „čez zdražení“, „výpověď čez“, „odstoupení od smlouvy čez“ a podobné. **Druhá Google kampaň na stejná slova ze stejného účtu by soutěžila sama se sebou** (Google v jedné aukci ukáže jen jednu reklamu inzerenta), proto pro zmenitdodavatele.cz **žádnou novou Google vyhledávací kampaň nenavrhuji.**

Místo toho navrhuji (bez peněz navíc) **G7 experiment cílové stránky**: v G7 přes „Experimenty“ pustit 50 % provozu na `https://zmenitdodavatele.cz/zdrazeni-cez/domacnost?utm_source=google&utm_medium=cpc&utm_campaign=pe-zdrazeni-2027&utm_content=g7-zd` na 14 dní. Rozpočet G7 zůstává 250 Kč/den. Vyhodnotí se počet leadů v CRM (`utm_content=g7-zd` vs. `g7`), protože na zmenitdodavatele.cz zatím není Google Ads konverzní tag. Pokud chce Václav experiment, přidat `GADS_ID` + `GADS_LEAD_LABEL` jako proměnné repa.

## Nové kampaně – co dosud nikdo nepokrývá: Sklik a Meta

| Kampaň | Segment | Landing | Kč/den (test 14 dní) | CPC (odhad) | Konv. poměr (odhad) | Leady / 30 dní (odhad) | CPL (odhad) | Max. CPL |
|---|---|---|---|---|---|---|---|---|
| **S1 Sklik – Zdražení ČEZ – domácnosti** | domácnosti | `/zdrazeni-cez/domacnost` | **200** | 7–12 Kč | 3–5 % | 15–40 (střed ~25) | 140–400 (střed ~240) | 420 |
| **S2 Sklik – Zdražení ČEZ – firmy a SVJ** | OSVČ, firmy, SVJ | `/zdrazeni-cez/firmy` | **100** | 12–25 Kč | 2–4 % | 2–10 (střed ~5) | 300–1 250 (střed ~600) | 1 320 |
| **M1 Meta – domácnosti** (jen s Pixelem) | domácnosti 30–65+ | `/zdrazeni-cez/domacnost` | **150** | 4–8 Kč (klik na odkaz) | 1,5–3 % | 8–30 (střed ~15) | 130–530 (střed ~300) | 420 |
| **M2 Meta – OSVČ, firmy, SVJ** (jen s Pixelem) | podnikatelé, správci domů | `/zdrazeni-cez/firmy` | **100** | 8–15 Kč | 1–2 % | 2–8 (střed ~4) | 400–1 500 (střed ~750) | 1 320 |
| **Celkem nové** | | | **550 Kč/den** | | | **~50 leadů (odhad)** | | |

**Měsíc (30 dní) při 550 Kč/den: ≈ 16 500 Kč** navíc k už běžícím PE kampaním (~450 Kč/den ≈ 13 700 Kč).
**Očekávaná marže (odhad):** ~40 leadů domácnost × 30 % × 1 400 Kč ≈ 16 800 Kč + ~9 firem/SVJ × 30 % × 4 400 Kč ≈ 11 900 Kč → **≈ 28 700 Kč** při útratě 16 500 Kč. Při spodních odhadech (CPL u stropu) vychází zhruba na nulu. Proto test a tvrdá pravidla vypnutí.

Rozdělení: domácnosti 350 Kč/den (64 %), firmy/SVJ 200 Kč/den (36 %). Sklik 300 Kč/den, Meta 250 Kč/den, Google 0 Kč navíc.

### Předpoklady před spuštěním (bez nich nespouštět)

1. **Sklik:** konverze „Lead“ → `SKLIK_CONV_ID` do proměnných repa (kód webu je připravený, `KAMPAN-CEZ.md` kap. 2).
2. **Meta:** `META_PIXEL_ID` – bez Pixelu Meta optimalizuje na prokliky a CPL bude horší. Bez Pixelu M1/M2 nespouštět, peníze přesunout do S1.
3. Cookie lišta se zapne automaticky s prvním ID (Consent Mode v2).
4. Lead se počítá v CRM e-mailu (`akce: zmenitdodavatele` + `utm_source=seznam` / `facebook`), ne jen v reklamním systému.

## Testovací fáze (dny 1–14) a pravidla

**Nabídky:** Sklik – ruční CPC se stropem (S1 15 Kč, S2 30 Kč). Meta – cíl Leady / konverze na webu (událost `Lead`), Advantage+ umístění, bez zvyšování rozpočtu prvních 7 dní (learning).

**Vypnout (pozastavit) kampaň, když:**
- utratí **2× max. CPL bez jediného leadu**: domácnosti **840 Kč**, firmy/SVJ **2 640 Kč**,
- po 5+ leadech je CPL **nad max. CPL** (420 / 1 320 Kč) déle než 5 dní,
- víc než polovina leadů je nekontaktovatelná nebo mimo cíl (např. „chci jen zjistit cenu“, cizí distribuční území mimo nabídku),
- Sklik: CTR pod 1 % po 1 000 zobrazeních (špatná slova/text) → nejdřív opravit, pak teprve vypnout,
- Meta: frekvence nad 3 a CPL roste → vyměnit kreativu, jinak vypnout,
- **vždy po 16. 12.** u sdělení o zdražení ČEZ (přechod k 1. 1. už nestihneme).

**Škálovat, když:**
- CPL je **pod 70 % max. CPL** (domácnosti < 295 Kč, firmy < 925 Kč) **a** kampaň vyčerpává denní rozpočet → +30 % každé 3–4 dny,
- strop pro nové kampaně v tomto měsíci: **1 100 Kč/den** (dvojnásobek testu) bez dalšího schválení Václava,
- v týdnu **2.–12. 12.** (oznámení ČEZ) lze přesunout rozpočet z kampaně nad limitem do kampaně pod limitem.

**Den 14 – rozhodnutí:** kampaně pod max. CPL pokračují (případně +30 %), nad limitem vypnout a ušetřené peníze buď přesunout, nebo nechat neutracené. Výsledek shrnout Václavovi.

## Po 16. 12. (nejasné, rozhodnout později)

Sdělení „zdražení ČEZ“ vypnout. Volitelně nechat S1 se slovy „konec fixace“ / „změna dodavatele energie“ za 100 Kč/den → `/kalkulacky/termin-vypovedi` a průvodci. Rozhodnout podle CPL z testu.
