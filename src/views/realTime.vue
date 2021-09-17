<template>
  <div class="view">
    <div class="room">
      <dv-border-box-11 class="dv-border-box-11" :title="collegeName">
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
            width="150"
            prop="courseName"
          />
          <el-table-column
            label="教室号"
            width="120"
            align="center"
            prop="courseRoom"
          />
          <el-table-column
            label="监控设备"
            width="120"
            align="center"
            prop="camera"
          />
          <!-- <el-table-column
            v-model="checked"
            type="selection"
            align="center"
            width="60"
            prop="show"
          /> -->
        </el-table>
      </dv-border-box-11>
      <dv-border-box-8 class="dv-border-box-8">
        <dv-decoration-7 class="dv-decoration-7"> 实时分析结果</dv-decoration-7>
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
              <div class="classId">
                {{ val.Classroom }}
              </div>
              <div class="rightbox">
                <span class="lineTwo">
                  <span class="className">
                    {{ classCourse[val.Classroom] }}
                  </span>
                  <span class="badNum">
                    玩手机人数：<span class="fontColor"
                      >{{ val.PlayingNum }}
                    </span>
                    睡觉人数：<span class="fontColor"
                      >{{ val.SleepingNum }}
                    </span>
                  </span>
                </span>
                <span class="goodNum">
                  做笔记人数：<span class="fontColor2"
                    >{{ val.WritingNum }}
                  </span>
                  <!-- font-color should be GREEN -->
                  听课人数：<span class="fontColor3"
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
          <!-- <div v-if="judge">111</div>
          <div v-else>222</div> -->
          <!--          <video v-if="judge" id="video" controls="controls" />-->
          <!-- <div class="imgebox"> -->
          <el-image
            v-for="imgurl in imgsUrl"
            :key="imgurl.url"
            class="imgsize"
            :src="imgurl.url"
            :preview-src-list="srcList"
          />
        </div>
        <!--          <img v-else class="imgfix" :src="demoImg" alt="none">-->
        <!-- </div> -->
      </dv-border-box-11>
    </div>
  </div>
</template>
<script>
const classval = [];
const items = {};
import axios from "axios";
import ip from "@/assets/ip";
// import Hls from '@/dist/hls'

export default {
  name: "RealTime",
  data() {
    return {
      judge: true,
      demoImg: `${ip.cssd_trans}/images/demo2.jpg`,
      analyseResults: [],
      checked: true,
      showPic: false,
      floor: "",
      floorName: "",
      checkAll: false,
      classval,
      checkList: [],
      uri: "",
      items,
      num: 1,
      img: "",
      floorData: [],
      collegeName: "信息工程学院",
      colleges: ["信息工程学院", "应急管理学院"],
      coursesData: [],
      classrooms: "",
      classCourse: {},
      imgsUrl: [],
      srcList: [],
    };
  },
  // 监听路由，实现组件复用
  watch: {
    // 学院之间切换
    $route(to, from) {
      const nums = this.$route.query.id;

      for (let i = 0; i < 6; i++) {
        if (nums === i) {
          this.showPIc = true;
          this.collegeName = this.college[i];
          break;
        }
      }
      const names = this.$route.query.name;
      if (names === "detection") {
        this.judge = false;
        this.getData();
      }
      if (names === "realTime") {
        this.judge = true;
        this.getData();
      }
    },
  },

  mounted() {
    this.getData();

    // 等待教室数据获取
    if (this.classrooms.length === 0) {
      setTimeout(this.startPridect, 3000);
    }

    // 每30s刷新一次数据
    setInterval(this.getData, 30000);

    this.getHlsIP(
      "rtsp://admin:123456@10.128.98.159:554/h264/ch1/main/av_stream"
    );

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
      const coursesResponse = await axios.get(
        `${ip.cssd_trans}/api/v1/getCoursesData`
      );
      const coursesInfo = coursesResponse.data.data;

      // 获取所上课程的教室号
      const classesList = [];
      for (const course of coursesInfo) {
        classesList.push(course.CourseRoom);
      }
      this.classrooms = classesList.join(",");

      // 根据所上课程教室号获取监控设备在线信息
      const cameraInfo = await this.getHealthInfo();
      const cameraData = {};
      for (const camera of cameraInfo) {
        cameraData[camera.className] = camera.isOnline;
      }

      // 根据所上课程教室号获取实时分析结果数据
      this.analyseResults = await this.getResults();

      // 获取最新识别图片
      const imgsData = await this.getLatestFrame();
      this.imgsUrl = [];
      this.srcList = [];
      for (const img of imgsData) {
        const data = {};
        data["url"] = `${ip.cssd_trans}${img.Url}`;
        data["classroom"] = img.Classroom;
        this.imgsUrl.push(data);
        this.srcList.push(`${ip.cssd_trans}${img.Url}`);
      }

      this.getCameraIP();
      // 左上角显示数据处理
      this.coursesData = [];
      for (const course of coursesInfo) {
        const data = {};
        data["courseName"] = course.CourseName;
        data["courseRoom"] = course.CourseRoom;
        data["camera"] =
          cameraData[course.CourseRoom] === "1" ? "在线" : "离线";
        this.coursesData.push(data);
        this.classCourse[course.CourseRoom] = course.CourseName;
      }
    },

    async startPridect() {
      const form = new FormData();
      form.append("classrooms", this.classrooms);

      const response = await axios({
        method: "post",
        url: `${ip.cssd_trans}/api/v1/start`,
        data: form,
      });
      this.$message({
        message: response.data.data.data,
        type: "success",
      });
    },

    // 监控设备在线数据获取
    async getHealthInfo() {
      const form = new FormData();
      form.append("classrooms", this.classrooms);

      const response = await axios({
        method: "post",
        url: `${ip.cssd_trans}/api/v1/healthcheck`,
        data: form,
      });
      return response.data.data;
    },

    // 实时分析结果数据获取
    async getResults() {
      const form = new FormData();
      form.append("classrooms", this.classrooms);

      const response = await axios({
        method: "post",
        url: `${ip.cssd_trans}/api/v1/getResults`,
        data: form,
      });
      return response.data.data;
    },

    // 实时分析结果数据获取
    async getLatestFrame() {
      const form = new FormData();
      form.append("classrooms", this.classrooms);

      const response = await axios({
        method: "post",
        url: `${ip.cssd_trans}/api/v1/getLatestFrame`,
        data: form,
      });
      return response.data.data;
    },

    async getCameraIP() {
      const form = new FormData();
      form.append("classrooms", this.classrooms);

      const response = await axios({
        method: "post",
        url: `${ip.cssd_trans}/api/v1/parse`,
        data: form,
      });
    },

    async getHlsIP(rtsp) {
      const response = await axios({
        method: "post",
        url: `${ip.rh}/start`,
        data: {
          uri: rtsp,
        },
      });
      this.uri = `${ip.rh}` + response.data.uri;
    },

    // 获取表格内容(教室号等)
    itemHandleSelectionChange(selection, row) {
      if (this.checkList.length <= 9) {
        const selected = selection.length && selection.indexOf(row) !== -1;
        if (selected === true) {
          this.checkList.push(row.className);
        } else {
          this.checkList.splice(this.checkList.indexOf(row.className), 1);
        }
      } else {
        alert("成功");
      }
    },

    // 根据显示颜色
    cellStyle(row) {
      if (row.column.label === "监控设备" && row.row.camera === "在线") {
        return "color:#25f52b";
      } else if (row.column.label === "监控设备" && row.row.camera === "离线") {
        return "color:#ff1111";
      }
    },
  },

  destroyed() {
    axios.get(`${ip.cssd_trans}/api/v1/stop`);
  },
};
</script>
<style>
.el-image-viewer__next,
.el-image-viewer__prev {
  top: 50%;
  width: 44px;
  height: 44px;
  font-size: 24px;
  /* color: rgb(235, 226, 226) !important; */
  background-color: #0f82b8 !important;
  /* border-color: rgb(221, 30, 30) !important; */
}
.el-image-viewer__close {
  top: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: rgb(141, 12, 12);
  /* z-index: 1; */
  background-color: #0f82b8 !important;
}

.link-top {
  width: 100%;
  height: 1px;
  border-top: solid #c8dbf3 1px;
}

.elTable {
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
.camera {
  position: absolute;
  left: 25%;
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

.videoBox {
  width: 94%;
  height: 93%;
  position: absolute;
  top: 5%;
  left: 4%;
  overflow: scroll;
}
.videos {
  height: 31%;
  width: 31%;
  margin: 1%;
  margin-bottom: 0.5%;
}
.dv-decoration-7 {
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
  /* margin-bottom: 10px; */
  width: 100% !important;
}
.classId {
  font-family: "YouYuan";
  color: red;
  width: 80px;
  height: 80px;
  margin-left: 2px;
  font-size: 40px;
  float: left;
  padding-top: 20px;
  font-weight: bold;
}
.rightbox {
  width: 400px;
  margin-left: 2px;
}
.className {
  font-size: 30px;
  width: 30px;
  height: auto;
  margin-left: 15px;
  font-family: "NSimSun";
}
.badNum {
  margin-top: 5px;
  display: block;
  margin-left: 95px;
  height: 28px;
}
.fontColor {
  color: red;
  display: inline-block;
}
.goodNum {
  display: block;
  margin-left: 95px;
  margin-bottom: 17px;
}
.fontColor2 {
  color: yellow;
  display: inline-block;
}
.fontColor3 {
  color: #25f52b;
  display: inline-block;
}
.camera dv-border-box-11 {
  z-index: 999;
}
/* .content1 {
  margin-top: 30px;
  height: 360px;
  /*margin-left: 50px;*/

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
  -webkit-box-shadow: inset 0 0 6px rgba(22, 70, 133, 0);
} /*滚动条的滑轨背景颜色*/
::-webkit-scrollbar-thumb {
  background-color: rgba(3, 4, 80, 0.05);
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
  margin-top: 60px;
  height: 350px;
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
  /* margin-bottom: 10px; */
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
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #1ebef4 !important;
  left: 50% !important;
}
.imgsize {
  width: 48%;
  height: 45%;
  position: absolute;
  top: 1%;
  left: -25px;
  margin-top: 30px;
  /* width: 30%;  ---------9个框的样式
 height:28%;
 position:absolute;
 top:8%;
 left:1%;
 margin-top:10px */
}

.el-image {
  margin-left: 20px;
  position: relative;
  display: inline-block;
  overflow: hidden;
}
</style>
