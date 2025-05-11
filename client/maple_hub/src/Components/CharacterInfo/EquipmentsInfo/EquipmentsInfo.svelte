<script lang="ts">
	import { onMount } from 'svelte';
	import EquipmentDetailInfo from "$Components/Equipment/EquipmentDetailInfo/EquipmentDetailInfo.svelte";
	import { PotentialOptionToEng } from "$lib/constants/index";

	export let equipmentsInfo;
	export let className;

	let columnCount = 3;
	let columnedItems: any[][] = [];
	let selectedItems: any[] = [];

	let selectedPreset = 1; // 기본 프리셋 번호

	$: if (equipmentsInfo && columnCount && selectedPreset) {
		splitIntoColumns();
	}

	const getGradeIcon = (grade: string) => {
		const map = {
			"레어": "R",
			"에픽": "E",
			"유니크": "U",
			"레전드리": "L"
		};
		return map[grade] ?? "";
	};

	const updateColumnCount = () => {
		const width = window.innerWidth;
		if (width >= 1200) columnCount = 3;
		else if (width >= 900) columnCount = 2;
		else columnCount = 1;
		splitIntoColumns();
	};

	const splitIntoColumns = () => {
		columnedItems = Array.from({ length: columnCount }, () => []);
		const presetKey = `item_equipment_preset_${selectedPreset}`;
		const items = equipmentsInfo?.[presetKey] || [];
		items.forEach((item: any, i: number) => {
			columnedItems[i % columnCount].push(item);
		});
	};

	const toggleItem = (item: any) => {
		if (selectedItems.includes(item)) {
			selectedItems = selectedItems.filter(i => i !== item);
		} else {
			selectedItems = [...selectedItems, item];
		}
	};

	const changePreset = (preset: number) => {
		selectedPreset = preset;
		selectedItems = [];
	};

	onMount(() => {
		updateColumnCount();
		window.addEventListener('resize', updateColumnCount);
		return () => window.removeEventListener('resize', updateColumnCount);
	});
</script>

<div class="{className}">
	<h2 tabindex="0">캐릭터 장비 프리셋</h2>
	<p>아래는 캐릭터가 착용 중인 장비 정보입니다. 장비의 아이콘을 클릭하면 상세 정보를 확인할 수 있습니다.</p>

	<!-- 프리셋 선택 버튼 -->
	<div class="preset-buttons" role="group" aria-label="프리셋 선택">
		{#each [1, 2, 3] as no}
			<button
				class:selected={selectedPreset === no}
				on:click={() => changePreset(no)}
				aria-pressed={selectedPreset === no}
			>
				프리셋 {no}
			</button>
		{/each}
	</div>

	<div class="ad-slot" aria-hidden="true" style="margin: 1rem 0;"></div>

	<div class="columns-wrapper">
		{#each columnedItems as column}
			<section class="column">
				{#each column as item}
					<article class="item_box" role="region" aria-label={item?.item_name}>
						<div class="base_info_box">
							<img class="item_img" src={item?.item_icon} alt="{item?.item_name} 아이콘" loading="lazy" />
							<div class="item_simple_info">
								<h3 class="item_name">{item?.item_name}</h3>
								<p class="item_description visually-hidden">
									등급:
									{#if item?.potential_option_grade}
										{item.potential_option_grade}
									{/if}
									{#if item?.additional_potential_option_grade}
										, 에디셔널: {item.additional_potential_option_grade}
									{/if}
								</p>

								<div class="potential_box">
									{#if getGradeIcon(item.potential_option_grade)}
										<div class="potential_level {PotentialOptionToEng[item?.potential_option_grade]}" aria-label="잠재옵션 등급">
											{getGradeIcon(item.potential_option_grade)}
										</div>
									{/if}
									{#if getGradeIcon(item.additional_potential_option_grade)}
										<div class="potential_level {PotentialOptionToEng[item?.additional_potential_option_grade]}" aria-label="에디셔널 잠재옵션 등급">
											{getGradeIcon(item.additional_potential_option_grade)}
										</div>
									{/if}
								</div>
							</div>
							<button
								class="show_button"
								on:click={() => toggleItem(item)}
								aria-label="{item?.item_name} 상세 보기 토글"
								title="상세 보기"
							>
								{selectedItems.includes(item) ? '▲' : '▼'}
							</button>
						</div>
						{#if selectedItems.includes(item)}
							<div class="detail_container">
								<EquipmentDetailInfo item={item} />
							</div>
						{/if}
					</article>
				{/each}
			</section>
		{/each}
	</div>
</div>

<style>
	.preset-buttons {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.preset-buttons button {
		padding: 6px 12px;
		border: 1px solid #ccc;
		border-radius: 6px;
		background-color: #f5f5f5;
		cursor: pointer;
		font-size: 0.875rem;
		transition: background-color 0.2s;
	}

	.preset-buttons button.selected,
	.preset-buttons button[aria-pressed="true"] {
		background-color: #007bff;
		color: white;
		border-color: #007bff;
	}

	.columns-wrapper {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-top: 1rem;
	}

	.columns-wrapper {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-top: 1rem;
	}

	.column {
		flex: 1 1 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.item_box {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 12px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		min-height: 64px;
	}

	.base_info_box {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.item_img {
		width: 35px;
		height: 35px;
		object-fit: contain;
		border-radius: 4px;
	}

	.item_simple_info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.item_name {
		font-weight: bold;
		font-size: 0.9rem;
		color: #222;
	}

	.item_description {
		font-size: 0.75rem;
		color: #444;
	}

	.potential_box {
		display: flex;
		gap: 0.5rem;
	}

	.potential_level {
		padding: 3px 6px;
		border-radius: 4px;
		font-size: 0.65rem;
	}

	.show_button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		color: #333;
	}

	.detail_container{
		padding-top: 10px;
	}

	@media (max-width: 640px) {
		.columns-wrapper {
			flex-direction: column;
		}
	}
</style>
