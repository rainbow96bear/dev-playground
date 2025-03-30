<!-- src/routes/patch_notes/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<h1>패치 노트 목록</h1>
<ul>
  {#each data.files as file}
    <li>
      <a href={`/patch_notes/${file.replace('.md', '')}`}>버전 {file.replace('.md', '')}</a>
    </li>
  {/each}
</ul>
