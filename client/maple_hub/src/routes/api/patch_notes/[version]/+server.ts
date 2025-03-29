import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	console.log('params:', params); // params가 올바르게 전달되는지 확인
	const { version } = params;
	console.log('version:', version); // version이 제대로 나오는지 확인

	// 파일 경로 설정 (static 폴더 사용)
	const filePath = path.resolve('static/patch_notes', `${version}.md`);

	console.log('durl');
	let content = '';
	try {
		content = fs.readFileSync(filePath, 'utf-8');
	} catch (error) {
		console.error('파일 읽기 실패:', error); // 에러 로그 출력
		return json({ content: '패치 노트를 찾을 수 없습니다.' }, { status: 404 });
	}

	return json({ content });
}
