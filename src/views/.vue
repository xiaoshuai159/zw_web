<template>
  <div class="dp">
    <div class="dp_top">
      <div class="logo">综合处置系统</div>
    <div class="topguanli">
      <span class="img">
        <img src="../assets/img/guanliyuan.png" alt="" /> </span
      ><span class="guanliy">管理员</span
      ><span class="tuichu" @click="tuichu">退出</span>
    </div>
        <div class="fanhui" @click="tuichudapin">退出大屏</div>
    </div>
    <div class="dp_bottom">
          <div class="left">
      <!-- //数据来源 -->
      <div class="shuju">
        <div class="shuju_biaoti">数据来源</div>
        <div class="shuju_content">
       
        </div>
      </div>
      <!-- //作案类型 -->
      <div class="zuoan">
        <div class="zuoan_biaoti">作案类型</div>
        <div class="zuoan_content">
          <div
            id="myChart"
            ref="echartsshouyehuanxing"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
      <!-- //趋势 -->
      <div class="qs">
        <div class="qs_biaoti">趋势</div>
        <div class="qs_content">
          <div
            id="myChart"
            ref="echartsshouye3zhexian"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
      ·
    </div>
    <div class="content">
      <!-- //中间地图 -->
      <div
        id="myEcharts"
        ref="chartmap"
        style="width: 100%; height: 100%"
      ></div>
    </div>
    <div class="right">
      <!-- //样本上传排名 -->
      <div class="yangben">
        <div class="yangben_biaoti">样本上传排名</div>
        <div class="yangben_content"></div>
      </div>
      <!-- //反制损失 -->
      <div class="fanzhi">
        <div class="fanzhi_biaoti">反制损失</div>
        <div class="fanzhi_content">
          <div
            id="myChart"
            ref="echartsfanzhi"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
      <!-- //实时预警信息 -->
      <div class="yj">
        <div class="yj_biaoti">实时预警信息</div>
        <div class="yj_content">
          <el-table :data="tableData" style="width: 100%" max-height="14.5rem">
            <el-table-column
              prop="diquname"
              label="地区名称"
              show-overflow-tooltip
              align="center"
              min-width="40%"
            >
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间"
              align="center"
              min-width="30%"
            >
            </el-table-column>
            <el-table-column
              prop="ip"
              label="受害人IP"
              align="center"
              min-width="30%"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
          loading: true,
      tableData: [
        {
          diquname: "中国四川成都市金牛区",
          time: "8.14-12:20:36",
          ip: "172.163.154.68",
        },
        {
          diquname: "中国四川成都市金牛区",
          time: "8.14-12:20:36",
          ip: "172.163.154.68",
        },
        {
          diquname: "中国四川成都市金牛区",
          time: "8.14-12:20:36",
          ip: "172.163.154.68",
        },
        {
          diquname: "中国四川成都市金牛区",
          time: "8.14-12:20:36",
          ip: "172.163.154.68",
        },
        {
          diquname: "中国四川成都市金牛区",
          time: "8.14-12:20:36",
          ip: "172.163.154.68",
        },
        {
          diquname: "中国四川成都市金牛区",
          time: "8.14-12:20:36",
          ip: "172.163.154.68",
        },
      ],
      shuju: {
        yj: "48",
        zp: "26",
        ym: "18",
      },
      maplist: {},
    };
  },
  mounted() {
    this.drawLine();
    this.drawLinezhexian();
    this.drawLinefanzhi();
  },
  created() {
    this.houtai();

    // this.mapcity();
  },
  methods: {
    //左侧——作案类型
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.echartsshouyehuanxing;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOption());

      // console.log(this.qutest);
    },
    setOption() {
      // 基于准备好的dom，初始化echarts实例
      let option = {
        // 绘制图表

        animation: false,
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          showContent: true,
        },
        color: [
          "#23cad1",
          "#3479d7",
          "#149df6",
          "#e79094",
          "#08abe9",
          "#ffb342",
        ],
        legend: {
          orient: "vertical",
          itemHeight: 10,
          itemWidth: 10,
          data: [
            "网络贷款",
            "兼职刷单",
            "网络购物",
            "投资理财",
            "其他类型",
            "冒充公务单位",
          ],

          y: "center", //延Y轴居中
          right: 30, //居右显示

          top: "middle",
          icon: "circle",
          align: "left",
          // selectedMode: false,
          textStyle: {
            color: "#fff",

            fontSize: 14,
          },
        },
        // 回调函数
        formatter: function (name) {
          var data = option.series[0].data; //获取series中的data

          var total = 0;
          var tarValue;
          for (var i = 0, l = data.length; i < l; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          var p = (tarValue / total) * 100;
          return name + " " + " " + p.toFixed(2) + "%";
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["70%", "80%"],
            center: ["25%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: "#001c32",
              borderWidth: 5,
            },
            data: [
              { value: 335, name: "杀猪盘" },
              { value: 310, name: "网络贷款" },
              { value: 234, name: "仿冒客服" },
              { value: 135, name: "兼职刷单" },
              { value: 548, name: "投资理财" },
              { value: 1048, name: "其他类型" },
                { value: 108, name: "仿冒公检法" },
            ],
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: function (item) {
                  return item.data.value + "\r\n" + item.data.name;
                },
                // formatter: "{b} \r\n {c} ({d}%)",
                textStyle: {
                  fontSize: "20",
                  color: "#fff",
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],

        graphic: {
          //图形中间图片
          elements: [
            {
              type: "image",
              style: {
                image: require("../assets/img/xuxianyuanhuan.png"), //你的图片地址
                width: 150,
                height: 150,
              },
              left: "6.55%",
              top: "center",
            },
          ],
        },
      };

      return option;
    },
    //左侧——趋势
    drawLinezhexian() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.echartsshouye3zhexian;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOptionzhexian());

      // console.log(this.qutest);
    },
    setOptionzhexian() {
      let option = {
        //     title: {
        //   x: "center",
        //   text: "上传域名统计", //xin
        //   textStyle: {
        //     //xin
        //     fontSize: 20,
        //     color: "#fff", //xin
        //   },
        // },
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
        color: ["#087dd8", "#1dd1cd", "#edd576"], //绿色  橙色
        legend: {
          right: "5%",
          top: "7%",
          icon: "rect",
          itemHeight: 10,
          itemWidth: 20,
          data: [
            {
              name: "受害人数量",
              textStyle: {
                color: ["#087dd8"],
              },
            },
            {
              name: "域名数量",
              textStyle: {
                color: ["#1dd1cd"],
              },
            },
            {
              name: "IP数量",
              textStyle: {
                color: ["#edd576"],
              },
            },
          ],
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
            //修改x轴文字
            textStyle: {
              color: "#f7ffff",
            },
          },

          axisLine: {
            lineStyle: {
              color: "#666",
              width: 1,
            },
          },
        },

        yAxis: [
          {
            type: "value",
            axisTick: {
              //y轴刻度线
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: ["#666"],
              },
            },
            axisLabel: {
              textStyle: {
                color: "#868d92",
              },
            },
          },
        ],

        series: [
          {
            name: "受害人数量",
            type: "line",
            data: [100, 200, 305, 45, 22, 66, 160],
            smooth: true,
          },
          {
            name: "域名数量",
            type: "line",

            data: [56, 100, 205, 145, 422, 166, 60],
            smooth: true,
          },
          {
            name: "IP数量",
            type: "line",

            data: [80, 200, 56, 15, 22, 66, 160],
            smooth: true,
          },
        ],

        grid: {
          x: 40,
          y: 60,
          x2: 20,
          y2: 20,
          borderWidth: 1,
        },
      };
      return option;
    },
    //右侧——反制损失
    drawLinefanzhi() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.echartsfanzhi;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOptionfanzhi());

      // console.log(this.qutest);
    },
    setOptionfanzhi() {
      let option = {
        grid: {
          x: 40,
          y: 80,
          x2: 30,
          y2: 30,
          borderWidth: 1,
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          right: "5%",
          top: "7%",
          icon: "rect",
          itemHeight: 10,
          itemWidth: 20,
          data: [{ name: "访问域名数量" }, { name: "反制数量" }],
          textStyle: {
            color: "#ffffff",
            fontSize: 11,
          },
          y: "top",
          x: "right",
        },
        xAxis: [
          {
            boundaryGap: false,
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#666",
                width: 1,
              },
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            // axisPointer: {
            //   type: "shadow",
            // },
            axisLabel: {
              interval: 0, //横轴信息全部显示
              textStyle: {
                color: "#fff",
              },
              fontSize: 11,
              // rotate:45,//度角倾斜显示
              // formatter: function (value) {
              //   return value.length > 5 ? value.substring(0, 5) + "..." : value;
              // },
            },
          },
        ],
        yAxis: [
          //这里配置两条Y轴
          {
            type: "value",
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#666",
                width: 1,
              },
            },

            axisLine: {
              lineStyle: {
                color: "#666",
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },

              fontSize: 11,
              interval: "auto",
              formatter: "{value}",
            },
            name: "单位（万）",
            nameTextStyle: {
              color: "#fff",
            },
          },
          {
            type: "value",
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#021439",
                width: 1,
              },
            },
            // axisTick: {
            //   //y轴刻度线
            //   show: false,
            // },
            axisLine: {
              lineStyle: {
                color: "#666",
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
              fontSize: 11,
              interval: "auto",
              formatter: "{value}",
            },
            name: "单位（万）",
            nameTextStyle: {
              color: "#fff",
              fontSize: 11,
            },
          },
        ],
        series: [
          {
            name: "访问域名数量",
            smooth: true,
            emphasis: {
              focus: "series",
            },
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: " #16a5ff",
                },
                color: "#0992f7",
              },
            },
            areaStyle: {},
            yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            data: [0, 200, 6, 17, 22, 26, 141, 1148, 59, 299, 75, 90],
          },

          {
            name: "反制数量",
            smooth: true,
            emphasis: {
              focus: "series",
            },
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#13d3db",
                },
                fontSize: 11,
                color: "#1cced5",
              },
            },
            areaStyle: {},
            // symbol: "circle",
            symbolSize: 3, //折线点的大小
            yAxisIndex: 1,
            data: [120, 500, 10, 25, 50, 80, 115, 165, 220, 290, 370, 455],
          },
        ],
      };

      return option;
    },
    //退出大屏
    tuichudapin() {
      this.$router.push("/domain");
    },
    //退出
    tuichu() {
      this.$router.push("/");
      window.localStorage.clear();
    },

    houtai() {
      this.$http
        .get(
          "http://10.8.0.120:8088/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%E6%88%90%E9%83%BD%E5%8C%BA%E5%8E%BF&maxFeatures=50&outputFormat=application%2Fjson                                 "
        )
        .then((res) => {
          // console.log(res);

          this.maplist = res.data;
          // console.log(this.maplist);

          for (var i = 0; i < this.maplist.features.length; i++) {
            for (let key in this.maplist.features[i].properties) {
              // console.log(key);
              //
              if (key == "区县名") {
                this.maplist.features[i].properties["name"] =
                  this.maplist.features[i].properties[key];
                delete this.maplist.features[i].properties[key];
              }
            }
          }

          this.mapcity();
        });
    },

    //中间地图
    mapcity() {
      //   var chartDom = document.getElementById('myEcharts');
      // var myChart =this.$echarts.init(chartDom);
      // if(this.$refs.chartmap){
      var el = this.$refs.chartmap;
      var myChart = this.$echarts.init(el);
      // var option;
      this.$echarts.registerMap("CD", this.maplist);

      myChart.setOption(this.new());
      //  console.log(myChart);
      // }
    },
    new() {
      let option = {
        // title: {
        //   text: "成都地图",
        //   subtext: "数据分析",
        //   sublink:''

        // },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (个 / 人数)",
          // formatter:function(val){
          //   console.log(val);
          // },
        },
        // toolbox: {
        //   show: true,
        //   orient: "vertical",
        //   left: "right",
        //   top: "center",
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        visualMap: {
          min: 800,
          max: 50000,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            name: "成都",
            type: "map",
            map: "CD",
            geoIndex: 1,

aspectScale: 1, //长宽比
roam: false,

zoom: 1.25,
            label: {
              show: true,
            },
            data: [
              { name: "锦江区", value: 1125 },
              { name: "青羊区", value: 1000 },
              { name: "金牛区", value: 20000 },
              { name: "武侯区", value: 43562 },
              { name: "成华区", value: 15896 },
              { name: "龙泉驿区", value: 9756 },
              { name: "青白江区", value: 1356 },
              { name: "新都区", value: 25863 },
              { name: "温江区", value: 1235 },
              { name: "双流区", value: 5643 },
              { name: "郫都区", value: 25863 },
              { name: "金堂县", value: 1235 },
              { name: "大邑县", value: 1325 },
              { name: "蒲江县", value: 1000 },
              { name: "新津县", value: 20000 },
              { name: "都江堰市", value: 43562 },
              { name: "彭州市", value: 15896 },
              { name: "邛崃市", value: 9756 },
              { name: "崇州市", value: 1356 },
              { name: "简阳市", value: 25863 },
              { name: "东部新区", value: 2863 },
              { name: "天府新区", value: 28263 },
              { name: "高新西区", value: 12863 },
              { name: "高新南区", value: 12863 },
            ],
            // 自定义名称映射
            // nameMap: {
            //   'Central and Western': '中西区',
            //   Eastern: '东区',
            //   Islands: '离岛',
            //   'Kowloon City': '九龙城',
            //   'Kwai Tsing': '葵青',
            //   'Kwun Tong': '观塘',
            //   North: '北区',
            //   'Sai Kung': '西贡',
            //   'Sha Tin': '沙田',
            //   'Sham Shui Po': '深水埗',
            //   Southern: '南区',
            //   'Tai Po': '大埔',
            //   'Tsuen Wan': '荃湾',
            //   'Tuen Mun': '屯门',
            //   'Wan Chai': '湾仔',
            //   'Wong Tai Sin': '黄大仙',
            //   'Yau Tsim Mong': '油尖旺',
            //   'Yuen Long': '元朗'
            // }
          },
        ],
      };
      this.loading=false
      return option;
    },
  },
  // },
};
</script>

<style scoped lang='less'>
.dp{
    width: 100%;
    height: 100%;
      /* width: 100%;
  height: 58.5625rem /* 937/16 */
  /* // z-index: -1; */
  background-image: url(../assets/img/shouye/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.dp .dp_top {
  width: 100%;
  height: 9%;
   background-image: url(../assets/img/shouye/beijingtou.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  /* background-color: red; */
}
.dp .dp_top .logo {
  width: 14.4% /* 277/16 */;
  height: 3.73% /* 35/16 */;
  line-height: 3.73% /* 35/16 */;
  color: #d2defd;
  font-size: 2.125rem /* 34/16 */;
  letter-spacing: 0.75rem /* 12/16 */;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, 0);
}
.dp .dp_top .topguanli {
  width: 10.1% /* 150/16 */ /* 277/16 */;
  height:50% /* 30/16 */ /* 35/16 */;
  position: absolute;
  right: 0%;
  top: 20%;
}
.dp .dp_top .guanliy {
  width: 25.6% /* 60/16 */;
  height: 50%;
  display: block;
  float: left;
  font-size: 16px /* 22/16 */;
  color: #3a9bb6;
  line-height: 90%;
  margin-left: 6.52%/* 10/16 */;
  margin-top: 4%;
}
.dp .dp_top .tuichu {
  width: 21.6% /* 40/16 */ /* 60/16 */;
  height: 50%;
  display: block;
  float: left;
  color: #daf3ff;
  font-size: 16px /* 22/16 */;
  line-height:  3.2%;
  cursor: pointer;
   margin-top: 7%;
     margin-left: 6.52%/* 10/16 */;
}
.dp .dp_top .tuichu:hover {
  color: #3a9bb6;
}

.dp .dp_top .img {
  display: block;
  float: left;
}
.dp  .dp_bottom {
  width: 100%;
  height: 91%;
  position: relative;
  // background-color: blue; 
}
/* //左侧 */
.left {
 
  float: left;
  width: 22% /* 436/16 */;
  height: 88.9%;
  /* // border: 1px solid red; */
  box-sizing: border-box;
  padding: 0.74% /* 14/16 */;
}
.content {
  float: left;
  width: 56%;
  height: 88.9%;
    box-sizing: border-box;
  /* // background-color: #000; */
  padding: 0 1% 0 1%;
}
/* //右侧 */
.right {
 float: left;
  width: 22% /* 436/16 */;
  height: 88.9%;
  /* // border: 1px solid red; */
  box-sizing: border-box;
  padding: 0.74%  /* 14/16 */;
}
/* //左侧——数据来源 */
.shuju {
  width: 100%;
  height: 28.5% /* 200/16 */;
  /* // border: 1px solid blue; */
}
.shuju_biaoti {
  box-sizing: border-box;
  width: 100%;
  height: 17.7% /* 44/16 */;
  background-image: url(../assets/img/biaotikuang.png);
    background-repeat: no-repeat;
  background-size: 100% 17.7% /* 44/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #cde0f3;
  line-height: 17.7%/* 44/16 */;
  padding-left: 2.25rem /* 36/16 */;
}
/* //左侧——作案类型 */
.zuoan {
  width: 100%;
  height: 16.875rem /* 270/16 */;
}
.zuoan_biaoti {
  box-sizing: border-box;
  width: 100%;
  height: 2.75rem /* 44/16 */;
  background-image: url(../assets/img/biaotikuang.png);
  background-size: 100% 2.75rem /* 44/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #cde0f3;
  line-height: 2.75rem /* 44/16 */;
  padding-left: 2.25rem /* 36/16 */;
}
/* //左侧——趋势 */
.qs {
  width: 100%;
  height: 19.125rem /* 306/16 */;
}
.qs_biaoti {
  box-sizing: border-box;
  width: 100%;
  height: 2.75rem /* 44/16 */;
  background-image: url(../assets/img/biaotikuang.png);
  background-size: 100% 2.75rem /* 44/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #cde0f3;
  line-height: 2.75rem /* 44/16 */;
  padding-left: 2.25rem /* 36/16 */;
}
/* //右侧——样本上传排名 */
.yangben {
  width: 100%;
  height: 16.625rem /* 250/16 */;
}
.yangben_biaoti {
  box-sizing: border-box;
  width: 100%;
  height: 2.75rem /* 44/16 */;
  background-image: url(../assets/img/biaotikuang.png);
  background-size: 100% 2.75rem /* 44/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #cde0f3;
  line-height: 2.75rem /* 44/16 */;
  padding-left: 2.25rem /* 36/16 */;
}
/* //右侧——反制损失 */
.fanzhi {
  width: 100%;
  height: 16.625rem /* 266/16 */;
}
.fanzhi_biaoti {
  box-sizing: border-box;
  width: 100%;
  height: 2.75rem /* 44/16 */;
  background-image: url(../assets/img/biaotikuang.png);
  background-size: 100% 2.75rem /* 44/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #cde0f3;
  line-height: 2.75rem /* 44/16 */;
  padding-left: 2.25rem /* 36/16 */;
}
/* //右侧——实时预警信息 */
.yj {
  width: 100%;
  height: 17.25rem /* 260/16 */;
}
.yj_biaoti {
  box-sizing: border-box;
  width: 100%;
  height: 2.75rem /* 44/16 */;
  background-image: url(../assets/img/biaotikuang.png);
  background-size: 100% 2.75rem /* 44/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #cde0f3;
  line-height: 2.75rem /* 44/16 */;
  padding-left: 2.25rem /* 36/16 */;
}
.shuju_content {
  box-sizing: border-box;
  width: 100%;
  height: 82.2% /* 156/16 */;
  display: flex;
  justify-content: space-around;
  padding: 1.35rem /* 28/16 */ 0;
}
.sj_one,
.sj_one1,
.sj_one2 {
  width: 7.1875rem /* 115/16 */ /* 110/16 */ /* 100/16 */;
  height: 7.1875rem /* 100/16 */;
  /* // border: 1px solid red; */
  border-radius: 50%;
}
.sj_one {
  background: url(../assets/img/wai.png);
  background-size: 7.1875rem /* 100/16 */ 7.1875rem /* 100/16 */;
  position: relative;
}
.sjnei_one {
  /* // padding: .625rem 10/16 .625rem 10/16; */
  position: absolute;
  top: 0.75rem /* 12/16 */ /* 12.5/16 */;
  left: 0.78125rem /* 12.5/16 */ /* 12.5/16 */;
  width: 5.625rem /* 90/16 */;
  height: 5.625rem /* 90/16 */;
  border-radius: 50%;
  /* // border: 1px solid blue; */
  background: url(../assets/img/nei.png) no-repeat;
  background-size: 5.625rem /* 100/16 */ 5.625rem /* 100/16 */;
}
.sj_one1 {
  background: url(../assets/img/wai1.png);
  background-size: 7.1875rem /* 100/16 */ 7.1875rem /* 100/16 */;
  position: relative;
}
.sjnei_one1 {
  /* // padding: .625rem 10/16 .625rem 10/16; */
  position: absolute;
  top: 0.75rem /* 12/16 */ /* 12.5/16 */;
  left: 0.78125rem /* 12.5/16 */ /* 12.5/16 */;
  width: 5.625rem /* 90/16 */;
  height: 5.625rem /* 90/16 */;
  border-radius: 50%;
  /* // border: 1px solid blue; */
  background: url(../assets/img/nei1.png) no-repeat;
  background-size: 5.625rem /* 100/16 */ 5.625rem /* 100/16 */;
}
.sj_one2 {
  background: url(../assets/img/wai2.png);
  background-size: 7.1875rem /* 100/16 */ 7.1875rem /* 100/16 */;
  position: relative;
}
.sjnei_one2 {
  /* // padding: .625rem 10/16 .625rem 10/16; */
  position: absolute;
  top: 0.75rem /* 12/16 */ /* 12.5/16 */;
  left: 0.78125rem /* 12.5/16 */ /* 12.5/16 */;
  width: 5.625rem /* 90/16 */;
  height: 5.625rem /* 90/16 */;
  border-radius: 50%;
  /* // border: 1px solid blue; */
  background: url(../assets/img/nei2.png) no-repeat;
  background-size: 5.625rem /* 100/16 */ 5.625rem /* 100/16 */;
}
.shuju_shuzi {
  text-align: center;
  font-size: 1.75rem /* 28/16 */;
  transform: scale(0.9, 1.2);
  letter-spacing: 0.25rem /* 4/16 */;
  color: #11ddfb;
  margin-top: 1.25rem /* 20/16 */;
}
.shuju_wenzi {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 0.875rem /* 14/16 */ /* 16/16 */;
  color: #fff;
}
.zuoan_content {
  width: 100%;
  height: 14.125rem /* 226/16 */;
}
.qs_content {
  height: 16.375rem /* 262/16 */;
  width: 100%;
}
.fanzhi_content {
  height: 13.875rem /* 222/16 */;
  width: 100%;
}
.yj_content {
  height: 14.5rem /* 232/16 */;
  /* // width: 100%; */
  padding: 0.625rem /* 10/16 */;
}
/* 去掉中间数据的分割线 */
/deep/ .el-table__row > td {
  border: none;
}
/* 去掉上面的线 */
/deep/ .el-table th.is-leaf {
  border: none;
}
/* 去掉最下面的那一条线 */
/deep/ .el-table::before {
  height: 0px;
}
// /deep/ .el-table td {
//   padding: 4px 0px;
//   color: #fff;
//   font-size: 8px;
// }
// /deep/ .el-table tr:nth-child(2n) {
//   border: 1px solid #136198 !important;
//   background-color: #052135 !important;
// }
// /deep/ .el-table th {
//   padding: 4px 0px;
//   color: #fff;
// }
/deep/ .el-table__header-wrapper {
  border: 1px solid #136198;
  background-color: #052135 !important;
  box-sizing: border-box;
}

/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
}
/* 表格内背景颜色 */
// /deep/ .el-table th,
// /deep/ .el-table tr,
// /deep/ .el-table td {
//   background-color: transparent;
// }
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #03112359;
}

.dp .fanhui {
  width: 9.375rem /* 150/16 */ /* 277/16 */;
  height: 1.875rem /* 30/16 */ /* 35/16 */;
  position: absolute;
  left: 1%;
  top: 1.5%;
  color: #11ddfb;
  cursor: pointer;
  font-size: 18px;
  line-height: 1.875rem;
}
</style>