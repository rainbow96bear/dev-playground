<script lang="ts">
  import "./+page.css";
  
  import { marked } from 'marked';  // marked 라이브러리 가져오기
  export let data;

  // Markdown을 HTML로 변환
  let contentHtml = marked(data.content);
</script>

{#if contentHtml}
  <div class="content" >{@html contentHtml}</div>
{:else}
  <p class="no-content">패치 노트가 없습니다.</p>
{/if}
