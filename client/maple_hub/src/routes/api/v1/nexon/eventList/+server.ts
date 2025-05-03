import { getMapleEventList } from '$lib/nexonAPI/nexonApi';
import { isCacheValid, eventListCache } from '$lib/cache/cache.ts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	try {
		let eventListCached = eventListCache.get('eventList');

		if (!eventListCached || !isCacheValid(eventListCached)) {
			const resEventList = await getMapleEventList();
			eventListCached = {
				data: resEventList,
				timeStamp: Date.now(),
				ttl: 24 * 60 * 60 * 1000
			};
			eventListCache.set('eventList', eventListCached);
		}
		return json({ data: eventListCached.data }, { status: 200 });
	} catch (err) {
		return json({ error: '썬데이 메이플 이벤트 정보 요청 실패패' }, { status: 404 });
	}
};
