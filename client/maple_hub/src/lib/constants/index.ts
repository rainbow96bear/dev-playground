import { T_Potential_Level } from '$lib/types';
export const Days = 24 * 60 * 60 * 1000;
export const Minuts = 60 * 1000;

export const PotentialOptionToEng: T_Potential_Level = {
	'레어': 'rare',
	'에픽': 'epic',
	'유니크': 'unique',
	'레전드리': 'legendary'
};

export const EquipmentTypeMap: Record<string, string> = {
	'무기': 'weapon',
	'엠블렘': 'emblem',
	'모자': 'head',
	'상의': 'top',
	'한벌옷': 'suit',
	'하의': 'bottom',
	'신발': 'shoes',
	'장갑': 'gloves',
	'망토': 'cloak',
	'벨트': 'belt',
	'어깨장식': 'shoulder',
	'얼굴장식': 'face',
	'눈장식': 'eyes',
	'귀고리': 'ears',
	'반지1': 'ring',
	'반지2': 'ring',
	'반지3': 'ring',
	'반지4': 'ring',
	'펜던트': 'pendant',
	'펜던트2': 'pendant',
	'기계 심장': 'heart',
	'훈장': 'medal',
	'포켓 아이템': 'pocket',
	'뱃지': 'badge',
	'포스실드': 'forceOrSoul',
	'소울링': 'forceOrSoul',
	'방패': 'shield',
	'보조무기': 'subweapon'
};

export const ReverseEquipmentTypeMap: Record<string, string> = {
	'weapon': '무기',
	'emblem': '엠블렘',
	'head': '모자',
	'top': '상의',
	'suit': '한벌옷',
	'bottom': '하의',
	'shoes': '신발',
	'gloves': '장갑',
	'cloak': '망토',
	'belt': '벨트',
	'shoulder': '어깨장식',
	'face': '얼굴장식',
	'eyes': '눈장식',
	'ears': '귀고리',
	'ring': '반지',
	'pendant': '펜던트',
	'heart': '기계 심장',
	'medal': '훈장',
	'pocket': '포켓 아이템',
	'badge': '뱃지',
	'forceOrSoul': '포스실드, 소울링',
	'shield': '방패',
	'subweapon': '보조무기'
};

export const ArcaneSymbolIconList = [
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDJHOA',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDJHOD',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDJHOC',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDJHOF',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDJHOE',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDJHOH'
];

export const AuthenticSymbolIconList = [
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDIHOB',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDIHOA',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDIHOD',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDIHOC',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDIHOF',
	'https://open.api.nexon.com/static/maplestory/item/icon/KEIDIHOE'
];
