<script lang="ts">
    import "./+page.css";
    import EventList from "$Components/EventList/EventList.svelte"
    import SundayMaple from "$Components/SundayMaple/SundayMaple.svelte"
    import SearchBox from "$Components/SearchBox/SearchBox.svelte"
    import { goto } from '$app/navigation';

    export let data;
    const title = "maple box";
    const description = "maple box의 메인 페이지 - 썬데이 메이플 업로드 확인";
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

<div class="mainPage">
  <SearchBox on:search={(e) => goto(`/character/info/${e.detail.characterName}`)} />
  <EventList eventList={data.eventList}></EventList>
  {#if data.sundayEvent}
    <SundayMaple className="sundayMaple" sundayEvent={data.sundayEvent} ></SundayMaple>
  {/if}
</div>
