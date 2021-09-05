<template>
<div class="box">
  <el-table
  class="table"
      :data="tableData">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
<div id="myChart1" class="myChart1">
</div>
<div id="myChart2" class="myChart2">
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // // 基于准备好的dom，初始化echarts实例
      // var myChart = this.$echarts.init(document.getElementById('myChart1'))
      // // 绘制图表
      // myChart.setOption({
      //     tooltip: {
      //     trigger: 'axis',
      //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
      //       type: 'shadow' ,// 默认为直线，可选为：'line' | 'shadow'
      //     }
      //   },
      //   grid: {
      //     left: '2%',
      //     right: '4%',
      //     bottom: '14%',
      //     top:'16%',
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'category',
      //     data: ['2013','2014','2015','2016'],
      //     axisTick: {
      //       show: false
      //   },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#25c3da'
      //       }
      //     },
      //     axisLabel: {
      //       textStyle: {
      //         color: '#fff'
      //       }
      //     },
      //   },

      //   yAxis: {
      //       name:'数量',
      //     type: 'value',
      //   axisTick: {
      //       show: false
      //   },
      //     axisLine: {
      //       show: true,
      //       lineStyle: {
      //         color: '#25c3da'
      //       }
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //           color: '#2c3d89',
      //           type: 'dotted',
      //       }
      //   },
      //     axisLabel: {
      //         textStyle: {
      //         color: '#fff'
      //       }
      //     }
      //   },

      //   "dataZoom": [{
      //     "show": true,
      //     "height": 8,
      //     "xAxisIndex": [
      //       0
      //     ],
      //     bottom:'8%',
      //     "start": 10,
      //     "end": 90,
      //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      //     handleSize: '110%',
      //     handleStyle:{
      //       color:"#d3dee5",

      //     },
      //     textStyle:{
      //       color:"#fff"},
      //     borderColor:"#90979c"
      //   }, {
      //     "type": "inside",
      //     "show": true,
      //     "height": 15,
      //     "start": 1,
      //     "end": 35
      //   }],
      //   series: [{
      //     name: '数量',
      //     type: 'bar',
      //     barWidth: '20%',
      //     itemStyle: {
      //       normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //               offset: 0,
      //               color: '#8efbff'
      //           }, {
      //               offset: 1,
      //               color: '#4b85fb'
      //           }]),
      //           barBorderRadius: [12,12,0,0],
      //       },
      //     },
      //     data: [400, 400, 300, 300, 300, 400, 400]
      //   },
      //   ]
      // });
      // const app = {
      //   currentIndex: -1,
      // };
      // setInterval(function () {
      //   var dataLen = option.series[0].data.length;

      // 取消之前高亮的图形
      //   myChart.dispatchAction({
      //     type: 'downplay',
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex
      //   });
      //   app.currentIndex = (app.currentIndex + 1) % dataLen;
      //   //console.log(app.currentIndex);
      //   // 高亮当前图形
      //   myChart.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      //   // 显示 tooltip
      //   myChart.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex
      //   });
      // }, 1000
      // })
      // 图表自适应盒子
      // window.addEventListener('resize', function() {
      //   myChart.resize()
      // })
    }

  }
}
</script>

<style scoped>
.box{
  min-width: 100px;
  float: inherit;
  width: 100%;
  height: 800px;
  margin-left: 30px;
  margin-top: 30px;
}
.table{
  width: 68%;
  height: 80%;
  margin: 10px;
  float: left;
}
.myChart1{
  float: right;
  width: 25%;
  height: 50%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background-color: rgba(0,0,100,0.3);
  margin-right: 70px;
  margin-top: 8px;
}
.myChart1::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.myChart1::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.myChart2{
  float: right;
  width: 25%;
  height: 50%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background-color: rgba(0,0,100,0.3);
  margin-right: 67px;
  margin-top: 63px;
}
.myChart1 ::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.myChart1 ::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
</style>
