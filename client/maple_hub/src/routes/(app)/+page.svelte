<script lang="ts">
  import CharacterSearch from '$lib/components/characterSearch/CharacterSearch.svelte';
  import CharacterInfo from '$lib/components/characterInfo/CharacterInfo.svelte';
  import "./+page.css";

</script>

<div id="app_container">
  <div>
    <h1>메이플스토리 캐릭터 리스트</h1>

    <CharacterSearch></CharacterSearch>

    <CharacterInfo></CharacterInfo>
  </div>
</div>