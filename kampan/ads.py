# Zdroj textů reklam (Google Ads / Sklik RSA). Kontrola délek: python3 kampan/ads.py  → vypíše markdown a chyby.
import sys
D = 'https://strakaw-cmd.github.io/leadweb'  # po koupi domény: https://www.zmenitdodavatele.cz
G = {
 'A1 Zdražení ČEZ (domácnosti)': ('/zdrazeni-cez/domacnost', 'domacnost-zdrazeni', [
  (['Zdražení ČEZ od 1. 1. 2027', 'Elektřina +330 Kč/MWh s DPH', 'Týká se vás zdražení? Ověřte', 'Smlouva bez fixace? Pozor', 'Výpověď stačí do 22. 12.', 'Test o 3 otázkách zdarma'],
   ['ČEZ zvyšuje ceny u smluv na dobu neurčitou od 1. 1. 2027. Ověřte, jestli se vás to týká.', 'Domácnosti mohou smlouvu vypovědět bez sankce. Výpověď stačí odeslat do 22. 12. 2026.']),
  (['Porovnejte nabídky zdarma', '20+ dodavatelů v porovnání', 'Spočítejte, kolik zaplatíte', 'Srovnání od zprostředkovatele', 'Nezávazně a zdarma', 'Zavolá vám člověk, ne robot'],
   ['Spočítáme, o kolik vám cena od 1. 1. 2027 vzroste, a porovnáme nabídky 20+ dodavatelů.', 'Nic nepodepisujete předem. Rozhodnutí je jen na vás, za naši službu neplatíte.']),
  (['Registrovaný zprostředkovatel', 'Na trhu energií od roku 2009', 'Výpověď i smlouvu vyřídíme', 'Bez sankce do 22. 12. 2026', 'Infolinka Po–Pá 8–17', 'Ověřte smlouvu s ČEZ zdarma'],
   ['PorovnáníEnergií.cz: registrovaný zprostředkovatel ERÚ, v energetice od roku 2009.', 'Ozveme se zpravidla do jednoho pracovního dne a projdeme s vámi smlouvu i nabídky.']),
 ]),
 'A2 Výpověď ČEZ bez sankce (domácnosti)': ('/zdrazeni-cez/domacnost', 'domacnost-vypoved', [
  (['Výpověď ČEZ bez sankce', 'Odeslat stačí do 22. 12. 2026', 'Zákonné právo podle § 11a', 'Pro domácnosti a OSVČ', 'Ověřte, zda máte nárok', 'Zdražení od 1. 1. 2027'],
   ['Při zdražení lze smlouvu na dobu neurčitou vypovědět bez sankce. Ověřte to ve 3 krocích.', 'Smlouva pak skončí 31. 12. 2026 a nový dodavatel může navázat od 1. 1. 2027.']),
  (['Výpověď vyřídíme za vás', 'Nový dodavatel od 1. 1. 2027', 'Dodávka se nepřeruší', 'Srovnání 20+ dodavatelů', 'Nezávazně a zdarma', 'Jak vypovědět smlouvu s ČEZ'],
   ['Při změně podá výpověď nový dodavatel na základě plné moci. Pomůžeme vám s výběrem.', 'Projdeme s vámi smlouvu a nabídky. Nic nepodepisujete předem, služba je zdarma.']),
  (['Lhůta končí 22. 12. 2026', 'Bez fixace? Můžete odejít', 'Domácnosti a OSVČ bez pokuty', 'Poradíme zdarma, Po–Pá 8–17', 'Zprostředkovatel ERÚ od 2009', 'Ověřte to za 3 otázky'],
   ['Zprostředkovatel registrovaný u ERÚ. Poradíme, jestli odchod dává smysl, a porovnáme ceny.', 'Pokud vám nová cena vyhovuje, nemusíte dělat nic. Rozhodnutí je jen na vás.']),
 ]),
 'A3 Změna dodavatele (obecné, domácnosti)': ('/zdrazeni-cez', 'domacnost-zmena', [
  (['Změna dodavatele elektřiny', 'Porovnejte 20+ dodavatelů', 'Srovnání zdarma a nezávazně', 'Vyřídíme změnu za vás', 'Zprostředkovatel ERÚ', 'Dodávka se nepřeruší'],
   ['Porovnáme nabídky pro vaši spotřebu a vyřídíme změnu dodavatele. Za naši službu neplatíte.', 'Registrovaný zprostředkovatel ERÚ, na trhu s energiemi od roku 2009.']),
  (['Máte ČEZ bez fixace?', 'Od 1. 1. 2027 zaplatíte víc', 'Ověřte to třemi otázkami', 'Změna dodavatele zdarma', 'Na trhu od roku 2009', 'Nezávazná nabídka'],
   ['ČEZ zdražuje smlouvy na dobu neurčitou. Zjistěte, jestli se vás to týká a co můžete dělat.', 'Domácnosti a OSVČ mohou bez sankce odejít, výpověď stačí odeslat do 22. 12. 2026.']),
  (['Změna dodavatele plynu', 'Kolik ušetříte? Spočítáme', 'Bez poplatku za naši službu', 'Infolinka Po–Pá 8–17', 'Projdeme vaši smlouvu', 'Elektřina i plyn'],
   ['Nechte kontakt, zavoláme vám a připravíme srovnání nabídek elektřiny i plynu.', 'Ozveme se zpravidla do jednoho pracovního dne. Nic nepodepisujete předem.']),
 ]),
 'B1 Zdražení ČEZ (podnikatelé, firmy)': ('/zdrazeni-cez/firmy', 'firmy-zdrazeni', [
  (['Zdražení ČEZ pro podnikatele', 'Elektřina +330 Kč/MWh s DPH', 'Ceník bez fixace od 1. 1. 2027', 'OSVČ mohou odejít bez sankce', 'Firmy: rozhoduje smlouva', 'Individuální nabídka pro firmu'],
   ['ČEZ od 1. 1. 2027 zvyšuje ceník pro podnikatele na dobu neurčitou o 330 Kč/MWh s DPH.', 'Připravíme nabídku pro OSVČ, s.r.o. i SVJ. Pošlete vyúčtování, zbytek vyřešíme.']),
  (['Energie pro firmy a SVJ', 'Individuální ceny dodavatelů', 'Více odběrných míst? Vyřešíme', 'Srovnání 20+ dodavatelů', 'Na trhu od roku 2009', 'Nezávazná nabídka zdarma'],
   ['U partnerských dodavatelů umíme poptat individuální ceny. Nabídka je nezávazná.', 'Odběrná místa, sazby a smlouvy projdeme za vás. Ozveme se zpravidla do 1 pracovního dne.']),
  (['Zprostředkovatel ERÚ', 'Ověřte smlouvu s ČEZ zdarma', 'Výpověď a změnu vyřídíme', 'Pro OSVČ, s.r.o. a SVJ', 'Spočítejte dopad zdražení', 'Infolinka Po–Pá 8–17'],
   ['OSVČ mohou smlouvu vypovědět bez sankce do 22. 12. 2026. U s.r.o. a SVJ rozhoduje smlouva.', 'PorovnáníEnergií.cz, registrovaný zprostředkovatel ERÚ č. 742238366, od roku 2009.']),
 ]),
 'B2 SVJ a bytové domy': ('/zdrazeni-cez/firmy', 'firmy-svj', [
  (['Energie pro SVJ a družstva', 'Zdražení ČEZ od 1. 1. 2027', 'Rozhoduje smlouva SVJ', 'Projdeme smlouvu zdarma', 'Individuální nabídka pro SVJ', 'Srovnání 20+ dodavatelů'],
   ['U SVJ a družstev rozhoduje smlouva a obchodní podmínky. Projdeme je a porovnáme nabídky.', 'Pošlete vyúčtování společných prostor. Připravíme nezávazné srovnání zdarma.']),
  (['Na trhu energií od roku 2009', 'Zprostředkovatel ERÚ', 'Vyřídíme změnu dodavatele', 'Nezávazně a zdarma', 'Více odběrných míst? Vyřešíme', 'Ozveme se do 1 prac. dne'],
   ['Registrovaný zprostředkovatel ERÚ, v energetice od roku 2009. Pomáháme i SVJ a družstvům.', 'Projdeme smlouvu, spotřebu i sazby. O změně rozhoduje výbor, my připravíme srovnání.']),
  (['Smlouva SVJ bez fixace?', 'Zjistěte dopad zdražení', 'Elektřina +330 Kč/MWh s DPH', 'Nabídka pro SVJ zdarma', 'Infolinka Po–Pá 8–17', 'Porovnání energií pro SVJ'],
   ['ČEZ od 1. 1. 2027 zdražuje produkty na dobu neurčitou. Ověřte, zda se to týká vašeho SVJ.', 'Nechte kontakt a zavoláme vám. Srovnání je nezávazné a za naši službu neplatíte.']),
 ]),
}
err = []; out = []
for g, (path, content, rsas) in G.items():
    camp = 'firmy' if g.startswith('B') else 'domacnost'
    out.append(f'#### {g}\n\nCílová URL: `{D}{path}?utm_source=google&utm_medium=cpc&utm_campaign=zdrazeni-cez-{camp}&utm_content={content}&utm_term={{keyword}}`  \n'
               f'Sklik: stejná URL s `utm_source=seznam&utm_campaign=zdrazeni-cez-{camp}-sklik`\n')
    for i, (H, Ds) in enumerate(rsas, 1):
        if len(H) < 3 or len(Ds) < 2: err.append(f'{g} RSA{i}: málo prvků')
        for h in H:
            if len(h) > 30: err.append(f'{g} RSA{i} nadpis {len(h)} > 30: {h}')
        for d in Ds:
            if len(d) > 90: err.append(f'{g} RSA{i} popis {len(d)} > 90: {d}')
        out.append(f'**RSA {i}**\n\n| Nadpisy (≤ 30 znaků) | Znaků |\n|---|---|\n' + '\n'.join(f'| {h} | {len(h)} |' for h in H)
                   + '\n\n| Popisky (≤ 90 znaků) | Znaků |\n|---|---|\n' + '\n'.join(f'| {d} | {len(d)} |' for d in Ds) + '\n')
SL = [('Týká se mě zdražení?', 'Test o třech otázkách', 'Výsledek hned na stránce', '/zdrazeni-cez#kviz'),
      ('Pro domácnosti', 'Byt, dům, chata bez IČO', 'Lhůta výpovědi do 22. 12.', '/zdrazeni-cez/domacnost'),
      ('Pro firmy a SVJ', 'OSVČ, s.r.o., SVJ, družstva', 'Individuální nabídka', '/zdrazeni-cez/firmy'),
      ('Průvodce zdražením', 'Co se mění od 1. 1. 2027', 'Zdroje: ceníky ČEZ, zákon', '/pruvodce/zdrazeni-cez-2027'),
      ('Kdy podat výpověď', 'Kalkulačka termínu', 'Podle pravidel ERÚ', '/kalkulacky/termin-vypovedi'),
      ('Časté otázky', 'Koho se zdražení týká', 'Co když nepřišlo oznámení', '/zdrazeni-cez#otazky')]
out.append('#### Rozšíření o odkazy na podstránky (sitelinky)\n\n| Text (≤ 25) | Popis 1 (≤ 35) | Popis 2 (≤ 35) | URL |\n|---|---|---|---|')
for t, d1, d2, u in SL:
    if len(t) > 25 or len(d1) > 35 or len(d2) > 35: err.append(f'sitelink {t}: {len(t)}/{len(d1)}/{len(d2)}')
    out.append(f'| {t} ({len(t)}) | {d1} ({len(d1)}) | {d2} ({len(d2)}) | `{u}` |')
CO = ['Zdarma a nezávazně', 'Zprostředkovatel ERÚ', 'Na trhu od roku 2009', '20+ dodavatelů', 'Infolinka Po–Pá 8–17', 'Výpověď vyřídíme']
for c in CO:
    if len(c) > 25: err.append(f'callout {c}')
out.append('\n#### Popisky (callouts, ≤ 25 znaků)\n\n' + ' · '.join(f'{c} ({len(c)})' for c in CO))
if '--md' in sys.argv: print('\n'.join(out))
print('CHYBY:' if err else 'OK: všechny délky v limitu', *err, sep='\n', file=sys.stderr)
