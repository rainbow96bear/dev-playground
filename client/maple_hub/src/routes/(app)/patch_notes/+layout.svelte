<script lang="ts">
  import "./+layout.css"
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

<slot></slot>
<section class="patch-notes-container">
  <h1 class="patch-notes-title">📋 패치 노트 목록</h1>

  <ul class="patch-notes-list">
    {#each paginatedFiles as file}
      <li class="patch-note-card">
        <a href={`/patch_notes/${file.replace('.md', '')}`} class="patch-note-link">
          <div class="version-number">📦 버전 {file.replace('.md', '')}</div>
        </a>
      </li>
    {/each}
  </ul>

  <div class="pagination">
    <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
      이전
    </button>

    {#each Array(totalPages) as _, i}
      <button
        class:active-page={currentPage === i + 1}
        on:click={() => goToPage(i + 1)}
      >
        {i + 1}
      </button>
    {/each}

    <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
      다음
    </button>
  </div>
</section>
