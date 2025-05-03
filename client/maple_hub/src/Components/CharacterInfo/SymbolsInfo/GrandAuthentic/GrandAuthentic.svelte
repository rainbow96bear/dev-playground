<script>
    export let symbol;
</script>

<div class="authentic_hexagon-container">
    
    <div class="authentic_hexagon">
		{#if !symbol?.symbol_icon}
		<div class="locked-icon">🔒</div>
	  {:else}
        <div class="authentic_symbol_img_box">
            <img class="authentic_img" src={symbol?.symbol_icon} alt="authentic_symbol"/>
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
		{/if}
    </div>
</div>

<style>
    .authentic_hexagon-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: fit-content;
	width: 65px;
	height: 111px;
	clip-path: polygon(50% 0%, 100% 11%, 100% 89%, 50% 100%, 0% 89%, 0% 11%);
	background-color: #AA8B95; /* 테두리 색상 */
}

.authentic_hexagon {
	display: flex;
	flex-direction: column;
	padding: 4px 0px;
	width: calc(100% - 4px);
	height: calc(100% - 4px);
	position: relative;
	clip-path: polygon(50% 1%, 100% 11%, 100% 89%, 50% 99%, 0% 89%, 0% 11%);
	overflow: hidden;
}

.authentic_hexagon::before,
.authentic_hexagon::after {
	content: "";
	position: absolute;
	width: 50%;
	height: 100%;
	top: 0;
	z-index: -1;
}

.authentic_hexagon::before {
	left: 0;
	background: linear-gradient(to bottom, #8288CF, #725983,#926D91); /* 왼쪽 위->아래 */
}

.authentic_hexagon::after {
	right: 0;
	background: linear-gradient(to bottom, #7B79FF, #6E6C98,#926D91); /* 오른쪽 위->아래 */
}

.locked {
  background: #85a8c7;
}

.locked-icon {
	margin: auto;
  font-size: 1.5rem;
}

.authentic_symbol_img_box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 0px 4px;
	width: 100%;
}

.authentic_img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.authentic_max_level {
	color: white;
	font-size: 0.8rem;
}

.authentic_level {
	color: white;
	font-size: 1rem;
}

.authentic_symbol_level_box {
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: 900;
	width: 100%;
	padding: 2px;
}

.authentic_gauge_box {
	width: 100%;
	height: 25px;
	border: none;
	padding: 4px;
}

.authentic_gague_base {
	width: 100%;
	height: 13px;
	background-color: var(--authentic_gauge_base);
	border-radius: 2px;
	overflow: hidden;
}

.authentic_enforce {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(255, 187, 255);
	color: white;
	height: 13px;
	font-size: 0.7rem;
}

.authentic_gauge_bar {
	height: 100%;
	width: 0%;
	background-color: var(--authentic_gauge_bar);
}


</style>