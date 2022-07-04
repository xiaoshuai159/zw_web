<template>
  <div class="right_main_under">
    <Navlist></Navlist>
    <!-- <div class="title_top">查询条件</div> -->
    <div class="search_select_form bg">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="mini"
      >
        <!-- 诈骗时间 -->
        <el-form-item label="诈骗时间">
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
        <!-- <el-form-item label="数据源">
          <el-select
            class="el-input-width"
            v-model="newdomainSimpleVo.sourceType"
            placeholder="数据源"
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
        </el-form-item> -->

        <!-- 预警等级 -->
        <el-form-item label="预警等级">
          <el-select
            class="el-input-width"
            v-model.trim="newdomainSimpleVo.Warning"
            placeholder="预警等级"
            clearable
            @clear="WarningType_clearFun(newdomainSimpleVo.Warning)"
          >
            <el-option
              v-for="item in selectData.WarningTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 诈骗类型 -->
        <el-form-item label="诈骗类型">
          <el-select
            v-model.trim="newdomainSimpleVo.fraud"
            placeholder="诈骗类型"
            clearable
            @clear="fraudType_clearFun(newdomainSimpleVo.fraud)"
          >
            <el-option
              v-for="item in selectData.fraudypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号归属地 -->
        <el-form-item label="电话号码">
          <el-input
            v-model.trim="newdomainSimpleVo.photo"
            placeholder="请输入电话号码"
            @clear="modelType1_photo(newdomainSimpleVo.photo)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="el-button-chaxun"
            type="primary"
            size="mini"
            @click.native="searchTabData"
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
            @click.native.stop="put"
            :loading="loadingbut"
            :disabled="this.tableData.length == 0"
            >{{ loadingbuttext }}</el-button
          >
          <!-- v-if="getRole1('downloadWarning')" -->
        </el-form-item>
      </el-form>
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
      :height="heights"
      size="mini"
      class="tableStyle"
      id="onetable"
      @selection-change="handleSelectionChange"
    >
      <!-- max-height="600px" -->

      <!-- <el-table-column type="selection" :reserve-selection="true" width="55"> -->
      <!-- </el-table-column> -->
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column label="诈骗时间" prop="fraudTime"> </el-table-column>
      <el-table-column label="受害人IP" prop="victimIp"> </el-table-column>
      <el-table-column label="受害人端口" prop="victimPort"> </el-table-column>
      <el-table-column label="受害人地理位置" prop="victimAddress">
      </el-table-column>
      <el-table-column label="预警等级" prop="warningLevel" width="100">
      </el-table-column>
      <el-table-column label="访问量" prop="visits" width="100">
      </el-table-column>
      <el-table-column label="诈骗类型" show-overflow-tooltip width="150">
        <template slot-scope="scope">
          <!-- {{ shuzu(scope.row.fraudType) }}
           -->
          {{ scope.row.fraudType }}
        </template>
      </el-table-column>
      <el-table-column label="诈骗小类型" prop="category" width="100">
        <template slot-scope="scope">
          {{ smalltype(scope.row.category) }}
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        show-overflow-tooltip
        label="诈骗网站域名"
        prop="fraudUrl"
      >
        <template slot-scope="scope">
          <div
            class="dianji"
            v-if="scope.row.fraudTime"
            @click="jietu(scope.row.fraudUrl)"
            :title="clicktitle"
          >
            {{ scope.row.fraudUrl }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" prop="phone"></el-table-column>
      <!-- <el-table-column label="受害人IP/端口" prop="userIp">
        <template slot-scope="scope">
          {{ scope.row.userIp + ':' + scope.row.userPort }}
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        label="受害人IP归属地"
        prop="userIpAscription"
        show-overflow-tooltip
      >
      </el-table-column> -->
      <!-- <el-table-column label="身份证" prop="idCard" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="银行卡" prop="bankCard" show-overflow-tooltip>
      </el-table-column> -->

      <!-- <el-table-column label="数据来源" prop="dataSource" width="100">
      </el-table-column> -->
      <!-- <el-table-column label="操作" v-if="getRole1('showDetails')" width="100">
        <template slot-scope="scope"> -->
      <!-- <div v-if=""> -->
      <!-- <el-button
            type="text"
            v-if="Object.keys(scope.row).length > 0"
            size="mini"
            @click="ckxq(scope.row.id)"
          >
            查看详情
          </el-button> -->
      <!-- </div> -->
      <!-- </template>
      </el-table-column> -->
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
          layout="total, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>
    <!-- </div>  -->

    <!-- ====================== -->

    <el-dialog
      :close-on-click-modal="false"
      title="详情"
      :visible.sync="xiangqing"
      width="50%"
      :before-close="handleClose1"
      class="dialogInfo"
      top="5vh"
    >
      <div class="xiangqinglist">
        <div class="list1">
          <div class="list2">
            <div class="list4">
              <span class="listtitle">创建时间：</span>
              <span class="listtitle1">{{ xintableData.createTime }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">诈骗时间：</span>
              <span class="listtitle1">{{ xintableData.fraudTime }}</span>
            </div>
          </div>
          <div class="list3">
            <div class="list4">
              <span class="listtitle">预警等级：</span>
              <span class="listtitle1">{{ xintableData.earlyGrade }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">诈骗类型：</span>
              <span class="listtitle1">{{ xintableData.fraudType }}</span>
            </div>
          </div>
        </div>
        <div class="list1">
          <div class="list2">
            <div class="list4">
              <span class="listtitle">诈骗域名：</span>
              <span class="listtitle1">{{ xintableData.fraudAddress }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">诈骗地址所属国家：</span>
              <span class="listtitle1">{{ xintableData.domainName }}</span>
            </div>
          </div>
          <div class="list3">
            <div class="list4">
              <span class="listtitle">诈骗网站IP：</span>
              <span class="listtitle1">{{ xintableData.fraudIp }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">诈骗网站端口：</span>
              <span class="listtitle1">{{ xintableData.fraudPort }}</span>
            </div>
          </div>
        </div>
        <div class="list1">
          <div class="list2">
            <div class="list4">
              <span class="listtitle">受害人IP：</span>
              <span class="listtitle1">{{ xintableData.userIp }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">受害人端口：</span>
              <span class="listtitle1">{{ xintableData.userPort }}</span>
            </div>
          </div>
          <div class="list3">
            <div class="list4">
              <span class="listtitle">受害人IP归属地：</span>
              <span class="listtitle1">{{
                xintableData.userIpAscription
              }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">用户名：</span>
              <span class="listtitle1">{{ xintableData.username }}</span>
            </div>
          </div>
        </div>
        <div class="list1">
          <div class="list2">
            <div class="list4">
              <span class="listtitle">地址：</span>
              <span class="listtitle1">{{ xintableData.address }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">身份证号：</span>
              <span class="listtitle1">{{ xintableData.idCard }}</span>
            </div>
          </div>
          <div class="list3">
            <div class="list4">
              <span class="listtitle">身份证归属地：</span>
              <span class="listtitle1">{{ xintableData.idCardAddress }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">电话号码：</span>
              <span class="listtitle1">{{ xintableData.phone }}</span>
            </div>
          </div>
        </div>
        <div class="list1">
          <div class="list2">
            <div class="list4">
              <span class="listtitle">电话归属地：</span>
              <span class="listtitle1">{{ xintableData.phoneAddress }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">银行卡号：</span>
              <span class="listtitle1">{{ xintableData.bankCard }}</span>
            </div>
          </div>
          <div class="list3">
            <div class="list4">
              <span class="listtitle">通话时长：</span>
              <span class="listtitle1">{{ xintableData.talkTime }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">诈骗金额：</span>
              <span class="listtitle1">{{ xintableData.amount }}</span>
            </div>
          </div>
        </div>
        <div class="list1">
          <div class="list2">
            <div class="list4">
              <span class="listtitle">消息可信度：</span>
              <span class="listtitle1">{{ xintableData.reliability }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">推送单位：</span>
              <span class="listtitle1">{{ xintableData.pushUnit }}</span>
            </div>
          </div>
          <div class="list3">
            <div class="list4">
              <span class="listtitle">推送次数：</span>
              <span class="listtitle1">{{ xintableData.pushTime }}</span>
            </div>
            <div class="list5">
              <span class="listtitle">数据来源：</span>
              <span class="listtitle1">{{ xintableData.dataSource }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 截图 -->

    <el-dialog
      :title="jietutitle"
      :visible.sync="newkanjietu"
      width="45%"
      height="40%"
      :before-close="newkanjietuclose"
      :close-on-click-modal="false"
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
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import getRole from '@/utils/promission.js'
import yujingweifen from '@/utils/yujingweifenlei.js'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      newkanjietu: false,
      xinshi: false,
      jietutitle: '',
      jieURL: '',
      xianshititle: '暂无图片',
      heights: undefined,
      tableDatalist: [],
      loadingbuttext: '导出',
      loadingbut: false,
      xintableData: {
        //创建时间：
        createTime: '',
        //诈骗时间：
        fraudTime: '',
        //预警等级
        earlyGrade: '',
        //诈骗类型
        fraudType: '',
        //诈骗域名：
        fraudAddress: '',
        //诈骗地址所属国家：
        domainName: '',
        // 诈骗网站IP：
        fraudIp: '',
        // 诈骗网站端口：
        fraudPort: '',
        //受害人IP：
        userIp: '',
        // 受害人端口：
        userPort: '',
        // 受害人IP归属地：
        userIpAscription: '',
        // 用户名：
        username: '',
        // 地址：
        address: '',
        // 身份证号：
        idCard: '',
        // 身份证归属地：
        idCardAddress: '',
        // 电话号码：
        phone: '',
        // 电话归属地：
        phoneAddress: '',
        // 银行卡号：
        bankCard: '',
        // 通话时长：
        talkTime: '',
        // 诈骗金额：
        amount: '',
        // 消息可信度：
        reliability: '',
        // 推送单位：
        pushUnit: '',
        // 推送次数：
        pushTime: '',
        // 数据来源：
        dataSource: '',
      },
      xiangqing: false,
      isLoading: false,
      newdomainSimpleVo: {
        photo: null, //手机号
        dateValue_find: [
          dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
            ' ' +
            '00:' +
            '00:' +
            '00',
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
        ], //诈骗时间
        unit: null, //推送单位
        sourceType: null, //数据来源
        Warning: null, //预警等级
        fraud: null, //诈骗类型
        dateValue_find1: null, //图表时间
      },
      whiteSearchList1: {
        startCreateTime1: '',
        endCreateTime1: '',
      },
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
      formInline: {
        user: '',
        region: '',
      },
      tableData: [
        // {
        //   fraudTime: 'we',
        // },
      ],
      mypageable: {
        pageNo: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: '',
      selectData: {
        sourceTypeData: [{ value: '长安通信', label: '长安通信' }],
        WarningTypeData: [
          { value: '高危', label: '高危' },
          { value: '中危', label: '中危' },
          { value: '低危', label: '低危' },
        ],
        unitTypeData: [
          {
            value: '四川省成都市公安局刑警支队',
            label: '四川省成都市公安局刑警支队',
          },
        ],
        fraudypeData: [
          { value: '贷款', label: '贷款' },
          { value: '理财', label: '理财' },
          { value: '冒充客服', label: '冒充客服' },
          { value: '杀猪盘', label: '杀猪盘' },
          // { value: '冒充公检法', label: '冒充公检法' },
          { value: '冒充公检法', label: '冒充公检法' },
          { value: '刷单', label: '刷单' },
          { value: '游戏交易', label: '游戏交易' },
          { value: '其他类型诈骗', label: '其他类型诈骗' },
        ],
      },
      newqutest: [],
      newqutest1: [],
      newqutest2: [],
      newqutest3: [],
      newzhutest1: [],
      newzhutest2: [],
      newzhutest3: [],
      newzhutest4: [],
      newwarningStatisticsTypeList: [],
    }
  },
  created() {
    this.getTabData()
    // this.echartslist1()
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  mounted() {
    this.yangshi()
  },
  methods: {
    yangshi() {
      this.heights =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 270
      document.querySelector('#onetable .el-table__body tbody').style.height =
        (this.heights / 10) * 9 + 'px' // var rows = document.querySelectorAll('#onetable .el-table__row ') // // console.log( document.querySelectorAll('#onetable .el-table__row ')); // rows.forEach((item) => { //   item.style.height = Math.floor(this.heights / 11) + 'px' // })

      document.querySelector('#onetable .has-gutter tr ').style.height =
        Math.floor(this.heights / 11) + 'px' // // 监听浏览器高度变化，修改表格高度

      window.onresize = () => {
        this.heights =
          window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 270

        document.querySelector('#onetable .el-table__body tbody').style.height =
          (this.heights / 10) * 9 + 'px' // var rows = document.querySelectorAll('#onetable .el-table__row ') // rows.for

        document.querySelector('#onetable .has-gutter tr ').style.height =
          Math.floor(this.heights / 11) + 'px'
      }
    },

    getRole1(data) {
      return getRole(data)
      // console.log( getRole(data));
    },
    handleSelectionChange(val) {
      this.tableDatalist = val
    },
    //下载

    put() {
      this.loadingbuttext = '...加载中'
      this.loadingbut = true
      let getTabDataList = {
        earlyGrade: this.newdomainSimpleVo.Warning,
        endFraudTime: this.whiteSearchList.endCreateTime,
        fraudType: this.newdomainSimpleVo.fraud,
        newPage: this.mypageable,
        phoneNum: this.newdomainSimpleVo.photo,
        startFraudTime: this.whiteSearchList.startCreateTime,
      }
      this.$http({
        method: 'POST',
        url: '/warning_4g/download4GWarning',
        responseType: 'blob',
        data: getTabDataList,
      })
        .then((res) => {
          // const blob = new Blob([res.data], {
          //   type: 'application/vnd.ms-excel',
          // })
          //        const url = window.URL.createObjectURL(blob)
          // window.open(url, '_blank')

          // console.log(title);
          let that = this
          let blob = res.data
          if (blob.type == 'application/json') {
            const reader = new FileReader()

            reader.onload = function () {
              // const { msg } = JSON.parse(reader.result) //此处的msg就是后端返回的msg内容

              that.$message('下载文件失败')
              that.loadingbuttext = '导出'
              that.loadingbut = false
            }
            reader.readAsText(blob)
          } else {
            let title = dayjs().format('YYYYMMDD') + '-4G预警导出.xlsx'
            let binaryData = []
            binaryData.push(blob)
            let url = window.URL.createObjectURL(new Blob(binaryData), {
              type: 'application/vnd.ms-excel',
            })

            // 创建一个下载标签<a>
            const aLink = document.createElement('a')
            aLink.href = url

            // 2.直接使用自定义文件名,设置下载文件名称
            aLink.setAttribute('download', title)
            document.body.appendChild(aLink)

            // 模拟点击下载
            aLink.click()

            this.loadingbuttext = '导出'
            this.loadingbut = false
            // 移除改下载标签
            document.body.removeChild(aLink)
          }
        })
        .catch((err) => {
          // console.log(err)
          this.$message.error('文件下载失败！')
          this.loadingbuttext = '导出'
          this.loadingbut = false
        })
    },

    //曲线图++++++++++++++++++++++++++++++++++++1111
    // drawLine() {
    //   // eslint-disable-next-line camelcase
    //   var bar_qx = this.$refs.chart
    //   let myChart = this.$echarts.init(bar_qx)
    //   myChart.setOption(this.setOption1())
    // },
    // setOption1() {
    //   let option = {
    //     feature: {
    //       saveAsImage: {
    //         show: false,
    //       },
    //     },
    //     title: {},
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         lineStyle: {
    //           color: '#66B3FF',
    //         },
    //       },
    //     },
    //     color: ['#fac858', '#EE6666', '#91cc75'], //绿色  橙色
    //     legend: {
    //       data: [
    //         {
    //           name: '高',
    //           textStyle: {
    //             color: ['#fac858'],
    //           },
    //         },
    //         {
    //           name: '中',
    //           textStyle: {
    //             color: ['#EE6666'],
    //           },
    //           //  ["处置域名数", "域名访问量"]
    //         },
    //         {
    //           name: '低',
    //           textStyle: {
    //             color: ['#91cc75'],
    //           },
    //           //  ["处置域名数", "域名访问量"]
    //         },
    //       ],
    //     },
    //     grid: {
    //       y2: 140,
    //     },

    //     xAxis: {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: this.newqutest,

    //       axisLabel: {
    //         // rotate: -20,
    //         //  让x轴文字方向为竖向
    //         // interval: 0,
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: '#fff',
    //           width: 1,
    //         },
    //       },
    //     },

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
    //         name: '高',
    //         type: 'line',

    //         data: this.newqutest1,
    //         smooth: true,
    //       },
    //       {
    //         name: '中',
    //         type: 'line',

    //         data: this.newqutest2,
    //         smooth: true,
    //       },
    //       {
    //         name: '低',
    //         type: 'line',

    //         data: this.newqutest3,
    //         smooth: true,
    //       },
    //     ],
    //     dataZoom: [
    //       {
    //         id: 'dataZoomX',
    //         type: 'inside',
    //         xAxisIndex: [0],
    //         filterMode: 'none',
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
    //   }
    //   return option
    // },

    // 初始化数据
    async getTabData() {
      let getTabDataList = {
        earlyGrade: this.newdomainSimpleVo.Warning,
        endFraudTime: this.whiteSearchList.endCreateTime,
        fraudType: this.newdomainSimpleVo.fraud,
        newPage: this.mypageable,
        phoneNum: this.newdomainSimpleVo.photo,
        startFraudTime: this.whiteSearchList.startCreateTime,
      }
      const { data: res } = await this.$http.post(
        '/warning_4g/getWarning4GPage',
        getTabDataList
      )
      if (res.code == 200) {
        this.tableData = res.data.content
        let tableDataLength = this.tableData.length
        let timer = null
        timer ? clearTimeout(timer) : ''
        if (this.tableData.length < 10) {
          for (var i = this.tableData.length; i < 10; i++) {
            this.tableData.push({})
          }
        }
        if (tableDataLength < 10) {
          timer = setTimeout(() => {
            for (var i = tableDataLength; i < 10; i++) {
              document.querySelectorAll('#onetable tbody .el-checkbox')[
                i
              ].style.display = 'none'
            }
          })
        }
        this.total = res.data.totalElements
        this.totalPages = res.data.totalPages // }else{ //   this.$message('无数据') // }
      }
    },

    //查询
    searchTabData() {
      this.mypageable.pageNo = 1
      this.getTabData()
      // let getTabDataList = {
      //   warningSimpleVo: {
      //     pushUnit: this.newdomainSimpleVo.unit,
      //     dataSource: this.newdomainSimpleVo.sourceType,
      //     earlyGrade: this.newdomainSimpleVo.Warning,
      //     fraudType: this.newdomainSimpleVo.fraud,
      //   },
      //   warningTimeVo: {
      //     startFraudTime: this.whiteSearchList.startCreateTime,
      //     endFraudTime: this.whiteSearchList.endCreateTime,
      //   },
      //   mypageable: this.mypageable,
      // };

      // const { data: res } = await this.$http.post(
      //   "/warning/getWarning",
      //   getTabDataList
      // );
      // if (res.code == 200) {
      //   this.mypageable.pageNum = 1;
      //   // if (res.data.content.length > 0) {
      //   // console.log(res.data.content);
      //   this.tableData = res.data.content;
      //   this.total = res.data.totalElements;
      //   this.totalPages = res.data.totalPages;

      //   // } else {
      //   // this.mypageable.pageNum = 1;
      //   // this.mypageable.pageSize = 10;
      //   // this.getTabData();
      //   // }
      // } else {
      //   this.$message("无数据");
      //   this.mypageable.pageNum = 1;
      //   this.mypageable.pageSize = 10;
      //   this.getTabData();
      //   this.resetFun();
      // }
    },

    dataCreate_change1(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 = null
        this.whiteSearchList1.endCreateTime1 = null
      }
    },
    //诈骗时间
    dataCreate_change(val) {
      if (val && val != '') {
        this.whiteSearchList.startCreateTime = val[0]
        this.whiteSearchList.endCreateTime = val[1]
      } else {
        this.whiteSearchList.startCreateTime = null

        this.whiteSearchList.endCreateTime = null
      }
    },
    sourceType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.sourceType = null
      }
    },
    unitType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.unit = null
      }
    },
    WarningType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.Warning = null
      }
    },
    fraudType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.fraud = null
      }
    },
    //row-keys
    modelType1_photo(val) {
      if (val == '') {
        this.newdomainSimpleVo.uploadPerson = null
      }
    },
    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        photo: null,
        dateValue_find: null,
        sourceType: null,
        // sourceType: null,
        fraud: null,
        unit: null,
        Warning: null,
      }
      this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      }
      this.mypageable.pageNo = 1
      this.getTabData()
    },
    // 分页
    handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val
      this.getTabData()
    },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNo = val

      // console.log( this.mypageable.pageNum);
      this.getTabData()
    },

    // handleSelectionChange(val) {
    //   this.tableDatalist = val;
    // },
    getRowKeys(row) {
      return row.id
    },

    // 数据来源
    // shuzu(val){
    //   if(val=='1'){
    //     return '贷款'
    //   }
    //    else if(val=='2'){
    //     return '理财'
    //   }
    //   else  if(val=='3'){
    //     return '冒充客服'
    //   }
    //   else  if(val=='4'){
    //     return '杀猪盘'
    //   }
    //   else  if(val=='5'){
    //     return '冒充公检法'
    //   }
    //   else  if(val=='6'){
    //     return '刷单'
    //   }
    // }
    // shuzu(val) {
    //   if (val == '贷款') {
    //     return '贷款'
    //   } else if (val == '理财') {
    //     return '理财'
    //   } else if (val == '冒充电商客服') {
    //     return '冒充电商客服'
    //   } else if (val == '杀猪盘') {
    //     return '杀猪盘'
    //   } else if (val == '冒充公检法') {
    //     return '冒充公检法'
    //   } else if (val == '刷单') {
    //     return '刷单'
    //   } else if (val == '博彩/投资/交友') {
    //     return '博彩/投资/交友'
    //   }
    // },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
    async ckxq(val) {
      // console.log(val);
      let a = {
        id: val.toString(),
      }

      const { data: res } = await this.$http.post('/warning/showDetails', a)
      if (res.code == 200) {
        this.xintableData = res.data

        // console.log(this.xintableData);
        this.xiangqing = true
      }
    },
    handleClose1() {
      this.xiangqing = false
    },
    //查看截图
    jietu(userimg) {
      this.jietutitle = userimg
      this.imgtu(userimg)
      this.newkanjietu = true
    },
    //获取截图
    async imgtu(userimg) {
      const { data: res } = await this.$http.get('/warning_4g/getImage', {
        params: {
          domain: userimg,
     
        },
      })
      if (res.code == 200) {
        if (res.data != null) {
          this.xinshi = false
          this.jieURL = res.data
        } else {
          this.xinshi = true
        }
      }
    },
    smalltype(val) {
      var status = ''
      switch (val) {
        case 'kf_ds':
          status = '冒充电商客服'
          break
        case 'kf_wl':
          status = '冒充物流客服'
          break
        case 'kf_other':
          status = '冒充其他客服类'
          break
        case 'gjf_mc':
          status = '冒充公检法'
          break
        case 'gjf_gs':
          status = '工商平台类'
          break
        case 'gjf_etc':
          status = 'ETC通行卡'
          break
        case 'gjf_other':
          status = '其他政府机关或单位组织'
          break
        case 'sd_cz':
          status = '充值（红包）返利'
          break

        case 'dk_xyk':
          status = '虚假代办信用卡'
          break
        case 'dk_te':
          status = '虚假提额套现'
          break
        case 'dk_dk':
          status = '虚假贷款'
          break
        case 'dk_other':
          status = '其他贷款类'
          break
        case 'szp_lc':
          status = '虚假投资理财类'
          break
        case 'szp_dubo':
          status = '博彩彩票'
          break
        case 'szp_ty':
          status = '体育直播，比分竞猜'
          break
        case 'szp_yx':
          status = '棋牌游戏'
          break
        case 'ds_gw':
          status = '虚假购物'
          break
        case 'ds_fw':
          status = '虚假服务'
          break
        case 'ds_other':
          status = '其他电商类'
          break
        case 'jy_jr':
          status = '冒充外国军人'
          break
        case 'jy_hl':
          status = '网络婚恋'
          break
        case 'jy_jy':
          status = '网络交友，聊天交友'
          break
        case 'jy_other':
          status = '其他交友类'
          break
        case 'zx_xyd':
          status = '消除校园贷记录'
          break
        case 'zx_bljl':
          status = '消除不良记录'
          break
        case 'zx_other':
          status = '其他征信'
          break
        case 'mc_ld':
          status = '冒充领导'
          break
        case 'mc_sr':
          status = '冒充熟人'
          break
        case 'mc_gz':
          status = '冒充公众人物'
          break
        case 'mc_other':
          status = '冒充其他身份类'
          break
        case 'yx_card':
          status = '游戏币、游戏点卡诈骗'
          break
        case 'yx_zhzb':
          status = '游戏账号、游戏装备诈骗'
          break
        case 'yx_other':
          status = '其他游戏产品虚假交易'
          break
        case 'other_zj':
          status = '虚假中奖诈骗'
          break
        case 'other_zp':
          status = '虚假招聘'
          break
        case 'other_jp':
          status = '机票退改签诈骗'
          break
        case 'other_tp':
          status = 'ps图片诈骗'
          break
        case 'jjgw':
          status = '冒充军警购物诈骗'
          break
        case 'app_ff':
          status = '分发平台'
          break
        case 'xzym':
          status = '下载页面'
          break
        case 'hc_fw':
          status = '灰产服务'
          break
        case 'hc_other':
          status = '灰产其他'
          break
        case 'hc':
          status = '灰产'
          break
        case 'kf':
          status = '冒充客服类'
          break
        case 'gjf':
          status = '冒充公检法类'
          break
        case 'sd':
          status = '刷单返利类'
          break
        case 'dk':
          status = '贷款代办信用卡类'
          break
        case 'jjgw':
          status = '冒充军警购物诈骗'
          break
        case 'szp':
          status = '杀猪盘'
          break
        // case 'DS':
        //   status = '电商类诈骗'
        //   break
        case 'jy':
          status = '网络婚恋、交友类'
          break
        case 'zx':
          status = '虚假征信类'
          break
        case 'mc':
          status = '冒充领导、熟人类'
          break
        case 'yx':
          status = '网络游戏产品虚假交易类'
          break
        case 'other':
          status = '其他类型诈骗'
          break
        case 'app':
          status = '分发平台'
          break
        case 'xzym':
          status = '下载页面'
          break

        default:
          status = val
          break
      }
      return status
    },
  },
}
</script>

<style scoped lang='less'>
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
  height: 0;
  /* // 将高度修改为0 */
}
// 点击变黑
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
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
.right {
  width: 40%;
  height: 10rem;
  background-color: #07293f;
  // float: right;
  // padding: 1.25rem /* 20/16 */ /* 50/16 */ 3.125rem /* 100/16 */;
  box-sizing: border-box;
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
.qwqw {
  margin-top: 10px;
  border: 1px solid transparent !important;
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
// .bg {
//   border: 1px solid #1c7aa8;
//   // border-radius: .625rem /* 10/16 */;
//   padding: 0.625rem /* 10/16 */ /* 20/16 */;
//   background-color:rgb(1, 29, 58,.9) ;
//   opacity: .9;
//   // background: url(../assets/img/list/zhongkuang.png) no-repeat;
//   // background-size: 100%;
// }

.xiangqinglist {
  // background-color: red;
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  .list1 {
    // flex-flow: column;
    height: 90px;
    width: 100%;
    // background-color: #fff;
    margin-top: 10px;
    margin-bottom: 5px;
    .list2 {
      width: 100%;
      height: 50%;
      background: url(../assets/img/shouye/矩形.png) no-repeat;
      background-size: 100% 100%;
    }
    .list3 {
      width: 100%;
      height: 50%;
      // background-color: blue;
      background: url(../assets/img/shouye/边框.png) no-repeat;
      background-size: 100% 100%;
    }
    .list4 {
      width: 57%;
      height: 100%;
      float: left;
      align-items: center;
      display: -webkit-flex;
    }
    .list5 {
      width: 43%;
      height: 100%;
      float: left;
      align-items: center;
      display: -webkit-flex;
    }
    .listtitle {
      font-size: 12px;
      color: #94a4a7;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .listtitle1 {
      font-size: 12px;
      color: #fff;
    }
  }
}

// 弹窗
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  opacity: 0.9;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 5px !important;
    right: 10px !important;
    .el-dialog__close {
      color: #fff;
      font-size: 14px;
    }
  }
  .el-dialog__header {
    margin: 20px 20px 0px 20px;
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
.list_xia {
  padding-bottom: 20px;
  background-color: rgba(8, 38, 61, 0.6);
}
.bottom {
  width: 100%;
  height: 40px /* 60/16 */ /* 40/16 */;
  background-color: rgba(11, 48, 78, 0.5);
  padding-bottom: 1%;
}
.nes {
  width: 200px;
}
.dianji {
  cursor: pointer;
}
.xinashititle {
  width: 100px;
  height: 20px;
  margin: 0 auto;
}
</style>


