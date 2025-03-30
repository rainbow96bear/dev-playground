import { json } from '@sveltejs/kit';

export async function GET({ fetch }) {
	try {
		// 빌드 시점에 생성된 파일 목록 가져오기
		const response = await fetch('/patch_notes/file-list.json');

		if (!response.ok) {
			throw new Error('파일 목록을 불러오는 데 실패했습니다.');
		}

		const data = await response.json();
		return json({ files: data.files });
	} catch (error) {
		console.error('파일 목록을 불러오는 데 실패했습니다:', error);
		return json({ error: '파일 목록을 불러오는 데 실패했습니다.' }, { status: 500 });
	}
}
