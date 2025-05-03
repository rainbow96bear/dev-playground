<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";

    export let sundayEvent;
    export let className:string;

    const BASE_IMAGE_WIDTH = 876;
    let imgSrc: string | null = null;
    let imgElement: HTMLImageElement | null = null;

    const areas = writable<{ href: string; coords: string; responsiveCoords: string }[]>([]);

    const defaultImage = 'https://example.com/default-image.jpg';
    const defaultAlt = '썬데이 메이플 이벤트 이미지';
    const defaultDescription = '현재 진행 중인 썬데이 메이플 이벤트를 확인하세요. 이벤트 기간 및 혜택 정보를 제공합니다.';

    const processData = () => {
        if (sundayEvent?.contents) {
            const imgSrcMatch = sundayEvent.contents.match(/<img[^>]+src="([^"]+)"/);
            imgSrc = imgSrcMatch ? imgSrcMatch[1] : defaultImage;

            const parser = new DOMParser();
            const doc = parser.parseFromString(sundayEvent.contents, "text/html");

            const areaElements = doc.querySelectorAll('area');

            const newAreas = Array.from(areaElements).map(areaElement => ({
                href: areaElement.getAttribute('href') || '',
                coords: areaElement.getAttribute('coords') || '',
                responsiveCoords: areaElement.getAttribute('coords') || '',
            }));

            areas.set(newAreas);
        } else {
            imgSrc = defaultImage;
            areas.set([]);
        }
    };

    const getResponsiveCoords = (coords: string, imgWidth: number): string => {
        const coordsArray = coords.split(',').map(Number);
        const newCoords = coordsArray.map(coord => Math.round(coord * (imgWidth / BASE_IMAGE_WIDTH)));
        return newCoords.join(',');
    };

    const updateResponsiveCoords = () => {
        if (imgElement) {
            const imgWidth = imgElement.offsetWidth;
            areas.update(currentAreas => 
                currentAreas.map(area => ({
                    ...area,
                    responsiveCoords: getResponsiveCoords(area.coords, imgWidth),
                }))
            );
        }
    };

    const handleResize = () => {
        updateResponsiveCoords();
    };

    onMount(() => {
        processData();

        if (imgElement) {
            imgElement.onload = updateResponsiveCoords;
        }

        window.addEventListener('resize', handleResize);

        onDestroy(() => {
            window.removeEventListener('resize', handleResize);
        });
    });
</script>

<svelte:head>
    <title>썬데이 메이플 이벤트</title>
    <meta name="description" content={sundayEvent?.description || defaultDescription} />
    <meta property="og:title" content="썬데이 메이플 이벤트" />
    <meta property="og:description" content={sundayEvent?.description || defaultDescription} />
    <meta property="og:image" content={imgSrc} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="썬데이 메이플 이벤트" />
    <meta name="twitter:description" content={sundayEvent?.description || defaultDescription} />
    <meta name="twitter:image" content={imgSrc} />
</svelte:head>

<div class="{className}">
    <img
        id="sunday_img"
        bind:this={imgElement}
        src={imgSrc}
        alt={defaultAlt}
        usemap="#map"
        decoding="async"
        on:load={updateResponsiveCoords}
        on:error={() => console.error("이미지 로드 실패")}
    />

    <map name="map">
        {#each $areas as area, index (index)}
            <area
                target="_blank"
                href={area.href}
                coords={area.responsiveCoords}
                shape="rect"
                alt="스페셜 썬데이 메이플 이벤트"
            />
        {/each}
    </map>
</div>

<style>
    #sunday_img {
        min-width: 360px;
        max-width: 100%;
    }
</style>
