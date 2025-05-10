<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let characterName = '';

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		if (characterName.trim()) {
			dispatch('search', { characterName });
		}
		characterName = ""
	};
</script>

<form class="search" on:submit={handleSubmit}>
	<label for="characterName" class="sr-only"></label>
	<input
		id="characterName"
		type="text"
		bind:value={characterName}
		placeholder="캐릭터를 검색하세요"
		autocomplete="off"
	/>
	<button id="searchButton" type="submit">검색</button>
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
</style>
