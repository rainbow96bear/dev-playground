import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const baseUrl = 'https://maplebox.netlify.app';

async function generateSitemap() {
  const nowDay = new Date().toISOString().split('T')[0];
  const patchNotesPath = join(import.meta.dirname, '../static/patch_notes.json');
  let patchVersions: string[] = [];

  if (existsSync(patchNotesPath)) {
    try {
      const rawData = await readFile(patchNotesPath, 'utf-8');
      const jsonData = JSON.parse(rawData);
      patchVersions = jsonData.files?.map((file: string) => file.replace(/\.md$/, '')) || [];
    } catch (err) {
      console.error('❌ 패치 노트 JSON 파일을 읽는 중 오류 발생:', err);
    }
  }

  const pages = [
    { path: '/', lastmod: nowDay, priority: 1.0, changefreq: 'daily' },
    { path: '/character/info', lastmod: nowDay, priority: 0.8, changefreq: 'weekly' },
    { path: '/simulation/cube', lastmod: nowDay, priority: 0.7, changefreq: 'weekly' },
    { path: '/patch_notes', lastmod: nowDay, priority: 0.6, changefreq: 'monthly' },
    ...patchVersions.map((version) => ({
      path: `/patch_notes/${version}`,
      lastmod: nowDay,
      priority: 0.4,
      changefreq: 'yearly'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`
    )
    .join('')}
</urlset>`.trim();

  const sitemapPath = join(import.meta.dirname, '../static/sitemap.xml');
  await writeFile(sitemapPath, sitemap, 'utf-8');
  console.log('✅ sitemap.xml이 생성되었습니다.');
}

// 🚀 실행
generateSitemap().catch(console.error);
