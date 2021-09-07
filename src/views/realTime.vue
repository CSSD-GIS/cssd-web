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
          ref="multipleTable"
          height="80%"
          :cell-style="cellStyle"
          align="center"
          :data="courseData"
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
            show-overflow-tooltip
          />
          <el-table-column
            v-model="checked"
            type="selection"
            width="55"
            prop="show"
            label="显示"
          />
        </el-table>
      </dv-border-box-11>
      <dv-border-box-8
        class="outbox"
        style="height: 450px; overflow: hidden; margin-top: 50px"
      >
        <dv-decoration-7
          style="
          width: 200px;
          height: 30px;
          font-size: 22px;
          margin-left: 20%;
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
              {{ val.Classroom }}
              <!-- font-color should be RED. -->
              {{ val.PlayingNum }}
              {{ val.SleepingNum }}
              <!-- font-color should be YELLOW -->
              {{ val.WritingNum }}
              <!-- font-color should be GREEN -->
              {{ val.ListeningNum }}
            </div>
            <div class="link-top" />
          </div>
        </marquee>
      </dv-border-box-8>
    </div>
    <div class="camera">
      <dv-border-box-11 :title='courseName'>
        <!-- <span v-if="showPic" class="fapic">
          <video v-for="(val, key) in checkList" :key="key+10" class="video" controls muted />
        </span> -->
        <img src="http://localhost:8082/images/demo.png" alt="none">
      </dv-border-box-11>
    </div>
  </div>
</template>
<script>
const classval = []
const items = {}
import config from '@/assets/config'
import axios from 'axios'
import ip from '@/assets/ip'
// 一层数据
const items1 = config.north.front.floor1
const arr1 = []
const array1 = []
for (const i in items1) {
  arr1.push(items1[i])
}

// 用   value   label将数据分开
for (const i in items1) {
  const obj = {
    value: items1[i],
    label: i
  }
  array1.push(obj)
}

// 二层数据
const items2 = config.north.front.floor2
const arr2 = []
const array2 = []
for (const i in items2) {
  arr2.push(items2[i])
}
// 用 value   label将数据分开
for (const i in items2) {
  const obj = {
    value: items2[i],
    label: i
  }
  array2.push(obj)
}
// 三层数据
const items3 = config.north.front.floor3
const arr3 = []
const array3 = []
for (const i in items3) {
  arr3.push(items3[i])
}
// 用   value   label将数据分开
for (const i in items3) {
  const obj = {
    value: items3[i],
    label: i
  }
  array3.push(obj)
}
// 四层数据
const items4 = config.north.front.floor4
const arr4 = []
const array4 = []
for (const i in items4) {
  arr4.push(items4[i])
}
// 用   value   label将数据分开
for (var i in items4) {
  const obj = {
    value: items4[i],
    label: i
  }
  array4.push(obj)
}
// 五层数据
const items5 = config.north.front.floor5
const arr5 = []
const array5 = []
for (const i in items5) {
  arr5.push(items5[i])
}
// 用   value   label将数据分开
for (const i in items5) {
  const obj = {
    value: items5[i],
    label: i
  }
  array5.push(obj)
}
// 六层数据
const items6 = config.north.front.floor6
const arr6 = []
const array6 = []
for (const i in items6) {
  arr6.push(items6[i])
}
// 用   value   label将数据分开
for (const i in items6) {
  const obj = {
    value: items6[i],
    label: i
  }
  array6.push(obj)
}

export default {
  name: 'FloorOne',
  data() {
    return {
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
      courseData: []
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
    this.getFloorData()
    this.getCourseData()
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
    // 获取JSON文件中的楼层数据
    getFloorData() {
      for (let i = 1; i < 7; i++) {
        const data = `config.north.front.floor${i}`
        this.floorData.push(data)
      }
    },

    async getCourseData() {
      const response = await axios.get(`${ip.cssd_trans}/api/v1/getCourseData`)
      const courseInfo = response.data.data
      for (const item of courseInfo) {
        const data = {}
        data['courseName'] = item.CourseName
        data['courseRoom'] = item.CourseRoom
        data['camera'] = '在线'
        this.courseData.push(data)
      }
      console.log(this.courseData)
    },
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

    async getResults() {
      const classrooms = 'N111,N112,N113'
      const response = await axios.get(
        `${ip.cssd_trans}/api/v1/getResults?classrooms=${classrooms}`
      )
      this.analyseResults = response.data.data
    },

    cellStyle(row) { // 根据显示颜色
      if (row.column.label === '监控设备' && row.row.camera === '在线') {
        return 'color:#25f52b'
      } else if (row.column.label === '监控设备' && row.row.camera === '离线') {
        return 'color:#ff1111'
      }
    },
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
    handleChange(v) {
      // console.log(v);    打印出来为一个数组，第二个值为URL
      this.$alert(v[1], '标题名称', {
        confirmButtonText: '确定'
      })
    }

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
.camera img {
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 99%;
  height: 95%;
}
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
  height: 20px;
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
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
  height: 20px;
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
</style>
