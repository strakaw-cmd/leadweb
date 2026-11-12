(() => {
  const B = document.documentElement.dataset.base || '', STATIC = document.documentElement.dataset.static === '1';
  const fmt = (n) => Math.round(n).toLocaleString('cs-CZ') + ' Kč';
  const val = (f, n) => { const v = (f.elements[n]?.value || '').replace(/\s/g, '').replace(',', '.'); return v === '' ? null : Number(v); };
  const utm = {}; const sp = new URLSearchParams(location.search);
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']) { const v = sp.get(k) || sessionStorage.getItem('u_' + k); if (v) { utm[k] = v; sessionStorage.setItem('u_' + k, v); } }

  // Události funnelu jen tam, kde běží vlastní backend (server.js / Cloudflare). Na statickém hostingu (GitHub Pages) se tiše nic neposílá.
  const ev = STATIC ? () => {} : (e, extra = {}) => { try { const b = JSON.stringify({ e, p: location.pathname, ...extra }); navigator.sendBeacon ? navigator.sendBeacon(B + '/api/event', new Blob([b], { type: 'application/json' })) : fetch(B + '/api/event', { method: 'POST', body: b, keepalive: true }).catch(() => {}); } catch {} };
  let quizText = '';

  // ---- kvíz Zdražení ČEZ (fakta: src/cez.mjs, předávají se přes data-*) ----
  document.querySelectorAll('section.quiz').forEach((sec) => {
    const f = sec.querySelector('form'), out = sec.querySelector('.quizres'), seg = sec.dataset.seg;
    let started = false;
    f.addEventListener('change', () => { if (!started) { started = true; ev('quiz_start', { c: 'zdrazeni-cez' }); } });
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const q1 = f.elements.q1.value, q2 = f.elements.q2.value, forma = f.elements.forma ? f.elements.forma.value : '';
      if (!q1 || !q2) { out.hidden = false; out.innerHTML = '<p class="err">Odpovězte prosím na otázky 1 a 2.</p>'; return; }
      const el = val(f, 'q3el'), pl = val(f, 'q3pl'), z = val(f, 'q3z');
      const cez = ['el', 'pl', 'oboje'].includes(q1);
      let r, html;
      const right = forma === 'po'
        ? '<p>U firem (s.r.o., a.s.), SVJ a družstev se zákonné právo odejít bez postihu podle § 11a nevztahuje automaticky – rozhoduje smlouva a obchodní podmínky ČEZ. Zkontrolujte oznámení o změně ceny.</p>'
        : '<p><strong>Výpověď bez sankce stačí odeslat do 22. prosince 2026.</strong> Smlouva pak skončí 31. prosince 2026 a nový dodavatel může navázat od 1. ledna 2027.</p>';
      if (cez && q2 === 'neurcita') { r = 'tyka'; html = '<h3>Zdražení se vás týká</h3><p>Od 1. ledna 2027 platí u vaší smlouvy nové ceny ČEZ.</p>' + right; }
      else if ((cez && q2 === 'nevim') || (q1 === 'nevim' && q2 !== 'fixace')) { r = 'asi'; html = '<h3>Pravděpodobně se vás týká</h3><p>Ověřte na vyúčtování nebo v zákaznickém účtu, kdo je váš dodavatel a zda máte produkt „na dobu neurčitou“. Pokud ano:</p>' + right; }
      else if (cez && q2 === 'fixace') { r = 'fixace'; html = '<h3>Během fixace se vás zdražení netýká</h3><p>Pevnou cenu dodavatel během fixace měnit nemůže. Pohlídejte si konec fixace – při automatickém prodloužení musí výpověď dorazit nejpozději 20. den před koncem. <a href="' + B + '/kalkulacky/termin-vypovedi">Spočítat termín</a>.</p>'; }
      else { r = 'netyka'; html = '<h3>Tohle zdražení se vás netýká</h3><p>Týká se jen zákazníků ČEZ Prodej se smlouvou na dobu neurčitou. I jiní dodavatelé ale mohou ceny měnit – zdražení vám musí oznámit nejméně 30 dní předem.</p>'; }
      if (r === 'tyka' || r === 'asi') {
        const rows = [];
        if (el && q1 !== 'pl') rows.push(`elektřina ${el.toLocaleString('cs-CZ')} MWh × 330 Kč = <b>${fmt(el * 330)}</b> ročně navíc`);
        if (pl && q1 !== 'el') { if (seg === 'firmy' || forma) rows.push('plyn: ceník ČEZ pro podnikatele jsme neověřili, odhad neuvádíme'); else rows.push(`plyn ${pl.toLocaleString('cs-CZ')} MWh × 180 Kč = <b>${fmt(pl * 180)}</b> ročně navíc`); }
        const numeric = rows.some((x) => x.includes('<b>'));
        if (rows.length && !numeric) html += `<p class="muted">${rows.join(' ')}</p>`;
        if (numeric) html += `<p>Orientační navýšení za samotnou dodávku (s DPH):</p><ul><li>${rows.join('</li><li>')}</li></ul><p class="muted">Podle ceníků ČEZ (elektřina +330 Kč/MWh, u části dvoutarifních sazeb domácností +340 ve VT) a údajů ČEZ pro plyn domácností (+180 Kč/MWh). Bez změn regulované části.</p>`;
        else if (z) html += '<p class="muted">Z výše zálohy navýšení spolehlivě spočítat nejde (záloha je jen odhad). Pro odhad zadejte roční spotřebu z vyúčtování.</p>';
        html += '<p><a class="btn" href="#poptavka">Chci porovnat nabídky</a></p>';
      }
      out.hidden = false; out.innerHTML = html;
      ev('quiz_done', { c: 'zdrazeni-cez', r });
      const L = { el: 'elektřina od ČEZ', pl: 'plyn od ČEZ', oboje: 'elektřina i plyn od ČEZ', jiny: 'jiný dodavatel', nevim: 'nevím' };
      quizText = `výsledek=${r}; dodavatel=${L[q1]}; smlouva=${q2}${forma ? '; odběratel=' + (forma === 'po' ? 'právnická osoba' : 'OSVČ') : ''}${el ? '; el ' + el + ' MWh' : ''}${pl ? '; plyn ' + pl + ' MWh' : ''}${z ? '; záloha ' + z + ' Kč' : ''}`;
      const lf = document.querySelector('form.leadform[data-campaign]');
      if (lf) {
        const k = { el: 'elektrina', pl: 'plyn', oboje: 'oboje' }[q1]; if (k) lf.querySelector(`input[name=komodita][value=${k}]`).checked = true;
        if (seg === 'firmy' || forma) lf.querySelector('input[name=segment][value=firma]').checked = true;
        if (!lf.elements.note.value) lf.elements.note.value = 'Zdražení ČEZ – neurčitá smlouva';
      }
    });
  });

  // ---- přímé odeslání do CRM (statický hosting): stejný formát jako functions/api/lead.js ----
  const SEG = { domacnost: 'Domácnost', firma: 'Firma / podnikatel', svj: 'SVJ / bytový dům' };
  const KOM = { elektrina: 'Elektřina', plyn: 'Plyn', oboje: 'Elektřina i plyn' };
  async function sendCrm(d) {
    const tag = 'zmenitdodavatele-web', t = new Date().toISOString();
    const id = (crypto.randomUUID && crypto.randomUUID()) || Date.now().toString(36) + Math.random().toString(36).slice(2);
    const phone = d.phone.replace(/[\s-]+/g, '').replace(/^(?:\+|00)420(?=\d{9}$)/, '');
    const note = d.note.slice(0, 1000), camp = d.campaign === 'zdrazeni-cez';
    const message = [`Jméno: ${d.name}`, `Telefon: ${phone}`, `E-mail: ${d.email}`, `Typ odběrného místa: ${SEG[d.segment]}`, `Komodita: ${KOM[d.komodita]}`, `Poznámka: ${note || '-'}`,
      ...(camp ? ['Kampaň: zdrazeni-cez', `Odpovědi z kvízu: ${String(d.quiz || '-').slice(0, 600)}`] : []), `Stránka: ${d.page || '-'}`, `Zdroj: ${tag} (obsahový web)`, `Souhlas GDPR: ano (${t})`, `ID na webu: ${id}`].join('\n');
    const body = new URLSearchParams({ h: '1', name: d.name.slice(0, 120), email: d.email.slice(0, 160), t: phone, subject: `${camp ? '[Zdražení ČEZ – neurčitá smlouva] ' : ''}Lead z webu ${tag}: ${SEG[d.segment]} – ${KOM[d.komodita]}`, promo: 'porovnanienergii.cz', marketing_optin: '0', message });
    for (const [k, v] of Object.entries(d.utm || {})) body.append(k, String(v).slice(0, 200));
    const r = await fetch('https://porovnanienergii.cz/api/send-msg', { method: 'POST', body, headers: { Accept: 'application/json' } });
    const j = await r.json().catch(() => null);
    return r.ok && Array.isArray(j) && j.length === 3;
  }

  // ---- lead form ----
  document.querySelectorAll('form.leadform').forEach((f) => {
    const t0 = Date.now(); const st = f.querySelector('.status'); const btn = f.querySelector('button');
    let fs = false; f.addEventListener('input', () => { if (!fs && f.dataset.campaign) { fs = true; ev('form_start', { c: f.dataset.campaign }); } });
    const showErr = (errs) => {
      f.querySelectorAll('.err').forEach((e) => e.remove());
      for (const [k, m] of Object.entries(errs)) { const el = f.elements[k]; const host = (el && (el.length ? el[0].closest('fieldset') : el.closest('label'))) || f; const p = document.createElement('p'); p.className = 'err'; p.textContent = m; host.appendChild(p); }
    };
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = { name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), email: f.elements.email.value.trim(), segment: f.elements.segment.value, komodita: f.elements.komodita.value,
        note: f.elements.note.value.trim(), website: f.elements.website.value, gdpr: f.elements.gdpr.checked, page: location.pathname, utm, ts: t0, campaign: f.dataset.campaign || '', quiz: f.dataset.campaign ? (quizText || 'kvíz nevyplněn') : '' };
      const errs = {};
      if (d.name.length < 2) errs.name = 'Vyplňte jméno.';
      if (!/^\d{9}$/.test(d.phone.replace(/[\s-]+/g, '').replace(/^(?:\+|00)420(?=\d{9}$)/, ''))) errs.phone = 'Telefon zadejte jako 9 číslic (případně s +420).';
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(d.email)) errs.email = 'Zkontrolujte e-mail.';
      if (!d.segment) errs.segment = 'Vyberte typ odběrného místa.';
      if (!d.komodita) errs.komodita = 'Vyberte energii.';
      if (!d.gdpr) errs.gdpr = 'Bez souhlasu nemůžeme údaje zpracovat.';
      showErr(errs); if (Object.keys(errs).length) return;
      btn.disabled = true; st.textContent = 'Odesílám…';
      try {
        const thanks = f.dataset.thanks || B + '/dekujeme';
        if (STATIC) {
          // honeypot a minimální čas vyplnění: robotům tváříme úspěch, nic neodesíláme
          if (d.website || Date.now() - t0 < 2500) { location.href = thanks; return; }
          if (await sendCrm(d)) { location.href = thanks; return; }
          throw new Error('crm');
        }
        const r = await fetch(B + '/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.ok) { location.href = thanks; return; }
        if (j.errors) showErr(j.errors);
        st.textContent = j.error || 'Odeslání se nepovedlo, zkuste to prosím znovu.';
      } catch { st.textContent = 'Odeslání se nepovedlo, zkontrolujte připojení a zkuste to znovu.'; }
      btn.disabled = false;
    });
  });

  // ---- calculators ----
  const row = (a, b, c) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`;
  function savings(cur, nw, vat, penalty) {
    const k = 1 + (vat ?? 21) / 100, diff = (cur - nw) * k;
    let out = `<p>Roční náklad na neregulovanou část (s DPH): současná smlouva <b>${fmt(cur * k)}</b>, nová nabídka <b>${fmt(nw * k)}</b>.</p>`;
    out += diff > 0 ? `<p class="big">Odhad úspory: ${fmt(diff)} ročně (${fmt(diff / 12)} měsíčně)</p>` : `<p class="big">Nová nabídka vychází o ${fmt(-diff)} ročně dráž.</p>`;
    if (penalty && diff > 0) { const m = penalty / (diff / 12); out += `<p>Smluvní pokuta ${fmt(penalty)} se vrátí zhruba za <b>${m.toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} měsíců</b>.</p>`; }
    return out + '<p class="muted">Distribuce, poplatky a daň z energie se změnou dodavatele nemění, proto nejsou zahrnuty. Výsledek je orientační.</p>';
  }
  document.querySelectorAll('form.calc').forEach((f) => {
    const res = f.querySelector('.result');
    if (f.dataset.calc === 'vypoved') {
      const sync = () => { const t = f.elements.typ.value; f.querySelectorAll('[class^="t-"],[class*=" t-"]').forEach((el) => { if (el.tagName === 'DIV' || el.tagName === 'LABEL') el.hidden = !el.className.split(' ').includes('t-' + t); }); };
      f.addEventListener('change', sync); sync();
    }
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const c = f.dataset.calc;
      if (c === 'el') {
        const vt = val(f, 'vt') || 0, nt = val(f, 'nt') || 0;
        const need = ['c_vt', 'c_fix', 'n_vt', 'n_fix'].concat(nt ? ['c_nt', 'n_nt'] : []);
        if (!vt || need.some((n) => val(f, n) == null)) { res.innerHTML = '<p class="err">Vyplňte spotřebu, ceny za MWh a stálé platy (NT jen pokud ho máte).</p>'; return; }
        const cost = (p) => (vt / 1000) * val(f, p + '_vt') + (nt / 1000) * (val(f, p + '_nt') || 0) + 12 * val(f, p + '_fix');
        res.innerHTML = savings(cost('c'), cost('n'), val(f, 'vat'), val(f, 'penalty'));
      } else if (c === 'pl') {
        let kwh = val(f, 'kwh'); const m3 = val(f, 'm3'), coef = val(f, 'coef');
        if (!kwh && m3 && coef) kwh = m3 * coef;
        if (!kwh || ['c_p', 'c_fix', 'n_p', 'n_fix'].some((n) => val(f, n) == null)) { res.innerHTML = '<p class="err">Vyplňte spotřebu (kWh, nebo m³ a koeficient) a ceny.</p>'; return; }
        const cost = (p) => (kwh / 1000) * val(f, p + '_p') + 12 * val(f, p + '_fix');
        res.innerHTML = `<p>Počítáme se spotřebou ${Math.round(kwh).toLocaleString('cs-CZ')} kWh/rok.</p>` + savings(cost('c'), cost('n'), val(f, 'vat'), val(f, 'penalty'));
      } else {
        const t = f.elements.typ.value, d = (s) => s ? new Date(s + 'T12:00:00') : null, cz = (x) => x.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
        if (t === 'urcita') {
          const k = d(f.elements.konec.value); if (!k) { res.innerHTML = '<p class="err">Zadejte konec smlouvy.</p>'; return; }
          const last = new Date(k); last.setDate(last.getDate() - 20);
          res.innerHTML = `<p class="big">Výpověď musí být doručena nejpozději ${cz(last)}.</p><p>Smlouva pak skončí ${cz(k)}. Dodavatel vám má nejméně 30 dní před prodloužením poslat oznámení o nových podmínkách.</p>`;
        } else {
          const r = d(f.elements.doruceni.value); if (!r) { res.innerHTML = '<p class="err">Zadejte datum doručení výpovědi.</p>'; return; }
          const start = new Date(r.getFullYear(), r.getMonth() + 1, 1, 12);
          let end;
          if (t === 'stehovani') { end = new Date(start); end.setDate(end.getDate() + 14); }
          else { const m = Math.max(0, Math.round(val(f, 'mesice') ?? 3)); end = new Date(start.getFullYear(), start.getMonth() + m, 0, 12); }
          res.innerHTML = `<p>Výpovědní doba začne běžet ${cz(start)}.</p><p class="big">Smlouva skončí ${cz(end)}.</p><p>Nová dodávka by měla začít ${cz(new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1, 12))}.</p>`;
        }
      }
    });
  });
})();
