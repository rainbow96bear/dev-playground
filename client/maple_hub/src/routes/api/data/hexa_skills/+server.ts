import { getCache, setCache } from '$lib/cache/cache';
import { Minuts } from '$lib/constants';
import { getHexaMatrix } from '$lib/nexonAPI/nexonApi';
import { json } from '@sveltejs/kit';

const hexaSkills_key = '-hexaSkills';
export async function GET({ url }: { url: URL }) {
	const name = url.searchParams.get('name');

	if (!name) {
		return json({ error: 'name is required' }, { status: 400 });
	}

	try {
		const ocid = getCache(name);
		const hexaSkills = getCache(ocid + hexaSkills_key);
		if (hexaSkills == undefined) {
			const resHexaSkillsObj = await getHexaMatrix(ocid);
			setCache(ocid + hexaSkills_key, resHexaSkillsObj, 15 * Minuts);
			return json(resHexaSkillsObj);
		}
		return json(hexaSkills); // 응답을 클라이언트에 전달
	} catch (error) {
		return json({ error: 'Failed to fetch data' }, { status: 500 });
	}
}
