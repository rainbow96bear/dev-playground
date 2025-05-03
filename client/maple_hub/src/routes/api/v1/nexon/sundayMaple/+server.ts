import { getSundayEvent, getMapleEventList } from '$lib/nexonAPI/nexonApi';
import { isCacheValid, sundayMapleCache } from '$lib/cache/cache.ts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	try {
		let sundayMapleCached = sundayMapleCache.get('sundayMaple');

		if (!sundayMapleCached || !isCacheValid(sundayMapleCached)) {
			const resEventList = await getMapleEventList();

			for (const event of resEventList.event_notice) {
				if (
					event.title?.includes('썬데이 메이플') &&
					new Date(event.date_event_end) >= new Date()
				) {
					const resSundayMaple = await getSundayEvent(event.notice_id);
					sundayMapleCached = {
						data: resSundayMaple,
						timeStamp: Date.now(),
						ttl: 24 * 60 * 60 * 1000
					};
					sundayMapleCache.set('sundayMaple', sundayMapleCached);
					break;
				}
			}
		}
		return json({ data: sundayMapleCached.data }, { status: 200 });
	} catch (err) {
		return json({ error: '썬데이 메이플 이벤트 정보 요청 실패패' }, { status: 404 });
	}
};
// let sundayMapleCache = locals.sundayEventCache.get('sundayMaple');
// if (isCacheValid(sundayMapleCache)) {
// 	console.log('썬데이 캐시에서 가져옴');
// 	return json(sundayMapleCache.data, { status: 200 });
// }

// const resEventList = await getMapleEventList();
// let resSundayEventObj = null;

// for (const event of resEventList.event_notice) {
// 	if (event.title?.includes('썬데이 메이플') && new Date(event.date_event_end) >= new Date()) {
// 		resSundayEventObj = await getSundayEvent(event.notice_id);
// 		break;
// 	}
// }

// if (resSundayEventObj) {
// 	// 캐시에 저장 (ttl 포함)
// 	locals.sundayEventCache?.set('sundayMaple', {
// 		data: resSundayEventObj,
// 		timestamp: Date.now(),
// 		ttl: 24 * 60 * 60 * 1000
// 	});
// 	return json({data : resSundayEventObj}, { status: 200 });
// } else {
// 	return json({ status: 404 });
// }
