<template>
  <div class="classroom">
    <dv-border-box-11 :title="floor" style="height: 100%; width: 100%">
      <span
        class="titleline"
      >监控设备名称 {{ "\xa0" }}{{ "\xa0" }}课程{{ "\xa0" }}{{ "\xa0"
      }}{{ "\xa0" }}{{ "\xa0" }}{{ "\xa0" }}在线 {{ "\xa0" }}{{ "\xa0"
      }}{{ "\xa0" }}{{ "\xa0" }}显示</span>
      <el-checkbox-group style="position: absolute; top: 25%">
        <div style="width: 330px; height: 280px; overflow: scroll">
          <span
            v-for="(val, key) in items"
            :key="key"
            class="el-checkbox"
            :label="key"
          >{{ key }}
            <span>c语言</span>
            <span v-if="checkList.indexOf(key) !== -1" id="stateon">{{
              status
            }}</span>
            <span v-else id="stateoff">{{ statusoff }}</span>
            <input type="checkbox" style="position: absolute; left: 100%">
          </span>
          <!--          <span-->
          <!--            v-for="(val, key) in items"-->
          <!--            :key="key"-->
          <!--            class="el-checkbox"-->
          <!--            :label="key">-->
          <!--            {{key}}-->
          <!--            <span style="position: relative;left:60%">c语言</span>-->
          <!--            <span v-if="checkList.indexOf(key) !== -1" id="stateon" style="position: relative;left: 55%">{{ status }}</span>-->
          <!--            <span v-else id='stateoff' style="position: relative;left: 55%">{{ statusoff }}</span>-->
          <!--            <input type="checkbox" style="position: relative;left: 80%">-->
          <!--          </span>-->
        </div>
      </el-checkbox-group>
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
      showPic: false,
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
      items6: config.north.front.floor6,
      tableData: [
        {
          monitor: '',
          curriculum: 'c语言',
          status: '离线'
        }
      ],
      helathInfo: []
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
      }
    }
  },

  mounted() {
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
      data['monitor'] = room
      data['curriculum'] = 'c语言'
      const code = -1
      if (code === -1) {
        data['status'] = '离线'
      } else {
        data['status'] = '在线'
      }
      indexPushData.push(data)
    }
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
    cellStyle(row) {
      // 根据显示颜色
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
        // this.$alert('点击具体楼层可查看信息，一次性最多可勾九个教室', '温馨提示', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: '已确定'
        //     })
        //   }
        // })
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
<style scoped>
.classroom {
  min-width: 100px;
  float: inherit;
  width: 18%;
  height: 250%;
  margin-left: 30px;
  margin-top: 30px;
}
.titleline {
  background-color: #03171f78;
  word-spacing: 8px;
  height: 40px;
  width: 90%;
  color: #7ed6ff;
  margin-left: 9px;
  font-size: 10px;
  margin-top: 54px;
  top: 30px;
  padding-top: 15px;
  padding-left: 10px;
  float: left;
  /*border: 1px solid rgb(4 46 140 / 97%);*/
}
.rightFather {
  background-image: url(../assets/images/background.jpg);
  width: 100%;
  height: 100%;
  /* background-color: #ffffff; */
  overflow: hidden;
}
.fapic {
  min-width: 400px;
  display: inherit;
  overflow: hidden;
  float: left;
  width: 85%;
  height: 100%;
}

.border {
  margin-top: 20px;
  display: inherit;
  float: right;
  min-width: 240px;
  width: 13%;
  height: 100%;
  box-shadow: 4px 10px 5px #888888;
  background-color: #eef4f9;
}
.video {
  object-fit: fill;
  float: left;
  min-width: 100px;
  width: 436px;
  height: 290px;
  border: #3a4673 2px solid;
  margin-left: 42px;
  margin-top: 40px;
}
.el-checkbox {
  display: block;
  color: #fdfdfd;
  font-size: 20px;
  padding: 5px;
  margin-right: 23px !important;
  margin-left: 40px !important;
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
.el-checkbox span {
  margin: 20px;
}
.el-checkbox-group {
  color: #ffffff;
  /*height: 100%;*/
  width: 20px;
  float: left;
  font-size: 23px;
  cursor: pointer;
}
.tip2 {
  text-align: center;
  padding-top: 25px;
  padding-bottom: 30px;
  background-color: #3a4673;
  color: white;
}
#stateon {
  /*padding-left: 30px;*/
  line-height: 20px;
  color: rgb(10, 179, 60);
}
#stateoff {
  /*padding-left:-25px;*/
  /*line-height: 20px;*/
  color: rgb(172, 23, 13);
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
</style>
<!--<style>-->
<!--.el-input__inner {-->
<!--  border-radius: 0px !important;-->
<!--  line-height: 40px;-->
<!--  outline: 0;-->
<!--  padding: 0 !important;-->
<!--  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);-->
<!--  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);-->
<!--}-->
<!--.el-checkbox__label {-->
<!--   float: left;-->
<!--    display: inline-block;-->
<!--    padding-left: 10px;-->
<!--    line-height: 23px !important;-->
<!--}-->
<!--.el-checkbox__input {-->
<!--  display: none !important;-->
<!--  margin-left: 4px;-->
<!--  margin-right: 10px;-->
<!--  cursor: pointer;-->
<!--  outline: 0;-->
<!--  line-height: 1;-->
<!--  vertical-align: middle;-->
<!--}-->

<!--.el-table,-->
<!--.el-table__expanded-cell {-->
<!--  background-color: transparent !important;-->
<!--}-->
<!--/* 表格内背景颜色 */-->
<!--.el-table th,-->
<!--.el-table tr,-->
<!--.el-table td {-->
<!--    background-color: transparent !important;-->
<!--}-->
<!--::-webkit-scrollbar-track{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);}/*滚动条的滑轨背景颜色*/-->
<!--::-webkit-scrollbar-thumb{background-color: rgba(0,0,0,0.05);border-radius: 10px;-webkit-box-shadow: inset 1px 1px 0 rgba(75, 75, 75, 0.58);}/*滑块颜色*/-->
<!--::-webkit-scrollbar-thumb{background-color: rgba(0,0,0,0.2);border-radius: 10px;-webkit-box-shadow: inset 1px 1px 0 rgba(48, 48, 48, 0.92);}-->
<!--::-webkit-scrollbar{width: 16px;height: 16px;}/* 滑块整体设置*/-->
<!--::-webkit-scrollbar-track,-->
<!--::-webkit-scrollbar-thumb{border-radius: 999px;border: 5px solid transparent;}-->
<!--::-webkit-scrollbar-track{box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset;}-->
<!--::-webkit-scrollbar-thumb{min-height: 20px;background-clip: content-box;box-shadow: 0 0 0 5px rgba(255,255,255,.5) inset;}-->
<!--::-webkit-scrollbar-corner{background: transparent;}/* 横向滚动条和纵向滚动条相交处尖角的颜色 */-->
<!--</style>-->

