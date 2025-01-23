<script>
    import "./Arcane.css"

    export let symbol_icon;
    export let symbol_level;
</script>

<div id="symbol_box">
    <div class="symbol_img_box">
        <img src={symbol_icon} alt="symbol_icon"/>
    </div>
    <div class="symbol_level">{symbol_level}</div>
    <div class="gauge_box">
        <div class="gague_base">
            <div class="gauge_bar" style="width: {50}%"></div>
        </div>
    </div>
</div>