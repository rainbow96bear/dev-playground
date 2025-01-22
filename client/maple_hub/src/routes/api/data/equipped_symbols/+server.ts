import { getCache, setCache } from '$lib/cache/cache';
import { Minuts } from '$lib/constants';
import { getEquippedSymbols } from '$lib/nexonAPI/nexonApi';
import { json } from '@sveltejs/kit';

const equippedSymbols_key = '-equippedSymbols';
export async function GET({ url }: { url: URL }) {
    const name = url.searchParams.get('name');

    if (!name) {
        return json({ error: 'name is required' }, { status: 400 });
    }

    try {
        const ocid = getCache(name);
        const equippedSymbolsObj = getCache(ocid + equippedSymbols_key);
        if (equippedSymbolsObj == undefined) {
            const resEquippedSymbolsObj = await getEquippedSymbols(ocid);
            setCache(ocid + equippedSymbols_key, resEquippedSymbolsObj, 15 * Minuts);
            return json(resEquippedSymbolsObj);
        }
        return json(equippedSymbolsObj); // 응답을 클라이언트에 전달
    } catch (error) {
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
