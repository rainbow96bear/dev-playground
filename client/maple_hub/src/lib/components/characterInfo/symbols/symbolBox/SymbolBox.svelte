<script>
    import "./SymbolBox.css"

    export let symbol_icon;
    export let symbol_level;
</script>

<div>
    <img src={symbol_icon}/>
    <div>{symbol_level}</div>
</div>