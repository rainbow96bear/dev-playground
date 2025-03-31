import type { RequestHandler } from './$types';
import { InternalAPI } from '$lib/api';

export const prerender = false; // 동적으로 데이터를 가져오므로 false

const baseUrl = 'https://maplebox.netlify.app';

export const GET: RequestHandler = async () => {
	const nowDay = new Date().toISOString().split('T')[0];

	try {
		// 패치 노트 목록 가져오기
		const patchRes = await InternalAPI('/patch_notes');
		const patchVersions = patchRes.files?.map((file: { version: string }) => file.version) || [];

		// 기본 페이지
		const pages = [
			{ path: '/', lastmod: nowDay },
			{ path: '/character/info', lastmod: nowDay },
			{ path: '/simulation/cube', lastmod: nowDay },
			{ path: '/patch_notes', lastmod: nowDay }
		];

		// 패치 노트 상세 페이지 추가
		const patchPages = patchVersions.map((version) => ({
			path: `/patch_notes/${version}`,
			lastmod: nowDay
		}));

		// 모든 페이지 합치기
		const allPages = [...pages, ...patchPages];

		// XML 사이트맵 생성 (공백 제거)
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
		.map(
			(page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
		)
		.join('')}
</urlset>`.trim(); // 🚀 앞뒤 공백 제거

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
