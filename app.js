(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const B = window.BASE || '';
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

// quick start
$$('[data-seg]').forEach(seg => seg.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('button', seg).forEach(x => x.classList.toggle('on', x === b));
}));
$$('[data-qs-go]').forEach(btn => btn.addEventListener('click', () => {
  const card = btn.closest('.qs');
  const intent = $('[data-seg] .on', card)?.dataset.v || 'buy';
  const loc = $('input', card).value.trim();
  location.href = btn.dataset.qsGo + '?intent=' + intent + (loc ? '&loc=' + encodeURIComponent(loc) : '');
}));

// sample agents
const AGENTS = [
  { n: 'Alicia Moreno', i: 'AM', c: '#0e5c4a', b: 'Frisco · Prosper · Celina', s: 97, k: [['41', 'closed 24 mo'], ['101.8%', 'of list'], ['19', 'days to close'], ['4.9★', '62 verified']], t: ['New construction', 'Bilingual', 'First-time buyers'] },
  { n: 'Marcus Webb', i: 'MW', c: '#1d4e89', b: 'McKinney · Allen · Plano', s: 95, k: [['36', 'closed 24 mo'], ['100.9%', 'of list'], ['22', 'days to close'], ['5.0★', '48 verified']], t: ['Listings', 'Relocation', 'Move-up buyers'] },
  { n: 'Priya Shah', i: 'PS', c: '#8a4b0f', b: 'Southlake · Keller · Grapevine', s: 94, k: [['29', 'closed 24 mo'], ['99.7%', 'of list'], ['17', 'days to close'], ['4.9★', '39 verified']], t: ['Luxury', 'Relocation', 'Negotiation'] },
];
const agentHTML = (a, pick) => `<div class="agent"><div class="av" style="background:${a.c}">${a.photo ? `<img src="${a.photo}" alt="${a.n}" style="width:100%;height:100%;object-fit:cover;border-radius:16px">` : a.i}</div>
<div><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><h4>${a.n}</h4><span class="score">★ ${a.s} Money Move Score</span></div>
<div class="meta">${a.b}</div><div class="tags">${a.t.map(t => `<span class="tag">${t}</span>`).join('')}</div></div>
<div class="kpis">${a.k.map(([v, l]) => `<div class="kpi"><b>${v}</b><span>${l}</span></div>`).join('')}</div>
${pick ? `<div style="grid-column:1/-1"><button class="btn primary block" data-pick="${a.n}">${pick}</button></div>` : ''}</div>`;
const sa = $('#sample-agents'); if (sa) { sa.className = 'grid g3'; sa.innerHTML = AGENTS.map(a => agentHTML(a)).join(''); }

// calculators
const bind = (ids, fn) => { const els = ids.map(id => $('#' + id)); if (!els[0]) return; els.forEach(e => e.addEventListener('input', fn)); fn(); };
bind(['sv', 'sp'], () => { const v = +$('#sv').value, p = +$('#sp').value; $('#sv-v').textContent = money(v); $('#sp-v').textContent = p.toFixed(1) + '%'; $('#s-out').textContent = money(v * p / 100); });
bind(['r', 'rt', 'dp'], () => {
  const rent = +$('#r').value, rate = +$('#rt').value / 1200, dp = +$('#dp').value / 100, n = 360;
  $('#r-v').textContent = money(rent); $('#rt-v').textContent = (+$('#rt').value).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + '%'; $('#dp-v').textContent = (+$('#dp').value) + '%';
  const pi = (1 - dp) * rate / (1 - Math.pow(1 + rate, -n)); const monthlyPer$ = pi + 0.022 / 12;
  $('#r-out').textContent = money(Math.round(rent / monthlyPer$ / 5000) * 5000);
});

// match flow
const M = $('#match');
if (M) {
  const es = M.dataset.lang === 'es';
  const L = (en, sp) => es ? sp : en;
  const q = new URLSearchParams(location.search);
  const data = { intent: q.get('intent') || '', loc: q.get('loc') || '', ftb: q.get('ftb') };
  const steps = [
    { k: 'intent', h: L('What\'s your move?', '¿Qué quieres hacer?'), o: [['buy', '🏡', L('Buy a home', 'Comprar casa')], ['sell', '💰', L('Sell a home', 'Vender casa')], ['both', '🔁', L('Sell and buy', 'Vender y comprar')], ['rent2own', '🔑', L('Stop renting', 'Dejar de rentar')]] },
    { k: 'loc', h: L('Where are you moving?', '¿Dónde?'), input: L('City, neighborhood or ZIP', 'Ciudad o código postal') },
    { k: 'type', h: L('What kind of home?', '¿Qué tipo de casa?'), o: [['resale', '🏠', L('Existing home', 'Casa existente')], ['new', '🏗️', L('New construction', 'Construcción nueva')], ['either', '🤷', L('Open to either', 'Cualquiera')], ['condo', '🏢', L('Condo / townhome', 'Condominio')]], skip: () => data.intent === 'sell' },
    { k: 'price', h: L('Price range?', '¿Rango de precio?'), o: [['<300', '', L('Under $300k', 'Menos de $300k')], ['300-500', '', '$300k – $500k'], ['500-800', '', '$500k – $800k'], ['800+', '', '$800k+']] },
    { k: 'time', h: L('When do you want to move?', '¿Cuándo?'), o: [['0-3', '⚡', L('0–3 months', '0–3 meses')], ['3-6', '📅', L('3–6 months', '3–6 meses')], ['6-12', '🗓️', L('6–12 months', '6–12 meses')], ['explore', '👀', L('Just exploring', 'Solo explorando')]] },
    { k: 'model', h: L('Toured any model homes yet?', '¿Ya visitaste casas modelo?'), sub: L('Builders often won\'t pay your agent if you visited without one.', 'Muchos constructores no pagan a tu agente si fuiste sin él.'), o: [['no', '✅', L('Not yet', 'Todavía no')], ['yes', '⚠️', L('Yes, already visited', 'Sí, ya fui')]], skip: () => data.type !== 'new' },
    { k: 'lang', h: L('Preferred language?', '¿Idioma preferido?'), o: [['en', '🇺🇸', 'English'], ['es', '🇲🇽', 'Español'], ['both', '🗣️', L('Either', 'Cualquiera')]] },
    { k: 'contact', h: L('Where should we send your shortlist?', '¿A dónde enviamos tu lista?'), contact: true },
  ];
  const active = () => steps.filter(s => !(s.skip && s.skip()) && !(s.k === 'intent' && q.get('intent') && data._pre) );
  if (data.intent) data._pre = 1;
  let i = 0;
  const root = $('#match-steps'), bar = $('.progress i', M);
  const render = () => {
    const list = active(); const s = list[i]; bar.style.width = Math.round(i / list.length * 100) + '%';
    if (!s) return results();
    let h = `<div class="qstep on"><div class="mini">${L('Step', 'Paso')} ${i + 1} ${L('of', 'de')} ${list.length}</div><h2>${s.h}</h2>${s.sub ? `<p class="mini">${s.sub}</p>` : ''}`;
    if (s.o) h += `<div class="opts">${s.o.map(([v, e, t]) => `<button class="opt${data[s.k] === v ? ' on' : ''}" data-v="${v}">${e ? `<span class="e">${e}</span>` : ''}<span>${t}</span></button>`).join('')}</div>`;
    if (s.input) h += `<div class="field" style="margin:18px 0 22px"><input id="m-in" value="${data[s.k] || ''}" placeholder="${s.input}"></div>`;
    if (s.contact) h += `<div style="margin:18px 0"><div class="field"><label class="f">${L('First name', 'Nombre')}</label><input id="c-n" autocomplete="given-name"></div>
<div class="field"><label class="f">${L('Mobile', 'Celular')}</label><input id="c-p" type="tel" autocomplete="tel" placeholder="(555) 555-5555"></div>
<div class="field"><label class="f">Email</label><input id="c-e" type="email" autocomplete="email"></div>
<label class="consent" style="display:flex;gap:10px;align-items:flex-start"><input type="checkbox" id="c-ok" style="width:auto;margin-top:2px"><span>${L('I agree that Money Move Homes and the one agent I choose may call or text me, including by automated means, about my real estate needs. Consent isn\'t required to buy anything. Msg/data rates may apply. Reply STOP to opt out.', 'Acepto que Money Move Homes y el agente que elija me llamen o envíen mensajes, incluso automatizados, sobre mis necesidades inmobiliarias. No es requisito para comprar. Pueden aplicar tarifas. Responde STOP para cancelar.')}</span></label>
<div class="pill-note" style="margin-top:14px">🔒 ${L('Only the agent you pick gets your number. Never sold.', 'Solo el agente que elijas recibe tu número. Nunca se vende.')}</div></div>`;
    h += `<div class="navrow">${i > 0 ? `<button class="btn ghost" data-back>← ${L('Back', 'Atrás')}</button>` : '<span></span>'}${s.o ? '' : `<button class="btn primary" data-next>${s.contact ? L('Show my agents', 'Ver mis agentes') : L('Continue', 'Continuar')} →</button>`}</div></div>`;
    root.innerHTML = h; $('#m-in')?.focus();
  };
  const results = () => {
    bar.style.width = '100%';
    root.innerHTML = `<div class="qstep on" style="text-align:center;padding:40px 0"><h2>${L('Scoring agents near', 'Calificando agentes en')} ${data.loc || 'DFW'}…</h2><p class="mini" id="scan">${L('Checking closed sales…', 'Revisando ventas cerradas…')}</p></div>`;
    const msgs = es ? ['Comparando precio vs. lista…', 'Verificando opiniones…', 'Listo.'] : ['Comparing price won vs. list…', 'Verifying client reviews…', 'Done.'];
    msgs.forEach((m, j) => setTimeout(() => { const el = $('#scan'); if (el) el.textContent = m; }, 600 * (j + 1)));
    setTimeout(() => {
      root.innerHTML = `<div class="qstep on"><span class="eyebrow">${L('Your shortlist', 'Tu lista')}</span><h2>${L('Your top 3 agents', 'Tus 3 mejores agentes')}${data.name ? ', ' + data.name : ''}</h2>
<p class="mini">${L('Pick one. Only that agent gets your number. (Preview: sample agents.)', 'Elige uno. Solo ese agente recibe tu número. (Vista previa: agentes de muestra.)')}</p>
<p class="src" style="margin-top:-6px">${L('Disclosure: if you close, the agent\'s brokerage pays Money Move Homes a 25% referral fee from their commission. Every partner pays the same rate; rankings can\'t be bought. Your price doesn\'t change.', 'Aviso: si cierras, el corretaje del agente paga a Money Move Homes un 25% de su comisión. Todos pagan lo mismo; el ranking no se compra. Tu precio no cambia.')}</p>
${data.model === 'yes' ? `<div class="pill-note" style="margin-bottom:14px">${L('Since you\'ve visited model homes, your Move Manager will help check whether the builder will still recognize an agent.', 'Como ya visitaste casas modelo, tu Move Manager verificará si el constructor aún acepta un agente.')}</div>` : ''}
<div class="grid" style="gap:14px">${AGENTS.map(a => agentHTML(a, L('Choose ' + a.n.split(' ')[0], 'Elegir a ' + a.n.split(' ')[0]))).join('')}</div></div>`;
    }, 2600);
  };
  root.addEventListener('click', e => {
    const list = active(), s = list[i];
    const opt = e.target.closest('.opt');
    if (opt) { data[s.k] = opt.dataset.v; if (s.k === 'intent' && opt.dataset.v === 'rent2own') { data.intent = 'buy'; data.ftb = 1; } i++; return render(); }
    if (e.target.closest('[data-back]')) { i = Math.max(0, i - 1); return render(); }
    if (e.target.closest('[data-next]')) {
      if (s.input) { const v = $('#m-in').value.trim(); if (!v) return $('#m-in').focus(); data[s.k] = v; }
      if (s.contact) { data.name = $('#c-n').value.trim(); if (!$('#c-ok').checked) { $('#c-ok').closest('label').style.color = 'var(--bad)'; return; } }
      i++; return render();
    }
    const pick = e.target.closest('[data-pick]');
    if (pick) root.innerHTML = `<div class="qstep on" style="text-align:center;padding:30px 0"><div style="font-size:3rem">🎉</div><h2>${L('You\'re matched with', 'Te conectamos con')} ${pick.dataset.pick}</h2><p class="lede" style="margin:0 auto 20px">${L('Your Move Manager will text you within 10 minutes to set up your intro. Text "swap" any time.', 'Tu Move Manager te escribirá en 10 minutos. Escribe "cambiar" cuando quieras.')}</p><p class="src">${L('Preview — nothing was sent.', 'Vista previa — no se envió nada.')}</p><a class="btn ghost" href="${B}/">${L('Back home', 'Inicio')}</a></div>`;
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter') $('[data-next]')?.click(); });
  render();
}

// marketing copy kit
const CK = $('#copykit');
if (CK) {
  const items = [
    ['Facebook / Instagram caption', `🏡 The loudest agent isn't the best agent.\n\nMost "find an agent" sites hand your number to whoever paid for it. We do the opposite:\n\n✅ We rank agents on real results — homes closed near you, price won vs. asking, days to close\n✅ You see the scorecard first\n✅ Only the ONE agent you pick gets your number\n✅ Swap agents any time. Free. Always.\n\nMake the right money move 👉 [link]\n\n[Brokerage name] · TX License #[XXXX]`],
    ['Text / email to past apartment clients', `Hey [First name]! It's [Brother] from Money Move Locating 👋\n\nWe found you your apartment, and now we can help you find a place you OWN.\n\nYour $[rent]/mo rent could cover a mortgage on a home around $[est. price]. We'll match you with a top first-time-buyer agent (free) and show you down-payment help you may qualify for.\n\nTake the 2-min quiz: [link]\n\nReply STOP to opt out.`],
    ['Google Search ad — new construction', `Headline 1: Touring New Homes in Celina?\nHeadline 2: Get Your Own Agent First — Free\nHeadline 3: Builder Usually Pays Their Fee\nDescription: The model-home rep works for the builder. Get a top-ranked agent who negotiates incentives for you. Register before your first visit.`],
    ['Google Search ad — sellers', `Headline 1: Top Listing Agents in Frisco\nHeadline 2: Ranked by Price Won vs. Asking\nHeadline 3: Compare Scorecards Free\nDescription: See days on market, sale-to-list ratio and verified reviews before you talk to anyone. One agent, your pick. Never sold.`],
    ['Spanish post', `🏡 ¿Cansado de pagar renta?\n\nTe conectamos GRATIS con un agente bilingüe con los mejores resultados en tu zona.\n\n✅ Todo en español\n✅ Ayuda para el enganche\n✅ Solo un agente recibe tu número\n\nHaz tu Money Move 👉 [link]\n\n[Corretaje] · Licencia TX #[XXXX]`],
    ['X / short-form', `Your rent is paying someone's mortgage. 🔑\n\nFind out what it could pay for instead, then get matched with a top-ranked agent near you. Free, no spam.\n\n👉 [link]`],
    ['Agent recruiting DM', `Hey [Name] — we run Money Move Homes, a referral brokerage in DFW. We send exclusive buyer/seller clients (one agent per client, no lead auctions). 25% at close, nothing upfront, no long tail — vs 30–40% at the big referral networks. We pick agents on results, and your numbers stood out. Open to a 10-min call?`],
  ];
  CK.innerHTML = items.map(([h, t], j) => `<div class="card"><h3>${h}</h3><div class="copybox"><button class="btn ghost sm copybtn" data-copy="${j}">Copy</button>${t.replace(/</g, '&lt;')}</div></div>`).join('');
  CK.addEventListener('click', e => { const b = e.target.closest('[data-copy]'); if (!b) return; navigator.clipboard?.writeText(items[+b.dataset.copy][1]); b.textContent = 'Copied ✓'; setTimeout(() => b.textContent = 'Copy', 1500); });
}
})();
