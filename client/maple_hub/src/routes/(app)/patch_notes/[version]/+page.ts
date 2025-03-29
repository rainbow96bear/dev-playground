import { InternalAPI } from '$lib/api/index.js';

export async function load({ params }) {
	try {
		const res = await InternalAPI(`/patch_notes/${params.version}`);
		const data = await res.content;
		return {
			content: data
		};
	} catch (error) {
		console.error(error);
		return {
			content: '패치 노트를 불러오는 중 오류가 발생했습니다.'
		};
	}
}
