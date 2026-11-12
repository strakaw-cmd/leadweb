(() => {
  const fmt = (n) => Math.round(n).toLocaleString('cs-CZ') + ' Kč';
  const val = (f, n) => { const v = (f.elements[n]?.value || '').replace(/\s/g, '').replace(',', '.'); return v === '' ? null : Number(v); };
  const utm = {}; const sp = new URLSearchParams(location.search);
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']) { const v = sp.get(k) || sessionStorage.getItem('u_' + k); if (v) { utm[k] = v; sessionStorage.setItem('u_' + k, v); } }

  // ---- lead form ----
  document.querySelectorAll('form.leadform').forEach((f) => {
    const t0 = Date.now(); const st = f.querySelector('.status'); const btn = f.querySelector('button');
    const showErr = (errs) => {
      f.querySelectorAll('.err').forEach((e) => e.remove());
      for (const [k, m] of Object.entries(errs)) { const el = f.elements[k]; const host = (el && (el.length ? el[0].closest('fieldset') : el.closest('label'))) || f; const p = document.createElement('p'); p.className = 'err'; p.textContent = m; host.appendChild(p); }
    };
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = { name: f.elements.name.value.trim(), phone: f.elements.phone.value.trim(), email: f.elements.email.value.trim(), segment: f.elements.segment.value, komodita: f.elements.komodita.value,
        note: f.elements.note.value.trim(), website: f.elements.website.value, gdpr: f.elements.gdpr.checked, page: location.pathname, utm, ts: t0 };
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
        const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.ok) { location.href = '/dekujeme'; return; }
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
