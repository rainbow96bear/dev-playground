<script lang="ts">
    export let option_name: string;
    export let total_option: string;
    export let base_option: string;
    export let add_option: string | undefined;
    export let etc_option: string | undefined;
    export let starforce_option: string | undefined;

    let isPercent = ["데미지", "몬스터 방어율 무시", "올스탯", "최대 HP%", "최대 MP%"].includes(option_name);
    let display_name = option_name.replace("%", "");
</script>

<section class="itemOption" aria-label="장비 옵션 상세 정보" role="region">
    <h3 class="option-title visuallyHidden">{display_name} 정보</h3>
    <div class="option-value">
        <span>{display_name}</span> <span>+{total_option}{isPercent ? "%" : ""}</span>
    </div>
    {#if total_option != base_option}
        <div class="totalCalc">
            (<p>{base_option}</p>
            {#if add_option != "0" && add_option != undefined}
            <p class="add_option">+{add_option}{isPercent ? "%" : ""}</p>
            {/if}
            {#if etc_option != "0" && etc_option != undefined}
            <p class="etc_option">+{etc_option}{isPercent ? "%" : ""}</p>
            {/if}
            {#if starforce_option != "0" && starforce_option != undefined}
            <p class="starforce_option">+{starforce_option}{isPercent ? "%" : ""}</p>
            {/if})
        </div>
    {/if}
</section>

<style>
.itemOption {
	display: flex;
    gap:20px
}

.option-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.option-value {
    display: flex;
    justify-content: space-between;
    width:35%;
    font-size: 0.9rem;
    line-height: 1.4;
}

.add_option {
    padding-left: 3px;
    color: #73ca73;
}
.etc_option {
    padding-left: 3px;
    color: #afadff;
}
.starforce_option {
    padding-left: 3px;
    color: var(--unique_color);
}
span{
    font-size: 0.8rem;
}

.totalCalc{
    /* gap:3px; */
    display: flex;
}
</style>
