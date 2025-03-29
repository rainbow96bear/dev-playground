import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET() {
	const dirPath = path.resolve('static/patch_notes'); // static/patch_notes 폴더 경로
	let files: string[] = [];

	try {
		// 폴더 내의 모든 파일 이름 가져오기
		files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md')); // .md 파일만 필터링
	} catch (error) {
		console.error('파일 목록을 읽는 데 실패했습니다:', error);
		return json({ error: '파일 목록을 불러오는 데 실패했습니다.' }, { status: 500 });
	}

	// 파일 이름만 반환
	return json({ files });
}
