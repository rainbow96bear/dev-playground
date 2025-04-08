<script lang="ts">
	import CharacterInfo from '$lib/components/characterInfo/CharacterInfo.svelte';
	import { characterInfo } from "$lib/store";
	import "./+page.css";

	export let data: any;
	export let characterName: string;

	const description = "캐릭터의 착용 장비, 헥사 스킬, 심볼에 대한 정보";

	// 페이지 진입 시 store에 데이터 설정
	$: if (data) {
		characterInfo.set(data);
	}
</script>

<svelte:head>
	<title>{characterName} - 캐릭터 정보</title>
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{characterName} - 캐릭터 정보" />
	<meta property="og:description" content="{description}" />
	<meta property="og:url" content="{import.meta.env.BASE_URL}/character/info?name={characterName}" />
	<meta property="twitter:title" content="{characterName} - 캐릭터 정보" />
	<meta property="twitter:description" content="{description}" />
</svelte:head>

<div class="fade-in">
	<CharacterInfo />
</div>