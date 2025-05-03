import type { PageServerLoad } from './$types';
import { InternalAPI } from '$lib/api';
import { DEFAULT_CHARACTER } from '$lib/constants';

export const load: PageServerLoad = async ({ url }) => {
	const characterName = url.searchParams.get('name') ?? DEFAULT_CHARACTER;
	const resCharacterInfo = await InternalAPI(`/v1/nexon/characterInfo?name=${characterName}`);
	const resCharacterEquipments = await InternalAPI(
		`/v1/nexon/characterInfo/equipmentsInfo?name=${characterName}`
	);
	const characterSymbols = await InternalAPI(
		`/v1/nexon/characterInfo/symbolsInfo?name=${characterName}`
	);
	return {
		characterInfo: resCharacterInfo.data,
		characterEquipments: resCharacterEquipments.data,
		characterSymbols: characterSymbols.data
	};
};
