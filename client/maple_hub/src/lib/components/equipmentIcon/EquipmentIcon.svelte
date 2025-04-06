<script lang="ts">
    export let item;
    export let func: Function | null;

    import {PotentialOptionToEng} from "$lib/constants";
    import "./EquipmentIcon.css";
</script>

<div
    role="button"
    tabindex="0"
    on:click={() => func && func()}
    on:keydown={(e) => e.key === 'Enter' && func && func()}
    class="img_detail_box center {PotentialOptionToEng[item?.potential_option_grade]}_img_border {func == null ? '' : 'cursor_pointer'}"
>
    {#if item?.item_icon}
        <img class="img_detail" src={item.item_icon} alt="item img" />
    {/if}
</div>
