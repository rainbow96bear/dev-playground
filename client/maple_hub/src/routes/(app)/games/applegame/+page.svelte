<script lang="ts">
    import { onMount, tick } from 'svelte';
    import "./+page.css"
  
    let canvas: HTMLCanvasElement;
    const rows = 10;
    const cols = 17;
    const cellSize = 40;
    const padding = 20;
  
    let grid: (number | undefined)[][] = [];
    let score = 0;
    let timeLeft = 120;
    let gameStarted = false;
    let gameEnded = false;
    let timer: NodeJS.Timeout;
  
    let dragStartPos: { x: number; y: number } | null = null;
    let dragEndPos: { x: number; y: number } | null = null;
  
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      value: number;
      life: number;
    }[] = [];
  
    function generateGrid() {
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.floor(Math.random() * 9) + 1)
      );
    }
  
    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const value = grid[y][x];
          if (value === undefined) continue;
  
          const cellX = padding + x * cellSize;
          const cellY = padding + y * cellSize;
  
          let selected = false;
          if (dragStartPos && dragEndPos) {
            const sx = Math.min(dragStartPos.x, dragEndPos.x);
            const ex = Math.max(dragStartPos.x, dragEndPos.x);
            const sy = Math.min(dragStartPos.y, dragEndPos.y);
            const ey = Math.max(dragStartPos.y, dragEndPos.y);
  
            const cx = cellX + cellSize / 2;
            const cy = cellY + cellSize / 2;
            selected = cx >= sx && cx <= ex && cy >= sy && cy <= ey;
          }
  
          ctx.fillStyle = selected ? '#f00' : '#ef5350';
          ctx.beginPath();
          ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 2 - 4, 0, Math.PI * 2);
          ctx.fill();
  
          if (selected) {
            ctx.strokeStyle = '#fff000';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 2 - 4, 0, Math.PI * 2);
            ctx.stroke();
          }
  
          ctx.fillStyle = '#fff';
          ctx.fillText(value.toString(), cellX + cellSize / 2, cellY + cellSize / 2);
        }
      }
  
      if (dragStartPos && dragEndPos) {
        const x = Math.min(dragStartPos.x, dragEndPos.x);
        const y = Math.min(dragStartPos.y, dragEndPos.y);
        const w = Math.abs(dragStartPos.x - dragEndPos.x);
        const h = Math.abs(dragStartPos.y - dragEndPos.y);
  
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);
  
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
        ctx.fillRect(x, y, w, h);
      }
  
      for (const p of particles) {
        ctx.fillStyle = '#ef5350';
        ctx.beginPath();
        ctx.arc(p.x, p.y, cellSize / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
  
        ctx.fillStyle = '#fff';
        ctx.fillText(p.value.toString(), p.x, p.y);
      }
    }
  
    function animateParticles() {
      const gravity = 0.4;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y - cellSize / 2 > canvas.height) p.life = 0;
      }
      particles = particles.filter(p => p.life > 0);
    }
  
    function handleMouseDown(e: MouseEvent) {
      if (!gameStarted || gameEnded) return;
      const rect = canvas.getBoundingClientRect();
      dragStartPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      dragEndPos = null;
    }
  
    function handleMouseMove(e: MouseEvent) {
      if (!dragStartPos || gameEnded) {
        dragStartPos = null;
        dragEndPos = null;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      dragEndPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  
    function handleMouseUp() {
      if (!dragStartPos || gameEnded) {
        dragStartPos = dragEndPos = null;
        return;
      }
  
      if (!dragEndPos) {
        dragEndPos = { ...dragStartPos };
      }
  
      const selectedCells: { x: number; y: number; value: number }[] = [];
  
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = padding + x * cellSize + cellSize / 2;
          const cy = padding + y * cellSize + cellSize / 2;
  
          const x1 = Math.min(dragStartPos.x, dragEndPos.x);
          const y1 = Math.min(dragStartPos.y, dragEndPos.y);
          const x2 = Math.max(dragStartPos.x, dragEndPos.x);
          const y2 = Math.max(dragStartPos.y, dragEndPos.y);
  
          if (cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2 && grid[y][x] !== undefined) {
            selectedCells.push({ x, y, value: grid[y][x]! });
          }
        }
      }
  
      const sum = selectedCells.reduce((acc, cell) => acc + cell.value, 0);
      if (sum === 10) {
        for (const { x, y, value } of selectedCells) {
          const cx = padding + x * cellSize + cellSize / 2;
          const cy = padding + y * cellSize + cellSize / 2;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 4;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            value,
            life: 100
          });
          grid[y][x] = undefined;
        }
        score += selectedCells.length;
      }
  
      dragStartPos = dragEndPos = null;
    }
  
    async function startGame() {
      gameStarted = true;
      gameEnded = false;
      generateGrid();
      score = 0;
      timeLeft = 120;
  
      await tick();
      draw();
  
      clearInterval(timer);
      timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(timer);
          gameEnded = true;
        }
      }, 1000);
    }
  
    onMount(() => {
      generateGrid();
      function loop() {
        if (gameStarted) {
          animateParticles();
          draw();
        }
        requestAnimationFrame(loop);
      }
      loop();
    });
  </script>
  
  {#if !gameStarted}
  <div class="start-screen">
    <h1 class="game-title">🍎 사과 게임</h1>
    <p class="game-description">
      숫자를 드래그해서<br />
      합이 10이 되면 사라지는 퍼즐 게임입니다.
    </p>
    <button id="start-button" on:click={startGame}>게임 시작</button>
  </div>
{:else}
  <div class="game-wrapper">
      <div class="canvas-container">
        <div class="info-panel">
        <div>시간: {timeLeft}s</div>
        <div>점수: {score}</div>
        </div>
        <canvas
            bind:this={canvas}
            width={cols * cellSize + padding * 2}
            height={rows * cellSize + padding * 2}
            on:mousedown={handleMouseDown}
            on:mousemove={handleMouseMove}
            on:mouseup={handleMouseUp}
        />
      {#if timeLeft <= 0}
        <div class="game-over-overlay">
          <div class="final-score">최종 점수: {score}</div>
          <button id="restart-button" on:click={startGame}>다시 시작</button>
        </div>
      {/if}
    </div>
  </div>
{/if}
