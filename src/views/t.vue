<!--<template>-->
<!--  <div id="test">-->
<!--    &lt;!&ndash; <span class="demonstration">可搜索</span> &ndash;&gt;-->
<!--    &lt;!&ndash; <el-cascader -->
<!--      placeholder="试试搜索：一层-112"-->
<!--      :options="options"-->
<!--       filterable-->
<!--      @change="handleChange"    -->
<!--    ></el-cascader> &ndash;&gt;-->
<!--    <div class="player">-->
<!--    <img id="video" :src="img" alt="">-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--  -->
<!--<script>-->
<!--import config from "@/config.json";-->
<!--let items1 = config.north.front.floor1;-->
<!--let arr1 = [];-->
<!--let array1 = [];-->
<!--for (let i in items1) {-->
<!--  arr1.push(items1[i]);-->
<!--}-->
<!--//用   value   label将数据分开-->
<!--for (var i in items1) {-->
<!--  let obj = {-->
<!--    value: items1[i],-->
<!--    label: i,-->
<!--  };-->
<!--  array1.push(obj);-->
<!--}-->
<!--//二层数据-->
<!--let items2 = config.north.front.floor2;-->
<!--let arr2 = [];-->
<!--let array2 = [];-->
<!--for (let i in items2) {-->
<!--  arr2.push(items2[i]);-->
<!--}-->
<!--//用   value   label将数据分开-->
<!--for (var i in items2) {-->
<!--  let obj = {-->
<!--    value: items2[i],-->
<!--    label: i,-->
<!--  };-->
<!--  array2.push(obj);-->
<!--}-->
<!--//三层数据-->
<!--let items3 = config.north.front.floor3;-->
<!--let arr3 = [];-->
<!--let array3 = [];-->
<!--for (let i in items3) {-->
<!--  arr3.push(items3[i]);-->
<!--}-->
<!--//用   value   label将数据分开-->
<!--for (var i in items3) {-->
<!--  let obj = {-->
<!--    value: items3[i],-->
<!--    label: i,-->
<!--  };-->
<!--  array3.push(obj);-->
<!--}-->
<!--//四层数据-->
<!--let items4 = config.north.front.floor4;-->
<!--let arr4 = [];-->
<!--let array4 = [];-->
<!--for (let i in items4) {-->
<!--  arr4.push(items4[i]);-->
<!--}-->
<!--//用   value   label将数据分开-->
<!--for (var i in items4) {-->
<!--  let obj = {-->
<!--    value: items4[i],-->
<!--    label: i,-->
<!--  };-->
<!--  array4.push(obj);-->
<!--}-->
<!--//五层数据-->
<!--let items5= config.north.front.floor5;-->
<!--let arr5 = [];-->
<!--let array5 = [];-->
<!--for (let i in items5) {-->
<!--  arr5.push(items5[i]);-->
<!--}-->
<!--//用   value   label将数据分开-->
<!--for (var i in items5) {-->
<!--  let obj = {-->
<!--    value: items5[i],-->
<!--    label: i,-->
<!--  };-->
<!--  array5.push(obj);-->
<!--}-->
<!--//六层数据-->
<!--let items6 = config.north.front.floor6;-->
<!--let arr6= [];-->
<!--let array6 = [];-->
<!--for (let i in items6) {-->
<!--  arr6.push(items6[i]);-->
<!--}-->
<!--//用   value   label将数据分开-->
<!--for (var i in items6) {-->
<!--  let obj = {-->
<!--    value: items6[i],-->
<!--    label: i,-->
<!--  };-->
<!--  array6.push(obj);-->
<!--}-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--     -->
<!--      id: "",-->
<!--       img: '',-->
<!--      arr1,-->
<!--      arr2,-->
<!--      items1: config.north.front.floor1,-->
<!--      items2 : config.north.front.floor2,-->
<!--      options: [-->
<!--        {-->
<!--          value: "一层",-->
<!--          label: "一层",-->
<!--          children: array1,-->
<!--        },-->

<!--        {-->
<!--          value: "二层",-->
<!--          label: "二层",-->
<!--          children:array2,-->
<!--        },-->
<!--        {-->
<!--          value: "三层",-->
<!--          label: "三层",-->
<!--       children:array3,-->
<!--       },-->
<!--       {-->
<!--          value: "四层",-->
<!--          label: "四层",-->
<!--       children:array4,-->
<!--       },-->
<!--        {-->
<!--          value: "五层",-->
<!--          label: "五层",-->
<!--       children:array5,-->
<!--       },-->
<!--        {-->
<!--          value: "六层",-->
<!--          label: "六层",-->
<!--       children:array6,-->
<!--        },-->
<!--      ],-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.webSocket();-->
<!--    // console.log(this.$route.query);-->
<!--    // console.log(this.$route.query.id1);-->

<!--    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;一层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id1 = this.$route.query.id1;-->
<!--    let items1 = config.north.front.floor1;-->
<!--    let newStr1 = JSON.parse(JSON.stringify(items1));-->
<!--    let arr1 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr1) {-->
<!--      arr1.push(newStr1[i]);-->
<!--    }-->

<!--    let p1 = parseInt(this.$route.query.id1);-->
<!--    -->
<!--    -->
<!--    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;二层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id2 = this.$route.query.id2;-->
<!--    let items2 = config.north.front.floor2;-->
<!--    let newStr2 = JSON.parse(JSON.stringify(items2));-->
<!--    let arr2 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr2) {-->
<!--      arr2.push(newStr2[i]);-->
<!--    }-->

<!--    let p2 = parseInt(this.$route.query.id2);-->
<!--    -->
<!--    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;三层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id3 = this.$route.query.id3;-->
<!--    let items3 = config.north.front.floor3;-->
<!--    let newStr3 = JSON.parse(JSON.stringify(items3));-->
<!--    let arr3 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr3) {-->
<!--      arr3.push(newStr3[i]);-->
<!--    }-->

<!--    let p3 = parseInt(this.$route.query.id3);-->
<!--    -->
<!--     //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;四层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id4 = this.$route.query.id4;-->
<!--    let items4 = config.north.front.floor4;-->
<!--    let newStr4 = JSON.parse(JSON.stringify(items4));-->
<!--    let arr4 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr4) {-->
<!--      arr4.push(newStr4[i]);-->
<!--    }-->

<!--    let p4 = parseInt(this.$route.query.id4);-->
<!--   -->
<!--     //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;五层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id5 = this.$route.query.id5;-->
<!--    let items5 = config.north.front.floor5;-->
<!--    let newStr5 = JSON.parse(JSON.stringify(items5));-->
<!--    let arr5 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr5) {-->
<!--      arr5.push(newStr5[i]);-->
<!--    }-->

<!--    let p5 = parseInt(this.$route.query.id5);-->
<!--    -->
<!--     //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;六层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id6 = this.$route.query.id6;-->
<!--    let items6 = config.north.front.floor6;-->
<!--    let newStr6 = JSON.parse(JSON.stringify(items6));-->
<!--    let arr6 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr6) {-->
<!--      arr6.push(newStr6[i]);-->
<!--    }-->

<!--    let p6 = parseInt(this.$route.query.id6);-->
<!--   -->
<!--  },-->
<!--  methods: {-->
<!--     handleChange(v) {-->
<!--        // console.log(v);    打印出来为一个数组，第二个值为URL-->
<!--      this.$alert(v[1], "标题名称", {-->
<!--        confirmButtonText: "确定",-->
<!--        -->
<!--      });-->
<!--  -->
<!--  },-->
<!--   webSocket() {-->
<!--      const _this = this-->
<!--      if (typeof (WebSocket) == 'undefined') {-->
<!--        this.$notify({-->
<!--          title: '提示',-->
<!--          message: '当前浏览器无法接收实时服务器信息，请使用谷歌浏览器！',-->
<!--          type: 'warning',-->
<!--          duration: 0-->
<!--        })-->
<!--      } else {-->
<!--        // 实例化socket-->
<!--        const socketUrl = 'ws://127.0.0.1:8000/img/'-->
<!--        this.socket = new WebSocket(socketUrl)-->
<!--        // 监听socket打开-->
<!--        this.socket.onopen = function() {-->
<!--          console.log('浏览器WebSocket已打开')-->
<!--          _this.socket.send(JSON.stringify({-->
<!--            'code': '200',-->
<!--            'msg': 'wesocket已打开'-->
<!--          }))-->
<!--        }-->
<!--        // 监听socket消息接收-->
<!--        this.socket.onmessage = function(msg) {-->
<!--          // 追加到内容显示列表中-->
<!--          var content = msg.data-->
<!--          _this.img = 'data:image/jpg;base64,' + content-->
<!--        }-->
<!--        // 监听socket错误-->
<!--        this.socket.onerror = function() {-->
<!--          _this.$notify({-->
<!--            title: '错误',-->
<!--            message: '通信错误，无法与服务器建立连接',-->
<!--            type: 'error',-->
<!--            duration: 0-->
<!--          })-->
<!--        }-->
<!--        // 监听socket关闭-->
<!--        this.socket.onclose = function() {-->
<!--          console.log('WebSocket已关闭')-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  watch: {-->
<!--    $route(to, from) {-->
<!--let a='';-->
<!--      //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;一层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--      let items1 = config.north.front.floor1;-->
<!--      let newStr1 = JSON.parse(JSON.stringify(items1));-->
<!--      let arr1 = [];-->
<!--      // 循环对象，把每一项push到数组中-->
<!--      for (let i in newStr1) {-->
<!--        arr1.push(newStr1[i]);-->
<!--      }-->
<!-- -->
<!--      let p1 = parseInt(this.$route.query.id1);-->
<!--      // this.$alert(arr1[p1], "标题", {-->
<!--      //   confirmButtonText: "确定",-->
<!--      // });-->
<!--     -->
<!--      //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;二层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--      let items2 = config.north.front.floor2;-->
<!--      let newStr2 = JSON.parse(JSON.stringify(items2));-->
<!--      let arr2 = [];-->
<!--      // 循环对象，把每一项push到数组中-->
<!--      for (let i in newStr2) {-->
<!--        arr2.push(newStr2[i]);-->
<!--      }-->

<!--      let p2 = parseInt(this.$route.query.id2);-->
<!--      -->
<!--     -->
<!--      //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;三层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    this.id3 = this.$route.query.id3;-->
<!--    let items3 = config.north.front.floor3;-->
<!--    let newStr3 = JSON.parse(JSON.stringify(items3));-->
<!--    let arr3 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr3) {-->
<!--      arr3.push(newStr3[i]);-->
<!--    }-->

<!--    let p3 = parseInt(this.$route.query.id3);-->
<!--      -->
<!--       //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;四层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    let items4 = config.north.front.floor4;-->
<!--    let newStr4 = JSON.parse(JSON.stringify(items4));-->
<!--    let arr4 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr4) {-->
<!--      arr4.push(newStr4[i]);-->
<!--    }-->

<!--    let p4 = parseInt(this.$route.query.id4);-->
<!--   -->
<!--       //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;五层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    let items5 = config.north.front.floor5;-->
<!--    let newStr5 = JSON.parse(JSON.stringify(items5));-->
<!--    let arr5 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr5) {-->
<!--      arr5.push(newStr5[i]);-->
<!--    }-->

<!--    let p5 = parseInt(this.$route.query.id5);-->
<!--       //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;六层&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    let items6 = config.north.front.floor6;-->
<!--    let newStr6 = JSON.parse(JSON.stringify(items6));-->
<!--    let arr6 = [];-->
<!--    // 循环对象，把每一项push到数组中-->
<!--    for (let i in newStr6) {-->
<!--      arr6.push(newStr6[i]);-->
<!--    }-->

<!--    let p6 = parseInt(this.$route.query.id6);-->
<!--   //判断-->
<!--     if(a=arr1[p1]){-->
<!--        this.$alert(a, "标题", {-->
<!--        confirmButtonText: "确定",-->
<!--      });-->
<!--      this.id1 = to.query;-->
<!--     }else if(a=arr2[p2]){-->
<!--        this.$alert(a, "标题", {-->
<!--        confirmButtonText: "确定",-->
<!--      });-->
<!--      this.id2 = to.query;-->
<!--     }else if(a=arr3[p3]){-->
<!--        this.$alert(a, "标题", {-->
<!--        confirmButtonText: "确定",-->
<!--      });-->
<!--      this.id3 = to.query;-->
<!--     }else if(a=arr4[p4]){-->
<!--        this.$alert(a, "标题", {-->
<!--        confirmButtonText: "确定",-->
<!--      });-->
<!--      this.id4 = to.query;-->
<!--     }else if(a=arr5[p5]){-->
<!--        this.$alert(a, "标题", {-->
<!--        confirmButtonText: "确定",-->
<!--      });-->
<!--      this.id5 = to.query;-->
<!--     }else if(a=arr6[p6]){-->
<!--        this.$alert(a, "标题", {-->
<!--        confirmButtonText: "确定",-->
<!--      });-->
<!--      this.id6 = to.query;-->
<!--     }-->
<!--     -->
<!--    },-->
<!--    -->
<!--  },-->

<!--  -->
<!--    -->
<!--  -->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--#test {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->

<!--.player #video {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  margin-top: 30px;-->
<!--  margin-left: -100px;-->
<!--}-->
<!--</style>-->
