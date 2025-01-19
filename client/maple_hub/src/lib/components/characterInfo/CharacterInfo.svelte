<script lang="ts">
  import { characterInfo, characterWalkMotion } from "$lib/store";
  import "./CharacterInfo.css";

  const MotionQuery = "?action=A0";
  const MotionTerm = 150;
  const MotionCount = 4;

  let motionIndex = 0;

  $: currentInfo = $characterInfo;
  $: motionNum = $characterWalkMotion;

  let intervalId: NodeJS.Timeout | null = null;
  let isDataReady = false;

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

  import { onDestroy } from "svelte";
  import Switch from "../Switch/Switch.svelte";

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });

  const toggleMotion = () => {
    characterWalkMotion.set((motionNum === 2 ? 3 : 2));
  };

  const birthDay = (date:string)=> {
    return date.slice(2, 10)
  }
</script>

{#if isDataReady}
  {#if currentInfo }
    <div class="character_info_box">
      <div class="main_info display_flex">
        <img src={currentInfo.character_image + MotionQuery + motionNum + "." + motionIndex} alt="캐릭터 이미지" />
        
        <div class="text_main_info">
          <div id="nickname">{currentInfo.character_name}</div>
          <div>{currentInfo.character_class} | Lv.{currentInfo.character_level}</div>
          <div class="display_flex">
            <div>모션 선택</div>
            <div class="switch">
              <Switch onToggle={toggleMotion}/>
            </div>
          </div>
        </div>
      </div>
      <ul class="details-list">
          <li>생일 : {birthDay(currentInfo.character_date_create)}</li>
          <li>길드 : {currentInfo.character_guild_name}</li>
          <li>서버 : {currentInfo.world_name}</li>
          <li>최근 7일간 접속 : {currentInfo.access_flag}</li>
          <li>해방 퀘스트 완료 여부 : {currentInfo.liberation_quest_clear_flag}</li>
      </ul>
    </div>
  {/if}
{/if}
