<template>
  <div class="right_main_under top net">
    <Navlist></Navlist>
    <!-- 统计预警模块——头部查询 -->
    <!-- <div class="ipt">
      <el-form :inline="true">
       
        <el-form-item style="float: right">
          <el-button size="mini" type="primary" @click="title" v-if="form.tlt"
            ><i class="el-icon-back"></i>域名数</el-button
          >
          <el-button size="mini" type="primary" @click="title1" v-if="form.tlt1"
            ><i class="el-icon-back"></i>域名访问量</el-button
          >
        </el-form-item>
      </el-form>
    </div> -->
    <!-- 统计预警模块——echarts—— 环比-->
    <div class="echarts">
      <div class="echartsbig">
        <div class="echarts1">
          <!-- v-if="form.echartsqiehuan" -->
          <div class="echartsleft">
            <div class="eletop">
              <div class="wenzi"><span>4G每日发现预警数据</span></div>
            </div>
            <div class="elebom">
              <div class="eleft">
                <!-- 统计预警模块——echarts——环比-->
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
                        :change="yujinghuanbi(tiaojianhuanbi.riqi)"
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
                        @click="err1"
                        v-preventReClick
                        >确定</el-button
                      >
                      <el-button
                        :disabled="diserr1"
                        class="el-button-chongzhi"
                        size="mini"
                        type="primary"
                        @click="chongzhi1"
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
        <!-- 统计预警模块——echarts—— 同比-->
        <div class="echarts2">
          <!-- v-if="form.echartsqiehuan1" -->
          <div class="echartsleft">
            <div class="eletop">
              <div class="wenzi"><span>长安每日发现预警数据</span></div>
            </div>
            <div class="elebom">
              <div class="eleft">
                <!-- 统计预警模块——echarts——域名数同比-->
                <div
                  id="bar_yumingshutongbi"
                  ref="chart_yumingshutongbi123"
                  style="width: 100%; height: 100%"
                ></div>
                <div class="ymer">
                  <el-popover
                    placement="bottom-end"
                    width="30%"
                    trigger="click"
                    v-model="visiblet"
                  >
                    <el-form :inline="true">
                      <!-- 日期 -->
                      <el-date-picker
                        class="shijian"
                        v-model="tiaojianhuanbi.riqi1"
                        :change="yujinghuanbi1(tiaojianhuanbi.riqi1)"
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
                        @click="tongbiyujing"
                        v-preventReClick
                        >确定</el-button
                      >
                      <el-button
                        :disabled="diserr"
                        class="el-button-chongzhi"
                        size="mini"
                        type="primary"
                        @click="chongzhitb"
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

      <!-- 统计预警模块——echarts——预警总量统计 -->
      <div class="echarts3">
        <!-- 统计预警模块——echarts—— -->
        <div class="echarts3_top">
          <div class="eletop">
            <div class="wenzi1"><span>今日访问量区域比例</span></div>
          </div>
          <div class="elebom">
            <div
              id="bar_fanzhizongliangym"
              ref="chart_fanzhizongliangym1"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
        <div class="echarts3_top">
          <div class="eletop">
            <div class="wenzi1"><span>今日涉诈网址区域比例</span></div>
          </div>
          <div class="elebom">
            <div
              id="bar_fanzhizongliangym"
              ref="chart_fanzhizongliangym"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
      </div>
      <div class="echartsright">
        <div class="echarts4_top">
          <div class="eletop">
            <div class="wenzi3"><span>今日涉诈网址被访问次数排行</span></div>
          </div>
          <div class="elebom">
            <!-- 排序 -->
            <div
              id="bar_qx"
              ref="chart"
              class="yuanIP_num"
              style="width: 100%; height: 94%"
            >
              <div
                v-for="(item, index) in this.visits"
                :key="index"
                class="yuanIP_numson"
              >
                <div class="list_one1">
                  <div
                    :class="cssyangshi(index)"
                    :style="{
                      background:
                        'url(' +
                        require('../assets/img/taishiimg/' +
                          (index + 1) +
                          '.png') +
                        ') no-repeat center center',
                      'background-size': '100% 100%',
                    }"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="list_img"></div>
                  <div class="list_title" :title="item.statisticKey">
                    {{ item.statisticKey }}
                    <!-- {{
                        item.ip.length >= 28
                          ? item.ip.slice(0, 28) + '...'
                          : item.ip
                      }} -->
                  </div>
                  <div class="list_num">{{ item.statisticValue }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="echarts4_top">
          <div class="eletop">
            <div class="wenzi3"><span>今日源IP访问次数排行</span></div>
          </div>
          <div class="elebom">
            <div
              id="bar_qx"
              ref="chart"
              class="yuanIP_num"
              style="width: 100%; height: 94%"
            >
              <div
                v-for="(item, index) in this.visits1"
                :key="index"
                class="yuanIP_numson"
              >
                <div class="list_one1">
                  <div
                    :class="cssyangshi(index)"
                    :style="{
                      background:
                        'url(' +
                        require('../assets/img/taishiimg/' +
                          (index + 1) +
                          '.png') +
                        ') no-repeat center center',
                      'background-size': '100% 100%',
                    }"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="list_img"></div>
                  <div class="list_title" :title="item.statisticKey">
                    {{ item.statisticKey }}
                    <!-- {{
                        item.ip.length >= 28
                          ? item.ip.slice(0, 28) + '...'
                          : item.ip
                      }} -->
                  </div>
                  <div class="list_num">{{ item.statisticValue }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import dayjs from 'dayjs'

export default {
  name: 'yujingtongjitu',
  data() {
    return {
         pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now(); 
                }
             },
      tiaojianhuanbi: {
        list: '',
        list1: '',
        riqi: '',
        riqi1: '',
      },
      yjnian: false,
      yjriqi: false,
      yjnian1: false,
      yjriqi1: false,
      white: {
        start:
          this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
          ' ' +
          '00:' +
          '00:' +
          '00',

        end:
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59',
      },
      white1: {
        start1:
          this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
          ' ' +
          '00:' +
          '00:' +
          '00',

        end1:
          this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
          ' ' +
          '23:' +
          '59:' +
          '59',
      },

      yujingtongji: '',
      fangwenjiltongji: '',
      dia: '1',
      dia1: '1',
      shangchuan: {
        list: '',
        year: '',
        yue: '',
        year1: '',
        yue1: '',
        riqi: '',
      },
      nian: false,
      yue: false,
      riqi: true,
      form: {
        region: 'quanbu',
        year: '2018',
        tlt: true,
        tlt1: false,
        echartsqiehuan: true,
        echartsqiehuan1: false,
      },
      yujtb: {
        zhou: null,
        year: null,
        nianfen: new Date().getFullYear().toString(),
        nianfen1: new Date().getFullYear().toString(),
        // time: "",
        one: null,
        two: null,
        three: null,
        four: null,
      },
      yuj: {
        zhou: null,
        year: null,
        nianfen: new Date().getFullYear().toString(),
        // nianfen:,
        // nianfen1: (new Date().getFullYear() - 1).toString(),
        // time: "",
        one: null,
        two: null,
        three: null,
        four: null,
      },
      tableData: [],
      tableData1: [],
      visits: [],
      visits1: [],

      visible: false,
      visiblet: false,
      visible1: false,
      visible2: false,
      visible3: false,
      diserr: false,
      diserr1: false,
      whiteSearchList: {
        startCreateTime: null,
        endCreateTime: null,
      },
      whiteSearchList1: {
        startCreateTime1: '',
        endCreateTime1: '',
      },

      whiteSearchListshangchaun: {
        startCreateTimeshangchaun:
          //  dayjs( dayjs().subtract(11, 'month').format('YYYY-MM') ).format("YYYY-MM-DD")
          dayjs().format('YYYY') +
          '-' +
          dayjs().month(0).format('MM') +
          '-' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTimeshangchaun:
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },

      yujingzongliangshuju: [],
      yujingzongliangshujutulie: [],
      yujingzongliangshuju1: [],
      yujingzongliangshujutulie1: [],
      tbmonth: [],
      tbgrowthRate: [],
      tbyearOne: [],
      tbgrowthRate1: [],
      max: '',
      min: '',
      nummax: '',
      tbmonthtb: [],
      tbgrowthRatetb: [],
      tbendTotaltb: [],
      tbstartTotaltb: [],
      tbgrowthRatetb1: [],
      yujdanqian: [],
      yujighuanbishu: [],
      max1: '',
      min1: '',
      nummax1: '',
      relation: [],
      dep: [],
      department: [],
      newlist: [],
      newlist1: [],
      test: [],
      test1: [],
    }
  },

  mounted() {
    // this.echarts_yumingshuhuanbi();
    // this.echarts_fangwenlianghuanbi();
    // this.echarts_yumingshutongbi();
    // this.echarts_fangwenliangtongbi();
    // this.echarts_fanzhilv();
    // this.echarts_fanzhizltjyuming();
    // this.echarts_fanzhizltjfangwenl();
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  created() {
    this.getdata()
    this.yjzongltongji()
    this.yjzongltongji1()
    this.yujinghuanbitu()
    this.yujingtongbitu()
    this.shezhaip() // 涉诈网址被访问次数排行
    this.shezhaurl() // 源IP访问次数排行
    // this.shangchuanyangbentongjitu()

    //   this.echarts_yumingshuhuanbi();
    // // this.echarts_fangwenlianghuanbi();
    // // this.echarts_yumingshutongbi();
    // // this.echarts_fangwenliangtongbi();
    // this.echarts_fanzhilv();

    // this.echarts_fanzhizltjyuming();
    // this.echarts_fanzhizltjfangwenl();
  },
  mounted() {},
  methods: {
    // 涉诈网址被访问次数排行
    async shezhaip() {
      const { data: res } = await this.$http.get(
        '/warning_4g/fraudUrlVisitStatistic'
      )
      if (res.code == 200) {
        this.visits = res.data
        // console.log(res.data)
      }
    },
    // 源IP访问次数排行
    async shezhaurl() {
      const { data: res } = await this.$http.get(
        '/warning_4g/victimIpTop8Statistic'
      )
      if (res.code == 200) {
        this.visits1 = res.data
        // console.log(res.data)
      }
    },

    cssyangshi(index) {
      if (index == 0) {
        return 'list_bg'
      } else if (index == 1) {
        return 'list_bg1'
      } else if (index == 2) {
        return 'list_bg2'
      } else if (index >= 3) {
        return 'list_bg3'
      }
    },
    // 列表颜色斑马
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
    //成都城市名
    async getdata() {
      const { data: res } = await this.$http.get('/dept/queryDeptList')
      // console.log(res);
      if (res.code == 200) {
        this.newlist = res.data
        // this.newlist1.push(res.data);
        this.getIds(this.newlist)

        this.test1 = this.test
      }
    },
    hasChildrenAttr(obj) {
      if (obj.children != null) {
        this.getIds(obj.children)
        // console.log(this.test1)
      }
    },
    getIds(lists) {
      const that = this
      lists.forEach((list) => {
        var arr = []
        arr.push(list)
        this.test.push(
          arr.map((index) => {
            return {
              id: index.id,
              deptName: index.deptName,
            }
          })
        )

        that.hasChildrenAttr(arr[0])
      })
    },
    // __________________________________________________
    // 预警同比图
    tongbiyujing() {

if(this.tiaojianhuanbi.riqi1==""){
  this.$message('请选择日期')
}else{
           if (
        dayjs( this.white1.end1).diff(
            this.white1.start1 ,
          'day'
        ) > 14
      ) {
        this.$message('输入时间范围超出15天')
      }else{
  this.visiblet = false
      this.yujingtongbitu()
      }
}

    
      // if (this.tiaojianhuanbi.list1 == '年') {
      //   this.yujingtongbitu()
      // } else if (this.tiaojianhuanbi.list1 == '日期') {
      //   this.yujingshijiantongbi2123()
      //   // this.tableDatatong=[]
      //   // console.log(   this.tableDatatong);
      // } else if (this.tiaojianhuanbi.list1 == '') {
      //   this.yujingtongbitu()
      //   // this.tableDatatong=[]
      // }
    },
    // 预警同比图时间
    async yujingshijiantongbi2123() {
      let list = {
        startDate: this.white1.start1,
        endDate: this.white1.end1,
        fraudType: this.yujtb.one,
        earlyGrade: this.yujtb.two,
        userAddress: this.yujtb.three,
      }
      const { data: res } = await this.$http.post(
        '/warning/showEarlyByDate',
        list
      )
      if (res.code == 200) {
        console.log(res.data)
        this.tableDatatong = res.data
      }
    },

    //预警环比确定
    yujinghuanbiqueding() {
    
      this.yujinghuanbitu()
      // this.visible = false
  
    },
    //预警环比时间
    async yujingshijanhuanbi() {
      let list = {
        startDate: this.white.start,
        endDate: this.white.end,
        fraudType: this.yuj.one,
        earlyGrade: this.yuj.two,
        userAddress: this.yuj.three,
      }
      const { data: res } = await this.$http.post(
        '/warning/showRingRatioByDate',
        list
      )
      if (res.code == 200) {
        console.log(res.data)
        this.tableData = res.data
      }
    },
    //4G每日发现预警数据
    async yujinghuanbitu() {
      this.tbmonth = []
      this.tbgrowthRate = []
      this.tbyearOne = []
      this.tbgrowthRate1 = []
      this.yujdanqian = []
      this.yujighuanbishu = []
      // let list = {
      //   startYear: this.yuj.nianfen,
      //   // month: this.yuj.year,
      //   fraudType: this.yuj.one,
      //   earlyGrade: this.yuj.two,
      //   userAddress: this.yuj.three,
      //   // upYear: this.yuj.nianfen,
      //   // week: this.yuj.zhou,
      // }

      let list = {
        endTime: this.white.end,
        startTime: this.white.start,
      }
      // console.log(list)
      const { data: res } = await this.$http.post(
        '/warning_4g/statistic4GWarningNums',
        list
      )

      if (res.code == 200) {
        // console.log(res.data);
          this.visible = false
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            // console.log(res.data[i].month);
            this.tbmonth.push(res.data[i].statisticKey)
            // this.tbgrowthRate.push(res.data[i].growthRate)
            // this.tbyearOne.push(res.data[i].yearOne)
            this.yujdanqian.push(res.data[i].statisticValue)
            // this.yujighuanbishu.push(res.data[i].endTotal)
          }

          //  console.log(this.nummax);
          // let arrlist = this.yujdanqian
          // let arrlist1 = this.yujighuanbishu
          // let newarr = [...arrlist, ...arrlist1]
          // // console.log(newarr);
          // this.nummax = Math.max(...newarr)
          // this.nummax = this.ceilNumber3(this.nummax)
          // console.log(this.nummax );
          // console.log(newarr);
          // console.log(this.yujdanqian.push(...this.yujighuanbishu));

          // for (var i = 0; i < this.tbgrowthRate.length; i++) {
          //   this.tbgrowthRate1.push(this.tbgrowthRate[i].split('%')[0])
          // }
          // this.max = this.tbgrowthRate1;
          // console.log(  this.tbgrowthRate1);

          // for (var i = 0; i < this.tbgrowthRate1.length; i++) {
          //   if (this.max < this.tbgrowthRate1[i]) {
          //     this.max = this.tbgrowthRate1[i]
          //     this.max = this.ceilNumber1(this.max)
          //   }
          // }
          // this.min = Math.min(...this.tbgrowthRate1)
          // this.min = this.ceilNumber(this.min)

          //  console.log( this.max == 0 ? 5 : Math.ceil(parseInt(this.max) / 5));
          // console.log(this.max);
          // console.log(this.tbgrowthRate1);
          // console.log( this.tbmonth, this.tbgrowthRate,  this.tbyearOne);
        } else {
          this.tbmonth = []
          this.tbgrowthRate = []
          this.tbyearOne = []
          this.tbgrowthRate1 = []
          this.yujdanqian = []
          this.yujighuanbishu = []
          this.nummax = 0
          this.max = 0
          this.min = 0
          // this.$message("暂无数据");
        }
        this.tableData = res.data
        // console.log(res.data);
        this.$nextTick(function () {
          this.echarts_yumingshuhuanbi()
        })
      }
    },
err1(){
  //  
// if(  dayjs(    this.white.end).format("YYYY/MM/DD")==dayjs( this.white.start).format("YYYY/MM/DD"))   
// {
//   this.white.start= dayjs(
//           dayjs( this.white.start).subtract(1, 'day')
//             .$d
//         ).format('YYYY/MM/DD') +
//         '  ' +
//         '00:' +
//         '00:' +
//         '00'

// }

        // this.white.end= dayjs(
        //   dayjs( this.white.end).subtract(1, 'day')
        //     .$d
        // ).format('YYYY/MM/DD') +
        // '  ' +
        // '23:' +
        // '59:' +
        // '59';
        if(this.tiaojianhuanbi.riqi==""){
   this.$message('请选择日期')
        }else{
              if (
        dayjs(this.white.end).diff(
         this.white.start ,
          'day'
        ) > 14
      ) {
        this.$message('输入时间范围超出15天')
      } else{
  this.yujinghuanbitu()
  this.visible=false
      }
       
        }


},
    chongzhi1() {
    this.tiaojianhuanbi.riqi=null
      this.diserr1 = true
      setTimeout(() => {
        
        if (this.diserr1 == true) {

          this.visible = false
          this.white.end =
            this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
            ' ' +
            '23:' +
            '59:' +
            '59'
          ;(this.white.start =
            this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
            ' ' +
            '00:' +
            '00:' +
            '00'),
            this.yujinghuanbitu()
     
          this.diserr1 = false
        }
      }, 500)
    },
    //长安每日发现预警数据
    async yujingtongbitu() {
      this.tbmonthtb = []
      this.tbgrowthRatetb = []
      this.tbendTotaltb = []
      this.tbstartTotaltb = []
      this.tbgrowthRatetb1 = []
      let list = {
        endTime: this.white1.end1,
        startTime: this.white1.start1,
      }
      // console.log(list)
      const { data: res } = await this.$http.post(
        '/warning_ca/StatisticCAWarningNums',
        list
      )
      if (res.code == 200) {
        // console.log(res.data);
        if (res.data.length > 0) {
          // console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            // console.log(res.data[i].month);
            this.tbmonthtb.push(res.data[i].statisticKey)
            // this.tbgrowthRatetb.push(res.data[i].growthRate)
            // this.tbyearOnetb.push(res.data[i].yearOne);
            // this.tbendTotaltb.push(res.data[i].endTotal)
            this.tbstartTotaltb.push(res.data[i].statisticValue)
          }
          // console.log( this.tbendTotaltb,this.tbstartTotaltb);
          // let arrlist3 = this.tbendTotaltb
          // let arrlist4 = this.tbstartTotaltb
          // let arrlist5 = [...arrlist3, ...arrlist4]

          // this.nummax1 = Math.max(...arrlist5)
          // this.nummax1 = this.ceilNumber3(this.nummax1)
          // for (var i = 0; i < this.tbgrowthRatetb.length; i++) {
          //   this.tbgrowthRatetb1.push(this.tbgrowthRatetb[i].split('%')[0])
          // }
          // // this.max1 = this.tbgrowthRatetb1;

          // for (var i = 1; i < this.tbgrowthRatetb1.length; i++) {
          //   if (this.max1 < this.tbgrowthRatetb1[i]) {
          //     this.max1 = this.tbgrowthRatetb1[i]
          //     this.max1 = this.ceilNumber1(this.max1)
          //   }
          // }

          // this.min1 = Math.min(...this.tbgrowthRatetb1)
          // this.min1 = this.ceilNumber(this.min1)
          //  console.log( this.min1);

          // console.log(this.tbgrowthRate1);
          // console.log( this.tbmonth, this.tbgrowthRate,  this.tbyearOne);
        } else {
          this.tbmonthtb = []
          this.tbgrowthRatetb = []
          this.tbendTotaltb = []
          this.tbstartTotaltb = []
          this.tbgrowthRatetb1 = []
          this.min1 = 0
          this.max1 = 0
          this.nummax1 = 0
        }
        this.tableDatatong = res.data
        if (this.$refs.chart_yumingshutongbi123) {
          this.$nextTick(function () {
            this.echarts_yumingshutongbi()
          })
        }
      }
    },

    chongzhitb() {
      this.tiaojianhuanbi.riqi1=null
      this.diserr = true
      setTimeout(() => {

        if (this.diserr == true) {

          this.visiblet = false;

        this.white1.start1 =
            this.timerstart(dayjs().format('YYYY/MM/DD'), 16) +
            ' ' +
            '00:' +
            '00:' +
            '00';
            this.white1.end1 =
              this.timersend(dayjs().format('YYYY/MM/DD'), 1) +
              ' ' +
              '23:' +
              '59:' +
              '59';
          this.yujingtongbitu()
          this.diserr = false
        }
      }, 500)
    },
    //上传样本统计_______________________________________________________________________________
    // async shangchuanyangbentongjitu() {
    //   this.relation = []
    //   this.dep = []
    //   this.department = []
    //   let list = {
    //     endDate: this.whiteSearchListshangchaun.endCreateTimeshangchaun,
    //     startDate: this.whiteSearchListshangchaun.startCreateTimeshangchaun,
    //   }
    //   const { data: res } = await this.$http.post(
    //     '/statistics/getUploadDomainStatistic',
    //     list
    //   )
    //   if (res.code == 200) {
    //     const that = this
    //     console.log(res.data);

    //     for (var i = 0; i < res.data.length; i++) {
    //       that.test1.forEach((index) => {
    //         for (var j = 0; j < index.length; j++) {
    //           // console.log(res.data[i]);
    //           // console.log(that.test1[j][id]);
    //           // index.map(item=>{
    //           //   console.log(item);
    //           // })
    //           if (res.data[i].department == index[j].id) {
    //             //  debugger
    //             res.data[i].department = index[j].deptName
    //           }
    //         }
    //       })
    //     }

    //     for (var i = 0; i < res.data.length; i++) {
    //       this.relation.push(res.data[i].relation_count)
    //       this.dep.push(res.data[i].dep_count)
    //       this.department.push(res.data[i].department)
    //     }
    //   }

    //   this.$nextTick(function () {
    //     setTimeout(() => {
    //       this.tableDatatong2 = res.data
    //       this.echarts_fanzhilv()
    //     }, 500)
    //   })
    // },
    yangben() {
      this.visible3 = false
      this.shangchuanyangbentongjitu()
    },
    yangbenchongzhi() {
      this.shangchuan.riqi = ''
      ;(this.whiteSearchListshangchaun.endCreateTimeshangchaun =
        dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59'),
        (this.whiteSearchListshangchaun.startCreateTimeshangchaun =
          dayjs().format('YYYY') +
          '-' +
          dayjs().month(0).format('MM') +
          '-' +
          dayjs().date(1).format('DD') +
          ' ' +
          '00:' +
          '00:' +
          '00'),
        (this.visible3 = false)
      this.shangchuanyangbentongjitu()
    },
    //访问量区域比例
    async yjzongltongji() {
      const { data: res } = await this.$http.get(
        '/warning_4g/visitNumAreaScale'
      )
      if (res.code == 200) {
        this.yujingzongliangshuju = res.data
        this.yujingzongliangshuju = res.data.map((res, index) => {
          return {
            value: res.statisticValue,
            name: res.statisticKey,
            percent: res.statisticScale,
          }
        })

        // console.log(this.yujingzongliangshuju);
        this.yujingzongliangshuju.forEach((item) => {
          this.yujingzongliangshujutulie.push(item.name)
        })
        this.$nextTick(function () {
          this.echarts_fanzhizltjyuming1()
        })

        // console.log(res.data);
      }
    },
    //涉诈网址比例
    async yjzongltongji1() {
      const { data: res } = await this.$http.get(
        '/warning_4g/fraudUrlAreaScale'
      )
      if (res.code == 200) {
        // console.log(res.data)
        // this.yujingzongliangshuju = res.data;
        this.yujingzongliangshuju1 = res.data.map((res, index) => {
          return {
            value: res.statisticValue,
            name: res.statisticKey,
            percent: res.statisticScale,
          }
        })
        // console.log(this.yujingzongliangshuju1);
        // console.log(this.yujingzongliangshuju);
        this.yujingzongliangshuju1.forEach((item) => {
          this.yujingzongliangshujutulie1.push(item.name)
        })
        this.$nextTick(function () {
          this.echarts_fanzhizltjyuming()
        })

        // console.log(res.data);
      }
    },

    yujingzongliuang() {
      this.visible1 = false
      this.yjzongltongji()
    },

    yujinghuanbi(val) {
      if (val && val != '') {
        this.white.start = val[0]
        this.white.end = val[1]
      } else {
        this.white.start = null
        this.white.end = null
      }
    },
    yujinghuanbi1(val) {
      if (val && val != '') {
        this.white1.start1 = val[0]
        this.white1.end1 = val[1]
      } else {
        this.white1.start1 = null
        this.white1.end1 = null
      }
    },
    //头部切换域名数，域名访问量
    // title() {
    //   this.form.tlt = false
    //   this.form.tlt1 = true
    //   this.form.echartsqiehuan = false
    //   this.form.echartsqiehuan1 = true
    //   //加载echarts的代码

    //   // this.echarts_fangwenlianghuanbi();

    //   this.$nextTick(function () {
    //     this.echarts_yumingshutongbi()
    //   })
    // },
    // title1() {
    //   this.form.tlt = true
    //   this.form.tlt1 = false
    //   this.form.echartsqiehuan = true
    //   this.form.echartsqiehuan1 = false
    //   this.$nextTick(function () {
    //     this.echarts_yumingshuhuanbi()
    //   })

    // this.echarts_fangwenliangtongbi();
    // },
    // 4G每日发现日期数量

    echarts_yumingshuhuanbi() {
      var huanyms = this.$refs.chart_yumingshuhuanbi
      let myChart = this.$echarts.init(huanyms)
      myChart.clear()
      myChart.setOption(this.setOption())

      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },

    setOption() {
      let option = {
        // title: {
        //   x: 'center',
        //   top: '5px',
        //   show: true,
        //   // text: this.form.year + "年域名数环比增长",
        //   text: '预警环比图',
        //   textStyle: {
        //     fontFamily: 'Arial, Verdana',
        //     fontSize: 16,
        //     fontStyle: 'normal',
        //     fontWeight: 'normal',
        //     color: '#fff',
        //   },
        // },
        tooltip: {
          trigger: 'axis',
          formatter: function (val) {
               return val[0].name+'<br>'+"预警数据: "+val[0].value
            // return (

            // let list = []
            // let listitem = ''
            // // console.log(val)
            // for (var i = 0; i < val.length; i++) {
            //   if (val[i].data == 0) {
            //     if (val[i].seriesName == '上期数据') {
            //       for (var j = 0; j < val.length; j++) {
            //         if (val[j].seriesName == '增长率(%)') {
            //           val[j].data = '-'
            //         }
            //       }
            //     }
            //   }

              // if (val[1].data == 0) {
              //   val[2].data = "—";

              // }

              // console.log(val);
              //       val[0].data==0?val[0].data="0.0000":val[0].data;
              //  val[2].data==0?val[2].data="0.0000":val[2].data;
              // list.push(
              //   '<br>' +
              //     '<span width:70px; display:inline-block;>' +
              //     val[i].seriesName +
              //     ':' +
              //     ' ' +
              //     '</span>' +
              //     '<span>' +
              //     val[i].data +
              //     '</span>'
              // )
            // }

            // listitem = list.join('')
            // let listitem1 = listitem
            // console.log(listitem1);
            // return val[0].name + listitem1
            // )
          },
        },
        legend: {
          selectedMode: false,
          top: '10px',
          left: '10px',
          // data: ['本期数据', '上期数据', '增长率(%)'],
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
            data: this.tbmonth,
            axisLine: {
              interval: 0,
              rotate: 40,
              lineStyle: {
                color: '#fff',
                width: 1,
              },
            },
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
          // {
          //   type: 'value',
          //   name: '增长率(%)',
          //   nameTextStyle: {
          //     color: '#fff',
          //     padding: [0, 0, 0, 50], // 四个数字分别为上右下左与原位置距离
          //   },
          //   min: this.min == this.max ? 0 : this.min,

          //   max: parseInt(this.max),
          //   // max:-100,
          //   // interval:20,
          //   interval:
          //     this.max == 0
          //       ? 10
          //       : Math.ceil(
          //           Math.abs(this.max - (this.min == this.max ? 0 : this.min)) /
          //             10
          //         ),
          //   // interval:Math.ceil(parseInt(this.max) / 5),
          //   axisLabel: {
          //     formatter: '{value} ',
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: '#fff',
          //       width: 1,
          //     },
          //   },
          //   axisLabel: {
          //     textStyle: {
          //       color: '#94a3af',
          //     },
          //   },
          //   splitLine: {
          //     show: false,
          //   },
          //   //去除刻度线
          //   axisTick: {
          //     show: false,
          //   },
          //   //是否显示轴
          //   axisLine: {
          //     show: false, //y轴线消失
          //   },
          // },
        ],
        series: [
          {
            name: '每日数据',
            type: 'bar',
            barWidth: 10,
            data: this.yujdanqian,
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
          // {
          //   name: '上期数据',
          //   type: 'bar',
          //   barWidth: 10,
          //   data: this.yujighuanbishu,
          //   itemStyle: {
          //     normal: {
          //       //柱体的颜色
          //       //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
          //       color: new this.$echarts.graphic.LinearGradient(
          //         0,
          //         0,
          //         0,
          //         1,
          //         [
          //           {
          //             offset: 0,
          //             color: 'rgba(39,101,135,.5)',
          //           },
          //           {
          //             offset: 1,
          //             color: '#55c9f7',
          //           },
          //         ],
          //         false
          //       ),
          //       borderWidth: 1,
          //       borderColor: '#55c9f7',
          //     },
          //   },
          // },
          // {
          //   name: '增长率(%)',
          //   type: 'line',
          //   smooth: true,
          //   yAxisIndex: 1,
          //   data: this.tbgrowthRate1,
          //   color: '#49acff',
          //   symbol: 'circle',
          //   itemStyle: {
          //     color: '#49acff',
          //   },
          //   // markLine: {
          //   //   // symbol: ['none', 'none'],
          //   //   itemStyle: {
          //   //     normal: {
          //   //       lineStyle: {
          //   //         type: 'solid',
          //   //         color: 'red',
          //   //       },
          //   //       label: {
          //   //         show: false,
          //   //         position: 'middle',
          //   //       },
          //   //     },
          //   //   },
          //   //   data: [
          //   //     {
          //   //       yAxis: 0, //这里设置false是隐藏不了的，可以设置为-1
          //   //     },
          //   //   ],
          //   // },
          // },
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

    //底部echarts—— 域名数同比echarts
    echarts_yumingshutongbi() {
      var yumingtb = this.$refs.chart_yumingshutongbi123
      let myChart1 = this.$echarts.init(yumingtb)
      myChart1.clear()
      myChart1.setOption(this.setOptionyumingtb())
      window.addEventListener('resize', function () {
        myChart1.resize()
      })
    },
    setOptionyumingtb() {
      let option = {
        // title: {
        //   x: 'center',
        //   top: '5px',
        //   show: true,
        //   // text: this.form.year + "年域名数同比增长",
        //   text: '预警同比图',
        //   textStyle: {
        //     fontFamily: 'Arial, Verdana',
        //     fontSize: 16,
        //     fontStyle: 'normal',
        //     fontWeight: 'normal',
        //     color: '#fff',
        //   },
        // },
        tooltip: {
          trigger: 'axis',
          formatter: function (val) {
               return val[0].name+'<br>'+"预警数据: "+val[0].value
            // return (

            // let list = []
            // let listitem = ''
            // // console.log(val)
            // for (var i = 0; i < val.length; i++) {
            //   if (val[i].data == 0) {
            //     if (val[i].seriesName == '同期数据') {
            //       for (var j = 0; j < val.length; j++) {
            //         if (val[j].seriesName == '增长率(%)') {
            //           val[j].data = '-'
            //         }
            //       }
            //     }
            //   }

              // if (val[1].data == 0) {
              //   val[2].data = "—";

              // }

              // console.log(val);
              //       val[0].data==0?val[0].data="0.0000":val[0].data;
              //  val[2].data==0?val[2].data="0.0000":val[2].data;
            //   list.push(
            //     '<br>' +
            //       '<span width:70px; display:inline-block;>' +
            //       val[i].seriesName +
            //       ':' +
            //       ' ' +
            //       '</span>' +
            //       '<span>' +
            //       val[i].data +
            //       '</span>'
            //   )
            // }

            // listitem = list.join('')
            // let listitem1 = listitem
            // console.log(listitem1);
            // return val[0].name + listitem1
            // )
          },
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
            data: this.tbmonthtb,
            axisLine: {
              interval: 0,
              rotate: 40,
              lineStyle: {
                color: '#fff',
                width: 1,
              },
            },
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
            // min: 0,
            // max: this.nummax1,
            // interval: this.nummax1 == 0 ? 10 : Math.ceil(this.nummax1 / 10),
            axisLine: {
              lineStyle: {
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
          // {
          //   type: 'value',
          //   name: '增长率(%)',
          //   nameTextStyle: {
          //     color: '#fff',
          //     padding: [0, 0, 0, 50], // 四个数字分别为上右下左与原位置距离
          //   },
          //   min: this.min1 == this.max1 ? 0 : this.min1,
          //   max: this.max1,
          //   interval:
          //     this.max1 == 0
          //       ? 10
          //       : Math.ceil(
          //           Math.abs(
          //             this.max1 - (this.min1 == this.max1 ? 0 : this.min1)
          //           ) / 10
          //         ),
          //   axisLabel: {
          //     formatter: '{value} ',
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: '#fff',
          //       width: 1,
          //     },
          //   },
          //   axisLabel: {
          //     textStyle: {
          //       color: '#94a3af',
          //     },
          //   },
          //   splitLine: {
          //     show: false,
          //   },
          //   //去除刻度线
          //   axisTick: {
          //     show: false,
          //   },
          //   //是否显示轴
          //   axisLine: {
          //     show: false, //y轴线消失
          //   },
          // },
        ],
        series: [
          {
            name: '每日数据',
            type: 'bar',
            barWidth: 10,
            data: this.tbstartTotaltb,
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
                      color: 'rgba(39,101,135,.5)',
                    },
                    {
                      offset: 1,
                      color: '#50cffd',
                    },
                  ],
                  false
                ),
                borderWidth: 1,
                borderColor: '#36cbff',
              },
            },
          },
          // {
          //   name: '同期数据',
          //   type: 'bar',
          //   barWidth: 10,
          //   data: this.tbendTotaltb,
          //   itemStyle: {
          //     normal: {
          //       //柱体的颜色
          //       //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
          //       color: new this.$echarts.graphic.LinearGradient(
          //         0,
          //         0,
          //         0,
          //         1,
          //         [
          //           {
          //             offset: 0,
          //             color: 'rgba(96,98,72,.5)',
          //           },
          //           {
          //             offset: 1,
          //             color: '#f9cc68',
          //           },
          //         ],
          //         false
          //       ),
          //       borderWidth: 1,
          //       borderColor: '#fcd068',
          //     },
          //   },
          // },
          // {
          //   name: '增长率(%)',
          //   type: 'line',
          //   smooth: true,
          //   yAxisIndex: 1,
          //   data: this.tbgrowthRatetb1,
          //   color: '#34fcff',
          //   symbol: 'circle',
          //   itemStyle: {
          //     color: '#34fcff',
          //   },
          //   // markLine: {
          //   //   // symbol: ['none', 'none'],
          //   //   itemStyle: {
          //   //     normal: {
          //   //       lineStyle: {
          //   //         type: 'solid',
          //   //         color: 'red',
          //   //       },
          //   //       label: {
          //   //         show: false,
          //   //         position: 'middle',
          //   //       },
          //   //     },
          //   //   },
          //   //   data: [
          //   //     {
          //   //       yAxis: 0, //这里设置false是隐藏不了的，可以设置为-1
          //   //     },
          //   //   ],
          //   // },
          // },
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

    //统计预警模块——上传样本对比图
    // echarts_fanzhilv() {
    //   var fzlv = this.$refs.chart_fanzhiduibi
    //   let myChart2 = this.$echarts.init(fzlv)
    //   myChart2.setOption(this.setOptionfzl())
    //   window.addEventListener('resize', function () {
    //     myChart2.resize()
    //   })

    //   extension(myChart2)
    //   function extension(myChart2) {
    //     // 注意这里，是以X轴显示内容过长为例，如果是y轴的话，需要把params.componentType == 'xAxis'改为yAxis
    //     // 判断是否创建过div框,如果创建过就不再创建了
    //     // 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
    //     var elementDiv = document.getElementById('extension')
    //     if (!elementDiv) {
    //       var div = document.createElement('div')
    //       div.setAttribute('id', 'extension')
    //       div.style.display = 'block'
    //       document.querySelector('html').appendChild(div)
    //     }
    //     myChart2.on('mouseover', function (params) {
    //       if (params.componentType == 'xAxis') {
    //         var elementDiv = document.querySelector('#extension')
    //         //设置悬浮文本的位置以及样式
    //         var elementStyle =
    //           'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
    //         elementDiv.style.cssText = elementStyle
    //         elementDiv.innerHTML = params.value
    //         document.querySelector('html').onmousemove = function (event) {
    //           var elementDiv = document.querySelector('#extension')
    //           var xx = event.pageX - 10
    //           var yy = event.pageY + 15
    //           elementDiv.style.top = yy + 'px'
    //           elementDiv.style.left = xx + 'px'
    //         }
    //       }
    //     })
    //     myChart2.on('mouseout', function (params) {
    //       //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
    //       if (params.componentType == 'xAxis') {
    //         var elementDiv = document.querySelector('#extension')

    //         elementDiv.style.cssText = 'display:none'
    //       }
    //     })
    //   }
    // },

    // setOptionfzl() {
    //   let option = {
    //     //下载
    //     toolbox: {
    //       show: true,
    //       // feature: {
    //       //   mark: { show: true },
    //       //   saveAsImage: { show: true },
    //       // },
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     title: {
    //       x: 'center',
    //       top: '5px',
    //       show: true,
    //       text: '上传样本对比图',
    //       textStyle: {
    //         fontFamily: 'Arial, Verdana',
    //         fontSize: 16,
    //         fontStyle: 'normal',
    //         fontWeight: 'normal',
    //         color: '#fff',
    //       },
    //     },
    //     grid: {
    //       top: '25%',
    //       right: '11%',
    //       bottom: '15%',
    //     },
    //     color: ['#0abf53', '#03A9F4'], //绿色  橙色
    //     legend: {
    //       selectedMode: false,
    //       bottom: '0',
    //       x: 'center',
    //       //   orient: "horizontal", //xin  horizontal
    //       data: [
    //         {
    //           name: '二次发现数量',
    //           textStyle: {
    //             color: ['#0abf53'], //绿色
    //           },
    //         },
    //         {
    //           name: '上传样本数量',
    //           textStyle: {
    //             color: ['#03A9F4'],
    //           },
    //           //  ["处置域名数", "域名访问量"]
    //         },
    //       ],
    //     },
    //     xAxis: {
    //       type: 'category',

    //       // data:this.zhutest2,
    //       data: this.department,

    //       triggerEvent: true,

    //       axisLabel: {
    //         triggerEvent: true,
    //         formatter: function (value) {
    //           var val = ''
    //           if (value.length > 12) {
    //             val = value.substr(0,12) + '...'
    //             return val
    //           } else {
    //             return value
    //           }
    //         },

    //         interval: 0,
    //       },

    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',

    //         },
    //       },
    //        axisTick: {
    //         //x轴刻度相关设置
    //         alignWithLabel: true,
    //       },
    //     },
    //  dataZoom:[{
    //         type: "slider",
    //         // show:_this.zoomShow == true?true:false,
    //         show:true,
    //         xAxisIndex: 0,
    //         bottom: 25,
    //         // start:_this.zoomShow == true ? document.body.clientWidth < 1920 ? 40 : 60 : 100,
    //         start:document.body.clientWidth < 1920 ?20: 20,
    //         end: 0,
    //         height: '10',
    //         handleSize:'0px',
    //         handleStyle:{
    //             color: "#3AAAF0",
    //             borderColor: "#007acc",
    //         },
    //         fillerColor: 'rgba(27, 102, 177, 1)',
    //         backgroundColor: "rgba(4, 28, 52, 1)",
    //         showDetail:false,
    //         borderColor: '#002944',

    //     }],
    //     yAxis: {
    //       type: 'value',
    //       splitLine: {
    //         lineStyle: {
    //           color: ['#fff'],
    //         },
    //       },
    //       nameTextStyle: {
    //         color: ['#fff'],
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',
    //           width: 1,
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         data: this.relation,
    //         type: 'bar',
    //         color: '#0abf53',
    //         barWidth: 15,
    //         // stack: "one",
    //         name: '二次发现数量',
    //         animation: false,
    //       },
    //       {
    //         data: this.dep,
    //         type: 'bar',
    //         // stack: "one",
    //         barWidth: 15,
    //         name: '上传样本数量',
    //         color: '#03A9F4',
    //         animation: false,
    //       },
    //     ],
    //   }
    //   return option
    // },
    //统计预警模块——预警总量统计（域名数）
    echarts_fanzhizltjyuming() {
      var fzzlym = this.$refs.chart_fanzhizongliangym
      let myChart4 = this.$echarts.init(fzzlym)
      // myChart3.setOption(this.setOptionfzlzlym())
      window.addEventListener('resize', function () {
        myChart4.resize()
      })
   
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
          data: this.yujingzongliangshujutulie1,
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
            radius: ['60%', '61%'],
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
            radius: '50%',
            data: this.yujingzongliangshuju1,
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
                  fontSize: 16, //文字的字体大小
                },
                formatter: function (val) {
                return val.percent.toFixed(2)+'%'
                },
              },
            },
          },
        ],

        tooltip: {
          trigger: 'item',
           formatter:function (params) {
     
            if(params.seriesName!="TypeB"){
                  return params.name+':'+params.value
            }
          }
        },
      }
      myChart4.setOption(option3)
      // return option
    },
    echarts_fanzhizltjyuming1() {
      var fzzlym = this.$refs.chart_fanzhizongliangym1
      let myChart3 = this.$echarts.init(fzzlym)
      // myChart3.setOption(this.setOptionfzlzlym())
      window.addEventListener('resize', function () {
        myChart3.resize()
      })
     
      let option2 = {
      legend: {
          type: 'scroll', //分页类型
          orient: 'horizontal', //横向
          height: 80, // icon: 'circle',
          pageIconColor: '#ff781f', //翻页箭头颜色
          pageTextStyle: {
            color: '#fff', //翻页数字颜色
          }, //翻页数字设置
          pageIconSize: 12,
          data: this.yujingzongliangshujutulie,
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
            radius: ['60%', '61%'],
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
            radius: '50%',
            data: this.yujingzongliangshuju,
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
                  fontSize: 16, //文字的字体大小
                },
                formatter: function (val) {
                 return val.percent.toFixed(2)+'%'
                },
              },
            },
          },
        ],

        tooltip: {
          trigger: 'item',
          formatter:function (params) {
         
            if(params.seriesName!="TypeB"){
                  return params.name+':'+params.value
            }
          }
        },
      }
      myChart3.setOption(option2)
      // return option
    },
    // setOptionfzlzlym() {
    //   let option = {
    // title: {
    //   x: 'center',
    //   top: '5px',
    //   show: true,
    //   text: '预警总量统计',
    //   textStyle: {
    //     fontFamily: 'Arial, Verdana',
    //     fontSize: 16,
    //     fontStyle: 'normal',
    //     fontWeight: 'normal',
    //     color: '#fff',
    //   },
    // },
    // grid: {
    //   top: '20%',
    //   right: '11%',
    // },
    // tooltip: {
    //   trigger: 'item',
    // },
    // color: [
    //   '#91cc75',
    //   '#fac858',
    //   '#ee6666',
    //   '#73c0de',
    //   '#3ba272',
    //   '#fc8452',
    //   '#9a60b4',
    // ], //紫 浅绿
    // legend: {
    //   // orient: 'vertical',
    //   icon: "circle",
    //   textStyle: {
    //     color: "#fff", // 图例文字颜色
    //   },
    //   bottom: "0",
    //   x: "center",
    // },
    //     legend: {
    //       type: 'scroll', //分页类型
    //       orient: 'horizontal', //横向
    //       height: 80,
    //       // icon: 'circle',
    //       pageIconColor: '#ff781f', //翻页箭头颜色
    //       pageTextStyle: {
    //         color: '#fff', //翻页数字颜色
    //       }, //翻页数字设置
    //       pageIconSize: 13,
    //       data: this.yujingzongliangshujutulie,
    //       textStyle: {
    //         //图例文字的样式
    //         color: '#fff',
    //         fontSize: 12,
    //           padding: [3, 0, 0, 0]
    //       },
    //       itemHeight: 10,
    //       itemWidth: 10,
    //       bottom: '10',
    //       x: 'center',
    //       // x: 'center',
    //     },
    //     series: [
    //       {
    //         minAngle: 10,
    //         name: '类型',
    //         type: 'pie',
    //         radius: '65%',
    //         data: this.yujingzongliangshuju,
    //         label: {
    //           position: 'inner',
    //           fontSize: 10,
    //           color: '#000',
    //           formatter: function (params) {
    //             // console.log(params);
    //             // 假设此轴的 type 为 'time'。
    //             // return params.data.name + "\r\n" + params.data.value;
    //             return params.data.value
    //           },
    //         },
    //         emphasis: {
    //           itemStyle: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)',
    //           },
    //         },
    //       },
    //     ],
    //   }
    //   return option
    // },
    //统计预警模块——反制总量统计（域名访问量数）
    echarts_fanzhizltjfangwenl() {
      var fzzlfwl = this.$refs.chart_fanzhizongliangfw
      let myChart = this.$echarts.init(fzzlfwl)
      myChart.setOption(this.setOptionfzzlfwl())
      let self = this
      window.addEventListener('resize', () => {
        self.myChart.resize()
      })
    },
    setOptionfzzlfwl() {
      let option = {
        title: {
          x: 'center',
          top: '20px',
          show: true,
          text: '访问记录数据统计',
          textStyle: {
            fontFamily: 'Arial, Verdana',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#fff',
          },
        },
        grid: {
          top: '25%',
          right: '11%',
        },
        tooltip: {
          trigger: 'item',
        },
        color: ['#0abf53', '#fc8452', '#9a60b4', '#00a4e4', '#e4e932'], //紫 浅绿
        legend: {
          // orient: 'vertical',
          icon: 'circle',
          textStyle: {
            color: '#fff', // 图例文字颜色
          },
          bottom: '0',
          x: 'center',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' },
            ],
            label: {
              position: 'inner',
              fontSize: 10,
              color: '#000',
              formatter: function (params) {
                // 假设此轴的 type 为 'time'。
                return params.data.name + '\r\n' + params.data.value
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      return option
    },
    // selectchange() {
    //   if (this.shangchuan.list == "年") {
    //     this.nian = true;
    //     this.yue = false;
    //     this.riqi = false;
    //   }
    //   if (this.shangchuan.list == "月") {
    //     this.nian = true;
    //     this.yue = true;
    //     this.riqi = false;
    //   }
    //   if (this.shangchuan.list == "日期") {
    //     this.nian = false;
    //     this.yue = false;
    //     this.riqi = true;
    //   }
    // },
    selectchangehuanbi() {
      if (this.tiaojianhuanbi.list == '年') {
        this.yjnian = true
        this.yjriqi = false
        // this.yujinghuanbitu()
      } else if (this.tiaojianhuanbi.list == '日期') {
        this.yjnian = false

        this.yjriqi = true
        this.tableData = []
      }
    },
    selectchangehuanbi1() {
      if (this.tiaojianhuanbi.list1 == '年') {
        this.yjnian1 = true
        this.yjriqi1 = false
        // this.yujingtongbitu()
      } else if (this.tiaojianhuanbi.list1 == '日期') {
        this.yjnian1 = false
        this.yjriqi1 = true
        this.tableDatatong = []
      }
    },
    yujingtime(val) {
      if (val && val != '') {
        this.whiteSearchList.startCreateTime = val[0]
        this.whiteSearchList.endCreateTime = val[1]
      } else {
        this.whiteSearchList.startCreateTime = null
        this.whiteSearchList.endCreateTime = null
      }
    },
    fangwenjiltongjitime(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 = null
        this.whiteSearchList1.endCreateTime1 = null
      }
    },
    shangchuanyangben(val) {
      if (val && val != '') {
        this.whiteSearchListshangchaun.startCreateTimeshangchaun = val[0]
        this.whiteSearchListshangchaun.endCreateTimeshangchaun = val[1]
      } else {
        this.whiteSearchListshangchaun.startCreateTimeshangchaun = null
        this.whiteSearchListshangchaun.endCreateTimeshangchaun = null
      }
    },
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
@import '../common/font.css';
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
  margin-top: 1%;
  //   border: 1px solid red;
}
.echarts1 {
  width: 100%;
  height: 48%;
  //   border: 1px solid red;
  //   margin-right: 10px;
}
.echarts2 {
  width: 100%;
  height: 48%;
  // border: 1px solid red;
}
.echartsbig {
  float: left;
  width: 50%;
  height: 100%;
}
.echarts3 {
  float: left;
  width: 24%;
  height: 95%;
  //   border: 1px solid red;
  box-sizing: border-box;
  margin-left: 1%;
  // padding-top:50px;
}
.echartsright {
  float: left;
  width: 24%;
  height: 95%;
  //   border: 1px solid red;
  box-sizing: border-box;
  margin-left: 1%;
  // padding-top:50px;
}
.echarts3_top {
  width: 100%;
  height: 50%;
  //   border: 1px solid blue;
  position: relative;
  background: url(../assets/img/tongji/环形背景框.png) no-repeat;
  background-size: 100% 100%;
}
.echarts4_top {
  width: 100%;
  height: 50%;
  //   border: 1px solid blue;
  position: relative;
  background: url(../assets/img/tongji/环形背景框1.png) no-repeat;
  background-size: 100% 100%;
}
.tiaojian {
  position: absolute;
  right: 1%;
  top: 12%;
}
.echarts3_bottom {
  width: 100%;
  height: 50%;
  position: relative;
  //   border: 1px solid blue;
}
.tiaojian1 {
  position: absolute;
  left: 0;
  top: 13px;
}
.echartsleft {
  float: left;
  width: 99%;
  height: 100%;
  //   border: 1px solid red;
  box-sizing: border-box;
  margin-right: 10px;
  background: url(../assets/img/tongji/背景框.png) no-repeat;
  background-size: 100% 100%;
}
// .echartsright {
//   float: left;
//   width: 49%;
//   height: 100%;
//   //   border: 1px solid red;
//   box-sizing: border-box;
// }
.eleft {
  width: 100%;
  height: 100%;
  //   border: 1px solid blue;
  // margin-bottom: 10px;
  position: relative;
  float: left;
}
.table_list {
  width: 31%;
  float: left;
  height: 100%;
  padding: 10px;
  // overflow-y: scroll;
}
//图上显示查询
.ymer {
  position: absolute;
  top: 10px;
  right: 40px;
  width: 100px;
  height: 30px;
  // border: 1px solid #fff;
}
// .eright {
//   width: 100%;
//   height: 60%;
//   //   border: 1px solid blue;
//   margin-bottom: 10px;
// }
.echarts2_fanzhi {
  position: relative;
  width: 100%;
  height: 60%;
  //   border: 1px solid blue;
  margin-bottom: 10px;
}
.el-table::before {
  height: 0px;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
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
  .wenzi3 {
    position: absolute;
    width: 60%;
    height: 30px;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    // letter-spacing: 2px;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 30px;
    text-align: right;
    // text-shadow: 0px 1px 2px #fff
  }
}
.elebom {
  width: 100%;
  height: 91%;
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

.list_bg {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #fb7589;
  font-weight: 700;
}
.list_bg1 {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #dbbb69;
  font-weight: 700;
}

.list_bg2 {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #639cd7;
  font-weight: 700;
}
.list_bg3 {
  float: left;
  width: 8%;
  height: 100%;
  text-align: center;
  color: #00a0d3;
  font-weight: 700;
}
.list_one1 {
  width: 100%;
  height: 20px;
  padding: 0% 2% 0 9%;
  box-sizing: border-box;
  // margin-top: 1%;
  line-height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.yuanIP_num {
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.yuanIP_numson {
  flex: 1;
  position: relative;
}
.list_img {
  float: left;
  width: 5%;
  height: 100%;
  background: url(../assets/img/taishiimg/装饰.png) 100% 100% no-repeat;
  background-size: cover;
  // background-position: 0 0;
  margin-left: 2%;
  // margin-top: -3px;
}
.list_title {
  margin-left: 1%;
  float: left;
  display: inline-block;
  width: 60%;
  height: 100%;
  color: #fff;
  letter-spacing: 2px;
  font-family: 'siyuanheitinormal1';
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // font-family: "heiti";
}
.list_num {
  font-family: 'siyuanheitinormal1';
  float: left;
  display: inline-block;
  width: 21%;
  height: 100%;
  text-align: right;
  color: #59d0f4;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>