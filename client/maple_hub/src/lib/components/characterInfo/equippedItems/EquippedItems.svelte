<script lang="ts">
    import { page } from '$app/stores';
    import {PotentialOptionToEng} from "$lib/constants/index"
    import "./EquippedItems.css"
	import ItemDetails from './itemDetails/ItemDetails.svelte';

    const rootURL = import.meta.env.VITE_ROOT_URL;
    let equippedItems: any;
    let isLoading = false;
    let selectedItems: any[] = [];

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

    const toggleItem = (item: any) => {
        const index = selectedItems.indexOf(item);
        if (index === -1) {
            selectedItems = [...selectedItems, item]; // 아이템 추가
        } else {
            selectedItems = selectedItems.filter((i) => i !== item); // 아이템 제거
        }
    };
  </script>
  
<div>
    <p>적용 프리셋 {equippedItems?.preset_no}</p>
    <div id="item_explain_container">
    {#each equippedItems?.item_equipment as item}
    <div class="item_explain_box {selectedItems.includes(item)? "" : "item_explain_box_height"}">
        <div class="item_simple_info">
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
            <div class="show_button_box">
                <button on:click={() => toggleItem(item)}>{selectedItems.includes(item)? "▲" : "▼"}</button>
            </div>
        </div>
        {#if selectedItems.includes(item)}
            <div class="center detail_container">
                <ItemDetails item={item}></ItemDetails>
            </div>
        {/if}
    </div>
    {/each}
    </div>
</div>
