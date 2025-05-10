import { isCacheValid, characterOcidCache, characterSymbolsCache } from '$lib/cache/cache.ts';
import { getEquippedSymbols, getCharaterOcid } from '$lib/nexonAPI/nexonApi';
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

		let characterSymbolsCached = characterSymbolsCache.get(characterOcidCached.data);

		if (!characterSymbolsCached || !isCacheValid(characterSymbolsCached.data)) {
			const resCharacterSymbols = await getEquippedSymbols(characterOcidCached.data);
			characterSymbolsCached = {
				data: resCharacterSymbols,
				timestamp: Date.now(),
				ttl: 24 * 60 * 60 * 1000
			};
			characterSymbolsCache.set(characterOcidCached.data, characterSymbolsCached);
		}

		return json({ data: characterSymbolsCached.data }, { status: 200 });
	} catch (err) {
		return json({ error: '캐릭터 심볼 정보 요청 실패' }, { status: 404 });
	}
};
