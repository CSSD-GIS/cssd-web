<!-- src/menu/menuIndex.vue -->
<template>
  <div class="clear">
    <div id="menu-index">
      <el-container>
        <el-header>
          <TopMenu :logo-path="logoPath" :name="name" />
        </el-header>
        <el-container id="left-container">
          <el-aside class="aside">
            <LeftMenu />
          </el-aside>
          <el-main class="el-main">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
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
.aside {
  width: 200px !important;
}

.el-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  overflow: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0px !important;
}
#left-container {
  top: 80px;
  bottom: 0px;
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
.el-aside {
  height: 100%;
  overflow: hidden !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
 #menu-index{
  height: 100%;
  width: 100%;

 .el-header{
  padding: 0
 }
 }
.clear{
   height: 100%;
  width: 100%;
  overflow: hidden !important;
}
</style>
