export const getPages = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 날짜를 가져옴

    return [
        { url: '/', lastmod: currentDate, priority: '1.0' },
        { url: '/about', lastmod: currentDate, priority: '0.8' },
        { url: '/contact', lastmod: currentDate, priority: '0.6' },
    ];
};