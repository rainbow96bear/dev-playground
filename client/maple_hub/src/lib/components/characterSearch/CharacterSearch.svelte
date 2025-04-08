<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';

  import "./CharacterSearch.css";
  
  let characterName = "";
  const handleSubmit = (event: Event) => {
    event.preventDefault();

    switch ($page.url.pathname) {
          case "/":
          case "/character/info":
              if (characterName) {
                  goto(`/character/info?name=${encodeURIComponent(characterName)}`, { replaceState: true, invalidateAll: true });
                  characterName=""
              } else {
                  console.warn("characterName이 비어 있습니다.");
              }
              break;
          case "/simulation/cube" : 
              if (characterName) {
                  goto(`/simulation/cube?name=${encodeURIComponent(characterName)}`);
                  characterName=""
              } else {
                  goto(`/simulation/cube`);
              }
              break;
          default:
              console.log("다른 경로입니다.");
    }
  
  };
</script>

<div class="searchBox">
  <form on:submit={handleSubmit}>
    <input 
      type="text" 
      bind:value={characterName} 
      placeholder="캐릭터를 검색하세요" 
    />
    <button id="searchButton" type="submit">검색</button>
  </form>
</div>
