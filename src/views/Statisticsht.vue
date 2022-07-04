<template>
  <div class="right_main_under top net">
    <Navlist></Navlist>
    <!-- 统计模块——头部查询 -->
    <div class="ipt">
      <el-form :inline="true">
        <el-form-item style="float: left">
          <el-button
            type="primary"
            class="el-button-tongjiqiehuan jiacong"
            @click="title"
            v-if="flag"
            >长安</el-button
          >
          <!-- <i class="el-icon-back"></i> -->
          <el-button
            type="primary"
            class="el-button-tongjiqiehuan jiacong"
            @click="title1"
            v-if="!flag"
            >4G</el-button
          >
          <!-- <i class="el-icon-back"></i> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 统计模块——echarts—— 环比-->
    <div class="echarts">
      <div class="echarst_left">
        <div class="echarts1" v-show="flag">
          <div class="echartsleft">
            <div class="eletop">
              <div class="wenzi">
                <span>每日根据4G出网数据发现诈骗网站数量</span>
              </div>
            </div>
            <div class="elebom">
              <div class="eleft">
                <!-- 统计模块——echarts——访问量数环比-->
                <div
                  id="bar_yumingshuhuanbi"
                  ref="chart_yumingshuhuanbi"
                  style="width: 100%; height: 100%"
                ></div>
                <div class="ymer">
                  <el-popover
                    placement="bottom-end"
                    width="30%"
                    trigger="click"
                    v-model="visible"
                  >
                    <el-form :inline="true">
                      <!-- 日期 -->
                      <el-date-picker
                        class="shijian"
                        v-model="tiaojianhuanbi.riqi"
                        :change="yujinghuanbifourG(tiaojianhuanbi.riqi)"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy/MM/dd  HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        
                      >
                       <!-- :picker-options="pickerOptions" -->
                        <!-- :default-time="['00:00:00', '23:59:59']" -->
                      </el-date-picker>
                    </el-form>

                    <div
                      class="bbtn"
                      style="text-align: right; margin-top: 10px"
                    >
                      <el-button
                        class="el-button-chaxun"
                        type="primary"
                        size="mini"
                        @click="errer"
                        >确定</el-button
                      >
                      <el-button
                        class="el-button-chongzhi"
                        size="mini"
                        type="primary"
                        @click="chongz"
                        >重置</el-button
                      >
                    </div>

                    <el-button
                      class="el-button-xitongerr"
                      slot="reference"
                      size="mini"
                      >条件</el-button
                    >
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 统计模块——echarts—— 同比-->
        <div class="echarts11" v-show="!flag">
          <div class="echartsleft">
            <div class="eletop">
              <div class="wenzi"><span>每日长安发现涉诈网址数量</span></div>
            </div>
            <div class="elebom">
              <div class="eleft" ref="elef">
                <!-- 统计模块——echarts——访问量同比-->
                <div
                  id="bar_yumingshutongbi"
                  ref="chart_yumingshutongbi"
                  style="width: 100%; height: 100%"
                ></div>
                <div class="ymer">
                  <el-popover
                    placement="bottom-end"
                    width="30%"
                    trigger="click"
                    v-model="visible1"
                  >
                    <el-form :inline="true">
                      <!-- 日期 -->
                      <el-date-picker
                        class="shijian"
                        v-model="tiaojianhuanbi.riqi1"
                        :change="yujinghuanbichuwang(tiaojianhuanbi.riqi1)"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy/MM/dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                     
                      >
                          <!-- :picker-options="pickerOptions" -->
                      </el-date-picker>
                    </el-form>

                    <div
                      class="bbtn"
                      style="text-align: right; margin-top: 10px"
                    >
                      <el-button
                        class="el-button-chaxun"
                        type="primary"
                        size="mini"
                        @click="errer1"
                        >确定</el-button
                      >
                      <el-button
                        class="el-button-chongzhi"
                        size="mini"
                        type="primary"
                        @click="chongz1"
                        >重置</el-button
                      >
                    </div>

                    <el-button
                      class="el-button-xitongerr"
                      slot="reference"
                      size="mini"
                      >条件</el-button
                    >
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="echarts1">
          <div class="echartsright">
            <div class="eletop">
              <div class="wenzi"><span>每日4G数据清洗后出网总量</span></div>
            </div>
            <div class="elebom">
              <div class="eright">
                <!-- 统计模块——echarts——域名环比 -->
                <div
                  id="bar_yuminglianghuanbi"
                  ref="chart_bar_fangwenlianghuanbi1"
                  style="width: 100%; height: 100%"
                ></div>
                <div class="ymer">
                  <el-popover
                    placement="bottom-end"
                    width="30%"
                    trigger="click"
                    v-model="visible2"
                  >
                    <el-form :inline="true">
                      <!-- 日期 -->
                      <el-date-picker
                        class="shijian"
                        v-model="tiaojianhuanbi.riqi2"
                        :change="yujinghuanbi2(tiaojianhuanbi.riqi2)"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy/MM/dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                       
                      >
                      </el-date-picker>
                    </el-form>

                    <div
                      class="bbtn"
                      style="text-align: right; margin-top: 10px"
                    >
                      <el-button
                        class="el-button-chaxun"
                        type="primary"
                        size="mini"
                        @click="errer2"
                        >确定</el-button
                      >
                      <el-button
                        class="el-button-chongzhi"
                        size="mini"
                        type="primary"
                        @click="chongz2"
                        >重置</el-button
                      >
                    </div>

                    <el-button
                      class="el-button-xitongerr"
                      slot="reference"
                      size="mini"
                      >条件</el-button
                    >
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 统计模块——echarts——反制总量统计 -->
      <div class="echarts2">
        <div class="echarts2_top">
          <div class="eletoplist2">
            <div class="wenzilist2"><span>总量统计</span></div>
          </div>
          <div class="elebomlist2">
            <div class="ymer1">
              <el-popover
                placement="bottom-end"
                width="30%"
                trigger="click"
                v-model="visible3"
              >
                <el-form :inline="true">
                  <!-- 日期 -->
                  <el-date-picker
                    class="shijian"
                    v-model="tiaojianhuanbi.riqi3"
                    :change="yujinghuanbi3(tiaojianhuanbi.riqi3)"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                     
                  >
                    <!-- :picker-options="pickerOptions" -->
                  </el-date-picker>
                </el-form>

                <div class="bbtn" style="text-align: right; margin-top: 10px">
                  <el-button
                    class="el-button-chaxun"
                    type="primary"
                    size="mini"
                    @click="errer3"
                    >确定</el-button
                  >
                  <el-button
                    class="el-button-chongzhi"
                    size="mini"
                    type="primary"
                    @click="chongz3"
                    >重置</el-button
                  >
                </div>

                <el-button
                  class="el-button-xitongerr"
                  slot="reference"
                  size="mini"
                  >条件</el-button
                >
              </el-popover>
            </div>
            <table class="biaoge">
              <tr>
                <td>4G总出网量</td>
                <td>{{ this.CAnum }}</td>
              </tr>
              <tr>
                <td>4G发现总量</td>
                <td>{{ this.fourGfaxiannum }}</td>
              </tr>
              <tr>
                <td>长安发现总量</td>
                <td>{{ this.fourGnum }}</td>
              </tr>
              <tr>
                <td>涉诈总发现量</td>
                <td>{{ this.sheznum }}</td>
              </tr>
              <tr>
                <td>4G预警总量</td>
                <td>{{ this.yujinnum }}</td>
              </tr>
              <tr>
                <td>长安预警总量</td>
                <td>{{ this.bocenum }}</td>
              </tr>
              <tr>
                <td>总预警量</td>
                <td>{{ this.numfourgcayuj }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="echarts3">
        <!-- 统计模块——echarts——反制总量统计（域名数） -->
        <div class="echarts3_top">
          <div class="eletop">
            <div class="wenzi1"><span>4G发现类型比例</span></div>
          </div>
          <div class="elebom">
            <div
              id="bar_fanzhizongliangym"
              ref="chart_fanzhizongliangym"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
        <!-- 统计模块——echarts——反制总量统计（访问量） -->
        <div class="echarts3_bottom">
          <div class="eletop">
            <div class="wenzi1"><span>长安发现类型比例</span></div>
          </div>
          <div class="elebom">
            <div
              id="bar_fanzhizongliangym"
              ref="chart_fanzhizongliangym1"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
        <!-- <div
            id="bar_fanzhizongliangfw"
            ref="chart_fanzhizongliangfw"
            style="width: 100%; height: 100%"
          ></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import dayjs from 'dayjs'

export default {
  data() {
    return {
         pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now(); 
                }
             },
      whiteSearchListfourG: {
        startCreateTimefourG:
          this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTimefourG:
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59',
        // dayjs().format('YYYY-MM-DD') ,
      },
      whiteSearchListchuwang: {
        startCreateTimechuwang:
          this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTimechuwang:
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59',
      },
      whiteSearchListfourtype: {
        startCreateTimefourtype:
          this.timerstart(dayjs().format('YYYY/MM/DD'), 31) +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTimefourtype:
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59',
      },
      whiteSearchListshangchaun3: {
        startCreateTimeshangchaun3: null,
        endCreateTimeshangchaun3: null,
      },
      whiteSearchListclean: {
        startCreateTimeclean:
          this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTimeclean:
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59',
      },
      tiaojianhuanbi: {
        riqi: null, //左一第一个
        riqi1: null, //左一第二个
        riqi2: null, //左三
        riqi3: null, //中
      },
      yumingshubing: '',
      fangwenlbing: '',
      whiteSearchList: {
        startCreateTime:
          dayjs().format('YYYY') +
          '-' +
          dayjs().month(0).format('MM') +
          '-' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime:
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },
      whiteSearchList1: {
        startCreateTime1:
          dayjs().format('YYYY') +
          '/' +
          dayjs().month(0).format('MM') +
          '/' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime1:
          dayjs().format('YYYY/MM/DD') + ' ' + '23:' + '59:' + '59',
      },

      fanzhi: {
        year: new Date().getFullYear().toString(),
      },
      fangwenl: {
        year: new Date().getFullYear().toString(),
        year1: (new Date().getFullYear() - 1).toString(),
        type: '',
        yue: '',
        yue1: '',
        one: null,
      },
      fangwenlhuan: {
        year: (new Date().getFullYear() - 1).toString(),
        year1: new Date().getFullYear().toString(),

        yue: '',
        yue1: '',
        one: '',
        type: '',
      },
      yuminshuhuanbi: {
        zhou: '',
        year: '',

        nianfen1: new Date().getFullYear().toString(),
        nianfen2: (new Date().getFullYear() - 1).toString(),

        type: '',
        // time: "",
        one: null,
        two: '',
        three: '',
        four: '',
      },
      yuj: {
        zhou: '',
        year: '',
        nianfen1: new Date().getFullYear().toString(),
        nianfen2: (new Date().getFullYear() - 1).toString(),
        // time: "",
        one: null,
        two: '',
        three: '',
        four: '',
        type: '',
      },
      form: {
        region: 'quanbu',
        year: '2018',
      },
      flag: true,
      bingtufangwenl: [],
      bingtufangwenltulie: [],
      bingtuyumings: [],
      bingtuyumingstulie: [],
      bingtuyumingsCA: [],
      bingtuyumingstulieCA: [],
      newifNotVisit: [],
      newifVisit: [],
      newdate: [],
      newdPercentage: [],

      tableDatanum: [
        {
          name: '张三',
          value: '1000',
        },
        {
          name: '张三',
          value: '1000',
        },
        {
          name: '张三',
          value: '1000',
        },
        {
          name: '张三',
          value: '1000',
        },
        {
          name: '张三',
          value: '1000',
        },
        {
          name: '张三',
          value: '1000',
        },
      ],
      visible5: false,
      visible6: false,
      visible: false, //左一
      visible1: false, //左二
      visible2: false, //左三
      visible3: false, //中
      // 每日根据4G出网数据发现诈骗网站数量
      fourGRangex: [],
      fourGRangey: [],
      // 每日长安发现涉诈网址数量
      CARangex: [],
      CARangey: [],
      //总量统计
      fourGnum: 0,
      fourGfaxiannum: 0,
      CAnum: 0,
      sheznum: 0,
      yujinnum: 0,
      bocenum: 0,
      numfourgcayuj: 0,
    }
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  watch: {},
  mounted() {
    this.ymhb()
    this.fwlhb()
    this.fwltb()
  },
  created() {
    // this.fanzhiyumingbingtu()
    // this.fanzhiyumingbingtu()
    this.fourGtype() // 4G发现类型比例
    // this.fwltb() //数据接口
    // this.fwlhb() //数据接口
    this.Catype() //长安发现类型比例
    this.fourGRange() //每日根据4G出网数据发现诈骗网站数量
    this.CARange() //每日长安发现涉诈网址数量
    this.fourGout() //每日4G数据清洗后出网总量
    this.yujingnum()
    this.numlist()
  },
  methods: {
    
    //每日根据4G出网数据发现诈骗网站数量
    async fourGRange() {
      this.fourGRangex = []
      this.fourGRangey = []
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getDiscoverByTimeRange',
        {
          params: {
            startTime: this.whiteSearchListfourG.startCreateTimefourG,
            endTime: this.whiteSearchListfourG.endCreateTimefourG,
            statisticEnum: 'OUTNETDISCOVER',
          },
        }
      )
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.fourGRangex.push(item.discoverDate)
          this.fourGRangey.push(item.amount)
        })

        this.$nextTick(() => {
          this.fwlhb()
        })
      }
    },

    //每日长安发现涉诈网址数量
    async CARange() {
      this.CARangex = []
      this.CARangey = []
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getDiscoverByTimeRange',
        {
          params: {
            startTime: this.whiteSearchListchuwang.startCreateTimechuwang,
            endTime: this.whiteSearchListchuwang.endCreateTimechuwang,
            statisticEnum: 'CADISCVOER',
          },
        }
      )
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.CARangex.push(item.discoverDate)
          this.CARangey.push(item.amount)
        })

        this.fwltb()
      }
    },
    //每日4G数据清洗后出网总量
    async fourGout() {
      this.fourGoutx = []
      this.fourGouty = []
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getRawByTimeRange',
        {
          params: {
            startTime: this.whiteSearchListclean.startCreateTimeclean,
            endTime: this.whiteSearchListclean.endCreateTimeclean,
          },
        }
      )
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.fourGoutx.push(item.discoverDate)
          this.fourGouty.push(item.amount)
        })
        // console.log(this.fourGoutx, this.fourGouty)
        this.$nextTick(() => {
          this.ymhb()
        })
      }
    },

    //长安发现类型比例
    async Catype() {
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getDiscoverEveryTypeStatistic',
        {
          params: {
            startTime: this.whiteSearchListfourtype.startCreateTimefourtype,
            endTime: this.whiteSearchListfourtype.endCreateTimefourtype,
            sourceEnum: 'CA',
          },
          //     params: {
          //   startTime: "2022/01/01 00:00:00",
          //   endTime: "2022/04/24 23:59:59",
          //   sourceEnum: 'CA',
          // },
        }
      )
      // debugger
      if (res.code == 200) {
        if (res.data.length > 0) {
          this.bingtuyumingsCA = []
          this.bingtuyumingstulieCA = []

          // console.log(res.data);
          res.data.forEach((item) => {
          if (item.type == 'SZP') {
              item.type = '杀猪盘'
            } else if (item.type == 'KF') {
              item.type = '冒充客服类'
            } else if (item.type == 'DK') {
              item.type = '贷款代办信用卡类'
            }  else if (item.type == 'SD') {
              item.type = '刷单返利类'
            } else if (item.type == 'GJF') {
              item.type = '冒充公检法类'
            } else if (item.type == 'JJGW') {
              item.type = '冒充军警购物诈骗'
            }else if (item.type == 'JY') {
              item.type = '网络婚恋、交友类'
            } else if (item.type == 'ZX') {
              item.type = '虚假征信类'
            }else if (item.type == 'MC') {
              item.type = '冒充领导、熟人类'
            } else if (item.type == 'YX') {
              item.type = '网络游戏产品虚假交易类'
            }else if (item.type == 'OTHER') {
              item.type = '其他类型诈骗'
            } else if (item.type == 'APP') {
              item.type = '分发平台'
            } else if (item.type == 'XZYM') {
              item.type = '下载页面'
            }   else if (item.type == 'HC') {
              item.type = '灰产'
            }

            //  else if (item.type == 'DS') {
            //   item.type = '电商类诈骗'
            // }

          })

          this.bingtuyumingsCA = res.data.map((res, index) => {
            return {
              value: res.count,
              name: res.type,
              percent: res.percent.toFixed(0),
            }
          })
        }

        this.bingtuyumingsCA.forEach((item) => {
          this.bingtuyumingstulieCA.push(item.name)
        })

        this.echarts_fanzhizltjyuming1()
      }
    },

    // 4G发现类型比例
    async fourGtype() {
      // debugger

      // console.log(list);
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getDiscoverEveryTypeStatistic',
        {
          params: {
            startTime: this.whiteSearchListfourtype.startCreateTimefourtype,
            endTime: this.whiteSearchListfourtype.endCreateTimefourtype,
            sourceEnum: 'YC',
          },
          // params:{
          //   startTime:'2022/01/01 00:00:00',
          //    endTime:'2022/04/24 23:59:59',
          //      sourceEnum: 'YC',
          // },
        }
      )
      // debugger
      if (res.code == 200) {
        if (res.data.length > 0) {
          this.bingtuyumings = []
          this.bingtuyumingstulie = []

          // console.log(res.data);
          res.data.forEach((item) => {
                if (item.type == 'SZP') {
              item.type = '杀猪盘'
            } else if (item.type == 'KF') {
              item.type = '冒充客服类'
            } else if (item.type == 'DK') {
              item.type = '贷款代办信用卡类'
            }  else if (item.type == 'SD') {
              item.type = '刷单返利类'
            } else if (item.type == 'GJF') {
              item.type = '冒充公检法类'
            }  else if (item.type == 'JJGW') {
              item.type = '冒充军警购物诈骗'
            }else if (item.type == 'JY') {
              item.type = '网络婚恋、交友类'
            } else if (item.type == 'ZX') {
              item.type = '虚假征信类'
            }else if (item.type == 'MC') {
              item.type = '冒充领导、熟人类'
            } else if (item.type == 'YX') {
              item.type = '网络游戏产品虚假交易类'
            }else if (item.type == 'OTHER') {
              item.type = '其他类型诈骗'
            } else if (item.type == 'APP') {
              item.type = '分发平台'
            } else if (item.type == 'XZYM') {
              item.type = '下载页面'
            }else if (item.type == 'HC') {
              item.type = '灰产'
            }
            // else if (item.type == 'DS') {
            //   item.type = '电商类诈骗'
            // }

          })

          this.bingtuyumings = res.data.map((res, index) => {
            return {
              value: res.count,
              name: res.type,
              percent: res.percent.toFixed(0),
            }
          })
        }

        this.bingtuyumings.forEach((item) => {
          this.bingtuyumingstulie.push(item.name)
        })
        this.echarts_fanzhizltjyuming()
      }
    },
    //总量统计
    async numlist() {
      const { data: res } = await this.$http.get(
        '/discoverStatistic/getTotalByTimeRange',
        {
          params: {
            startTime:
              dayjs(this.whiteSearchList1.startCreateTime1).format(
                'YYYY/MM/DD'
              ) +
              ' ' +
              '00:' +
              '00:' +
              '00',
            endTime:
              dayjs(this.whiteSearchList1.endCreateTime1).format('YYYY/MM/DD') +
              ' ' +
              '23:' +
              '59:' +
              '59',
          },
        }
      )
      if (res.code == 200) {
        if (Object.keys(res.data).length > 0) {
          this.fourGnum = res.data.CADISCVOER
          this.fourGfaxiannum = res.data.OUTNETDISCOVER
          this.CAnum = res.data.OUTNETRAW
          this.sheznum =
            res.data.CADISCVOER + res.data.OUTNETDISCOVER
        } else {
          this.fourGnum = 0
          this.fourGfaxiannum = 0
          this.CAnum = 0
          this.sheznum = 0
        }
      }
    },
    async yujingnum() {
      let list = {
        startFraudTime:
          dayjs(this.whiteSearchList1.startCreateTime1).format('YYYY-MM-DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endFraudTime:
          dayjs(this.whiteSearchList1.endCreateTime1).format('YYYY-MM-DD') +
          ' ' +
          '23:' +
          '59:' +
          '59',
      }
      const { data: res } = await this.$http.post(
        '/warning_4g/findPageWarningData',
        list
      )
      if (res.code == 200) {
        // console.log(res);
        this.yujinnum = res.data.totalNum4g
        this.bocenum = res.data.totalNumCa
        this.numfourgcayuj = res.data.warningTotal
      }
    },
    // 排序从大到小
    sortData(p) {
      return function (m, n) {
        var a = m[p]
        var b = n[p]
        return b - a
      }
    },

    yujinghuanbifourG(val) {
      if (val && val != '') {
        this.whiteSearchListfourG.startCreateTimefourG = val[0]
        this.whiteSearchListfourG.endCreateTimefourG = val[1]
      } else {
        this.whiteSearchListfourG.startCreateTimefourG = null
        this.whiteSearchListfourG.endCreateTimefourG = null
      }
    },
    yujinghuanbichuwang(val) {
      if (val && val != '') {
        this.whiteSearchListchuwang.startCreateTimechuwang = val[0]
        this.whiteSearchListchuwang.endCreateTimechuwang = val[1]
      } else {
        this.whiteSearchListchuwang.startCreateTimechuwang = null
        this.whiteSearchListchuwang.endCreateTimechuwang = null
      }
    },
    yujinghuanbi2(val) {
      if (val && val != '') {
        this.whiteSearchListclean.startCreateTimeclean = val[0]
        this.whiteSearchListclean.endCreateTimeclean = val[1]
      } else {
        this.whiteSearchList.startCreateTime = null
        this.whiteSearchList.endCreateTime = null
      }
    },
    yujinghuanbi3(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 = null
        this.whiteSearchList1.endCreateTime1 = null
      }
    },
    //头部切换域名数，域名访问量  切换环比
    title() {
      this.flag = false
      // this.CARange()
      this.$nextTick(function () {
        this.fwltb()
      })
    },
    //  切换同比
    title1() {
      this.flag = true
      // this.fourGRange()
      this.$nextTick(function () {
        this.fwlhb()
      })
    },
    //每日根据4G出网数据发现诈骗网站数量
    fwlhb() {
      var huanyms = this.$refs.chart_yumingshuhuanbi
      let myChart = this.$echarts.init(huanyms)
      myChart.clear()

      myChart.setOption(this.setOption())
      // window.addEventListener('resize', function () {
      myChart.resize()
      // })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

    setOption() {
      let that = this
      let option = {
        backgroundColor: 'transparent',

        tooltip: {
          trigger: 'axis',
          formatter:function(val){
            return val[0].name+'<br>'+"发现数据: "+val[0].value
          }
        },
        legend: {
          selectedMode: false,
          top: '10px',
          left: '10px',

          data: ['每日数据'],
          textStyle: {
            color: '#fff',

            fontSize: 14,
          },

          itemHeight: 10,
          itemWidth: 20,
        },
        xAxis: [
          {
            type: 'category',
            data: this.fourGRangex,
            axisLine: {
              // 倾斜度数
              interval: 0,
              rotate: 40,
              // x轴颜色
              lineStyle: {
                // color: '#9cc2e2',
                color: '#fff',
                width: 1,
              },
            },
            // 文字颜色
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
            },
            //去除网格线
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '每日数据',

            nameTextStyle: {
              color: '#fff',
              padding: [0, 0, 0, -30], // 四个数字分别为上右下左与原位置距离
            },

            axisLine: {
              lineStyle: {
                // color: '#96c8de',
                color: '#fff',
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: '#94a3af',
              },
            },
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
          },
        ],

        series: [
          {
            name: '每日数据',
            type: 'bar',
            barWidth: 10,
            data: this.fourGRangey,
            // color: '#03A9F4',
            itemStyle: {
              normal: {
                //柱体的颜色
                //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(23,67,129,.5)',
                    },
                    {
                      offset: 1,
                      color: '#0689f4',
                    },
                  ],
                  false
                ),
                borderWidth: 1,
                borderColor: '#0689f4',
              },
            },
          },
        ],

        grid: {
          top: '30%',
          right: '10%',
          left: '8%',
          bottom: '10%',
        },
      }

      return option
    },
    //每日长安发现涉诈网址数量

    fwltb() {
      var huanyms = this.$refs.chart_yumingshutongbi
      let myChart1 = this.$echarts.init(huanyms)
      myChart1.clear()

      myChart1.setOption(this.setOption1())
      // window.addEventListener('resize', function () {
      myChart1.resize()
      // })

      window.addEventListener('resize', function () {
        myChart1.resize()
      })
    },

    setOption1() {
      let that = this
      let option = {
        backgroundColor: 'transparent',

        tooltip: {
          trigger: 'axis',
            formatter:function(val){
            return val[0].name+'<br>'+"发现数据: "+val[0].value
          }
        },
        legend: {
          selectedMode: false,
          top: '10px',
          left: '10px',

          data: ['每日数据'],
          textStyle: {
            color: '#fff',

            fontSize: 14,
          },

          itemHeight: 10,
          itemWidth: 20,
        },
        xAxis: [
          {
            type: 'category',
            data: this.CARangex,
            axisLine: {
              // 倾斜度数
              interval: 0,
              rotate: 40,
              // x轴颜色
              lineStyle: {
                // color: '#9cc2e2',
                color: '#fff',
                width: 1,
              },
            },
            // 文字颜色
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
            },
            //去除网格线
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '每日数据',

            nameTextStyle: {
              color: '#fff',
              padding: [0, 0, 0, -30], // 四个数字分别为上右下左与原位置距离
            },

            axisLine: {
              lineStyle: {
                // color: '#96c8de',
                color: '#fff',
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: '#94a3af',
              },
            },
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
          },
        ],

        series: [
          {
            name: '每日数据',
            type: 'bar',
            barWidth: 10,
            data: this.CARangey,
            // color: '#03A9F4',
            itemStyle: {
              normal: {
                //柱体的颜色
                //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(23,67,129,.5)',
                    },
                    {
                      offset: 1,
                      color: '#0689f4',
                    },
                  ],
                  false
                ),
                borderWidth: 1,
                borderColor: '#0689f4',
              },
            },
          },
        ],

        grid: {
          top: '30%',
          right: '10%',
          left: '8%',
          bottom: '10%',
        },
      }

      return option
    },
    ymhb() {
      var huanyms = this.$refs.chart_bar_fangwenlianghuanbi1
      let myChart = this.$echarts.init(huanyms)
      // myChart.clear()
      myChart.setOption(this.setOption2())
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

    setOption2() {
      let that = this
      let option = {
        backgroundColor: 'transparent',

        tooltip: {
          trigger: 'axis',
            formatter:function(val){
            return val[0].name+'<br>'+"发现数据: "+val[0].value
          }
        },
        legend: {
          selectedMode: false,
          top: '10px',
          left: '10px',

          data: ['每日数据'],
          textStyle: {
            color: '#fff',

            fontSize: 14,
          },

          itemHeight: 10,
          itemWidth: 20,
        },
        xAxis: [
          {
            type: 'category',
            data: this.fourGoutx,
            axisLine: {
              // 倾斜度数
              interval: 0,
              rotate: 40,
              // x轴颜色
              lineStyle: {
                // color: '#9cc2e2',
                color: '#fff',
                width: 1,
              },
            },
            // 文字颜色
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
            },
            //去除网格线
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '每日数据',

            nameTextStyle: {
              color: '#fff',
              padding: [0, 0, 0, -30], // 四个数字分别为上右下左与原位置距离
            },

            axisLine: {
              lineStyle: {
                // color: '#96c8de',
                color: '#fff',
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: '#94a3af',
              },
            },
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
          },
        ],

        series: [
          {
            name: '每日数据',
            type: 'bar',
            barWidth: 10,
            data: this.fourGouty,
            // color: '#03A9F4',
            itemStyle: {
              normal: {
                //柱体的颜色
                //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(23,67,129,.5)',
                    },
                    {
                      offset: 1,
                      color: '#0689f4',
                    },
                  ],
                  false
                ),
                borderWidth: 1,
                borderColor: '#0689f4',
              },
            },
          },
        ],

        grid: {
          top: '30%',
          right: '10%',
          left: '8%',
          bottom: '10%',
        },
      }
      return option
    },

    //4G发现类型比例
    echarts_fanzhizltjyuming() {
      var fzzlym = this.$refs.chart_fanzhizongliangym
      let myChart6 = this.$echarts.init(fzzlym)

      window.addEventListener('resize', function () {
        myChart6.resize()
      })
      // },

      let option3 = {
        legend: {
          type: 'scroll', //分页类型
          orient: 'horizontal', //横向
          height: 80, // icon: 'circle',
          pageIconColor: '#ff781f', //翻页箭头颜色
          pageTextStyle: {
            color: '#fff', //翻页数字颜色
          }, //翻页数字设置
          pageIconSize: 12,
          data: this.bingtuyumingstulie,
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 12,
            padding: [4, 0, 0, 0],
          },
          itemHeight: 10,
          itemWidth: 10,
          bottom: '10',
          x: 'center',
        },
        color: [
          '#e4e932',
          '#5470c6',
          '#91cc75',
          '#fac858',
          '#ee6666',
          '#73c0de',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc',
          '#45C2E0',
          '#C1EBDD',
          '#FFC851',
          '#5A5476',
          '#1869A0',
          '#FF9393',
        ],

        backgroundColor: 'transparent',

        series: [
          {
            type: 'pie',
            name: 'TypeB', // 最外层细圆环
            hoverAnimation: false,
            clockWise: false,
         
            radius: ['50%', '51%'],
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#66CCFF',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(102, 204, 255, 0)',
                  },
                  {
                    offset: 1,
                    color: '#66CCFF',
                  },
                ]),
              },
            },
            label: {
              show: false,
             
            },
            data: [100],
          },
          {
            name: '4G发现类型',
            type: 'pie',
            radius: '40%',
               minAngle: 10,//最小角度
            //  startAngle:300, //起始角度
            data: this.bingtuyumings,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              //饼图图形上的文本标签
              normal: {
                show: true,
                // position: 'inner', //标签的位置
                textStyle: {
                  fontWeight: 400,
                  fontSize: 12, //文字的字体大小
                },
                formatter: function (val) {
                  return val.percent.toFixed(2) + '%'
                },
              },
            },
          },
        ],

        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.seriesName != 'TypeB') {
              return params.name + ': ' + params.value
            }
          },
        },
      }

      myChart6.setOption(option3)
      // return option
    },
    //长安发现类型比例
    echarts_fanzhizltjyuming1() {
      var fzzlym = this.$refs.chart_fanzhizongliangym1
      let myChart5 = this.$echarts.init(fzzlym)

      window.addEventListener('resize', function () {
        myChart5.resize()
      })
      // },
      // setOptionfzlzlym() {

      let option2 = {
        // let echartData = [{
        //         name: 'A类',
        //         value: 30
        //     },
        //     {
        //         name: 'B类',
        //         value: 20
        //     }, {
        //         name: 'C类',
        //         value: 30
        //     }
        // ];
        legend: {
          type: 'scroll', //分页类型
          orient: 'horizontal', //横向
          height: 80, // icon: 'circle',
          pageIconColor: '#ff781f', //翻页箭头颜色
          pageTextStyle: {
            color: '#fff', //翻页数字颜色
          }, //翻页数字设置
          pageIconSize: 12,
          data: this.bingtuyumingstulieCA,
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 12,
            padding: [4, 0, 0, 0],
          },
          itemHeight: 10,
          itemWidth: 10,
          bottom: '10',
          x: 'center',
        },
        color: [
          '#e4e932',
          '#5470c6',
          '#91cc75',
          '#fac858',
          '#ee6666',
          '#73c0de',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc',
          '#45C2E0',
          '#C1EBDD',
          '#FFC851',
          '#5A5476',
          '#1869A0',
          '#FF9393',
        ],

        backgroundColor: 'transparent',

        series: [
          {
            type: 'pie',
            name: 'TypeB', // 最外层细圆环
            hoverAnimation: false,
            clockWise: false,
            radius: ['50%', '51%'],
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#66CCFF',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(102, 204, 255, 0)',
                  },
                  {
                    offset: 1,
                    color: '#66CCFF',
                  },
                ]),
              },
            },
            label: {
              show: false,
            },
            data: [100],
          },
          {
            name: '长安发现类型',
            type: 'pie',
            radius: '40%',
                    minAngle: 10,//最小角度
            //  startAngle:300, //起始角度
            data: this.bingtuyumingsCA,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              //饼图图形上的文本标签
              normal: {
                show: function (params) {
                  console.log(params)
                },
                // position: 'inner', //标签的位置
                textStyle: {
                  fontWeight: 400,
                  fontSize: 12 , //文字的字体大小
                },
                formatter: function (val) {
                  return val.percent.toFixed(2) + '%'
                  //  return val.percent+'%'
                },
              },
            },
          },
        ],

        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.seriesName != 'TypeB') {
              return params.name + ': ' + params.value
            }
          },
        },
      }

      myChart5.setOption(option2)
      // return option
    },

    yujingtime(val) {
      if (val && val != '') {
        this.whiteSearchList.startCreateTime = val[0]
        this.whiteSearchList.endCreateTime = val[1]
      } else {
        ;(this.whiteSearchList.startCreateTime =
          dayjs().format('YYYY') +
          '-' +
          dayjs().month(0).format('MM') +
          '-' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00'),
          (this.whiteSearchList.endCreateTime =
            dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59')
      }
    },
    fangwentime(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        ;(this.whiteSearchList1.startCreateTime1 =
          dayjs().format('YYYY') +
          '-' +
          dayjs().month(0).format('MM') +
          '-' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00'),
          (this.whiteSearchList1.endCreateTime1 =
            dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59')
      }
    },
    //左一确认
    errer() {
// if(  dayjs(this.whiteSearchListfourG.endCreateTimefourG).format("YYYY/MM/DD")==dayjs( this.whiteSearchListfourG.startCreateTimefourG).format("YYYY/MM/DD"))   
// {
//   this.whiteSearchListfourG.startCreateTimefourG= dayjs(
//           dayjs(this.whiteSearchListfourG.startCreateTimefourG).subtract(1, 'day')
//             .$d
//         ).format('YYYY/MM/DD') +
//         '  ' +
//         '00:' +
//         '00:' +
//         '00'

// }
      // this.whiteSearchListfourG.endCreateTimefourG =
      //   dayjs(
      //     dayjs(this.whiteSearchListfourG.endCreateTimefourG).subtract(1, 'day')
      //       .$d
      //   ).format('YYYY/MM/DD') +
      //   '  ' +
      //   '23:' +
      //   '59:' +
      //   '59'
console.log(this.tiaojianhuanbi.riqi);
if(this.tiaojianhuanbi.riqi==null){
  this.$message('请选择日期')
}else{
      if (
        dayjs(this.whiteSearchListfourG.endCreateTimefourG).diff(
          this.whiteSearchListfourG.startCreateTimefourG,
          'day'
        ) > 14
      ) {
        this.$message('输入时间范围超出15天')
      } else {
        this.fourGRange()
        this.visible = false
      }
          }
    },
    //左一取消  每日根据4G出网数据发现诈骗网站数量
    chongz() {
      this.tiaojianhuanbi.riqi = null
      this.whiteSearchListfourG.startCreateTimefourG = this.timerstart(
        dayjs().format('YYYY-MM-DD'),
        16
      )
      this.whiteSearchListfourG.endCreateTimefourG = this.timersend(
        dayjs().format('YYYY-MM-DD'),
        1
      )
      // dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      this.fourGRange()
      this.visible = false
    },
    //左二确认
    errer1() {
// if(  dayjs(this.whiteSearchListchuwang.endCreateTimechuwang).format("YYYY/MM/DD")==dayjs( this.whiteSearchListchuwang.startCreateTimechuwang).format("YYYY/MM/DD"))   
// {
//   this.whiteSearchListchuwang.startCreateTimechuwang= dayjs(
//           dayjs( this.whiteSearchListchuwang.startCreateTimechuwang).subtract(1, 'day')
//             .$d
//         ).format('YYYY/MM/DD') +
//         '  ' +
//         '00:' +
//         '00:' +
//         '00'

// }


      //  this.whiteSearchListchuwang.startCreateTimechuwang
      // this.whiteSearchListchuwang.endCreateTimechuwang =
      //   dayjs(
      //     dayjs(this.whiteSearchListchuwang.endCreateTimechuwang).subtract(
      //       1,
      //       'day'
      //     ).$d
      //   ).format('YYYY/MM/DD') +
      //   '  ' +
      //   '23:' +
      //   '59:' +
      //   '59'
if(this.tiaojianhuanbi.riqi1==null){
  this.$message('请选择日期')
}else{
      if (
        dayjs(this.whiteSearchListchuwang.endCreateTimechuwang).diff(
          this.whiteSearchListchuwang.startCreateTimechuwang,
          'day'
        ) > 14
      ) {
        this.$message('输入时间范围超出15天')
      } else {
        this.CARange()
        this.visible1 = false
      }
      }
    },
    //左二取消
    chongz1() {
      this.tiaojianhuanbi.riqi1 = null
      this.whiteSearchListchuwang.startCreateTimechuwang =
        this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
        ' ' +
        '00:' +
        '00:' +
        '00'
      ;(this.whiteSearchListchuwang.endCreateTimechuwang =
        this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
        ' ' +
        '23:' +
        '59:' +
        '59'),
        this.CARange()
      this.visible1 = false
    },
    //左三确认
    errer2() {
// if(  dayjs(  this.whiteSearchListclean.endCreateTimeclean).format("YYYY/MM/DD")==dayjs(  this.whiteSearchListclean.startCreateTimeclean).format("YYYY/MM/DD"))   
// {
//    this.whiteSearchListclean.startCreateTimeclean= dayjs(
//           dayjs(   this.whiteSearchListclean.startCreateTimeclean).subtract(1, 'day')
//             .$d
//         ).format('YYYY/MM/DD') +
//         '  ' +
//         '00:' +
//         '00:' +
//         '00'

// }

      // this.whiteSearchListclean.startCreateTimeclean
      // this.whiteSearchListclean.endCreateTimeclean =
      //   dayjs(
      //     dayjs(this.whiteSearchListclean.endCreateTimeclean).subtract(1, 'day')
      //       .$d
      //   ).format('YYYY/MM/DD') +
      //   '  ' +
      //   '23:' +
      //   '59:' +
      //   '59'
if(this.tiaojianhuanbi.riqi2==null){
  this.$message('请选择日期')
}else{
      if (
        dayjs(this.whiteSearchListclean.endCreateTimeclean).diff(
          this.whiteSearchListclean.startCreateTimeclean,
          'day'
        ) > 14
      ) {
        this.$message('输入时间范围超出15天')
      } else {
        this.fourGout()
        this.visible2 = false
      }
        }
    },
    //左三取消
    chongz2() {
      this.tiaojianhuanbi.riqi2 = null
      ;(this.whiteSearchListclean.startCreateTimeclean =
        this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
        ' ' +
        '00:' +
        '00:' +
        '00'),
        (this.whiteSearchListclean.endCreateTimeclean =
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59'),
        this.fourGout()
      this.visible2 = false
    },
    //中确认
    errer3() {
      this.numlist()
      this.yujingnum()
      this.visible3 = false
    },
    //中取消
    chongz3() {
   this.whiteSearchList1.startCreateTime1 =       dayjs().format('YYYY') +
          '/' +
          dayjs().month(0).format('MM') +
          '/' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        this.whiteSearchList1.endCreateTime1 =    dayjs().format('YYYY/MM/DD') + ' ' + '23:' + '59:' + '59',
 this.tiaojianhuanbi.riqi3=null
        this.numlist()
      this.yujingnum()
      this.visible3 = false
    },
    // 左一时间  开始时间
    timerstart(val, num) {
      let timelist = dayjs(val).subtract(num, 'day')
      return dayjs(timelist.$d).format('YYYY/MM/DD')
      // console.log(timelist);
    },
    timersend(val, num) {
      let timelist = dayjs(val).subtract(num, 'day')
      return dayjs(timelist.$d).format('YYYY/MM/DD')
      // console.log(timelist);
    },
  },
}
</script>

<style scoped lang='less'>
// 按钮hover
.right_main_under /deep/ .el-button-tongjiqiehuan:focus,
.right_main_under /deep/ .el-button-tongjiqiehuan:hover {
  background: url(../assets/img/shouye/域名访问量切换按钮.png) no-repeat;
  background-size: 100% 100%;
}
.bbtn /deep/ .el-button-chaxun:focus,
.bbtn /deep/ .el-button-chaxun:hover {
  background: url(../assets/img/shouye/查询按钮.png) no-repeat;
  background-size: 100% 100%;
}
.bbtn /deep/ .el-button-chongzhi:focus,
.bbtn /deep/ .el-button-chongzhi:hover {
  background: url(../assets/img/shouye/重置按钮.png) no-repeat;
  background-size: 100% 100%;
}

.right_main_under /deep/ .el-button-xitongerr:focus,
.right_main_under /deep/ .el-button-xitongerr:hover {
  background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}
.right_main_under /deep/ .el-button-xitongerr1:focus,
.right_main_under /deep/ .el-button-xitongerr1:hover {
  background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}

.right_main_under /deep/ .el-button-tongjiqiehuan {
  color: #fff;
}
.right_main_under {
  width: 98%;
  height: 100%;
  padding: 0 10px;
}
/deep/ .el-input.is-disabled {
  height: 25px;
}
/deep/ .el-input__inner {
  font-size: 12px;
  color: #fff;
  background-color: #031b32;
  width: 80px;
  height: 25px !important;
  line-height: 25px;
  border: 1px solid #258cc4;
}

/deep/ .el-form-item {
  margin-bottom: 0px;
}
/deep/ .tesu .el-input__inner {
  width: 120px;
}
/deep/ .el-input__icon {
  line-height: 23px;
}
/deep/ .el-form-item {
  margin-bottom: 0px;
}
/deep/ input::-webkit-input-placeholder {
  color: #fff;
}
/deep/ .el-date-editor .el-range-separator {
  line-height: 26px;
}
/deep/ .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 240px;
}
//时间选择器样式修改
.shijian {
  height: 30px;

  line-height: 30px !important;
  background-color: #031b32 !important;
  border: 1px solid #258cc4 !important;
  /deep/ .el-range-input {
    background-color: #031b32 !important;
    border: none !important;

    color: #fff;
  }
  /deep/ .el-range-separator {
    color: #fff;
    margin-right: 4px;
  }
}
/deep/ .el-range-separator {
  line-height: 24px;
}
/deep/ .el-range-editor.el-input__inner {
  padding: 0 10px;
}
.ipt {
  width: 100%;
  height: 45px;
}
.echarts {
  width: 100%;
  height: 95%;
  //   border: 1px solid red;
}
.echarst_left {
  float: left;
  width: 50%;
  height: 95%;
}
.echarts1 {
  float: left;
  width: 100%;
  height: 50%;
  //   border: 1px solid red;
  //   margin-right: 10px;
}
.echarts11 {
  float: left;
  width: 100%;
  height: 50%;
  //   border: 1px solid red;
  //   margin-right: 10px;
}
.echarts2 {
  width: 23%;
  float: left;
  height: 95%;
  padding: 0 10px;
  // overflow-y: scroll;
}
.echarts3 {
  float: left;
  width: 24%;
  height: 95%;
  //   border: 1px solid red;
  box-sizing: border-box;
  // margin-left: 1%;

  // padding-top:50px;
}
.echarts2_top {
  width: 100%;
  height: 99.5%;
  //   border: 1px solid blue;
  position: relative;
  background: url(../assets/img/taishiimg/域名访问次数排名.png) no-repeat;
  background-size: 100% 100%;
}
.echarts3_top {
  width: 100%;
  height: 50%;
  //   border: 1px solid blue;
  position: relative;
  background: url(../assets/img/tongji/环形背景框.png) no-repeat;
  background-size: 100% 100%;
}
.echarts3_bottom {
  width: 100%;
  height: 48%;
  background: url(../assets/img/tongji/环形背景框.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-top: 2%;
}
.echartsleft {
  // float: left;
  width: 100%;
  height: 100%;
  //   border: 1px solid red;
  box-sizing: border-box;
  margin-right: 10px;
  background: url(../assets/img/tongji/背景框.png) no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.eletop {
  width: 100%;
  height: 9%;
  position: relative;

  .wenzi {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    left: 7%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    // text-shadow: 0px 1px 2px #fff
  }
  .wenzi1 {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    // text-shadow: 0px 1px 2px #fff
  }
}
.elebom {
  width: 100%;
  height: 91%;
}
.eletoplist2 {
  width: 100%;
  height: 6%;
  position: relative;

  .wenzi {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    // text-shadow: 0px 1px 2px #fff
  }
  .wenzilist2 {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    // text-shadow: 0px 1px 2px #fff
  }
}
.elebomlist2 {
  width: 100%;
  height: 94%;
  padding: 1%;
  box-sizing: border-box;
  position: relative;
}
.ymer1 {
  position: absolute;
  top: 3%;
  right: 5px;
  width: 100px;
  height: 30px;
}
.eletop2 {
  width: 100%;
  height: 9%;
  position: relative;

  .wenzi2 {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    // text-shadow: 0px 1px 2px #fff
  }
}
.eletop2 {
  width: 100%;
  height: 9%;
  position: relative;

  .wenzi2 {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    // text-shadow: 0px 1px 2px #fff
  }
}
.elebom2 {
  width: 100%;
  height: 91%;
  padding-top: 12%;
  box-sizing: border-box;
}
.list_fangwenl {
  width: 100%;
  height: 250px;
  overflow-y: scroll;
  .fangwen_zhe {
    width: 100%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    .title_type {
      width: 26%;
      height: 100%;
      float: left;
      text-align: right;
      margin-right: 1%;
      color: #fff;
      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }
    .title_line {
      width: 54%;
      height: 100%;
      float: left;
      margin-right: 1%;
      .title_line_bg {
        height: 10px;
        width: 90%;
        margin-left: 6%;
        margin-right: 4%;
        margin-top: 10px;
        //  margin-left: 4%;
        background: url(../assets/img/taishiimg/线.png) 100% 100% no-repeat;
        background-size: cover;
        position: relative;
        .title_line_bg_lan {
          height: 10px;
          top: 10px;
          left: 0px;
          background: url(../assets/img/taishiimg/右.png) 100% 100% no-repeat;
          background-size: cover;
        }
      }
    }
    .title_num {
      width: 15%;
      height: 100%;
      float: left;
      text-align: left;
      margin-right: 2%;
      background-image: -webkit-linear-gradient(bottom, #e7f9ff, #00b4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
    }
  }
}
.echartsright {
  // float: left;
  width: 100%;
  height: 100%;
  //   border: 1px solid red;
  box-sizing: border-box;
  background: url(../assets/img/tongji/背景框.png) no-repeat;
  background-size: 100% 100%;
}
.eleft {
  width: 100%;
  height: 100%;
  //   border: 1px solid blue;
  // margin-bottom: 10px;
  position: relative;
}

.ymer {
  position: absolute;
  top: 10px;
  right: 40px;
  width: 100px;
  height: 30px;
  // border: 1px solid #fff;
}
.eright {
  width: 100%;
  height: 100%;
  //   border: 1px solid blue;
  // margin-bottom: 10px;
  position: relative;
}
.echarts2_fanzhi {
  width: 100%;
  height: 60%;
  //   border: 1px solid blue;
  margin-bottom: 10px;
  position: relative;
}
.el-table::before {
  height: 0px;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}
.tiaojian {
  position: absolute;
  right: 1%;
  top: 12%;
}
.tiaojian1 {
  position: absolute;
  right: 1%;
  top: 12%;
}
.tongji_nian {
  width: 120px;
}
.tongji_nian /deep/ .el-input__inner {
  width: 120px;
}

/deep/ .el-table,
.el-table__expanded-cell {
  background-color: #03112359;
}
.net {
  // padding-top: 10px;
}

//列表颜色
/deep/ .tableStyle {
  background-color: transparent !important;
  opacity: 1;
  tr {
    background-color: rgba(4, 55, 103, 0.2);
  }
  th {
    background-color: transparent;
  }
  .warning-row {
    // : #;
    background: rgba(22, 132, 233, 0.1);
  }

  .success-row {
    background: rgba(4, 55, 103, 0.2);
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 3px #2fbcfc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  // -webkit-box-shadow: inset 0 0 3px #2fbcfc;
  background-color: #23749c;
}
.jiacong {
  font-weight: 700;
}
.jiacong:hover {
  text-decoration: underline;
}
.biaoge {
  width: 80%;
  height: 80%;
  text-align: center;
  font-family: 'heiti';
  font-size: 18px;
  color: #f5f5f5;
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-spacing: 0; /*去掉单元格间隙*/
  // margin-top: 40px;
  margin-left: 10%;
  margin-top: 20%;
}
table,
th,
td {
  border: 1px solid #0d6fd8;
}
td {
  width: 50%;
}
</style>
