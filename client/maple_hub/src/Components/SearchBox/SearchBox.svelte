<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let characterName = '';

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		if (characterName.trim()) {
			dispatch('search', { characterName });
		}
		characterName = "";
	};
</script>

<form class="search" on:submit={handleSubmit} role="search" aria-label="캐릭터 검색">
	<label for="characterName" class="sr-only">캐릭터 이름 입력</label>
	<input
		id="characterName"
		type="text"
		bind:value={characterName}
		placeholder="예: 타락파워전사, 도적"
		autocomplete="off"
		required
	/>
	<button id="searchButton" type="submit" aria-label="검색 버튼">검색</button>
</form>

<style>
	.search {
		display: flex;
		align-items: center;
		border: 2px solid var(--water_element1);
		border-radius: 20px;
		background-color: #ffffff;
		width: 100%;
		padding: 8px 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s ease-in-out;
	}

	.search:focus-within {
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
	}

	input {
		flex-grow: 1;
		height: 40px;
		border: none;
		font-size: 1rem;
		padding: 0;
		border-radius: 10px;
		background: transparent;
		outline: none;
		transition: all 0.3s ease;
	}

	#searchButton {
		background: var(--water_element1);
		color: white;
		border: none;
		border-radius: 10px;
		padding: 10px 15px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	#searchButton:hover {
		background: #0056b3;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
</style>
