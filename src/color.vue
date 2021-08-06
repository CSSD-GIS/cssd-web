<template>
  <div>
    <el-dropdown @command="handleCommand">
         <div style="color: white; font-size: 22px;margin-right: 20px; cursor: pointer;">
           主题
         </div>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item command="theme-blue">蓝色</el-dropdown-item>
           <el-dropdown-item command="theme-purple">紫色</el-dropdown-item>
         </el-dropdown-menu>
    </el-dropdown>
     <el-button type="primary">查看主题是否变色</el-button>
   </div>
</template>
<script>
import { toggleClass } from '../utils/index'
export default {
 computed: {
   themecolor: {
     get () {
       return this.$store.state.tcolor
     }
   }
 },
 mounted() {
   toggleClass(document.body, this.tcolor)
 },
 methods: {
   handleCommand(command) {
     if (command === 'theme-blue') {
       this.$store.commit('setTColor', command)
       toggleClass(document.body, this.tcolor)
     } else {
       this.$store.commit('setTColor', command)
       toggleClass(document.body, this.tcolor)
     }
   }
 }
}
