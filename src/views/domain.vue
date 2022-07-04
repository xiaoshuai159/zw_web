<template>
  <div class="right_main_under">
    <Navlist></Navlist>
    <!-- <div class="title_top">查询条件</div> -->
    <div class="search_select_form bg">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- 数据来源 -->
          <el-form-item label="数据来源">
            <el-select
              class="el-input-width"
              v-model="newdomainSimpleVo.sourceType"
              placeholder="数据来源"
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

          <!-- 诈骗类型 -->
          <el-form-item label="诈骗类型">
            <el-select
              class="el-input-width changdu"
              v-model="newdomainSimpleVo.modelType1"
              placeholder="诈骗类型"
              clearable
              @clear="modelType1_clearFun(newdomainSimpleVo.modelType1)"
            >
              <el-option
                v-for="item in selectData.model_typeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态">
            <el-select
              class="el-input-width"
              v-model="newdomainSimpleVo.state"
              placeholder="状态"
              clearable
              @clear="state_clearFun(newdomainSimpleVo.state)"
            >
              <el-option
                v-for="item in selectData.stateTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议">
            <el-select
              class="el-input-width"
              v-model="newdomainSimpleVo.protocol"
              placeholder="协议"
              clearable
              @clear="protocol_clearFun(newdomainSimpleVo.protocol)"
            >
              <el-option
                v-for="item in selectData.protocolData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否授权">
            <el-select
              class="el-input-width"
              v-model="newdomainSimpleVo.authorize"
              placeholder="是否授权"
              clearable
              @clear="protocol_authorize(newdomainSimpleVo.authorize)"
            >
              <el-option
                v-for="item in selectData.authorize"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click.native.stop="searchTabData"
              class="el-button-chaxun"
              v-preventReClick
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
              @click.native.stop="newput"
              :loading="loadingbut"
              :disabled="this.tableData.length == 0"
            >
              {{ loadingbuttext }}</el-button
            >
            <el-button
              type="primary"
              class="el-button-chaxun"
              size="mini"
              @click.native.stop="newauthorization"
              >一键授权</el-button
            >
            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>
    <!-- <div class="list_xia"> -->
    <!-- //列表 -->
    <!-- <div class="title_top">查询结果</div> -->
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
      <el-table-column label="id" prop="id" v-if="isLoading"></el-table-column>
      <el-table-column label="filename" prop="fileName" v-if="isLoading">
      </el-table-column>
      <el-table-column
        label="fileNamePc"
        prop="fileNamePc"
        v-if="isLoading"
      ></el-table-column>
      <el-table-column label="URL" min-width="34%" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover placement="bottom" width="250" trigger="click">
            <div>
              <el-button
                size="mini"
                @click="kanjietu(scope.row.fileName, scope.row.url)"
                >看截图</el-button
              >

              <el-button
                size="mini"
                @click="kanyidongjietu(scope.row.fileNamePc, scope.row.url)"
                >移动端截图</el-button
              >
              <el-button size="mini" @click="qufangwen(scope.row.url)"
                >去访问</el-button
              >
            </div>
            <el-button slot="reference" type="text">{{
              scope.row.url
            }}</el-button>
       
          </el-popover>

     
        </template>
      </el-table-column>
      <!-- ----------------- -->
      <el-table-column label="诈骗类型" min-width="10%" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ zP(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="协议" prop="protocol" min-width="6%">
      </el-table-column>
      <el-table-column label="状态" min-width="6%">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="172" trigger="click">
            <div>
              <el-button size="mini" @click="add(scope.row.url)"
                >查看详情</el-button
              >
              <el-button size="mini" @click="lishi(scope.row.url)"
                >查看历史</el-button
              >
            </div>
            <el-button slot="reference" type="text"
              ><span :style="{ color: netcolor(scope.row.status) }">{{
                zt(scope.row.status)
              }}</span></el-button
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="处置时间" min-width="8%">
        <template slot-scope="scope">
          <span v-if="scope.row.treatmentTime">
            {{ ql(scope.row.treatmentTime) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="处置前一天访问量" prop="visits" min-width="7%">
      </el-table-column>
      <el-table-column label="数据来源" min-width="7%">
        <template slot-scope="scope">
          {{ scope.row.dataSource == 'CA' ? '长安发现' : '本地上传' }}
        </template>
      </el-table-column>
      <el-table-column label="授权部门" min-width="10%">
        <template slot-scope="scope">
          {{ bm(scope.row.authorizedDepartment) }}
        </template>
      </el-table-column>
      <el-table-column label="授权人" min-width="6%">
        <template slot-scope="scope">
          {{ scope.row.authorizer }}
        </template>
      </el-table-column>
      <el-table-column label="是否授权" min-width="6%">
        <template slot-scope="scope">
          {{ scope.row.authorize == '0' ? '未授权' : '已授权' }}
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
    <!-- </div> -->

    <!-- 看截图 -->
    <el-dialog
      :title="kanjietutitle"
      :visible.sync="newkanjietu"
      width="45%"
      height="40%"
      :before-close="newkanjietuclose"
    >
      <img
        v-if="!this.xinshi"
        :src="this.jieURL"
        ref="img"
        alt=""
        class="img"
      />
      <div v-if="this.xinshi" class="xinashititle">{{ xianshititle }}</div>
    </el-dialog>
    <!-- 看移动截图 -->
    <el-dialog
      :title="kanjietutitle1"
      :visible.sync="newkanjietu1"
      width="45%"
      height="40%"
      :before-close="newkanjietuclose1"
    >
      <img
        v-if="!this.xinshipc"
        :src="this.jieURL1"
        ref="img1"
        alt=""
        class="img"
      />
      <div v-if="this.xinshipc" class="xinashititle">{{ xianshititlepc }}</div>
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
      <div class="gailan1">
        <h3>概览信息</h3>
        <div class="gailanson1">
          <span
            >URL:&nbsp;&nbsp;
            <span class="ziti" :title="this.gailanlishi.url">{{
              this.gailanlishi.url!=null?  this.gailanlishi.url.length > 30
                ? this.gailanlishi.url.slice(0, 30) + '...'
                : this.gailanlishi.url:""
            }}</span></span
          >
          <span
            >诈骗类型:&nbsp;&nbsp;
            <span class="ziti">{{ zPlishi(this.gailanlishi.type) }}</span></span
          >
        </div>
        <h3>验证URL历史查看</h3>
        <el-table
          :row-class-name="tableRowClassName"
          ref="multipleTable"
          :data="tableData2"
          style="width: 100%"
          max-height="600px"
          size="mini"
          class="tableStyle"
        >
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column prop="state" label="状态"> </el-table-column>
          <el-table-column prop="handleTime" label="处置批次">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 状态_查看详情 -->
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
            <span class="ziti" :title="this.gailan.chakanurl">{{(this.gailan.chakanurl!=null?this.gailan.chakanurl.length>30?this.gailan.chakanurl.slice(0,30)+'...':this.gailan.chakanurl:"" ) }}</span
          ></span>
          <!-- this.gailan.url.length > 30
                ? this.gailan.url.slice(0, 30) + '...'
                : this.gailan.url -->
          <span
            >诈骗类型:&nbsp;&nbsp;
            <span class="ziti">{{ zPxq(this.gailan.type) }}</span></span
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
              @click="conerr"
              class="el-button-chongzhi"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- //柱状 -->
        <div class="zhuzhuang">
          <div class="zhuzhuang1">
            <div
              id="bar_qxxq"
              ref="chartxq"
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
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import getRole from '@/utils/promission.js'
import fanzhiweifen from '@/utils/fanzhiweifenlei.js'
import dayjs from 'dayjs'
export default {
  // inject: ["reload"],
  name: 'search',
  components: {},
  data() {
    return {
      flagstates: false,
      gailanlishi: {
        url: '',
        type: '',
      },
      tableData2: [],
      loadinglishi: false,

      urllishi: '',
      dialoglishi: false,
      loadingbuttext: '导出',
      loadingbut: false,
      newkanjietu: false,
      newkanjietu1: false,
      visible: false,
      whiteSearchList: {
        startCreateTime:
          dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          ' ' +
          '00:' +
          '00:' +
          '00',
        endCreateTime:
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },
      whiteSearchList1: {
        startCreateTime1: '',
        endCreateTime1: '',
      },
      whiteSearchList2: {
        startCreateTime2: '',
        endCreateTime2: '',
      },
      whiteSearchList3: {
        startCreateTime3: '',
        endCreateTime3: '',
      },
      isLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: '',
        region: '',
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
        modelType1: null, //modelType1
        protocol: null, //协议
        sourceType: null, //数据来源
        authorize: null, //是否授权
        state: null, //状态
        dateValue_find1: null, //图表时间
      },

      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },

      mypageable: {
        pageNum: 1,
        pageSize: 15,
      },
      // 移动端显示
      xinshi: false,
      xianshititle: '',
      // pc端显示
      xinshipc: false,
      xianshititlepc: '',
      total: 1,
      totalPages: '',
      //下拉框的选项数据
      selectData: {
        protocolData: [
          { value: 'HTTP', label: 'HTTP' },
          { value: 'HTTPS', label: 'HTTPS' },
        ],
        sourceTypeData: [
          { value: 'CA', label: '长安发现' },
          { value: 'BD', label: '本地上传' },
        ],

        stateTypeData: [
          { value: 0, label: '处置中' },
          { value: 1, label: '已处置' },
          { value: 2, label: '已失效' },
        ],
        model_typeData: [
          { value: 'DK', label: '贷款' },
          { value: 'SD', label: '刷单' },
          { value: 'GJF', label: '仿冒公检法' },

          // { value: "GW", label: "网络购物" },
          { value: 'QT', label: '其他类型诈骗' },
          { value: 'GW', label: '冒充电商客服类' },
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
        authorize: [
          { value: 0, label: '未授权' },
          { value: 1, label: '已授权' },
        ],
      },
      tableData: [],
      tableDatalist: [],

      newurl: '',
      qutest: [],
      qutest1: [],
      qutest2: [],
      zhutest1: [],
      zhutest2: [],
      zhutest3: [],
      restest: [],
      jieURL: '',
      jieURL1: '',
      kanjietutitle: '',
      kanjietutitle1: '',
      newsonList: [],
      url: '',
      loading: false,
      dialog: false,
      gailan: {
        chakanurl: '',
        type: '',
        kehuduan: '',
        boceci: '',
      },
      textnum: [],
      probeTime: [],
      textnotNum: [],
      //弹窗拨测时间
      tcboctime: '',

      mypageable1: {
        pageNum1: 1,
        pageSize1: 5,
      },
      total1: 1,
      totalPages1: '',
      loadingbuttext1: '导出',
      loadingbuttextchakan: '导出',
      tableData1: [],
    }
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  computed: {},
  created() {
    // this.getTabData()
    // this.echartslist();
  },
  mounted() {
    // setTimeout(() => {
    //   this.drawLine();
    //   this.Columnar();
    // }, 500);
  },
  methods: {
    getRole1(data) {
      return getRole(data)
      // console.log( getRole(data));
    },
    // qu() {
    //   console.log(1);

    // },
    // +++++++++++++++++++++++++++++++++++++
    qufangwen(val) {
      // console.log(val);
      window.open(val)
    },
    async kanjietu(val, label) {
      // this.urlres=val
      this.kanjietutitle = ''
      this.jieURL = ''
      const { data: res } = await this.$http.post(
        '/treatment/getUrl' + '?fileName=' + val
      )
      // console.log(res);
      if (res.code == 200) {
        this.jieURL = res.data
        this.kanjietutitle = label
        this.xinshi = false
        // console.log(label);
      } else {
        this.xinshi = true
        this.xianshititle = '该URL无图'
      }

      this.newkanjietu = true

      // console.log(2);
    },
    // 移动端截图
    async kanyidongjietu(val, label) {
      // this.urlres=val
      // console.log(val);
      this.kanjietutitle1 = ''
      this.jieURL1 = ''
      const { data: res } = await this.$http.post(
        '/treatment/getUrl' + '?fileName=' + val
      )
      // console.log(res);
      if (res.code == 200) {
        this.jieURL1 = res.data
        this.kanjietutitle1 = label
        this.xinshipc = false
        // console.log(label);
      } else {
        this.xinshipc = true
      }

      this.newkanjietu1 = true
      this.xianshititlepc = '该URL无图'
      // console.log(2);
    },
    newkanjietuclose() {
      this.newkanjietu = false
    },
    newkanjietuclose1() {
      this.newkanjietu1 = false
    },
    //曲线图++++++++++++++++++++++++++++++++++++
    // ===================================
    // drawLine() {
    //   // eslint-disable-next-line camelcase
    //   var bar_qx = this.$refs.chart;
    //   // eslint-disable-next-line camelcase
    //   if (bar_qx) {
    //     let myChart = this.$echarts.init(bar_qx);
    //     myChart.setOption(this.setOption());
    //     // console.log(myChart);
    //   }

    //   // console.log(this.qutest);
    // },
    // setOption() {
    //   let option = {
    //     feature: {
    //       saveAsImage: {
    //         show: false,
    //       },
    //     },
    //     title: {},
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         lineStyle: {
    //           color: "#66B3FF",
    //         },
    //       },
    //     },
    //     color: [" #fac858", "#EE6666"], //绿色  橙色
    //     legend: {
    //       data: [
    //         {
    //           name: "处置域名数",
    //           textStyle: {
    //             color: ["#fac858"],
    //           },
    //         },
    //         {
    //           name: "域名访问量",
    //           textStyle: {
    //             color: ["#EE6666"],
    //           },
    //           //  ["处置域名数", "域名访问量"]
    //         },
    //       ],
    //     },
    //     grid: {
    //       y2: 140,
    //     },

    //     xAxis: {
    //       type: "category",
    //       boundaryGap: false,
    //       data: this.qutest,
    //       axisLabel: {
    //         // rotate: -20,
    //         //  让x轴文字方向为竖向
    //         // interval: 0,
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //     },

    //     yAxis: {
    //       type: "value",
    //       splitLine: {
    //         lineStyle: {
    //           color: ["#fff"],
    //         },
    //       },
    //       nameTextStyle: {
    //         color: ["#fff"],
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         name: "处置域名数",
    //         type: "line",

    //         data: this.qutest1,
    //         smooth: true,
    //       },
    //       {
    //         name: "域名访问量",
    //         type: "line",

    //         data: this.qutest2,
    //         smooth: true,
    //       },
    //     ],
    //     dataZoom: [
    //       {
    //         id: "dataZoomX",
    //         type: "inside",
    //         xAxisIndex: [0],
    //         filterMode: "none",
    //         start: 0,
    //         end: 200,
    //       },
    //     ],
    //     grid: {
    //       x: 60,
    //       y: 40,
    //       x2: 40,
    //       y2: 40,
    //       borderWidth: 1,
    //     },
    //   };

    //   return option;
    // },
    // 曲线图++++++++++++++++++++++++++++++++++++
    //柱状图----------------------------------------
    // Columnar() {
    //   // eslint-disable-next-line camelcase
    //   var bar_zz = this.$refs.zhuchart;
    //   // eslint-disable-next-line camelcase
    //   if (bar_zz) {
    //     let myChart = this.$echarts.init(bar_zz);

    //     myChart.setOption(this.zhusetOption());
    //   }
    // },
    // zhusetOption() {
    //   this.zhutest1.forEach((item) => {
    //     if (item == "DK") {
    //       this.restest.push("网络贷款");
    //     } else if (item == "SD") {
    //       this.restest.push("兼职刷单");
    //     } else if (item == "GJF") {
    //       this.restest.push("冒充公务单位");
    //     } else if (item == "LC") {
    //       this.restest.push("投资理财");
    //     } else if (item == "GW") {
    //       this.restest.push("网络购物");
    //     } else if (item == "QT") {
    //       this.restest.push("未分类");
    //     }
    //   });
    //   // console.log(this.restest);
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
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     title: {},
    //     grid: {
    //       x: 60,
    //       y: 40,
    //       x2: 40,
    //       y2: 40,
    //       borderWidth: 1,
    //     },
    //     color: [" #fac858", "#EE6666"], //绿色  橙色
    //     legend: {
    //       data: [
    //         {
    //           name: "处置域名数",
    //           textStyle: {
    //             color: ["#fac858"],
    //           },
    //         },
    //         {
    //           name: "域名访问量",
    //           textStyle: {
    //             color: ["#EE6666"],
    //           },
    //           //  ["处置域名数", "域名访问量"]
    //         },
    //       ],
    //     },
    //     xAxis: {
    //       type: "category",
    //       // data:this.zhutest2,
    //       data: this.restest,

    //       axisLabel: {
    //         // rotate: -30,
    //         //  让x轴文字方向为竖向
    //         interval: 0,
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //     },
    //     yAxis: {
    //       type: "value",
    //       splitLine: {
    //         lineStyle: {
    //           color: ["#fff"],
    //         },
    //       },
    //       nameTextStyle: {
    //         color: ["#fff"],
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#fff",
    //           width: 1,
    //         },
    //       },
    //     },
    //     series: [
    //       {
    //         data: this.zhutest2,
    //         type: "bar",
    //         color: "#fac858",
    //         barWidth: 20,
    //         name: "处置域名数",
    //       },
    //       {
    //         data: this.zhutest3,
    //         type: "bar",

    //         barWidth: 20,
    //         name: "域名访问量",
    //         color: "#EE6666",
    //       },
    //     ],
    //   };
    //   return option;
    // },

    // 图表初次渲染
    // async echartslist() {
    //   let charecharts = {
    //     startTreatmentTime: this.whiteSearchList1.startCreateTime1.substring(
    //       0,
    //       this.whiteSearchList1.startCreateTime1.length - 9
    //     ),
    //     endTreatmentTime: this.whiteSearchList1.endCreateTime1.substring(
    //       0,
    //       this.whiteSearchList1.startCreateTime1.length - 9
    //     ),
    //   };
    //   const { data: res } = await this.$http.post(
    //     "/treatment/tongJiTreatment",
    //     charecharts
    //   );
    //   if (res.code == 200) {
    //     this.newsonList = fanzhiweifen("QT", res.data.sonList);
    //     res.data.tjList.forEach((item) => {
    //       this.qutest.push(item.treatmentTime1);
    //       this.qutest1.push(item.urlCount);
    //       this.qutest2.push(item.visitsSum);
    //     });
    //     this.newsonList.forEach((item) => {
    //       this.zhutest1.push(item.type);
    //       this.zhutest2.push(item.urlCount2);
    //       this.zhutest3.push(item.typeVisits);
    //     });
    //     // console.log(this.zhutest1);
    //     setTimeout(() => {
    //       this.drawLine();
    //       this.Columnar();
    //     }, 500);
    //   } else {
    //     alert("无数据");
    //   }
    // },
    //图表数据查询
    // async chaxun1() {
    //   // (this.qutest = []),
    //   //   (this.qutest1 = []),
    //   //   (this.qutest2 = []),
    //   //   (this.zhutest1 = []),
    //   //   (this.zhutest2 = []);
    //   //    this.zhutest3 = [];
    //   //    this.restest = [];

    //   let charecharts1 = {
    //     startTreatmentTime:
    //       this.whiteSearchList1.startCreateTime1 != null
    //         ? this.whiteSearchList1.startCreateTime1.substring(
    //             0,
    //             this.whiteSearchList1.startCreateTime1.length - 9
    //           )
    //         : null,
    //     endTreatmentTime:
    //       this.whiteSearchList1.endCreateTime1 != null
    //         ? this.whiteSearchList1.endCreateTime1.substring(
    //             0,
    //             this.whiteSearchList1.startCreateTime1.length - 9
    //           )
    //         : null,
    //   };
    //   //       let charecharts1 = {
    //   //   startTreatmentTime: this.whiteSearchList1.startCreateTime1.substring(
    //   //     0,
    //   //     this.whiteSearchList1.startCreateTime1.length - 9
    //   //   ),
    //   //   endTreatmentTime: this.whiteSearchList1.endCreateTime1.substring(
    //   //     0,
    //   //     this.whiteSearchList1.startCreateTime1.length - 9
    //   //   )
    //   // };
    //   const { data: res } = await this.$http.post(
    //     "/treatment/tongJiTreatment",
    //     charecharts1
    //   );
    //   if (res.code == 200) {
    //     console.log(res);
    //     (this.qutest = []),
    //       (this.qutest1 = []),
    //       (this.qutest2 = []),
    //       (this.zhutest1 = []),
    //       (this.zhutest2 = []);
    //     this.zhutest3 = [];
    //     this.restest = [];
    //     res.data.tjList.forEach((item) => {
    //       this.qutest.push(item.treatmentTime1);
    //       this.qutest1.push(item.urlCount);
    //       this.qutest2.push(item.visitsSum);
    //     });
    //     res.data.sonList.forEach((item) => {
    //       this.zhutest1.push(item.type);
    //       this.zhutest2.push(item.urlCount2);
    //       this.zhutest3.push(item.typeVisits);
    //     });
    //     // console.log(this.zhutest1);

    //     setTimeout(() => {
    //       this.drawLine();
    //       this.Columnar();
    //     }, 500);
    //   } else {
    //     alert("无数据");
    //   }
    // },
    //初始化获取数据
    async getTabData() {
      let mypageable = {
        mypageable: this.mypageable,
        domainSimpleVo: {
          dataSource: this.newdomainSimpleVo.sourceType,
          type: this.newdomainSimpleVo.modelType1,
          status: this.newdomainSimpleVo.state,
          protocol: this.newdomainSimpleVo.protocol,
          authorize: this.newdomainSimpleVo.authorize,
        },
        domainTimeVo: {
          startTreatmentTime: this.whiteSearchList.startCreateTime,
          endTreatmentTime: this.whiteSearchList.endCreateTime,
        },
      }
      // console.log(initList);
      // console.log(mypageable);
      const { data: res } = await this.$http.post(
        '/treatment/getDomain',
        mypageable
      )
      if (res.code == 200) {
        // console.log(res.data)

        this.tableData = res.data.content
        this.total = res.data.totalElements
        this.totalPages = res.data.totalPages
      }
    },

    //查询
    searchTabData() {
      this.mypageable.pageNum = 1
      this.getTabData()
    },

    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        modelType1: null, //modelType1
        protocol: null, //协议
        sourceType: null, //数据来源
        authorize: null, //是否授权
        state: null, //状态
        dateValue_find: null, //处置时间
      }
      ;(this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      }),
        this.getTabData()
    },
    handleSelectionChange(val) {
      this.tableDatalist = val
      console.log(this.tableDatalist)
    },
    //一键授权
    async newauthorization() {
      // console.log(this.tableDatalist);
      if (this.tableDatalist.length > 0) {
        let arr = []
        let authorarr = []
        this.tableDatalist.forEach((item) => {
          arr.push(item.id)
          authorarr.push(item.authorize)
        })
        if (authorarr.includes(1)) {
          this.$message('选择中含有已授权，请重新选择')
        } else {
          const newarr = {
            code: 'null',
            data: arr,
            message: 'null',
          }
          const { data: res } = await this.$http.post(
            '/treatment/authorize',
            newarr
          )
          if (res.code == 200) {
            this.$message('授权修改成功')
            // this.reload();
            this.getTabData()
            this.shuzuid = []
          } else if (res.data == 500) {
            this.$message(res.message)
          }
        }
      } else {
        this.$message('请选择')
      }
    },
    //导出
    //   put() {

    //   if (this.tableDatalist.length < 0) {
    // this.$confirm('您可以对数据进行勾选下载，若要下载全部预警数据点击确定?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     })
    //       .then(async () => {
    //         this.put123()
    //       })
    //       .catch(() => {
    //         this.$message('已取消')
    //       })

    //   } else {
    //    this.put123()
    //   }
    // },
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
            this.put()
          })
          .catch(() => {
            this.$message('已取消')
          })
      } else {
        this.put()
      }
    },
    async put() {
      console.log(1)
      this.loadingbuttext = '...加载中'
      let arr = []
      // let authorarr = [];
      console.log(this.tableDatalist)
      this.tableDatalist.forEach((item) => {
        arr.push(item.id)
      })
      this.loadingbut = true
      let putlist = {
        domainSimpleVo: {
          dataSource: this.newdomainSimpleVo.sourceType,
          type: this.newdomainSimpleVo.modelType1,
          status: this.newdomainSimpleVo.state,
          protocol: this.newdomainSimpleVo.protocol,
          authorize: this.newdomainSimpleVo.authorize,
        },
        domainTimeVo: {
          startTreatmentTime: this.whiteSearchList.startCreateTime,
          endTreatmentTime: this.whiteSearchList.endCreateTime,
        },
        mypageable: this.mypageable,
        idList: arr,
      }

      const { data: res } = await this.$http.post(
        '/treatment/downloadDomain',
        putlist
      )
      if (res.code == 200) {
        this.loadingbuttext = '导出'
        this.loadingbut = false
        let newurl = res.expandData.url
        let eleLink = document.createElement('a')
        eleLink.download = name
        // const down = window.location.origin
        // eleLink.href = "http://172.31.1.61:8080" + newurl;
        // const down = window.location.origin
        eleLink.href = newurl
        // console.log(eleLink);
        eleLink.click()
        eleLink.remove()
        this.$refs.multipleTable.clearSelection()
      } else {
        this.$message(res.message)
      }
    },

    //状态————查看详情
    // add(val) {
    //   this.$router.push({
    //     path: "/boce",
    //     query: {
    //       mallCode: val,
    //     },
    //   });
    // },
    add(val) {
      this.chakanurl = val
      this.loading = true
      this.dialog = true
      this.mypageable1.pageNum1 = 1
      this.whiteSearchList2.startCreateTime2 = ''
      this.whiteSearchList2.endCreateTime2 = ''
      this.whiteSearchList3.startCreateTime3 = ''
      this.whiteSearchList3.endCreateTime3 = ''
      this.mypageable1.pageNum1 = 1
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
    //弹窗概况
    async gaikuang() {
      this.bocexiangqing()
      const { data: res } = await this.$http.get('/getBcTestByUrl', {
        params: { url: this.chakanurl },
      })
      if (res.code == 200) {
        // console.log(res.data);
        this.gailan.chakanurl = res.data.url
        this.gailan.type = res.data.type
        this.gailan.kehuduan = res.data.clientTotal
        this.gailan.boceci = res.data.completeTotal
      }
    },
    //查看拨测详情列表
    async bocexiangqing() {
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []
      let bcTestVo = {
        url: this.chakanurl,
        startCreateTime: this.whiteSearchList2.startCreateTime2,
        endCreateTime: this.whiteSearchList2.endCreateTime2,
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
          this.drawLine1()
        })
        this.loading = false
      } else {
        this.flagstates = true
        this.$message('无数据')
        this.loading = false
      }
    },

    //查看拨测详情列表
    async bocexiangqing1() {
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []
      let bcTestVo = {
        url: this.chakanurl,
        startCreateTime: this.flagstates
          ? this.whiteSearchList3.startCreateTime3
          : this.whiteSearchList2.startCreateTime2,
        endCreateTime: this.flagstates
          ? this.whiteSearchList3.endCreateTime3
          : this.whiteSearchList2.endCreateTime2,
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
        //   this.drawLine1()
        // })
        // this.loading = false
      } else {
        this.$message('无数据')
        this.loading = false
      }
    },
    //查看详情__柱状
    drawLine1() {
      // eslint-disable-next-line camelcase
      var bar_qxxq = this.$refs.chartxq
      let myChart = this.$echarts.init(bar_qxxq)
      myChart.setOption(this.setOptionxiangq())
      this.loading = false
    },
    //柱状
    setOptionxiangq() {
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
        color: [' #fac858', '#05e0fd'], //绿色  橙色
        legend: {
          right: '10%', //xin
          orient: 'horizontal', //xin  horizontal
          data: [
            {
              name: '可以访问次数',
              textStyle: {
                color: ['#fac858'],
              },
            },
            {
              name: '无法访问次数',
              textStyle: {
                color: ['#05e0fd'],
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
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1,
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ['#fff'],
            },
          },
          nameTextStyle: {
            color: ['#fff'],
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1,
            },
          },
        },
        series: [
          {
            data: this.textnum,
            type: 'bar',
            color: '#fac858',
            barWidth: 15,
            stack: 'one',
            name: '可以访问次数',
            animation: false,
          },
          {
            data: this.textnotNum,
            type: 'bar',
            stack: 'one',
            barWidth: 15,
            name: '无法访问次数',
            color: '#05e0fd',
            animation: false,
          },
        ],
      }
      this.loading = false
      return option
    },
    handleClose1() {
      this.dialog = false
      this.gailan.chakanurl = ''
      this.gailan.type = ''
      this.gailan.kehuduan = ''
      this.gailan.boceci = ''
  
      this.tcboctime = ''
    },
    timechange(val) {
      if (val && val != '') {
        this.whiteSearchList2.startCreateTime2 = val[0]
        this.whiteSearchList2.endCreateTime2 = val[1]
      } else {
        this.whiteSearchList2.startCreateTime2 = null
        this.whiteSearchList2.endCreateTime2 = null
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
          this.whiteSearchList2.startCreateTime2
        this.whiteSearchList3.endCreateTime3 =
          this.whiteSearchList2.endCreateTime2
        let bcTestVo = {
          url: this.chakanurl,
          startCreateTime: this.whiteSearchList2.startCreateTime2,
          endCreateTime: this.whiteSearchList2.endCreateTime2,
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
            this.drawLine1()
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
      this.whiteSearchList2.startCreateTime2 = ''
      this.whiteSearchList2.endCreateTime2 = ''
      this.whiteSearchList3.startCreateTime3 = ''
      this.whiteSearchList3.endCreateTime3 = ''
      this.mypageable1.pageNum1 = 1
      this.tcboctime = null
      this.textnum = []
      this.probeTime = []
      this.textnotNum = []
      let bcTestVo = {
        url: this.chakanurl,
        startCreateTime: this.whiteSearchList2.startCreateTime2,
        endCreateTime: this.whiteSearchList2.endCreateTime2,
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
          this.drawLine1()
        })
      } else {
        this.$message('无数据')
        this.loading = false
      }
    },
    async gailanxiazai() {
      this.loadingbuttext1 = '...加载中'
      this.loadingbut = true
      const bcTestVo = {
        url: this.chakanurl,
        startCreateTime: this.whiteSearchList2.startCreateTime2,
        endCreateTime: this.whiteSearchList2.endCreateTime2,
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
    handleCurrentChange1(val) {
      this.mypageable1.pageNum1 = val
      this.bocexiangqing1()
    },
    lishi(val) {
      this.urllishi = val
      // console.log(this.urllishi);
      this.loadinglishi = true
      this.dialoglishi = true
      this.gaikuanglishi()
    },

    //历史弹窗概况
    async gaikuanglishi() {
      this.bclishi()
      const { data: res } = await this.$http.get('/getBcTestByUrl', {
        params: { url: this.urllishi },
      })
      // console.log(res)
      if (res.code == 200) {
        this.gailanlishi.url = res.data.url
        this.gailanlishi.type = res.data.type
        // console.log( this.gailanlishi.url.length);
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
    handleClose2() {
      this.dialoglishi = false
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
    //有问题

    dataCreate_change1(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 = null
        this.whiteSearchList1.endCreateTime1 = null
      }
    },
    getRowKeys(row) {
      return row.id
    },

    handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val
      this.getTabData()
    },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNum = val

      // console.log( this.mypageable.pageNum);
      this.getTabData()
    },
    find_change(val) {
      if (val && val != '') {
        this.domainTimeVo.startFindTime = val[0]
      } else {
        this.domainTimeVo.startFindTime = null
      }
    },
    Issue_change(val) {
      if (val && val != '') {
        this.domainTimeVo.IssueFindTime = val[0]
      } else {
        this.domainTimeVo.IssueFindTime = null
      }
    },
    finish_change(val) {
      if (val && val != '') {
        this.domainTimeVo.startFinishTime = val[0]
        this.domainTimeVo.endFinishTime = val[1]
      }
    },
    update_change(val) {
      if (val && val != '') {
        this.domainTimeVo.startUpdateTime = val[0]
        this.domainTimeVo.endUpdateTime = val[1]
      }
    },
    issued_change(val) {
      if (val && val != '') {
        this.domainTimeVo.startIssuedTime = val[0]
        this.domainTimeVo.endIssuedTime = val[1]
      }
    },

    sourceType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.sourceType = null
      }
    },

    state_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.state = null
      }
    },

    modelType1_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.modelType1 = null
      }
    },
    protocol_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.protocol = null
      }
    },
    protocol_authorize(val) {
      if (val == '') {
        this.newdomainSimpleVo.authorize = null
      }
    },
    //诈骗
    zP(val) {
      if (val == 'DK') {
        return '贷款'
      } else if (val == 'SD') {
        return '刷单'
      } else if (val == 'GJF') {
        return '仿冒公检法'
      } else if (val == 'GW') {
        return '冒充电商客服类'
      } else if (val == 'QT') {
        return '其他类型诈骗'
      } else if (val == 'JJGW') {
        return '冒充军警购物诈骗'
      } else if (val == 'SZP') {
        return '杀猪盘'
      } else if (val == 'DS') {
        return '虚假购物/服务类'
      } else if (val == 'JY') {
        return '网络婚恋/交友类'
      } else if (val == 'ZX') {
        return '虚假征信类'
      } else if (val == 'MC') {
        return '冒充领导/熟人类'
      } else if (val == 'YX') {
        return '网络游戏产品虚假交易类'
      } else if (val == 'APP') {
        return '分发平台'
      } else if (val == 'XZYM') {
        return '下载页面'
      } else if (val == 'LC') {
        return '杀猪盘'
      } else {
        return val
      }
    },
    zPlishi(val) {
      if (val == 'dk') {
        return '贷款'
      } else if (val == 'sd') {
        return '刷单'
      } else if (val == 'gjf') {
        return '仿冒公检法'
      } else if (val == 'gw') {
        return '冒充电商客服类'
      } else if (val == 'qt') {
        return '其他类型诈骗'
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
    zPxq(val) {
      if (val == 'dk') {
        return '贷款'
      } else if (val == 'sd') {
        return '刷单'
      } else if (val == 'gjf') {
        return '仿冒公检法'
      } else if (val == 'gw') {
        return '冒充电商客服类'
      } else if (val == 'qt') {
        return '其他类型诈骗'
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
    zt(val) {
      if (val == 0) {
        return '处置中'
      } else if (val == 1) {
        return '已处置'
      } else if (val == 2) {
        return '已失效'
      }
    },
    //处置时间去零
    ql(val) {
      let c = val
      return c.substring(0, c.length - 9)
    },
    //部门
    bm(val) {
      if (val == 1) {
        return '成都市局'
      }
    },
    // 列表斑马
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
    netcolor(val) {
      if (val == 0) {
        return '#4f97e2'
      } else if (val == 1) {
        return '#fdc047'
      } else if (val == 2) {
        return '#f37b78'
      }
    },
   
  },

  filters: {
    sourceType: function (value) {
      var status = ''
      switch (value) {
        case 'CA':
          status = '长安'
          break
        case 'PG':
          status = '盘古'
          break
        case 'XZ':
          status = '刑侦'
          break
        default:
          status = '暂无'
          break
      }
      return status
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
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}

/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent !important;
}
.el-pagination {
  text-align: right;
}
.bottom {
  width: 100%;
  height: 40px /* 60/16 */ /* 40/16 */;
  background-color: rgba(11, 48, 78, 0.6);
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

.warning {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 5rem /* 80/16 */;
  .item {
    .el-button {
      width: 9.375rem /* 150/16 */ /* 100/16 */;
      height: 4rem /* 80/16 */;
      font-size: 18px;
      background-color: rgb(93, 93, 199);
      color: #fff;
      border: 1px solid transparent;
    }
  }
}

// * el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  margin-top: 0.625rem /* 10/16 */;
  background: 0 0;
  border-top: 1px solid #596168;
}
.dialist {
  padding: 0 1.25rem /* 10/16 */ 1.25rem 0 /* 20/16 */;
  .ss {
    margin-right: 1.5rem /* 20/16 */;
  }
}
// /deep/.el-dialog {
//   margin: 5vh auto !important;
// }

// /deep/ .el-dialog__body {
//   height: 70vh;
//   overflow: auto;
// }
.urlcolor {
  color: #909090;
}
.tubiao {
  width: 100% /* 1558/16 */;
  height: 12.5rem /* 200/16 */ /* 300/16 */;
  margin-bottom: 2rem;
  box-sizing: border-box;
}
.tubiao1 {
  width: 100% /* 1558/16 */;
  height: 10rem /* 200/16 */ /* 300/16 */;
  display: flex;
  justify-content: space-around;
}
.left {
  width: 40% /* 779/16 */;
  height: 10rem /* 300/16 */;
  // float: left;
  // padding: 1.25rem /* 20/16 */ /* 20/16 */ /* 50/16 */ 3.125rem /* 50/16 */
  /* 100/16 */ /* 40/16 */
  box-sizing: border-box;
  background-color: #07293f;
  border-radius: 10px;
}
#bar_qx {
  height: 10rem /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
  margin-left: 0.625rem /* 10/16 */ /* 20/16 */;
}
#bar_zz {
  height: 10rem /* 200/16 */;
  // margin-left: 1.875rem /* 30/16 */ /* 20/16 */;
  padding-top: 0.625rem /* 10/16 */;
  margin-left: 0.625rem;
}
.right {
  width: 40%;
  height: 10rem;
  background-color: #07293f;
  // float: right;
  // padding: 1.25rem /* 20/16 */ /* 50/16 */ 3.125rem /* 100/16 */;
  box-sizing: border-box;
  border-radius: 10px;
}
.urlsrc {
  width: 18.75rem /* 300/16 */;
  height: 31.25rem /* 500/16 */;
}
.img {
  width: 100%;
  height: 100%;
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
  margin-bottom: 20px;
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
    }
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
.zhuzhuang {
  width: 100%;
  height: 30%;
  .zhuzhuang1 {
    width: 100%;
    height: 100%;
  }
}
// .bg {
//   border: 1px solid #1c7aa8;
//   // border-radius: .625rem /* 10/16 */;
//   padding: 0.625rem /* 10/16 */ /* 20/16 */;
//   background-color:rgb(1, 29, 58,.9) ;
//   opacity: .9;
//   // background: url(../assets/img/list/zhongkuang.png) no-repeat;
//   // background-size: 100%;
// }
// .bg1{

//      background: url(../assets/img/list/xiakuang.png) no-repeat ;
//      background-size: 100%;
// }
.title_top {
  background: url(../assets/img/list/biaotibeijing.png) no-repeat;
  color: #fff;
  width: 200px /* 200/16 */;
  height: 40px /* 40/16 */ /* 50/16 */;
  font-size: 20px /* 20/16 */;
  padding-left: 30px;
  margin-top: 20px /* 20/16 */;
}
.xinashititle {
  text-align: center;
}
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
/deep/ .changdu {
  width: 220px !important;
}
.list_xia {
  padding-bottom: 20px;
  background-color: rgba(8, 38, 61, 0.6);
}
</style>
