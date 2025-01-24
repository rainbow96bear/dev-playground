<script>
    import "./Authentic.css"
    export let symbol;
    export let icon;
</script>

<div class="authentic_hexagon-container">
    
    <div class="authentic_hexagon">
        <div class="authentic_symbol_img_box">
            <img class="authentic_img" src={icon} alt="authentic_symbol"/>
        </div>
        <div class="authentic_symbol_level_box authentic_level">Lv. {symbol?.symbol_level ? symbol?.symbol_level : 0}</div>
        <div class="authentic_gauge_box">
            {#if symbol?.symbol_level >= 11}
                <div class="authentic_symbol_level_box authentic_max_level">MAX Lv</div>
            {:else}
                <div class="authentic_gague_base">
                    {#if symbol.symbol_growth_count>=symbol.symbol_require_growth_count}
                    <div class="authentic_enforce">강화</div>
                    {:else} 
                    <div class="authentic_gauge_bar" style="width: {symbol.symbol_growth_count/symbol.symbol_require_growth_count*100}%"></div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>