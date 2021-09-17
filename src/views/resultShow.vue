<template>
  <div class="box">
    <!-- <div class="pagination"> -->

    <!-- </div> -->
    <el-table class="table" :data="tableData">
      <el-table-column prop="CreatedAt" label="时间" width="200" />
      <el-table-column prop="Classroom" label="教室号" width="160" />
      <el-table-column prop="PlayingNum" label="玩手机人数" width="140" />
      <el-table-column prop="SleepingNum" label="睡觉人数" width="140" />
      <el-table-column prop="WritingNum" label="记笔记人数" width="140" />
      <el-table-column prop="ListeningNum" label="听课人数" width="140" />
    </el-table>
    <div id="myChart1" class="chart1" />
    <div id="myChart2" class="chart2" />
    <div class="pagination">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        :pager-count="5"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="200"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import axios from "axios";
import ip from "@/assets/ip";

export default {
  data() {
    return {
      // 存放数据的数组
      showlist: [],
      // 每页的条数
      pagesize: 9,
      // 	currentPage 改变时会触发
      currentPage: 1,
      tableData: [],
    };
  },
  mounted() {
    this.histoGram();
    this.pieChart();
    this.getTableData();
  },
  methods: {
    async getTableData() {
      const response = await axios.get(
        `${ip.cssd_trans}/api/v1/getResultsByOffset?offset=${
          (this.currentPage - 1) * this.pagesize
        }&limit=${this.pagesize}`
      );
      this.tableData = response.data.data;
    },

    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: async function (val) {
      this.currentPage = val;
      await this.getTableData();
    },
    histoGram() {
      const that = this;
      // // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart1"));
      // // 绘制图表
      myChart.setOption({
        title: {
          text: "S101课堂分析结果展示",
          x: "center",

          textStyle: {
            color: "#fff",
            fontSize: "22",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["听讲", "玩手机", "睡觉", "做笔记"],
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#25c3da",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: "18px",
            },
          },
        },

        yAxis: {
          name: "数量",
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#25c3da",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2c3d89",
              type: "dotted",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: "18px",
            },
          },
        },
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8efbff",
                  },
                  {
                    offset: 1,
                    color: "#4b85fb",
                  },
                ]),
                barBorderRadius: [12, 12, 0, 0],
              },
            },
            data: [25, 6, 3, 2],
          },
        ],
      });
      // 图表自适应盒子
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    pieChart() {
      var myChart = this.$echarts.init(document.getElementById("myChart2"));
      myChart.setOption({
        calculable: false,
        legend: {
          orient: "vertical", // 'vertical'
          x: "left", // 'center' | 'left' | {number},
          y: "200", // 'center' | 'bottom' | {number}
          padding: 10, // [5, 10, 15, 20]
          itemGap: 20,
          textStyle: { color: "#c3cad9", fontSize: "20px" },
        },
        title: {
          text: "课堂行为检测总结果展示",
          left: "center",
          top: 20,
          textStyle: {
            color: "#fff",
            fontSize: "22",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 500,
          max: 600,
          inRange: {
            // colorLightness: [0, 1]
          },
        },
        series: [
          {
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: "30px",
              },
            },
            type: "pie",
            radius: "65%",
            selectedMode: "single",
            selectedOffset: 10,
            clockwise: true,
            center: ["53%", "53%"],
            color: ["#43cadd", "#3893e5", "#FCC708", "#03B48E"], // '#FBFE27','rgb(11,228,96)','#FE5050'
            data: [
              {
                value: 3600,
                name: "听课",
              },
              {
                value: 5400,
                name: "玩手机",
              },
              {
                value: 2600,
                name: "做笔记",
              },
              {
                value: 4500,
                name: "睡觉",
              },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),

            roseType: "radius",

            label: {
              normal: {
                // formatter: ['{c|{b}{d}%}', '{b|{b}}'].join('\n'),
                // formatter: ['{b|{b}{d}%}', '{c|{c}万元}'].join('\n'),
                textStyle: { fontSize: "18", color: "#fff" },
                rich: {
                  b: {
                    color: "#d9efff",
                    fontSize: 15,
                    height: 40,
                  },
                  c: {
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "bold",
                    lineHeight: 5,
                  },
                },
              },
            },
            itemStyle: {
              borderWidth: "20",
              color: "pink",
              borderColor: "#FFF",
              normal: {
                // borderWidth: '10',
                // borderColor: 'rgba(0,0,0,2)'
              },
            },
            labelLine: {
              normal: {
                backgroundColor: "yellow",
                borderColor: "skyblue",
                borderWidth: 10,
                lineStyle: {
                  borderColor: "skyblue",
                  borderWidth: 10,
                  backgroundColor: "yellow",
                },
              },
            },
          },
        ],
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped>
.pagination >>> button,
.pagination >>> .el-pager li {
  background-color: transparent !important;
  color: #19e1f0 !important;
  border: 1px solid #d1d3d4;
}

.pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #17e6db !important;
  color: white !important;
}

.pagination {
  height: 10px;
  width: 500px;
  float: right;
  margin-right: 35px;
}

.box {
  min-width: 100px;
  float: inherit;
  width: 100%;
  height: 850px;
  margin-left: 30px;
  margin-top: 60px;
}
.table {
  width: 68%;
  /* height: 96%; */
  margin: 10px;
  float: left;
}
.chart1 {
  float: right;
  width: 25%;
  height: 50%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background-color: rgba(0, 0, 100, 0.3);
  margin-right: 62px;
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
.chart2 {
  margin-right: -477px;
  margin-top: 480px;
  float: right;
  width: 25%;
  height: 50%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background-color: rgba(0, 0, 100, 0.3);
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
<style>
.el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
} /*表格透明*/
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
  border-bottom: 1px solid rgb(19, 201, 233) !important;
}
.el-table td,
.building-top .el-table th.is-leaf {
  border-bottom: 1px solid rgb(19, 201, 233) !important;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgb(2, 10, 39) !important;
  /* opacity: 0.5; */
}
.el-table thead {
  color: #ebeff7 !important;
  font-weight: 500 !important;
  font-size: 20px !important;
}
.el-table {
  color: #fff !important;
  font-size: 16px !important;
}
.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff !important;
}
</style>
