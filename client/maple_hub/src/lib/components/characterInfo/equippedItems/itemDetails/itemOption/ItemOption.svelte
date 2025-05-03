<script lang="ts">
    export let option_name:string;
    export let total_option:string;
    export let base_option:string;
    export let add_option:string|undefined;
    export let etc_option:string|undefined;
    export let starforce_option:string|undefined;

    let isPercent = (option_name == "데미지"
                        || option_name == "몬스터 방어율 무시"
                        || option_name == "올스탯"
                        || option_name == "최대 HP%"
                        || option_name == "최대 MP%")
    let display_name = option_name.replace("%", "");
</script>

<div class="item_option">
    {#if option_name == "착용 레벨 감소"}
        {#if total_option != undefined}
            <div class="add_option">{display_name} : -{total_option}</div>
        {/if}
    {:else}
        {#if (add_option == "0" || add_option == undefined) &&
             (etc_option == "0" || etc_option == undefined) && 
             (starforce_option == "0" || starforce_option == undefined)}
            <div>{display_name} : +{total_option}{isPercent?"%":""}</div>
        {:else}
            <div class="option_pointer">{display_name} : +{total_option}{isPercent?"%":""} </div>
            <div class="base_option"> {base_option}
                {#if add_option != "0" && add_option != undefined}
                    <div class="add_option">+{add_option}{isPercent?"%":""}</div>
                {/if}
                {#if etc_option != "0" && etc_option != undefined}
                    <div class="etc_option">+{etc_option}{isPercent?"%":""}</div>
                {/if}
                {#if starforce_option != "0" && starforce_option != undefined}
                    <div class="starforce_option">+{starforce_option}{isPercent?"%":""}</div>
                {/if}
            </div>
        {/if}
    {/if}
    
</div>