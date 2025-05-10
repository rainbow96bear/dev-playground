import type { PageServerLoad } from './$types';
import { InternalAPI } from '$lib/api';

export const load: PageServerLoad = async ({ url }) => {
	const characterName = url.searchParams.get('name');
	if (characterName == null) {
		return null;
	}
	const resCharacterInfo = await InternalAPI(`/v1/nexon/characterInfo/${characterName}`);
	const resCharacterEquipments = await InternalAPI(
		`/v1/nexon/characterInfo/${characterName}/equipmentsInfo`
	);
	const resAndroidInfo = await InternalAPI(`/v1/nexon/characterInfo/${characterName}/androidInfo`);
	return {
		characterInfo: resCharacterInfo.data,
		characterEquipments: resCharacterEquipments.data,
		androidInfo: resAndroidInfo.data
	};
};
