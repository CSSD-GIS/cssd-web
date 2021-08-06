<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <!-- 使用原生html标签，如使用element组件会造成图片显示频闪 -->
      <img id="video" :src="img" alt="">
    </div>
    <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style>
.block {
  width: 1500px;
  height: 1200px;
}

</style>
