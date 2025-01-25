<script lang="ts">
    import { onMount } from "svelte";
    import "./+page.css";

    export let data: any;

    const title = "maple box";
    const description = "maple box의 메인 페이지\n썬데이 메이플 업로드 확인";

    let areas: any[] = [];
    let imgSrc: string | null = null;
    let imgWidth = 0;
    let isLoading = false;
    let isAbled = false;

    // 데이터 처리 함수
    const processData = () => {
        if (data != null && data.contents != null) {
            const imgSrcMatch = data?.contents.match(/<img[^>]+src="([^"]+)"/);
            imgSrc = imgSrcMatch ? imgSrcMatch[1] : null;
            
            const areaMatches = [...data.contents.matchAll(/<area[^>]+href="([^"]+)"[^>]+coords="([^"]+)"/g)];
            areas = areaMatches.map(match => ({
                href: match[1],        // href 속성 값
                coords: match[2],      // coords 속성 값
                responsiveCoords: match[2], // 기본 coords로 초기값 설정
            }));
        }
    };

    // 반응형 coords 계산 함수
    const getResponsiveCoords = (coords: string, imgWidth: number): string => {
        const coordsArray = coords.split(',').map(Number);
        const newCoords = coordsArray.map(coord => Math.round(coord * (imgWidth / 876)));
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
        const imgElement = document.querySelector('img') as HTMLImageElement;

        if (imgElement) {
            imgElement.onload = () => {
                imgWidth = imgElement.offsetWidth;
                updateResponsiveCoords();
            };

            // 이미지가 이미 로드된 경우 처리
            if (imgElement.complete) {
                imgWidth = imgElement.offsetWidth;
                updateResponsiveCoords();
            }
        }

        // 리사이즈 이벤트 핸들러 추가
        window.addEventListener('resize', () => {
            if (imgElement) {
                imgWidth = imgElement.offsetWidth;
                updateResponsiveCoords();
            }
        });

        // 이벤트 핸들러 정리
        return () => {
            window.removeEventListener('resize', updateResponsiveCoords);
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

    {#if imgSrc}
        <img id="sunday_img" src={imgSrc} alt="스페셜 썬데이 메이플" usemap="#map">
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
        <div class="explain">아직 썬데이 메이플 이벤트가 올라오지 않았습니다.</div>
    {/if}
</div>
