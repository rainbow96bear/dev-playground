<script lang="ts">
  import "./+page.css";
  import { marked } from 'marked';
  export let data;

  let contentHtml = '';

  $: contentHtml = marked(data.content ?? '');
</script>

{#if contentHtml}
  <div class="content">
    {@html contentHtml}
    <div class="patch-note-separator"></div> <!-- 하단 공백 및 구분선 -->
  </div>
{:else}
  <p class="no-content">패치 노트가 없습니다.</p>
{/if}
