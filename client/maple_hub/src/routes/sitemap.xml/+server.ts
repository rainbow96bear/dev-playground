import type { RequestHandler } from './$types';

const nowDay = new Date().toISOString().split('T')[0];
const lastmodDay = '2025-01-01';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://maplebox.netlify.app'; // 사이트의 기본 URL

	const pages = [
		{ path: '/', lastmod: lastmodDay },
		{ path: '/character/info', lastmod: lastmodDay }
	];

	const sitemap = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
				.map(
					(page) => `
        <url>
          <loc>${baseUrl}${page.path}</loc>
          <lastmod>${page.lastmod}</lastmod>
        </url>
      `
				)
				.join('')}
    </urlset>
  `;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'no-cache'
		}
	});
};
