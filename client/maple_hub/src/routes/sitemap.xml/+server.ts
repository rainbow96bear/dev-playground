// src/routes/sitemap.xml/+server.ts

import { getPages } from '$lib/sitemap/pages'; // 페이지 목록을 가져오는 함수 (예시)

export const GET = async () => {
  const pages = await getPages(); // 페이지 목록을 동적으로 가져옴

  // 페이지 목록을 바탕으로 XML을 작성
  const xml = pages.map((page: { url: string; lastmod: string; priority: string }) => `
    <url>
      <loc>https://your-domain.com${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <priority>${page.priority}</priority>
    </url>
  `).join('');

  // Sitemap XML 형식으로 응답
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xml}
  </urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
