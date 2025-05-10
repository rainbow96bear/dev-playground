import { getChareterInfo, getCharaterOcid } from '$lib/nexonAPI/nexonApi';
import { isCacheValid, characterOcidCache, characterInfoCache } from '$lib/cache/cache.ts';
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

		let characterInfoCached = characterInfoCache.get(characterOcidCached.data);

		if (!characterInfoCached || !characterInfoCached.data || !isCacheValid(characterInfoCached)) {
			const resCharacterInfo = await getChareterInfo(characterOcidCached.data);
			characterInfoCached = {
				data: resCharacterInfo,
				timestamp: Date.now(),
				ttl: 24 * 60 * 60 * 1000
			};
			characterInfoCache.set(characterOcidCached.data, characterInfoCached);
		}
		return json({ data: characterInfoCached.data }, { status: 200 });
	} catch (err) {
		return json({ error: '캐릭터 정보 요청 실패' }, { status: 404 });
	}
};
