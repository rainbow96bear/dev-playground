<script lang="ts">
  import "./+layout.css";
  export let data;

  const sortedFiles = [...data.files].sort((a, b) =>
    b.localeCompare(a, undefined, { numeric: true })
  );

  // 페이지네이션 설정
  let currentPage = 1;
  const itemsPerPage = 5;

  // 전체 페이지 수
  const totalPages = Math.ceil(sortedFiles.length / itemsPerPage);

  // 현재 페이지에 보여줄 데이터
  $: paginatedFiles = sortedFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
</script>

<div class="container">
  <slot></slot>
  <section class="patch-notes-container">
    <h1 class="patch-notes-title">📋 패치 노트 목록</h1>
    
    <p class="intro-text">
      사이트의 최신 업데이트 및 패치 내역을 확인하세요. 이곳에서는 버전별로 주요 변경 사항을 제공하며, 각 패치에 대한 세부 정보를 빠르게 찾아볼 수 있습니다.
    </p>
    
    <ul class="patch-notes-list">
      {#each paginatedFiles as file}
      <li class="patch-note-card">
        <a
        href={`/patch_notes/${file.replace('.md', '')}`}
        class="patch-note-link"
        aria-label={`버전 ${file.replace('.md', '')}의 패치 노트`}
        >
        <div class="version-number">📦 버전 {file.replace('.md', '')}</div>
      </a>
    </li>
    {/each}
  </ul>
  
  <div class="pagination" role="navigation" aria-label="페이지 네비게이션">
    <button
    on:click={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    aria-disabled={currentPage === 1 ? 'true' : 'false'}
    >
    이전
  </button>
  
  {#each Array(totalPages) as _, i}
  <button
  class:active-page={currentPage === i + 1}
  on:click={() => goToPage(i + 1)}
  aria-current={currentPage === i + 1 ? 'page' : undefined}
  >
  {i + 1}
      </button>
      {/each}
      
      <button
      on:click={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      aria-disabled={currentPage === totalPages ? 'true' : 'false'}
      >
      다음
    </button>
  </div>
</section>
</div>

<!-- Meta Tags and Head (SEO Optimization) -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="패치 노트 목록과 주요 변경 사항을 확인하세요. 사이트의 최신 업데이트와 변경 사항을 제공합니다.">
  <meta name="author" content="웹사이트 개발자 이름">
  <meta property="og:title" content="사이트 이름 - 패치 노트 목록">
  <meta property="og:description" content="사이트의 패치 노트를 확인하고 최신 버전의 업데이트를 바로 찾아보세요.">
  <meta property="og:image" content="사이트의 이미지 URL">
  <meta property="og:url" content="사이트 URL">
  <title>패치 노트 목록</title>
</head>
