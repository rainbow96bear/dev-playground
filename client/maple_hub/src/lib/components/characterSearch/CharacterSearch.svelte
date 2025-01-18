<script  lang="ts">
  import { getCharaterOcid, getChareterInfo } from "$lib/nexonApi";
  import { characterInfo } from '$lib/store';
  import "./CharacterSearch.css"

  let characterName = "";

  const fetchCharacterInfo = async () => {
    try {
      const resOcidObj = await getCharaterOcid(characterName);
      if (resOcidObj) {
        const ocid = resOcidObj.ocid;
        const resCharacterInfoObj = await getChareterInfo(ocid);
        characterInfo.set(resCharacterInfoObj);
      } else {
        console.log("Ocid를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };
</script>

<div class="searchBox">
  <input type="text" bind:value={characterName} placeholder="캐릭터를 검색하세요" />
  <button id="searchButton" on:click={fetchCharacterInfo}>검색</button>
</div>