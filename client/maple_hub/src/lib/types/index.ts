export type T_CharacterInfoObj = {
	character_image: string;
	character_level: number;
	character_name: string;
	character_class: string;
	character_class_level: number;
	character_date_create: string;
	character_guild_name: string;
	world_name: string;
	access_flag: boolean;
	liberation_quest_clear_flag: boolean;
};

export type T_Event = {
	title: string;
	url: string;
	notice_id: number;
	date: string;
	date_event_start: string;
	date_event_end: string;
};

export type T_Event_Detail = {
	title: string;
	url: string;
	contents: string;
	date: string;
	date_event_start: string;
	date_event_end: string;
};

export type T_OcideObj = {
	ocid: string;
};
export type T_EquippedItems = {
	additional_potential_option_1: string;
	additional_potential_option_2: string;
	additional_potential_option_3: string | null;
	additional_potential_option_flag: 'true' | 'false';
	additional_potential_option_grade: string;
	cuttable_count: string;
	date_expire: string; // ISO 8601 형식의 날짜
	equipment_level_increase: number;
	golden_hammer_flag: string;
	growth_exp: number;
	growth_level: number;
	item_add_option: {
		str: string;
		dex: string;
		int: string;
		luk: string;
		max_hp: string;
		[key: string]: string;
	};
	item_base_option: {
		str: string;
		dex: string;
		int: string;
		luk: string;
		max_hp: string;
		[key: string]: string;
	};
	item_description: string | null;
	item_equipment_part: string;
	item_equipment_slot: string;
	item_etc_option: {
		str: string;
		dex: string;
		int: string;
		luk: string;
		max_hp: string;
		[key: string]: string;
	};
	item_exceptional_option: {
		str: string;
		dex: string;
		int: string;
		luk: string;
		max_hp: string;
		[key: string]: string;
	};
	item_gender: string | null;
	item_icon: string;
	item_name: string;
	item_shape_icon: string;
	item_shape_name: string;
	item_starforce_option: {
		str: string;
		dex: string;
		int: string;
		luk: string;
		max_hp: string;
		[key: string]: string;
	};
	item_total_option: {
		str: string;
		dex: string;
		int: string;
		luk: string;
		max_hp: string;
		[key: string]: string;
	};
	potential_option_1: string;
	potential_option_2: string;
	potential_option_3: string | null;
	potential_option_flag: 'true' | 'false';
	potential_option_grade: string;
	scroll_resilience_count: string;
	scroll_upgrade: string;
	scroll_upgradeable_count: string;
	soul_name: string | null;
	soul_option: string | null;
	special_ring_level: number;
	starforce: string;
	starforce_scroll_flag: '사용' | '미사용';
};

export type T_Potential_Level = {
	[key: string]: string;
};

export interface T_Symbol {
	symbol_name: string;
	symbol_icon: string;
	symbol_description: string;
	symbol_force: string;
	symbol_level: number;
	symbol_str: string;
	symbol_dex: string;
	symbol_int: string;
	symbol_luk: string;
	symbol_hp: string;
	symbol_drop_rate: string;
	symbol_meso_rate: string;
	symbol_exp_rate: string;
	symbol_growth_count: number;
	symbol_require_growth_count: number;
}

type Rank = 'rare' | 'epic' | 'unique' | 'legendary';

export type Option = {
	name: string;
	weight: number;
};

type RankOptions = {
	firstOption: Option[];
	secondOption: Option[];
	thirdOption: Option[];
};

export type CubeOptionChance = {
	[cubeType: string]: {
		[equipmentType: string]: {
			[levelRange: string]: {
				[rank in Rank]: RankOptions;
			};
		};
	};
};

type CachedData<T> = {
	data: T;
	timestamp: number;
	ttl: number;
};

  type Difficulty = {
  price: number;
  maxPartySize: number;
  isWeekly: boolean;
  category: 'weekly' | 'daily';
};

type Boss = {
  id: string;
  name: string;
  image: string;
  difficulties: {
    [difficultyName: string]: Difficulty;
  };
};

    type SelectedStone = {
    bossId: string;
    difficulty: string;
    actualPartySize: number; // 실제 클리어 인원
    maxPartySize: number; // 최대 파티 인원
  };