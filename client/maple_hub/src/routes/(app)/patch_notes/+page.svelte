<script lang="ts">
  import { onMount } from 'svelte';
  let files: string[] = [];

  onMount(async () => {
    try {
      const res = await fetch('/api/patch_notes');  // API 호출
      const data = await res.json();
      if (data.files) {
        files = data.files;  // 파일 목록을 files에 저장
      } else {
        console.error('파일 목록을 불러오는데 문제가 생겼습니다.');
      }
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  });
</script>

<h1>패치 노트 목록</h1>
<ul>
  {#each files as file}
    <li>
      <a href={`/patch_notes/${file.replace('.md', '')}`}>버전 {file.replace('.md', '')}</a>
    </li>
  {/each}
</ul>
