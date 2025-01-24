<script lang="ts">
  import { page } from '$app/stores';
  import { PotentialOptionToEng } from "$lib/constants/index";
  import "./EquippedItems.css";
  import LoadingSpinner from '$lib/components/loadingSpinner/LoadingSpinner.svelte';
  import { onDestroy, onMount } from 'svelte';

  let equippedItems: any = null;
  let isLoading = false;

  // `fetchEquippedItems` 함수 정의
  const fetchEquippedItems = async (characterName: string | null) => {
    if (!characterName) return;

    isLoading = true;
    try {
      const res = await fetch(`/api/data/equipped_items?name=${characterName}`);
      if (res.ok) {
        equippedItems = await res.json();
      } else {
        console.error('Failed to load equipped items');
        equippedItems = null;
      }
    } catch (err) {
      console.error('Error fetching equipped items:', err);
    } finally {
      isLoading = false;
    }
  };

  // `$page`를 구독하여 URL이 변경될 때 작동
  const unsubscribe = page.subscribe(($page) => {
    const characterName = $page.url.searchParams.get('name');
    fetchEquippedItems(characterName);
  });
  onMount(()=>{
    page.subscribe(($page) => {
    const characterName = $page.url.searchParams.get('name');
    fetchEquippedItems(characterName);
  });
  })
  // 메모리 누수를 방지하기 위해 구독 해제
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div>
  {#if isLoading}
    <LoadingSpinner></LoadingSpinner>
  {:else if equippedItems}
    <p>적용 프리셋 {equippedItems?.preset_no}</p>
    <div id="item_explain_container">
      {#each equippedItems?.item_equipment as item}
      <div class="item_explain_box">
          <div class="item_img_box">
              <img class="item_img" src={item?.item_icon} alt="착용 장비 이미지">
          </div>
          <div class="sample_info_box">
              <div class="item_name">{item?.item_name}</div>
              <div class="potential_level_box">
                <div class="potential-level {PotentialOptionToEng[item?.potential_option_grade]}">{item?.potential_option_grade}</div> 
                <div class="potential-level {PotentialOptionToEng[item?.additional_potential_option_grade]}">{item?.additional_potential_option_grade}</div>
              </div>
          </div>
      </div>
      {/each}
    </div>
  {:else}
    <p>장비 정보를 가져올 수 없습니다.</p>
  {/if}
</div>
