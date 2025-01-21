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

  const startImageSequence = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      motionIndex = (motionIndex + 1) % MotionCount;
    }, MotionTerm);
  };

  $: if (currentInfo) {
    isDataReady = true;
    startImageSequence();
  }

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });

  const toggleMotion = () => {
    characterWalkMotion.set((motionNum === 2 ? 3 : 2));
  };

  const selectComponent = (componentName: string) => {
    selectedComponent = componentName;
  };
</script>

{#if isDataReady}
  {#if currentInfo }
    <div class="character_info_box">
      <div class="main_info display_flex">
        <img src={currentInfo.character_image + MotionQuery + motionNum + "." + motionIndex} alt="캐릭터 이미지" />
        
        <div class="text_main_info">
          <div id="nickname">{currentInfo.character_name}</div>
          <div>{currentInfo.character_class} | Lv.{currentInfo.character_level}</div>
          <div>{currentInfo.world_name} / {currentInfo.character_guild_name}</div>
          <div class="display_flex">
            <div>모션 선택</div>
            <div class="switch">
              <Switch onToggle={toggleMotion}/>
            </div>
          </div>
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
          {#if selectedComponent === 'EquippedItems'}
            <EquippedItems />
          {/if}
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
{/if}
