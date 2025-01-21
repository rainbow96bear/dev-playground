export const GET = async () => {
    return new Response(`User-agent: *
Disallow: /private-page
Sitemap: https://example.com/sitemap.xml`, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
};
