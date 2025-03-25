import { goto } from '$app/navigation';
import { getCache, setCache } from '$lib/cache/cache';
import { getCharaterOcid, getEquippedItems } from '$lib/nexonAPI/nexonApi';
import { PageServerLoad } from './$types';
import { equippedItems_key } from '$lib/constants/cache';
import { Days, Minuts } from '$lib/constants';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const characterName = url.searchParams.get('name');
	if (characterName) {
		try {
			let ocid = getCache(characterName);
			if (ocid == undefined) {
				const resOcidObj = await getCharaterOcid(characterName);
				if (resOcidObj == undefined) {
					throw error(404, '캐릭터 정보를 찾을 수 없습니다.');
				}
				setCache(characterName, resOcidObj.ocid, Days);
				ocid = resOcidObj.ocid;
			}
			let equippedItems = getCache(ocid + equippedItems_key);
			if (equippedItems == undefined) {
				const resEquippedItemsObj = await getEquippedItems(ocid);
				setCache(ocid + equippedItems_key, resEquippedItemsObj, 15 * Minuts);
				equippedItems = resEquippedItemsObj;
				return equippedItems;
			}
			return equippedItems;
		} catch (err) {
			throw error(500, '캐릭터 정보를 가져오는 데 실패했습니다.');
		}
	}
};
