<script lang="ts">
	import ItemImg from "$Components/ItemImg/ItemImg.svelte";
	
	// 명확한 타입 정의로 코드 품질 개선
	export let equippedItems: any[] = [];
	export let characterInfo: any = null;
	export let androidInfo: any = null;
	export let selectItem: (item: any) => void;

	// 장비 슬롯 정의
	let slots: Record<string, any> = {
		무기: null, 엠블렘: null, 보조무기: null, 방패: null,
		모자: null, 상의: null, 한벌옷: null, 하의: null,
		신발: null, 장갑: null, 망토: null, 벨트: null,
		어깨장식: null, 얼굴장식: null, 눈장식: null, 귀고리: null,
		반지1: null, 반지2: null, 반지3: null, 반지4: null,
		펜던트: null, 펜던트2: null, 기계심장: null, 훈장: null, 안드로이드: null,
		포켓아이템: null, 뱃지: null,
	};

	// 장비 데이터 처리
	$: {
		// 슬롯 초기화
		Object.keys(slots).forEach(key => {
			slots[key] = null;
		});
		
		// 장비 아이템 매핑
		if (equippedItems?.length) {
			equippedItems.forEach(item => {
				const key = item.item_equipment_slot.replace(/\s/g, '');
				if (key in slots) {
					slots[key] = item;
				}
			});
		}
		
		if (androidInfo) {
			slots['안드로이드'] = androidInfo;
		}
	}

	const handleItemClick = (item: any) => {
		const selectableItems = ['무기', '엠블렘', '보조무기', '방패',
		'모자', '상의', '한벌옷', '하의',
		'신발', '장갑', '망토', '벨트',
		'어깨장식', '얼굴장식', '눈장식', '귀고리',
		'반지1', '반지2', '반지3', '반지4',	'펜던트', '펜던트2', '기계 심장',];
		
		if (item && selectableItems.includes(item.item_equipment_slot)) {
			selectItem(item);
		} else if (item && !selectableItems.includes(item.item_equipment_slot)) {
			if (item.item_equipment_slot){
				alert(`${item.item_equipment_part}은(는) 큐브 시뮬레이션이 불가능합니다.`);
			}else{
				alert(`안드로이드는 큐브 시뮬레이션이 불가능합니다.`);
			}
		}
	};
</script>

<section class="equipment-grid" aria-label="캐릭터 장비 정보">
	{#if characterInfo}
		<div class="character-info">
			<h3>{characterInfo.character_name || '알 수 없는 캐릭터'}</h3>
			<div class="character-details">
				<span>레벨: {characterInfo.character_level || 'N/A'}</span>
				<span>직업: {characterInfo.character_class || 'N/A'}</span>
			</div>
		</div>
	{/if}

	<article class="grid">
		{#each [
			{ slot: '반지1', area: 'ring1' },
			{ slot: '얼굴장식', area: 'face' },
			{ slot: '모자', area: 'head' },
			{ slot: '신발', area: 'shoes' },
			{ slot: '반지2', area: 'ring2' },
			{ slot: '눈장식', area: 'eyes' },
			{ slot: slots['한벌옷'] ? '한벌옷' : '상의', area: 'top' },
			{ slot: '장갑', area: 'gloves' },
			{ slot: '반지3', area: 'ring3' },
			{ slot: '귀고리', area: 'ears' },
			{ slot: '하의', area: 'bottom' },
			{ slot: '망토', area: 'cloak' },
			{ slot: '반지4', area: 'ring4' },
			{ slot: '펜던트', area: 'pendant1' },
			{ slot: '어깨장식', area: 'shoulder' },
			{ slot: '훈장', area: 'medal' },
			{ slot: '뱃지', area: 'badge' },
			{ slot: '펜던트2', area: 'pendant2' },
			{ slot: '무기', area: 'weapon' },
			{ slot: '보조무기', area: 'subweapon' },
			{ slot: '엠블렘', area: 'emblem' },
			{ slot: '안드로이드', area: 'android' },
			{ slot: '기계심장', area: 'heart' },
			{ slot: '벨트', area: 'belt' },
			{ slot: '', area: '' },
			{ slot: '', area: '' },
			{ slot: '', area: '' },
			{ slot: '', area: '' },
			{ slot: '', area: '' },
			{ slot: '포켓아이템', area: 'pocket' },
		] as { slot, area }}
			{#if slot}
				<div 
					class="cell {area}" 
					role="button" 
					tabindex={slots[slot] ? 0 : -1}
					aria-label={slots[slot]?.item_name || `${slot} (빈 슬롯)`}
					on:click={() => handleItemClick(slots[slot])}
					on:keydown={(e) => e.key === 'Enter' && handleItemClick(slots[slot])}
				>
					<ItemImg
						itemImage={
							slots[slot]
								? slot === '안드로이드'
									? slots[slot].android_icon
									: slots[slot].item_shape_icon
								: ""
						}
						alt={slots[slot]?.item_name || `${slot} (빈 슬롯)`} 
					/>
					{#if slots[slot] && (slot !== '안드로이드' || slots[slot].android_name)}
						<span class="tooltip">
							{slot === '안드로이드' 
								? slots[slot].android_name 
								: slots[slot].item_name || '알 수 없는 아이템'}
						</span>
					{/if}
				</div>
			{:else}
				<div class="cell empty" aria-hidden="true"></div>
			{/if}
		{/each}

		<figure class="cell character" aria-label="캐릭터 외형">
			{#if characterInfo?.character_image}
				<img
					src={characterInfo.character_image}
					alt="메이플스토리 캐릭터 장비 착용 이미지"
					title={`${characterInfo.character_name || '캐릭터'}의 장비 착용 모습`}
					loading="lazy"
					class="character-image" 
				/>
			{:else}
				<div class="character-placeholder">
					캐릭터 이미지 없음
				</div>
			{/if}
		</figure>
	</article>

	<div class="equipment-instructions">
		<p>장비를 클릭하면 해당 아이템의 큐브 시뮬레이션을 진행할 수 있습니다.</p>
	</div>
</section>

<style>
.equipment-grid {
	background-color: #f5f5f5;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.character-info {
	margin-bottom: 1rem;
	text-align: center;
}

.character-details {
	display: flex;
	justify-content: center;
	gap: 1rem;
	font-size: 0.9rem;
	color: #555;
}

.grid {
	display: grid;
	grid-template-columns: repeat(7, minmax(40px, 50px));
	grid-template-rows: repeat(6, minmax(40px, 50px));
	gap: 5px;
	justify-content: center;
	position: relative;
}


.cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  aspect-ratio: 1/1;
  z-index: 1;
}

.cell:hover {
	transform: translateY(-2px);
	box-shadow: 0 3px 6px rgba(0,0,0,0.15);
	z-index: 2;
}

.cell:hover .tooltip {
	visibility: visible;
	opacity: 1;
}

.tooltip {
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(0,0,0,0.8);
	color: white;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-size: 0.8rem;
	white-space: nowrap;
	visibility: hidden;
	opacity: 0;
	transition: opacity 0.2s;
	z-index: 100;
	pointer-events: none;
}

.cell.empty {
	background-color: transparent;
	border: none;
	box-shadow: none;
	cursor: default;
	z-index: 0;
}

.character {
	grid-column: 3 / span 3;
	grid-row: 1 / span 4;
	aspect-ratio: 4/3;
	width: 100%;
	height: 100%;
	background-color: rgba(255,255,255,0.7);
	box-shadow: none;
	cursor: default;
	z-index: 0;
}

.character:hover {
	transform: none;
	box-shadow: none;
}

.character-image {
	width: 75%;
	height: auto;
	object-fit: contain;
	border-radius: 10px;
}

.character figcaption {
	margin-top: 0.5rem;
	font-size: 0.9rem;
	color: #444;
}

.character-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #eee;
	color: #777;
	font-size: 0.9rem;
	text-align: center;
}

.equipment-instructions {
	margin-top: 1rem;
	text-align: center;
	font-size: 0.9rem;
	color: #666;
}
</style>