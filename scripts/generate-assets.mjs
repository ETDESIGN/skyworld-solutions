/**
 * Image pipeline for the SWS website.
 *
 * Sources (committed): public/images/*.jpg|png — original photos from skyworld-solutions.com
 * Derivatives (generated): .webp siblings, favicon set, apple/android icons, OG card, manifest.
 *
 * Run: npm run assets
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'public', 'images');

const BRAND_GREEN = '#068548';
const BRAND_DARK = '#0f172a';

async function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function webp(input, output, { width, quality = 80 } = {}) {
  const pipeline = sharp(input);
  const meta = await pipeline.metadata();
  const w = width ? Math.min(width, meta.width) : meta.width;
  await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality }).toFile(output);
  const kb = (fs.statSync(output).size / 1024).toFixed(0);
  console.log(`webp  ${path.relative(ROOT, output)} (${w}w, ${kb}KB)`);
}

async function makeFaviconBg(size, iconBuf) {
  // White square with the green S monogram centered at 72% (keeps the dark swirl visible)
  const inner = Math.round(size * 0.72);
  const icon = await sharp(iconBuf)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite([{ input: icon, top: Math.round((size - inner) / 2), left: Math.round((size - inner) / 2) }])
    .png()
    .toBuffer();
}

async function main() {
  ensureDir(IMG);

  // 1. WebP derivatives for photos (jpg originals remain the <img> fallbacks)
  await webp(path.join(IMG, '001.jpg'), path.join(IMG, '001.webp'), { quality: 82 });
  // Responsive widths for the hero (used via webpSrcSet)
  await webp(path.join(IMG, '001.jpg'), path.join(IMG, '001-640.webp'), { width: 640, quality: 80 });
  await webp(path.join(IMG, '001.jpg'), path.join(IMG, '001-1024.webp'), { width: 1024, quality: 80 });
  for (const n of ['002', '003', '004', '005', '006', '007', '010']) {
    await webp(path.join(IMG, `${n}.jpg`), path.join(IMG, `${n}.webp`), { width: 1000, quality: 80 });
  }

  // 2. Logo webp (alpha preserved)
  await webp(path.join(IMG, 'SKYWORLD_SOLUTIONS.png'), path.join(IMG, 'SKYWORLD_SOLUTIONS.webp'), {
    width: 1280,
    quality: 90,
  });

  // 3. Favicon set from the S monogram (extracted from the alpha wordmark)
  const iconBuf = await sharp(path.join(IMG, 'SKYWORLD_SOLUTIONS.png'))
    .extract({ left: 0, top: 0, width: 900, height: 800 })
    .png()
    .toBuffer()
    .then((b) => sharp(b).trim().png().toBuffer());

  fs.writeFileSync(path.join(IMG, 'icon.png'), iconBuf);
  fs.writeFileSync(path.join(ROOT, 'public', 'favicon-32.png'), await makeFaviconBg(32, iconBuf));
  fs.writeFileSync(path.join(ROOT, 'public', 'favicon-48.png'), await makeFaviconBg(48, iconBuf));
  fs.writeFileSync(path.join(ROOT, 'public', 'apple-touch-icon.png'), await makeFaviconBg(180, iconBuf));
  fs.writeFileSync(path.join(ROOT, 'public', 'android-chrome-512.png'), await makeFaviconBg(512, iconBuf));
  console.log('icons favicon-32/48, apple-touch-icon, android-chrome-512, icon.png');

  // 4. Open Graph card 1200x630
  const sIcon = await sharp(iconBuf)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const ogSvg = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0f172a"/>
        <stop offset="1" stop-color="#1e293b"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.85" cy="0.15" r="0.9">
        <stop offset="0" stop-color="#06b6d4" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#06b6d4" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94a3b8" stroke-opacity="0.07" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect x="0" y="624" width="1200" height="6" fill="${BRAND_GREEN}"/>
    <text x="100" y="200" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="14" fill="#22d3ee">PRECISION ENGINEERING</text>
    <text x="96" y="300" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="bold" fill="#ffffff">SKYWORLD SOLUTIONS</text>
    <text x="100" y="368" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#94a3b8">Expertise mécanique — du prototype à la production</text>
    <text x="100" y="470" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#64748b">Usinage CNC 5 axes · Emboutissage · Assemblage · Logistique mondiale</text>
    <text x="100" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="${BRAND_GREEN}">skyworld-solutions.com</text>
  </svg>`);
  await sharp(ogSvg)
    .composite([{ input: sIcon, top: 90, left: 920 }])
    .jpeg({ quality: 88 })
    .toFile(path.join(IMG, 'og-card.jpg'));
  console.log('og    public/images/og-card.jpg');

  // 5. Web manifest
  const manifest = {
    name: 'Skyworld Solutions',
    short_name: 'SWS',
    icons: [{ src: '/android-chrome-512.png', sizes: '512x512', type: 'image/png' }],
    theme_color: BRAND_DARK,
    background_color: BRAND_DARK,
    display: 'standout',
  };
  fs.writeFileSync(path.join(ROOT, 'public', 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('webmanifest public/site.webmanifest');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
