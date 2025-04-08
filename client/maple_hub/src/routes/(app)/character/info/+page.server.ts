import { error } from '@sveltejs/kit';
import { getCharaterOcid, getChareterInfo } from '$lib/nexonAPI/nexonApi';
import type { PageServerLoad } from './$types';
import { getCache, setCache } from '$lib/cache/cache';
import { Days, Minuts } from '$lib/constants';
import { T_CharacterInfoObj } from '$lib/types';
import { DEFAULT_CHARACTER } from '$lib/constants';

export const load: PageServerLoad = async ({ url }) => {
	const characterName = url.searchParams.get('name') || DEFAULT_CHARACTER;
	let ocid = getCache(characterName);
	if (ocid === undefined) {
		const resOcidObj = await getCharaterOcid(characterName);
		if (resOcidObj == undefined) {
			throw error(404, '캐릭터 정보를 찾을 수 없습니다.');
		}
		setCache(characterName, resOcidObj.ocid, Days);
		ocid = resOcidObj.ocid;
	}

	let characterInfoObj: T_CharacterInfoObj = getCache(ocid + '-info');
	if (characterInfoObj === undefined) {
		const resCharacterInfoObj = await getChareterInfo(ocid);
		if (resCharacterInfoObj == undefined) {
			throw error(404, '캐릭터 정보를 찾을 수 없습니다.');
		}
		setCache(ocid + '-info', resCharacterInfoObj, 15 * Minuts);
		characterInfoObj = resCharacterInfoObj;
	}

	return characterInfoObj;
};
