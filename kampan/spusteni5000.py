#!/usr/bin/env python3
"""Podklad pro test 5 000 Kč (G8 + G9, Google Ads 582-729-4543): kontrola délek a CSV pro Google Ads Editor. Nic neodesílá."""
import csv, sys
D = 'https://zmenitdodavatele.cz'
START, END = '2026-11-23', '2026-11-29'
C = {
 'G8 | ZD | Search | Výpověď a termín': dict(budget=450, cpc=20, groups={
   'Výpověď smlouvy': dict(url=f'{D}/kalkulacky/termin-vypovedi', utm='utm_source=google&utm_medium=cpc&utm_campaign=zd-test-5000&utm_content=g8-vypoved&utm_term={keyword}',
     kw=[('výpověď smlouvy na elektřinu','Phrase'),('výpověď smlouvy na plyn','Phrase'),('výpověď smlouvy na energie','Phrase'),('jak vypovědět smlouvu na elektřinu','Phrase'),
         ('jak vypovědět smlouvu na plyn','Phrase'),('výpovědní lhůta elektřina','Phrase'),('výpovědní doba elektřina','Phrase'),('výpovědní lhůta plyn','Phrase'),
         ('kdy podat výpověď elektřina','Phrase'),('výpověď dodavateli elektřiny','Phrase'),('výpověď smlouvy na dobu neurčitou elektřina','Phrase'),
         ('výpověď smlouvy elektřina','Exact'),('výpověď elektřiny','Exact')])},
   neg=['čez','innogy','vzor','pdf','word','stěhování','úmrtí','nájem','nájemní','pronájem','zaměstnanec','pracovní','internet','telefon','o2','vodafone','t-mobile','pojištění','odstoupení od smlouvy uzavřené na dálku','zdarma ke stažení'],
   H=['Výpověď smlouvy na energie','Spočítejte termín výpovědi','Kalkulačka výpovědi zdarma','Kdy můžete smlouvu vypovědět','Výpověď elektřiny i plynu',
      'Lhůta 20 dní před koncem','Bez fixace? 3 měsíce výpovědi','Nezávazné srovnání nabídek','Zprostředkovatel ERÚ','Pomůžeme s výběrem dodavatele',
      'Nic nepodepisujete předem','Výsledek hned na obrazovce','Domácnosti, OSVČ i firmy','Zavolá vám člověk, ne robot','Firma od roku 2009'],
   Dsc=['Zadejte typ smlouvy a datum. Kalkulačka ukáže poslední den, kdy výpověď musí dorazit.',
        'Smlouvu na dobu neurčitou lze vypovědět kdykoli, výpovědní doba jsou tři měsíce (ERÚ).',
        'Chcete levnějšího dodavatele? Připravíme nezávazné srovnání a pomůžeme se změnou.',
        'Registrovaný zprostředkovatel ERÚ. Ozveme se zpravidla do jednoho pracovního dne.']),
 'G9 | ZD | Search | Zdražení ČEZ firmy': dict(budget=200, cpc=35, groups={
   'ČEZ podnikatelé': dict(url=f'{D}/zdrazeni-cez/firmy', utm='utm_source=google&utm_medium=cpc&utm_campaign=zd-test-5000&utm_content=g9-firmy&utm_term={keyword}',
     kw=[('čez zdražení podnikatelé','Exact'),('čez zdražení podnikatelé','Phrase'),('čez ceník podnikatelé 2027','Phrase'),('čez elektřina podnikatelé','Phrase'),
         ('elektřina na dobu neurčitou podnikatelé','Phrase'),('čez zdražení firmy','Phrase'),('čez zdražení osvč','Phrase'),('čez zdražení živnostník','Phrase'),
         ('zdražení elektřiny podnikatelé 2027','Phrase'),('zdražení energií firmy 2027','Phrase'),('čez zdražení svj','Phrase')])},
   neg=['domácnost','domácnosti','byt','akcie','dividenda','burza','práce','kariéra','e.on','eon','innogy'],
   H=['Zdražení ČEZ pro podnikatele','ČEZ od 1. 1. 2027 +330 Kč/MWh','Ceník na dobu neurčitou dráž','OSVČ mohou odejít bez sankce','U s.r.o. rozhoduje smlouva',
      'Nezávazná nabídka pro firmu','Elektřina pro firmy a SVJ','Ozvěte se do 12. 12. 2026','Zprostředkovatel ERÚ','Spočítejte dopad zdražení',
      'Nabídka na míru zdarma','Pro OSVČ, firmy i SVJ','Nic nepodepisujete předem','Zavolá vám člověk, ne robot','Firma od roku 2009'],
   Dsc=['ČEZ zvyšuje ceník Elektřina na dobu neurčitou pro podnikatele o 330 Kč/MWh s DPH.',
        'Podnikající fyzické osoby mohou bez sankce odejít. U právnických osob rozhoduje smlouva.',
        'Připravíme nezávaznou nabídku na míru. Nic nepodepisujete předem, rozhodnutí je na vás.',
        'Registrovaný zprostředkovatel ERÚ. Aby nový dodavatel stihl 1. 1., ozvěte se do 12. 12.']),
}
err = []
for n, c in C.items():
    if len(c['H']) != 15 or len(set(c['H'])) != 15 or len(c['Dsc']) != 4: err.append(f'{n}: počet')
    err += [f'{n}: H>{30}: {h} ({len(h)})' for h in c['H'] if len(h) > 30]
    err += [f'{n}: D>{90}: {d} ({len(d)})' for d in c['Dsc'] if len(d) > 90]
    err += [f'{n}: zakázané: {t}' for t in c['H'] + c['Dsc'] if any(x in t.lower() for x in ('20+', 'rovnou potvrdit', 'nejlevnější', 'zaručen'))]
if err: sys.exit('\n'.join(err))
tot = sum(c['budget'] for c in C.values()) * 7
assert tot <= 5000, tot
rows = []
hdr = ['Campaign','Campaign Type','Networks','Campaign Status','Budget','Budget type','Bid Strategy Type','Maximum CPC bid limit','Start Date','End Date','Languages','Location','Ad Group','Ad Group Status','Keyword','Criterion Type','Final URL','Final URL suffix','Ad type','Status'] + [f'Headline {i}' for i in range(1,16)] + [f'Description {i}' for i in range(1,5)]
E = lambda **k: [k.get(h, '') for h in hdr]
for n, c in C.items():
    rows.append(E(**{'Campaign': n, 'Campaign Type': 'Search', 'Networks': 'Google search', 'Campaign Status': 'Paused', 'Budget': c['budget'], 'Budget type': 'Daily',
        'Bid Strategy Type': 'Maximize clicks', 'Maximum CPC bid limit': c['cpc'], 'Start Date': START, 'End Date': END, 'Languages': 'cs', 'Location': 'Czechia'}))
    for t in c['neg']:
        rows.append(E(**{'Campaign': n, 'Keyword': t, 'Criterion Type': 'Campaign Negative Phrase'}))
    for g, a in c['groups'].items():
        rows.append(E(**{'Campaign': n, 'Ad Group': g, 'Ad Group Status': 'Enabled'}))
        for k, m in a['kw']:
            rows.append(E(**{'Campaign': n, 'Ad Group': g, 'Keyword': k, 'Criterion Type': m, 'Status': 'Enabled'}))
        ad = {'Campaign': n, 'Ad Group': g, 'Ad type': 'Responsive search ad', 'Final URL': a['url'], 'Final URL suffix': a['utm'], 'Status': 'Enabled'}
        ad.update({f'Headline {i+1}': h for i, h in enumerate(c['H'])}); ad.update({f'Description {i+1}': d for i, d in enumerate(c['Dsc'])})
        rows.append(E(**ad))
with open('spusteni-5000-google-ads-editor.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f); w.writerow(hdr); w.writerows(rows)
print('OK délky, celkem max', tot, 'Kč;', len(rows), 'řádků CSV')
if '--md' in sys.argv:
    for n, c in C.items():
        print(f'\n### {n}\n\nDenní rozpočet **{c["budget"]} Kč**, Max. kliknutí, strop CPC **{c["cpc"]} Kč**, {START} – {END}, jen Vyhledávání Google (bez partnerů), Česko – přítomnost, čeština, stav POZASTAVENO.\n')
        for g, a in c['groups'].items():
            print(f'**Sestava „{g}“** – cílová URL `{a["url"]}`, přípona finální URL `{a["utm"]}`\n')
            print('Klíčová slova: ' + ', '.join(f'[{k}]' if m == 'Exact' else f'"{k}"' for k, m in a['kw']) + '\n')
        print('Vylučující (frázová, na kampaň): ' + ', '.join(c['neg']) + '\n')
        print('| # | Nadpis (≤ 30) | Zn. |\n|---|---|---|'); [print(f'| {i+1} | {h} | {len(h)} |') for i, h in enumerate(c['H'])]
        print('\n| # | Popis (≤ 90) | Zn. |\n|---|---|---|'); [print(f'| {i+1} | {d} | {len(d)} |') for i, d in enumerate(c['Dsc'])]
