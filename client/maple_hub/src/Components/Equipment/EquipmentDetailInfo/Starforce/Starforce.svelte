<script lang="ts">
    import { onMount } from "svelte";

    export let req_level: string;
    export let startNum: string;
    let Max: number = 0;

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

<section aria-label="Star Force 강화 단계">
    <h2 class="visuallyHidden">강화 단계</h2>
    <ul class="starContainer" role="list">
        {#each Array.from({ length: Number(startNum) }) as _, i}
            <li class="starWrapper" aria-label="강화됨">
                <div class="star border"></div>
                <div class="star yellow"></div>
            </li>
        {/each}
        {#each Array.from({ length: Max - Number(startNum) }) as _, i}
            <li class="starWrapper" aria-label="미강화">
                <div class="star border"></div>
                <div class="star gray"></div>
            </li>
        {/each}
    </ul>
</section>

<style>
  .starWrapper {
    position: relative;
    width: 12px;
    height: 12px;
    margin: 5px 0px;
}

.star {
    position: absolute;
    width: 12px;
    height: 12px;
    clip-path: polygon(
        50% 0%, 68% 27%, 98% 35%, 77.03% 60.51%, 79% 91%,
        50% 79.2%, 21% 91%, 22.97% 60.51%, 2% 35%, 32% 27%
    );
}

.border {
    background-color: #485763;
    transform: scale(1.2);
    z-index: 0;
}

.yellow {
    background-color: gold;
    z-index: 1;
}

.gray {
    background-color: #21282F;
    z-index: 1;
}

.starContainer {
    display: flex;
    justify-content: center;
    max-width: 200px;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: auto;
}

.starContainer .starWrapper:nth-child(5n) {
    margin-right: 7px;
}

.starContainer .starWrapper:nth-child(15),
.starContainer .starWrapper:last-child {
    margin-right: 0;
}
</style>
