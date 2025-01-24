import { writable } from 'svelte/store';
import { T_CharacterInfoObj } from '$lib/types/index';

export const characterInfo = writable<T_CharacterInfoObj | null>(null);
export const characterWalkMotion = writable(2);
