<!--
 * @Author: your name
 * @Date: 2021-07-18 11:34:50
 * @LastEditTime: 2021-07-18 13:19:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \complex(3)\complex\src\views\bigping.vue
-->
<template>
  <div class="right_main_under">
       <!-- 反制 -->
    <div class="top">
      <div class="left">
        <div id="bar_qx" ref="chart" style="width:500px,height:200px"></div>
      </div>
      <div class="right">
        <div id="bar_zz" ref="zhuchart" style="width:500px,height:200px"></div>
      </div>
    </div>
    <!-- //嘉兴没有    预警-->
    <div class="bottom">
      <div class="left1">
        <div id="bar_qx1" ref="chart1" style="width:500px,height:200px"></div>
      </div>
      <div class="right1">
        <div
          id="bar_zz1"
          ref="zhuchart1"
          style="width:500px,height:200px"
        ></div>
      </div>
    </div>
    <!-- //上传 -->
      <div class="tubiao1">
        <div class="leftshang">
          <div id="bar_qx" ref="chartshang" style="width:100%,height:100%"></div>
        </div>
      </div>
  </div>
</template>

<script>
import fanzhiweifen from "@/utils/fanzhiweifenlei.js"
import yujingweifen from "@/utils/yujingweifenlei.js"
export default {
  data() {
    return {
      whiteSearchList1: {
        startCreateTime1: "",
        endCreateTime1: "",
      },
      qutest: [],
      qutest1: [],
      qutest2: [],
      zhutest1: [],
      zhutest2: [],
      zhutest3: [],
      restest: [],

      //  111111111111
      newqutest: [],
      newqutest1: [],
      newqutest2: [],
      newqutest3: [],
      newzhutest1: [],
      newzhutest2: [],
      newzhutest3: [],
      newzhutest4: [],
      //  newrestest: [],
      newsonList: [],
        newwarningStatisticsTypeList: [],
            qutest123: [],
      qutest11: [],
      qutest22: [],
        
    };
  },
  // created() {
  //   this.echartslist();
  //   this.echartslist1();
  // },
  mounted() {
    this.echartslist();
    // this.echartslist1();
    this.echartsshangchuan()
  },
  methods: {
    // 图表初次渲染
    async echartslist() {
      let charecharts = {
        startTreatmentTime: this.whiteSearchList1.startCreateTime1.substring(
          0,
          this.whiteSearchList1.startCreateTime1.length - 9
        ),
        endTreatmentTime: this.whiteSearchList1.endCreateTime1.substring(
          0,
          this.whiteSearchList1.startCreateTime1.length - 9
        ),
      };
      const { data: res } = await this.$http.post(
        "/treatment/tongJiTreatment",
        charecharts
      );
      // console.log(res);
      if (res.code == 200) {
      this.newsonList=fanzhiweifen('QT',res.data.sonList)
        // 111111111111111111111111111111
        // this.newsonList = res.data.sonList;
        // var keyType = "QT";
        // var newkey = {};
        // for (var q = 0; q < this.newsonList.length; q++) {
        //   if ((this.newsonList[q].type === keyType)) {
        //     newkey = this.newsonList[q];
        //     this.newsonList.splice(q,1)
        //   }
        // }
        // this.newsonList.push(newkey)
        // 111111111111111111111111111111
        //  console.log(res.data);
        res.data.tjList.forEach((item) => {
          this.qutest.push(item.treatmentTime1);
          this.qutest1.push(item.urlCount);
          this.qutest2.push(item.visitsSum);
        });
        this.newsonList.forEach((item) => {
          this.zhutest1.push(item.type);
          this.zhutest2.push(item.urlCount2);
          this.zhutest3.push(item.typeVisits);
        });
        // console.log(this.zhutest1);
        setTimeout(() => {
          this.drawLine();
          this.Columnar();
        }, 500);
      } else {
        alert("无数据");
      }
    },
  //   // 图表初次渲染
  //   async echartslist1() {
  //     let charecharts = {
  //       startFraudTime: this.whiteSearchList1.startCreateTime1,
  //       endTFraudTime: this.whiteSearchList1.endCreateTime1,
  //     };
  //     const { data: res } = await this.$http.post(
  //       "/warning/statistics",
  //       charecharts
  //     );
  //     if (res.code == 200) {
  //       console.log(res.data);
  //  this.newwarningStatisticsTypeList=yujingweifen('未分类', res.data.warningStatisticsTypeList)
  //     //  console.log(this.newwarningStatisticsTypeList);
  //       //  this.newwarningStatisticsTypeList = res.data.warningStatisticsTypeList;
  //       // var keyType = "未分类";
  //       // var newkey = {};
  //       // for (var q = 0; q < this.newwarningStatisticsTypeList.length; q++) {
  //       //   if ((this.newwarningStatisticsTypeList[q].fraudType1 === keyType)) {
  //       //     newkey = this.newwarningStatisticsTypeList[q];
  //       //     this.newwarningStatisticsTypeList.splice(q,1)
  //       //   }
  //       // }
  //       // this.newwarningStatisticsTypeList.push(newkey)
        
  //      res.data.warningStatisticsGradeList.forEach((item) => {
  //         this.newqutest.push(item.fraudTimeVo);
  //         this.newqutest1.push(item.high);
  //         this.newqutest2.push(item.middle);
  //         this.newqutest3.push(item.lower);
  //       });
  //      this.newwarningStatisticsTypeList.forEach((item) => {
         
  //         this.newzhutest1.push(item.fraudType1);
  //         this.newzhutest2.push(item.high);
  //         this.newzhutest3.push(item.middle);
  //         this.newzhutest4.push(item.lower);
  //       });
  //       // console.log(this.zhutest1);
  //       setTimeout(() => {
  //         this.drawLine1();
  //         this.Columnar1();
  //       }, 500);
  //     } else {
  //       alert("无数据");
  //     }
  //   },
//图表初次渲染
        async echartsshangchuan() {
      let charecharts = {
        startUploadTime: this.whiteSearchList1.startCreateTime1,
        endUploadTime: this.whiteSearchList1.endCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "treatment/tongJiUpload",
        charecharts
      );
      if (res.code == 200) {
        res.data.tongJiPojos.forEach((item) => {
          // console.log(item);
          this.qutest123.push(item.uploadTime1); //时间
          this.qutest11.push(item.urlCount);
          this.qutest22.push(item.rcount);
        });

        // console.log(this.zhutest1);
        setTimeout(() => {
          this.draw();
        }, 500);
      } else {
        alert("无数据");
      }
    },
    //曲线图++++++++++++++++++++++++++++++++++++
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart;
      // eslint-disable-next-line camelcase
      if (bar_qx) {
        let myChart = this.$echarts.init(bar_qx);
        myChart.setOption(this.setOption());
        // console.log(myChart);
      }
      // console.log(this.qutest);
    },
    setOption() {
      let option = {
        feature: {
          saveAsImage: {
            show: false,
          },
        },
        title: {
          x: "center",
          text: "反制数据统计(按日期)", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: [" #fac858", "#EE6666"], //绿色  橙色
        legend: {
          left: "80%", //xin
          orient: "vertical", //xin  horizontal
          data: [
            {
              name: "处置域名数",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "域名访问量",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        grid: {
          y2: 140,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.qutest,
          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },

        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          {
            name: "处置域名数",
            type: "line",

            data: this.qutest1,
            smooth: true,
          },
          {
            name: "域名访问量",
            type: "line",

            data: this.qutest2,
            smooth: true,
          },
        ],
   dataZoom: [
      {
        id: 'dataZoomX',
        type: 'inside',
        xAxisIndex: [0],
        filterMode: 'none',
        start:0,
        end: 200
      }
    ],

        grid: {
          x: 60,
          y: 60,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
      };
      return option;
    },
    //柱状图----------------------------------------
    Columnar() {
      // eslint-disable-next-line camelcase
      var bar_zz = this.$refs.zhuchart;
      // eslint-disable-next-line camelcase
      if (bar_zz) {
        let myChart = this.$echarts.init(bar_zz);

        myChart.setOption(this.zhusetOption());
      }
    },
    zhusetOption() {
      this.zhutest1.forEach((item) => {
        if (item == "DK") {
          this.restest.push("网络贷款");
        } else if (item == "SD") {
          this.restest.push("兼职刷单");
        } else if (item == "GJF") {
          this.restest.push("冒充公务单位");
        }  else if (item == "GW") {
          this.restest.push("冒充电商客服类");
        } else if (item == "QT") {
          this.restest.push("其他类型诈骗");
        }
      });
      // console.log(this.restest);
      let option = {
        //下载
        toolbox: {
          show: true,
          // feature: {
          //   mark: { show: true },
          //   saveAsImage: { show: true },
          // },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          x: "center",
          text: "反制数据统计(按类型)", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        grid: {
          x: 60,
          y: 60,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
        color: [" #fac858", "#EE6666"], //绿色  橙色
        legend: {
          left: "80%", //xin
          orient: "vertical", //xin  horizontal
          data: [
            {
              name: "处置域名数",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "域名访问量",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        xAxis: {
          type: "category",
          // data:this.zhutest2,
          data: this.restest,

          axisLabel: {
            // rotate: -30,
            //  让x轴文字方向为竖向
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          {
            data: this.zhutest2,
            type: "bar",
            color: "#fac858",
            barWidth: 20,
            name: "处置域名数",
          },
          {
            data: this.zhutest3,
            type: "bar",

            barWidth: 20,
            name: "域名访问量",
            color: "#EE6666",
          },
        ],
      };
      return option;
    },
    //曲线图++++++++++++++++++++++++++++++++++++1111
    drawLine1() {
      // eslint-disable-next-line camelcase
      var bar_qx1 = this.$refs.chart1;
      let myChart = this.$echarts.init(bar_qx1);
      myChart.setOption(this.setOption1());
    },
    setOption1() {
      let option = {
        feature: {
          saveAsImage: {
            show: false,
          },
        },
        title: {
          x: "center",
          text: "预警数据统计(按日期)", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: ["#fac858", "#EE6666", "#91cc75"], //绿色  橙色
        legend: {
          left: "87%", //xin
          orient: "vertical", //xin horizontal
          data: [
            {
              name: "高",

              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "中",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
            {
              name: "低",
              textStyle: {
                color: ["#91cc75"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        grid: {
          y2: 140,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.newqutest,

          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },

        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          {
            name: "高",
            type: "line",

            data: this.newqutest1,
            smooth: true,
          },
          {
            name: "中",
            type: "line",

            data: this.newqutest2,
            smooth: true,
          },
          {
            name: "低",
            type: "line",

            data: this.newqutest3,
            smooth: true,
          },
        ],
  dataZoom: [
      {
        id: 'dataZoomX',
        type: 'inside',
        xAxisIndex: [0],
        filterMode: 'none',
        start: 0,
        end: 200
      }
    ],
        grid: {
          x: 60,
          y: 75,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
      };
      return option;
    },
    //柱状图----------------------------------------111
    Columnar1() {
      // eslint-disable-next-line camelcase
      var bar_zz1 = this.$refs.zhuchart1;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_zz1);

      myChart.setOption(this.zhusetOption1());
    },

    zhusetOption1() {
      //  this.zhutest1.forEach((item) => {
      //    if (item == "DK") {
      //      this.restest.push("网络贷款");
      //    } else if (item == "SD") {
      //      this.restest.push("兼职刷单");
      //    } else if (item == "GJF") {
      //      this.restest.push("冒充公检法");
      //    } else if (item == "LC") {
      //      this.restest.push("投资理财");
      //    } else if (item == "GW") {
      //      this.restest.push("网络购物");
      //    } else if (item == "QT") {
      //      this.restest.push("其他");
      //    }
      //  });
      // console.log(this.restest);
      let option = {
        //下载
        toolbox: {
          show: true,
          // feature: {
          //   mark: { show: true },
          //   saveAsImage: { show: true },
          // },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          x: "center",
          text: "预警数据统计(按类型)", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        grid: {
          x: 60,
          y: 75,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
        color: ["#fac858", "#EE6666", "#91cc75"], //绿色  橙色
        legend: {
          left: "87%", //xin
          orient: "vertical", //xin horizontal
          data: [
            {
              name: "高",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "中",
              textStyle: {
                color: ["#EE6666"],
              },
            },
            {
              name: "低",
              textStyle: {
                color: ["#91cc75"],
              },
            },
          ],
        },
        xAxis: {
          type: "category",
          // data:this.zhutest2,
          data: this.newzhutest1,

          axisLabel: {
            // rotate: -30,
            //  让x轴文字方向为竖向
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          {
            data: this.newzhutest2,
            type: "bar",
            color: "#fac858",
            barWidth: 20,
            name: "高",
          },
          {
            data: this.newzhutest3,
            type: "bar",
            barWidth: 20,
            name: "中",
            color: "#EE6666",
          },
          {
            data: this.newzhutest4,
            type: "bar",
            barWidth: 20,
            name: "低",
            color: "#91cc75",
          },
        ],
      };
      return option;
    },
    //上传echarts
     draw() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chartshang;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.newsetOption());
      // console.log(myChart);

      // console.log(this.qutest);
    },
       newsetOption() {
      let option = {
            title: {
          x: "center",
          text: "上传域名统计", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        feature: {
          saveAsImage: {
            show: false,
          },
        },
      
        tooltip: {
          trigger: "axis",
        
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: [" #fac858", "#EE6666"], //绿色  橙色
        legend: {
            right:"5%",
          data: [
            {
              name: "上传域名数",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "关联域名数",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        grid: {
          y2: 140,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.qutest123,
          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },

        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },

        series: [
          {
            name: "上传域名数",
            type: "line",

            data: this.qutest11,
            smooth: true,
          },
          {
            name: "关联域名数",
            type: "line",

            data: this.qutest22,
            smooth: true,
          },
        ],

        grid: {
          x: 60,
          y: 40,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
      };

      return option;
    },

  },
};
</script>

<style scoped lang='less'>
.content-box{
    padding-bottom: 0px;

}
.content{
    height: 100%;
}
.right_main_under{
    width: 99%;
    height: 100%;
    padding: 0;
}
.top {
  // margin-top: 6.25rem /* 100/16 */;   //嘉兴
  height: 30%;
  padding: 0 5rem /* 40/16 */ /* 20/16 */;
  // border: 1px solid red;
  box-sizing: border-box;
//   display: flex;
//   justify-content: space-around;
  margin-bottom: 2%;
}
.bottom {
  height: 30%;
  padding: 0 5rem /* 20/16 */;
  // border: 1px solid red;
  box-sizing: border-box;

    margin-bottom: 2%;
}
.tubiao1{
     height: 30%;
     width: 100%;
  padding: 0 5rem /* 20/16 */;
  // border: 1px solid red;
  box-sizing: border-box;
  margin-bottom: 2%;
}
.leftshang{
   height: 100%;
     width: 100%;
     background-color: #07293f;
      border-radius: 10px;
}
.left {
  float: left;
  width: 49% /* 779/16 */;
  height: 100% /* 300/16 */;
  box-sizing: border-box;
  background-color: #07293f;
  border-radius: 10px;
}
.right {
  float: right;
  width: 49% /* 779/16 */;
  height: 100% /* 300/16 */;
  background-color: #07293f;
  box-sizing: border-box;
  border-radius: 10px;
}
.left1 {
  float: left;
  width: 49% /* 779/16 */;
  height: 100% /* 300/16 */;
  box-sizing: border-box;
  background-color: #07293f;
  border-radius: 10px;
}
.right1 {
  float: right;
  width: 49% /* 779/16 */;
  height: 100% /* 300/16 */;
  background-color: #07293f;
  box-sizing: border-box;
  border-radius: 10px;
}
#bar_qx {
  height: 100% /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}
#bar_zz {
  height: 100% /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}

#bar_qx1 {
  height: 100% /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}
#bar_zz1 {
  height: 100% /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}
</style>