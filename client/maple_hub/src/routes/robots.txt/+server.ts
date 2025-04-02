export const GET = async () => {
	return new Response(
		`User-agent: *
Allow: /
Sitemap: https://maplebox.netlify.app/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
};
