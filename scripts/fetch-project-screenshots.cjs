const http = require('http');
const https = require('https');
const fs = require('fs');
const { URL } = require('url');

const outDir = './public/images/projects';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const projects = [
  { name: 'xentro', site: 'https://xentro-technologies.vercel.app/' },
  { name: 'in-the-making', site: 'https://in-the-making.vercel.app/' },
  { name: 'campuscycle', site: 'https://campus-cycle-mauve.vercel.app/' },
  { name: 'cheptalal', site: 'https://cheptalal-primary-school-gamma.vercel.app/' },
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c.toString()));
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
      })
      .on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(downloadFile(new URL(res.headers.location, url).href, dest));
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
        file.on('error', (err) => reject(err));
      })
      .on('error', reject);
  });
}

async function findImage(site, name) {
  try {
    const r = await fetch(site);
    const html = r.body || '';
    // try meta og:image
    let m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    if (!m) m = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (!m) m = html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i);
    if (m) {
      const url = new URL(m[1], site).href;
      return url;
    }

    // try candidates
    const candidates = [
      `/images/projects/${name}.png`,
      `/images/${name}.png`,
      `/og-image.jpg`,
      `/og.png`,
      `/profile.jpg`,
      `/screenshot.png`,
    ];
    for (const c of candidates) {
      const u = new URL(c, site).href;
      try {
        const head = await fetch(u);
        if (head.statusCode === 200) return u;
      } catch (e) {
        // ignore
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

(async () => {
  for (const p of projects) {
    console.log(`Processing ${p.name} — ${p.site}`);
    const found = await findImage(p.site, p.name);
    if (!found) {
      console.warn(`No preview found for ${p.name}, skipping.`);
      continue;
    }
    const dest = `${outDir}/${p.name}.png`;
    try {
      console.log(`Downloading ${found} → ${dest}`);
      await downloadFile(found, dest);
      console.log(`Saved ${dest}`);
    } catch (e) {
      console.error(`Failed to download for ${p.name}: ${e.message}`);
    }
  }
  console.log('Done.');
})();
