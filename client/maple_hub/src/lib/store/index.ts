// src/lib/store.ts
import { writable } from 'svelte/store';

// characterInfo를 저장할 store
export const character_info = writable<any>(null);

// characterImg를 저장할 store
export const charater_img = writable<string>('');
