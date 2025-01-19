<script lang="ts">
  import { goto } from "$app/navigation";

  import "./CharacterSearch.css";

  let characterName = "";

  const handleSubmit = (event: Event) => {
    event.preventDefault(); // 폼 기본 동작 방지
    if (characterName.trim()) {
      goto(`/character/info?name=${encodeURIComponent(characterName)}`);
    } else {
      alert("캐릭터 이름을 입력하세요.");
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
