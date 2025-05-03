<script lang="ts">
    import Starforce from "$Components/Equipment/EquipmentDetailInfo/Starforce/Starforce.svelte";
    import Info from "$Components/Equipment/EquipmentDetailInfo/Info/Info.svelte";
    import Option from "$Components/Equipment/EquipmentDetailInfo/Option/Option.svelte";
    import PotentialOption from "$Components/Equipment/EquipmentDetailInfo/PotentialOption/PotentialOption.svelte";
    export let item;
</script>

<section class="detailInfo" aria-labelledby="equipmentDetailTitle" role="region">
    <h3 id="equipmentDetailTitle" class="visuallyHidden">장비 상세 정보</h3>
    {#if item.starforce > "0"}
        <Starforce
            req_level={item.item_base_option.base_equipment_level}
            startNum={item.starforce}
        />
    {/if}
    <h3 class="itemName">{item.item_name}</h3>
    <div class="horizontalDivider"></div>
    <Info item={item}></Info>
    <div class="horizontalDivider"></div>
    <div class="baseOption">
        {#if item.item_total_option.str > 0}
            <Option
                option_name={"STR"}
                total_option={item.item_total_option.str}
                base_option={item.item_base_option.str}
                add_option={item.item_add_option.str}
                etc_option={item.item_etc_option.str}
                starforce_option={item.item_starforce_option.str}
            />
        {/if}
        {#if item.item_total_option.dex > 0}
            <Option
                option_name={"DEX"}
                total_option={item.item_total_option.dex}
                base_option={item.item_base_option.dex}
                add_option={item.item_add_option.dex}
                etc_option={item.item_etc_option.dex}
                starforce_option={item.item_starforce_option.dex}
            />
        {/if}
        {#if item.item_total_option.int > 0}
            <Option
                option_name={"INT"}
                total_option={item.item_total_option.int}
                base_option={item.item_base_option.int}
                add_option={item.item_add_option.int}
                etc_option={item.item_etc_option.int}
                starforce_option={item.item_starforce_option.int}
            />
        {/if}
        {#if item.item_total_option.luk > 0}
            <Option
                option_name={"LUK"}
                total_option={item.item_total_option.luk}
                base_option={item.item_base_option.luk}
                add_option={item.item_add_option.luk}
                etc_option={item.item_etc_option.luk}
                starforce_option={item.item_starforce_option.luk}
            />
        {/if}
        {#if item.item_total_option.max_hp > 0}
            <Option
                option_name={"최대 HP"}
                total_option={item.item_total_option.max_hp}
                base_option={item.item_base_option.max_hp}
                add_option={item.item_add_option.max_hp}
                etc_option={item.item_etc_option.max_hp}
                starforce_option={item.item_starforce_option.max_hp}
            />
        {/if}
        {#if item.item_total_option.max_hp_rate > 0}
            <Option
                option_name={"최대 HP%"}
                total_option={item.item_total_option.max_hp_rate}
                base_option={item.item_base_option.max_hp_rate}
                add_option={item.item_add_option.max_hp_rate}
                etc_option={item.item_etc_option.max_hp_rate}
                starforce_option={item.item_starforce_option.max_hp_rate}
            />
        {/if}
        {#if item.item_total_option.max_mp > 0}
            <Option
                option_name={"최대 MP"}
                total_option={item.item_total_option.max_mp}
                base_option={item.item_base_option.max_mp}
                add_option={item.item_add_option.max_mp}
                etc_option={item.item_etc_option.max_mp}
                starforce_option={item.item_starforce_option.max_mp}
            />
        {/if}
        {#if item.item_total_option.max_mp_rate > 0}
            <Option
                option_name={"최대 MP%"}
                total_option={item.item_total_option.max_mp_rate}
                base_option={item.item_base_option.max_mp_rate}
                add_option={item.item_add_option.max_mp_rate}
                etc_option={item.item_etc_option.max_mp_rate}
                starforce_option={item.item_starforce_option.max_mp_rate}
            />
        {/if}
        {#if item.item_total_option.attack_power > 0}
            <Option
                option_name={"공격력"}
                total_option={item.item_total_option.attack_power}
                base_option={item.item_base_option.attack_power}
                add_option={item.item_add_option.attack_power}
                etc_option={item.item_etc_option.attack_power}
                starforce_option={item.item_starforce_option.attack_power}
            />
        {/if}
        {#if item.item_total_option.magic_power > 0}
            <Option
                option_name={"마력"}
                total_option={item.item_total_option.magic_power}
                base_option={item.item_base_option.magic_power}
                add_option={item.item_add_option.magic_power}
                etc_option={item.item_etc_option.magic_power}
                starforce_option={item.item_starforce_option.magic_power}
            />
        {/if}
        {#if item.item_total_option.armor > 0}
            <Option
                option_name={"방어력"}
                total_option={item.item_total_option.armor}
                base_option={item.item_base_option.armor}
                add_option={item.item_add_option.armor}
                etc_option={item.item_etc_option.armor}
                starforce_option={item.item_starforce_option.armor}
            />
        {/if}

        {#if item.item_total_option.speed > 0}
            <Option
                option_name={"이동속도"}
                total_option={item.item_total_option.speed}
                base_option={item.item_base_option.speed}
                add_option={item.item_add_option.speed}
                etc_option={item.item_etc_option.speed}
                starforce_option={item.item_starforce_option.speed}
            />
        {/if}

        {#if item.item_total_option.jump > 0}
            <Option
                option_name={"점프력"}
                total_option={item.item_total_option.jump}
                base_option={item.item_base_option.jump}
                add_option={item.item_add_option.jump}
                etc_option={item.item_etc_option.jump}
                starforce_option={item.item_starforce_option.jump}
            />
        {/if}

        {#if item.item_total_option.boss_damage > 0}
            <Option
                option_name={"보스 몬스터 공격 시 데미지"}
                total_option={item.item_total_option.boss_damage}
                base_option={item.item_base_option.boss_damage}
                add_option={item.item_add_option.boss_damage}
                etc_option={item.item_etc_option.boss_damage}
                starforce_option={item.item_starforce_option.boss_damage}
            />
        {/if}

        {#if item.item_total_option.damage>0}
            <Option
                option_name={"데미지"}
                total_option={item.item_total_option.damage}
                base_option={item.item_base_option.damage}
                add_option={item.item_add_option.damage}
                etc_option={item.item_etc_option.damage}
                starforce_option={item.item_starforce_option.damage}
            />
        {/if}
        {#if item.item_total_option.all_stat>0}
            <Option
                option_name={"올스탯"}
                total_option={item.item_total_option.all_stat}
                base_option={item.item_base_option.all_stat}
                add_option={item.item_add_option.all_stat}
                etc_option={item.item_etc_option.all_stat}
                starforce_option={item.item_starforce_option.all_stat}
            />
        {/if}

        {#if item.item_total_option.ignore_monster_armor > 0}
        <Option
            option_name={"몬스터 방어율 무시"}
            total_option={item.item_total_option.ignore_monster_armor}
            base_option={item.item_base_option.ignore_monster_armor}
            add_option={item.item_add_option.ignore_monster_armor}
            etc_option={item.item_etc_option.ignore_monster_armor}
            starforce_option={item.item_starforce_option.ignore_monster_armor}
        />
    {/if}
    </div>
    <div class="horizontalDivider"></div>
    <PotentialOption item={item}></PotentialOption>
    {#if item.cuttable_count != 255}
            <div class="cuttable_count">가위 사용 잔여 횟수 : {item.cuttable_count} / 10 </div>
        {/if}
</section>

<style>
.detailInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
	max-width: 450px;
    height: fit-content;
    color: white;
    background-color: #2E4250;
    border: 1px solid lightgray;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0);
    font-size: 0.8rem;
    line-height: 1.3;
    padding:5px 15px;
    gap:5px;
}

.visuallyHidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.horizontalDivider {
    border-top: 2px solid rgba(40, 46, 53, 0.8);
    background-color: rgba(110, 110, 110, 0.8);
    height: 3px;
    width: 100%;
}
.baseOption{
width:100%;
}

.cuttable_count{
    width:100%;
    color:#FF6633;
}
</style>
