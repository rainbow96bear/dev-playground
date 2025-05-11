<script lang="ts">
  import "./+page.css";
  import { marked } from 'marked';
  export let data;

  let contentHtml = '';

  $: contentHtml = marked(data.content ?? '');
</script>

<svelte:head>
  <title>{data.title ? `${data.title} - 패치 노트` : '패치 노트'}</title>
  <meta name="description" content="최신 패치 노트를 확인하고 게임의 새로운 업데이트 내용을 알아보세요.">
  <meta name="author" content="사이트 이름 또는 운영자">
  <meta property="og:title" content={data.title ? `${data.title} - 패치 노트` : '패치 노트'}>
  <meta property="og:description" content="이 페이지는 최신 업데이트 내용을 포함한 패치 노트 상세 정보입니다.">
  <meta property="og:image" content="https://example.com/og-image.jpg"> <!-- 실제 이미지 URL로 교체 -->
  <meta property="og:url" content="https://example.com/patch_notes/{data.title}">
</svelte:head>

<article class="patch-note-container" aria-labelledby="patch-note-title">
  {#if contentHtml}
    <div class="content" role="document" aria-label="패치 노트 상세 내용">
      <h1 id="patch-note-title" class="patch-note-title">
        {data.title ?? '패치 노트'}
      </h1>

      {@html contentHtml}

      <div class="patch-note-separator" aria-hidden="true"></div>
    </div>
  {:else}
    <p class="no-content" role="alert">패치 노트가 없습니다.</p>
  {/if}
</article>
