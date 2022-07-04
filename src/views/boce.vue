<template>
  <div class="right_main_under">
    <Navlist></Navlist>
    <!-- <div class="title_top">查询条件</div> -->
    <div class="search_select_form bg">
      <template>
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <!-- 处置时间 -->
          <el-form-item label="处置时间">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_find"
              type="daterange"
              :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 数据来源 -->
          <el-form-item label="诈骗类型">
            <el-select
              class="el-input-width changdu"
              v-model="newdomainSimpleVo.sourceType"
              placeholder="诈骗类型"
              clearable
              @clear="sourceType_clearFun(newdomainSimpleVo.sourceType)"
            >
              <el-option
                v-for="item in selectData.sourceTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 诈骗类型 -->
          <el-form-item label="验证状态">
            <el-select
              class="el-input-width"
              v-model="newdomainSimpleVo.state"
              placeholder="验证状态"
              clearable
              @clear="state_clearFun(newdomainSimpleVo.state)"
            >
              <el-option
                v-for="item in selectData.state"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              class="el-button-chaxun"
              type="primary"
              size="mini"
              @click.native="search"
              >查询</el-button
            >
            <el-button
              class="el-button-chongzhi"
              type="primary"
              size="mini"
              @click.native="resetFun"
              >重置</el-button
            >
            <el-button
              class="el-button-daochu"
              type="primary"
              size="mini"
              @click.native="newput"
              :loading="loadingbut"
              :disabled="this.tableData.length == 0"
              >{{ loadingbuttext }}</el-button
            >
            <!-- :loading="isLoading" -->

            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>

    <el-table
      :row-class-name="tableRowClassName"
        :row-key="getRowKeys"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      height="calc(100% - 18%)"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"    :reserve-selection="true"></el-table-column>
      <el-table-column prop="id" label="ID" v-if="loadshow"> </el-table-column>
      <el-table-column prop="handletime" label="处置时间"> </el-table-column>
      <el-table-column prop="url" label="URL" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="type" label="诈骗类型" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="dialingTime" label="最后一次验证时间">
      </el-table-column>
      <el-table-column prop="completeTotal" label="检测次数(次)">
      </el-table-column>
      <el-table-column prop="bcState" label="验证状态">
        <template slot-scope="scope">
          <span :style="{ color: netcolor(scope.row.bcState),fontWeight:'700' }">
            {{ scope.row.bcState }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="add(scope.row.url)"
            >查看详情</el-button
          >
          <el-button type="text" size="mini" @click="lishi(scope.row.url)"
            >查看历史</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页 -->
    <div class="bottom">
      <div class="ss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="mypageable.pageNum"
          :page-sizes="[15, 30, 45]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>

    <!-- <div class="title_top">查询结果</div> -->

    <!-- 111111111111111111111111111111111111 -->
    <el-dialog
      title="结果概览"
      :visible.sync="dialog"
      width="90%"
      top="4vh"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="gailan">
        <h3>概览信息</h3>
        <div class="gailanson">
          <span
            >URL:&nbsp;&nbsp;
            <span class="ziti" :title="this.gailan.url">{{this.gailan.url.length>30?  this.gailan.url.slice(0,30)+'...':   this.gailan.url }}</span></span
          >
          <span
            >诈骗类型:&nbsp;&nbsp;
            <span class="ziti">{{ zP(this.gailan.type) }}</span></span
          >
          <span
            >客户端总数：&nbsp;&nbsp;
            <span class="ziti">{{ this.gailan.kehuduan }}</span></span
          >
          <span
            >验证次数：&nbsp;&nbsp;
            <span class="ziti">{{ this.gailan.boceci }}</span></span
          >
        </div>
        <h3>验证URL详情查看</h3>
        <el-form
          :inline="true"
          class="demo-form-inline search_select_form"
          size="mini"
        >
          <!-- 处置时间 -->
          <el-form-item label="验证时间">
            <el-date-picker
              v-model="tcboctime"
              type="daterange"
              :change="timechange(tcboctime)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
            <el-button
              class="el-button-chaxun"
              type="primary"
              size="mini"
              style="margin-left: 20px"
              @click="confirm"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 20px"
              class="el-button-chongzhi"
              @click="conerr"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- //柱状 -->
        <div class="zhuzhuang">
          <div class="zhuzhuang1">
            <div
              id="bar_qx"
              ref="chart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
        <el-button
          class="el-button-daochu"
          type="primary"
          size="mini"
          style="float: right; margin-bottom: 10px"
          @click="gailanxiazai"
          :loading="loadingbut"
          :disabled="this.tableData1.length == 0"
          >{{ loadingbuttext1 }}</el-button
        >
        <!-- //列表 -->
        <el-table
          :row-class-name="tableRowClassName"
          ref="multipleTable"
          :data="tableData1"
          style="width: 100%"
          max-height="600px"
          size="mini"
          class="tableStyle"
        >
          <el-table-column prop="clientId" label="客户端ID"> </el-table-column>
          <el-table-column prop="url" label="URL" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="ip" label="客户端IP"> </el-table-column>
          <!-- <el-table-column prop="contry" label="国家"> </el-table-column> -->
          <el-table-column prop="city" label="城市"> </el-table-column>
          <el-table-column prop="probeTime" label="验证时间"> </el-table-column>
          <el-table-column prop="statusCode" label="状态码"> </el-table-column>
          <el-table-column prop="ifVisit" label="是否可以访问">
          </el-table-column>
        </el-table>
        <!-- //分页 -->
        <div class="bottom1">
          <div class="ss1">
            <!-- @size-change="handleSizeChange1" -->
            <el-pagination
              @current-change="handleCurrentChange1"
              :current-page.sync="mypageable1.pageNum1"
              :page-size="mypageable1.pageSize1"
              layout="total, prev, pager, next"
              :total="total1"
              class="pagePagination"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- //历史弹窗 -->
    <el-dialog
      title="验证历史"
      :visible.sync="dialoglishi"
      width="90%"
      top="4vh"
      :before-close="handleClose2"
      class="dialogInfo"
      :close-on-click-modal="false"
      v-loading="loadinglishi"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- top="4vh" -->
      <div class="gailan1">
        <h3>概览信息</h3>
        <div class="gailanson1">
          <span
            >URL:&nbsp;&nbsp;
            <span class="ziti" :title="this.gailanlishi.url">{{ this.gailanlishi.url.length>30?  this.gailanlishi.url.slice(0,30)+'...':   this.gailanlishi.url}}</span></span
          >
          <span
            >诈骗类型:&nbsp;&nbsp;
            <span class="ziti">{{ zP(this.gailanlishi.type) }}</span></span
          >
        </div>
        <h3>验证URL历史查看</h3>
        <el-table
          :row-class-name="tableRowClassName"
          ref="multipleTable"
          :data="tableData2"
          style="width: 100%"
          size="mini"
          class="tableStyle"
        >
          <!-- max-height="400px" -->
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column prop="state" label="状态"> </el-table-column>
          <el-table-column prop="handleTime" label="处置批次">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import dayjs from 'dayjs'
export default {
  name: 'boce',
  data() {
    return {
      flagstates: false,
      loadshow: false,
      loadingbut: false,
      loadingbuttext: '导出',
      loadingbuttext1: '导出',
      url: '',
      urllishi: '',
      loading: false,
      loadinglishi: false,
      dialog: false,
      dialoglishi: false,
      mypageable: {
        pageNum: 1,
        pageSize: 15,
      },
      //弹窗拨测时间
      tcboctime: '',
      whiteSearchList1: {
        startCreateTime1: '',
        endCreateTime1: '',
      },
      whiteSearchList3: {
        startCreateTime3: '',
        endCreateTime3: '',
      },
      total: 1,
      totalPages: '',
      whiteSearchList: {
        startCreateTime:    dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime:   dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },
      newdomainSimpleVo: {
        dateValue_find: [
           dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
            ' ' +
            '00:' +
            '00:' +
            '00',
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
        ], //处置时间
        sourceType: null, //域名类型
        state: null, //处置状态
      },
      selectData: {
        sourceTypeData: [
          { value: 'DK', label: '贷款' },
          { value: 'SD', label: '刷单' },
          { value: 'GJF', label: '仿冒公检法' },
          { value: 'QT', label: '其他类型诈骗' },
          { value: 'KF', label: '网络购物' },
          { value: 'JJGW', label: '冒充军警购物诈骗' },
          { value: 'SZP', label: '杀猪盘' },
          { value: 'DS', label: '虚假购物/服务类' },
          { value: 'JY', label: '网络婚恋/交友类' },
          { value: 'ZX', label: '虚假征信类' },
          { value: 'MC', label: '冒充领导/熟人类' },
          { value: 'YX', label: '网络游戏产品虚假交易类' },
          { value: 'APP', label: '分发平台' },
          { value: 'XZYM', label: '下载页面' },
        ],

        state: [
          { value: 0, label: '验证中' },
          { value: 1, label: '已验证' },
          { value: 2, label: '已失效' },
        ],
      },
      tableData: [],
      gailan: {
        url: '',
        type: '',
        kehuduan: '',
        boceci: '',
      },
      gailanlishi: {
        url: '',
        type: '',
      },
      tableData1: [
        // {
        //   clientId: 12, //       客户端id
        //   url: "www.baidu.com", //      url
        //   downloadTime: "1200", //  总下载时间
        //   connectTime: "2021-8-12", // 首次建联时间
        //   probeTime: "2021-8-12", //  拨测时间
        //   statusCode: "200", //   状态码
        //   ip: 2, //        客户端IP
        //   city: "简阳市", //         城市
        //   country: "中国", //        国家
        //   num: 20, //      可以访问次数
        //   notNum: 5, //  不能访问次数
        //   probeTime: "2021-08-12 12:36:00", //   拨测日期
        // },
      ],
      tableData2: [],
      mypageable1: {
        pageNum1: 1,
        pageSize1: 5,
      },
      total1: 1,
      totalPages1: '',
      textnum: [],
      probeTime: [],
      textnotNum: [],
      urlxiangqing: '',
      //列表选择
      tableDatalist: [],
    }
  },
  mounted() {},
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },

  created() {
    // this.boceclist()
  },

  methods: {
    //柱状
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart
      let myChart = this.$echarts.init(bar_qx)
      myChart.setOption(this.setOption())
    },
    //柱状
    setOption() {
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
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          // x:'center',
          // text: "反制数据统计(按类型)", //xin
          // textStyle: {
          //   //xin
          //   fontSize: 20,
          //   color: "#fff", //xin
          // },
          animation: false,
        },
        grid: {
          top: '20%',
          left: '5%',
          right: '3%',
          bottom: '25%',
        },
        // color: ['#2a9df3', '#f3a22a'], //绿色  橙色
        legend: {
          right: '10%', //xin
          orient: 'horizontal', //xin  horizontal
          data: [
            {
              name: '可以访问次数',
              textStyle: {
                color: ['#fff'],
              },
            },
            {
              name: '无法访问次数',
              textStyle: {
                color: ['#fff'],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        xAxis: {
          type: 'category',
          // data:this.zhutest2,
          data: this.probeTime,

          axisLabel: {
            // rotate: -30,
            //  让x轴文字方向为竖向
            interval: 0,
          },

          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
            //修改x轴文字
            textStyle: {
              color: '#fff',
            },
          },

          axisLine: {
            lineStyle: {
              color: '#2b657b',
              width: 2,
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#2b657b',
                width: 1,
              },
            },
            axisTick: { show: false },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#293d47',
              },
            },

            axisLabel: {
              textStyle: {
                color: '#2b657b',
              },
            },
          },
        ],
        series: [
          {
            data: this.textnum,
            type: 'bar',
            // color: 'red',

            barWidth: 15,
            stack: 'one',
            name: '可以访问次数',
            animation: false,
            itemStyle: {
              normal: {
                //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#47bdbd',
                  },
                  {
                    offset: 1,
                    color: '#05e0fd',
                  },
                ]),
              },
            },
          },
          {
            data: this.textnotNum,
            type: 'bar',
            stack: 'one',
            barWidth: 15,
            name: '无法访问次数',
            // color: 'blue',
            animation: false,
            itemStyle: {
              normal: {
                //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#f9cf90',
                  },
                  {
                    offset: 1,
                    color: '#f3a22a',
                  },
                ]),
              },
            },
          },
        ],
      }
      this.loading = false
      return option
    },

    //拨测详情初始化list
    async boceclist() {
      let bcListVo = {
        bcState: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.sourceType,
        startCreateTime: this.whiteSearchList.startCreateTime,
        endCreateTime: this.whiteSearchList.endCreateTime,
        mypageable: {
          pageNum: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
        },
      }

      const { data: res } = await this.$http.post('/updateBcTesList', bcListVo)
      // console.log(res);
      if (res.code == 200) {
        this.tableData = res.data.content
        this.total = res.data.totalElements
        this.totalPages = res.data.totalPages
      }
    },
    //查讯
    search() {
      this.mypageable.pageNum = 1
      this.boceclist()
    },
    newput() {
      if (this.tableDatalist.length == 0) {
        this.$confirm(
          '您可以对数据进行勾选下载，若要下载全部验证数据点击确定?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(async () => {
            this.download()
          })
          .catch(() => {
            this.$message('已取消')
          })
      } else {
        this.download()
      }
    },
    //下载
    async download() {
      let arr = []
      this.tableDatalist.forEach((item) => {
        console.log(item)
        arr.push(item.id)
      })
      this.loadingbuttext = '...加载中'
      this.loadingbut = true
      const bcListVo = {
        bcState: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.sourceType,
        startCreateTime: this.whiteSearchList.startCreateTime,
        endCreateTime: this.whiteSearchList.endCreateTime,
        idList: arr,
      }
      const { data: res } = await this.$http.post(
        '/downloadBcTestList',
        bcListVo
      )
      if (res.code == 200) {
        this.loadingbuttext = '导出'
        this.loadingbut = false
        let url = res.expandData.url
        let eleLink = document.createElement('a')
        eleLink.download = name
        eleLink.href = url
        eleLink.click()
        eleLink.remove()
        this.$refs.multipleTable.clearSelection()
      }
    },
    //查看
    add(val) {
      this.url = val
      this.loading = true
      this.dialog = true
      this.mypageable1.pageNum1 = 1
          this.whiteSearchList1.startCreateTime1 = ''
      this.whiteSearchList1.endCreateTime1 = ''
      this.whiteSearchList3.startCreateTime3 = ''
      this.whiteSearchList3.endCreateTime3 = ''
    
      this.tcboctime = null
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []

      this.gaikuang()
      // this.bocexiangqing();
      // this.$nextTick(() => {
      //   this.drawLine();
      // });
    },
    //跳转过来显示详情弹窗
    // getPath() {
    //   let loca = location.href;
    //   if (loca.indexOf("mallCode") != -1) {
    //     const routerParams = this.$route.query.mallCode;
    //     this.url = routerParams;
    //     this.loading = true;
    //     this.dialog = true;
    //     this.gaikuang();
    //   }
    //  if (loca.indexOf("netlishi") != -1) {
    //   const routerlishi = this.$route.query.netlishi;
    //   this.urllishi = routerlishi;
    //   this.loadinglishi = true;
    //   this.dialoglishi = true;
    //   this.gaikuanglishi();
    // }
    // },

    //历史
    lishi(val) {
      this.urllishi = val
      // console.log(this.urllishi);
      this.loadinglishi = true
      this.dialoglishi = true
      this.gaikuanglishi()
    },
    //重置
    resetFun() {
      this.newdomainSimpleVo = {
        dateValue_find: null, //处置时间
        sourceType: null, //域名类型
        state: null, //处置状态
      }
      this.newdomainSimpleVo.state = ''
      this.newdomainSimpleVo.sourceType = ''
      this.whiteSearchList.startCreateTime = null
      this.whiteSearchList.endCreateTime = null
      this.mypageable.pageNum = 1
      this.mypageable.pageSize = 15
      this.boceclist()
    },
    // =======================
    //弹窗概况
    async gaikuang() {
      this.bocexiangqing()
      const { data: res } = await this.$http.get('/getBcTestByUrl', {
        params: { url: this.url },
      })
      if (res.code == 200) {
        this.gailan.url = res.data.url
        this.gailan.type = res.data.type
        this.gailan.kehuduan = res.data.clientTotal
        this.gailan.boceci = res.data.completeTotal
      }
    },
    //历史弹窗概况
    async gaikuanglishi() {
      this.bclishi()
      const { data: res } = await this.$http.get('/getBcTestByUrl', {
        params: { url: this.urllishi },
      })
      if (res.code == 200) {
        this.gailanlishi.url = res.data.url
        this.gailanlishi.type = res.data.type
        console.log(res.data.type)
      }
    },
    //拨测历史
    async bclishi() {
      const { data: res } = await this.$http.get('/getBcHistoryByUrl', {
        params: { url: this.urllishi },
      })
      console.log(res)
      if (res.code == 200) {
        this.loadinglishi = false
        this.tableData2 = res.data
      }
    },
    //查看拨测详情列表
    async bocexiangqing() {
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []
      let bcTestVo = {
        url: this.url,
        startCreateTime: this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.whiteSearchList1.endCreateTime1,
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
      }
      const { data: res } = await this.$http.post('/getBcTestEntity', bcTestVo)
      if (res.code == 200) {
        this.flagstates = true
        this.tableData1 = res.data.page.content
        this.total1 = res.data.page.totalElements
        this.totalPages1 = res.data.page.totalPages
        res.data.list.forEach((item) => {
          this.textnum.push(item.num)
          this.probeTime.push(item.probeTime)
          this.textnotNum.push(item.notNum)
        })

        this.$nextTick(() => {
          this.drawLine()
        })
        // this.loading = false
      } else {
        this.flagstates = true
        this.$message('无数据')
        this.loading = false
      }
    },

    async bocexiangqing1() {
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []
      let bcTestVo = {
        url: this.url,
        startCreateTime: this.flagstates
          ? this.whiteSearchList3.startCreateTime3
          : this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.flagstates
          ? this.whiteSearchList3.endCreateTime3
          : this.whiteSearchList1.endCreateTime1,
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
      }
      const { data: res } = await this.$http.post('/getBcTestEntity', bcTestVo)
      if (res.code == 200) {
        this.tableData1 = res.data.page.content
        this.total1 = res.data.page.totalElements
        this.totalPages1 = res.data.page.totalPages
        // res.data.list.forEach((item) => {
        //   this.textnum.push(item.num)
        //   this.probeTime.push(item.probeTime)
        //   this.textnotNum.push(item.notNum)
        // })

        // this.$nextTick(() => {
        //   this.drawLine()
        // })
        // this.loading = false
      } else {
        this.$message('无数据')
        this.loading = false
      }
    },
    async gailanxiazai() {
      this.loadingbuttext1 = '...加载中'
      this.loadingbut = true
      const bcTestVo = {
        url: this.url,
        startCreateTime: this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.whiteSearchList1.endCreateTime1,
      }
      const { data: res } = await this.$http.post(
        '/downloadBcStatistics',
        bcTestVo
      )
      if (res.code == 200) {
        this.loadingbuttext1 = '导出'
        this.loadingbut = false
        let url = res.expandData.url
        let eleLink = document.createElement('a')
        eleLink.download = name
        eleLink.href = url
        eleLink.click()
        eleLink.remove()
      }
    },
    //确认
    async confirm() {
      if (this.tcboctime == '') {
        this.$message('请选择时间')
      } else {
        this.textnum = []
        this.probeTime = []
        this.textnotNum = []
        this.mypageable1.pageNum1 = 1
        this.whiteSearchList3.startCreateTime3 =
          this.whiteSearchList1.startCreateTime1
        this.whiteSearchList3.endCreateTime3 =
          this.whiteSearchList1.endCreateTime1
        let bcTestVo = {
          url: this.url,
          startCreateTime: this.whiteSearchList1.startCreateTime1,
          endCreateTime: this.whiteSearchList1.endCreateTime1,
          mypageable: {
            pageNum: this.mypageable1.pageNum1,
            pageSize: this.mypageable1.pageSize1,
          },
        }
        const { data: res } = await this.$http.post(
          '/getBcTestEntity',
          bcTestVo
        )
        if (res.code == 200) {
          this.tableData1 = res.data.page.content
          this.total1 = res.data.page.totalElements
          this.totalPages1 = res.data.page.totalPages
          res.data.list.forEach((item) => {
            this.textnum.push(item.num)
            this.probeTime.push(item.probeTime)
            this.textnotNum.push(item.notNum)
          })

          this.$nextTick(() => {
            this.drawLine()
          })
          this.loading = false
        } else {
          this.$message('无数据')
          this.loading = false
        }
      }
    },
    //重置
    async conerr() {
      this.flagstates = true
      this.whiteSearchList1.startCreateTime1 = ''
      this.whiteSearchList1.endCreateTime1 = ''
      this.whiteSearchList3.startCreateTime3 = ''
      this.whiteSearchList3.endCreateTime3 = ''
      this.mypageable1.pageNum1 = 1
      this.tcboctime = null
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []
      let bcTestVo = {
        url: this.url,
        startCreateTime: this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.whiteSearchList1.endCreateTime1,
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
      }
      const { data: res } = await this.$http.post('/getBcTestEntity', bcTestVo)
      if (res.code == 200) {
        this.tableData1 = res.data.page.content
        this.total1 = res.data.page.totalElements
        this.totalPages1 = res.data.page.totalPages
        res.data.list.forEach((item) => {
          this.textnum.push(item.num)
          this.probeTime.push(item.probeTime)
          this.textnotNum.push(item.notNum)
        })

        this.$nextTick(() => {
          this.drawLine()
        })
      } else {
        this.$message('无数据')
        this.loading = false
      }
    },
    dataCreate_change(val) {
      if (val && val != '') {
        this.whiteSearchList.startCreateTime = val[0]
        this.whiteSearchList.endCreateTime = val[1]
      } else {
        this.whiteSearchList.startCreateTime = null
        this.whiteSearchList.endCreateTime = null
      }
    },
    timechange(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 = null
        this.whiteSearchList1.endCreateTime1 = null
      }
    },
    state_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.state = null
      }
    },
    sourceType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.sourceType = null
      }
    },
    handleSizeChange(val) {
      // console.log(val);

      this.mypageable.pageSize = val

      // this.mypageable.pageNum=1

      // console.log(this.mypageable.pageNum)
      this.boceclist()

      //   this.getTabData();
    },
    handleCurrentChange(val) {
      //currentPage 改变时会触发
      // console.log(val);

      this.mypageable.pageNum = val

      this.boceclist()
      //   this.getTableData();
    },
    handleSelectionChange(val) {
      this.tableDatalist = val
      // console.log(     this.tableDatalist);
    },
    handleClose1() {
      this.dialog = false
      this.tcboctime = ''
      // this.conerr()
    },
    handleClose2() {
      this.dialoglishi = false
    },
    handleCurrentChange1(val) {
      // 使用
      //  this.debounce(function() {
      this.mypageable1.pageNum1 = val

      this.bocexiangqing1()
    },
    // }, 1000);
    // setTimeout(() => {

    // }, 500)

    // },
    //    debounce(func, delay) {
    //   let timeout;
    //   return function() {
    //     let context = this; // 指向全局
    //     let args = arguments;
    //     if (timeout) {
    //       clearTimeout(timeout);
    //     }
    //     timeout = setTimeout(() => {
    //       func.apply(context, args); // context.func(args)
    //     }, delay);
    //   };
    // },
    netcolor(val) {
      if (val == "验证中") {
        return '#4f97e2'
      } else if (val == "已验证") {
        return '#fdc047'
      } else if (val == "已失效") {
        return '#f37b78'
      }
    },
    // 拨测查看小写
    zP(val) {
      if (val == 'dk') {
        return '贷款'
      } else if (val == 'sd') {
        return '刷单'
      } else if (val == 'gjf') {
        return '仿冒公检法'
      } else if (val == 'gw') {
        return '网络购物'
      } else if (val == 'qt') {
        return '其他类型诈骗'
      } else if (val == 'kf') {
        return '网络购物'
      } else if (val == 'jjgw') {
        return '冒充军警购物诈骗'
      } else if (val == 'szp') {
        return '杀猪盘'
      } else if (val == 'ds') {
        return '虚假购物/服务类'
      } else if (val == 'jy') {
        return '网络婚恋/交友类'
      } else if (val == 'zx') {
        return '虚假征信类'
      } else if (val == 'mc') {
        return '冒充领导/熟人类'
      } else if (val == 'yx') {
        return '网络游戏产品虚假交易类'
      } else if (val == 'app') {
        return '分发平台'
      } else if (val == 'xzym') {
        return '下载页面'
      } else if (val == 'LC') {
        return '杀猪盘'
      }
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
       getRowKeys(row) {
      return row.id
    },
  },
}
</script>

<style  scoped lang='less'>
@import '../common/font.css';
// 按钮hover
.right_main_under /deep/ .el-button-chaxun:focus,
.right_main_under /deep/ .el-button-chaxun:hover {
  background: url(../assets/img/shouye/查询按钮.png) no-repeat;
  background-size: 100% 100%;
}
.right_main_under /deep/ .el-button-chongzhi:focus,
.right_main_under /deep/ .el-button-chongzhi:hover {
  background: url(../assets/img/shouye/重置按钮.png) no-repeat;
  background-size: 100% 100%;
}
.right_main_under /deep/ .el-button-daochu:focus,
.right_main_under /deep/ .el-button-daochu:hover {
  background: url(../assets/img/shouye/下载按钮.png) no-repeat;
  background-size: 100% 100%;
}

.el-table::before {
  height: 0px;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}

.bottom {
  width: 100%;
  height: 40px /* 60/16 */ /* 40/16 */;
  background-color: rgba(11, 48, 78, 0.5);
  padding-bottom: 1%;
  .ss_l {
    float: left;
    margin-top: 13px;
    span {
      margin-left: 1.25rem /* 10/16 */;
      margin-right: 1.25rem /* 20/16 */;
      a {
        color: #fff;
      }
      a:hover {
        color: red;
      }
    }
  }
  .ss {
    float: right;
  }
}
/deep/ .el-dialog__body {
  padding: 0 20px;
}
.gailan {
  width: 99%;
  height: 760px /* 800/16 */;
  color: #cacdcd;
  padding: 10px 20px;
  box-sizing: border-box;
  h3 {
    margin-bottom: 10px;
  }
}
.gailanson {
  width: 100%;
  // border: 1px solid #093249;
  // background-color: rgba(4, 36, 54, 0.7);
  background-image: linear-gradient(180deg, #072b40 0%, #0d5179 100%);

  // border: 1px solid;
  height: 40px;
  // border-radius: 10px;
  display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  span {
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-family: 'siyuanheitinormal1';
    .ziti {
      color: #fff !important;
    }
  }
}

.gailan1 {
  width: 99%;
  height: 600px /* 800/16 */;
  color: #cacdcd;
  padding: 10px 20px 40px;
  box-sizing: border-box;
  h3 {
    margin-bottom: 10px;
  }
}
.gailanson1 {
  width: 100%;
  // border: 1px solid;
  // border: 1px solid #093249;
  // background-color: rgba(4, 36, 54, 0.7);
  background-image: linear-gradient(180deg, #072b40 0%, #0d5179 100%);
  height: 40px;
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  // padding-right: 30px;
  span {
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-family: 'siyuanheitinormal1';
    .ziti {
      color: #fff !important;
           white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
    }
  }
}
.zhuzhuang {
  width: 100%;
  height: 30%;
  .zhuzhuang1 {
    width: 100%;
    height: 100%;
  }
}
.bottom1 {
  width: 100%;
  height: 40px /* 60/16 */ /* 40/16 */;
  box-sizing: border-box;
  .ss1 {
    float: right;
    // margin-right: 45% /* 46/16 */;
  }
}
.dialogInfo /deep/ .el-table__row {
  height: 35px !important;
}
.title_top {
  background: url(../assets/img/list/biaotibeijing.png) no-repeat;
  color: #fff;
  width: 200px /* 200/16 */;
  height: 40px /* 40/16 */ /* 50/16 */;
  font-size: 20px /* 20/16 */;
  padding-left: 30px;
  margin-top: 20px /* 20/16 */;
}
// 弹窗
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  opacity: 0.85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 8px !important;
    .el-dialog__close {
      color: #fff;
      font-size: 16px;
    }
  }
  .el-dialog__header {
    margin: 20px 50px 0px 40px;
    background: url(../assets/img/shouye/标题矩形.png) no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog__title,
  .gailan h3,
  .gailan1 h3 {
    color: #2fbcfc;
  }
  .gailan h3,
  .gailan1 h3 {
    padding-left: 10px;
  }
}
//滚动条
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
.list_xia {
  padding-bottom: 20px;
  background-color: rgba(8, 38, 61, 0.6);
}
/deep/ .changdu {
  width: 220px !important;
}
</style>