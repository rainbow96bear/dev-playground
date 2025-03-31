import { json } from '@sveltejs/kit';
export const prerender = true;
export async function GET({ params, fetch }) {
	const { version } = params;

	try {
		const response = await fetch(`/patch_notes/${version}.md`);

		if (!response.ok) {
			throw new Error(`파일을 찾을 수 없습니다: ${response.status}`);
		}

		const content = await response.text();
		return json({ content });
	} catch (error) {
		console.error('패치 노트 가져오기 실패:', error);
		return json({ content: '패치 노트를 찾을 수 없습니다.' }, { status: 404 });
	}
}
