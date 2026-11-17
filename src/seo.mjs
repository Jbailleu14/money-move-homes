// SEO pages: city pages from Zillow ZHVI data, compare pages, guides.
import fs from 'node:fs';
import { qs } from './pages.mjs';

const T = 'Money Move Homes';
const { asof, cities } = JSON.parse(fs.readFileSync(new URL('../data/cities.json', import.meta.url)));
const month = new Date(asof + 'T12:00:00Z').toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const pct = (n) => (n > 0 ? '+' : '') + n.toFixed(1) + '%';
const STATES = { AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming' };
const faqLd = (qa) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) });
const crumbLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });
const faqHtml = (qa) => qa.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
const crumbs = (u, items) => `<div class="mini" style="margin-bottom:14px">${items.map(([n, p], i) => i < items.length - 1 ? `<a href="${u(p)}">${n}</a>` : n).join(' › ')}</div>`;
const cityUrl = (c) => `/agents/${c.st}/${c.slug}/`;

// Competitor facts (from research.md; sourced, dated 2025–26 public reporting)
const COMP = [
  { k: 'homelight', n: 'HomeLight', fee: '33% of the agent\'s commission (published)', tail: '3 years', who: 'Usually 1–3 agents contact you', rank: 'Algorithm; only agents who signed HomeLight\'s fee agreement are matched; criteria not published', extra: 'Cash offers (Simple Sale), Buy Before You Sell, Trade-In', gripe: 'Reviewers frequently report a burst of calls and texts after a home-value or cash-offer request', good: 'Big network, fast, and real cash-offer options if you need speed over price' },
  { k: 'clever', n: 'Clever Real Estate', fee: 'Not published', tail: '—', who: 'A concierge calls, then you interview 2–3+ agents', rank: 'Agents who accept Clever\'s discounted listing rate', extra: '1.5% listing fee ($3,000 min); $250–$500 buyer cash back in many states', gripe: 'Reports of agents not honoring the discount; $3k minimum hurts lower-priced homes', good: 'Lower listing fee if your home price is high enough' },
  { k: 'zillow', n: 'Zillow (Preferred / Premier Agent)', fee: 'Up to 40% reported, or pay-per-lead', tail: '—', who: 'Routed to one partner agent by ZIP', rank: 'Opaque "performance-based routing"; invitation-only partners', extra: 'Huge listing search; Zillow Home Loans', gripe: 'Shoppers often think they\'re contacting the listing agent; class actions filed 2025–26 over fees and loan steering (allegations)', good: 'Best home search in the business' },
  { k: 'ramsey-trusted', n: 'RamseyTrusted', fee: 'Not published', tail: '—', who: 'Up to 3 agents reach out to win your business', rank: 'Vetting claimed (50+ closings, top 10%); method not published', extra: 'Values-based brand; debt-free coaching culture', gripe: 'Smaller network; some reports of uneven agent quality and communication', good: 'Strong trust brand if you\'re a Ramsey fan' },
  { k: 'redfin', n: 'Redfin Partner Agents', fee: '~30% reported', tail: '—', who: 'Assigned one partner agent', rank: 'Assigned by Redfin', extra: 'Redfin agents in many cities', gripe: 'Partner agents aren\'t Redfin employees; you don\'t choose', good: 'Great search tools and data' },
  { k: 'upnest', n: 'UpNest', fee: '~30% reported', tail: '—', who: '3–5 agents send sealed proposals within 24h', rank: 'Agents bid for you', extra: 'Commission proposals up front', gripe: 'Quality varies; you compare bids, not track records', good: 'Commission competition is transparent' },
];

export function seoPages(u) {
  const out = [];
  const byMetro = {};
  cities.forEach(c => (byMetro[c.metro] ||= []).push(c));

  for (const c of cities) {
    const S = STATES[c.state] || c.state;
    const where = `${c.name}, ${c.state}`;
    const better2 = c.value * 0.02;
    const buyerSide = c.value * 0.025;
    const trend = c.yoy == null ? '' : c.yoy < -1 ? `Values are down ${Math.abs(c.yoy).toFixed(1)}% over the past year, which usually means <b>buyers have more room to negotiate</b> and sellers need a sharp pricing strategy.` : c.yoy > 1 ? `Values are up ${c.yoy.toFixed(1)}% over the past year, so <b>sellers have leverage</b> and buyers need an agent who writes winning offers.` : `Values are roughly flat over the past year, so pricing and negotiation skill matter more than market momentum.`;
    const near = (byMetro[c.metro] || []).filter(x => x !== c).slice(0, 12);
    const qa = [
      [`How do I find the best real estate agent in ${c.name}?`, `Look at results, not ads: homes the agent closed in ${c.name} in the last 24 months, how close their sellers got to asking price, average days on market, and verified client reviews. ${T} scores agents on exactly these and introduces you to one, free.`],
      [`What is the typical home value in ${c.name}?`, `About ${money(c.value)} as of ${month} (Zillow Home Value Index, mid-tier homes)${c.yoy != null ? `, ${pct(c.yoy)} over the past year` : ''}${c.fiveyr != null ? ` and ${pct(c.fiveyr)} over five years` : ''}.`],
      [`How much does a real estate agent cost in ${c.name}?`, `Commissions are negotiable. A 2025 national mystery-shop study found most buyer agents still ask for 2.5%–3%. On a typical ${c.name} home that's about ${money(buyerSide)}–${money(c.value * 0.03)} for the buyer side, often paid by the seller or builder. We show each agent's typical fee before you meet.`],
      [`Is ${T} free in ${c.name}?`, `Yes. You pay nothing. If you close, your agent's brokerage pays us a 25% referral fee from their commission. Every partner pays the same rate, so rankings can't be bought.`],
    ];
    out.push({
      path: cityUrl(c),
      title: `Best Real Estate Agents in ${where} (${month.split(' ')[1]}) — Ranked on Results | ${T}`,
      desc: `Compare top ${c.name} real estate agents by homes sold, price vs. asking and days on market. Typical ${c.name} home: ${money(c.value)}. Free match, one agent, no spam.`,
      ld: [faqLd(qa), crumbLd([['Agents', 'https://moneymovehomes.com/agents/'], [S, `https://moneymovehomes.com/agents/${c.st}/`], [c.name, 'https://moneymovehomes.com' + cityUrl(c)]])],
      body: `<div class="phero"><div class="wrap two"><div>
${crumbs(u, [['Agents', '/agents/'], [S, `/agents/${c.st}/`], [c.name, '']])}
<span class="eyebrow">${c.name} · ${c.county}</span>
<h1>Top real estate agents in ${where}</h1>
<p class="lede">We rank ${c.name} agents on what they actually got their clients — homes closed here, price won vs. asking, days to close — then introduce you to <b>one</b>. Free.</p>
<div class="grid g3" style="gap:10px;margin-bottom:8px">
<div class="card" style="padding:16px"><div class="stat" style="font-size:1.6rem">${money(c.value)}</div><div class="stat-l">typical home value</div></div>
${c.yoy != null ? `<div class="card" style="padding:16px"><div class="stat" style="font-size:1.6rem;color:${c.yoy < 0 ? 'var(--bad)' : 'var(--brand)'}">${pct(c.yoy)}</div><div class="stat-l">past 12 months</div></div>` : ''}
${c.fiveyr != null ? `<div class="card" style="padding:16px"><div class="stat" style="font-size:1.6rem">${pct(c.fiveyr)}</div><div class="stat-l">past 5 years</div></div>` : ''}
</div><p class="src">Zillow Home Value Index (ZHVI), mid-tier single-family &amp; condo, ${month}. Data: Zillow Research.</p>
</div>${qs(u, false, where)}</div></div>
<section><div class="wrap two"><div>
<h2>The ${c.name} market right now</h2><p>${trend}</p>
<h3>What a better agent is worth in ${c.name}</h3>
<p>On a typical ${money(c.value)} home, a 2% better sale price is <b>${money(better2)}</b>. Over a 30-year loan, negotiating 2% off a purchase saves more than that in interest. The gap between an average agent and a great one is real money.</p>
<h3>How we pick ${c.name} agents</h3>
<ul class="list-check"><li>Closed sales in ${c.name} and nearby, last 24 months, in your price range</li><li>Sale price vs. list price for their sellers; price won vs. list for their buyers</li><li>Days on market and deal completion rate</li><li>Independent, verified client reviews — not agent-picked testimonials</li><li>Mystery-shopped response time</li></ul>
<a class="btn primary" href="${u('/match/?loc=' + encodeURIComponent(where))}">Get my ${c.name} shortlist →</a>
</div><div>
<h3>Questions ${c.name} buyers &amp; sellers ask</h3>${faqHtml(qa)}
</div></div></section>
${near.length ? `<section class="alt"><div class="wrap"><h2>Nearby in the ${c.metro.replace(/, [A-Z]{2}$/, '')} area</h2><div class="tags">${near.map(n => `<a class="tag" style="text-decoration:none;font-size:.9rem;padding:7px 12px" href="${u(cityUrl(n))}">${n.name} · ${money(n.value)}</a>`).join('')}</div></div></section>` : ''}`,
    });
  }

  // state hubs + national hub
  const states = {};
  cities.forEach(c => (states[c.st] ||= []).push(c));
  for (const [st, list] of Object.entries(states)) {
    const S = STATES[st.toUpperCase()] || st.toUpperCase();
    out.push({
      path: `/agents/${st}/`, title: `Best Real Estate Agents in ${S} by City | ${T}`, desc: `Find top-ranked real estate agents in ${list.length} ${S} cities, with current home values and market trends.`,
      body: `<div class="phero"><div class="wrap">${crumbs(u, [['Agents', '/agents/'], [S, '']])}<h1>Top real estate agents in ${S}</h1><p class="lede">${list.length} cities. Pick yours for local home values, trends and a free match with a top-ranked agent.</p></div></div>
<section><div class="wrap"><div class="grid g4">${list.sort((a, b) => a.name.localeCompare(b.name)).map(c => `<a class="card" style="text-decoration:none;color:inherit;padding:16px" href="${u(cityUrl(c))}"><b>${c.name}</b><div class="mini">${money(c.value)}${c.yoy != null ? ` · ${pct(c.yoy)} 1-yr` : ''}</div></a>`).join('')}</div></div></section>`,
    });
  }
  out.push({
    path: '/agents/', title: `Find a Top Real Estate Agent in Your City | ${T}`, desc: 'Top-ranked real estate agents by city, ranked on verified results.',
    body: `<div class="phero"><div class="wrap"><h1>Find a top agent in your city</h1><p class="lede">${cities.length} cities and growing. Texas is home base; we refer nationwide through licensed partner brokerages.</p></div></div>
<section><div class="wrap"><div class="grid g4">${Object.keys(states).sort((a, b) => a === 'tx' ? -1 : b === 'tx' ? 1 : (STATES[a.toUpperCase()] || a).localeCompare(STATES[b.toUpperCase()] || b)).map(st => `<a class="card" style="text-decoration:none;color:inherit;padding:16px" href="${u('/agents/' + st + '/')}"><b>${STATES[st.toUpperCase()] || st}</b><div class="mini">${states[st].length} cities</div></a>`).join('')}</div></div></section>`,
  });

  // compare hub + pages
  const rowsFor = (c) => [
    ['Fee your agent pays the service', '25%, disclosed on every match', c.fee],
    ['Referral "tail" on the agent', '12 months', c.tail],
    ['Who gets your contact info', 'Only the one agent you pick', c.who],
    ['How agents are ranked', 'Published Money Move Score: closed volume, price vs. list, days to close, completion rate, verified reviews. No paid placement.', c.rank],
    ['Spanish from first click to closing', 'Yes', 'Limited / varies'],
    ['Texas buyer-agreement preview before you meet', 'Yes', 'No'],
    ['Lender steering', 'Never — we take $0 from lenders', c.k === 'zillow' ? 'Zillow Home Loans promoted (lawsuits allege steering)' : 'Varies'],
  ];
  const cmpTable = (c) => `<div class="table-scroll"><table class="cmp cmp3"><thead><tr><th></th><th class="us">${T}</th><th>${c.n}</th></tr></thead><tbody>${rowsFor(c).map(([a, b, d]) => `<tr><td>${a}</td><td class="us">${b}</td><td>${d}</td></tr>`).join('')}</tbody></table></div>`;
  out.push({
    path: '/compare/', title: `HomeLight vs Clever vs Zillow vs RamseyTrusted: Agent Referral Services Compared | ${T}`,
    desc: 'Honest comparison of agent-matching services: referral fees, who gets your phone number, how agents are ranked.',
    body: `<div class="phero"><div class="wrap"><span class="eyebrow">Compare</span><h1>Agent-matching services, compared honestly</h1><p class="lede">Every "find an agent" service is free to you — the agent pays a referral fee. What differs: how much, who gets your number, and whether rankings can be bought.</p></div></div>
<section><div class="wrap"><div class="table-scroll"><table class="cmp"><thead><tr><th>Service</th><th>Agent's referral fee</th><th>Who contacts you</th><th>How agents are ranked</th></tr></thead><tbody>
<tr><td class="us">${T}</td><td class="us">25% (disclosed)</td><td class="us">Only the one agent you pick</td><td class="us">Published score; no paid placement</td></tr>
${COMP.map(c => `<tr><td><a href="${u('/compare/' + c.k + '/')}">${c.n}</a></td><td>${c.fee}</td><td>${c.who}</td><td>${c.rank}</td></tr>`).join('')}
</tbody></table></div><p class="src" style="margin-top:12px">Sources: company help pages and public reporting (Inman, The Close, Bankrate, Clever, CFPB/court filings), 2022–2026. "Reported" figures aren't published by the company. Lawsuit items are allegations. Corrections welcome — we'll update within 48 hours.</p></div></section>`,
  });
  for (const c of COMP) {
    const qa = [
      [`Is ${c.n} free?`, `Yes for consumers — the agent pays ${c.n} a referral fee (${c.fee}). ${T} is also free; our partner agents pay 25%, disclosed up front.`],
      [`What's the best ${c.n} alternative?`, `If you want to choose your one agent from a published scorecard and keep your number private, ${T} was built for that. If you need a fast cash sale, ${c.n === 'HomeLight' ? 'HomeLight\'s Simple Sale' : 'an iBuyer'} may fit better — we'll tell you honestly.`],
      [`Does ${c.n} sell my information?`, `Check their privacy policy and consent screen for "marketing partners." Common complaint: ${c.gripe.toLowerCase()}. ${T} shares your info only with the one agent you choose.`],
    ];
    out.push({
      path: `/compare/${c.k}/`, title: `${c.n} Alternative: ${T} vs ${c.n} (Fees, Privacy, Rankings) | ${T}`,
      desc: `${T} vs ${c.n}: referral fees, who gets your contact info, and how agents are ranked. Honest side-by-side.`,
      ld: [faqLd(qa)],
      body: `<div class="phero"><div class="wrap two"><div>${crumbs(u, [['Compare', '/compare/'], [c.n, '']])}<span class="eyebrow">${c.n} alternative</span><h1>${T} vs ${c.n}</h1><p class="lede">Both are free to you. Here's what's different — including where ${c.n} is the better choice.</p></div>${qs(u)}</div></div>
<section><div class="wrap">${cmpTable(c)}
<div class="grid g2" style="margin-top:24px"><div class="card"><h3>Where ${c.n} shines</h3><p>${c.good}. ${c.extra}.</p></div><div class="card"><h3>Most common complaint</h3><p>${c.gripe}.</p></div></div>
<div style="margin-top:28px;max-width:760px">${faqHtml(qa)}</div>
<p class="src">Sources: ${c.n} published materials and public reporting 2022–2026; see <a href="${u('/compare/')}">comparison sources</a>. ${c.n} is a trademark of its owner; no affiliation.</p></div></section>`,
    });
  }

  // Texas buyer agreement guide
  const bqa = [
    ['Do I have to sign an agreement with a buyer\'s agent in Texas?', 'Yes. Since January 1, 2026 (SB 1968), a Texas agent needs a written agreement before performing brokerage services for a buyer. You can start with a showing-only agreement that is non-exclusive and lasts 14 days or less.'],
    ['Who pays the buyer\'s agent?', 'It\'s negotiable. Your agreement states the fee. Sellers and builders often agree to pay some or all of it as a concession, and a good agent asks for that in your offer. Anything they don\'t cover, you owe — so read that line.'],
    ['Can I get out of a buyer agreement?', 'Depends on the terms you sign. Look for a short term and a clear termination clause. Our partner agents agree to let Money Move clients end the agreement early if it isn\'t working.'],
  ];
  out.push({
    path: '/texas-buyer-agreement/', title: `Texas Buyer Representation Agreement Explained (2026 Rules) | ${T}`,
    desc: 'Plain-English guide to the Texas buyer agreement after SB 1968: what you sign, who pays the agent, how to get out.',
    ld: [faqLd(bqa)],
    body: `<div class="phero"><div class="wrap two"><div><span class="eyebrow">Plain-English guide</span><h1>The Texas buyer agreement, explained in 3 minutes</h1><p class="lede">Since Jan 1, 2026, Texas buyers sign a written agreement with their agent. Here's what's in it and what to negotiate.</p></div>${qs(u)}</div></div>
<section><div class="wrap two"><div>
<h2>The 5 lines that matter</h2>
<ul class="list-check"><li><b>Type:</b> showing-only (non-exclusive, ≤14 days) or full representation</li><li><b>Fee:</b> the % or flat amount your agent earns</li><li><b>Who pays:</b> whether the agent will seek it from the seller/builder first</li><li><b>Term:</b> how long you're committed — shorter is safer</li><li><b>Termination:</b> how either side can end it</li></ul>
<div class="pill-note">Money Move tip: start with a showing-only agreement. If you love your agent, sign the full one. If not, text "swap."</div>
</div><div>${faqHtml(bqa)}<p class="src">Not legal advice. Sources: Texas SB 1968 (89R) bill analysis; Texas REALTORS agency law explainer.</p></div></div></section>`,
  });
  return out;
}
