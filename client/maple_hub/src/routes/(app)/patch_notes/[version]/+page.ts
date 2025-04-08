import { InternalAPI } from '$lib/api/index.js';

export async function load({ params, fetch }) {
	try {
		const res = await InternalAPI(`/patch_notes/${params.version}`, fetch); // ⬅ fetch 전달
		return {
			content: res.content
		};
	} catch (error) {
		console.error(error);
		return {
			content: '패치 노트를 불러오는 중 오류가 발생했습니다.'
		};
	}
}
