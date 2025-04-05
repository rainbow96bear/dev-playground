<script lang="ts">
    import "./+layout.css"
    import potentialImg from "$lib/assets/potential.png"
    // import "./+page.css";
  
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
    <div class="footer-content">
      <div class="footer-section">
        <h4>About</h4>
        <p>이 사이트는 메이플스토리 캐릭터 정보 및 시뮬레이션을 위한 비공식 웹사이트입니다.</p>
      </div>
      <div class="footer-section">
        <h4>Links</h4>
        <ul>
          <li><a href="https://maplestory.nexon.com" target="_blank">메이플스토리 공식 사이트</a></li>
          <li><a href="https://openapi.nexon.com/" target="_blank">Nexon Open API</a></li>
          <li><a href="https://github.com/rainbow96bear/dev-playground/tree/master/client/maple_hub" target="_blank">GitHub</a></li>
          <li><a href="/privacy">개인정보 처리방침</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <p>Email: contact@example.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Nexon API Example — 비공식 서비스이며, Nexon과 무관합니다.</p>
    </div>
  </footer>
  
</div>
