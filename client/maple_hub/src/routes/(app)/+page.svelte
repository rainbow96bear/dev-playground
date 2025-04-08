<script lang="ts">
    import { onMount } from "svelte";
    import "./+page.css";
    

    export let data: { sundayEvent: any };

    const BASE_IMAGE_WIDTH = 876;
    const title = "maple box";
    const description = "maple box의 메인 페이지 - 썬데이 메이플 업로드 확인";

    let areas: any[] = [];
    let imgSrc: string | null = null;
    let imgWidth = 0;
    let isLoading = false;
    let isAbled = false;
    let showImage = false;
    let imgElement: HTMLImageElement;

    // 데이터 처리 함수
    const processData = () => {
        if (data?.sundayEvent?.contents) {
            const imgSrcMatch = data.sundayEvent.contents.match(/<img[^>]+src="([^"]+)"/);
            imgSrc = imgSrcMatch ? imgSrcMatch[1] : null;

            const areaMatches = [...data.sundayEvent.contents.matchAll(/<area[^>]+href="([^"]+)"[^>]+coords="([^"]+)"/g)];
            areas = areaMatches.map(match => ({
                href: match[1],
                coords: match[2],
                responsiveCoords: match[2],
            }));
        }
    };

    // 반응형 coords 계산 함수
    const getResponsiveCoords = (coords: string, imgWidth: number): string => {
        const coordsArray = coords.split(',').map(Number);
        const newCoords = coordsArray.map(coord => Math.round(coord * (imgWidth / BASE_IMAGE_WIDTH)));
        return newCoords.join(',');
    };

    // coords 업데이트 함수
    const updateResponsiveCoords = () => {
        if (imgWidth > 0) {
            areas = areas.map(area => ({
                ...area,
                responsiveCoords: getResponsiveCoords(area.coords, imgWidth),
            }));
        }
    };

    onMount(() => {
        const handleResize = () => {
            if (imgElement) {
                imgWidth = imgElement.offsetWidth;
                updateResponsiveCoords();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    // 데이터 새로고침 함수
    const refreshData = async () => {
        isLoading = true;
        isAbled = true;
        await fetch('/', {
            method: 'POST',
            body: new URLSearchParams({ action: 'invalidateCache' }),
        });
        isLoading = false;
        setTimeout(() => {
            isAbled = false;
        }, 5000);
    };

    // 데이터 처리 실행
    processData();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta property="og:title" content="{title} 메인 페이지">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{import.meta.env.BASE_URL}">
  <meta property="twitter:title" content="{title} 메인 페이지">
  <meta property="twitter:description" content="{description}">
</svelte:head>

<div class="sunday_event">
    <div class="button_box">
        <div>선데이 메이플 새로 고침</div>
        <button
            on:click={refreshData}
            class="refresh-button"
            aria-label="데이터 새로고침"
            class:rotating={isLoading}
            disabled={isAbled}
        ></button>
    </div>

    {#if showImage}
        <img
            id="sunday_img"
            bind:this={imgElement}
            src={imgSrc}
            alt="썬데이 메이플"
            usemap="#map"
            decoding="async"
            on:load={() => {
                imgWidth = imgElement.offsetWidth;
                updateResponsiveCoords();
                showImage = true;
            }}
            on:error={() => {
                showImage = false;
            }}
        />

        <map name="map">
            {#each areas as area, index (index)}
                <area
                    target="_blank"
                    href={area.href}
                    coords={area.responsiveCoords}
                    shape="rect"
                    alt="스페셜 썬데이 메이플 이벤트"
                />
            {/each}
        </map>
    {:else}
        <div class="explain">
            아직 썬데이 메이플 이벤트가 올라오지 않았습니다.
        </div>
    {/if}

    {#if imgSrc}
        <!-- 실제 이미지를 미리 로딩해두고, 보이지 않게 숨김 -->
        <img
            src={imgSrc}
            alt="hidden loader"
            style="display: none"
            on:load={() => showImage = true}
            on:error={() => showImage = false}
        />
    {/if}
</div>
