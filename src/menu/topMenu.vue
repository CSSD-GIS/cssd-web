<!-- src/menu/leftMenu.vue -->
<template>
  <div id="top-menu">

    <!-- <p class="name"> {{ name }} </p>
    <div class="img">
     <img class="logo" :src="logoPath" alt="">
      <button class="btn" :v-bind="message" @click="out">
        <i id="icon" class="el-icon-s-promotion" />
      </button>
    </div> -->
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-sub-menu index="1">
    <template #title>
    <span slot="title" class="text">实时画面</span>
    </template>
    <el-menu-item index="1-1">天仪楼一层</el-menu-item>
    <el-menu-item index="1-2">天仪楼二层</el-menu-item>
    <el-menu-item index="1-3">天仪楼三层</el-menu-item>
    <el-menu-item index="1-4">天仪楼四层</el-menu-item>
    <el-menu-item index="1-5">天仪楼五层</el-menu-item>
    <el-menu-item index="1-6">天仪楼六层</el-menu-item>
  </el-sub-menu>
  <el-sub-menu index="2">
    <template #title>检测画面</template>
    <el-menu-item index="2-1">天仪楼一层</el-menu-item>
    <el-menu-item index="2-2">天仪楼二层</el-menu-item>
    <el-menu-item index="2-3">天仪楼三层</el-menu-item>
    <el-menu-item index="2-4">天仪楼四层</el-menu-item>
    <el-menu-item index="2-5">天仪楼五层</el-menu-item>
    <el-menu-item index="2-6">天仪楼六层</el-menu-item>
  </el-sub-menu>
</el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logoPath: require('../assets/images/person.svg'),
      name: '课堂学生行为检测系统1989',
      message: '退出登录',
      activeIndex2: '1'
    }
  },
  methods: {
    out() {
      this.$router.push('/')
    }
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'ds-digitalnormal';
  src: url('../assets/css/font/ds-digi-webfont.woff2') format('woff2'), url('../assets/css/font/ds-digi-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
 $topMenuWidth: 80px;
 $logoWidth: 50px;
//  $bg-color: #fbfdff;
 $name-color: #fff;
 $name-size: 18px;
 #top-menu[data-v-24ca59fd] {
   position: relative;
   height: 80px;
   margin-left: -18px;
   background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
   background: #000000;
   .logo {
     width: $logoWidth;
     display: inline-block;
     margin-top: 0;
   }

   .img {
     margin-top: -43px;
     margin-left: 30px;
   }

   .btn {
     position: absolute;
     right: 40px;
     font-size: 32px;
     top: 20px;
     cursor: pointer;
   }

   .name {
     font-family: 'ds-digitalnormal';
     color: white;
     border: 1px solid #000000;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
     display: inline-block;
     vertical-align: bottom;
    //  font-family:cursive;
     font-size: 35px;
     margin-left: 97px;
     margin-top: 18px;
   }
 }
</style>
