// +page.server.ts
import { Actions, error } from '@sveltejs/kit';
import { getEventList, getSundayEvent } from '$lib/nexonAPI/nexonApi';
import type { PageServerLoad } from './$types';
import type { T_Event_Detail } from '$lib/types';
import { deleteCache, getCache, setCache } from '$lib/cache/cache';
import { Days } from '$lib/constants';

const sunday_event_key = 'sunday_event';

export const load: PageServerLoad = async ({}) => {
	const sundayEvent = await reqSundayEvent();
	return { sundayEvent };
};
export const actions: Actions = {
	default: async ({}) => {
		deleteCache(sunday_event_key);
		reqSundayEvent();
		return { success: true };
	}
};

const reqSundayEvent = async () => {
	try {
		const sunday_event = getCache(sunday_event_key);
		const today = new Date().getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
		if (today >= 1 && today <= 4) {
			console.log('월요일부터 목요일까지는 동작하지 않습니다.');
			return null;
		}
		if (sunday_event) {
			console.log('캐시된 데이터 사용');
			return sunday_event;
		}

		const resEventList = await getEventList();
		for (let i = 0; i < resEventList.event_notice.length; i++) {
			const event = resEventList.event_notice[i];
			if (event.title && event.title.includes('썬데이 메이플')) {
				if (new Date(event.date_event_end) >= new Date()) {
					const resSundayEventObj: T_Event_Detail = await getSundayEvent(event.notice_id);
					console.log('resSundayEventObj : ', resSundayEventObj);
					setCache(sunday_event_key, resSundayEventObj, Days);
					return resSundayEventObj; // 데이터 반환
				}
				break;
			}
		}

		return null; // 데이터 없을 때 반환
	} catch (err) {
		throw error(500, '썬데이 정보를 가져오는 데 실패했습니다.');
	}
};
