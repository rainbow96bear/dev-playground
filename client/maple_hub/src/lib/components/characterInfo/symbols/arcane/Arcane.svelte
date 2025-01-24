<script>
    import "./Arcane.css"

    export let symbol;
    export let icon;
</script>

<div id="arcane_symbol_box">
    <div class="arcane_symbol_img_box">
        <img class="arcane_img" src={icon} alt="symbol_icon"/>
    </div>
    <div class="arcane_symbol_level_box arcane_level">Lv. {symbol?.symbol_level ? symbol?.symbol_level : 0}</div>
    <div class="arcane_gauge_box">
    {#if symbol?.symbol_level>=20}
        <div class="arcane_max_level">MAX Lv</div>
    {:else}
        <div class="arcane_gague_base">
            {#if symbol.symbol_growth_count>=symbol.symbol_require_growth_count}
            <div class="arcane_enforce">강화</div>
            {:else}    
            <div class="arcane_gauge_bar" style="width: {symbol.symbol_growth_count/symbol.symbol_require_growth_count*100}%"></div>
            {/if}
        </div>
    {/if}
    </div>
</div>