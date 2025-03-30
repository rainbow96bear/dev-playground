import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 설정 (ESM에서는 __dirname이 기본적으로 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 프로젝트 루트 경로 설정
const rootDir = path.resolve(__dirname, '..');
const patchNotesDir = path.join(rootDir, 'static/patch_notes');

// 패치 노트 폴더에서 모든 .md 파일 스캔
try {
	const files = fs.readdirSync(patchNotesDir).filter((file) => file.endsWith('.md'));

	// 파일 목록을 JSON 파일로 저장
	fs.writeFileSync(path.join(patchNotesDir, 'file-list.json'), JSON.stringify({ files }));

	console.log('패치 노트 파일 목록이 생성되었습니다.');
} catch (error) {
	console.error('오류 발생:', error);
}
