import { getCache, setCache } from '$lib/cache/cache';
import { minute } from '$lib/constants';
import { getEquippedItems } from '$lib/nexonAPI/nexonApi';
import { json } from '@sveltejs/kit';

const equippedItems_key = '-equippedItems';
export async function GET({ url }: { url: URL }) {
	const name = url.searchParams.get('name'); // URL에서 ocid 파라미터를 가져옵니다

	if (!name) {
		return json({ error: 'name is required' }, { status: 400 });
	}

	try {
		const ocid = getCache(name);
		const equippedItems = getCache(ocid + equippedItems_key);
		if (equippedItems == undefined) {
			const resEquippedItemsObj = await getEquippedItems(ocid);
			setCache(ocid + equippedItems_key, resEquippedItemsObj, 15 * minute);
			return json(resEquippedItemsObj);
		}
		return json(equippedItems); // 응답을 클라이언트에 전달
	} catch (error) {
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
}
