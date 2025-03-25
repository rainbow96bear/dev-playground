<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import CharacterInfo from '$lib/components/characterInfo/CharacterInfo.svelte';
    import { characterInfo } from "$lib/store";
    import "./+page.css";

    const characterName = $page.url.searchParams.get('name');
    const description = "캐릭터의 착용 장비, 헥사 스킬, 심볼에 대한 정보"

    export let data: any; 

    $: if ( Object.keys(data).length > 0) {
        characterInfo.set(data);
    }else if ($characterInfo){
        goto(`/character/info?name=${$characterInfo?.character_name}`)
    }

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
    {#if  Object.keys(data).length > 0}
        <CharacterInfo/>
    {:else}
        캐릭터 이름을 검색해주세요.
    {/if}
</div>
