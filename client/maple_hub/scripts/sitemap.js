import fs from 'fs';
import path from 'path';

const baseUrl = 'https://maplebox.netlify.app';
const nowDay = new Date().toISOString().split('T')[0];

const patchVersions = ['0.0.5', '0.0.4', '0.0.3', '0.0.2', '0.0.1'];
const characterNames = ['도적', '아델', '방미헤', '베베', '나이트로드', '패스파인더', '섀도어'];

const pages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/character/info', priority: '0.9', changefreq: 'monthly' },
  { path: '/simulation/cube', priority: '0.9', changefreq: 'monthly' },
  { path: '/boss_rewards', priority: '0.9', changefreq: 'monthly' },
  { path: '/games', priority: '0.6', changefreq: 'weekly' },
  { path: '/games/applegame', priority: '0.6', changefreq: 'monthly' },
  { path: '/patch_notes', priority: '0.7', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.8', changefreq: 'yearly' },
  ...characterNames.map((name) => ({
    path: `/character/info/${name}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  ...patchVersions.map((version) => ({
    path: `/patch_notes/${version}`,
    priority: '0.9',
    changefreq: 'monthly',
  }))
];

const escapeXml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(baseUrl + page.path)}</loc>
    <lastmod>${nowDay}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`.trim();

fs.writeFileSync(path.resolve('static/sitemap.xml'), sitemap, 'utf8');
