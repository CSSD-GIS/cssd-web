<template>
  <div class="rightFather">
    <!-- <div class="title"> 检测画面视频监控录像 </p> -->
    <div class="border">
      <el-cascader
        class="el-input__inner"
        placeholder="双击可搜索全部教室"
        :options="options"
        filterable
        @change="handleChange"
      ></el-cascader>
      <p class="tip2"><i class="el-icon-position"></i> 监 控 设 备 列 表</p>
     
      <span class="classroom"  v-for="(val, key) in items4" :key="key" @click="choice(key)"
        >{{ `${key} ` + "半球" }}
        <span v-if="show(key)" id="stateoff" >{{statusoff}}</span>
        <span v-else id="stateon" >{{status}}</span>
        
      </span>

    </div>
  </div>
</template>

<script>
let itemarr;
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
let items5 = config.north.front.floor5;
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
let arr6 = [];
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
  name: "floorOne",
  data() {
    return {
      num:-1,
    statusoff:"离线",
    status:"在线",
      img: "",
      arr1,
      arr2,
      items1: config.north.front.floor1,
      items2: config.north.front.floor2,
      items3: config.north.front.floor3,
      items4: config.north.front.floor4,
      items5: config.north.front.floor5,
      items6: config.north.front.floor6,
      options: [
        {
          value: "一层",
          label: "一层",
          children: array1,
        },

        {
          value: "二层",
          label: "二层",
          children: array2,
        },
        {
          value: "三层",
          label: "三层",
          children: array3,
        },
        {
          value: "四层",
          label: "四层",
          children: array4,
        },
        {
          value: "五层",
          label: "五层",
          children: array5,
        },
        {
          value: "六层",
          label: "六层",
          children: array6,
        },
      ],
    };
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
     choice:function(key){
        this.num=key;
    },
    show(key){
      if(this.num==key){
        return true
      }
    },
    webSocket() {
      const _this = this;
      if (typeof WebSocket == "undefined") {
        this.$notify({
          title: "提示",
          message: "当前浏览器无法接收实时服务器信息，请使用谷歌浏览器！",
          type: "warning",
          duration: 0,
        });
      } else {
        // 实例化socket
        const socketUrl = "ws://127.0.0.1:8000/img/";
        this.socket = new WebSocket(socketUrl);
        // 监听socket打开
        this.socket.onopen = function () {
          console.log("浏览器WebSocket已打开");
          _this.socket.send(
            JSON.stringify({
              code: "200",
              msg: "wesocket已打开",
            })
          );
        };
        // 监听socket消息接收
        this.socket.onmessage = function (msg) {
          // 追加到内容显示列表中
          var content = msg.data;
          _this.img = "data:image/jpg;base64," + content;
        };
        // 监听socket错误
        this.socket.onerror = function () {
          _this.$notify({
            title: "错误",
            message: "通信错误，无法与服务器建立连接",
            type: "error",
            duration: 0,
          });
        };
        // 监听socket关闭
        this.socket.onclose = function () {
          console.log("WebSocket已关闭");
        };
      }
    },
  },

}
</script>
<style scoped>
.rightFather {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #efeff1;
  
}
.border {
 
  height: 100%;
  margin-left: 1325px;
  -webkit-box-shadow: 4px 10px 5px #888888;
  box-shadow: 4px 10px 5px #888888;
  background-color: #eef4f9;
}
.title {
  font-size: 30px;
  margin-left: 560px;
}

.player #video {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  margin-left: -100px;
}
.tip1 {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
.tip2 {
  text-align: center;
  padding-top: 25px;
  padding-bottom: 30px;
  background-color: #3a4673;
  color: white;
}

.classroom {
  display: block;
  width: 220px;
cursor: pointer;
  padding-top: 30px;
  text-align: left;
  padding-left: 50px;
  line-height: 21px;
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
<style >
.el-input__inner {
  border-radius: 0px !important;
  border: 1px solid #bec0c4 !important;
  line-height: 40px;
  outline: 0;
  padding: 0 !important;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>