<!-- src/menu/leftMenu.vue -->
<template>
  <el-menu id="left-menu" class="el-menu-vertical" :collapse="isCollapse">
    <!-- @open="handleOpen"   -->
    <i class="el-icon-s-fold" @click="isC" />
    <div class=".el-tooltip__popper.is-dark">
      <el-menu-item class="left-menu-item" index="1">
        <i class="el-icon-user-solid" />
        <span slot="title" class="text">首页</span>
      </el-menu-item>
    </div>
    <router-link to="/views/class">
      <el-menu-item index="2">
        <i class="el-icon-camera" />
        <span slot="title" class="text">视频画面</span>
        <router-view name="Class" />
      </el-menu-item>
    </router-link>
    <router-link :to="{ path: '/views/realTime', query: { type: 'null' } }">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-folder-remove" />
          <span slot="title" class="text">实时画面</span>
        </template>
        <router-link :to="{ path: '/views/realTime', query: { type: 'one' } }">
          <el-menu-item index="1-1">
            <i class="el-icon-location" />天仪楼一层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'two' } }">
          <el-menu-item index="1-2">
            <i class="el-icon-location" />天仪楼二层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'three' } }">
          <el-menu-item index="1-3">
            <i class="el-icon-location" />天仪楼三层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'four' } }">
          <el-menu-item index="1-4">
            <i class="el-icon-location" />天仪楼四层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'five' } }">
          <el-menu-item index="1-5">
            <i class="el-icon-location" />天仪楼五层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/realTime', query: { type: 'six' } }">
          <el-menu-item index="1-6">
            <i class="el-icon-location" />天仪楼六层
          </el-menu-item>
        </router-link>
      </el-submenu>
    </router-link>
    <router-link :to="{ path: '/views/floorOne', query: { id: 'null' } }">
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-folder-remove" />
          <span slot="title" class="text">检测画面</span>
        </template>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'one' } }">
          <el-menu-item index="3-1">
            <i class="el-icon-location" />天仪楼一层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'two' } }">
          <el-menu-item index="3-2">
            <i class="el-icon-location" />天仪楼二层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'three' } }">
          <el-menu-item index="3-3">
            <i class="el-icon-location" />天仪楼三层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'four' } }">
          <el-menu-item index="3-4">
            <i class="el-icon-location" />天仪楼四层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'five' } }">
          <el-menu-item index="3-5">
            <i class="el-icon-location" />天仪楼五层
          </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/views/floorOne', query: { id: 'six' } }">
          <el-menu-item index="3-6">
            <i class="el-icon-location" />天仪楼六层
          </el-menu-item>
        </router-link>
      </el-submenu>
    </router-link>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-folder-remove" />
        <span slot="title" class="text">文件上传</span>
      </template>
      <router-link to="/views/img">
        <el-menu-item index="4-1">
          <i class="el-icon-money" />图片</el-menu-item>
      </router-link>
      <router-link to="/views/video">
        <el-menu-item index="4-2">
          <i class="el-icon-video-camera-solid" />视频</el-menu-item>
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
  display:none;
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
  margin-top: 20px;
  height: 1000px;
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

  list-style: none;
  margin: 0;
  padding-left: 10px ;

}
.text {
  font-size: 20px;
  color: #0e3379;
}
</style>
