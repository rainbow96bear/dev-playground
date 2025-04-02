export const GET = async () => {
	return new Response(
		`User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
};
