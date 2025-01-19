<script lang="ts">
    import CharacterInfo from '$lib/components/characterInfo/CharacterInfo.svelte';
    import { characterInfo } from "$lib/store";
    import "./+page.css";

    export let resCharacterInfo: any; 

    $: if (resCharacterInfo) {
        characterInfo.set(resCharacterInfo);
    }
</script>

<div class="{characterInfo ? 'fade-in' : ''}">
    <CharacterInfo/>
</div>
