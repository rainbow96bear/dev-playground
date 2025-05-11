<script lang="ts">
  import CharacterInfo from '$Components/CharacterInfo/CharacterInfo.svelte';
  import EquipmentsInfo from '$Components/CharacterInfo/EquipmentsInfo/EquipmentsInfo.svelte';
  import SymbolsInfo from '$Components/CharacterInfo/SymbolsInfo/SymbolsInfo.svelte';
  import HexaSkillsInfo from '$Components/CharacterInfo/HexaSkillsInfo/HexaSkillsInfo.svelte';

  import "./+page.css";

  export let data: any;
  export let characterName: string;
  const description = `${characterName}의 착용 장비, 헥사 스킬, 심볼에 대한 자세한 정보를 제공합니다.`;
  let selectedComponent = "EquippedItems";

  const selectComponent = (componentName: string) => {
    selectedComponent = componentName;
  };

  $: characterInfo = data.characterInfo;
  $: characterEquipments = data.characterEquipments;
  $: characterHexaSkills = data.characterHexaSkills;
  $: characterSymbols = data.characterSymbols;
</script>

<svelte:head>
  <title>{characterName} - 캐릭터 정보</title>
  <meta name="description" content="{description}" />
  <meta property="og:title" content="{characterName} - 캐릭터 정보" />
  <meta property="og:description" content="{description}" />
  <meta property="og:url" content="{import.meta.env.BASE_URL}/character/info?name={characterName}" />
  <meta property="og:image" content="https://yourimageurl.com" />
  <meta property="og:type" content="website" />
  <meta name="twitter:title" content="{characterName} - 캐릭터 정보" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="https://yourimageurl.com" />
  <meta name="keywords" content="메이플스토리, 캐릭터 정보, 장비, 헥사 스킬, 심볼, 캐릭터 능력치" />
  <link rel="canonical" href="{import.meta.env.BASE_URL}/character/info?name={characterName}" />
</svelte:head>

<main class="character_info_box">
  <header>
    <h1>{characterName}의 캐릭터 정보</h1>
    <p>{description}</p>
  </header>

  <section class="function_button_box">
    <button class:selected={selectedComponent === 'EquippedItems'} on:click={() => selectComponent('EquippedItems')}>장비</button>
    <button class:selected={selectedComponent === 'HexaSkills'} on:click={() => selectComponent('HexaSkills')}>헥사 스킬</button>
    <button class:selected={selectedComponent === 'Symbols'} on:click={() => selectComponent('Symbols')}>심볼</button>
  </section>

  <section>
    <CharacterInfo className="characterInfoCharacterInfo" characterInfo={characterInfo}/>

    <div
      class:hidden={selectedComponent !== 'EquippedItems'}
      aria-hidden={selectedComponent !== 'EquippedItems'}
    >
      <EquipmentsInfo equipmentsInfo={characterEquipments} />
    </div>

    <div
      class:hidden={selectedComponent !== 'HexaSkills'}
      aria-hidden={selectedComponent !== 'HexaSkills'}
    >
      <HexaSkillsInfo hexaSkillsInfo={characterHexaSkills} />
    </div>

    <div
      class:hidden={selectedComponent !== 'Symbols'}
      aria-hidden={selectedComponent !== 'Symbols'}
    >
      <SymbolsInfo symbolsInfo={characterSymbols} />
    </div>
  </section>
</main>

<style>
  .hidden {
    display: none;
  }

  .character_info_box {
    padding: 20px;
    font-size: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .function_button_box {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .function_button_box button.selected {
    background-color: #007bff;
    color: white;
  }

  .function_button_box button {
    padding: 10px 15px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
  }

  header h1 {
    font-size: 2rem;
    color: #222;
    margin-bottom: 0.5rem;
  }

  header p {
    color: #555;
    font-size: 1rem;
  }
</style>
