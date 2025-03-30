import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { fileName } = params;
	const filePath = path.resolve('static/cube_data', `${fileName}.json`);

	let content = '';
	try {
		content = fs.readFileSync(filePath, 'utf-8');
	} catch (error) {
		console.error('파일 읽기 실패:', error);
		return json({ content: '큐브 데이터를 찾을 수 없습니다.', status: 404 }, { status: 404 });
	}

	try {
		// 파일 내용을 JSON 객체로 파싱
		const parsedContent = JSON.parse(content);
		return json({ content: parsedContent });
	} catch (error) {
		console.error('JSON 파싱 실패:', error);
		return json({ content: '파일 파싱 오류' }, { status: 500 });
	}
}
