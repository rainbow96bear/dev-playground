// src/routes/patch_notes/+page.server.ts
import { InternalAPI } from '$lib/api';

export const load = async () => {
	try {
		const res = await InternalAPI('/patch_notes'); // API 호출
		if (res.files) {
			return res; // files를 명확히 반환
		} else {
			console.error('파일 목록을 불러오는데 문제가 생겼습니다.');
			return { files: [] }; // 파일 목록이 없을 경우 빈 배열 반환
		}
	} catch (error) {
		console.error('API 호출 실패:', error);
		return { files: [] }; // 오류 발생 시 빈 배열 반환
	}
};
