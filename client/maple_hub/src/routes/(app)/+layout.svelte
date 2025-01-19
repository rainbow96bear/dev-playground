<script lang="ts">
    import "./+layout.css"
    import CharacterSearch from '$lib/components/characterSearch/CharacterSearch.svelte';
    import "./+page.css";
  
    import { characterInfo } from "$lib/store";
  
    $: currentInfo = $characterInfo;
</script>
<div id="main_box">
    <header>
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
