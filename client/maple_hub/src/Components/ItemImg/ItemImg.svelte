<script lang="ts">
    export let itemImage;
</script>

    <div class="gradientBox">
        <img class="iconImage" src={itemImage} alt="착용 장비 이미지" />
        <div class="shadow"></div>
    </div>

<style>
.gradientBox {
  position: relative;
  background: linear-gradient(to bottom, #7C8895, #C4C5C6);
  display: inline-block;
  border-radius: 4px;
  display: flex;
  width: 60px;
  height: 60px;
  padding:5px;
  justify-content: center;
  align-items: center;  
}

.iconImage {
  position: relative;
  z-index: 10;
  display: block;
  width: 90%;
  height: 90%;
  object-fit: contain;
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
</style>