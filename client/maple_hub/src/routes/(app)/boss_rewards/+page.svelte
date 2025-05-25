<script lang="ts">
  import "./+page.css";
  import { bosses } from '$lib/constants/boss.ts';
  import type { SelectedStone } from '$lib/types';

  let selectedStones: SelectedStone[] = [];
  let searchTerm = '';
  let selectedCategory: 'all' | 'weekly' | 'daily' = 'all';

  // 난이도별 category 반영하여 필터링
  $: filteredBosses = bosses.filter(boss => {
    const matchesSearch = boss.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      Object.values(boss.difficulties).some(difficultyData => difficultyData.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleSelection = (bossId: string, difficulty: string) => {
    const idx = selectedStones.findIndex(s => s.bossId === bossId && s.difficulty === difficulty);
    if (idx >= 0) {
      selectedStones = selectedStones.filter((_, i) => i !== idx);
    } else {
      const boss = bosses.find(b => b.id === bossId);
      const difficultyData = boss?.difficulties[difficulty];
      if (boss && difficultyData) {
        selectedStones = [
          ...selectedStones,
          {
            bossId,
            difficulty,
            actualPartySize: 1,
            maxPartySize: difficultyData.maxPartySize
          }
        ];
      }
    }
    calculationResult = calculateTotalProfit();
  };

  const updatePartySize = (bossId: string, difficulty: string, newSize: number) => {
    const index = selectedStones.findIndex(stone =>
      stone.bossId === bossId && stone.difficulty === difficulty
    );
    if (index >= 0) {
      selectedStones[index].actualPartySize = newSize;
      selectedStones = [...selectedStones];
      calculationResult = calculateTotalProfit();
    }
  };

  const calculateTotalProfit = () => {
    const stonesWithPrice = selectedStones.map(({ bossId, difficulty, actualPartySize }) => {
      const boss = bosses.find(b => b.id === bossId);
      const difficultyData = boss?.difficulties[difficulty];
      const basePrice = difficultyData?.price || 0;
      const pricePerPerson = basePrice / actualPartySize;

      return {
        bossId,
        bossName: boss?.name || '',
        difficulty,
        isWeekly: difficultyData?.isWeekly || false,
        price: pricePerPerson,
        actualPartySize
      };
    });

    const sorted = stonesWithPrice.sort((a, b) => b.price - a.price);

    const weeklyStones = sorted.filter(s => s.isWeekly);
    const dailyStones = sorted.filter(s => !s.isWeekly);

    const selectedWeekly = weeklyStones.slice(0, 12);
    const remainingSlots = 90 - selectedWeekly.length;
    const selectedDaily = dailyStones.slice(0, remainingSlots);

    const finalList = [...selectedWeekly, ...selectedDaily];
    const total = finalList.reduce((sum, s) => sum + s.price, 0);

    return { finalList, total };
  };

  const clearAllSelections = () => {
    selectedStones = [];
    calculationResult = calculateTotalProfit();
  };

  // 난이도 표시용 클래스 매핑 (difficulty가 난이도명 그대로임을 가정)
  const getDifficultyColor = (difficulty: string): string => {
    const colorMap: Record<string, string> = {
      '이지': 'easy',
      '노말': 'normal',
      '하드': 'hard',
      '카오스': 'chaos',
      '익스트림': 'extreme'
    };
    return colorMap[difficulty] || 'normal';
  };

  const isSelected = (bossId: string, difficulty: string): boolean => {
    return selectedStones.some(s => s.bossId === bossId && s.difficulty === difficulty);
  };

  const getSelectedStone = (bossId: string, difficulty: string): SelectedStone | undefined => {
    return selectedStones.find(s => s.bossId === bossId && s.difficulty === difficulty);
  };

  const getPartySizeOptions = (maxSize: number): number[] => {
    return Array.from({ length: maxSize }, (_, i) => i + 1);
  };

  $: calculationResult = calculateTotalProfit();
</script>

<svelte:head>
  <title>메이플스토리 보스 결정석 수익 계산기 | 캐릭터 성장에 필요한 정보 제공</title>
  <meta name="description" content="메이플스토리 보스별 결정석 수익을 쉽게 계산하고 최적화된 수익 전략을 세워보세요. 주간/월간 보스 모두 지원합니다." />
  <meta name="keywords" content="메이플스토리, 보스, 결정석, 수익계산기, 메소, 보스레이드" />
  <meta name="author" content="메이플스토리 결정석 계산기" />
  <meta property="og:title" content="메이플스토리 보스 결정석 수익 계산기" />
  <meta property="og:description" content="보스별 결정석 수익을 실시간으로 계산하고 최적화된 수익 전략을 세워보세요." />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="container">
  <div class="layout-container">
    <!-- 좌측: 보스 선택 영역 -->
    <div class="left-panel">
      <section class="calculator-section">
        <div class="section-header">
          <h2 class="section-title">보스 선택</h2>
        </div>

        <div class="controls">
          <div class="search-container">
            <input 
              type="text" 
              placeholder="보스 이름으로 검색..." 
              bind:value={searchTerm}
              class="search-input"
            />
          </div>
          
          <div class="filter-container">
            <select bind:value={selectedCategory} class="category-select">
              <option value="all">전체 보스</option>
              <option value="weekly">주간 보스</option>
              <option value="daily">일일 보스</option>
            </select>
          </div>

          <button class="clear-button" on:click={clearAllSelections}>
            전체 선택 해제
          </button>
        </div>

        <div class="boss-list">
          {#each filteredBosses as boss}
            <article class="boss-card">
              <div class="boss-header">
                <div class="boss-image-container">
                  <img 
                    src={boss.image} 
                    alt={boss.name} 
                    class="boss-image" 
                    loading="lazy"
                    on:error={(e) => e.target.src = '/boss_images/default_boss.png'}
                  />
                </div>
                <div class="boss-info">
                  <h3 class="boss-name">{boss.name}</h3>
                </div>
              </div>

              <div class="difficulties">
               {#each boss.difficulties as data, i}
                  {@const difficultyKey = i}
                  {@const selectedStone = getSelectedStone(boss.id, difficultyKey)}
                  {@const selected = isSelected(boss.id, difficultyKey)}

                  <div class="difficulty-row {selected ? 'selected' : ''}">
                    <label class="difficulty-main">
                      <input
                        type="checkbox"
                        checked={selected}
                        on:change={() => toggleSelection(boss.id, difficultyKey)}
                        class="difficulty-checkbox"
                      />
                    </label>
                    <span class="difficulty-badge {getDifficultyColor(data.name)}">
                      {data.name}
                    </span>
                    <div class="party-size-selector">
                      <label class="party-size-label">
                        클리어 인원:
                        <select
                          on:change={(e) => updatePartySize(boss.id, difficultyKey, parseInt(e.target.value))}
                          class="party-size-select"
                          value={selectedStone ? selectedStone.actualPartySize : 1}
                        >
                          {#each getPartySizeOptions(data.maxPartySize) as size}
                            <option value={size}>{size}명</option>
                          {/each}
                        </select>
                      </label>
                    </div>
                    <span class="difficulty-price">
                      {selected && selectedStone
                        ? Math.floor(data.price / selectedStone.actualPartySize).toLocaleString()
                        : Math.floor(data.price / data.maxPartySize).toLocaleString()
                      } 메소
                    </span>
                  </div>
                {/each}
              </div>
            </article>
          {/each}
        </div>
      </section>
    </div>

    <div class="right-panel">
      <section class="result-section">
        <div class="result-header">
          <h2 class="result-title">수익 계산 결과</h2>
          <div class="total-profit">
            <span class="profit-label">총 예상 수익:</span>
            <span class="profit-amount">{Math.floor(calculationResult.total).toLocaleString()} 메소</span>
          </div>
        </div>
          <div class="profit-summary">
            <div class="summary-item">
              <span class="summary-label">주간 보스 결정석:</span>
              <span class="summary-value">{calculationResult.finalList.filter(s => s.isWeekly).length}/12개</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">총 결정석:</span>
              <span class="summary-value">{calculationResult.finalList.length}/90개</span>
            </div>
          </div>

          <div class="stone-list">
            {#each calculationResult.finalList as stone, index}
              <div class="stone-item">
                <div class="stone-rank">#{index + 1}</div>
                <div class="stone-info">
                  <span class="stone-boss">{stone.bossName}</span>
                  <span class="stone-difficulty {getDifficultyColor(stone.difficulty)}">{stone.difficulty}</span>
                  <span class="stone-party">({stone.actualPartySize}명)</span>
                </div>
                <div class="stone-price">{Math.floor(stone.price).toLocaleString()} 메소</div>
              </div>
            {/each}
          </div>
      </section>
    </div>
  </div>
</div>
