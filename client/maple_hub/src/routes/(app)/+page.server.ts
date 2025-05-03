// +page.server.ts
import { error } from '@sveltejs/kit';
import { InternalAPI } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const today = new Date().getDay();
	if (today >= 1 && today <= 4) {
		console.log('월요일부터 목요일까지는 동작하지 않습니다.');
		return null;
	}

	const eventList = await InternalAPI('/v1/nexon/eventList');
	const sundayEvent = await InternalAPI('/v1/nexon/sundayMaple');
	return {
		eventList: eventList.data,
		sundayEvent: sundayEvent.data
	};
};

// 썬데이 메이플 이벤트 불러오기
const getSundayEvent = async () => {
	try {
		const today = new Date().getDay();
		if (today >= 1 && today <= 4) {
			console.log('월요일부터 목요일까지는 동작하지 않습니다.');
			return null;
		}

		const sundayEvent = await fetch('/api/v1/nexon/sundayMaple');

		return null;
	} catch (err) {}
};
