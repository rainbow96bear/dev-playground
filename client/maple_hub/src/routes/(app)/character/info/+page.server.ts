import type { PageServerLoad } from './$types';
import { InternalAPI } from '$lib/api';
import { DEFAULT_CHARACTER } from '$lib/constants';

export const load: PageServerLoad = async () => {
	const characterName = DEFAULT_CHARACTER;

	const resCharacterInfo = await InternalAPI(`/v1/nexon/characterInfo/${characterName}`);
	const resCharacterEquipments = await InternalAPI(
		`/v1/nexon/characterInfo/${characterName}/equipmentsInfo`
	);
	const characterSymbols = await InternalAPI(
		`/v1/nexon/characterInfo/${characterName}/symbolsInfo`
	);
	return {
		characterInfo: resCharacterInfo.data,
		characterEquipments: resCharacterEquipments.data,
		characterSymbols: characterSymbols.data
	};
};
