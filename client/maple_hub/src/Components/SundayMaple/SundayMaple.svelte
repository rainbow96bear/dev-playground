<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";

    export let sundayEvent;
    export let className: string;

    const BASE_IMAGE_WIDTH = 876;
    let imgSrc: string | null = null;
    let imgElement: HTMLImageElement | null = null;
    let isLoading = true;
    let eventStartDate = '';
    let eventEndDate = '';

    const areas = writable<{ href: string; coords: string; responsiveCoords: string }[]>([]);

    const defaultImage = 'https://example.com/default-image.jpg';
    const defaultAlt = '썬데이 메이플 이벤트 이미지';
    const defaultDescription = '현재 진행 중인 썬데이 메이플 이벤트를 확인하세요. 이벤트 기간 및 혜택 정보를 제공합니다.';

    let eventDescription = '매주 일요일마다 특별한 혜택을 제공하는 썬데이 메이플 이벤트입니다.';
    
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
        
        isLoading = false;
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

    const faq = [
        {
            question: '썬데이 메이플 이벤트는 매주 진행되나요?',
            answer: '네, 매주 일요일마다 새로운 혜택과 함께 진행됩니다. 매주 다양한 보상이 제공되니 놓치지 마세요.'
        },
        {
            question: '썬데이 메이플 이벤트 정보는 어디서 확인할 수 있나요?',
            answer: '공식 메이플스토리 웹사이트나 저희 메이플박스에서 매주 업데이트되는 정보를 확인하실 수 있습니다.'
        }
    ];

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
    <title>썬데이 메이플 이벤트 가이드 | 메이플박스</title>
    <meta name="description" content={defaultDescription} />
    <meta property="og:title" content="썬데이 메이플 이벤트 상세 가이드 | 메이플박스" />
    <meta property="og:description" content={defaultDescription} />
    <meta property="og:image" content={imgSrc} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="썬데이 메이플 이벤트 가이드 | 메이플박스" />
    <meta name="twitter:description" content={defaultDescription} />
    <meta name="twitter:image" content={imgSrc} />
    <meta name="keywords" content="메이플스토리, 썬데이메이플, 주간이벤트, 메이플 보상, 메이플스토리 팁, 게임 이벤트" />
    <link rel="canonical" href="https://maplebox.netlify.app/sunday-maple" />
</svelte:head>

<div class="sunday-maple-container {className}">
    <h1 class="sunday-title">썬데이 메이플 이벤트 가이드</h1>

    {#if isLoading}
        <div class="loading-container">
            <p>이벤트 정보를 불러오는 중입니다...</p>
            <div class="loading-spinner"></div>
        </div>
    {:else}
        <section class="event-overview">            
            <p class="event-description">{eventDescription}</p>
        </section>

        <div class="event-image-container">
            <img
                id="sunday_img"
                bind:this={imgElement}
                src={imgSrc}
                alt={defaultAlt}
                usemap="#map"
                decoding="async"
                loading="lazy"
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
            
            <div class="image-caption">
                ↑ 이미지의 바로가기를 클릭하면 관련 페이지로 이동합니다.
            </div>
        </div>

        <section class="event-faq">
            <h2 class="section-title">자주 묻는 질문</h2>
            <dl class="faq-list">
                {#each faq as item}
                    <dt class="faq-question">{item.question}</dt>
                    <dd class="faq-answer">{item.answer}</dd>
                {/each}
            </dl>
        </section>
    {/if}
</div>

<style>
    .sunday-maple-container {
        font-family: 'Noto Sans KR', sans-serif;
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
        color: #333;
        line-height: 1.6;
    }

    .sunday-title {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 1.5rem;
        color: #2a52be;
        font-weight: 700;
    }

    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top-color: #2a52be;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .event-overview {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 30px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .event-description {
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 0;
    }

    .event-image-container {
        margin-bottom: 30px;
        position: relative;
        text-align: center;
    }

    #sunday_img {
        min-width: 360px;
        max-width: 100%;
        border-radius: 6px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    }

    .image-caption {
        margin-top: 10px;
        font-size: 0.9rem;
        color: #666;
        text-align: center;
    }

    .section-title {
        color: #2a52be;
        margin-top: 30px;
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 1.5rem;
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 10px;
    }

    .faq-list {
        margin: 0;
        padding: 0;
    }

    .faq-question {
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
        cursor: pointer;
    }

    .faq-question:before {
        content: "Q. ";
        color: #2a52be;
        font-weight: bold;
    }

    .faq-answer {
        margin: 0 0 20px 0;
        padding: 0 0 15px 20px;
        border-bottom: 1px solid #e9ecef;
    }

    .faq-answer:before {
        content: "A. ";
        color: #F44336;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .sunday-title {
            font-size: 1.5rem;
        }
    }
</style>
