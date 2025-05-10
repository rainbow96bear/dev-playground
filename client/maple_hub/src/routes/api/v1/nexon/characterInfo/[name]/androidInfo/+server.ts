import { isCacheValid, characterOcidCache, androidInfoCache } from '$lib/cache/cache.ts';
import { getAndroidInfo, getCharaterOcid } from '$lib/nexonAPI/nexonApi';
import { DEFAULT_CHARACTER } from '$lib/constants';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	try {
		const characterName = params.name ?? DEFAULT_CHARACTER;
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

		let androidInfoCached = androidInfoCache.get(characterOcidCached.data);

		if (!androidInfoCached || !isCacheValid(characterOcidCached.data)) {
			const resCharacterEquipments = await getAndroidInfo(characterOcidCached.data);
			androidInfoCached = {
				data: resCharacterEquipments,
				timestamp: Date.now(),
				ttl: 24 * 60 * 60 * 1000
			};
			androidInfoCache.set(characterOcidCached.data, androidInfoCached);
		}

		return json({ data: androidInfoCached.data }, { status: 200 });
	} catch (err) {
		return json({ error: '캐릭터 장비 정보 요청 실패' }, { status: 404 });
	}
};
