<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import {DEFAULT_CHARACTER} from "$lib/constants/index"
  import { ArcaneSymbolIconList, AuthenticSymbolIconList } from '$lib/constants';
  import Arcane from './arcane/Arcane.svelte';
  import Authentic from './authentic/Authentic.svelte';
  import "./Symbols.css";

  const rootURL = import.meta.env.VITE_ROOT_URL;

  let arcaneList: any[] = [{},{},{},{},{},{}];
  let authenticList: any[] = [{},{},{},{},{},{}];
  const fetchSymbol = async(name: string | null)=>{
    if (!name) return;

    try {
      const res = await fetch(`${rootURL}/api/data/equipped_symbols?name=${name}`);
      if (res.ok) {
        const symbols = await res.json();
        symbols?.symbol.forEach(symbol => {

          if (symbol.symbol_name.includes("소멸의 여로")) {
            arcaneList[0] = symbol;
          } else if (symbol.symbol_name.includes("츄츄 아일랜드")) {
            arcaneList[1] = symbol;
          } else if (symbol.symbol_name.includes("레헬른")) {
            arcaneList[2] = symbol;
          } else if (symbol.symbol_name.includes("아르카나")) {
            arcaneList[3] = symbol;
          } else if (symbol.symbol_name.includes("모라스")) {
            arcaneList[4] = symbol;
          } else if (symbol.symbol_name.includes("에스페라")) {
            arcaneList[5] = symbol;
          } else if (symbol.symbol_name.includes("세르니움")) {
            authenticList[0] = symbol;
          } else if (symbol.symbol_name.includes("아르크스")) {
            authenticList[1] = symbol;
          } else if (symbol.symbol_name.includes("오디움")) {
            authenticList[2] = symbol;
          } else if (symbol.symbol_name.includes("도원경")) {
            authenticList[3] = symbol;
          } else if (symbol.symbol_name.includes("아르테리아")) {
            authenticList[4] = symbol;
          } else if (symbol.symbol_name.includes("카르시온")) {
            authenticList[5] = symbol;
          }
        });
      } else {
        console.error('Failed to load equipped symbols');
      }
    }catch(error) {
      console.error('Error fetching equipped items:', error);
    }
  }

  $: {
        const characterName = $page.url.searchParams.get('name')||DEFAULT_CHARACTER;
        fetchSymbol(characterName);
    }
</script>

<div id="symbol_container">
  <div class="symbol_box">
    {#each arcaneList as symbol, index}
      <Arcane symbol={symbol} icon={ArcaneSymbolIconList[index]}></Arcane>
    {/each}
  </div>
  <div class="symbol_box">
    {#each authenticList as symbol, index}
      <Authentic symbol={symbol} icon={AuthenticSymbolIconList[index]}></Authentic>
    {/each}
  </div>
</div>
