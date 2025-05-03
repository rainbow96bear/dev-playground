<script>
    export let symbol;
</script>

<div id="arcane_symbol_box">
	<div class="arcaneSymbolInnerLine">
		{#if !symbol?.symbol_icon}
		<div class="locked-icon">🔒</div>
		{:else}
		<div class="arcane_symbol_img_box">
			<img class="arcane_img" src={symbol?.symbol_icon} alt="symbol_icon"/>
		</div>
		<div class="arcane_symbol_level_box arcane_level">Lv. {symbol?.symbol_level ? symbol?.symbol_level : 0}</div>
		<div class="arcane_gauge_box">
			{#if symbol?.symbol_level>=20}
			<div class="arcane_level">MAX Lv</div>
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
		{/if}
	</div>
</div>

<style>
    #arcane_symbol_box {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	outline: 2px solid #E7BD7A;

	background-color: #686DAD;
	overflow: hidden;
	width: 65px;
	height: 111px;
}

.arcaneSymbolInnerLine{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 58px;
	height: 104px;
	border-radius: 8px;
	outline: 2px solid #7F84C0;
}

.locked-icon {
	margin: auto;
  font-size: 1.5rem;
}

.arcane_symbol_img_box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	width: 100%;
	height: 50px;
	padding: 4px;
}

.arcane_img {
	height: 100%;
	width: auto;
	object-fit: contain;
}

.arcane_level {
	font-size: 0.8rem;
	color: white;
	text-shadow:
		-3px -3px 0 #5B569F,  
		3px -3px 0 #5B569F,
		-3px 3px 0 #5B569F,
		3px 3px 0 #5B569F;
}

.arcane_symbol_level_box {
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 900;
	width: 100%;
	height: 25px;
	padding: 2px;
}

.arcane_enforce {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4C5091;
	color: white;
	height: 13px;
	font-size: 0.7rem;
}

.arcane_gauge_box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 11px;
	border: none;
	padding: 4px;
}

.arcane_gague_base {
	width: 100%;
	height: 11px;
	background-color: #505489;
	border-radius: 4px;
	overflow: hidden;
}

.arcane_gauge_bar {
	height: 100%;
	background-color: #F0F4FF;
}

</style>