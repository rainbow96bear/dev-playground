import type { RequestHandler } from './$types';

export const prerender = false;

const baseUrl = 'https://maplebox.netlify.app';

export const GET: RequestHandler = async () => {
	const nowDay = new Date().toISOString().split('T')[0];

	try {
		const patchVersions = ['0.0.5', '0.0.4', '0.0.3', '0.0.2', '0.0.1'];
		const characterNames = ['도적', '아델', '방미헤', '베베', '나이트로드', '패스파인더', '섀도어'];

		// 기본 페이지
		const pages = [
			{ path: '/', priority: 1.0, changefreq: 'daily' },
			{ path: '/character/info', priority: 0.9, changefreq: 'monthly' },
			{ path: '/simulation/cube', priority: 0.9, changefreq: 'monthly' },
			{ path: '/boss_rewards', priority: 0.9, changefreq: 'monthly' },
			{ path: '/games', priority: 0.6, changefreq: 'weekly' },
			{ path: '/games/applegame', priority: 0.6, changefreq: 'monthly' },
			{ path: '/patch_notes', priority: 0.7, changefreq: 'weekly' },
			{ path: '/privacy', priority: 0.8, changefreq: 'yearly' },
			...characterNames.map((name) => ({
				path: `/character/info/${encodeURIComponent(name)}`,
				priority: 0.8,
				changefreq: 'monthly'
			}))
		];

		// 패치 노트 상세 페이지 추가
		const patchPages = patchVersions.map((version) => ({
			path: `/patch_notes/${version}`,
			priority: 0.9,
			changefreq: 'monthly'
		}));

		// 모든 페이지 합치기
		const allPages = [...pages, ...patchPages];

		// XML 형식의 사이트맵 생성
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${nowDay}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml; charset=UTF-8',
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
			}
		});
	} catch (err) {
		console.error('사이트맵 생성 실패:', err);
		return new Response('사이트맵 생성에 실패했습니다.', { status: 500 });
	}
};
