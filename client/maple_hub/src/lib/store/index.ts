import { writable } from 'svelte/store';
import { T_CharacterInfo } from '$lib/types/index';

export const characterInfo = writable<T_CharacterInfo | null>(null);
export const characterWalkMotion = writable(2);
