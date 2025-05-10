<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import SearchBox from '$Components/SearchBox/SearchBox.svelte';
    import "./+layout.css";

</script>

<svelte:head>
	<title>메이플 캐릭터 검색 | MapleHub</title>
	<meta name="description" content="메이플스토리 캐릭터 정보를 검색하세요. 장비, 심볼, 헥사 스킬까지 상세히 확인할 수 있습니다." />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://maplebox.netlify.app/character/info" />
	
	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="메이플 캐릭터 검색 | MapleHub" />
	<meta property="og:description" content="장비, 심볼, 스킬 등 캐릭터 정보를 빠르게 검색해보세요." />
	<meta property="og:url" content="https://maplebox.netlify.app/character/info" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="메이플 캐릭터 검색 | MapleHub" />
	<meta name="twitter:description" content="메이플스토리 캐릭터 정보를 검색하고 분석해보세요." />
</svelte:head>

<div class="characterInfoPage">
    <h1 class="characterInfoTitle">메이플스토리 캐릭터 검색</h1>
    <p class="characterInfoText">장비, 심볼, 헥사 스킬 등 상세한 캐릭터 정보를 조회할 수 있습니다.</p>
    <SearchBox on:search={(e) => goto(`/character/info/${e.detail.characterName}`)} />
    <slot></slot>
</div>
