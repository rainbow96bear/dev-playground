<script lang="ts">
    import Arcane from "$Components/CharacterInfo/SymbolsInfo/Arcane/Arcane.svelte"
    import Authentic from "$Components/CharacterInfo/SymbolsInfo/Authentic/Authentic.svelte"
    import GrandAuthentic from "$Components/CharacterInfo/SymbolsInfo/GrandAuthentic/GrandAuthentic.svelte"
  
    export let symbolsInfo;
    let arcaneList: any[] = [{}, {}, {}, {}, {}, {}];
    let authenticList: any[] = [{}, {}, {}, {}, {}, {}];
    let grandAuthenticList: any[] = [{}, {}, {}];
  
    $: if (symbolsInfo) {
      arcaneList = [{}, {}, {}, {}, {}, {}];
      authenticList = [{}, {}, {}, {}, {}, {}];
      grandAuthenticList = [{}, {}, {}];
  
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
  
  <svelte:head>
    <title>심볼 정보 보기 | 무지개곰</title>
    <meta name="description" content="캐릭터의 아케인 심볼, 어센틱 심볼, 그랜드 어센틱 심볼 정보를 확인할 수 있는 페이지입니다. 각 지역별 심볼 경험치를 확인하세요.">
    <meta name="author" content="무지개곰">
    <meta property="og:title" content="무지개곰 - 심볼 정보">
    <meta property="og:description" content="아케인, 어센틱, 그랜드 어센틱 심볼 정보를 2x3 레이아웃으로 확인할 수 있습니다.">
    <meta property="og:url" content="https://example.com/character/symbols"> <!-- 실제 URL로 교체 -->
    <meta property="og:image" content="https://example.com/symbol-preview.jpg"> <!-- 대표 이미지 URL -->
  </svelte:head>
  
  <article class="symbol_container" aria-labelledby="symbol-title">
    <h1 id="symbol-title" class="visually-hidden">캐릭터 심볼 정보</h1>
  
    <section class="symbol_section" aria-labelledby="arcane-title">
      <h2 id="arcane-title">아케인 심볼</h2>
      <div class="symbol_box">
        {#each arcaneList as symbol}
          <Arcane symbol={symbol} />
        {/each}
      </div>
    </section>
  
    <section class="symbol_section" aria-labelledby="authentic-title">
      <h2 id="authentic-title">어센틱 심볼</h2>
      <div class="symbol_box">
        {#each authenticList as symbol}
          <Authentic symbol={symbol} />
        {/each}
      </div>
    </section>
  
    <section class="symbol_section" aria-labelledby="grand-authentic-title">
      <h2 id="grand-authentic-title">그랜드 어센틱 심볼</h2>
      <div class="symbol_box">
        {#each grandAuthenticList as symbol}
          <GrandAuthentic symbol={symbol} />
        {/each}
      </div>
    </section>
  </article>
  
  <style>
  .symbol_container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
  }
  
  .symbol_section {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .symbol_box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    width: fit-content;
    gap: 10px;
    margin-top: 10px;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
  </style>
  