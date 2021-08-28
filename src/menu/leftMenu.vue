<!-- src/menu/leftMenu.vue -->
<template>
  <el-menu :collapse="isCollapse" id="left-menu" class="el-menu-vertical" >
    <!-- @open="handleOpen"   -->
    <i class="el-icon-s-fold" @click="isC"></i>
    <div class=".el-tooltip__popper.is-dark">
      <el-menu-item class="left-menu-item" index="1">
        <i class="el-icon-user-solid"></i>
        <span class="text" slot="title">首页</span>
      </el-menu-item>
    </div>
    <router-link to="/views/class">
      <el-menu-item index="2">
        <i class="el-icon-camera"></i>
        <span class="text" slot="title">视频画面</span>
        <router-view name="Class"></router-view>
      </el-menu-item>
    </router-link>
     <router-link :to="{ path: '/views/realTime', query: { type: 'null' } }">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-folder-remove"></i>
          <span class="text" slot="title">实时画面</span>
        </template>
        <router-link :to="{ path: '/views/realTime', query: { type: 'one' } }">
          <el-menu-item index="1-1">
            <i class="el-icon-location"></i>天仪楼一层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'two' } }">
          <el-menu-item index="1-2">
            <i class="el-icon-location"></i>天仪楼二层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'three' } }">
          <el-menu-item index="1-3">
            <i class="el-icon-location"></i>天仪楼三层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'four' } }">
          <el-menu-item index="1-4">
            <i class="el-icon-location"></i>天仪楼四层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'five' } }">
          <el-menu-item index="1-5">
            <i class="el-icon-location"></i>天仪楼五层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'six' } }">
          <el-menu-item index="1-6">
            <i class="el-icon-location"></i>天仪楼六层
          </el-menu-item>
        </router-link>
      </el-submenu>
    </router-link>
    <router-link :to="{ path: '/views/floorOne', query: { id: 'null' } }">
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-folder-remove"></i>
          <span class="text" slot="title">检测画面</span>
        </template>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'one' } }">
          <el-menu-item index="3-1">
            <i class="el-icon-location"></i>天仪楼一层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'two' } }">
          <el-menu-item index="3-2">
            <i class="el-icon-location"></i>天仪楼二层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'three' } }">
          <el-menu-item index="3-3">
            <i class="el-icon-location"></i>天仪楼三层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'four' } }">
          <el-menu-item index="3-4">
            <i class="el-icon-location"></i>天仪楼四层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'five' } }">
          <el-menu-item index="3-5">
            <i class="el-icon-location"></i>天仪楼五层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'six' } }">
          <el-menu-item index="3-6">
            <i class="el-icon-location"></i>天仪楼六层
          </el-menu-item>
        </router-link>
      </el-submenu>
    </router-link>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-folder-remove"></i>
        <span class="text" slot="title">文件上传</span>
      </template>
      <router-link to="/views/img">
        <el-menu-item index="4-1">
          <i class="el-icon-money"></i>图片</el-menu-item
        >
      </router-link>
      <router-link to="/views/video">
        <el-menu-item index="4-2">
          <i class="el-icon-video-camera-solid"></i>视频</el-menu-item
        >
      </router-link>
    </el-submenu>
  </el-menu>
</template>
<script>
import config from '@/config.json'
export default {
  name: 'LeftMenu',
  data() {
    return {
      id: 0,
      isCollapse: false,
      items1: config.north.front.floor1,
      items2: config.north.front.floor2,
      items3: config.north.front.floor3,
      items4: config.north.front.floor4,
      items5: config.north.front.floor5,
      items6: config.north.front.floor6,
      items7: config.south.front.floor1,
      items8: config.south.front.floor2,
      items9: config.south.front.floor3,
      items10: config.south.front.floor4,
      items11: config.south.front.floor5,
      items12: config.south.front.floor6
    }
  },
  methods: {
    isC() {
      this.isCollapse = !this.isCollapse
    }
    //     handleOpen(index){
    // if (index=="3-1") {
    //   let num =items1;
    //   console.log(num);
    //   console.log(items1);
    // }else if (index=="3-2") {
    //   let num =items2;
    //   //  console.log(num);
    //   // console.log(items2);
    // }
    //     },
  }
}
</script>
<style lang="scss">
//控制左侧边栏
.el-menu-vertical {
  // speak: none;
  font-style: normal;
  font-weight: 500;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  margin-top: 14px;
  font-size: 36px;
  -moz-osx-font-smoothing: grayscale;
}
.el-tooltip__popper.is-dark {
  background: #f6f8fa !important;

  color: #fff;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 300px;
}

#left-menu {
  height: 100%;
  background-color: #e3e3ea;
}
.el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #eef4f9;
}
.left-menu-item {
  // border-right: solid 1px #8f2929;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 10 ;
  // background-color: rgb(182, 58, 165);
}
.text {
  font-size: 20px;
  color: #6394ef;
}
</style>
