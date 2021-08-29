<template>
  <div class="rightFather">
    <span v-if="showPic" class="fapic">
      <video v-for="(val, key) in checkList" :key="key+10" class="video" controls muted />

    </span>
    <div class="border">
      <el-cascader
        class="el-input__inner"
        placeholder="双击可搜索全部教室"
        :options="options"
        filterable
        @change="handleChange"
      />
      <div class="tip2">
        <i class="el-icon-position" /> 监 控 设 备 列 表
      </div>
      <el-checkbox-group
        v-model="checkList"
        class="el-checkbox-group"
        :min="0"
        :max="9"
      >
        <el-checkbox
          v-for="(val, key) in items"
          :key="key"
          :label="key"
          @change="statustext(key)"
        >{{ key + "半球" }}
          <span v-if="checkList.indexOf(key) !== -1" id="stateon">{{ status }}</span>
          <span v-else id="stateoff">{{ statusoff }}</span></el-checkbox>
      </el-checkbox-group>
    </div>

  </div>
</template>

<script>
const classval = []
const items = {}
import config from '@/config.json'
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

      options: [
        {
          value: '一层',
          label: '一层',
          children: array1
        },

        {
          value: '二层',
          label: '二层',
          children: array2
        },
        {
          value: '三层',
          label: '三层',
          children: array3
        },
        {
          value: '四层',
          label: '四层',
          children: array4
        },
        {
          value: '五层',
          label: '五层',
          children: array5
        },
        {
          value: '六层',
          label: '六层',
          children: array6
        }
      ]
    }
  },
  // 监听路由，实现组件复用
  watch: {

    $route(to, from) {
      const nums = this.$route.query.type
      if (nums === 'one') {
        this.items = this.items1
        this.showPic = true
        console.log(items1)
      } else if (nums === 'two') {
        this.items = this.items2
        this.showPic = true
      } else if (nums === 'three') {
        this.items = this.items3
        this.showPic = true
      } else if (nums === 'four') {
        this.items = this.items4
        this.showPic = true
      } else if (nums === 'five') {
        this.items = this.items5
        this.showPic = true
      } else if (nums === 'six') {
        this.items = this.items6
        this.showPic = true
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
  },
  created() {
    this.handleParmes()
  },
  methods: {
    // 路由参数判断
    handleParmes() {
      const nums = this.$route.query.type
      if (nums === 'one') {
        this.items = this.items1
        this.showPic = true
        console.log(items1)
      } else if (nums === 'two') {
        this.items = this.items2
        this.showPic = true
      } else if (nums === 'three') {
        this.items = this.items3
        this.showPic = true
      } else if (nums === 'four') {
        this.items = this.items4
        this.showPic = true
      } else if (nums === 'five') {
        this.items = this.items5
        this.showPic = true
      } else if (nums === 'six') {
        this.items = this.items6
        this.showPic = true
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
<style scoped>
.rightFather {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
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
  color: #606266;
  font-weight: 500;
  font-size: 40px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 23px !important;
  margin-left: 40px !important;
}
.el-checkbox-group {
  min-width: 250px;
  float: right;
  font-size: 52px;
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
  padding-left: 30px;
  line-height: 20px;
  color: rgb(10, 179, 60);
}
#stateoff {
  padding-left: 30px;
  line-height: 20px;
  color: rgb(172, 23, 13);
}
</style>
<style>
.el-input__inner {
  border-radius: 0px !important;
  line-height: 40px;
  outline: 0;
  padding: 0 !important;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-checkbox__label {
  display: inline-block;
  padding-left: 50px;
  line-height: 19px;
  font-size: 18px !important;
}
.el-checkbox__input {
  margin-left: 4px;
  margin-right: 10px;
  cursor: pointer;
  outline: 0;
  line-height: 1;
  vertical-align: middle;
}
</style>

