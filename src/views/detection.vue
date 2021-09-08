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
          style="width: 90%;position: relative;left: 5%;top:15%;color: #FFFFFF"
        >
          <el-table-column
            label="监控设备名称"
            width="110"
            prop="cameraid"
          />
          <el-table-column
            prop="source"
            label="课程"
            width="120"
          />
          <el-table-column
            prop="status"
            label="状态"
            width="80"
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
      <dv-border-box-11>
        <span v-if="showPic" class="fapic">
          <video v-for="(val, key) in checkList" :key="key+10" class="video" controls muted />
        </span>
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
      img: '',
      items1: config.north.front.floor1,
      items2: config.north.front.floor2,
      items3: config.north.front.floor3,
      items4: config.north.front.floor4,
      items5: config.north.front.floor5,
      items6: config.north.front.floor6
    }
  },
  // 监听路由，实现组件复用
  watch: {

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
      } else {
        this.items = null
        this.showPic = false
        this.$alert('点击具体楼层可查看信息，一次性最多可勾九个教室', '温馨提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: `已确定`
            })
          }
        })
      }
    }
  },
  mounted() {
    console.log('fuck.')
    this.getHealthInfo()
    this.getResults()
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
      data['source'] = '数据结构'
      const code = -1
      if (code === -1) {
        data['status'] = '离线'
      } else {
        data['status'] = '在线'
      }
      indexPushData.push(data)
    }
    console.log('--------------------------')
    console.log(indexPushData)
    this.showPushData = indexPushData
  },
  methods: {
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
      if (row.column.label === '状态' && row.row.status === '在线') {
        return 'color:green '
      } else if (row.column.label === '状态' && row.row.status === '离线') {
        return 'color:red'
      }
    },
    // 路由参数判断
    handleParmes() {
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
      } else {
        this.items = null
        this.showPic = false
        this.$alert('点击具体楼层可查看信息，一次性最多可勾九个教室', '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: '已确定'
            })
          }
        })
      }
    },
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
