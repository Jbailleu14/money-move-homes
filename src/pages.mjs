// Page content. Each page: { path, title, desc, body, lang? }
const T = 'Money Move Homes';

export const qs = (u, es = false, loc = '') => `
<div class="qs" id="quickstart">
  <h3>${es ? 'Encuentra tu agente en 2 minutos' : 'Find your agent in 2 minutes'}</h3>
  <div class="sub">${es ? 'Gratis. Un solo agente. Cero spam.' : 'Free. One agent. Zero spam.'}</div>
  <div class="seg" data-seg="intent">
    <button class="on" data-v="buy">${es ? 'Comprar' : 'Buy'}</button>
    <button data-v="sell">${es ? 'Vender' : 'Sell'}</button>
    <button data-v="both">${es ? 'Ambos' : 'Both'}</button>
  </div>
  <div class="field"><label class="f" for="qs-loc">${es ? '¿Dónde?' : 'Where?'}</label>
  <input id="qs-loc" value="${loc}" placeholder="${es ? 'Ciudad o código postal' : 'City or ZIP — e.g. Frisco, TX'}" autocomplete="postal-code"></div>
  <button class="btn primary block" data-qs-go="${u(es ? '/es/match/' : '/match/')}">${es ? 'Ver mis agentes' : 'See my top agents'} →</button>
  <div class="trust-row" style="margin-top:14px;justify-content:center">
    <span><b class="check">✓</b>${es ? 'Sin compromiso' : 'No obligation'}</span>
    <span><b class="check">✓</b>${es ? 'Tus datos no se venden' : 'Never sold or shared'}</span>
  </div>
</div>`;

const agentCards = `
<div class="grid" style="gap:14px" id="sample-agents"></div>
<p class="src" style="margin-top:10px">Illustrative profiles for preview only.</p>`;

const cmpTable = `
<div class="table-scroll"><table class="cmp">
<thead><tr><th></th><th class="us">${T}</th><th>Typical referral sites</th><th>Googling "realtor near me"</th></tr></thead>
<tbody>
<tr><td>How agents are ranked</td><td class="us">Verified closed-sale results in your ZIP + price range</td><td>Often by who pays or who answers first</td><td>Ad budget &amp; SEO</td></tr>
<tr><td>Who gets your phone number</td><td class="us">One agent — the one you pick</td><td>Can be several agents and a call center</td><td>Every site you fill out</td></tr>
<tr><td>See the agent's results before they call</td><td class="us"><span class="yes">✓</span> Full scorecard</td><td>Bio + stars</td><td>Their own website</td></tr>
<tr><td>Commission shown up front</td><td class="us"><span class="yes">✓</span> Before you meet</td><td>Varies</td><td>Rarely</td></tr>
<tr><td>Swap agents, no hassle</td><td class="us"><span class="yes">✓</span> One text, any time</td><td>Varies</td><td>Awkward breakup</td></tr>
<tr><td>Licensed human you can text</td><td class="us"><span class="yes">✓</span> Your Move Manager, start to close</td><td>Often a call center</td><td><span class="no">✗</span></td></tr>
<tr><td>Spanish from first click to closing</td><td class="us"><span class="yes">✓</span></td><td>Limited</td><td>Hit or miss</td></tr>
<tr><td>Cost to you</td><td class="us">$0</td><td>$0</td><td>$0</td></tr>
</tbody></table></div>`;

const faq = (items) => items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');

const mainFaq = faq([
  ['Is it really free?', 'Yes. You never pay us. When you close, your agent\'s brokerage pays us a referral fee out of their commission. That\'s it — no markup, no "platform fee," nothing added to your side of the deal.'],
  ['Why does your agent beat the one I\'d find myself?', 'Because we pick on results, not marketing. We compare agents on closed sales in your exact area and price range, how close their sellers get to asking price, days on market, how often deals fall apart, and what verified past clients say. You see all of it before you talk to anyone.'],
  ['Will I get 10 phone calls?', 'No. You pick one agent from your shortlist, and only that agent gets your number. We never sell or share your info. Ever.'],
  ['What if I don\'t click with my agent?', 'Text your Move Manager "swap" and we\'ll introduce the next agent on your list. No awkward conversation, no cost.'],
  ['What changed with buyer commissions?', 'Buyer-agent fees are negotiable, and in Texas (since Jan 1, 2026) your agent needs a written agreement with you before working for you. You can start with a short, non-exclusive showing agreement (14 days or less). We show each agent\'s typical fee and agreement terms before you meet, in plain English.'],
  ['How do you make money?', 'When you close, your agent\'s brokerage pays us a 25% referral fee from their commission. Every partner pays the same rate, so no one can buy a better ranking. It never changes your price.'],
  ['Do you work outside Texas?', 'Yes — we refer through licensed partner brokerages nationwide. Moving to or from DFW is our specialty.'],
]);

export function pages(u) {
  const home = {
    path: '/', title: `${T} — The agent with the best verified results near you. Free.`,
    desc: 'We rank real estate agents on verified closed-sale results, then match you with one. Free, no spam, and you can swap agents any time.',
    body: `
<section class="hero"><div class="wrap">
<div>
  <span class="eyebrow">★ Ranked on results, not ad spend</span>
  <h1>Your biggest money move deserves the <span style="color:var(--brand)">best agent</span> — not the loudest one.</h1>
  <p class="lede">We score every agent on what actually matters: homes closed in your area, price won vs. asking, days to close, and verified client reviews. Then we introduce you to <b>one</b>. Free.</p>
  <div class="hero-cta"><a class="btn primary" href="${u('/match/')}">Get matched free →</a><a class="btn ghost" href="${u('/scorecard/')}">See how we rank agents</a></div>
  <div class="trust-row"><span><b class="check">✓</b>One agent, your pick</span><span><b class="check">✓</b>Your info is never sold</span><span><b class="check">✓</b>Swap agents any time</span><span><b class="check">✓</b>English &amp; Español</span></div>
</div>
${qs(u)}
</div><div class="wrap mini" style="padding-bottom:18px">Texas law requires all real estate licensees to give the following information about brokerage services: <a href="#">Information About Brokerage Services</a> · <a href="#">TREC Consumer Protection Notice</a></div></section>

<section><div class="wrap">
<div class="grid g4 stats4">
<div class="card"><div class="stat">Top 5%</div><div class="stat-l">of agents in each market make our shortlist (target bar), ranked by the <a href="${u('/scorecard/')}">Money Move Score</a>: closed volume, price vs. list, days to close, completion rate, verified reviews</div></div>
<div class="card"><div class="stat">10 min</div><div class="stat-l">target time to your shortlist — a licensed human, not a bot</div></div>
<div class="card"><div class="stat">1</div><div class="stat-l">agent gets your number. Not five. Not a call center.</div></div>
<div class="card"><div class="stat">$0</div><div class="stat-l">cost to you. Agents pay us only if you close.</div></div>
</div>
<p class="src" style="margin-top:10px">Preview: targets shown are our operating standards, not historical results.</p>
</div></section>

<section class="alt"><div class="wrap">
<div class="section-head"><h2>Why we're different from every other "find an agent" site</h2><p>Most sites send your info to whoever paid for the lead. We built ours backwards: start with the results, then make the introduction.</p></div>
${cmpTable}
</div></section>

<section><div class="wrap">
<div class="section-head"><h2>How it works</h2><p>Two minutes of questions. One great agent. Done.</p></div>
<div class="steps">
<div class="step"><h3>Tell us your move</h3><p>Buy, sell or both, where, budget and timing. Takes about two minutes.</p></div>
<div class="step"><h3>We run the numbers</h3><p>We score agents who closed deals like yours, in your area, in the last 24 months.</p></div>
<div class="step"><h3>You pick one</h3><p>See up to 3 scorecards side by side. Only the agent you choose gets your number.</p></div>
<div class="step"><h3>We stay with you</h3><p>Your Move Manager checks in through closing. Not happy? Text "swap."</p></div>
</div>
</div></section>

<section class="alt"><div class="wrap">
<div class="section-head"><h2>Built for the move you're actually making</h2></div>
<div class="grid g3">
<a class="card" style="text-decoration:none;color:inherit" href="${u('/first-time-buyers/')}"><div class="ic">🔑</div><h3>Renting → owning</h3><p>See what your rent could buy, down payment assistance you may qualify for, and an agent who specializes in first-time buyers.</p></a>
<a class="card" style="text-decoration:none;color:inherit" href="${u('/new-construction/')}"><div class="ic">🏗️</div><h3>New construction</h3><p>The builder's sales rep works for the builder. Get your own agent — usually paid by the builder — before your first model-home visit.</p></a>
<a class="card" style="text-decoration:none;color:inherit" href="${u('/sell/')}"><div class="ic">💰</div><h3>Selling</h3><p>Pick a listing agent by their list-to-sale ratio and days on market — the two numbers that put money in your pocket.</p></a>
<a class="card" style="text-decoration:none;color:inherit" href="${u('/relocate/')}"><div class="ic">✈️</div><h3>Moving to DFW</h3><p>Suburb-by-suburb guides and an agent who does virtual tours and closes for out-of-state buyers every month.</p></a>
<a class="card" style="text-decoration:none;color:inherit" href="${u('/es/')}"><div class="ic">🇲🇽</div><h3>En Español</h3><p>Agentes bilingües, de principio a fin. Te explicamos cada paso en tu idioma.</p></a>
<a class="card" style="text-decoration:none;color:inherit" href="${u('/buy/')}"><div class="ic">🏡</div><h3>Buying</h3><p>A buyer's agent who wins offers in your price range — and tells you their fee before you sign anything.</p></a>
</div>
</div></section>

<section><div class="wrap">
<div class="section-head"><h2>What a scorecard looks like</h2><p>This is what you see before any agent gets your number.</p></div>
${agentCards}
</div></section>

<section class="alt"><div class="wrap two">
<div><h2>The Money Move Promise</h2>
<ul class="list-check">
<li><b>One agent, your choice.</b> Your info goes to exactly one agent — the one you pick.</li>
<li><b>Never sold. Never shared.</b> We don't sell leads. Not to agents, lenders, or anyone.</li>
<li><b>Swap any time.</b> Text "swap" and meet the next agent on your list. No cost, no awkwardness.</li>
<li><b>Fees up front.</b> You see each agent's typical buyer fee and agreement terms before you meet.</li>
<li><b>Free. Always.</b> Agents pay us from their commission only when you close.</li>
<li><b>No lender steering.</b> We never take money from lenders, title or insurance companies. Use whoever you want.</li>
</ul>
<a class="btn primary" href="${u('/promise/')}">Read the full promise</a></div>
<div>${mainFaq}</div>
</div></section>

<section><div class="wrap"><div class="band">
<div><h2 style="margin:0 0 6px">Make the right money move.</h2><p>Two minutes. One great agent. Zero spam.</p></div>
<a class="btn gold" href="${u('/match/')}">Get matched free →</a>
</div></div></section>`,
  };

  const match = (es) => ({
    path: es ? '/es/match/' : '/match/', lang: es ? 'es' : 'en', hideMcta: true,
    title: es ? `Encuentra tu agente — ${T}` : `Get matched — ${T}`,
    desc: 'Two minutes to a shortlist of the best-performing agents for your move.',
    body: `<div class="match-shell" id="match" data-lang="${es ? 'es' : 'en'}">
<div class="progress"><i></i></div>
<div id="match-steps"></div>
</div>`,
  });

  const inner = (path, title, desc, hero, body) => ({ path, title: `${title} — ${T}`, desc, body: `
<div class="phero"><div class="wrap two">${hero}</div></div>${body}` });

  const buy = inner('/buy/', 'Find a top buyer\'s agent', 'Get matched with the buyer\'s agent who wins offers in your price range.',
    `<div><span class="eyebrow">Buying</span><h1>Win the house. Don't overpay for it.</h1>
<p class="lede">We match you with the buyer's agent who's closed the most deals like yours — same area, same price range — and show you their fee before you sign anything.</p>
<ul class="list-check"><li>Offer win rate &amp; average price vs. list, by price range</li><li>Buyer agreement explained in plain English (post-2024 rules)</li><li>Lender-agnostic: we never steer you to a lender or take a kickback</li></ul></div>${qs(u)}`,
    `<section><div class="wrap"><div class="section-head"><h2>Questions to ask any buyer's agent</h2><p>Screenshot this. We already asked them for you.</p></div>
<div class="grid g2">
<div class="card"><h3>"How many buyers did you close in my price range last year?"</h3><p>Under 5 means they're learning on you.</p></div>
<div class="card"><h3>"What's your fee, and who pays it?"</h3><p>Since Aug 2024 it's in writing and negotiable. Sellers or builders often cover it — a good agent asks for that in the offer.</p></div>
<div class="card"><h3>"Can I end our agreement if it isn't working?"</h3><p>Look for a short term and an easy exit. Our partner agents agree to it.</p></div>
<div class="card"><h3>"What did your last 3 winning offers look like?"</h3><p>Real strategy beats "we'll write a strong offer."</p></div>
</div></div></section>`);

  const sell = inner('/sell/', 'Find a top listing agent', 'Choose a listing agent by list-to-sale ratio and days on market.',
    `<div><span class="eyebrow">Selling</span><h1>The right listing agent is worth thousands. Literally.</h1>
<p class="lede">On a $400,000 home, a 2% better sale price is $8,000. We rank listing agents on what they actually get sellers, not on how many yard signs they buy.</p></div>
<div class="card pad-lg"><h3>What a better agent is worth</h3>
<div class="range-row"><div class="top"><span>Home value</span><span id="sv-v">$400,000</span></div><input type="range" id="sv" min="150000" max="1500000" step="10000" value="400000"></div>
<div class="range-row"><div class="top"><span>Better sale price vs. average agent</span><span id="sp-v">2.0%</span></div><input type="range" id="sp" min="0" max="5" step=".5" value="2"></div>
<div class="mini">Extra in your pocket</div><div class="result-big" id="s-out">$8,000</div>
<p class="src">Illustration only; outcomes vary by home and market.</p>
<a class="btn primary block" href="${u('/match/?intent=sell')}">Find my listing agent →</a></div>`,
    `<section><div class="wrap"><div class="section-head"><h2>What we look at</h2></div><div class="grid g4">
<div class="card"><div class="ic">📈</div><h3>List-to-sale ratio</h3><p>How close their sellers get to asking (or above it).</p></div>
<div class="card"><div class="ic">⏱️</div><h3>Days on market</h3><p>Every extra month costs you a mortgage payment.</p></div>
<div class="card"><div class="ic">📍</div><h3>Local volume</h3><p>Closed listings in your neighborhood and price band.</p></div>
<div class="card"><div class="ic">💬</div><h3>Verified sellers</h3><p>Reviews only from clients we confirm actually closed.</p></div>
</div></div></section>`);

  const nc = inner('/new-construction/', 'New construction buyer\'s agent', 'Get your own agent before your first model home visit — usually paid by the builder.',
    `<div><span class="eyebrow">New construction · DFW</span><h1>The builder has a rep. <span style="color:var(--brand)">You should too.</span></h1>
<p class="lede">The friendly sales rep at the model home works for the builder. Your own agent negotiates upgrades, closing costs and rate buydowns for you — and the builder usually pays their fee.</p>
<div class="pill-note"><b>Do this before your first visit.</b> Most builders require your agent to be registered on your first trip to the model home or they won't pay the agent's fee.</div></div>${qs(u)}`,
    `<section><div class="wrap"><div class="section-head"><h2>What your own agent negotiates</h2></div><div class="grid g3">
<div class="card"><div class="ic">🏷️</div><h3>Incentives</h3><p>Closing-cost credits and rate buydowns builders don't advertise.</p></div>
<div class="card"><div class="ic">🧰</div><h3>Upgrades &amp; lot</h3><p>Which upgrades add resale value and which are builder profit.</p></div>
<div class="card"><div class="ic">🔍</div><h3>Inspections</h3><p>Independent inspections before drywall and before close.</p></div>
</div>
<h3 style="margin-top:36px">Hot DFW new-build areas we cover</h3>
<div class="tags">${['Celina','Prosper','Princeton','Anna','Melissa','Forney','Little Elm','Frisco','McKinney','Fate','Royse City','Midlothian','Aledo','Northlake','Justin'].map(c=>`<span class="tag">${c}</span>`).join('')}</div>
</div></section>`);

  const ftb = inner('/first-time-buyers/', 'Renters to owners', 'See what your rent could buy and get matched with a first-time buyer specialist.',
    `<div><span class="eyebrow">Renting → owning</span><h1>Your rent is already paying a mortgage. <span style="color:var(--brand)">Just not yours.</span></h1>
<p class="lede">See roughly what your monthly rent could buy, then talk to an agent who specializes in first-time buyers and down payment assistance.</p></div>
<div class="card pad-lg"><h3>What could my rent buy?</h3>
<div class="range-row"><div class="top"><span>Monthly rent</span><span id="r-v">$1,800</span></div><input type="range" id="r" min="800" max="5000" step="50" value="1800"></div>
<div class="range-row"><div class="top"><span>Mortgage rate</span><span id="rt-v">6.5%</span></div><input type="range" id="rt" min="4" max="8.5" step=".125" value="6.5"></div>
<div class="range-row"><div class="top"><span>Down payment</span><span id="dp-v">3.5%</span></div><input type="range" id="dp" min="0" max="20" step=".5" value="3.5"></div>
<div class="mini">Approximate home price at the same monthly payment</div><div class="result-big" id="r-out">$—</div>
<p class="src">Rough estimate: 30-year fixed, ~2.2% of value/yr for Texas taxes + insurance. Not a loan offer; talk to a lender.</p>
<a class="btn primary block" href="${u('/match/?intent=buy&ftb=1')}">Match me with a first-time buyer pro →</a></div>`,
    `<section><div class="wrap"><div class="grid g3">
<div class="card"><div class="ic">🎁</div><h3>Down payment help</h3><p>Texas and many cities offer assistance programs. Your agent knows which ones fit you.</p></div>
<div class="card"><div class="ic">📅</div><h3>Time it with your lease</h3><p>Start 60–90 days before your lease ends so you never pay double.</p></div>
<div class="card"><div class="ic">🧾</div><h3>Credit game plan</h3><p>Not ready yet? Get a 90-day plan, and we'll check back when you are.</p></div>
</div></div></section>`);

  const reloc = inner('/relocate/', 'Moving to Dallas–Fort Worth', 'Relocating to DFW? Get suburb guides and an agent who closes for out-of-state buyers.',
    `<div><span class="eyebrow">Relocating</span><h1>Moving to DFW? Buy like a local, from 1,500 miles away.</h1>
<p class="lede">Our relocation agents do live video tours, know the school zones and commute math, and close for out-of-state buyers every month.</p></div>${qs(u)}`,
    `<section><div class="wrap"><div class="section-head"><h2>Pick your suburb</h2><p>Quick takes. Your agent goes deeper.</p></div><div class="grid g3">
${[['Frisco','Top-rated schools, newer homes, corporate HQs'],['McKinney','Historic downtown + new builds, strong value'],['Plano','Established, central, big employers'],['Southlake','Luxury, top schools, near DFW Airport'],['Fort Worth','Big-city amenities, more home for the money'],['Prosper / Celina','Fastest-growing, new construction everywhere']].map(([c,d])=>`<div class="card"><h3>${c}</h3><p>${d}</p></div>`).join('')}
</div></div></section>`);

  const scorecard = inner('/scorecard/', 'How we rank agents', 'The Money Move Score: how we rank agents on verified results.',
    `<div><span class="eyebrow">The Money Move Score</span><h1>We rank agents the way you'd rank them — if you had the data.</h1>
<p class="lede">Every partner agent gets a 0–100 score built from public closed-sale records and verified client feedback. No agent can buy a higher score.</p></div>
<div class="card pad-lg"><h3>Score weights</h3>
${[['Local closed volume (24 mo.)',25],['Price won vs. list',20],['Days to close',15],['Deal completion rate',15],['Verified client reviews',15],['Responsiveness (mystery-shopped)',10]].map(([k,w])=>`<div class="range-row"><div class="top"><span>${k}</span><span>${w}%</span></div><div class="progress" style="margin:0"><i style="width:${w*4}%"></i></div></div>`).join('')}
</div>`,
    `<section><div class="wrap"><div class="grid g3">
<div class="card"><div class="ic">🚫</div><h3>No pay-to-play</h3><p>Every partner pays the same referral fee. Paying more doesn't move anyone up.</p></div>
<div class="card"><div class="ic">🕵️</div><h3>Mystery-shopped</h3><p>We test response time and quality before an agent ever gets a client.</p></div>
<div class="card"><div class="ic">🔁</div><h3>Re-scored quarterly</h3><p>Agents who slip or get swapped out lose their spot. Clients' outcomes decide.</p></div>
</div></div></section>`);

  const promise = inner('/promise/', 'The Money Move Promise', 'One agent, never sold, swap any time, fees up front, free.',
    `<div><span class="eyebrow">Our promise</span><h1>Six promises we put in writing.</h1><p class="lede">If we ever break one, tell us and we'll make it right.</p></div><div></div>`,
    `<section><div class="wrap"><div class="grid g2">
${[['1. One agent, your choice','Your contact info goes to the one agent you pick. Not a list, not a call center.'],['2. Never sold, never shared','We don\'t sell or share your info with agents, lenders, title companies or anyone else.'],['3. Swap any time','Text "swap" to your Move Manager. We\'ll introduce the next agent on your shortlist.'],['4. Fees up front','You see each agent\'s typical fee and agreement terms before you meet.'],['5. Free, always','Agents\' brokerages pay us a flat 25% referral fee from their commission when you close. Your price doesn\'t change.'],['6. No lender steering','We never accept payment from lenders, title or insurance companies, and we\'ll never pressure you to use anyone.']].map(([h,p])=>`<div class="card pad-lg"><h3>${h}</h3><p>${p}</p></div>`).join('')}
</div></div></section>`);

  const agents = inner('/join/', 'For agents: pay only at close', 'Join the Money Move partner network: 25% at close, exclusive clients, ranked on results.',
    `<div><span class="eyebrow">For agents</span><h1>Exclusive clients. Pay only when you close. Ranked on how good you are.</h1>
<p class="lede">No monthly fees, no lead auctions, no sharing the client with four other agents. One client, introduced to one agent, who earned the spot.</p>
<a class="btn primary" href="#apply">Apply to the network</a></div>
<div class="card pad-lg"><h3>Referral fee comparison</h3>
<table class="cmp" style="font-size:.92rem"><tbody>
<tr><td class="us">${T}</td><td class="us"><b>25%</b> at close</td></tr>
<tr><td>HomeLight (published standard)</td><td>33%</td></tr>
<tr><td>Rocket Homes (reported)</td><td>35%</td></tr>
<tr><td>Redfin Partner / UpNest (reported)</td><td>~30%</td></tr>
<tr><td>Realtor.com referral programs (reported)</td><td>28–40%</td></tr>
<tr><td>Zillow pay-at-close (reported)</td><td>up to 40%</td></tr>
<tr><td>Pay-per-lead portals (reported avg.)</td><td>$139–$223 per lead, close or not</td></tr>
</tbody></table>
<p class="src">Sources: HomeLight help center; public reporting 2025–26 (The Close, Clever, CFPB filings). Verify current terms before publishing.</p></div>`,
    `<section><div class="wrap"><div class="grid g3">
<div class="card"><div class="ic">🎯</div><h3>Exclusive introductions</h3><p>The client picked you from their scorecard. They're expecting your call.</p></div>
<div class="card"><div class="ic">🌎</div><h3>Niches others ignore</h3><p>Spanish-speaking buyers, new-construction buyers, renters becoming owners, DFW relocations.</p></div>
<div class="card"><div class="ic">🤝</div><h3>We stay on the deal</h3><p>Our Move Managers keep clients warm and on track, so fewer deals go cold.</p></div>
<div class="card"><div class="ic">📸</div><h3>Free pro headshot</h3><p>Every partner gets a professional headshot and profile shoot for their scorecard — yours to keep.</p></div>
<div class="card"><div class="ic">⏳</div><h3>Shorter tail</h3><p>Our referral window is 12 months, not 3 years. Fair is fair.</p></div>
<div class="card"><div class="ic">📣</div><h3>We market you</h3><p>Top-scored partners are featured in our city pages, social and email to our renter base.</p></div>
</div>
<div class="card pad-lg" id="apply" style="margin-top:28px;max-width:640px"><h3>Apply to the network</h3><p class="mini" style="margin-bottom:16px">Preview form — doesn't submit.</p>
<div class="grid g2"><div class="field"><label class="f">Name</label><input></div><div class="field"><label class="f">License # / state</label><input></div>
<div class="field"><label class="f">Closed units (last 24 mo.)</label><input type="number"></div><div class="field"><label class="f">Primary ZIPs</label><input></div></div>
<div class="field"><label class="f">Languages</label><input placeholder="English, Español…"></div>
<button class="btn primary" onclick="alert('Preview only — nothing was sent.')">Submit application</button></div>
</div></section>`);

  const es = {
    path: '/es/', lang: 'es', title: `${T} — El agente con mejores resultados, gratis`,
    desc: 'Te conectamos con el agente inmobiliario con mejores resultados verificados en tu zona. Gratis, en español.',
    body: `<section class="hero"><div class="wrap"><div>
<span class="eyebrow">★ En español, de principio a fin</span>
<h1>Tu casa es tu mejor <span style="color:var(--brand)">Money Move</span>. Hazla con el mejor agente.</h1>
<p class="lede">Calificamos a los agentes por resultados reales: casas cerradas en tu zona, precio logrado y opiniones verificadas. Luego te presentamos <b>uno</b>, bilingüe. Gratis.</p>
<div class="hero-cta"><a class="btn primary" href="${u('/es/match/')}">Encuentra tu agente →</a></div>
<div class="trust-row"><span><b class="check">✓</b>Un solo agente</span><span><b class="check">✓</b>Tus datos no se venden</span><span><b class="check">✓</b>Cambia de agente cuando quieras</span></div>
</div>${qs(u, true)}</div></section>
<section><div class="wrap"><div class="grid g3">
<div class="card"><div class="ic">🗣️</div><h3>Todo en español</h3><p>Desde la primera llamada hasta el cierre, incluyendo contratos explicados en tu idioma.</p></div>
<div class="card"><div class="ic">🔑</div><h3>Primera casa</h3><p>Programas de ayuda para el enganche, ITIN y crédito: tu agente te guía.</p></div>
<div class="card"><div class="ic">💵</div><h3>Gratis para ti</h3><p>El agente nos paga solo si cierras. Tu precio no cambia.</p></div>
</div></div></section>`,
  };

  const kit = {
    path: '/marketing-kit/', title: `Marketing kit — ${T}`, desc: 'Ready-to-post marketing assets.',
    body: `<div class="phero"><div class="wrap"><span class="eyebrow">Internal · marketing kit</span><h1>Marketing kit</h1>
<p class="lede">Ready-to-post graphics and copy. Tap an image to download it, or tap "Copy" to grab the text. Before anything goes live, swap in the brokerage name and license number (TREC rule).</p></div></div>
<section><div class="wrap">
<h2>Social graphics</h2>
<div class="grid g3">
${[['ig-1.svg','Square post · "Loudest ≠ best"'],['ig-2.svg','Square post · "Your rent pays a mortgage"'],['ig-3.svg','Square post · New-build warning'],['story-1.svg','Story · Spanish'],['og.svg','Link preview / Facebook ad'],['flyer.svg','Printable flyer (letter)']].map(([f,c])=>`<div class="kit-asset"><a href="${u('/assets/'+f)}" download><img src="${u('/assets/'+f)}" alt="${c}" loading="lazy" style="display:block;width:100%;background:#eee"></a><div class="cap"><span class="mini">${c}</span><a class="btn ghost sm" href="${u('/assets/'+f)}" download>Download</a></div></div>`).join('')}
</div></div></section>
<section class="alt"><div class="wrap"><h2>Copy, ready to paste</h2><div class="grid g2" id="copykit"></div></div></section>`,
  };

  return [home, match(false), match(true), buy, sell, nc, ftb, reloc, scorecard, promise, agents, es, kit];
}
