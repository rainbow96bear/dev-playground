import { error } from '@sveltejs/kit';
import { getCharaterOcid, getChareterInfo } from '$lib/nexonAPI/nexonApi';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const characterName = url.searchParams.get('name');
	if (!characterName) {
		throw error(400, '캐릭터 이름이 제공되지 않았습니다.');
	}

	try {
		const resOcidObj = await getCharaterOcid(characterName);
		if (!resOcidObj) {
			throw error(404, '캐릭터 정보를 찾을 수 없습니다.');
		}

		const ocid = resOcidObj.ocid;
		const resCharacterInfoObj = await getChareterInfo(ocid);

		return resCharacterInfoObj;
	} catch (err) {
		throw error(500, '캐릭터 정보를 가져오는 데 실패했습니다.');
	}
};
