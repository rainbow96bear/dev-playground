<script lang="ts">
    import { page } from '$app/stores';
    import {PotentialOptionToEng} from "$lib/constants/index"
    import "./EquippedItems.css"

    const rootURL = `${window.location.protocol}//${window.location.host}`;
    let equippedItems: any;
    let isLoading = false;
    const fetchEquippedItems= async(name: string | null) => {
        if (!name) return;

        isLoading = true;
        try {
            const res = await fetch(`${rootURL}/api/data/equipped_items?name=${name}`);
            if (res.ok) {
                equippedItems = await res.json();
            } else {
                console.error('Failed to load equipped items');
            }
        } catch (error) {
            console.error('Error fetching equipped items:', error);
        } finally {
            isLoading = false;
        }
    }

    $: {
        const characterName = $page.url.searchParams.get('name');
        fetchEquippedItems(characterName);
    }
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
  