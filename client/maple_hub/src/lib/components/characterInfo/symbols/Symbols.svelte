<script>
   import { onMount } from 'svelte';
    import { page } from '$app/stores';
	import { ArcaneSymbolIconList, AuthenticSymbolIconList } from '$lib/constants';
	import Symbol from './symbol/Symbol.svelte';
  import "./Symbols.css"
    let arcane0 = 0;
    let arcane1 = 0;
    let arcane2 = 0;
    let arcane3 = 0;
    let arcane4 = 0;
    let arcane5 = 0;

    let authentic0 = 0;
    let authentic1 = 0;
    let authentic2 = 0;
    let authentic3 = 0;
    let authentic4 = 0;
    let authentic5 = 0;

    onMount(async () => {
      const characterName = $page.url.searchParams.get('name');
      if (characterName == undefined){
        return
      }
      
        const res = await fetch(`/api/data/equipped_symbols?name=${characterName}`);
        if (res.ok) {
          const symbols = await res.json();
          for (let i = 0; i < symbols.symbol.length; i++) { // 수정: length() 대신 .length 사용
            switch (symbols.symbol[i].symbol_name) {
                case "소멸의 여로":
                arcane0 = symbols.symbol[i].symbol_level;
                break;
                case "츄츄 아일랜드":
                arcane1 = symbols.symbol[i].symbol_level;
                break;
                case "레헬른":
                arcane2 = symbols.symbol[i].symbol_level;
                break;
                case "아르카나":
                arcane3 = symbols.symbol[i].symbol_level;
                break;
                case "모라스":
                arcane4 = symbols.symbol[i].symbol_level;
                break;
                case "에스페라":
                arcane5 = symbols.symbol[i].symbol_level;
                break;
                case "세르니움움":
                authentic0 = symbols.symbol[i].symbol_level;
                break;
                case "아르크스스":
                authentic1 = symbols.symbol[i].symbol_level;
                break;
                case "오디움":
                authentic2 = symbols.symbol[i].symbol_level;
                break;
                case "도원경":
                authentic3 = symbols.symbol[i].symbol_level;
                break;
                case "아르테리아":
                authentic4 = symbols.symbol[i].symbol_level;
                break;
                case "카르시온":
                authentic5 = symbols.symbol[i].symbol_level;
                break;
                
            }
          }
          console.log(symbols)
        } else {
          console.error('Failed to load equipped items');
        }
      
    });
</script>

<div id="symbol_container">
  <div class="symbol_box">
    <Symbol symbol_icon={ArcaneSymbolIconList[0]} symbol_level={arcane0} ></Symbol>
    <Symbol symbol_icon={ArcaneSymbolIconList[1]} symbol_level={arcane1} ></Symbol>
    <Symbol symbol_icon={ArcaneSymbolIconList[2]} symbol_level={arcane2} ></Symbol>
    <Symbol symbol_icon={ArcaneSymbolIconList[3]} symbol_level={arcane3} ></Symbol>
    <Symbol symbol_icon={ArcaneSymbolIconList[4]} symbol_level={arcane4} ></Symbol>
    <Symbol symbol_icon={ArcaneSymbolIconList[5]} symbol_level={arcane5} ></Symbol>
  </div>
  <div class="symbol_box">
    <Symbol symbol_icon={AuthenticSymbolIconList[0]} symbol_level={authentic0} ></Symbol>
    <Symbol symbol_icon={AuthenticSymbolIconList[1]} symbol_level={authentic1} ></Symbol>
    <Symbol symbol_icon={AuthenticSymbolIconList[2]} symbol_level={authentic2} ></Symbol>
    <Symbol symbol_icon={AuthenticSymbolIconList[3]} symbol_level={authentic3} ></Symbol>
    <Symbol symbol_icon={AuthenticSymbolIconList[4]} symbol_level={authentic4} ></Symbol>
    <Symbol symbol_icon={AuthenticSymbolIconList[5]} symbol_level={authentic5} ></Symbol>
  </div>
</div>