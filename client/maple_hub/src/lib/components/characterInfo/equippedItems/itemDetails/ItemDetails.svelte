<script lang="ts">
	import { PotentialOptionToEng } from "$lib/constants";
	import { onMount } from "svelte";
    import "./ItemDetails.css"
	import ItemOption from "./itemOption/ItemOption.svelte";
	import PotentialOption from "./potentialOption/PotentialOption.svelte";
	import StarForce from "./starForce/StarForce.svelte";
    
    export let item;
    let expire_date;
    onMount(()=>{
        if(item.date_expire){
            expire_date=formatDate(item.date_expire)
        }
    })
    
    function formatDate(input) {
        const date = new Date(input);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분까지 사용가능`;
    }
</script>

<div class="detail_info_box"> 
    {#if item.starforce > "0"}
    <div class="starforce_box center">    
        <StarForce req_level={item.item_base_option.base_equipment_level} startNum={item.starforce}/>
    </div> 
    {/if}
    <div class="item_name_box center">
        {item.item_name} {item.scroll_upgrade>0 ? `(+${item.scroll_upgrade})`: ""}
    </div>
    <div>
        {#if item.additional_potential_option_grade}
        <div class="potential_option_grade_box center">
            ({item.potential_option_grade} 아이템)
        </div>
        {/if}
        <div class="date_expire_box center">
            {expire_date}
        </div>
    </div>
    <div class="item_img_req_box divider">
        <div class="img_detail_box center {PotentialOptionToEng[item?.potential_option_grade]}_img_border">
            <img class="img_detail" src={item.item_icon} alt="item img"/>
        </div>
        <div class="req_level">
            REQ LEV : {item.item_base_option.base_equipment_level}
        </div>
    </div>
    <div class="divider">
        장비 분류 : {item.item_equipment_part}
        {#if item.item_total_option.str > 0}
            <ItemOption
                option_name={"STR"}
                total_option={item.item_total_option.str}
                base_option={item.item_base_option.str}
                add_option={item.item_add_option.str}
                etc_option={item.item_etc_option.str}
                starforce_option={item.item_starforce_option.str}
            />
        {/if}
        {#if item.item_total_option.dex > 0}
            <ItemOption
                option_name={"DEX"}
                total_option={item.item_total_option.dex}
                base_option={item.item_base_option.dex}
                add_option={item.item_add_option.dex}
                etc_option={item.item_etc_option.dex}
                starforce_option={item.item_starforce_option.dex}
            />
        {/if}
        {#if item.item_total_option.int > 0}
            <ItemOption
                option_name={"INT"}
                total_option={item.item_total_option.int}
                base_option={item.item_base_option.int}
                add_option={item.item_add_option.int}
                etc_option={item.item_etc_option.int}
                starforce_option={item.item_starforce_option.int}
            />
        {/if}
        {#if item.item_total_option.luk > 0}
            <ItemOption
                option_name={"LUK"}
                total_option={item.item_total_option.luk}
                base_option={item.item_base_option.luk}
                add_option={item.item_add_option.luk}
                etc_option={item.item_etc_option.luk}
                starforce_option={item.item_starforce_option.luk}
            />
        {/if}
        {#if item.item_total_option.max_hp > 0}
            <ItemOption
                option_name={"최대 HP"}
                total_option={item.item_total_option.max_hp}
                base_option={item.item_base_option.max_hp}
                add_option={item.item_add_option.max_hp}
                etc_option={item.item_etc_option.max_hp}
                starforce_option={item.item_starforce_option.max_hp}
            />
        {/if}
        {#if item.item_total_option.max_hp_rate > 0}
            <ItemOption
                option_name={"최대 HP%"}
                total_option={item.item_total_option.max_hp_rate}
                base_option={item.item_base_option.max_hp_rate}
                add_option={item.item_add_option.max_hp_rate}
                etc_option={item.item_etc_option.max_hp_rate}
                starforce_option={item.item_starforce_option.max_hp_rate}
            />
        {/if}
        {#if item.item_total_option.max_mp > 0}
            <ItemOption
                option_name={"최대 MP"}
                total_option={item.item_total_option.max_mp}
                base_option={item.item_base_option.max_mp}
                add_option={item.item_add_option.max_mp}
                etc_option={item.item_etc_option.max_mp}
                starforce_option={item.item_starforce_option.max_mp}
            />
        {/if}
        {#if item.item_total_option.max_mp_rate > 0}
            <ItemOption
                option_name={"최대 MP%"}
                total_option={item.item_total_option.max_mp_rate}
                base_option={item.item_base_option.max_mp_rate}
                add_option={item.item_add_option.max_mp_rate}
                etc_option={item.item_etc_option.max_mp_rate}
                starforce_option={item.item_starforce_option.max_mp_rate}
            />
        {/if}
        {#if item.item_total_option.attack_power > 0}
            <ItemOption
                option_name={"공격력"}
                total_option={item.item_total_option.attack_power}
                base_option={item.item_base_option.attack_power}
                add_option={item.item_add_option.attack_power}
                etc_option={item.item_etc_option.attack_power}
                starforce_option={item.item_starforce_option.attack_power}
            />
        {/if}
        {#if item.item_total_option.magic_power > 0}
            <ItemOption
                option_name={"마력"}
                total_option={item.item_total_option.magic_power}
                base_option={item.item_base_option.magic_power}
                add_option={item.item_add_option.magic_power}
                etc_option={item.item_etc_option.magic_power}
                starforce_option={item.item_starforce_option.magic_power}
            />
        {/if}
        {#if item.item_total_option.armor > 0}
            <ItemOption
                option_name={"방어력"}
                total_option={item.item_total_option.armor}
                base_option={item.item_base_option.armor}
                add_option={item.item_add_option.armor}
                etc_option={item.item_etc_option.armor}
                starforce_option={item.item_starforce_option.armor}
            />
        {/if}

        {#if item.item_total_option.speed > 0}
            <ItemOption
                option_name={"이동속도"}
                total_option={item.item_total_option.speed}
                base_option={item.item_base_option.speed}
                add_option={item.item_add_option.speed}
                etc_option={item.item_etc_option.speed}
                starforce_option={item.item_starforce_option.speed}
            />
        {/if}

        {#if item.item_total_option.jump > 0}
            <ItemOption
                option_name={"점프력"}
                total_option={item.item_total_option.jump}
                base_option={item.item_base_option.jump}
                add_option={item.item_add_option.jump}
                etc_option={item.item_etc_option.jump}
                starforce_option={item.item_starforce_option.jump}
            />
        {/if}

        {#if item.item_total_option.boss_damage > 0}
            <ItemOption
                option_name={"보스 몬스터 공격 시 데미지"}
                total_option={item.item_total_option.boss_damage}
                base_option={item.item_base_option.boss_damage}
                add_option={item.item_add_option.boss_damage}
                etc_option={item.item_etc_option.boss_damage}
                starforce_option={item.item_starforce_option.boss_damage}
            />
        {/if}

        {#if item.item_total_option.ignore_monster_armor > 0}
            <ItemOption
                option_name={"몬스터 방어율 무시"}
                total_option={item.item_total_option.ignore_monster_armor}
                base_option={item.item_base_option.ignore_monster_armor}
                add_option={item.item_add_option.ignore_monster_armor}
                etc_option={item.item_etc_option.ignore_monster_armor}
                starforce_option={item.item_starforce_option.ignore_monster_armor}
            />
        {/if}

        {#if item.item_total_option.damage>0}
            <ItemOption
                option_name={"데미지"}
                total_option={item.item_total_option.damage}
                base_option={item.item_base_option.damage}
                add_option={item.item_add_option.damage}
                etc_option={item.item_etc_option.damage}
                starforce_option={item.item_starforce_option.damage}
            />
        {/if}
        {#if item.item_total_option.all_stat>0}
            <ItemOption
                option_name={"올스탯"}
                total_option={item.item_total_option.all_stat}
                base_option={item.item_base_option.all_stat}
                add_option={item.item_add_option.all_stat}
                etc_option={item.item_etc_option.all_stat}
                starforce_option={item.item_starforce_option.all_stat}
            />
        {/if}
        {#if item.item_total_option.equipment_level_decrease>0}
            <ItemOption
                option_name={"착용 레벨 감소"}
                total_option={item.item_total_option.equipment_level_decrease}
                base_option={item.item_base_option.equipment_level_decrease}
                add_option={item.item_add_option.equipment_level_decrease}
                etc_option={item.item_etc_option.equipment_level_decrease}
                starforce_option={item.item_starforce_option.equipment_level_decrease}
            />
        {/if}
        {#if item.cuttable_count != 255}
            <div class="cuttable_count">가위 사용 가능 횟수 : {item.cuttable_count}회</div>
        {/if}
    </div>
    {#if item.potential_option_grade}
        <PotentialOption
            potential_type={"잠재옵션"}
            option_grade={item?.potential_option_grade}
            option1={item.potential_option_1}
            option2={item.potential_option_2}
            option3={item.potential_option_3}
        />
    {/if}
    {#if item.additional_potential_option_grade}
        <PotentialOption
            potential_type={"에디셔널 잠재옵션"}
            option_grade={item?.additional_potential_option_grade}
            option1={item.additional_potential_option_1}
            option2={item.additional_potential_option_2}
            option3={item.additional_potential_option_3}
        />
    {/if}
    {#if item.item_exceptional_option.exceptional_upgrade>0}
        <div class="divider">
            <div class="potential_option_grade_detail_box">
                <div class="exceptional_detail_icon">
                    EX
                </div>
                <div class="exceptional_detail">
                    익셉셔널
                </div>
            </div>
            <ul>
                올스텟 : + {item.item_exceptional_option.str}
            </ul>
            <ul>
                최대 HP / 최대 MP : + {item.item_exceptional_option.max_hp}
            </ul>
            <ul>
                공격력 / 마력 : + {item.item_exceptional_option.attack_power}
            </ul>
            <ul>
                익셉셔널 강화 {item.item_exceptional_option.exceptional_upgrade}회 적용
            </ul>
        </div>
    {/if}
    {#if item.item_description}
        <div class="divider">
            {item.item_description}
        </div>
    {/if}
</div>