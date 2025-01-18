import { writable } from 'svelte/store';
import { CharacterInfo } from '$lib/types';

export const characterInfo = writable<CharacterInfo | null>(null);
