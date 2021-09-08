<template>
  <div class="view">
    <div class="room">
      <dv-border-box-11
        class="dv-border-box-11"
        :title="floor"
        style="width: 100%;
        height: 100%"
      >
        <el-table
          ref="multipleTable"
          height="80%"
          :cell-style="cellStyle"
          align="center"
          :data="showPushData"
          tooltip-effect="dark"
          class="elTable"
          @select="itemHandleSelectionChange"
        >
          <el-table-column
            label="课程名称"
            align="center"
            width="120"
            prop="courseName"
          />
          <el-table-column
            label="教室号"
            width="100"
            align="center"
            prop="courseRoom"
          />
          <el-table-column
            label="监控设备"
            width="100"
            align="center"
            prop="camera"
          />
          <el-table-column
            v-model="checked"
            type="selection"
            align="center"
            width="60"
            prop="show"
          />
        </el-table>
      </dv-border-box-11>
      <dv-border-box-8
        class="outbox"
        style="height: 450px; overflow: hidden; margin-top: 50px"
      >
        <dv-decoration-7
          class="dv-decoration-7"
        >
          实时分析结果</dv-decoration-7>
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
              <div
                class="classId"
              >
                {{ val.Classroom }}
              </div>
              <div class="rightbox">
                <span class="lineTwo">
                  <span class="className">
                    课程名称：C语言程序设计
                  </span>
                  <span class="badNum">
                    玩游戏人数：<span class="fontColor">{{ val.PlayingNum }}
                    </span>
                    睡觉人数：<span
                      class="fontColor"
                    >{{ val.SleepingNum }}
                    </span>
                  </span>
                </span>
                <span class="goodNum">
                  做笔记人数：<span
                    class="fontColor2"
                  >{{ val.WritingNum }}
                  </span>
                  <!-- font-color should be GREEN -->
                  听课人数：<span
                    class="fontColor3"
                  >{{ val.ListeningNum }}
                  </span>
                </span>
              </div>
            </div>
            <div class="link-top" />
          </div>
        </marquee>
      </dv-border-box-8>
    </div>
    <div class="camera">
      <dv-border-box-11 :title="courseName">
        <div class="videoBox">
          <video
            v-for="(videosrc) in checkList"
            :key="videosrc"
            class="videos"
            controls="controls"
          />
        </div>
      </dv-border-box-11>
    </div>
  </div>
</template>
<script>
const classval = []
const items = {}
import axios from 'axios'
import ip from '@/assets/ip'

export default {
  name: 'Detection',
  data() {
    return {
      analyseResults: [],
      checked: true,
      showPic: false,
      textbook: ['在猜数,估数,数数活动的过程在猜数,估数,数数活动的过程中培', '在猜数,估数,数数活动的过程中培', '在猜数,估数,数数活动的过程', '建立计数单位“千”的概念会正', '建立计数单位“千”的概', '建立计数单位“千”的概念会正确地读', '支持学生学习事项顺利完成', '支持学生学习事项顺利完成'],
      showPushData: [],
      floor: '',
      floorOne: '天仪楼一层',
      floorTwo: '天仪楼二层',
      floorThree: '天仪楼三层',
      floorFour: '天仪楼四层',
      floorFive: '天仪楼五层',
      floorSix: '天仪楼六层',
      checkAll: false,
      classval,
      checkList: [],
      items,
      num: 1,
      statusoff: '离线',
      status: '在线',
      img: ''
    }
  },
  // 监听路由，实现组件复用
  watch: {
    // 学院之间切换
    $route(to, from) {
      const nums = this.$route.query.type
      if (nums === 'one') {
        this.items = this.items1
        this.showPic = true
        this.floor = this.floorOne
        console.log(this.floor)
      } else if (nums === 'two') {
        this.items = this.items2
        this.showPic = true
        this.floor = this.floorTwo
      } else if (nums === 'three') {
        this.items = this.items3
        this.showPic = true
        this.floor = this.floorThree
      } else if (nums === 'four') {
        this.items = this.items4
        this.showPic = true
        this.floor = this.floorFour
      } else if (nums === 'five') {
        this.items = this.items5
        this.showPic = true
        this.floor = this.floorFive
      } else if (nums === 'six') {
        this.items = this.items6
        this.showPic = true
        this.floor = this.floorSix
      }
    }
  },

  mounted() {
    // 以下调用顺序不可更改
    this.getCoursesData()
    this.getHealthInfo()
    this.getResults()
  },
  methods: {
    // 左上角显示信息数据获取
    async getCoursesData() {
      const response = await axios.get(`${ip.cssd_trans}/api/v1/getCoursesData`)
      const courseInfo = response.data.data
      for (const item of courseInfo) {
        const data = {}
        data['courseName'] = item.CourseName
        data['courseRoom'] = item.CourseRoom
        data['camera'] = '在线'
        this.coursesData.push(data)
      }
    },

    // 监控设备在线数据获取
    async getHealthInfo() {
      for (const item of this.coursesData) {
        console.log(item.courseRoom)
      }
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

    // 获取表格内容(教室号等)
    itemHandleSelectionChange(selection, row) {
      const selected = selection.length && selection.indexOf(row) !== -1
      if (selected === true) {
        this.checkList.push(row.className)
        console.log(this.checkList)
      } else {
        this.checkList.splice(this.checkList.indexOf(row.className), 1)
      }
    },
    // 根据显示颜色
    cellStyle(row) {
      if (row.column.label === '监控设备' && row.row.camera === '在线') {
        return 'color:#25f52b'
      } else if (row.column.label === '监控设备' && row.row.camera === '离线') {
        return 'color:#ff1111'
      }
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
.videoBox{
  width: 94%;
  height:92%;
  position:absolute;
  top:5%;
  left:4%
}
.videos{
  height:31%;
  width:31%;
  margin:1%;
  margin-bottom: 0.5%

}
.dv-decoration-7{
  width: 200px !important;
  height: 30px !important;
  font-size: 22px;
  margin-left: 30%;
  color: #e4e4e4fc;
  overflow: hidden;
}
.dv-border-box-8 {
  height: 485px !important;
  overflow: hidden;
  margin-top: 50px;
  width: 100% !important;
}
.classId{
  color:red;
  width: 80px;
  height: 80px;
  margin-left: 30px;
  font-size: 40px;
  float:left;
  padding-top: 20px;
  font-weight:bold
}
.rightbox{
  width:400px;
  margin-left:2px

}
.className{
  width:30px;
  height:auto;
  margin-left: 15px
}
.badNum{
  display: block;
  margin-left: 122px;
  height:28px
}
.fontColor{
  color: red;
  display: inline-block
}
.goodNum{
  display: block;
  margin-left: 122px
}
.fontColor2{
  color: yellow;
  display: inline-block
}
.fontColor3{
  color: #25f52b;
  display: inline-block
}
.camera dv-border-box-11 {
  z-index: 999;
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
