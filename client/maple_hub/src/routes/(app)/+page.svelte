<script lang="ts">
    import { onMount } from "svelte";
    import { invalidate } from '$app/navigation';
    import "./+page.css";

    export let data: any;
    let imgSrc: string | null = null;
    let areaHref: string | null = null;
    let areaCoords: string | null = null;
    let imgWidth = 0;
    let imgHeight = 0;
    let responsiveCoords: string | null = null;
    let isLoading = false;
    let isAbled = false;

    // 초기 데이터 처리
    const processData = () => {
        if (data != null && data.contents != null) {
            const imgSrcMatch = data?.contents.match(/<img[^>]+src="([^"]+)"/);
            const areaMatch = data?.contents.match(/<area[^>]+href="([^"]+)"[^>]+coords="([^"]+)"/);

            imgSrc = imgSrcMatch ? imgSrcMatch[1] : null;
            areaHref = areaMatch ? areaMatch[1] : null;
            areaCoords = areaMatch ? areaMatch[2] : null;

            // 비율에 맞는 coords 계산
            if (areaCoords && imgWidth) {
                responsiveCoords = getResponsiveCoords(areaCoords, imgWidth);
            }
        }
    };

    // 비율에 맞는 coords를 계산하는 함수
    const getResponsiveCoords = (coords: string, imgWidth: number): string => {
        const coordsArray = coords.split(',').map(Number);
        const newCoords = coordsArray.map((coord) =>
            Math.round(coord * (imgWidth / 876))
        );
        return newCoords.join(',');
    };

    // 페이지 로드 시 데이터 처리 및 크기 조정
    onMount(() => {
        const imgElement = document.querySelector('img') as HTMLImageElement;

        if (imgElement) {
            imgWidth = imgElement.offsetWidth;
            imgHeight = imgElement.offsetHeight;

            if (areaCoords) {
                responsiveCoords = getResponsiveCoords(areaCoords, imgWidth);
            }
        }

        window.addEventListener('resize', () => {
            if (imgElement) {
                imgWidth = imgElement.offsetWidth;
                imgHeight = imgElement.offsetHeight;

                if (areaCoords) {
                    responsiveCoords = getResponsiveCoords(areaCoords, imgWidth);
                }
            }
        });
    });

    const refreshData = async () => {
        isLoading = true
        isAbled = true
        const response = await fetch('/', {
          method: 'POST',
          body: new URLSearchParams({ action: 'invalidateCache' })
        });
        isLoading = false;
        setTimeout(() => {
            isAbled = false
        }, 5000);
    };

  
    processData();
</script>

<div class="sunday_event">
    <div class="button_box">
        <div>선데이 메이플 새로 고침</div>
        <button on:click={refreshData} class="refresh-button" aria-label="데이터 새로고침" class:rotating={isLoading} disabled={isAbled}></button>
    </div>
    

    {#if data}
        {#if imgSrc}
            <img src={imgSrc} alt="스페셜 썬데이 메이플" usemap="#map">
        {/if}
        
        {#if areaHref && areaCoords}
            <map name="map">
                <area
                    target="_blank"
                    href={areaHref}
                    coords={responsiveCoords}
                    shape="rect"
                    alt="스페셜 썬데이 메이플 이벤트"
                >
            </map>
        {:else}
            <div class="explain">아직 썬데이 메이플 이벤트가 올라오지 않았습니다.</div>
        {/if}
    {/if}
</div>
