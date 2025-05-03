<script lang="ts">
    import Arcane from "$Components/CharacterInfo/SymbolsInfo/Arcane/Arcane.svelte"
    import Authentic from "$Components/CharacterInfo/SymbolsInfo/Authentic/Authentic.svelte"
    import GrandAuthentic from "$Components/CharacterInfo/SymbolsInfo/GrandAuthentic/GrandAuthentic.svelte"
  
    export let symbolsInfo;
    let arcaneList: any[] = [{},{},{},{},{},{}];
    let authenticList: any[] = [{},{},{},{},{},{}];
    let grandAuthenticList: any[] = [{},{},{}];
  
    $: if (symbolsInfo) {
        arcaneList = [{},{},{},{},{},{}];
        authenticList = [{},{},{},{},{},{}];
        grandAuthenticList = [{},{},{}];
  
        for (const symbol of symbolsInfo.symbol) {
            const name = symbol.symbol_name;
            if (name.includes("소멸의 여로")) arcaneList[0] = symbol;
            else if (name.includes("츄츄 아일랜드")) arcaneList[1] = symbol;
            else if (name.includes("레헬른")) arcaneList[2] = symbol;
            else if (name.includes("아르카나")) arcaneList[3] = symbol;
            else if (name.includes("모라스")) arcaneList[4] = symbol;
            else if (name.includes("에스페라")) arcaneList[5] = symbol;
            else if (name.includes("세르니움")) authenticList[0] = symbol;
            else if (name.includes("아르크스")) authenticList[1] = symbol;
            else if (name.includes("오디움")) authenticList[2] = symbol;
            else if (name.includes("도원경")) authenticList[3] = symbol;
            else if (name.includes("아르테리아")) authenticList[4] = symbol;
            else if (name.includes("카르시온")) authenticList[5] = symbol;
            else if (name.includes("탈라하트")) grandAuthenticList[0] = symbol;
        }
    }
  </script>
  
  <div class="symbol_container">
    <div class="symbol_box">
        {#each arcaneList as symbol}
            <Arcane symbol={symbol} />
        {/each}
    </div>
    <div class="symbol_box">
        {#each authenticList as symbol, index}
            <Authentic symbol={symbol} />
        {/each}
    </div>
    <div class="symbol_box">
        {#each grandAuthenticList as symbol, index}
            <GrandAuthentic symbol={symbol} />
        {/each}
    </div>
  </div>
  
  <style>
 .symbol_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap:30px;
}

.symbol_box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  width: fit-content;
  max-width: 400px;
  gap:10px;
}

  </style>
  