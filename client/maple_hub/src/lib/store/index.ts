import { writable } from 'svelte/store';
import { T_CharacterInfoObj, T_EquippedItems } from '$lib/types/index';

export const characterInfo = writable<T_CharacterInfoObj | null>(null);
export const characterWalkMotion = writable(2);
export const itemInfoForCube = writable<T_EquippedItems | null>(null);
