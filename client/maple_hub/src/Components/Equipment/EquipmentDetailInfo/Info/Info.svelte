<script lang="ts">
    import ItemImg from "$Components/ItemImg/ItemImg.svelte"
    export let item;
</script>

<div class="infoBox">
    <div class="firstInfo">
        <ItemImg itemImage={item?.item_shape_icon}/>
        <div class="textBox">
            <div class="battlePointText">전투력 증가량</div>
            <div class="battlePoint">현재 장착 중인 장비</div>
            <div class="equipmentPart">{item?.item_equipment_part}</div>
        </div>
    </div>
    <div class="equipmentLevel">
        <div>요구 레벨</div>
        <div>
          Lv. {item?.item_base_option.base_equipment_level - item?.item_add_option.equipment_level_decrease}
          <span>{#if item?.item_add_option.equipment_level_decrease > 0}
            ({item?.item_base_option.base_equipment_level} <span>- {item?.item_add_option.equipment_level_decrease}</span>)
          {/if}
        </span>
        </div>
      </div>
</div>

<style>
    .infoBox{
        width:100%;
    }
    .firstInfo{
        display: flex;
        justify-content: space-between;
    }
    .textBox{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .battlePointText{
        font-size: 0.75rem;
        color:#A4B1BA;
        width:fit-content;
    }
    .battlePoint{
        font-size:1.5rem;
        font-weight: bold;
        color:#A4B1BA;
    }
    .equipmentPart{
        font-size: 0.75rem;
        color: #B7BFC5;
        border-radius: 10px;
        background-color: #4A5461;
        width: fit-content;
        padding:0px 10px;
    }
    .equipmentLevel{
        display: flex;
        gap : 10px;
    }
    .equipmentLevel div:first-child{
        color:#B7BFC5;
        width: fit-content;
    }
    .equipmentLevel span{
        color:#B7BFC5;
    }
    .equipmentLevel span span{
        color: #73ca73;
    }
</style>