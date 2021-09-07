<template>
  <div class="clear">
    <div class="top">
      <span class="img">
        <span class="img1" />
      </span>
      <span class="titleName">课堂学生状态检测系统</span>
      <router-link :to="{ path: '/views/detection', query: { id: 'one' } }">
        <el-dropdown>
          <span ref="echarType" class="realTime">
            检测画面<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{ path: '/views/detection', query: { id: 'one' } }">
              <el-dropdown-item>天仪楼一层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/detection', query: { id: 'two' } }">
              <el-dropdown-item>天仪楼二层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/fdetection', query: { id: 'three' } }">
              <el-dropdown-item>天仪楼三层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/detection', query: { id: 'four' } }">
              <el-dropdown-item>天仪楼四层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/detection', query: { id: 'five' } }">
              <el-dropdown-item>天仪楼五层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/detection', query: { id: 'six' } }">
              <el-dropdown-item>天仪楼六层</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </router-link>
      <router-link :to="{ path: '/views/realTime', query: { type: 'one' } }">
        <el-dropdown>
          <span ref="echarType" class="realTime">
            实时画面<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{ path: '/views/realTime', query: { type: 'one' } }">
              <el-dropdown-item>天仪楼一层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/realTime', query: { type: 'two' } }">
              <el-dropdown-item>天仪楼二层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/realTime', query: { type: 'three' } }">
              <el-dropdown-item>天仪楼三层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/realTime', query: { type: 'four' } }">
              <el-dropdown-item>天仪楼四层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/realTime', query: { type: 'five' } }">
              <el-dropdown-item>天仪楼五层</el-dropdown-item>
            </router-link>
            <router-link :to="{ path: '/views/realTime', query: { type: 'six' } }">
              <el-dropdown-item>天仪楼六层</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </router-link>
      <router-link to="/views/show">
        <el-dropdown>
          <span ref="echarType" class="showChart">
            结果展示<i class="el-icon-arrow-down el-icon--right" />
          </span>
        </el-dropdown>
      </router-link>
      <span class="showTime">{{ showTime }}</span>
      <!--      <dv-decoration-10 style="width:1900px;height:5px;" />-->
      <router-view />
    </div>
  </div>
</template>

<script>
import { tokentest } from '@/api/user'

export default {
  data() {
    return {
      logoPath: require('../assets/images/person.svg'),
      showTime: ''
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
    this.time()
    this.timer = setInterval(() => {
      this.time(new Date()) // 修改数据date
    }, 500)
  },
  destroyed() {
    if (this.timer) { // 注意在vue实例销毁前，清除定时器
      clearInterval(this.timer)
    }
  },
  methods: {
    time() {
      const dt = new Date()
      const y = dt.getFullYear()
      const mt = dt.getMonth() + 1
      const day = dt.getDate()
      const h = dt.getHours().toString()
      const m = dt.getMinutes().toString()
      const s = dt.getSeconds().toString()
      const H = h.length < 2 ? '0' + h : h
      const M = m.length < 2 ? '0' + m : m
      const S = s.length < 2 ? '0' + s : s
      this.showTime = y + '年' + mt + '月' + day + '日' + H + ':' + M + ':' + S
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'ds-digitalnormal';
  src: url('../assets/css/font/ds-digi-webfont.woff2') format('woff2'), url('../assets/css/font/ds-digi-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.clear{
  background-image: url(../assets/images/background.jpg);

  /* background: radial-gradient(83.38% 83.38% at 50% 50%, rgba(20, 194, 249, 0.08) 0%, rgba(0, 2, 9, 0) 100%); */
  border: 1px solid rgba(13, 3, 70, 0.3);
  box-sizing: border-box;
  filter: drop-shadow(0px 0px 30px rgba(24, 254, 254, 0.2));
  height: 100%;
  width: 100%;
  overflow: hidden !important;
}
.img {
  outline: 8px dotted #001535;
  margin: 25px;
  margin-left: 39px;
  margin-right: -42px;
  float: left;
  width: 27px;
  height: 27px;
  background-color: brgb(52, 8, 104);
  border-radius: 100%;
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px #000;
  -webkit-transform: scale(1.5);
   }
.img1{
  float: inherit;
  outline: 1px dotted #d1ecf3;
  -webkit-box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgb(32 3 109);
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgb(9 103 220);
  -webkit-transform: scale(1.5);
  margin: 11px;
  width: 4px;
  height: 4px;
  border-radius: 94%;
  background-color: aqua;
   }
.top{
 height: 15%;
 width: 100%;
 border-bottom-color: rgb(3, 3, 53);
}
.el-icon--right {
    color: #5acdf9;
    margin-left: 5px;
}
.el-dropdown-menu {
background-color: rgba(0,0,2,0.3) !important;
    color: rgb(243, 243, 247);
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    margin: 5px 0;
    border: 1px  #0ac7c7;
    /* background-color: #1149b1; */
    /* box-shadow: 1px 1px  2px 2px  #5acdf9 inset !important; */
    border-radius: 4px;
    /* -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%); */
}
.el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #5acdf9 !important;
    cursor: pointer;
    outline: 0;
}
.realTime{
  float: left;
  margin-top: 32px;
  margin-left: 85px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 20px;
  color: aliceblue;
}
.showChart{
   float: left;
  margin-top: 32px;
  margin-left: 85px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 20px;
  color: aliceblue;
  cursor: pointer;
}
[class*=" el-icon-"], [class^=el-icon-] {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: none !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.realTime:hover{
  color: #5acdf9;
}
.showChart:hover{
  color: #5acdf9;
}
 .titleName {
  text-shadow: 2px 2px #646dec;
  float: left;
  font-family: 'KaiTi';
  color: white;
  display: inline-block;
  vertical-align: bottom;
  font-size: 40px;
  margin-left: 97px;
  margin-top: 13px;
   }
.showTime{
font-family: auto;
font-size: 30px;
right: 0ox;
color: #fff;
margin-right: 43px;
float: right;
margin-top: 23px;
   }
</style>
