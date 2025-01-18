<script lang="ts">
    import { characterInfo } from "$lib/store";
  
    const MotionQuery = "?action=A0";
    const MotionTerm = 150;
    const MotionCount = 4;
  
    let motionNum = 2;
    let motionIndex = 0;
  
    $: currentInfo = $characterInfo; // 반응형으로 store 값 구독
    let intervalId: NodeJS.Timeout | null = null;
  
    const startImageSequence = () => {
      if (intervalId) {
        clearInterval(intervalId); // 기존 시퀀스 중단
      }
  
      intervalId = setInterval(() => {
        motionIndex = (motionIndex + 1) % MotionCount;
      }, MotionTerm);
    };
  
    // currentInfo가 변경될 때 startImageSequence 실행
    $: if (currentInfo) {
      startImageSequence();
    }
  
    // 컴포넌트가 파괴될 때 인터벌 정리
    import { onDestroy } from "svelte";
    onDestroy(() => {
      if (intervalId) clearInterval(intervalId);
    });
</script>

<div>
    {#if currentInfo }
        <div class="character-info">
        <img src={currentInfo.character_image + MotionQuery + motionNum+ "." + motionIndex} alt="캐릭터 이미지" />
        <div>모션 선택 </div>
        <ul class="details-list">
            <li>레벨 : {currentInfo.character_level}</li>
            <li>이름 : {currentInfo.character_name}</li>
            <li>직업 : {currentInfo.character_class}</li>
            <li>전직 차수 : {currentInfo.character_class_level}</li>
            <li>생성 일자 : {currentInfo.character_date_create}</li>
            <li>길드 : {currentInfo.guild_name}</li>
            <li>서버 : {currentInfo.world_name}</li>
            <li>최근 7일간 접속 : {currentInfo.access_flag}</li>
            <li>해방 퀘스트 완료 여부 : {currentInfo.liberation_quest_clear_flag}</li>
        </ul>
        </div>
    {/if}
</div>