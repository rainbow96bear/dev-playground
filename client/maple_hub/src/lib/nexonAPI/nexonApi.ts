import { T_CharacterInfoObj, T_OcideObj } from '$lib/types';
import axios from 'axios';

const api_url = 'https://open.api.nexon.com';

const nexonAPI = axios.create({
	baseURL: api_url,
	headers: {
		Accept: 'application/json',
		'x-nxopen-api-key': import.meta.env.VITE_NEXON_API_KEY
	}
});
export const getCharaterOcid: (characterName: string) => Promise<T_OcideObj> = async (
	characterName: string
) => {
	try {
		const response = await nexonAPI('/maplestory/v1/id', {
			params: {
				character_name: characterName
			}
		});

		if (response.status === 200) {
			const ocidObj = response.data;
			return ocidObj;
		}
		console.log(`응답 코드가 200이 아닙니다: ${response.status}`);
		return undefined;
	} catch (error) {
		console.log('오류 발생:', error);
		return undefined;
	}
};

export const getChareterInfo: (ocid: string) => Promise<T_CharacterInfoObj> = async (
	ocid: string
) => {
	try {
		const response = await nexonAPI('/maplestory/v1/character/basic', {
			params: {
				ocid: ocid
			}
		});
		if (response.status === 200) {
			const characterInfoObj = response.data;
			return characterInfoObj;
		}
		return undefined;
	} catch {
		console.log('캐릭터 정보를 불러오는데 실패 했습니다.\n아이디를 확인해주세요.');
		return undefined;
	}
};

export const getMapleEventList = async () => {
	try {
		const response = await nexonAPI('/maplestory/v1/notice-event');
		if (response.status === 200) {
			const eventListObj = response.data;
			return eventListObj;
		}
		return undefined;
	} catch {
		alert('이벤트 리스트를 불러오는데 실패 했습니다.');
	}
};

export const getSundayEvent = async (notice_id: number) => {
	try {
		const response = await nexonAPI('/maplestory/v1/notice-event/detail', {
			params: {
				notice_id: notice_id
			}
		});
		console.log('응답 결과', response);
		if (response.status === 200) {
			const sundayEventObj = response.data;
			return sundayEventObj;
		}
		return undefined;
	} catch {
		alert('썬데이 정보를 불러오는데 실패 했습니다.');
	}
};

export const getEquippedItems = async (ocid: string) => {
	try {
		const response = await nexonAPI('/maplestory/v1/character/item-equipment', {
			params: {
				ocid: ocid
			}
		});
		if (response.status === 200) {
			const equippedItemsObj = response.data;
			return equippedItemsObj;
		}
		return undefined;
	} catch (error) {
		console.log('착용중인 아이템 정보를 불러오지 못했습니다.\n[ERROR]:', error);
	}
};

export const getEquippedSymbols = async (ocid: string) => {
	try {
		const response = await nexonAPI('/maplestory/v1/character/symbol-equipment', {
			params: {
				ocid: ocid
			}
		});
		if (response.status === 200) {
			const symbolsObj = response.data;
			return symbolsObj;
		}
		return undefined;
	} catch (error) {
		console.log('착용중인 심볼 정보를 불러오지 못했습니다.\n[ERROR] : ', error);
	}
};

export const getHexaMatrix = async (ocid: string) => {
	try {
		const equippedSymbols = (
			await nexonAPI('/maplestory/v1/character/hexamatrix', {
				params: {
					ocid: ocid
				}
			})
		).data;
		return equippedSymbols;
	} catch (error) {
		console.log('헥사 매트릭스 정보를 불러오지 못했습니다.\n[ERROR] : ', error);
	}
};
