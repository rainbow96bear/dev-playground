<script lang="ts">
	import { page } from '$app/stores';
	export let className: string = '';
	export let path: string = '';

	let characterName = '';

	const action = path || $page.url.pathname;
</script>

<div class="{className}">
	<form class="search" method="GET" action={action}>
		<input 
			type="text" 
			name="name"
			bind:value={characterName} 
			placeholder="캐릭터를 검색하세요" 
		/>
		<button id="searchButton" type="submit">검색</button>
	</form>
</div>

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
	padding: 0px;
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

#searchButton:active {
	transform: scale(0.95);
	box-shadow:
		inset 4px 4px 8px rgba(0, 0, 0, 0.1),
		inset -4px -4px 8px rgba(255, 255, 255, 0.7);
}

@media (max-width: 480px) {
	.searchBox {
		max-width: 100%;
		padding: 6px 10px;
	}

	input {
		font-size: 0.9rem;
	}

	#searchButton {
		padding: 8px 12px;
		font-size: 0.9rem;
	}
}

</style>