<script lang="ts">
	import { onMount } from 'svelte';
	import EquipmentDetailInfo from "$Components/Equipment/EquipmentDetailInfo/EquipmentDetailInfo.svelte";
	import { PotentialOptionToEng } from "$lib/constants/index";

	export let equipmentsInfo;
	export let className;

	let columnCount = 3;
	let columnedItems: any[][] = [];
	let selectedItems: any[] = [];

	$: if (equipmentsInfo && columnCount) {
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
		equipmentsInfo.item_equipment_preset_1.forEach((item: any, i: number) => {
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

	onMount(() => {
		updateColumnCount();
		window.addEventListener('resize', updateColumnCount);
		return () => window.removeEventListener('resize', updateColumnCount);
	});
</script>

<div class="{className}">
	<h2 tabindex="0">적용 프리셋</h2>
	<div class="columns-wrapper">
		{#each columnedItems as column}
			<div class="column">
				{#each column as item}
					<div class="item_box" role="region" aria-label={item?.item_name}>
						<div class="base_info_box">
							<img class="item_img" src={item?.item_icon} alt="{item?.item_name} 아이콘" />
							<div class="item_simple_info">
								<div class="item_name">{item?.item_name}</div>
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
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
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
