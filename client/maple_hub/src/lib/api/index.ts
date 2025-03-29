const rootURL = import.meta.env.VITE_ROOT_URL;
const apiVersion = 'api';

export const InternalAPI = async (route) => {
	const res = await fetch(`${rootURL}/${apiVersion}${route}`);
	return await res.json();
};
