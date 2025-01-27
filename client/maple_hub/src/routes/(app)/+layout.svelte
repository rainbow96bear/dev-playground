<script lang="ts">
    import "./+layout.css"
    import CharacterSearch from '$lib/components/characterSearch/CharacterSearch.svelte';
    import "./+page.css";
  
    import { characterInfo } from "$lib/store";
	import { goto } from "$app/navigation";
  
    $: currentInfo = $characterInfo;
</script>
<div id="main_box">
    <header>
      <div>
        홈
      </div>
      <button onclick={()=>{goto("/simulation/cube")}}>
        큐브 시뮬레이션
      </button>
      <div>
        환생의 불꽃 시뮬레이션
      </div>
      <div>
        스타포스 시뮬레이션
      </div>
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
