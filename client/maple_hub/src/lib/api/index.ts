import { json } from '@sveltejs/kit';

const rootURL = import.meta.env.VITE_ROOT_URL;
const apiVersion = 'api';

export const InternalAPI = async (path, fetchFn = fetch) => {
	const res = await fetchFn(`${rootURL}/${apiVersion}${path}`);

	const data = await res.json();
	return data;
};
