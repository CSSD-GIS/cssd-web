<template>
  <div class="view">
    <div class="room">
      <dv-border-box-11
        class="dv-border-box-11"
        :title="collegeName"
      >
        <el-table
          ref="multipleTable"
          height="80%"
          :cell-style="cellStyle"
          align="center"
          :data="coursesData"
          tooltip-effect="dark"
          class="elTable"
          empty-text="暂无进行中的课程"
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
      <dv-border-box-8 class="dv-border-box-8">
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
          <div v-for="val in analyseResults" :key="val.Classroom" class="text">
            <div id="analyse_results">
              <div
                class="classId"
              >
                {{ val.Classroom }}
              </div>
              <div class="rightbox">
                <span class="lineTwo">
                  <span class="className">
                    {{ classCourse[val.Classroom] }}
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
      <dv-border-box-11 title="教室监控实时画面">
        <div class="videoBox">
          <video  v-if="judge" id="video" controls="controls" />
          <img v-else class="imgfix" :src="demoImg" alt="none">
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
// import Hls from '@/dist/hls'

export default {
  name: 'RealTime',
  data() {
    return {
      judge: true,
      demoImg: `${ip.cssd_trans}/images/demo2.jpg`,
      analyseResults: [],
      checked: true,
      showPic: false,
      floor: '',
      floorName: '',
      checkAll: false,
      classval,
      checkList: [],
      uri: '',
      items,
      num: 1,
      img: '',
      floorData: [],
      collegeName: '信息工程学院',
      colleges: ['信息工程学院', '应急管理学院'],
      coursesData: [],
      classrooms: '',
      classCourse: {},
      imgsUrl: []
    }
  },
  // 监听路由，实现组件复用
  watch: {
    // 学院之间切换
    $route(to, from) {
      const nums = this.$route.query.id
      for (let i = 0; i < 6; i++) {
        if (nums === i) {
          this.showPIc = true
          this.collegeName = this.college[i]
          break
        }
      }
      const names = this.$route.query.name
      if (names === 'detection') {
        this.judge = false
        this.getData()
        console.log(this.judge)
      }
      if (names === 'realTime') {
        this.judge = true
        console.log(this.judge)
        this.getData()
      }
    }
  },

  mounted() {
    this.getData()

    // 等待教室数据获取
    // if (this.classrooms.length === 0) {
    //   setTimeout(this.startPridect, 3000)
    // }

    // 每10s刷新一次数据
    setInterval(this.getData, 10000)

    this.getHlsIP('rtsp://admin:123456@10.128.98.159:554/h264/ch1/main/av_stream')

    // const video = document.getElementById('video')
    // const videoSrc = 'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8'
    // if (Hls.isSupported()) {
    //   const hls = new Hls()
    //   hls.loadSource(videoSrc)
    //   hls.attachMedia(video)
    // }
  },

  methods: {
    async getData() {
      // 课程数据获取
      const coursesResponse = await axios.get(`${ip.cssd_trans}/api/v1/getCoursesData`)
      const coursesInfo = coursesResponse.data.data

      // 获取所上课程的教室号
      const classesList = []
      for (const course of coursesInfo) {
        classesList.push(course.CourseRoom)
      }
      this.classrooms = classesList.join(',')

      // 根据所上课程教室号获取监控设备在线信息
      const cameraInfo = await this.getHealthInfo()
      const cameraData = {}
      for (const camera of cameraInfo) {
        cameraData[camera.className] = camera.isOnline
      }

      // 根据所上课程教室号获取实时分析结果数据
      this.analyseResults = await this.getResults()

      // 获取最新识别图片
      this.imgsUrl = await this.getLatestFrame()

      this.getCameraIP()
      // 左上角显示数据处理
      this.coursesData = []
      for (const course of coursesInfo) {
        const data = {}
        data['courseName'] = course.CourseName
        data['courseRoom'] = course.CourseRoom
        data['camera'] = cameraData[course.CourseRoom] === '1' ? '在线' : '离线'
        this.coursesData.push(data)
        this.classCourse[course.CourseRoom] = course.CourseName
      }
    },

    async startPridect() {
      const form = new FormData()
      form.append('classrooms', this.classrooms)

      const response = await axios({
        method: 'post',
        url: `${ip.cssd_trans}/api/v1/start`,
        data: form
      })
      this.$message({
        message: response.data.data.data,
        type: 'success'
      })
    },

    // 监控设备在线数据获取
    async getHealthInfo() {
      const form = new FormData()
      form.append('classrooms', this.classrooms)

      const response = await axios({
        method: 'post',
        url: `${ip.cssd_trans}/api/v1/healthcheck`,
        data: form
      })
      return response.data.data
    },

    // 实时分析结果数据获取
    async getResults() {
      const form = new FormData()
      form.append('classrooms', this.classrooms)

      const response = await axios({
        method: 'post',
        url: `${ip.cssd_trans}/api/v1/getResults`,
        data: form
      })
      return response.data.data
    },

    // 实时分析结果数据获取
    async getLatestFrame() {
      const form = new FormData()
      form.append('classrooms', this.classrooms)

      const response = await axios({
        method: 'post',
        url: `${ip.cssd_trans}/api/v1/getLatestFrame`,
        data: form
      })
      return response.data.data
    },

    async getCameraIP() {
      const form = new FormData()
      form.append('classrooms', this.classrooms)

      const response = await axios({
        method: 'post',
        url: `${ip.cssd_trans}/api/v1/parse`,
        data: form
      })
      console.log(response)
    },

    async getHlsIP(rtsp) {
      const response = await axios({
        method: 'post',
        url: `${ip.rh}/start`,
        data: {
          'uri': rtsp
        }
      })
      console.log('-------------------------')
      console.log(response.data.uri)
      this.uri = `${ip.rh}` + response.data.uri
    },

    // 获取表格内容(教室号等)
    itemHandleSelectionChange(selection, row) {
      const selected = selection.length && selection.indexOf(row) !== -1
      if (selected === true) {
        this.checkList.push(row.className)
      } else {
        this.checkList.splice(this.check.indexOf(row.className), 1)
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
.elTable{
  width: 90% !important;
  position: relative;
  left: 5%;
  top: 15%;
  color: #ffffff;
}
.view {
  width: 100%;
}
.room {
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
.imgfix {
  margin-top: 40px;
    margin-left: -13px;
    width: 100%;
    height: 95%;
    margin-bottom: 10px;
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
  margin-left: 2px;
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
  font-size: 30px;
width:30px;
 height:auto;
 margin-left: 15px
}
.badNum{
margin-top: 5px;
 display: block;
 margin-left: 95px;
 height:28px
}
.fontColor{
color: red;
 display: inline-block
}
.goodNum{
display: block;
margin-left: 95px
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
} /*表格透明*/
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
} /*滚动条的滑轨背景颜色*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(75, 75, 75, 0.58);
} /*滑块颜色*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(48, 48, 48, 0.92);
}
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
} /* 滑块整体设置*/
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}
::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.5) inset;
}
::-webkit-scrollbar-corner {
  background: transparent;
} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
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
.el-dropdown-menu a {
    text-align: center;
    margin-left: 11px;
    display: block;
}
.el-dropdown-menu {
    /* margin-right: 6px; */
    margin-left: 82px !important;
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    padding: 27px 0;
    /* margin: 5px 0; */
    background-color: #FFF;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
  .el-popper[x-placement^=bottom] .popper__arrow {
		border-bottom-color: #1EBEF4 !important;
		left: 50% !important;
	}

  </style>
