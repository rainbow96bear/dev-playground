<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { ArcaneSymbolIconList, AuthenticSymbolIconList } from '$lib/constants';
  import Arcane from './arcane/Arcane.svelte';
  import "./Symbols.css";

  let arcaneLevels = [0, 0, 0, 0, 0, 0];
  let authenticLevels = [0, 0, 0, 0, 0, 0];

  onMount(async () => {
    const characterName = $page.url.searchParams.get('name');
    if (!characterName) return;

    const res = await fetch(`/api/data/equipped_symbols?name=${characterName}`);
    if (res.ok) {
      const symbols = await res.json();
      symbols.symbol.forEach(symbol => {
        switch (symbol.symbol_name) {
          case "소멸의 여로": arcaneLevels[0] = symbol.symbol_level; break;
          case "츄츄 아일랜드": arcaneLevels[1] = symbol.symbol_level; break;
          case "레헬른": arcaneLevels[2] = symbol.symbol_level; break;
          case "아르카나": arcaneLevels[3] = symbol.symbol_level; break;
          case "모라스": arcaneLevels[4] = symbol.symbol_level; break;
          case "에스페라": arcaneLevels[5] = symbol.symbol_level; break;
          case "세르니움": authenticLevels[0] = symbol.symbol_level; break;
          case "아르크스": authenticLevels[1] = symbol.symbol_level; break;
          case "오디움": authenticLevels[2] = symbol.symbol_level; break;
          case "도원경": authenticLevels[3] = symbol.symbol_level; break;
          case "아르테리아": authenticLevels[4] = symbol.symbol_level; break;
          case "카르시온": authenticLevels[5] = symbol.symbol_level; break;
        }
      });
    } else {
      console.error('Failed to load equipped symbols');
    }
  });
</script>

<div id="symbol_container">
  <div class="symbol_box">
    {#each arcaneLevels as level, index}
      <Arcane symbol_icon={ArcaneSymbolIconList[index]} symbol_level={level}></Arcane>
    {/each}
  </div>
  <div class="symbol_box">
    {#each authenticLevels as level, index}
      <Authentic symbol_icon={AuthenticSymbolIconList[index]} symbol_level={level}></Authentic>
    {/each}
  </div>
</div>
