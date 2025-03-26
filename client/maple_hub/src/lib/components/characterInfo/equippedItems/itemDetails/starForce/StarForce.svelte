<script lang="ts">
    import { onMount } from "svelte";
    import "./StarForce.css";

    export let req_level: string;
    export let startNum: string;
    let Max: number;

    onMount(() => {
        const reqLevelNum = parseInt(req_level, 10);

        if (reqLevelNum < 95) {
            Max = 5;
        } else if (reqLevelNum <= 107) {
            Max = 8;
        } else if (reqLevelNum <= 117) {
            Max = 10;
        } else if (reqLevelNum <= 127) {
            Max = 15;
        } else if (reqLevelNum <= 137) {
            Max = 20;
        } else {
            Max = 30;
        }
    });
</script>

<div class="star-container">
    {#each Array.from({ length: Number(startNum) }) as _, i}
        <div class="star yellow"></div>
    {/each}
    {#each Array.from({ length: (Max - Number(startNum)) }) as _, i}
        <div class="star gray"></div>
    {/each}
</div>