<!-- src/menu/menuIndex.vue -->
<template>
  <div id="menu-index">
    <el-container>
      <el-header>
        <TopMenu :logo-path="logoPath" :name="name" />
      </el-header>
      <el-container id="left-container">
        <el-aside width="200px">
          <LeftMenu />
        </el-aside>
        <el-main class="el-main">
          <router-view />
          <!-- <router-view></router-view> -->
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view/>/ -->
  </div>
</template>
<script>
import LeftMenu from './leftMenu'
import TopMenu from './topMenu'
import { tokentest } from '@/api/user'

export default {
  name: 'MenuIndex',
  components: { LeftMenu, TopMenu },
  data() {
    return {
      logoPath: require('../assets/images/person.svg'),
      name: '课堂学生行为检测系统'
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      tokentest(token
      ).then((res) => {
        console.log(res)
        alert(res)
        this.$router.push('/main')
      }
      ).catch((error) => {
        console.log(error)
        // console.error(error.response.data)
        this.$message.error(error.response.data.msg)
        this.$router.push('/login')
      })
    } else {
      this.$router.push('/login')
      // this.$message.error('请先登录！')
    }
  }
}
</script>
<style lang="scss">
// 使左边的菜单外层的元素高度充满屏幕
#left-container {
  .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 !important;
}
  position: absolute;
  top: 80px;
  bottom: 0;
  }
  #left-container .el-menu-vertical-demo {
    height: 100%;
    // background-color: #f1f1f3;
}
#left-container.el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 !important;
}
 #menu-index{
 .el-header{
  padding: 0
 }
 }

</style>
