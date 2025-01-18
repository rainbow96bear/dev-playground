import axios from 'axios';

const api_url = 'https://open.api.nexon.com';

const nexonAPI = axios.create({
	baseURL: api_url,
	headers: {
		Accept: 'application/json',
		'x-nxopen-api-key': process.env.VITE_NEXON_API_KEY
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
