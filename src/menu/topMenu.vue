<!-- src/menu/leftMenu.vue -->
<template>
 <div id="top-menu" >
      <!-- <el-color-picker v-model="color1"></el-color-picker> -->

 <p class="name">{{name}}</p>
 <div  class="img">
<img class="logo" :src="logoPath" />
<button class="btn" @click="out" v-bind:title="message">
  <i  id="icon" class="el-icon-s-promotion"></i>
   </button>  
</div>
 </div>
 
</template>
<script>
export default {
   data(){
      return{
         message:"退出登录"
      }
   },
   methods:{
out(){
   	this.$router.push('/')
}
   },
 name: 'topMenu',
 props: ['logoPath', 'name']
}
</script>
<style lang="scss" scoped>
 $topMenuWidth: 80px;
 $logoWidth: 50px;
//  $bg-color: #fbfdff;
 $name-color: #fff;
 $name-size: 18px;
 #top-menu[data-v-24ca59fd] {
    position: relative;
    height: 80px;
    margin-left: -18px;
   //  padding: 8px 20px 0px 20px;
   background-color: rgba(48,65,86);

 .logo {
  width: $logoWidth;
  display: inline-block;
  margin-top: 0px;
 }
 .img{
  margin-top: -43px;
    margin-left: 30px;
 }
.btn{
  position: absolute;

    right: 40px;
    font-size: 32px;
    top: 20px;
    cursor: pointer;
}
 .name{
  display: inline-block;
    vertical-align: bottom;
    color: #fff;
    font-size: 35px;
    margin-left: 97px;
    margin-top: 18px;
  

 }
 }
</style>