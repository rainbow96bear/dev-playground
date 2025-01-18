<script lang="ts">
  import Switch from '$lib/components/Switch.svelte';
  import { getCharaterOcid, getChareterInfo } from "$lib/nexonApi";
  import "./+page.css";

  const MotionTerm = 150;
  const MotionQuery = "?action=A0";
  const MotionCount = 4;

  let characterName = "";
  let characterInfo:any;
  let motionIndex = 0;
  let motionNum = 2;
  let intervalId: NodeJS.Timeout | null = null; // intervalId 선언

  const startImageSequence = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      motionIndex = (motionIndex + 1) % MotionCount;
    }, MotionTerm);
  };

  const fetchCharacterInfo = async () => {
    try {
      const resOcidObj = await getCharaterOcid(characterName);
      if (resOcidObj) {
        const ocid = resOcidObj.ocid;
        const resCharacterInfoObj = await getChareterInfo(ocid);
        characterInfo = resCharacterInfoObj;
        startImageSequence();
      } else {
        console.log("Ocid를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

</script>

<div class="container">
  <h1>메이플스토리 캐릭터 리스트</h1>

  <div class="input-group">
    <input type="text" bind:value={characterName} placeholder="캐릭터를 검색하세요" />
    <button id="searchButton" on:click={fetchCharacterInfo}>검색</button>
  </div>

  <div>
    {#if characterInfo}
      <div class="character-info">
        <img src={characterInfo.character_image + MotionQuery + motionNum+ "." + motionIndex} alt="캐릭터 이미지" />
        <div>모션 선택 </div>
        <Switch />
        <ul class="details-list">
          <li>레벨 : {characterInfo.character_level}</li>
          <li>이름 : {characterInfo.character_name}</li>
          <li>직업 : {characterInfo.character_class}</li>
          <li>전직 차수 : {characterInfo.character_class_level}</li>
          <li>생성 일자 : {characterInfo.character_date_create}</li>
          <li>길드 : {characterInfo.guild_name}</li>
          <li>서버 : {characterInfo.world_name}</li>
          <li>최근 7일간 접속 : {characterInfo.access_flag}</li>
          <li>해방 퀘스트 완료 여부 : {characterInfo.liberation_quest_clear_flag}</li>
        </ul>
      </div>
    {/if}
  </div>
</div>