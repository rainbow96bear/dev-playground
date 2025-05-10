import { CachedData } from '$lib/types';

export const eventListCache = new Map<string, CachedData<any>>();
export const sundayMapleCache = new Map<string, CachedData<any>>();

export const characterOcidCache = new Map<string, CachedData<string>>();
export const characterInfoCache = new Map<string, CachedData<any>>();
export const characterEquipmentsCache = new Map<string, CachedData<any>>();
export const characterSymbolsCache = new Map<string, CachedData<any>>();
export const androidInfoCache = new Map<string, CachedData<any>>();

export const isCacheValid = <T>(entry: CachedData<T> | undefined): entry is CachedData<T> => {
	return !!entry && Date.now() - entry.timestamp < entry.ttl;
};
