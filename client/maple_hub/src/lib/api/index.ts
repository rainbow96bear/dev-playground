const rootURL = import.meta.env.VITE_ROOT_URL;
const apiVersion = 'api';

export const InternalAPI = async (path, fetchFn = fetch) => {
	const res = await fetchFn(`${rootURL}/${apiVersion}${path}`);
	return await res.json();
};
