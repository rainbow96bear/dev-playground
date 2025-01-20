// +page.server.ts
import { Actions, error } from '@sveltejs/kit';
import { getEventList, getSundayEvent } from '$lib/nexonAPI/nexonApi';
import type { PageServerLoad } from './$types';
import type { T_Event_Detail } from '$lib/types';

let cache: T_Event_Detail | null = null;
let cacheExpiry = 0;
const day = 24 * 60 * 60 * 1000;

export const load: PageServerLoad = async ({}) => {
	const result = await reqSundayEvent();
	return result;
};

export const actions: Actions = {
	default: async ({}) => {
		cache = null;
		cacheExpiry = 0;
		reqSundayEvent();
		return { success: true };
	}
};

const reqSundayEvent = async () => {
	cache = {
		title: 'test',
		url: 'test',
		contents: 'test',
		date: 'test',
		date_event_start: 'test',
		date_event_end: 'test'
	};
	try {
		const now = Date.now();
		const today = new Date().getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

		if (today >= 1 && today <= 4) {
			console.log('월요일부터 목요일까지는 동작하지 않습니다.');
			return null;
		}

		if (cache && cacheExpiry > now) {
			console.log('캐시된 데이터 사용');
			return cache; // 캐시된 데이터를 반환
		}

		const resEventList = await getEventList();
		for (let i = 0; i < resEventList.event_notice.length; i++) {
			const event = resEventList.event_notice[i];
			if (event.title && event.title.includes('스페셜 썬데이 메이플')) {
				if (new Date(event.date_event_end) >= new Date()) {
					const resSundayEventObj: T_Event_Detail = await getSundayEvent(event.notice_id);

					cache = resSundayEventObj;
					cacheExpiry = now + day; // 1일
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
