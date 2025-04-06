<script lang="ts">
  export let data;

  // 최신 버전이 위로 오도록 정렬 (내림차순)
  const sortedFiles = [...data.files].sort((a, b) =>
    b.localeCompare(a, undefined, { numeric: true })
  );
</script>

<h1>패치 노트 목록</h1>
<ul>
  {#each sortedFiles as file}
    <li>
      <a href={`/patch_notes/${file.replace('.md', '')}`}>버전 {file.replace('.md', '')}</a>
    </li>
  {/each}
</ul>
