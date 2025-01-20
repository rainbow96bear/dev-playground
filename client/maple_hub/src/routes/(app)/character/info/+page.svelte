<script lang="ts">
    import CharacterInfo from '$lib/components/characterInfo/CharacterInfo.svelte';
    import { characterInfo } from "$lib/store";
	import { onDestroy } from 'svelte';
    import "./+page.css";

    export let data: any; 
    $: if (data) {
        characterInfo.set(data);
    }
    onDestroy(() => {
        characterInfo.set(null);
    });
</script>

<div class="{characterInfo ? 'fade-in' : ''}">
    <CharacterInfo/>
</div>
