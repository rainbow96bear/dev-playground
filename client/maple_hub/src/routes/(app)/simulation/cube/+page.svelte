<script lang="ts">
  import SearchBox from "$Components/SearchBox/SearchBox.svelte"
  import EquipmentScreen from "$Components/Equipment/EquipmentScreen.svelte"
  import CubeSimulation from "$Components/CubeSimulation/CubeSimulation.svelte";
  import { InternalAPI } from '$lib/api';
  import { onMount } from 'svelte';

  import "./+page.css"
  
  // 타입 명시로 코드 품질 향상
  let characterInfo: any = null;
  let characterEquipments: any = null;
  let androidInfo: any = null;
  let itemInfo: any = null;
  let isLoading: boolean = false;
  let errorMessage: string = "";

  // 캐릭터 장비 정보 가져오기
  const fetchEquipments = async (characterName: string) => {
    if (!characterName) return;
    
    try {
      isLoading = true;
      errorMessage = "";
      
      // API 호출 시 오류 처리 추가
      const resCharacterInfo = await InternalAPI(`/v1/nexon/characterInfo/${characterName}`);
      const resCharacterEquipments = await InternalAPI(
        `/v1/nexon/characterInfo/${characterName}/equipmentsInfo`
      );
      const resAndroidInfo = await InternalAPI(`/v1/nexon/characterInfo/${characterName}/androidInfo`);
    
      characterInfo = resCharacterInfo.data;
      characterEquipments = resCharacterEquipments.data;
      androidInfo = resAndroidInfo.data;
    } catch (error) {
      errorMessage = "캐릭터 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.";
      console.error("API 오류:", error);
    } finally {
      isLoading = false;
    }
  };

  const handleSelectItem = (item: any) => {
    itemInfo = item;
  };

  onMount(() => {
    // 필요한 초기화 로직
  });
</script>

<svelte:head>
  <!-- SEO 최적화 -->
  <title>메이플스토리 큐브 시뮬레이터 | 장비 최적화 도구</title>
  <meta name="description" content="메이플스토리 캐릭터의 장비 정보를 확인하고 큐브 시뮬레이션을 통해 최적의 잠재능력을 찾아보세요." />
  <meta name="keywords" content="메이플스토리, 큐브 시뮬레이터, 장비 최적화, 잠재능력, 게임 도구" />
</svelte:head>

<main class="cubePage">
  <SearchBox on:search={(e) => fetchEquipments(e.detail.characterName)} />

  {#if isLoading}
    <div class="loading-indicator" aria-live="polite">
      <p>캐릭터 정보를 불러오는 중입니다...</p>
    </div>
  {:else if errorMessage}
    <div class="error-message" role="alert">
      <p>{errorMessage}</p>
    </div>
  {/if}

  <div class="contentWrapper">
    {#if characterInfo}
      <section class="equipment-section" aria-label="캐릭터 장비 정보">
        <h2 class="title">장비 정보</h2>
        <EquipmentScreen
          {characterInfo}
          equippedItems={characterEquipments?.item_equipment}
          {androidInfo}
          selectItem={handleSelectItem}
        />
      </section>
    {/if}
    
    <section class="simulator-section" aria-label="큐브 시뮬레이션">
      <h2 class="title">큐브 시뮬레이터</h2>
      <CubeSimulation selectedItem={itemInfo} />
    </section>
  </div>

  <section class="info-section">
    <h2>큐브 시뮬레이션 가이드</h2>
    <p>
      메이플스토리 큐브 시뮬레이터는 실제 게임에서 큐브를 사용하기 전에 
      다양한 잠재능력 옵션을 미리 테스트해볼 수 있는 도구입니다.
      원하는 캐릭터의 장비를 불러와 시뮬레이션을 진행해보세요.
    </p>
    <div class="guide-cards">
      <div class="guide-card">
        <h3>시작하기</h3>
        <p>캐릭터 이름을 입력하고 검색하여 장비 정보를 불러옵니다.</p>
      </div>
      <div class="guide-card">
        <h3>장비 선택</h3>
        <p>장비 화면에서 큐브를 적용할 아이템을 선택합니다.</p>
      </div>
      <div class="guide-card">
        <h3>시뮬레이션</h3>
        <p>다양한 큐브 옵션을 적용하여 최적의 잠재능력을 찾아보세요.</p>
      </div>
    </div>
  </section>
</main>
