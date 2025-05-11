<script lang="ts">
	import { goto } from "$app/navigation";
	import potentialImg from "$lib/assets/potential.png";
  
	let isOpen = false;
	const toggle = () => {
	  isOpen = !isOpen;
	};
  </script>
  
  <header>
	<button
	  class="hamburger"
	  on:click={toggle}
	  aria-label="메뉴 열기"
	  aria-expanded={isOpen}
	  aria-controls="main-navigation"
	>
	  ☰
	</button>
  
	<nav id="main-navigation" class={isOpen ? "open" : ""} role="navigation" aria-label="주 메뉴">
	  <ul>
		<li><button on:click={() => { toggle(); goto("/"); }}>홈</button></li>
		<li><button on:click={() => { toggle(); goto("/character/info"); }}>캐릭터 정보</button></li>
		<li>
		  <button on:click={() => { toggle(); goto("/simulation/cube"); }}>
			<img src={potentialImg} alt="큐브 시뮬레이션 아이콘" />
			큐브 시뮬레이션
		  </button>
		</li>
		<li><button on:click={() => { toggle(); goto("/games"); }}>미니게임</button></li>
		<li><button on:click={() => { toggle(); goto("/patch_notes"); }}>패치노트</button></li>
	  </ul>
	</nav>
  </header>
  
  <style>
  header {
	height: 70px;
	background: linear-gradient(to right, #ffffff, #f8f9fa);
	display: flex;
	align-items: center;
	padding: 0 20px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	border-bottom: 2px solid #e9ecef;
	position: relative;
  }
  
  .hamburger {
	display: none;
	font-size: 1.8rem;
	background: none;
	border: none;
	color: #495057;
	cursor: pointer;
	padding: 10px;
  }
  
  nav {
	display: flex;
	align-items: center;
	gap: 10px;
  }
  
  nav ul {
	display: flex;
	list-style: none;
	padding: 0;
	margin: 0;
	gap: 10px;
  }
  
  nav li {
	margin: 0;
  }
  
  nav button {
	font-size: 1rem;
	font-weight: bold;
	color: #495057;
	border: none;
	background: none;
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 12px;
	margin: 0;
	cursor: pointer;
	border-radius: 6px;
	transition: all 0.3s ease-in-out;
  }
  
  nav button:hover {
	background: rgba(0, 123, 255, 0.1);
	color: #007bff;
  }
  
  nav button img {
	width: 20px;
	height: 20px;
	margin: 0px;
  }
  
  @media (max-width: 600px) {
	.hamburger {
	  display: block;
	}
  
	nav {
	  display: none;
	  flex-direction: column;
	  position: absolute;
	  top: 70px;
	  left: 0;
	  width: 100%;
	  background: white;
	  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	  border-bottom: 2px solid #e9ecef;
	}
  
	nav.open {
	  display: flex;
	}
  
	nav ul {
	  flex-direction: column;
	  width: 100%;
	}
  
	nav li {
	  width: 100%;
	}
  
	nav button {
	  width: 100%;
	  text-align: center;
	  padding: 12px;
	}
  }
  </style>
  