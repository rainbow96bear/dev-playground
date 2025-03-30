<script lang="ts">
  import "./+page.css"
  import { GradeUpProbability, MaxCeiling } from "$lib/constants/cube";
  import { EquipmentTypeMap, PotentialOptionToEng, ReverseEquipmentTypeMap } from "$lib/constants";
  import { InternalAPI } from "$lib/api";
  import { onMount } from "svelte";
  import Equipment from "$lib/components/equipment/Equipment.svelte";

  import editionalImg from "$lib/assets/editional.png";
  import redCubeImg from "$lib/assets/redCube.png";
  import blackCubeImg from "$lib/assets/blackCube.png";
  import masterCubeImg from "$lib/assets/masterCube.png";
  import meisterCubeImg from "$lib/assets/meisterCube.png";
  import editionalCubeImg from "$lib/assets/editionalCube.png";
  import whiteEditionalCubeImg from "$lib/assets/whiteEditionalCube.png";
  import arcaneSymbolImg from "$lib/assets/arcane_symbol.png";
  import potentialImg from "$lib/assets/potential.png";
	import { itemInfoForCube } from "$lib/store/index.js";

  let cubeType: string = "redCube";
  let equipmentType: string = "weapon";
  let grade: string = "레어";
  let gradeIndex: number = 0;
  let levelRange: string = "0-9";
  let cube: any = null;
  let levelRangeArr: any = null;

  let tempEquipmentType: string = "weapon";
  let tempGradeIndex: number = 0;
  let tempGrade: string = "레어";
  let tempLevelRange:string = "0-9";
  
  let item_icon = arcaneSymbolImg;
  let totalCount = 0;
  let itemCount = 0;
  let executionCountList = [0, 0, 0, 0];
  
  let option1: string | null = null;
  let option2: string | null = null;
  let option3: string | null = null;
  let selectedImage: string = redCubeImg; // 선택된 큐브 이미지
  export let data;
 
  const fetchCubeData = async (fileName : string) => {
    try {
      const res = await InternalAPI(`/cubeData/${fileName}`);
      if (res.status == 404) {
        cube = null;
        alert("해당 큐브는 " + grade + "등급을 재설정 할 수 없습니다.");
        return;
      }
      cube = res.content
    } catch (error) {
      cube = null;
      console.error('Cube 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  const fetchLevelRange = async () => {
    try {
      const res = await InternalAPI('/cubeData/levelRange');
      levelRangeArr = res.content
    } catch (error) {
      console.error('장비 별 레벨 범위를 가져오는 데 실패했습니다:', error);
    }
  }

  const setOption = () => {
    const currentGrade = PotentialOptionToEng[grade];
    if (!cube) {
      console.error("Invalid cube structure or grade not found:", {
        equipmentType,
        levelRange,
        currentGrade,
      });
      option1 = null;
      option2 = null;
      option3 = null;
    } else {
      option1 = getRandomOption(cube.firstOption || []);
      option2 = getRandomOption(cube.secondOption || []);
      option3 = getRandomOption(cube.thirdOption || []);
    }
  };

  const setItemforCube = () => {
    $itemInfoForCube = null;
    item_icon = arcaneSymbolImg;
    gradeIndex = tempGradeIndex;
    grade = tempGrade;
    equipmentType = tempEquipmentType;
    levelRange = tempLevelRange;
    updateCube(cubeType, selectedImage)
    setOption();
  };


  const updateCube = async (type: string, image: string) => {
    cubeType = type;
    const cubeFileName = `${cubeType}_${PotentialOptionToEng[grade]}_${equipmentType}_${levelRange}`; // 예: cubeType이 "weapon"이면 "weapon.json"
    try {
      await fetchCubeData(cubeFileName);
      selectedImage = image;
      
    } catch (error) {
      console.error('Cube 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  const gradeUp = (cubeType: string, grade: string) => {
    if (GradeUpProbability[cubeType][grade] < 0) {
      return;
    }

    const probability = GradeUpProbability[cubeType][grade];
    const random = globalThis.Math.random();
    const maxCeilingValue = MaxCeiling[cubeType][PotentialOptionToEng[grade]];

    if (
      random < probability ||
      (maxCeilingValue > 0 && executionCountList[gradeIndex] >= maxCeilingValue)
    ) {
      executionCountList[gradeIndex] = 0;
      gradeIndex++;

      const cubeBox = document.getElementById("cube_item_img_box");
      if (cubeBox) {
        cubeBox.classList.add("flash-effect");
        setTimeout(() => cubeBox.classList.remove("flash-effect"), 1000);
      }
    }
  };

  const getRandomOption = (options: { name: string; weight: number }[]) => {
    const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
    const random = globalThis.Math.random() * totalWeight;
    let sum = 0;
    for (let option of options) {
      sum += option.weight;
      if (random < sum) {
        return option.name;
      }
    }
    return options[options.length - 1].name;
  };

  const useCube = () => {
    const currentGrade = PotentialOptionToEng[grade];
    if (!cube) {
      alert("해당 큐브는 " + grade + "등급을 재설정 할 수 없습니다.");
      return;
    }

    totalCount++;
    itemCount++;
    switch (cubeType) {
      case "redCube":
      case "blackCube":
        executionCountList[gradeIndex]++
        break;
    }

    setOption();
    gradeUp(cubeType, currentGrade);
  };

  const translateEquipmentType = (item) => {
    item_icon = item.item_icon
    const slot = item?.item_equipment_slot;
    return EquipmentTypeMap[slot]  
  };

  onMount(async () => {
    const cubeFileName = `${cubeType}_${PotentialOptionToEng[grade]}_${equipmentType}_${levelRange}`;
    await fetchCubeData(cubeFileName);
    await fetchLevelRange();
  });

  $: if ($itemInfoForCube) {
    const translatedType = translateEquipmentType($itemInfoForCube);
    if (equipmentType !== translatedType) {
      equipmentType = translatedType;
    }
    
    const newGradeIndex =  Object.keys(PotentialOptionToEng).indexOf($itemInfoForCube.potential_option_grade);
    if (gradeIndex !== newGradeIndex) {
      gradeIndex = newGradeIndex;
    }
    switch(cubeType){
      case "redCube", "blackCube", "masterCube", "meisterCube", "strangeCube":
        gradeIndex = Object.keys(PotentialOptionToEng).indexOf($itemInfoForCube.potential_option_grade);
        option1 = $itemInfoForCube.potential_option_1;
        option2 = $itemInfoForCube.potential_option_2;
        option3 = $itemInfoForCube.potential_option_3;
      break;
      case "editionalCube", "whiteEditionalCube", "strangeEditionalCube" :
        gradeIndex = Object.keys(PotentialOptionToEng).indexOf($itemInfoForCube.additional_potential_option_grade);
        option1 = $itemInfoForCube.additional_potential_option_1;
        option2 = $itemInfoForCube.additional_potential_option_2;
        option3 = $itemInfoForCube.additional_potential_option_3;
    }
    itemCount = 0;
  }
  
  
</script>

<div id="cube_info">
  캐릭터를 검색하여 장비를 불러올 수 있습니다.
  *2줄인 아이템도 큐브 사용 시 3줄을 기본으로 사용됩니다.
</div>
<div id="cube_container">
  <div>  
    <div id="count_box">
      전체 사용 횟수 : {totalCount}
    </div>
    <div id="count_box">
      현재 아이템 큐브 사용 횟수 : {itemCount}
    </div>
    <div id="cube_box">
      <div id="cube_show_box">
        <div id="cube_type_box">
          <img src={selectedImage} alt="selected cube img" loading="lazy"/>
          <div>아이템의 <p>잠재능력</p>을 재설정합니다.</div>
        </div>
        <div id="cube_item_img_box">
          <div id="cube_item_effect">
            <div id="cube_item_outline">
              <img src={item_icon} alt="selected cube img" loading="lazy"/>
            </div>
          </div>
          <div id="celing_gage_area"> 
            {#if gradeIndex<3 && MaxCeiling[cubeType][PotentialOptionToEng[grade]] > 0 }
              <div id="celing_gauge_box">
                <div id="celing_gauge_bar" style="width: {executionCountList[gradeIndex]/MaxCeiling[cubeType][PotentialOptionToEng[grade]]*100}%"></div>
              </div>
            {/if}
          </div>
        </div>
        <div class="result_box">
          result
          <div class="output_box">
            <div class="grade_box">{grade}</div>
            <div>{option1}</div>
            <div>{option2}</div>
            <div>{option3}</div>
          </div>
        </div>
      </div>
      <div class="cube_use_button_box">
        <button class="cube_use_button" on:click={useCube}>한 번 더 사용하기</button>
      </div>
    </div>
  </div>
  <div>
    <div id="cube_buttons">
      <div class="cube_groups">
        <button class="cube_select_button" on:click={() => updateCube("redCube", redCubeImg)}>
          <img src={redCubeImg} alt="red cube img" loading="lazy"/>
          레드 큐브
        </button>
        <button class="cube_select_button" on:click={() => updateCube("blackCube", blackCubeImg)}>
          <img src={blackCubeImg} alt="black cube img" loading="lazy"/><img src={potentialImg} alt="potential img" />
          블랙 큐브
        </button>
        <button class="cube_select_button" on:click={() => updateCube("masterCube", masterCubeImg)}>
          <img src={masterCubeImg} alt="master cube img" loading="lazy"/>
          장인의 큐브
        </button>
        <button class="cube_select_button" on:click={() => updateCube("meisterCube", meisterCubeImg)}>
          <img src={meisterCubeImg} alt="meister cube img" loading="lazy"/>
          명장의 큐브
        </button>
      </div>
      <div class="cube_groups">
        <button class="cube_select_button" on:click={() => updateCube("editionalCube", editionalCubeImg)}>
          <img src={editionalCubeImg} alt="editional cube img" loading="lazy"/><img src={whiteEditionalCubeImg} alt="white editional cube img" loading="lazy"/><img src={editionalImg} alt="editional img" loading="lazy"/>
          에디셔널 큐브
        </button>
      </div>
    </div>
    {#await data}
      <p>로딩 중...</p>
    {:then loadedData}
      {#if Object.keys(loadedData).length > 0}
        <Equipment equippedItems={loadedData.item_equipment}></Equipment>
      {/if}
    {/await}
    <div id="cube_setting_box">
      <label for="gradeSelect">등급 선택:</label>
      <select id="gradeSelect" bind:value={tempGrade}>
        <option value="" disabled selected>등급을 선택해주세요</option>
        {#each Object.entries(PotentialOptionToEng) as [korGrade, engGrade]}
          <option value={korGrade}>{korGrade}</option>
        {/each}
      </select>
      
      <label for="equipment">부위 선택:</label>
      <select id="equipment" bind:value={tempEquipmentType}>
        {#if levelRangeArr != null}
          {#each Object.keys(levelRangeArr) as key}
            <option value={key}>{ReverseEquipmentTypeMap[key]}</option>
          {/each}
        {/if}
      </select>
      
      <label for="req_level">레벨 입력:</label>
      <select id="req_level" bind:value={tempLevelRange}>
        <option value="" disabled selected>레벨을 선택해주세요</option>
        {#if levelRangeArr != null}
          {#each levelRangeArr[tempEquipmentType].sort((a, b) => {
            const numA = a.split('-').map(Number);
            const numB = b.split('-').map(Number);
            if (numA.length > 1 && numB.length > 1) {
              return numA[0] - numB[0];
            }
            return numA[0] - numB[0];
          }) as levelRange}
            <option value={levelRange}>{levelRange}</option>
          {/each}
        {/if}
      </select>
      <button on:click={() => setItemforCube()}>설정 적용</button>
    </div>
  </div>
</div>