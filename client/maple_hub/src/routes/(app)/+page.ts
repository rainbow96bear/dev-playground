import { error } from '@sveltejs/kit';
import { getEventList, getSundayEvent } from '$lib/nexonAPI/nexonApi';
import type { PageLoad } from './$types';
import { T_Event_Detail } from '$lib/types';

export const load: PageLoad = async () => {
	try {
		const resEventList = await getEventList();
		for (let i = 0; i < resEventList.event_notice.length; i++) {
			const event = resEventList.event_notice[i];
			if (event.title && event.title.includes('스페셜 썬데이 메이플')) {
				if (new Date(event.date_event_end) >= new Date()) {
					const resSundayEventObj: T_Event_Detail = await getSundayEvent(event.notice_id);
					return resSundayEventObj;
				}
				break;
			}
		}
		return null;
	} catch (err) {
		throw error(500, '썬데이 정보를 가져오는 데 실패했습니다.');
	}
};
