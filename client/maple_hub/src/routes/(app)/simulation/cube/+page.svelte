<script lang="ts">
  import SearchBox from "$Components/SearchBox/SearchBox.svelte";
  import EquipmentScreen from "$Components/Equipment/EquipmentScreen.svelte";
  import CubeSimulation from "$Components/CubeSimulation/CubeSimulation.svelte";
  import { InternalAPI } from '$lib/api';
  import { onMount } from 'svelte';

  let characterInfo: any = null;
  let characterEquipments: any = null;
  let androidInfo: any = null;
  let itemInfo: any = null;
  let isLoading: boolean = false;
  let errorMessage: string = "";

  const fetchEquipments = async (characterName: string) => {
    if (!characterName) return;

    try {
      isLoading = true;
      errorMessage = "";
      const [resCharacterInfo, resCharacterEquipments, resAndroidInfo] = await Promise.all([
        InternalAPI(`/v1/nexon/characterInfo/${characterName}`),
        InternalAPI(`/v1/nexon/characterInfo/${characterName}/equipmentsInfo`),
        InternalAPI(`/v1/nexon/characterInfo/${characterName}/androidInfo`)
      ]);

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
</script>

<svelte:head>
  <title>메이플스토리 큐브 시뮬레이터 - 장비 정보와 잠재능력 분석</title>
  <meta name="description" content="메이플스토리 캐릭터 장비 정보를 불러오고, 큐브 시뮬레이션을 통해 최적의 잠재능력을 찾아보세요. 빠르고 직관적인 큐브 시뮬레이터!" />
  <meta name="keywords" content="메이플스토리, 큐브, 장비, 시뮬레이터, 잠재능력, 메이플 큐브 시뮬" />
</svelte:head>

<main class="cubePage">
  <header>
    <h1>메이플스토리 큐브 시뮬레이터</h1>
    <p class="page-description">
      캐릭터 장비 정보를 불러오고 잠재능력 옵션을 시뮬레이션하세요.
    </p>
  </header>

  <!-- 광고 슬롯 -->
  <div class="ad-slot" aria-hidden="true" style="margin: 1rem 0;"></div>

  <!-- 검색 박스 -->
  <SearchBox on:search={(e) => fetchEquipments(e.detail.characterName)} />

  <!-- 로딩 / 에러 메시지 -->
  {#if isLoading}
    <div class="loading-indicator" aria-live="polite">
      <p>캐릭터 정보를 불러오는 중입니다...</p>
    </div>
  {:else if errorMessage}
    <div class="error-message" role="alert">
      <p>{errorMessage}</p>
    </div>
  {/if}

  <!-- 콘텐츠 영역 -->
  <div class="contentWrapper">
    {#if characterInfo}
      <section class="equipment-section" aria-label="캐릭터 장비 정보">
        <h2>장비 정보</h2>
        <EquipmentScreen
          {characterInfo}
          equippedItems={characterEquipments?.item_equipment}
          {androidInfo}
          selectItem={handleSelectItem}
        />
      </section>

      <!-- 광고 슬롯 -->
      <div class="ad-slot" aria-hidden="true" style="margin: 1rem 0;"></div>
    {/if}

    <section class="simulator-section" aria-label="큐브 시뮬레이터">
      <h2>큐브 시뮬레이션</h2>
      <CubeSimulation selectedItem={itemInfo} />
    </section>
  </div>

  <!-- 콘텐츠 설명 영역 -->
  <section class="info-section">
    <h2>큐브 시뮬레이터 사용법</h2>
    <p>
      이 도구는 메이플스토리 내에서 큐브를 사용하기 전, 다양한 잠재능력 조합을 미리 실험해볼 수 있는 시뮬레이터입니다.
    </p>
    <ol>
      <li>캐릭터 이름을 입력하고 장비 정보를 검색하세요.</li>
      <li>장비 중 하나를 선택하여 시뮬레이션할 수 있습니다.</li>
      <li>다양한 큐브를 적용하여 최적의 옵션을 찾아보세요.</li>
    </ol>
  </section>
</main>

<style>
  .cubePage {
    padding: 1rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  header h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .page-description {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1rem;
  }

  .contentWrapper {
    margin-top: 1.5rem;
  }

  .info-section {
    margin-top: 2rem;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
  }

  .info-section h2 {
    font-size: 1.2rem;
  }

  .info-section ol {
    padding-left: 1.25rem;
  }
</style>
