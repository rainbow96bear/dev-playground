<script lang="ts">
    export let className : string = '';
    export let characterInfo;
</script>

<div class='{className} main_info'>
    <img src={characterInfo.character_image} alt="캐릭터 이미지" />
    <div class="text_main_info">
      <div class="nickname">{characterInfo.character_name}</div>
      <div>{characterInfo.character_class} | Lv.{characterInfo.character_level}</div>
      <div>{characterInfo.world_name} / {characterInfo.character_guild_name || '길드 없음'}</div>
    </div>
</div>

<style>
.main_info{
  display: flex;
}

.text_main_info {
	padding: 10px 0px 10px 10px;
}

.nickname {
	font-size: 1.4rem;
}
</style>