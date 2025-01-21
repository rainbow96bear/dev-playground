import axios from 'axios';

const api_url = 'https://open.api.nexon.com';

const nexonAPI = axios.create({
	baseURL: api_url,
	headers: {
		Accept: 'application/json',
		'x-nxopen-api-key': import.meta.env.VITE_NEXON_API_KEY
	}
});

export const getCharaterOcid = async (characterName: string) => {
	try {
		const ocid = (
			await nexonAPI('/maplestory/v1/id', {
				params: {
					character_name: characterName
				}
			})
		).data;
		return ocid;
	} catch (error) {
		console.log('오류', error);
	}
};

export const getChareterInfo = async (ocid: string) => {
	try {
		const charaterInfo = (
			await nexonAPI('/maplestory/v1/character/basic', {
				params: {
					ocid: ocid
				}
			})
		).data;
		return charaterInfo;
	} catch {
		alert('캐릭터 정보를 불러오는데 실패 했습니다.\n아이디를 확인해주세요.');
	}
};

export const getEventList = async () => {
	try {
		const eventList = (await nexonAPI('/maplestory/v1/notice-event')).data;
		return eventList;
	} catch {
		alert('이벤트 리스트를 불러오는데 실패 했습니다.');
	}
};

export const getSundayEvent = async (notice_id: number) => {
	try {
		const sundayEvent = (
			await nexonAPI('/maplestory/v1/notice-event/detail', {
				params: {
					notice_id: notice_id
				}
			})
		).data;
		return sundayEvent;
	} catch {
		alert('썬데이 정보를 불러오는데 실패 했습니다.');
	}
};

export const getEquippedItems = async (ocid: string) => {
	try {
		const equippedItems = (
			await nexonAPI('/maplestory/v1/character/item-equipment', {
				params: {
					ocid: ocid
				}
			})
		).data;
		return equippedItems;
	} catch (error) {
		console.log('착용중인 아이템 정보를 불러오지 못했습니다.\n[ERROR]:', error);
	}
};

export const getEquippedSymbols = async (ocid: string) => {
	try {
		const equippedSymbols = (
			await nexonAPI('/maplestory/v1/character/symbol-equipment', {
				params: {
					ocid: ocid
				}
			})
		).data;
		return equippedSymbols;
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
