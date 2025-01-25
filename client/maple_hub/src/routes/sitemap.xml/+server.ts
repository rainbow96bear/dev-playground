import type { RequestHandler } from './$types';

const nowDay = new Date().toISOString().split('T')[0];
const lastmodDay = nowDay; // 마지막 수정 날짜는 현재 날짜로 설정

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://maplebox.netlify.app'; // 사이트의 기본 URL

	try {
		const characterNames = ['도적', '아델', '방미헤', '베베'];

		// 기본 페이지 URL 설정
		const pages = [
			{ path: '/', lastmod: lastmodDay },
			{ path: '/character/info', lastmod: lastmodDay },
			// 각 캐릭터 페이지를 동적으로 추가
			...characterNames.map((name) => ({
				path: `/character/info?name=${encodeURIComponent(name)}`,
				lastmod: lastmodDay
			}))
		];

		// 사이트맵 XML 생성
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

		// 응답 반환
		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'no-cache'
			}
		});
	} catch (err) {
		return new Response('사이트맵 생성에 실패했습니다.', {
			status: 500
		});
	}
};
