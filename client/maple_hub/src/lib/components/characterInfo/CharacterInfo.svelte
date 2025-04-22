<script lang="ts">
  import { characterInfo, characterWalkMotion } from "$lib/store";
  import "./CharacterInfo.css";
  import { onDestroy } from "svelte";
  import Switch from "../Switch/Switch.svelte";
  import Symbols from "./symbols/Symbols.svelte";
  import EquippedItems from "./equippedItems/EquippedItems.svelte";
  import HexaSkills from "./hexaSkills/HexaSkills.svelte";

  const MotionQuery = "?action=A0";
  const MotionTerm = 150;
  const MotionCount = 4;

  let motionIndex = 0;
  let intervalId: NodeJS.Timeout | null = null;
  let isDataReady = false;
  let selectedComponent = "EquippedItems";

  $: currentInfo = $characterInfo;
  $: motionNum = $characterWalkMotion;

  $: if (currentInfo) {
    isDataReady = true;
  }

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });

  const selectComponent = (componentName: string) => {
    selectedComponent = componentName;
  };
</script>

{#if isDataReady && currentInfo}
  <div class="character_info_box">
    <div class="main_info display_flex">
      <img src={currentInfo.character_image} alt="캐릭터 이미지" />
      <div class="text_main_info">
        <div id="nickname">{currentInfo.character_name}</div>
        <div>{currentInfo.character_class} | Lv.{currentInfo.character_level}</div>
        <div>{currentInfo.world_name} / {currentInfo.character_guild_name || '길드 없음'}</div>
      </div>
    </div>

    <div>
      <div id="function_button_box">
        <button
          class:selected={selectedComponent === 'EquippedItems'}
          on:click={() => selectComponent('EquippedItems')}
        >
          장비
        </button>
        <button
          class:selected={selectedComponent === 'HexaSkills'}
          on:click={() => selectComponent('HexaSkills')}
        >
          헥사 스킬
        </button>
        <button
          class:selected={selectedComponent === 'Symbols'}
          on:click={() => selectComponent('Symbols')}
        >
          심볼
        </button>
      </div>

      <div id="sub_info_box">
        <!-- EquippedItems는 항상 마운트되며 보이기만 조건으로 처리 -->
        <div style="display: {selectedComponent === 'EquippedItems' ? 'block' : 'none'}">
          <EquippedItems />
        </div>

        <!-- 나머지는 조건부 렌더링 -->
        {#if selectedComponent === 'HexaSkills'}
          <HexaSkills />
        {/if}

        {#if selectedComponent === 'Symbols'}
          <Symbols />
        {/if}
      </div>
    </div>
  </div>
{/if}
