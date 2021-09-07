<template>
  <div class="view">
    <div class="room">
      <dv-border-box-11
        class="dv-border-box-11"
        :title="collegeName"
        style="width: 100%;
        height: 100%"
      >
        <el-table
          @row-click="getDetails"
          ref="multipleTable"
          height="80%"
          :cell-style="cellStyle"
          align="center"
          :data="coursesData"
          tooltip-effect="dark"
          style="width: 90%;position: relative;left: 5%;top:15%;color: #FFFFFF"
        >
          <el-table-column
            label="课程名称"
            width="120"
            prop="courseName"
          />
          <el-table-column
            label="教室号"
            width="100"
            prop="courseRoom"
          />
          <el-table-column
            label="监控设备"
            width="100"
            prop="camera"
          />
          <el-table-column
            v-model="checked"
            type="selection"
            width="60"
            prop="show"
          />
<!--          <el-table-column-->
<!--            label="显示"-->
<!--            width="60"-->
<!--            align="center">-->
<!--            <template>-->
<!--              <el-checkbox></el-checkbox>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </dv-border-box-11>
      <dv-border-box-8
        class="dv-border-box-8"
      >
        <dv-decoration-7
          style="
          width: 200px;
          height: 30px;
          font-size: 22px;
          margin-left: 30%;
          color: #e4e4e4fc;
          overflow: hidden;
        "
        >实时分析结果</dv-decoration-7>
        <marquee
          class="content1"
          width="100%"
          height="400px"
          direction="up"
          behavior="scroll"
          scrolldelay="10000"
          scrollamount="250"
          on-mouse-out="this.start()"
          on-mouse-over="this.stop()"
        >
          <div v-for="val in analyseResults" :key="val" class="text">
            <div id="analyse_results">
<!--<<<<<<< HEAD-->
              <span class="classId" style="width:80px;height:40px;margin-left:30px;font-size:35px;padding-top:30px">
                {{ val.Classroom }}
              </span>
              <span class="lineTwo">
                <!-- font-color should be RED. -->
                <span class="className" style="width:30px;height:10px">课程名称：C语言程序设计</span>
                <span class="badNum" style="display:block;margin-left:122px">
              玩游戏人数：{{ val.PlayingNum }}
              睡觉人数：{{ val.SleepingNum }}
              </span>
               </span>
               <span class="goodNum" style="display:block;margin-left:122px">
              <!-- font-color should be YELLOW -->
               做笔记人数：{{ val.WritingNum }}
              <!-- font-color should be GREEN -->
               听课人数：{{ val.ListeningNum }}
               </span>
<!--=======-->
              <p>
                教室号：{{ val.Classroom }}
                玩手机人数：{{ val.PlayingNum }}
                睡觉人数：{{ val.SleepingNum }}
              </p>

              <p>
                <!-- font-color should be RED. -->
                {{ val.PlayingNum }}
              </p>

              <p>
                <!-- font-color should be YELLOW -->
                {{ val.WritingNum }}
              </p>

              <p>
                <!-- font-color should be GREEN -->
                {{ val.ListeningNum }}
              </p>
<!--&gt;>>>>>> 1f960f6c279000a1d81a8f6028b0fac5161336f2-->
            </div>
            <div class="link-top" />
          </div>
        </marquee>
      </dv-border-box-8>
    </div>
    <div class="camera">
      <dv-border-box-11 :title="courseName">
        <div style="width: 94%;height:92%;position:absolute;top:5%;left:4%;">
          <video
            v-for="(videosrc) in checkList"
            controls="controls"
            v-bind:key="videosrc"
            style="height:31%;width:31%;margin:1%;margin-bottom: 0.5%"></video>
        </div>
        <!-- <span v-if="showPic" class="fapic">
          <video v-for="(val, key) in checkList" :key="key+10" class="video" controls muted />
        </span> -->
<!--<<<<<<< HEAD-->
<!--        <img class="imgfix" src="http://172.17.130.212:8082/images/demo1.jpg" alt="none">-->
<!--=======-->
<!--        <img :src="demoImg" alt="none">-->
<!--&gt;>>>>>> 1f960f6c279000a1d81a8f6028b0fac5161336f2-->
<!--        <div-->
<!--          style="width:30%;height:30%;background-color: #FFFFFF;position: absolute;top: 6%;left: 5%">-->
<!--          &lt;!&ndash;          v-for="(videxsrc,index)in checkList"&ndash;&gt;-->
<!--          &lt;!&ndash;          v-bind:key="index">&ndash;&gt;-->
<!--          <video :src="videxsrc" controls="controls" style="height: 100%;width: 100%"></video>-->
<!--        </div>-->
      </dv-border-box-11>
    </div>
  </div>
</template>
<script>
const classval = []
const items = {}
// import config from '@/assets/config'
import axios from 'axios'
import ip from '@/assets/ip'

export default {
  name: 'FloorOne',
  data() {
    return {
      demoImg: `${ip.cssd_trans}/images/demo1.jpg`,
      analyseResults: [],
      checked: true,
      showPic: false,
      showPushData: [],
      floor: '',
      floorName: '',
      checkAll: false,
      classval,
      checkList: [],
      items,
      num: 1,
      img: '',
      floorData: [],
      collegeName: '信息工程学院',
      colleges: ['信息工程学院', '应急管理学院'],
      courses: ['Python程序设计', 'C语言程序设计', '思想道德修养与法律基础', '大学英语1', '大学语文', '网络工程专业导论', '自然灾害概论'],
      courseName: 'Python程序设计',
      coursesData: []
    }
  },
  // 监听路由，实现组件复用
  watch: {

    $route(to, from) {
      const nums = this.$route.query.id
      for (let i = 0; i < 6; i++) {
        if (nums === i) {
          this.showPIc = true
          this.collegeName = this.college[i]
          break
        }
      }
    }
  },
  mounted() {
    console.log('fuck.')
    this.getHealthInfo()
    this.getResults()
    this.getCoursesData()
  },
  created() {
    this.handleParmes()
    const indexPushData = []
    const rooms = Object.keys(this.items)
    console.log(rooms)
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i]
      console.log(room)
      const data = {}
      data['cameraid'] = room
      if (i === 3) {
        data['status'] = 'offline'
      } else {
        data['status'] = 'online'
      }
      data['source'] = this.courses[i]
      indexPushData.push(data)
    }
    console.log('--------------------------')
    console.log(indexPushData)
    this.showPushData = indexPushData
  },

  methods: {
    // 左上角显示信息数据获取
    async getCoursesData() {
      const response = await axios.get(`${ip.cssd_trans}/api/v1/getCourseData`)
      const courseInfo = response.data.data
      for (const item of courseInfo) {
        const data = {}
        data['courseName'] = item.CourseName
        data['courseRoom'] = item.CourseRoom
        data['camera'] = '在线'
        this.coursesData.push(data)
      }
      console.log(this.courseData)
    },

    // 监控设备在线数据获取
    async getHealthInfo() {
      const form = new FormData()
      form.append('classrooms', 'N111,N112')

      const response = await axios({
        method: 'post',
        url: `${ip.cssd_trans}/api/v1/healthcheck`,
        data: form
      })
      console.log(response.data.data)
    },

    // 左下角实时分析结果数据获取
    async getResults() {
      const classrooms = 'N111,N112,N113'
      const response = await axios.get(
        `${ip.cssd_trans}/api/v1/getResults?classrooms=${classrooms}`
      )
      this.analyseResults = response.data.data
    },
    // 获取表格内容(教室号等)
    getDetails(row) {
      console.log(row.className)
      this.checkList.push(row.className)
    },
    cellStyle(row) { // 根据显示颜色
      if (row.column.label === '监控设备' && row.row.camera === '在线') {
        return 'color:#25f52b'
      } else if (row.column.label === '监控设备' && row.row.camera === '离线') {
        return 'color:#ff1111'
      }
    }
    // 路由参数判断
    // handleParmes() {
    //   const nums = this.$route.query.type
    //   for (let i = 0; i < 11; i++) {
    //     if (nums === this.floorNum[i]) {
    //       this.showPIc = true
    //       this.floor = this.college[i]
    //       this.items = this.floorData[i]
    //       break
    //     }
    //   }
    // },
  }
}
</script>
<style>
.view{
  width: 100%;
}
.room{
  width: 25%;
  height: 40%;
  position: absolute;
  top: 10%;
}
.imgfix{
  margin-top: 65px;
  margin-left: 30px;
  width: 96%;
  height: 90%;
}
.dv-border-box-8{
  height: 485px !important;
  overflow: hidden;
  margin-top: 50px;
  width:100% !important

}
.camera{
  position: absolute;
  left:25%;
  top: 10%;
  width: 75%;
  height: 90%;
}
.camera dv-border-box-11 {
  z-index: 999;
}
.content1 {
  margin-top: 30px;
  height: 300px;
  /*margin-left: 50px;*/
}
/*<<<<<<< HEAD*/

/*=======*/
.text {
  width: 100%;
  color: #eef4f9;
  font-family: "楷体", "楷体_GB2312";
  padding: 10px;
  height: 20px;
  font-size: 25px;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
  margin-bottom: 5px;
}
>>>>>>> 1f960f6c279000a1d81a8f6028b0fac5161336f2
.fapic {
  min-width: 400px;
  display: inherit;
  overflow: hidden;
  float: left;
  width: 85%;
  height: 100%;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}/*表格透明*/
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
}
::-webkit-scrollbar-track{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
}/*滚动条的滑轨背景颜色*/
::-webkit-scrollbar-thumb{
  background-color: rgba(0,0,0,0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(75, 75, 75, 0.58);
}/*滑块颜色*/
::-webkit-scrollbar-thumb{
  background-color: rgba(0,0,0,0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(48, 48, 48, 0.92);
}
::-webkit-scrollbar{
  width: 16px;
  height: 16px;
}/* 滑块整体设置*/
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb{
  border-radius: 999px;
  border: 5px solid transparent;
}
::-webkit-scrollbar-track{
  box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset;
}
::-webkit-scrollbar-thumb{
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(255,255,255,.5) inset;
}
::-webkit-scrollbar-corner{
  background: transparent;
}/* 横向滚动条和纵向滚动条相交处尖角的颜色 */
.content1 {
  margin-top: 30px;
  height: 300px;
  /*margin-left: 50px;*/
}
.text {
  width: 100%;
  color: #eef4f9;
  font-family: "楷体", "楷体_GB2312";
  padding: 10px;
  height: 120px;
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
</style>
