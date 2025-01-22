<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import {PotentialOptionToEng} from "$lib/constants/index"
    import "./EquippedItems.css"
    let equippedItems: any;

    onMount(async () => {
      const characterName = $page.url.searchParams.get('name');
      if (characterName == undefined){
        return
      }
      
        const res = await fetch(`/api/data/equipped_items?name=${characterName}`);
        if (res.ok) {
          equippedItems = await res.json();
        } else {
          console.error('Failed to load equipped items');
        }
      
    });
  
  </script>
  
  <div>
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
  </div>
  