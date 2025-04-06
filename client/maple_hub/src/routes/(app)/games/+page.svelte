<script lang="ts">
    import "./+page.css";
  
    const games = [
      {
        title: '사과 게임',
        path: '/games/applegame',
        description: '사과 게임\n숫자를 드래그해서 합이 10이 되면 사라지는 퍼즐 게임'
      },
      {
        title: '추가 예정 게임',
        description: '곧 새로운 게임이 추가됩니다!'
      }
    ];
  </script>
  
  <div class="games-wrapper">
    <h1>게임 선택</h1>
    <div class="game-list">
      {#each games as game}
        {#if game.path}
          <a class="game-card" href={game.path}>
            <h2>{game.title}</h2>
            <p class="description">{game.description}</p>
          </a>
        {:else}
          <div class="game-card disabled">
            <h2>{game.title}</h2>
            <p class="description">{game.description}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
  