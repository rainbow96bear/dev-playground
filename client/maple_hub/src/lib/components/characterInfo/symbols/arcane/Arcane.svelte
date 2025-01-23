<script>
    import "./Arcane.css"

    export let symbol;
    export let icon;
</script>

<div id="arcane_symbol_box">
    <div class="arcane_symbol_img_box">
        <img class="arcane_img" src={icon} alt="symbol_icon"/>
    </div>
    <div class="arcane_symbol_level">Lv. {symbol?.symbol_level ? symbol?.symbol_level : 0}</div>
    <div class="arcane_gauge_box">
        <div class="arcane_gague_base">
            <div class="arcane_gauge_bar" style="width: {symbol.symbol_growth_count/symbol.symbol_require_growth_count*100}%"></div>
        </div>
    </div>
</div>