import { isCacheValid, characterOcidCache, characterEquipmentsCache } from '$lib/cache/cache.ts';
import { getEquippedItems, getCharaterOcid } from '$lib/nexonAPI/nexonApi';
import { DEFAULT_CHARACTER } from '$lib/constants';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	try {
		const characterName = url.searchParams.get('name') ?? DEFAULT_CHARACTER;
		let characterOcidCached = characterOcidCache.get(characterName);
		if (!characterOcidCached || !characterOcidCached.data || !isCacheValid(characterOcidCached)) {
			const resCharacterOcid = await getCharaterOcid(characterName);
			characterOcidCached = {
				data: resCharacterOcid.ocid,
				timestamp: Date.now(),
				ttl: 24 * 60 * 60 * 1000
			};
			characterOcidCache.set(characterName, characterOcidCached);
		}

		let characterEquipmentsCached = characterEquipmentsCache.get(characterOcidCached.data);

		if (!characterEquipmentsCached || !isCacheValid(characterOcidCached.data)) {
			const resCharacterEquipments = await getEquippedItems(characterOcidCached.data);
			characterEquipmentsCached = {
				data: resCharacterEquipments,
				timestamp: Date.now(),
				ttl: 24 * 60 * 60 * 1000
			};
			characterEquipmentsCache.set(characterOcidCached.data, characterEquipmentsCached);
		}

		return json({ data: characterEquipmentsCached.data }, { status: 200 });
	} catch (err) {
		return json({ error: '캐릭터 장비 정보 요청 실패' }, { status: 404 });
	}
};
