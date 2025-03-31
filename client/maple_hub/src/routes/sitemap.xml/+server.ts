import type { RequestHandler } from './$types';
import { InternalAPI } from '$lib/api';

export const prerender = true;

const baseUrl = 'https://maplebox.netlify.app';

export const GET: RequestHandler = async () => {
	const nowDay = new Date().toISOString().split('T')[0];

	try {
		// 패치 노트 목록 가져오기
		const patchRes = await InternalAPI('/patch_notes');
		const patchVersions =
			patchRes.files?.map((file: string) => {
				// 정규 표현식을 사용하여 ".md" 확장자를 제거
				const version = file.replace(/\.md$/, '');
				return version;
			}) || [];

		// 캐릭터 이름 목록
		const characterNames = ['도적', '아델', '방미헤', '베베', '나이트로드', '패스파인더', '섀도어'];

		// 기본 페이지
		const pages = [
			{ path: '/', lastmod: nowDay, priority: 1.0, changefreq: 'daily' },
			{ path: '/character/info', lastmod: nowDay, priority: 0.8, changefreq: 'monthly' },
			{ path: '/simulation/cube', lastmod: nowDay, priority: 0.8, changefreq: 'monthly' },
			{ path: '/patch_notes', lastmod: nowDay, priority: 0.9, changefreq: 'weekly' },
			...characterNames.map((name) => ({
				path: `/character/info?name=${encodeURIComponent(name)}`,
				lastmod: nowDay,
				priority: 0.7,
				changefreq: 'monthly'
			}))
		];

		// 패치 노트 상세 페이지 추가
		const patchPages = patchVersions.map((version) => ({
			path: `/patch_notes/${version}`,
			lastmod: nowDay,
			priority: 0.6,
			changefreq: 'monthly'
		}));

		// 모든 페이지 합치기
		const allPages = [...pages, ...patchPages];

		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
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
</urlset>`;

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'no-cache'
			}
		});
	} catch (err) {
		console.error('사이트맵 생성 실패:', err);
		return new Response('사이트맵 생성에 실패했습니다.', {
			status: 500
		});
	}
};
