// Static site builder: node build.mjs -> dist/
import fs from 'node:fs';
import path from 'node:path';
import { pages } from './src/pages.mjs';
import { seoPages } from './src/seo.mjs';

const BRAND = 'Money Move Homes';
const BASE = process.env.BASE_PATH || '';
const SITE = process.env.SITE_URL || 'https://moneymovehomes.com';
const INDEX = process.env.INDEX === '1';
const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const logoSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M6 10v9h12v-9"/><path d="m9.5 15.5 2.5-2.5 2.5 2.5"/><path d="M12 13v5"/></svg>`;

const u = (p) => BASE + p;

function layout({ title, desc, body, path: p, lang = 'en', hideMcta = false, ld }) {
  const es = lang === 'es';
  return `<!doctype html><html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${title}</title><meta name="description" content="${desc}">
<meta name="robots" content="${INDEX ? 'index,follow,max-image-preview:large' : 'noindex,nofollow'}">
<link rel="canonical" href="${SITE + p}">
${(ld || []).map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: BRAND, url: SITE, areaServed: 'US', knowsLanguage: ['en', 'es'] })}</script>
<meta name="theme-color" content="#0e5c4a">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}">
<meta property="og:image" content="${u('/assets/og.svg')}">
<link rel="icon" href="${u('/assets/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${u('/styles.css')}">
</head><body>
<div class="preview-bar"><b>${es ? 'Vista previa' : 'Preview build'}</b> · ${es ? 'Sitio de muestra. Agentes y estadísticas son ilustrativos; los formularios no envían datos.' : 'Sample site. Agents and stats shown are illustrative; forms do not submit any data.'}</div>
<header class="site"><div class="wrap">
<a class="logo" href="${u('/')}"><span class="mark">${logoSvg}</span><span>Money Move <span style="color:var(--brand)">Homes</span></span></a>
<nav class="main">
<a href="${u('/buy/')}">${es ? 'Comprar' : 'Buy'}</a>
<a href="${u('/sell/')}">${es ? 'Vender' : 'Sell'}</a>
<a href="${u('/new-construction/')}">${es ? 'Casas nuevas' : 'New builds'}</a>
<a href="${u('/scorecard/')}">${es ? 'Cómo calificamos' : 'How we rank'}</a>
<a href="${u('/compare/')}">${es ? 'Comparar' : 'Compare'}</a>
<a href="${u(es ? '/' : '/es/')}">${es ? 'English' : 'Español'}</a>
<a class="btn primary sm" href="${u(es ? '/es/match/' : '/match/')}">${es ? 'Encuentra tu agente' : 'Get matched'}</a>
</nav></div></header>
<main>${body}</main>
<footer class="site"><div class="wrap">
<div class="cols">
<div><a class="logo" href="${u('/')}" style="color:#fff"><span class="mark">${logoSvg}</span><span>Money Move Homes</span></a>
<p style="margin-top:12px">${es ? 'Te conectamos con el agente con mejores resultados verificados en tu zona. Gratis para ti. Sin spam.' : 'We match you with the agent with the best verified results in your area. Free to you. No spam, ever.'}</p></div>
<div><h5>${es ? 'Clientes' : 'Clients'}</h5><ul>
<li><a href="${u('/buy/')}">Buy a home</a></li><li><a href="${u('/sell/')}">Sell a home</a></li><li><a href="${u('/new-construction/')}">New construction</a></li><li><a href="${u('/first-time-buyers/')}">Renters → owners</a></li><li><a href="${u('/relocate/')}">Relocating</a></li><li><a href="${u('/es/')}">Español</a></li></ul></div>
<div><h5>Company</h5><ul><li><a href="${u('/scorecard/')}">How we rank agents</a></li><li><a href="${u('/promise/')}">Our promise</a></li><li><a href="${u('/join/')}">For agents</a></li><li><a href="${u('/compare/')}">Compare referral services</a></li><li><a href="${u('/agents/tx/')}">Texas agents by city</a></li><li><a href="${u('/agents/')}">All cities</a></li><li><a href="${u('/texas-buyer-agreement/')}">Texas buyer agreement guide</a></li></ul></div>
<div><h5>Texas required notices</h5><ul><li><a href="#">Information About Brokerage Services (IABS)</a></li><li><a href="#">TREC Consumer Protection Notice</a></li><li><a href="#">Privacy &amp; TCPA consent</a></li></ul></div>
</div>
<div class="legal">${BRAND} is a d/b/a of [Licensed Brokerage Name], a Texas-licensed real estate broker, License #[XXXXXX]. Designated Broker: [Name], License #[XXXXXX]. We are a referral brokerage: we do not represent you in a transaction; your matched agent and their brokerage do. Referral fees are paid by partner brokerages, never by consumers. Equal Housing Opportunity. Sample statistics on this preview are illustrative and not performance claims.</div>
</div></footer>
${hideMcta ? '' : `<div class="mcta"><a class="btn primary block" href="${u(es ? '/es/match/' : '/match/')}">${es ? 'Encuentra tu agente — gratis' : 'Get matched free — 2 minutes'}</a></div>`}
<script>window.BASE=${JSON.stringify(BASE)}</script>
<script src="${u('/app.js')}" defer></script>
</body></html>`;
}

const all = [...pages(u), ...seoPages(u)];
for (const pg of all) {
  const dir = path.join(out, pg.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(pg));
}
fs.copyFileSync('src/styles.css', path.join(out, 'styles.css'));
fs.copyFileSync('src/app.js', path.join(out, 'app.js'));
fs.cpSync('src/assets', path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, '.nojekyll'), '');
fs.writeFileSync(path.join(out, 'robots.txt'), INDEX ? `User-agent: *\nAllow: /\nDisallow: /marketing-kit/\nSitemap: ${SITE}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${all.filter(p => !p.path.includes('marketing-kit')).map(p => `<url><loc>${SITE + p.path}</loc></url>`).join('')}</urlset>`);
console.log('built', fs.readdirSync(out).length, 'entries');
