<script>
    import "./Symbol.css"

    export let symbol_icon;
    export let symbol_level;
</script>

<div id="symbol_container">
    <div class="symbol_img_box">
        <img src={symbol_icon} alt="symbol_icon"/>
    </div>
    <div class="symbol_level">{symbol_level}</div>
</div>