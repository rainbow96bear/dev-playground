export type T_CharacterInfo = {
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
