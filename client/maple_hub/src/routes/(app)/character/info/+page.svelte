<script lang="ts">
	import { page } from '$app/stores';
    import CharacterInfo from '$lib/components/characterInfo/CharacterInfo.svelte';
    import { characterInfo } from "$lib/store";
	import { onDestroy } from 'svelte';
    import "./+page.css";

    const characterName = $page.url.searchParams.get('name');
    const description = "캐릭터의 착용 장비, 헥사 스킬, 심볼에 대한 정보"

    export let data: any; 
    $: if (data) {
        characterInfo.set(data);
    }
    onDestroy(() => {
        characterInfo.set(null);
    });
</script>

<svelte:head>
  <title>{characterName} - 캐릭터 정보</title>
  <meta name="description" content="{description}">
  <meta property="og:title" content="{characterName} - 캐릭터 정보">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{import.meta.env.BASE_URL}/character/info?name={characterName}">
  <meta property="twitter:title" content="{characterName} - 캐릭터 정보">
  <meta property="twitter:description" content="{description}">
</svelte:head>

<div class="{characterInfo ? 'fade-in' : ''}">
    <CharacterInfo/>
</div>
