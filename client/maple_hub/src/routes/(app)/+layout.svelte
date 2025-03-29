<script lang="ts">
    import "./+layout.css"
    import potentialImg from "$lib/assets/potential.png"
    import "./+page.css";
  
    import { characterInfo } from "$lib/store";
	  import { goto } from "$app/navigation";
	  import CharacterSearch from "$lib/components/characterSearch/CharacterSearch.svelte";
	  import { page } from '$app/stores';
    let isOpen = false;
    let currentRoute = '';
    let showCharacterSearch = true;
    $: currentInfo = $characterInfo;


    $: {
      currentRoute = $page.url.pathname || "/";
      showCharacterSearch =
      currentRoute === "/" || 
      currentRoute.startsWith("/character") || 
      currentRoute.startsWith("/simulation");
    }
    
</script>
<div id="main_box">
  <header>
    <button class="hamburger" on:click={() => (isOpen = !isOpen)}>
      ☰
    </button>
  
    <nav class:open={isOpen}>
      <button on:click={() => goto("/")}>홈</button>
      <button on:click={() => goto("/character/info")}>캐릭터 정보</button>
      <button on:click={() => goto("/simulation/cube")}>
        <img src={potentialImg} alt="cube_sample_img" />큐브 시뮬레이션
      </button>
      <button on:click={() => goto("/patch_notes")}>패치노트</button>
    </nav>
  </header>
    
  <main>
    {#if showCharacterSearch}
      <div class="{currentInfo ? 'fade-out' : ''} title">
        메이플스토리 캐릭터 검색
      </div>
      <CharacterSearch></CharacterSearch>
    {/if}
    <slot />
  </main>
  
  <footer>
    <p>© 2025 Nexon API Example</p>
  </footer>
</div>
