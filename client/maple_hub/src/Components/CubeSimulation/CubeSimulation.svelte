<script lang="ts">
  /**
   * MapleStory Cube Simulator
   * 
   * This component simulates the cube system from MapleStory,
   * allowing users to test different cube types on equipment items
   * and see potential stat outcomes.
   * 
   * @author MapleStory Cube Simulator Team
   * @version 1.2.0
   * @license MIT
   */

  // Import cube images
  import redCubeImg from "$lib/assets/redCube.png";
  import blackCubeImg from "$lib/assets/blackCube.png";
  import masterCubeImg from "$lib/assets/masterCube.png";
  import meisterCubeImg from "$lib/assets/meisterCube.png";
  import editionalCubeImg from "$lib/assets/editionalCube.png";
  import whiteEditionalCubeImg from "$lib/assets/whiteEditionalCube.png";
  
  // Import constants and utilities
  import { GradeUpProbability, MaxCeiling } from "$lib/constants/cube";
  import { onMount } from 'svelte';
  import { InternalAPI } from '$lib/api';
  import { slotMap } from "$lib/constants/equipment";

  // Props
  export let selectedItem;
  
  // State variables
  let cube = null;
  let equipmentType = "weapon";
  let levelRange = "120-200";
  let isLoading = false;
  let errorMessage = "";
  let successMessage = "";
  
  /**
   * Mapping for potential grades in Korean to English
   */
  const PotentialOptionToEng = {
    "레어": "rare",
    "에픽": "epic",
    "유니크": "unique",
    "레전드리": "legendary"
  };
  
  /**
   * Available cube options with metadata
   */
  const cubeOptions = [
    { id: "redCube", name: "레드 큐브", image: redCubeImg, description: "일반적인 등급 상승 큐브" },
    { id: "blackCube", name: "블랙 큐브", image: blackCubeImg, description: "이전 잠재능력으로 복구 가능한 고급 큐브" },
    { id: "masterCube", name: "장인의 큐브", image: masterCubeImg, description: "장인이 만든 등급 상승 큐브" },
    { id: "meisterCube", name: "명장의 큐브", image: meisterCubeImg, description: "명장이 만든 프리미엄 큐브" },
    { id: "editionalCube", name: "에디셔널 큐브", image: editionalCubeImg, description: "에디셔널 잠재능력을 재설정하는 큐브" },
    { id: "whiteEditionalCube", name: "화이트 에디셔널 큐브", image: whiteEditionalCubeImg, description: "고급 에디셔널 잠재능력 큐브" },
  ];
  
  let selectedCubeId = cubeOptions[0].id;
  let itemImage = "";
  let itemName = "선택된 아이템 없음";
  let fileName = "";
  
  /**
   * Fetches cube data from the API
   * @returns {Promise<Object|null>} The cube data or null if not found
   */
  const fetchCubeData = async () => {
    isLoading = true;
    errorMessage = "";
    
    try {
      const res = await InternalAPI(`/v1/cube/${fileName}`);
      isLoading = false;
      
      if (res.status === 404) {
        errorMessage = "큐브 데이터를 찾을 수 없습니다.";
        cube = null;
        return null;
      }
      
      return await res;
    } catch (error) {
      isLoading = false;
      console.error('큐브 데이터를 가져오는 데 실패했습니다:', error);
      errorMessage = "큐브 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      return null;
    }
  };
  
  /**
   * Updates cube data based on selected cube type and item grade
   */
  const updateCubeData = async () => {
    const actualCubeType = 
      selectedCubeId === "mesoEditionalCube" || selectedCubeId === "whiteEditionalCube"
        ? "editionalCube"
        : selectedCubeId;

    const grade = GRADES[currentGradeIndex];
    const gradeEng = PotentialOptionToEng[grade];
    
    if (!gradeEng) {
      cube = null;
      return;
    }

    const cubeFileName = `${actualCubeType}_${gradeEng}_${equipmentType}_${levelRange}`;
    if (fileName != cubeFileName && isCubeApplicable(selectedItem)) {
      fileName = cubeFileName;
      try {
        cube = await fetchCubeData();
      } catch (error) {
        console.error('큐브 데이터를 가져오는 데 실패했습니다:', error);
        errorMessage = "큐브 데이터를 불러오는 중 오류가 발생했습니다.";
      }
    }
  };
  
  // Cube rank tracking for each cube type and grade
  let cubeRanks = {
    redCube: { rare: 0, epic: 0, unique: 0, legendary: 0 },
    blackCube: { rare: 0, epic: 0, unique: 0, legendary: 0 },
    masterCube: { rare: 0, epic: 0, unique: 0, legendary: 0 },
    meisterCube: { rare: 0, epic: 0, unique: 0, legendary: 0 },
    editionalCube: { rare: 0, epic: 0, unique: 0, legendary: 0 },
    whiteEditionalCube: { rare: 0, epic: 0, unique: 0, legendary: 0 }
  };
  
  $: currentGradeKey = getInternalGradeKey(GRADES[currentGradeIndex]);
  $: currentRank = cubeRanks[selectedCubeId][currentGradeKey] || 0;
  let maxRank = 25;
  
  let potentialStats = [];
  let potentialGrades = [];
  let isRankUp = false;
  
  const GRADES = ["일반", "레어", "에픽", "유니크", "레전드리"];
  const GRADE_MAP = {
    "레어": "rare",
    "에픽": "epic",
    "유니크": "unique",
    "레전드리": "legendary" 
  };
  
  const REVERSE_GRADE_MAP = {
    "rare": "레어",
    "epic": "에픽",
    "unique": "유니크",
    "legendary": "레전드리"
  };
  
  let currentGradeIndex = 1;

  // Update item info when item changes
  $: if (selectedItem) {
    updateItemInfo(selectedItem);
  }

  // Update max rank when cube or grade changes
  $: {
    updateMaxRank(selectedCubeId, currentGradeIndex);
  }

  /**
   * Updates item information when a new item is selected
   * @param {Object} item - The selected item object
   */
  function updateItemInfo(item) {
    if (!item) return;
    
    itemImage = item.item_icon || "";
    itemName = item.item_name || "미확인 아이템";
    equipmentType = slotMap[item.item_equipment_part] ?? "weapon";
    
    // Calculate level range based on equipment level
    levelRange = getLevelRange(item.item_base_option?.base_equipment_level || 0);
    
    const isAdditionalCube = selectedCubeId === "editionalCube" || selectedCubeId === "whiteEditionalCube";
    
    if (isAdditionalCube) {
      const additionalGrade = item.additional_potential_option_grade || "레어";
      currentGradeIndex = GRADES.indexOf(additionalGrade) >= 0 ? 
                          GRADES.indexOf(additionalGrade) : 1;
      
      potentialStats = [];
      potentialGrades = [];
      for (let i = 1; i <= 3; i++) {
        const optionKey = `additional_potential_option_${i}`;
        const optionGradeKey = `additional_potential_option_${i}_grade`;
        if (item[optionKey] && item[optionKey] !== "") {      
          potentialStats.push(item[optionKey]);
          potentialGrades.push(item[optionGradeKey] || "레어");
        }
      }
      
      if (potentialStats.length === 0) {
        potentialStats = ["에디셔널 잠재능력 없음"];
        potentialGrades = ["레어"];
      }
    } else {
      const potentialGrade = item.potential_option_grade || "레어";
      currentGradeIndex = GRADES.indexOf(potentialGrade) >= 0 ? 
                          GRADES.indexOf(potentialGrade) : 1;
      
      potentialStats = [];
      potentialGrades = [];
      for (let i = 1; i <= 3; i++) {
        const optionKey = `potential_option_${i}`;
        const optionGradeKey = `potential_option_${i}_grade`;
        if (item[optionKey] && item[optionKey] !== "") {
          potentialStats.push(item[optionKey]);
          potentialGrades.push(item[optionGradeKey] || "레어");
        }
      }
      
      if (potentialStats.length === 0) {
        potentialStats = ["잠재능력 없음"];
      }
    }
    
    updateMaxRank(selectedCubeId, currentGradeIndex);
    updateCubeData();
  }

  /**
   * Determines level range string based on equipment level
   * @param {number} level - Equipment base level
   * @returns {string} Level range string
   */
  function getLevelRange(level) {
    if (!level) return "0-9";
    if (level === 10) return "10";
    if (level >= 11 && level <= 19) return "11-19";
    if (level === 20) return "20";
    if (level >= 21 && level <= 29) return "21-29";
    if (level === 30) return "30";
    if (level >= 31 && level <= 39) return "31-39";
    if (level === 40) return "40";
    if (level >= 41 && level <= 49) return "41-49";
    if (level === 50) return "50";
    if (level >= 51 && level <= 59) return "51-59";
    if (level === 60) return "60";
    if (level >= 61 && level <= 69) return "61-69";
    if (level === 70) return "70";
    if (level >= 71 && level <= 79) return "71-79";
    if (level === 80) return "80";
    if (level >= 81 && level <= 89) return "81-89";
    if (level === 90) return "90";
    if (level >= 91 && level <= 99) return "91-99";
    if (level === 100) return "100";
    if (level >= 101 && level <= 109) return "101-109";
    if (level === 110) return "110";
    if (level >= 111 && level <= 119) return "111-119";
    if (level >= 120 && level <= 200) return "120-200";
    return "201-250";
  }

  /**
   * Selects a cube to use
   * @param {string} cubeId - The ID of the selected cube
   */
  function selectCube(cubeId) {
    selectedCubeId = cubeId;
    
    if (selectedItem) {
      updateItemInfo(selectedItem);
    }
    
    updateMaxRank(selectedCubeId, currentGradeIndex);
    updateCubeData();
  }
  
  /**
   * Updates the maximum rank for the selected cube and grade
   * @param {string} cubeId - The ID of the selected cube
   * @param {number} gradeIdx - The index of the current grade
   */
  function updateMaxRank(cubeId, gradeIdx) {
    const gradeKey = getInternalGradeKey(GRADES[gradeIdx]);
    const cubeMaxCeiling = MaxCeiling[cubeId];
    
    if (cubeMaxCeiling && cubeMaxCeiling[gradeKey]) {
      maxRank = cubeMaxCeiling[gradeKey];
    } else {
      maxRank = 0;
    }
  }
  
  /**
   * Gets the internal grade key for a grade name
   * @param {string} gradeName - The grade name in Korean
   * @returns {string} The internal grade key
   */
  function getInternalGradeKey(gradeName) {
    return GRADE_MAP[gradeName] || "rare";
  }
  
  /**
   * Applies a cube to the selected item
   */
  async function applyCube() {
    if (!selectedItem) {
      errorMessage = "선택된 아이템이 없습니다.";
      return;
    }

    isLoading = true;
    errorMessage = "";
    successMessage = "";

    try {
      let gradeKey = getInternalGradeKey(GRADES[currentGradeIndex]);
      const cubeProb = GradeUpProbability[selectedCubeId];
      
      // 등급업 시도
      let isRankUp = false;
      if (cubeRanks[selectedCubeId][gradeKey] === undefined) {
        cubeRanks[selectedCubeId][gradeKey] = 0;
      }
      
      if (maxRank != 0) {
        cubeRanks[selectedCubeId][gradeKey] += 1;
      }

      if (cubeRanks[selectedCubeId][gradeKey] >= maxRank && maxRank != 0) {
        isRankUp = true;
      } else {
        const roll = Math.random();
        if (roll < cubeProb[gradeKey]) {
          isRankUp = true;
        }
      }
      
      // 등급업 처리
      if (isRankUp) {
        handleRankUp();
        await updateCubeData(); // 새로운 등급의 옵션 정보 갱신
      }

      // 등급 정보 업데이트 후 옵션 생성
      gradeKey = getInternalGradeKey(GRADES[currentGradeIndex]); // 새 등급 기준으로 키 다시 계산
      const newOptions = generateNewPotentialOptions(); // 새로운 등급 기준으로 옵션 뽑기

      // 옵션 적용
      if (selectedCubeId === "editionalCube" || selectedCubeId === "whiteEditionalCube") {
        for (let i = 0; i < newOptions.length; i++) {
          const optionKey = `additional_potential_option_${i + 1}`;
          const optionGradeKey = `additional_potential_option_${i + 1}_grade`;
          selectedItem[optionKey] = newOptions[i].name;
          selectedItem[optionGradeKey] = newOptions[i].grade || "R";
        }
      } else {
        for (let i = 0; i < newOptions.length; i++) {
          const optionKey = `potential_option_${i + 1}`;
          const optionGradeKey = `potential_option_${i + 1}_grade`;
          selectedItem[optionKey] = newOptions[i].name;
          selectedItem[optionGradeKey] = newOptions[i].grade || "R";
        }
      }

      potentialStats = newOptions.map(option => option.name || option);
      potentialGrades = newOptions.map(option => option.grade || "R");
      
      successMessage = "잠재능력이 성공적으로 재설정되었습니다.";
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage = "";
      }, 3000);
      
    } catch (error) {
      console.error("큐브 적용 중 오류가 발생했습니다:", error);
      errorMessage = "큐브 적용 중 오류가 발생했습니다. 다시 시도해주세요.";
    } finally {
      isLoading = false;
    }
  }

  /**
   * Handles rank up when applying a cube
   */
  function handleRankUp() {
    const oldGrade = GRADES[currentGradeIndex];
    const oldGradeKey = getInternalGradeKey(oldGrade);
    const newGrade = GRADES[currentGradeIndex + 1];
    
    isRankUp = true;
    
    cubeRanks[selectedCubeId][oldGradeKey] = 0;
    
    if (selectedCubeId === "editionalCube" || selectedCubeId === "whiteEditionalCube") {
      if (selectedItem) {
        selectedItem.additional_potential_option_grade = newGrade;
      }
    } else {
      if (selectedItem) {
        selectedItem.potential_option_grade = newGrade;
      }
    }
    
    currentGradeIndex += 1;
    updateMaxRank(selectedCubeId, currentGradeIndex);
  }

  /**
   * Gets a random option from a list of options based on weights
   * @param {Array} options - The list of options with weights
   * @returns {Object} The selected option
   */
  function getRandomOption(options) {
    if (!options || options.length === 0) {
      return { name: "옵션 없음", grade: "R" };
    }
    
    const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
    const random = Math.random() * totalWeight;
    
    let weightSum = 0;
    for (const option of options) {
      weightSum += option.weight;
      if (random < weightSum) {
        return { name: option.name, grade: option.grade || "R" };
      }
    }
    
    return { name: options[0].name, grade: options[0].grade || "R" };
  }
  
  /**
   * Generates new potential options based on the current cube data
   * @returns {Array} The new potential options
   */
  const generateNewPotentialOptions = () => {
    if (!cube) {
      console.warn("큐브 데이터가 없어 잠재능력을 생성할 수 없습니다.");
      return [
        { name: "큐브 데이터를 불러올 수 없습니다.", grade: "R" },
        { name: "옵션을 생성할 수 없습니다.", grade: "R" },
        { name: "다시 시도해주세요.", grade: "R" }
      ];
    }
    
    const firstOption = getRandomOption(cube.content.firstOption);
    const secondOption = getRandomOption(cube.content.secondOption);
    const thirdOption = getRandomOption(cube.content.thirdOption);
    
    return [firstOption, secondOption, thirdOption];
  }
  
  /**
   * Gets the CSS class for a grade
   * @param {string} grade - The grade name
   * @returns {string} The CSS class name
   */
  const getGradeClass = (grade) => {
    if (!grade) return "cubeRare";
    
    const gradeLower = grade.toLowerCase();
    
    if (gradeLower.includes("레어") || gradeLower.includes("rare")) {
      return "cubeRare";
    } else if (gradeLower.includes("에픽") || gradeLower.includes("epic")) {
      return "cubeEpic";
    } else if (gradeLower.includes("유니크") || gradeLower.includes("unique")) {
      return "cubeUnique";
    } else if (gradeLower.includes("레전드리") || gradeLower.includes("legendary")) {
      return "cubeLegendary";
    }
    
    return "cubeRare"; // 기본값
  }

  /**
   * Gets the icon class for a grade
   * @param {string} grade - The grade name
   * @returns {string} The icon class name
   */
  const GradeIcon = (grade) => {
    if (!grade) return "rareIcon";
    
    if (grade === "R" || grade === "레어" || grade.toLowerCase().includes("rare")) {
      return "rareIcon";
    } else if (grade === "E" || grade === "에픽" || grade.toLowerCase().includes("epic")) {
      return "epicIcon";
    } else if (grade === "U" || grade === "유니크" || grade.toLowerCase().includes("unique")) {
      return "uniqueIcon";
    } else if (grade === "L" || grade === "레전드리" || grade.toLowerCase().includes("legendary")) {
      return "legendaryIcon";
    }
    
    return "rareIcon"; // 기본값
  }

  /**
   * Gets the standardized grade name
   * @param {string} grade - The grade name
   * @returns {string} The standardized grade name
   */
  const getGrade = (grade) => {
    if (!grade) return "rare";
    
    if (grade === "R" || grade === "레어" || grade.toLowerCase().includes("rare")) {
      return "rare";
    } else if (grade === "E" || grade === "에픽" || grade.toLowerCase().includes("epic")) {
      return "epic";
    } else if (grade === "U" || grade === "유니크" || grade.toLowerCase().includes("unique")) {
      return "unique";
    } else if (grade === "L" || grade === "레전드리" || grade.toLowerCase().includes("legendary")) {
      return "legendary";
    }
    
    return "rare"; // 기본값
  }

  /**
   * Checks if a cube is applicable to the selected item
   * @param {Object} item - The selected item
   * @returns {boolean} Whether the cube is applicable
   */
  const isCubeApplicable = (item) => {
    if (!item) return false;
    
    let grade;
    if (selectedCubeId === "editionalCube" || selectedCubeId === "whiteEditionalCube") {
      grade = getGrade(item.additional_potential_option_grade);
    } else {
      grade = getGrade(item.potential_option_grade);
    }
    
    const cubeProb = GradeUpProbability[selectedCubeId];
    return cubeProb[grade] !== -1;
  }

  /**
   * Component initialization
   */
  onMount(() => {
    if (selectedItem) {
      updateItemInfo(selectedItem);
    }
    
    // Initialize cube ranks
    Object.keys(cubeRanks).forEach(cubeId => {
      Object.keys(GRADE_MAP).forEach(grade => {
        const gradeKey = getInternalGradeKey(grade);
        cubeRanks[cubeId][gradeKey] = 0;
      });
    });
    
    updateCubeData();
  });
</script>

<svelte:head>
  <!-- SEO Meta Tags -->
  <title>MapleStory Cube Simulator | 잠재능력 시뮬레이터</title>
  <meta name="description" content="MapleStory 큐브 시뮬레이터로 다양한 큐브의 잠재능력과 등급업 시뮬레이션을 체험해보세요." />
  <meta name="keywords" content="MapleStory, 메이플스토리, 큐브, 시뮬레이터, 잠재능력, 레드 큐브, 블랙 큐브, 에디셔널 큐브" />
  
  <!-- Open Graph / Social Media Meta Tags -->
  <meta property="og:title" content="MapleStory Cube Simulator | 잠재능력 시뮬레이터" />
  <meta property="og:description" content="MapleStory 큐브 시뮬레이터로 다양한 큐브의 잠재능력과 등급업 시뮬레이션을 체험해보세요." />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="maple-potential-container" itemscope itemtype="https://schema.org/SoftwareApplication">
  <meta itemprop="name" content="MapleStory Cube Simulator" />
  <meta itemprop="description" content="MapleStory 큐브 시뮬레이터로 다양한 큐브의 잠재능력과 등급업 시뮬레이션을 체험해보세요." />
  <meta itemprop="applicationCategory" content="Game Simulator" />
  <meta itemprop="operatingSystem" content="Web" />
  <meta itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <meta itemprop="price" content="0" />
    <meta itemprop="priceCurrency" content="USD" />
    <meta itemprop="availability" content="https://schema.org/OnlineOnly" />
  
  <!-- Cube Selection Panel -->
  <div class="cubeListBox">
    <header class="potential-header">
      <h2 class="header-title">CUBE</h2>
    </header>
    
    <section class="cube-selection-section" aria-labelledby="cube-selection-title">
      <h3 id="cube-selection-title" class="section-subtitle visuallyHidden">Select a cube type to apply</h3>
      
      <ul class="cubeList" role="radiogroup" aria-label="큐브 종류 선택">
        {#each cubeOptions as cube}
        <li>
          <button 
            class="cubeSelectButton" 
            class:selected={selectedCubeId === cube.id}
            title={cube.name} 
            aria-label={`${cube.name}: ${cube.description}`}
            aria-pressed={selectedCubeId === cube.id}
            role="radio"
            aria-checked={selectedCubeId === cube.id}
            on:click={() => selectCube(cube.id)}
          >
            <div class="buttonContent">
              <img 
                src={cube.image} 
                alt={cube.name} 
                class="cubeIcon" 
                width="24" 
                height="24" 
                loading="lazy" 
              />
              <span class="cubeText">{cube.name}</span>
            </div>
            {#if selectedCubeId === cube.id}
              <div class="glowEffect" aria-hidden="true"></div>
            {/if}
          </button>
        </li>
        {/each}
      </ul>
      
      <!-- Cube Description -->
        <div class="cube-description visuallyHidden">
          <h4 class="sr-only">선택한 큐브 정보</h4>
          <p class="description-text">
            {cubeOptions.find(c => c.id === selectedCubeId)?.description || "설명 없음"}
          </p>
        </div>
    </section>
  </div>
  
  <!-- Potential/Item Panel -->
  <div class="cubeSimulationBox">
    <header class="potential-header">
      <h2 class="header-title">POTENTIAL</h2>
    </header>
    
    <section class="item-section" aria-labelledby="item-title">
      <!-- Item Display -->
      <div class="item-preview">
        <div class="item-box">
          {#if itemImage}
            <img src={itemImage} alt={itemName} class="item-image" width="64" height="64" />
          {:else}
            <div class="no-item-placeholder" aria-label="아이템을 선택해주세요">선택된 아이템 없음</div>
          {/if}
        </div>
        
        <h3 id="item-title" class="item-name">{itemName}</h3>
        
        <!-- Progress Bar -->
        <div class="progress-container" role="progressbar" aria-label="잠재능력 등급 진행률"
             aria-valuenow={currentRank} aria-valuemin="0" aria-valuemax={maxRank}>
          <span class="progress-label">RANK UP PROGRESS</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: {(currentRank / maxRank) * 100}%"></div>
          </div>
          <span class="progress-value">{currentRank.toString().padStart(3, '0')} / {maxRank.toString().padStart(3, '0')}</span>
        </div>
      </div>
      
      <!-- Grade Display -->
      <div class="grade-container">
        {#if selectedItem}
          {#if selectedCubeId === "editionalCube" || selectedCubeId === "whiteEditionalCube"}
            <div class="grade {getGradeClass(selectedItem.additional_potential_option_grade)}" 
                role="status" aria-label="현재 에디셔널 잠재능력 등급">
              {selectedItem.additional_potential_option_grade || "레어"}
            </div>
          {:else}
            <div class="grade {getGradeClass(selectedItem.potential_option_grade)}" 
                 role="status" aria-label="현재 잠재능력 등급">
              {selectedItem.potential_option_grade || "레어"}
            </div>
          {/if}
        {:else}
          <div class="grade cubeRare" role="status" aria-label="기본 잠재능력 등급">
            레어
          </div>
        {/if}
      </div>
      
      <!-- Potential Stats Display -->
      <div class="potential-info">
        <h4 class="potential-title">
          {selectedCubeId === "editionalCube" || selectedCubeId === "whiteEditionalCube" ? "에디셔널 잠재능력" : "잠재능력"}
        </h4>
        <div class="stats-container" role="region" aria-label="잠재능력 옵션">
          {#each potentialStats as stat, i}
            <div class="stat-row">
              <span class="stat-icon-dot {GradeIcon(potentialGrades[i])}" aria-hidden="true">
                ●
              </span>
              <span class="stat">{stat}</span>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button 
          class="action-button apply-button" 
          on:click={applyCube} 
          disabled={!selectedItem || !isCubeApplicable(selectedItem) || isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? '처리 중...' : '재설정하기'}
        </button>
      </div>
      
      <!-- Status Messages -->
      {#if errorMessage}
        <div class="status-message error-message" role="alert">
          <span class="message-icon">⚠️</span>
          <span class="message-text">{errorMessage}</span>
        </div>
      {/if}
      
      {#if successMessage}
        <div class="status-message success-message" role="status">
          <span class="message-icon">✓</span>
          <span class="message-text">{successMessage}</span>
        </div>
      {/if}
      

    </section>
  </div>
</div>
      <!-- Info Panel -->
      <div class="info-panel visuallyHidden">
        <h4 class="info-title">큐브 사용법</h4>
        <ol class="info-steps">
          <li>원하는 큐브 종류를 선택하세요.</li>
          <li>잠재능력을 부여할 아이템을 선택하세요.</li>
          <li>재설정 버튼을 클릭하여 잠재능력을 변경하세요.</li>
          <li>등급 상승 확률은 큐브 종류와 현재 등급에 따라 달라집니다.</li>
        </ol>
      </div>

<style>
  .maple-potential-container {
    display: flex;
    flex-wrap: wrap;
    font-family: 'Noto Sans KR', sans-serif;
    color: #d1e4f8;
    background-color: rgba(16, 24, 32, 0.7);
    border: 1px solid #2A3743;
    border-radius: 6px;
    overflow: hidden;
    padding: 15px;
    gap:15px;
  }
  
  .potential-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    background: none; 
    border-bottom: 1px solid #2A3743;
  }

  .header-title {
    font-size: 1rem;
    font-weight: bold;
    color: #DDFE01;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }

  .item-section {
    padding: 20px;
    border-radius: 5px;
    background: linear-gradient(
      to bottom,
      rgba(42, 56, 68, 0.8) 0%,
      rgba(28, 39, 48, 0.8) 100%
    );
  }

  .item-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid #495B6A;
    border-radius: 5px;
    gap:10px;
  }

  .item-box {
    width: 90px;
    height: 90px;
    border: 1px solid #3B5361;
    background: linear-gradient(
      to bottom,
      rgba(43, 53, 62, 0.8) 0%,
      rgba(81, 146, 174, 0.8) 100%
    );
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-image {
    border: 2px dashed white;
    border-radius: 3px;
    margin: 6px;
    padding: 12px;
    width: calc(100% - 14px);
    height: calc(100% - 14px);
    object-fit: contain;
    box-sizing: border-box;
  }

  .no-item-placeholder {
    color: #94A5B4;
    font-size: 12px;
    text-align: center;
    padding: 5px;
  }

  .item-name {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }

  .progress-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .progress-label {
    font-size: 12px;
    color: #94A5B4;
    text-transform: uppercase;
    width: 70px;
  }

  .progress-bar {
    flex: 1;
    height: 12px;
    background-color: #1A2330;
    border: 1px solid #2A3743;
    border-radius: 6px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #25A4DE, #5CC6FF);
  }

  .potentail-title{
    padding:10px;
    font-size: 0.9rem;
    color:#94A5B4;
  }

  .progress-value {
    font-size: 12px;
    color: #94A5B4;
    width: 60px;
    text-align: right;
  }

  .potential-info {
    border: 1px solid #495B6A;
    border-radius: 5px;
    overflow: hidden;
  }

  .grade {
    padding: 5px 10px;
    margin: 10px 0px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.2s;
    flex: 1;
    text-align: center;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  }
  .cubeSimulationBox{
    min-width: 320px;
    flex:6;
  }
  .cubeRare{
    background-color: #39B5D1;
    border: 2px solid #54D7E6;
  }
  .cubeEpic{
    background-color: #7E65D2;
    border: 2px solid #B894E7; 
  }
  .cubeUnique{
    background-color: #F2B40E;
    border: 2px solid #F8D614;
  }
  .cubeLegendary{
    background-color: #A4C206;
    border: 2px solid #CEDE07;
  }
  .stats-container {
    padding: 15px;
  }

  .stat-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .stat-icon {
    color: #25A4DE;
    margin-right: 10px;
    font-size: 12px;
  }

  .stat {
    flex: 1;
    color: white;
    font-size: 14px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .cubeListBox{
    flex:1;
  }

  .cubeList {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0;
    list-style: none;
    margin: 0 0 20px 0;
  }

  .cubeSelectButton {
    position: relative;
    min-width: 200px;
    width: 100%;
    padding: 0;
    background: linear-gradient(
      to bottom,
      rgba(42, 56, 68, 0.5) 0%,
      rgba(28, 39, 48, 0.5) 100%
    );
    border: 1px solid #395463;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    overflow: hidden;
  }
  
  .cubeSelectButton:hover:not(.selected) {
    background: linear-gradient(to bottom, #384E5F 0%, #263440 100%);
    border-color: #4E8EAA;
  }

  .buttonContent {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
  }

  .selected {
    background: linear-gradient(to bottom, #46758C 0%, #385161 50%, #46758C 100%);
    border: 1px solid #6BBAE3;
    box-shadow: 0 0 6px rgba(107, 186, 227, 0.6);
  }

  .selected .cubeText {
    color: #ffffff;
    text-shadow: 0 0 4px #a6e3ff, 0 0 8px #a6e3ff;
  }

  .glowEffect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(107, 186, 227, 0.3) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .cubeSelectButton:active {
    transform: scale(0.98);
  }

  .cubeIcon {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .cubeText {
    color: #94A5B4;
    font-size: 14px;
    font-weight: bold;
    flex-grow: 1;
    text-align: left;
  }

  .selected:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 100%;
    background: linear-gradient(to left, rgba(107, 186, 227, 0.6), transparent);
  }
  
  .cubeSelectButton:hover:not(.selected) .cubeText {
    color: #C9D8E6;
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
  }

  .action-button {
    padding: 10px 30px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-button:disabled {
    background: #2A3743;
    border: 1px solid #495B6A;
    color: #94A5B4;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .apply-button {
    background: linear-gradient(to bottom, #25A4DE 0%, #1D7BA6 100%);
    border: 1px solid #6BBAE3;
    color: #ffffff;
  }

  .apply-button:hover:not(:disabled) {
    background: linear-gradient(to bottom, #2CB6F5 0%, #2385B2 100%);
    box-shadow: 0 0 8px rgba(107, 186, 227, 0.6);
  }
  .stat-icon-dot {
    margin-right: 4px;
    font-size: 0.5em;
  }
  .rareIcon {
	color: var(--rare_background);
  }
  .epicIcon {
      color: var(--epic_background);
  }
  .uniqueIcon {
      color: var(--unique_background);
  }
  .legendaryIcon {
      color: var(--legendary_background);
  }
</style>