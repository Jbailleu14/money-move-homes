// Generates SVG marketing assets into src/assets
import fs from 'node:fs';
const dir = 'src/assets'; fs.mkdirSync(dir, { recursive: true });
const F = "font-family='Inter,Segoe UI,Helvetica,Arial,sans-serif'";
const G = '#0e5c4a', G2 = '#12806a', GOLD = '#c8962e', INK = '#0b1b2b';
const house = (x, y, s, c = '#fff') => `<g transform='translate(${x} ${y}) scale(${s})' fill='none' stroke='${c}' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M3 11.5 12 4l9 7.5'/><path d='M6 10v9h12v-9'/><path d='m9.5 15.5 2.5-2.5 2.5 2.5'/><path d='M12 13v5'/></g>`;
const logo = (x, y, sz, c = '#fff') => `<g>${`<rect x='${x}' y='${y}' width='${sz}' height='${sz}' rx='${sz * .28}' fill='${G2}'/>`}${house(x + sz * .2, y + sz * .2, sz * .6 / 24)}<text x='${x + sz * 1.3}' y='${y + sz * .72}' ${F} font-size='${sz * .62}' font-weight='800' fill='${c}'>Money Move <tspan fill='${GOLD}'>Homes</tspan></text></g>`;
const bg = (w, h) => `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${INK}'/><stop offset='1' stop-color='#0f3d45'/></linearGradient><radialGradient id='r' cx='.85' cy='.1' r='.7'><stop offset='0' stop-color='${G2}' stop-opacity='.55'/><stop offset='1' stop-color='${G2}' stop-opacity='0'/></radialGradient></defs><rect width='${w}' height='${h}' fill='url(#g)'/><rect width='${w}' height='${h}' fill='url(#r)'/>`;
const lines = (arr, x, y, size, lh, fill = '#fff', weight = 800) => arr.map((t, i) => `<text x='${x}' y='${y + i * lh}' ${F} font-size='${size}' font-weight='${weight}' fill='${fill}'>${t}</text>`).join('');
const checks = (arr, x, y, size, lh) => arr.map((t, i) => `<g><circle cx='${x + size * .45}' cy='${y + i * lh - size * .35}' r='${size * .5}' fill='${G2}'/><text x='${x + size * .45}' y='${y + i * lh - size * .12}' ${F} font-size='${size * .7}' font-weight='900' fill='#fff' text-anchor='middle'>✓</text><text x='${x + size * 1.4}' y='${y + i * lh}' ${F} font-size='${size}' font-weight='600' fill='#e6eef5'>${t}</text></g>`).join('');
const pill = (x, y, w, h, t, size) => `<rect x='${x}' y='${y}' width='${w}' height='${h}' rx='${h / 2}' fill='${GOLD}'/><text x='${x + w / 2}' y='${y + h * .64}' ${F} font-size='${size}' font-weight='800' fill='#fff' text-anchor='middle'>${t}</text>`;
const svg = (w, h, inner) => `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${bg(w, h)}${inner}</svg>`;
const legal = (w, h, size = 20) => `<text x='${w / 2}' y='${h - 36}' ${F} font-size='${size}' fill='#8ea2b5' text-anchor='middle'>[Brokerage name] · Texas Real Estate License #[XXXXXX] · Equal Housing Opportunity</text>`;

const write = (f, s) => fs.writeFileSync(`${dir}/${f}`, s);

write('favicon.svg', `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='9' fill='${G}'/>${house(4, 4, 1)}</svg>`);

write('og.svg', svg(1200, 630, `${logo(70, 60, 64)}
${lines(['The loudest agent', 'isn\'t the best agent.'], 70, 270, 76, 88)}
${lines(['We rank agents on real results. You pick one. Free.'], 70, 420, 34, 40, '#b9cbdb', 600)}
${pill(70, 480, 380, 76, 'Get matched free →', 32)}${legal(1200, 630, 18)}`));

write('ig-1.svg', svg(1080, 1080, `${logo(80, 80, 72)}
${lines(['The loudest', 'agent isn\'t the', 'best agent.'], 80, 330, 104, 118)}
${checks(['Ranked on homes actually closed near you', 'You see the scorecard first', 'Only ONE agent gets your number', 'Swap any time. Free. Always.'], 84, 760, 38, 66)}
${legal(1080, 1080)}`));

write('ig-2.svg', svg(1080, 1080, `${logo(80, 80, 72)}
${lines(['Your rent is', 'already paying', 'a mortgage.'], 80, 330, 104, 118)}
${lines(['Just not yours. 🔑'], 80, 700, 64, 70, GOLD)}
${lines(['See what your rent could buy →'], 80, 820, 44, 50, '#e6eef5', 600)}
${pill(80, 870, 520, 84, 'MoneyMoveHomes.com', 36)}${legal(1080, 1080)}`));

write('ig-3.svg', svg(1080, 1080, `${logo(80, 80, 72)}
${lines(['⚠️ Touring', 'model homes?'], 80, 330, 104, 118)}
${lines(['The builder\'s rep works', 'for the builder.'], 80, 590, 56, 66, '#e6eef5', 700)}
${checks(['Get your own agent — usually builder-paid', 'Register BEFORE your first visit', 'Negotiate incentives, upgrades, buydowns'], 84, 790, 36, 62)}
${legal(1080, 1080)}`));

write('story-1.svg', svg(1080, 1920, `${logo(80, 120, 80)}
${lines(['¿Cansado', 'de pagar', 'renta?'], 80, 520, 140, 156)}
${lines(['Te conectamos GRATIS con un', 'agente bilingüe con los mejores', 'resultados en tu zona.'], 80, 1060, 52, 66, '#e6eef5', 600)}
${checks(['Todo en español', 'Ayuda para el enganche', 'Solo un agente recibe tu número'], 84, 1360, 46, 84)}
${pill(80, 1620, 700, 110, 'Encuentra tu agente →', 46)}${legal(1080, 1920, 22)}`));

write('flyer.svg', `<svg xmlns='http://www.w3.org/2000/svg' width='816' height='1056' viewBox='0 0 816 1056'><rect width='816' height='1056' fill='#fff'/>
<rect width='816' height='420' fill='${INK}'/><rect width='816' height='420' fill='url(#r)'/>
<defs><radialGradient id='r' cx='.85' cy='.1' r='.8'><stop offset='0' stop-color='${G2}' stop-opacity='.6'/><stop offset='1' stop-color='${G2}' stop-opacity='0'/></radialGradient></defs>
${logo(56, 48, 52)}
${lines(['Find the agent with', 'the best results', 'near you. Free.'], 56, 200, 58, 66)}
<text x='56' y='560' ${F} font-size='30' font-weight='800' fill='${INK}'>Why Money Move Homes?</text>
${[['Ranked on results', 'Homes closed near you, price won vs. asking, days to close.'], ['One agent, your pick', 'Only the agent you choose gets your number. Never sold.'], ['Swap any time', 'Text "swap" and meet the next agent on your list.'], ['Free, always', 'Agents pay us only when you close. Your price doesn\'t change.'], ['En español', 'Agentes bilingües de principio a fin.']].map(([h, p], i) => `<circle cx='72' cy='${616 + i * 70}' r='14' fill='${G2}'/><text x='72' y='${622 + i * 70}' ${F} font-size='16' font-weight='900' fill='#fff' text-anchor='middle'>✓</text><text x='100' y='${614 + i * 70}' ${F} font-size='22' font-weight='800' fill='${INK}'>${h}</text><text x='100' y='${640 + i * 70}' ${F} font-size='17' fill='#4a5b6c'>${p}</text>`).join('')}
<rect x='56' y='${960}' width='704' height='2' fill='#e3e8ee'/>
<rect x='560' y='560' width='200' height='200' rx='14' fill='#f6f8fb' stroke='#e3e8ee'/><text x='660' y='650' ${F} font-size='18' font-weight='700' fill='#5b6b7c' text-anchor='middle'>[QR code]</text><text x='660' y='678' ${F} font-size='14' fill='#5b6b7c' text-anchor='middle'>Scan → 2-min match</text>
<text x='408' y='1010' ${F} font-size='14' fill='#5b6b7c' text-anchor='middle'>[Brokerage name] · TX License #[XXXXXX] · Information About Brokerage Services: [URL] · Equal Housing Opportunity</text></svg>`);
console.log('assets written');
