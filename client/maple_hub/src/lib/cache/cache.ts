const cacheMap: Map<string, any> = new Map();
const cacheTimerMap: Map<string, NodeJS.Timeout> = new Map();

// 캐시 설정 함수
export function setCache(key: string, value: any, time: number): void {
	cacheMap.set(key, value);
	setCacheTimer(key, time);
}

// 캐시 조회 함수
export function getCache(key: string): any | undefined {
	return cacheMap.get(key);
}

// 캐시 삭제 함수
export function deleteCache(key: string): void {
	cacheMap.delete(key);
	if (cacheTimerMap.has(key)) {
		clearTimeout(cacheTimerMap.get(key)!);
		cacheTimerMap.delete(key);
	}
}

export function updateCache(key: string, value: any, time: number): void {
	if (cacheMap.has(key)) {
		cacheMap.set(key, value);
		setCacheTimer(key, time);
	} else {
		console.log(`No existing value found for key: ${key}. Adding new entry.`);
		cacheMap.set(key, value);
		setCacheTimer(key, time);
	}
}

function setCacheTimer(key: string, time: number) {
	if (cacheTimerMap.has(key)) {
		clearTimeout(cacheTimerMap.get(key)!);
	}

	const timer = setTimeout(() => {
		cacheMap.delete(key);
		cacheTimerMap.delete(key);
		console.log(`Cache expired and deleted for key: ${key}`);
	}, time);
	cacheTimerMap.set(key, timer);
}
