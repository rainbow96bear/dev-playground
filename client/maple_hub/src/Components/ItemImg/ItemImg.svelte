<script lang="ts">
  export let itemImage: string | null = null;
  export let alt: string = "장비 이미지";
</script>

{#if itemImage}
  <figure class="gradientBox" role="img" aria-label={alt}>
    <img class="iconImage" src={itemImage} alt={alt} />
    <div class="shadow" aria-hidden="true"></div>
    <figcaption class="sr-only">{alt}</figcaption>
  </figure>
{:else}
  <div class="gradientBox" aria-hidden="true">
    <div class="iconImage empty"></div>
    <div class="shadow"></div>
  </div>
{/if}

<style>
.gradientBox {
  position: relative;
  background: linear-gradient(to bottom, #7C8895, #C4C5C6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  padding: 5px;
}

.iconImage {
  position: relative;
  z-index: 10;
  display: block;
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.iconImage.empty {
  background-color: transparent;
}

.shadow {
  position: absolute;
  bottom: 17.5%;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 60%;
  height: 7px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  z-index: 0;
  filter: blur(2px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
