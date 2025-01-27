<script lang="ts">
  import { Cube,GradeUpProbability,MaxCeiling } from "$lib/constants/cube";
  import "./+page.css"

  const grade = [
    "rare", "epic", "unique", "legendary"
  ];

  let cubeType: string = "redCube"; // 기본 큐브 타입 설정
  let cube = Cube[cubeType]; // 선택된 큐브 타입에 따라 Cube 데이터 가져오기
  let gradeIndex: number = 0; // 초기 등급 설정
  let executionCount: number = 0; // 실행 횟수 (초기화)
  let equippmentType:string ="Weapon";
  let reqLevel:string = "5";
  let option1: string | null = null;
  let option2: string | null = null;
  let option3: string | null = null;


  const useCube = () => {
    executionCount++;
  };

  const updateCube = () => {
    cube = Cube[cubeType];
    console.log(cubeType)
  };

  const gradeUp = (cubeType:string, grade:string) => {
    const probability = GradeUpProbability[cubeType][grade];
    const random = globalThis.Math.random();
    if (random<probability || executionCount >= MaxCeiling[cubeType][grade[gradeIndex]]){
      gradeIndex++;
      executionCount = 0;
    }
  }

  // 확률에 맞춰 옵션 선택
  const getRandomOption = (options: { name: string, weight: number }[]) => {
    const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
    const random = globalThis.Math.random() * totalWeight;
    console.log(totalWeight)
    let sum = 0;
    for (let option of options) {
      sum += option.weight;
      if (random < sum) {
        return option.name + "  :  " + option.weight;
      }
    }
    return options[options.length - 1].name;
  };

  $: {

    if (executionCount > 0) {
      gradeUp(cubeType, grade[gradeIndex]);
      console.log(grade[gradeIndex])
      const currentGrade = grade[gradeIndex];
      let level = globalThis.Number(reqLevel);
      let levelRange = "";
      if (level >= 0 && level <= 9) {
        levelRange = "0-9";
      } else if (level == 10) {
        levelRange = "10";
      }

      const cubeGrade = cube[equippmentType]?.[levelRange]?.[currentGrade];
      if (!cubeGrade) {
        console.error("Invalid cube structure or grade not found:", {
          equippmentType,
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
    }
  }

  // 큐브를 사용하여 실행 횟수 증가

</script>

  <!-- 큐브 타입 선택 (radio 버튼) -->
<fieldset>
  <legend>큐브 타입 선택:</legend>
  <label for="redCube">
    <input type="radio" id="redCube" name="cubeType" value="redCube" bind:group={cubeType} on:change={updateCube} />
    레드 큐브
  </label>
  <label for="blackCube">
    <input type="radio" id="blackCube" name="cubeType" value="blackCube" bind:group={cubeType} on:change={updateCube} />
    블랙 큐브
  </label>
  <label for="craftsmanCube">
    <input type="radio" id="craftsmanCube" name="cubeType" value="craftsmanCube" bind:group={cubeType} on:change={updateCube} />
    장인의 큐브
  </label>
  <label for="masterCube">
    <input type="radio" id="masterCube" name="cubeType" value="masterCube" bind:group={cubeType} on:change={updateCube} />
    명장의 큐브
  </label>
  <label for="editionalCube">
    <input type="radio" id="editionalCube" name="cubeType" value="editionalCube" bind:group={cubeType} on:change={updateCube} />
    에디셔널 큐브
  </label>
  <label for="questionableEditionalCube">
    <input type="radio" id="questionableEditionalCube" name="cubeType" value="questionableEditionalCube" bind:group={cubeType} on:change={updateCube} />
    화이트 에디셔널 큐브
  </label>
</fieldset>

<!-- grade 선택 -->
<label for="gradeSelect">등급 선택:</label>
<select id="gradeSelect" bind:value={grade[gradeIndex]}>
  <option value="rare">레어</option>
  <option value="epic">에픽</option>
  <option value="unique">유니크</option>
  <option value="legendary">레전드리</option>
</select>

<div id="cube_box">
  <div id="cube_show_box">
    <div id="cube_type_box">
      <div>큐브</div>
      <div>아이템의 <p>잠재능력</p>을 재설정합니다.</div>
    </div>
    <div class="result_box">
      result
      <div class="output_box">
        <div class="grade_box">레전드리</div>
        <div>{option1}</div>
        <div>{option2}</div>
        <div>{option3}</div>
      </div>
    </div>
  </div>
  <div class="cube_button_box">

    <button class="cube_button" on:click={useCube}>한 번 더 사용하기</button>
  </div>
</div>
