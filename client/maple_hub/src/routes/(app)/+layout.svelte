<script lang="ts">
    import "./+layout.css"
    import CharacterSearch from '$lib/components/characterSearch/CharacterSearch.svelte';
    import potentialImg from "$lib/assets/potential.png"
    // import "./+page.css";
  
    import { characterInfo } from "$lib/store";
	  import { goto } from "$app/navigation";
  
    $: currentInfo = $characterInfo;
</script>
<div id="main_box">
    <header>
      <button on:click={()=>{goto("/")}}>
        홈
      </button>
      <button on:click={()=>{goto("/character/info")}}>
        캐릭터 정보
      </button>
      <button on:click={()=>{goto("/simulation/cube")}}>
        <img src={potentialImg} alt="cube_sample_img">큐브 시뮬레이션
      </button>
    </header>
    
    <main>
      <div class="{currentInfo ? 'fade-out' : ''} title">
        메이플스토리 캐릭터 검색
      </div>
      <CharacterSearch></CharacterSearch>
      <slot />
    </main>
    
    <footer>
      <p>© 2025 Nexon API Example</p>
    </footer>
</div>
