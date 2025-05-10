import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET({ params, fetch }) {
	const { fileName } = params;
	try {
		const response = await fetch(`/static/cube_data/${fileName}.json`);
		if (!response.ok) throw new Error('File not found');
		const data = await response.json();
		return json({ content: data });
	} catch (error) {
		console.error('파일 읽기 실패:', error);
		return json({ content: '큐브 데이터를 찾을 수 없습니다.', status: 404 }, { status: 404 });
	}
}
