<template>
  <div id="test">
    <!-- <span class="demonstration">可搜索</span> -->
    <el-cascader  class="el-input__inner"
      placeholder="试试搜索：一层-112"
      :options="options"
       filterable
      @change="handleChange"    
    ></el-cascader>
    <div class="player">
    <img id="video" :src="img" alt="">

    </div>
  </div>
</template>

<script>
import config from "@/config.json";
//一层数据
let items1 = config.north.front.floor1;
let arr1 = [];
let array1 = [];
for (let i in items1) {
  arr1.push(items1[i]);
}
//用   value   label将数据分开
for (var i in items1) {
  let obj = {
    value: items1[i],
    label: i,
  };
  array1.push(obj);
}
//二层数据
let items2 = config.north.front.floor2;
let arr2 = [];
let array2 = [];
for (let i in items2) {
  arr2.push(items2[i]);
}
//用   value   label将数据分开
for (var i in items2) {
  let obj = {
    value: items2[i],
    label: i,
  };
  array2.push(obj);
}
//三层数据
let items3 = config.north.front.floor3;
let arr3 = [];
let array3 = [];
for (let i in items3) {
  arr3.push(items3[i]);
}
//用   value   label将数据分开
for (var i in items3) {
  let obj = {
    value: items3[i],
    label: i,
  };
  array3.push(obj);
}
//四层数据
let items4 = config.north.front.floor4;
let arr4 = [];
let array4 = [];
for (let i in items4) {
  arr4.push(items4[i]);
}
//用   value   label将数据分开
for (var i in items4) {
  let obj = {
    value: items4[i],
    label: i,
  };
  array4.push(obj);
}
//五层数据
let items5= config.north.front.floor5;
let arr5 = [];
let array5 = [];
for (let i in items5) {
  arr5.push(items5[i]);
}
//用   value   label将数据分开
for (var i in items5) {
  let obj = {
    value: items5[i],
    label: i,
  };
  array5.push(obj);
}
//六层数据
let items6 = config.north.front.floor6;
let arr6= [];
let array6 = [];
for (let i in items6) {
  arr6.push(items6[i]);
}
//用   value   label将数据分开
for (var i in items6) {
  let obj = {
    value: items6[i],
    label: i,
  };
  array6.push(obj);
}
export default {
    data() {
    return {
      img: '',
      arr1,
      arr2,
      items1: config.north.front.floor1,
      items2 : config.north.front.floor2,
      options: [
        {
          value: "一层",
          label: "一层",
          children: array1,
        },

        {
          value: "二层",
          label: "二层",
          children:array2,
        },
        {
          value: "三层",
          label: "三层",
       children:array3,
       },
       {
          value: "四层",
          label: "四层",
       children:array4,
       },
        {
          value: "五层",
          label: "五层",
       children:array5,
       },
        {
          value: "六层",
          label: "六层",
       children:array6,
        },
      ],
}
  },

  mounted() {
    this.webSocket();
  },
  methods: {
    handleChange(v) {
        // console.log(v);    打印出来为一个数组，第二个值为URL
      this.$alert(v[1], "标题名称", {
        confirmButtonText: "确定",
        
      });
    },
    webSocket() {
      const _this = this
      if (typeof (WebSocket) == 'undefined') {
        this.$notify({
          title: '提示',
          message: '当前浏览器无法接收实时服务器信息，请使用谷歌浏览器！',
          type: 'warning',
          duration: 0
        })
      } else {
        // 实例化socket
        const socketUrl = 'ws://127.0.0.1:8000/img/'
        this.socket = new WebSocket(socketUrl)
        // 监听socket打开
        this.socket.onopen = function() {
          console.log('浏览器WebSocket已打开')
          _this.socket.send(JSON.stringify({
            'code': '200',
            'msg': 'wesocket已打开'
          }))
        }
        // 监听socket消息接收
        this.socket.onmessage = function(msg) {
          // 追加到内容显示列表中
          var content = msg.data
          _this.img = 'data:image/jpg;base64,' + content
        }
        // 监听socket错误
        this.socket.onerror = function() {
          _this.$notify({
            title: '错误',
            message: '通信错误，无法与服务器建立连接',
            type: 'error',
            duration: 0
          })
        }
        // 监听socket关闭
        this.socket.onclose = function() {
          console.log('WebSocket已关闭')
        }
      }
    }
  },

}
</script>
<style scoped>
#test {
  width: 100%;
  height: 100%;
}
.el-input__inner[data-v-5752faac] {
    -webkit-appearance: none;
    background-color: #f2f9fb;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #7897e0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 72px;
    line-height: 70px;
    outline: 0;
    padding: 0px 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 450px;
    margin-left: 550px;
    text-align: center;
}
.player #video {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  margin-left: -100px;
}
</style>