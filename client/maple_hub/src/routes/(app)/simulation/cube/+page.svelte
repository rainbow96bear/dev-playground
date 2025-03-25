<script lang="ts">
  import { GradeUpProbability, MaxCeiling } from "$lib/constants/cube";
  import redCubeData from "$lib/json/cubeProbability/redCube.json";
  import blackCubeData from "$lib/json/cubeProbability/blackCube.json";
  import masterCubeData from "$lib/json/cubeProbability/masterCube.json";
  import meisterCubeData from "$lib/json/cubeProbability/meisterCube.json";
  import strangeCubeData from "$lib/json/cubeProbability/strangeCube.json";
  import editionalCubeData from "$lib/json/cubeProbability/editionalCube.json";
  import strangeEditionalCubeData from "$lib/json/cubeProbability/strangeEditionalCube.json";
  import redCubeImg from "$lib/assets/redCube.png";
  import blackCubeImg from "$lib/assets/blackCube.png";
  import potentialImg from "$lib/assets/potential.png";
  import masterCubeImg from "$lib/assets/masterCube.png";
  import meisterCubeImg from "$lib/assets/meisterCube.png";
  import editionalCubeImg from "$lib/assets/editionalCube.png";
  import whiteEditionalCubeImg from "$lib/assets/whiteEditionalCube.png";
  import arcaneSymbolImg from "$lib/assets/arcane_symbol.png";
  import editionalImg from "$lib/assets/editional.png";
  import Equipment from "$lib/components/equipment/Equipment.svelte";
  import { itemInfoForCube } from "$lib/store";

  import "./+page.css";

  const cubeDataMap = {
    redCube: redCubeData,
    blackCube: blackCubeData,
    masterCube: masterCubeData,
    meisterCube: meisterCubeData,
    strangeCube: strangeCubeData,
    editionalCube: editionalCubeData,
    strangeEditionalCube: strangeEditionalCubeData
  };
  const gradeEngArr = ["rare", "epic", "unique", "legendary"];
  const gradeKorArr = ["레어", "에픽", "유니크", "레전드리"];

  let cubeType: string = "redCube"; // 기본 큐브 타입 설정
  let cube = cubeDataMap[cubeType]; // 선택된 큐브 타입에 따라 Cube 데이터 가져오기
  let equipmentType: string = "weapon";
  let levelRange: string ="0-9";
  let levelRangeList = cube?.[equipmentType]
  let gradeIndex: number = 0; // 초기 등급 설정
  let gradeList = cube?.[equipmentType][levelRange];

  let tempGradeIndex: number = 0;
  let tempEquipmentType: string = "weapon";
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
 
  const setOption = () => {
    const currentGrade = gradeEngArr[gradeIndex];
    const cubeGrade = cube?.[equipmentType]?.[levelRange]?.[currentGrade];
    if (!cubeGrade) {
      console.error("Invalid cube structure or grade not found:", {
        equipmentType,
        levelRange,
        currentGrade,
      });
      option1 = null;
      option2 = null;
      option3 = null;
    } else {
      option1 = getRandomOption(cubeGrade.firstOption || []);
      option2 = getRandomOption(cubeGrade.secondOption || []);
      option3 = getRandomOption(cubeGrade.thirdOption || []);
    }
  };

  const setItemforCube = (tempGradeIndex, tempEquipmentType, tempLevelRange) => {
    $itemInfoForCube = null;
    item_icon = arcaneSymbolImg;
    gradeIndex = tempGradeIndex;
    equipmentType = tempEquipmentType;
    levelRange = tempLevelRange;
    levelRangeList = cube?.[tempEquipmentType] || {}; // 추가됨
    setOption();
  };


  const updateCube = (type: string, image: string) => {
    cubeType = type;
    cube = cubeDataMap[cubeType];
    selectedImage = image;
    levelRangeList = { ...cube?.[equipmentType] };
  };

  const gradeUp = (cubeType: string, grade: string) => {
    if (GradeUpProbability[cubeType][grade] < 0) {
      return;
    }

    const probability = GradeUpProbability[cubeType][grade];
    const random = globalThis.Math.random();
    const maxCeilingValue = MaxCeiling[cubeType][gradeEngArr[gradeIndex]];

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
    const currentGrade = gradeEngArr[gradeIndex];
    const cubeGrade = cube?.[equipmentType]?.[levelRange]?.[currentGrade];

    if (!cubeGrade) {
      alert("해당 큐브는 " + gradeKorArr[gradeIndex] + "등급을 재설정 할 수 없습니다.");
      return;
    }

    totalCount++;
    itemCount++;
    executionCountList[gradeIndex]++;
    setOption();
    gradeUp(cubeType, gradeEngArr[gradeIndex]);
  };

  const translateEquipmentType = (item) => {
    item_icon = item.item_icon
    const slot = item?.item_equipment_slot;
    switch (slot) {
      case "무기":
        return "weapon";
      case "엠블렘":
        return "emblem";
      case "모자":
        return "head";
      case "상의":
        return "top";
      case "한벌옷":
        return "suit";
      case "하의":
        return "bottom";
      case "신발":
        return "shoes";
      case "장갑":
        return "gloves";
      case "망토":
        return "cloak";
      case "벨트":
        return "belt";
      case "어깨장식":
        return "shoulder";
      case "얼굴장식":
        return "face";
      case "눈장식":
        return "eyes";
      case "귀고리":
        return "ears";
      case "반지1":
      case "반지2":
      case "반지3":
      case "반지4":
        return "ring";
      case "펜던트":
      case "펜던트2":
        return "pendant";
      case "기계 심장":
        return "heart";
      case "훈장":
        return "medal";
      case "포켓 아이템":
        return "pocket";
      case "뱃지":
        return "badge";
      default:
        switch (item.item_equipment_part) {
          case "포스실드":
          case "소울링":
            return "forceOrSoul";
          case "방패":
            return "shield";
          default:
            return 'subweapon';
        }
    }
    
  };

  $: {
    if ($itemInfoForCube) {
      equipmentType = translateEquipmentType($itemInfoForCube);
      gradeIndex
      switch(cubeType){
        case "redCube" :
        case "blackCube" :
        case "masterCube" :
        case "meisterCube" :
        case "strangeCube" :
          gradeIndex = gradeKorArr.indexOf($itemInfoForCube.potential_option_grade);
          option1 = $itemInfoForCube.potential_option_1;
          option2 = $itemInfoForCube.potential_option_2;
          option3 = $itemInfoForCube.potential_option_3;
        break;
        case "editionalCube" :
        case "whiteEditionalCube" :
        case "strangeEditionalCube" :
          gradeIndex = gradeKorArr.indexOf($itemInfoForCube.additional_potential_option_grade);
          option1 = $itemInfoForCube.additional_potential_option_1;
          option2 = $itemInfoForCube.additional_potential_option_2;
          option3 = $itemInfoForCube.additional_potential_option_3;
      }
      itemCount = 0;
    }
  }
  
  $: levelRangeList = cube?.[tempEquipmentType] || {};
  
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
          <img src={selectedImage} alt="selected cube img" />
          <div>아이템의 <p>잠재능력</p>을 재설정합니다.</div>
        </div>
        <div id="cube_item_img_box">
          <div id="cube_item_effect">
            <div id="cube_item_outline">
              <img src={item_icon} alt="selected cube img" />
            </div>
          </div>
          <div id="celing_gage_area"> 
            {#if gradeIndex<3 && MaxCeiling[cubeType][gradeEngArr[gradeIndex]] > 0 }
              <div id="celing_gauge_box">
                <div id="celing_gauge_bar" style="width: {executionCountList[gradeIndex]/MaxCeiling[cubeType][gradeEngArr[gradeIndex]]*100}%"></div>
              </div>
            {/if}
          </div>
        </div>
        <div class="result_box">
          result
          <div class="output_box">
            <div class="grade_box">{gradeKorArr[gradeIndex]}</div>
            <div>{option1}</div>
            <div>{option2}</div>
            <div>{option3}</div>
          </div>
        </div>
      </div>
      <div class="cube_use_button_box">
        <button class="cube_use_button" disabled={!option1 || !option2 || !option3} on:click={useCube}>한 번 더 사용하기</button>
      </div>
    </div>
  </div>
  <div>
    <div id="cube_buttons">
      <div class="cube_groups">
        <button class="cube_select_button" on:click={() => updateCube("redCube", redCubeImg)}>
          <img src={redCubeImg} alt="red cube img" />
          레드 큐브
        </button>
        <button class="cube_select_button" on:click={() => updateCube("blackCube", blackCubeImg)}>
          <img src={blackCubeImg} alt="black cube img" /><img src={potentialImg} alt="potential img" />
          블랙 큐브
        </button>
        <button class="cube_select_button" on:click={() => updateCube("masterCube", masterCubeImg)}>
          <img src={masterCubeImg} alt="master cube img" />
          장인의 큐브
        </button>
        <button class="cube_select_button" on:click={() => updateCube("meisterCube", meisterCubeImg)}>
          <img src={meisterCubeImg} alt="meister cube img" />
          명장의 큐브
        </button>
      </div>
      <div class="cube_groups">
        <button class="cube_select_button" on:click={() => updateCube("editionalCube", editionalCubeImg)}>
          <img src={editionalCubeImg} alt="editional cube img" /><img src={whiteEditionalCubeImg} alt="white editional cube img" /><img src={editionalImg} alt="editional img" />
          에디셔널 큐브
        </button>
      </div>
    </div>
    {#if Object.keys(data).length > 0}
      <Equipment equippedItems={data.item_equipment}></Equipment>
    {/if}
    <div id="cube_setting_box">
      <label for="gradeSelect">등급 선택:</label>
      <select id="gradeSelect" bind:value={tempGradeIndex}>
        {#each gradeEngArr as grade, index}
          {#if gradeList?.[grade]} <!-- gradeList에 해당 등급이 존재하는 경우만 표시 -->
            <option value={index}>{gradeKorArr[index]}</option>
          {/if}
        {/each}
      </select>
      
      <label for="equipment">부위 선택:</label>
      <select id="equipment" bind:value={tempEquipmentType}>
        <option value="weapon">무기</option>
        <option value="emblem">엠블렘</option>
        <option value="subweapon">보조무기</option>
        <option value="forceOrSoul">포스실드, 소울링</option>
        <option value="shield">방패</option>
        <option value="head">모자</option>
        <option value="top">상의</option>
        <option value="suit">한벌옷</option>
        <option value="bottom">하의</option>
        <option value="shoes">신발</option>
        <option value="gloves">장갑</option>
        <option value="cloak">망토</option>
        <option value="belt">벨트</option>
        <option value="shoulder">어깨장식</option>
        <option value="face">얼굴장식</option>
        <option value="eyes">눈장식</option>
        <option value="ears">귀고리</option>
        <option value="ring">반지</option>
        <option value="pendant">팬던트</option>
        <option value="heart">기계심장</option>
      </select>
      
      <label for="req_level">레벨 입력:</label>
      <select id="req_level" bind:value={tempLevelRange}>
        {#each Object.keys(levelRangeList).sort((a, b) => {
          const numA = a.split('-').map(Number);
          const numB = b.split('-').map(Number);
          if (numA.length > 1 && numB.length > 1) {
            return numA[0] - numB[0];
          }
          return numA[0] - numB[0];
        }) as levelRange}
          <option value={levelRange}>{levelRange}</option>
        {/each}
      </select>
      <button on:click={() => setItemforCube(tempGradeIndex, tempEquipmentType, tempLevelRange)}>설정 적용</button>
    </div>
  </div>
</div>