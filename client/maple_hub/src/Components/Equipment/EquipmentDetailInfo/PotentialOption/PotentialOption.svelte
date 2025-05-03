<script lang="ts">
    import { PotentialOptionToEng } from "$lib/constants/index";

    export let item;
  
    const getGradeIcon = (grade: string) => {
      return {
        "레어": "R",
        "에픽": "E",
        "유니크": "U",
        "레전드리": "L"
      }[grade] ?? "•";
    }
  </script>
  
  <article class="item-info" aria-label="아이템 능력치 정보">
    {#if item.potential_option_grade}
      <section class="potentialBlock" role="group" aria-label="잠재옵션">
        <div class="grade">
            <div class="gradeBadge {PotentialOptionToEng[item?.potential_option_grade]}">
                {getGradeIcon(item.potential_option_grade)}
            </div>
            <div class="{PotentialOptionToEng[item?.potential_option_grade]+"Title"}">잠재능력 : {item.potential_option_grade}</div>
        </div>
        <ul class="option-list">
          {#if item.potential_option_1}<li>{item.potential_option_1}</li>{/if}
          {#if item.potential_option_2}<li>{item.potential_option_2}</li>{/if}
          {#if item.potential_option_3}<li>{item.potential_option_3}</li>{/if}
        </ul>
      </section>
    {:else}
    <div class="noneGrade">
        <div class="gradeBadge noneGradeIcon">{getGradeIcon(item.potential_option_grade)}</div>
        <div>잠재능력 : 없음</div>
    </div>
    {/if}
  
    {#if item.additional_potential_option_grade}
      <section class="potentialBlock" role="group" aria-label="에디셔널 잠재옵션">
        <div class="grade">
            <div class="gradeBadge {PotentialOptionToEng[item?.additional_potential_option_grade]}">
                {getGradeIcon(item.additional_potential_option_grade)}
            </div>
            <div class="{PotentialOptionToEng[item?.additional_potential_option_grade]+"Title"}">에디셔널 잠재능력 : {item.additional_potential_option_grade}</div>
        </div>
        <ul class="option-list">
          {#if item.additional_potential_option_1}<li>{item.additional_potential_option_1}</li>{/if}
          {#if item.additional_potential_option_2}<li>{item.additional_potential_option_2}</li>{/if}
          {#if item.additional_potential_option_3}<li>{item.additional_potential_option_3}</li>{/if}
        </ul>
      </section>
    {:else}
    <div class="noneGrade">
        <div class="gradeBadge noneGradeIcon">{getGradeIcon(item.additional_potential_option_grade)}</div>
        <div>에디셔널 잠재능력 : 없음</div>
    </div>
    {/if}
  </article>
  
  <style>
  .item-info {
    padding-top: 3px;
    width:100%;
  }
  .potentialBlock {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
  .gradeBadge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height:15px;
    border-radius: 4px;
    font-size: 0.65rem;
  }
  .noneGrade{
    display: flex;
    color:#85919F;
    gap:5px;
    padding-bottom: 3px;
  }
  .noneGradeIcon{
    background-color: #4B5868;
    color:#85919F;
    font-size: 1rem;
  }
  .option-list {
    list-style-type: none;
    padding-left: 20px;
    margin: 0;
  }
  .option-list li {
    font-size: 0.9rem;
    color: #f0f0f0;
  }

  .grade{
    display: flex;
    gap:5px;
  }
  .rareTitle {
	color: var(--rare_background);
    }
    .epicTitle {
        color: var(--epic_background);
    }
    .uniqueTitle {
        color: var(--unique_background);
    }
    .legendaryTitle {
        color: var(--legendary_background);
    }
  </style>
  