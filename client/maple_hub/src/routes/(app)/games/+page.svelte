<script lang="ts">
  import "./+page.css";

  const games = [
    {
      title: '사과 게임',
      path: '/games/applegame',
      description: '숫자를 드래그해 합이 10이 되면 사라지는 직관적인 퍼즐 게임입니다. 재미있고 중독성 있는 사과 게임을 즐겨보세요.'
    },
    {
      title: '추가 예정 게임',
      description: '곧 새로운 게임이 업데이트될 예정입니다. 다양한 게임이 준비되고 있으니 기대해주세요!'
    }
  ];
</script>

<main class="games-wrapper">
  <header>
    <h1>게임 선택</h1>
    <p>다양한 퍼즐 및 캐주얼 게임을 즐겨보세요.</p>
  </header>

  <section class="game-list" aria-label="게임 목록">
    {#each games as game}
      {#if game.path}
        <a class="game-card" href={game.path} aria-label={game.title}>
          <h2>{game.title}</h2>
          <p class="description">{game.description}</p>
        </a>
      {:else}
        <article class="game-card disabled" aria-disabled="true">
          <h2>{game.title}</h2>
          <p class="description">{game.description}</p>
        </article>
      {/if}
    {/each}
  </section>
</main>
