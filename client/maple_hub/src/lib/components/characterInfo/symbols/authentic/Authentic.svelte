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
        <div class="authentic_symbol_level">Lv. {symbol?.symbol_level ? symbol?.symbol_level : 0}</div>
        <div class="authentic_gauge_box">
            <div class="authentic_gague_base">
                <div class="authentic_gauge_bar" style="width: {symbol.symbol_growth_count/symbol.symbol_require_growth_count*100}%"></div>
            </div>
        </div>
    </div>
</div>