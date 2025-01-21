import { error } from '@sveltejs/kit';
import { getCharaterOcid, getChareterInfo } from '$lib/nexonAPI/nexonApi';
import type { PageServerLoad } from './$types';
import { getCache, setCache } from '$lib/cache/cache';
import { day, minute } from '$lib/constants';
import { T_CharacterInfoObj } from '$lib/types';

export const load: PageServerLoad = async ({ url }) => {
	const characterName = url.searchParams.get('name');
	if (!characterName) {
		throw error(400, '캐릭터 이름이 제공되지 않았습니다.');
	}

	try {
		let ocid = getCache(characterName);
		if (ocid == undefined) {
			const resOcidObj = await getCharaterOcid(characterName);
			if (resOcidObj == undefined) {
				throw error(404, '캐릭터 정보를 찾을 수 없습니다.');
			}
			setCache(characterName, resOcidObj.ocid, day);
			ocid = resOcidObj.ocid;
		}
		let characterInfoObj: T_CharacterInfoObj = getCache(ocid + '-info');
		if (characterInfoObj == undefined) {
			const resCharacterInfoObj = await getChareterInfo(ocid);
			if (resCharacterInfoObj == undefined) {
				throw error(404, '캐릭터 정보를 찾을 수 없습니다.');
			}
			setCache(ocid + '-info', resCharacterInfoObj, 15 * minute);
			characterInfoObj = resCharacterInfoObj;
		}

		return characterInfoObj;
	} catch (err) {
		throw error(500, '캐릭터 정보를 가져오는 데 실패했습니다.');
	}
};
