<script lang="ts">
    import { onMount } from "svelte";
    import "./+page.css";

    export let data: any;

    const imgSrcMatch = data.contents.match(/<img[^>]+src="([^"]+)"/);
    const areaMatch = data.contents.match(/<area[^>]+href="([^"]+)"[^>]+coords="([^"]+)"/);

    const imgSrc = imgSrcMatch ? imgSrcMatch[1] : null;
    const areaHref = areaMatch ? areaMatch[1] : null;
    const areaCoords = areaMatch ? areaMatch[2] : null;

    let imgWidth = 0;
    let imgHeight = 0;
    let responsiveCoords = areaCoords;

    const getResponsiveCoords = (coords: string, imgWidth: number): string => {
        const coordsArray = coords.split(',').map(Number);
        const newCoords = coordsArray.map((coord, index) => {
            if (index % 2 === 0) {
                return Math.round(coord * (imgWidth / 876));  // 비율 곱하기
            } else {
                return Math.round(coord * (imgWidth / 876));  // y 좌표도 비슷하게 처리
            }
        });
        return newCoords.join(',');
    };

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

</script>

<div class="sunday_event">
    <div>
        <!-- img만 있을 경우 렌더링 -->
        <img src={imgSrc} alt="스페셜 썬데이 메이플" usemap="#map">
        {#if areaHref && areaCoords}
            <map name="map">
                <area target="_blank" href={areaHref} coords={responsiveCoords} shape="rect">
            </map>
        {/if}
    </div>
</div>
