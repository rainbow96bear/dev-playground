<script lang="ts">
	import CharacterInfo from '$Components/CharacterInfo/CharacterInfo.svelte';
	import EquipmentsInfo from '$Components/CharacterInfo/EquipmentsInfo/EquipmentsInfo.svelte';
	import SymbolsInfo from '$Components/CharacterInfo/SymbolsInfo/SymbolsInfo.svelte';
	import HexaSkillsInfo from '$Components/CharacterInfo/HexaSkillsInfo/HexaSkillsInfo.svelte'; // ← 추가

	import "./+page.css";

	export let data: any;
	export let characterName: string;
	const description = "캐릭터의 착용 장비, 헥사 스킬, 심볼에 대한 정보";
	let selectedComponent = "EquippedItems";
	const selectComponent = (componentName: string) => {
		selectedComponent = componentName;
	};

	$: characterInfo = data.characterInfo;
	$: characterEquipments = data.characterEquipments;
	$: characterHexaSkills = data.characterHexaSkills;
	$: characterSymbols = data.characterSymbols;
</script>

<svelte:head>
	<title>{characterName} - 캐릭터 정보</title>
	<meta name="description" content="{description}" />
	<meta property="og:title" content="{characterName} - 캐릭터 정보" />
	<meta property="og:description" content="{description}" />
	<meta property="og:url" content="{import.meta.env.BASE_URL}/character/info?name={characterName}" />
	<meta property="twitter:title" content="{characterName} - 캐릭터 정보" />
	<meta property="twitter:description" content="{description}" />
</svelte:head>

	<div class="character_info_box">
		<CharacterInfo className="characterInfoCharacterInfo" characterInfo={characterInfo}/>
		<div class="function_button_box">
			<button class:selected={selectedComponent === 'EquippedItems'} on:click={() => selectComponent('EquippedItems')}>장비</button>
			<button class:selected={selectedComponent === 'HexaSkills'} on:click={() => selectComponent('HexaSkills')}>헥사 스킬</button>
			<button class:selected={selectedComponent === 'Symbols'} on:click={() => selectComponent('Symbols')}>심볼</button>
		</div>
			<div
				class:hidden={selectedComponent !== 'EquippedItems'}
				aria-hidden={selectedComponent !== 'EquippedItems'}
			>
				<EquipmentsInfo equipmentsInfo={characterEquipments} />
			</div>
	
			<div
				class:hidden={selectedComponent !== 'HexaSkills'}
				aria-hidden={selectedComponent !== 'HexaSkills'}
			>
				<HexaSkillsInfo hexaSkillsInfo={characterHexaSkills} />
			</div>
	
			<div
				class:hidden={selectedComponent !== 'Symbols'}
				aria-hidden={selectedComponent !== 'Symbols'}
			>
				<SymbolsInfo symbolsInfo={characterSymbols} />
			</div>
	</div>

<style>
	.hidden {
		display: none;
	}
</style>