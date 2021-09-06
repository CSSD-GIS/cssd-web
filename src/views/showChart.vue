<template>
  <div class="box">
    <el-table
      class="table"
      :data="tableData"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
    <div id="myChart1" class="chart1" />
    <div id="myChart2" class="chart2" />
  </div>
</template>

<script>
// import echarts from 'echarts'
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
    this.histoGram()
    this.pieChart()
  },
  methods: {
    histoGram() {
      const that = this
      // // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('myChart1'))
      // // 绘制图表
      myChart.setOption({
        'title': {
          'text': 'S101课堂分析结果展示',
          x: 'center',

          textStyle: {
            color: '#fff',
            fontSize: '22'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['听讲', '玩手机', '睡觉', '做笔记'],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#25c3da'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '18px'
            }
          }
        },

        yAxis: {
          name: '数量',
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#25c3da'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#2c3d89',
              type: 'dotted'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '18px'
            }
          }
        },

        'dataZoom': [{
          'show': true,
          'height': 8,
          'xAxisIndex': [
            0
          ],
          bottom: '8%',
          'start': 10,
          'end': 90,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'
        }, {
          'type': 'inside',
          'show': true,
          'height': 15,
          'start': 1,
          'end': 35
        }],
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: '20%',
          itemStyle: {
            normal: {
              color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8efbff'
              }, {
                offset: 1,
                color: '#4b85fb'
              }]),
              barBorderRadius: [12, 12, 0, 0]
            }
          },
          data: [25, 6, 3, 2]
        }
        ]
      })
      // 图表自适应盒子
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    pieChart() {
      var myChart = this.$echarts.init(document.getElementById('myChart2'))
      myChart.setOption({
        legend: {
          orient: 'vertical', // 'vertical'
          x: 'left', // 'center' | 'left' | {number},
          y: '200', // 'center' | 'bottom' | {number}
          padding: 10, // [5, 10, 15, 20]
          itemGap: 20,
          textStyle: { color: '#c3cad9', fontSize: '20px' }
        },
        title: {
          text: '课堂行为检测总结果展示',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: '22'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 500,
          max: 600,
          inRange: {
            // colorLightness: [0, 1]
          }
        },
        series: [{
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '30px'
            }
          },
          type: 'pie',
          radius: '70%',
          selectedMode: 'single',
          selectedOffset: 10,
          clockwise: true,
          center: ['53%', '53%'],
          color: ['#43cadd', '#3893e5', '#FCC708', '#03B48E'], // '#FBFE27','rgb(11,228,96)','#FE5050'
          data: [{
            value: 3600,
            name: '听课'
          },
          {
            value: 5400,
            name: '玩手机'
          },
          {
            value: 2600,
            name: '做笔记'
          },
          {
            value: 4500,
            name: '睡觉'
          }
          ].sort(function(a, b) {
            return a.value - b.value
          }),

          roseType: 'radius',

          label: {
            normal: {
              // formatter: ['{c|{b}{d}%}', '{b|{b}}'].join('\n'),
              // formatter: ['{b|{b}{d}%}', '{c|{c}万元}'].join('\n'),
              textStyle:
              { fontSize: '18',
                color: '#fff' },
              rich: {
                b: {
                  color: '#d9efff',
                  fontSize: 15,
                  height: 40
                },
                c: {
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 5
                }
              }
            }
          },
          itemStyle: {
            borderWidth: '20',
            color: 'pink',
            borderColor: '#FFF',
            normal: {
              borderWidth: '10',
              borderColor: 'rgba(0,0,0,2)'
            }
          },
          labelLine: {
            normal: {
              backgroundColor: 'yellow',
              borderColor: 'skyblue',
              borderWidth: 10,
              lineStyle: {
                borderColor: 'skyblue',
                borderWidth: 10,
                backgroundColor: 'yellow'
              }
            }
          }
        }]
      })
      window.addEventListener('resize', function() {
        myChart.resize()
      })
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
  margin-top: 60px;
}
.table{
  width: 68%;
  height: 80%;
  margin: 10px;
  float: left;
}
.chart1{
  float: right;
  width: 25%;
  height: 50%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background-color: rgba(0,0,100,0.3);
  margin-right: 70px;
  margin-top: 8px;
}
.chart1::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.chart1::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.chart1 ::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.chart1 ::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.chart2{
  float: right;
  width: 25%;
  height: 50%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background-color: rgba(0,0,100,0.3);
  margin-right: 67px;
  margin-top: 63px;
}
.chart2::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.chart2::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.chart2 ::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.chart2 ::after {
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
