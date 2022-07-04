<template>
  <!-- 长安发现 -->
  <!-- 长安发现 -->
  <!-- 长安发现 -->
  <div class="right_main_under">
    <Navlist></Navlist>

    <div class="search_select_form bg">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- 发现日期 -->
          <el-form-item label="发现日期">
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
          <!-- URL -->
          <el-form-item label="URL">
            <el-input
              v-model.trim="newdomainSimpleVo.url"
              placeholder="url"
            ></el-input>
          </el-form-item>
          <!-- 来源 -->

          <el-form-item label="来源">
            <el-select
              class="el-input-width changdu"
              v-model.trim="newdomainSimpleVo.source"
              placeholder="来源"
              clearable
              @clear="modelType1_clearFun(newdomainSimpleVo.source)"
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

          <!-- 诈骗大类 -->
          <el-form-item label="类型">
            <el-cascader
              ref="cascader"
              v-model.trim="newdomainSimpleVo.type"
              :options="options"
              :props="{
                checkStrictly: true, //      1、设置父子节点取消选中关联，从而达到选择任意一级选项的目的。
                expandTrigger: 'hover', //2、expandTrigger:'hover' 解决使用懒加载因为有遮罩层，而无法点击文字选择下一层问题。
              }"
              :show-all-levels="false"
              @change="handleChange"
              clearable
            ></el-cascader>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="el-button-chaxun"
              size="mini"
              @click.native.stop="searchTabData"
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
              @click.native="put"
              :loading="loadingbut"
              v-if="getRole1('downloadRaw')"
              :disabled="this.tableData.length == 0"
              >{{ loadingbuttext }}</el-button
            >

            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>
    <!-- //列表 -->
    <Err v-if="errFlag"></Err>
    <!-- <div class="list_xia"> -->
    <el-table
      :row-class-name="tableRowClassName"
      :row-key="getRowKeys"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      :height="heights"
      id="onetable"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column
        type="selection"
        width="55"
        :reserve-selection="true"
      ></el-table-column> -->

      <el-table-column label="发现日期" prop="discoverDate">
        <!-- min-width="10%" -->
      </el-table-column>
      <el-table-column label="URL" prop="url" show-overflow-tooltip>
        <template slot-scope="scope">
          <div
            class="dianji"
            v-if="scope.row.url"
            @click="jietu(scope.row.discoverDate, scope.row.imageName)"
            :title="clicktitle"
          >
            {{ scope.row.url }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="来源" prop="dataSource">
        <template slot-scope="scope">
          <div v-if="scope.row.dataSource">
            {{ scope.row.dataSource == 'CA' ? '长安' : '4G' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="诈骗大类" prop="type">
        <template slot-scope="scope">
          {{ bigtype(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="诈骗小类" prop="category">
        <template slot-scope="scope">
          {{ smalltype(scope.row.category) }}
        </template>
      </el-table-column>
      <el-table-column label="访问量" prop="visits"> </el-table-column>
      <el-table-column label="截图名称" prop="imageName" v-if="xianshi">
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
          layout="total, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>
    <!-- </div> -->

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
import Err from '@/components/err.vue'
import dayjs from 'dayjs'
export default {
  // inject: ["reload"],
  name: 'search',
  components: {},
  data() {
    return {
      heights: undefined,
      errFlag: false,
      xianshi: false,
      errFlagTimer: undefined,
      loadingbuttext: '导出',
      loadingbut: false,
      loading: true,
      gridData: [
        // {
        //   sourceIp:12009
        // }
      ],
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
      isLoading: false,

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
        ],
        // [
        //   dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
        //     ' ' +
        //     '00:' +
        //     '00:' +
        //     '00',
        //   dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
        // ],
        //发现日期
        url: null, //URL
        source: null, //来源
        type: null, //诈骗大类
        typesmall: null, //诈骗小类
        typebig: null,
      },

      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },

      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      mypageable1: {
        pageNum1: 1,
        pageSize1: 10,
      },
      total1: 1,
      total: 1,
      totalPages: '',
      totalPages1: '',
      newkanjietu: false,
      jietutitle: '',
      jieURL: '',
      xianshititle: '暂无图片',
      clicktitle: '点击查看图片',
      xinshi: false,
      //下拉框的选项数据
      options: [
        {
          value: 'KF',
          label: '冒充客服类',
          children: [
            {
              value: 'kf_ds',
              label: '冒充电商客服',
            },
            {
              value: 'kf_wl',
              label: '冒充物流客服',
            },
            {
              value: 'kf_other',
              label: '冒充其他客服类',
            },
          ],
        },
        {
          value: 'GJF',
          label: '冒充公检法类',
          children: [
            {
              value: 'gjf_mc',
              label: '冒充公检法',
            },
            {
              value: 'gjf_gs',
              label: '工商平台类',
            },
            {
              value: 'gjf_etc',
              label: 'ETC通行卡',
            },
            {
              value: 'gjf_other',
              label: '其他政府机关或单位组织',
            },
          ],
        },
        {
          value: 'SD',
          label: '刷单返利类',
          children: [
            {
              value: 'sd_cz',
              label: '充值（红包）返利',
            },
          ],
        },
        {
          value: 'DK',
          label: '贷款代办信用卡类',
          children: [
            {
              value: 'dk_xyk',
              label: '虚假代办信用卡',
            },
            {
              value: 'dk_te',
              label: '虚假提额套现',
            },
            {
              value: 'dk_dk',
              label: '虚假贷款',
            },
            {
              value: 'dk_other',
              label: '其他贷款类',
            },
          ],
        },
        {
          value: 'JJGW',
          label: '冒充军警购物诈骗',
          children: [
            {
              value: 'JJGW',
              label: '冒充军警购物诈骗',
            },
          ],
        },
        {
          value: 'SZP',
          label: '杀猪盘',
          children: [
            {
              value: 'szp_lc',
              label: '虚假投资理财类',
            },
            {
              value: 'szp_dubo',
              label: '博彩彩票',
            },
            {
              value: 'szp_ty',
              label: '体育直播，比分竞猜',
            },
            {
              value: 'szp_yx',
              label: '棋牌游戏',
            },
          ],
        },

        {
          value: 'JY',
          label: '网络婚恋、交友类',
          children: [
            {
              value: 'jy_jr',
              label: '冒充外国军人',
            },
            {
              value: 'jy_hl',
              label: '网络婚恋',
            },
            {
              value: 'jy_jy',
              label: '网络交友，聊天交友',
            },
            {
              value: 'jy_other',
              label: '其他交友类',
            },
          ],
        },
        {
          value: 'ZX',
          label: '虚假征信类',
          children: [
            {
              value: 'zx_xyd',
              label: '消除校园贷记录',
            },
            {
              value: 'zx_bljl',
              label: '消除不良记录',
            },
            {
              value: 'zx_other',
              label: '其他征信',
            },
          ],
        },
        {
          value: 'MC',
          label: '冒充领导、熟人类',
          children: [
            {
              value: 'mc_ld',
              label: '冒充领导',
            },
            {
              value: 'mc_sr',
              label: '冒充熟人',
            },
            {
              value: 'mc_gz',
              label: '冒充公众人物',
            },
            {
              value: 'mc_other',
              label: '冒充其他身份类',
            },
          ],
        },
        {
          value: 'YX',
          label: '网络游戏产品虚假交易类',
          children: [
            {
              value: 'yx_card',
              label: '游戏币、游戏点卡诈骗',
            },
            {
              value: 'yx_zhzb',
              label: '游戏账号、游戏装备诈骗',
            },
            {
              value: 'yx_other',
              label: '其他游戏产品虚假交易类',
            },
          ],
        },
        {
          value: 'OTHER',
          label: '其他类型诈骗',
          children: [
            {
              value: 'other_zj',
              label: '虚假中奖诈骗',
            },
            {
              value: 'other_zp',
              label: '虚假招聘',
            },
            {
              value: 'other_tp',
              label: 'ps图片诈骗',
            },
            {
              value: 'other_jp',
              label: '机票退改签诈骗',
            },
          ],
        },
        {
          value: 'APP',
          label: '分发平台',
          children: [
            {
              value: 'app_ff',
              label: '分发平台',
            },
          ],
        },
        {
          value: 'XZYM',
          label: '下载页面',
          children: [
            {
              value: 'xzym',
              label: '下载页面',
            },
          ],
        },
        {
          value: 'HC',
          label: '灰产',
          children: [
            {
              value: 'hc_fw',
              label: '灰产服务',
            },
            {
              value: 'hc_other',
              label: '灰产其他',
            },
            {
              value: 'hc',
              label: '灰产',
            },
            // {
            //   value: 'hc_gw',
            //   label: '虚假购物',
            // },
            // {
            //   value: 'hc_fw',
            //   label: '虚假服务',
            // },
            // {
            //   value: 'hc_other',
            //   label: '其他电商类',
            // },
          ],
        },
      ],

      selectData: {
        sourceTypeData: [
          { value: 'CA', label: '长安' },
          { value: 'YC', label: '4G' },
        ],

        fraudypeData: [
          { value: 'DK', label: '贷款代办信用卡类' },
          { value: 'SD', label: '刷单返利类' },
          { value: 'GJF', label: '冒充公检法类' },

          // { value: "GW", label: "网络购物" },
          { value: 'OTHER', label: '其他类型诈骗' },
          { value: 'KF', label: '冒充客服类' },
          { value: 'JJGW', label: '冒充军警购物诈骗' },
          { value: 'SZP', label: '杀猪盘' },
          { value: 'DS', label: '电商类诈骗' },
          { value: 'JY', label: '网络婚恋、交友类' },
          { value: 'ZX', label: '虚假征信类' },
          { value: 'MC', label: '冒充领导、熟人类' },
          { value: 'YX', label: '网络游戏产品虚假交易类' },
          { value: 'APP', label: '分发平台' },
          { value: 'XZYM', label: '下载页面' },
        ],
      },
      tableData: [
        // {
        //   url: "www.baidu.com11",
        //   visits: "100",
        // },
      ],
      tableDatalist: [],

      newurl: '',
      arr: [],
      yuming: '',
    }
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
    Err: Err,
  },

  computed: {},
  created() {
    this.getTabData()
  },
  mounted() {
    this.yangshi()
    // setInterval(function () {
    // document
    //   .querySelectorAll('.el-cascader-panel .el-radio ')
    //   .forEach((val) => {
    //     val.style.display = 'none'
    //   })
    // }, 10)

    // console.log();
    //层级下拉框
    setInterval(function () {
      document.querySelectorAll('.el-cascader-node__label').forEach((el) => {
        el.onclick = function () {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
  },
  methods: {
    yangshi() {
      this.heights =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 270
      document.querySelector('#onetable .el-table__body tbody').style.height =
        ((this.heights - 5) / 10) * 9 + 'px' // var rows = document.querySelectorAll('#onetable .el-table__row ') // // console.log( document.querySelectorAll('#onetable .el-table__row ')); // rows.forEach((item) => { //   item.style.height = Math.floor(this.heights / 11) + 'px' // })

      document.querySelector('#onetable .has-gutter tr ').style.height =
        Math.floor(this.heights / 11) + 'px' // // 监听浏览器高度变化，修改表格高度

      window.onresize = () => {
        this.heights =
          window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 270

        document.querySelector('#onetable .el-table__body tbody').style.height =
          ((this.heights - 5) / 10) * 9 + 'px' // var rows = document.querySelectorAll('#onetable .el-table__row ') // rows.for
      }
    },
    //查看截图
    jietu(time, userimg) {
      this.jietutitle = userimg
      this.imgtu(time, userimg)
      this.newkanjietu = true
    },
    //获取截图
    async imgtu(time, userimg) {
      const { data: res } = await this.$http.get('/discover/getImage', {
        params: {
          imageName: userimg,
          disDate: dayjs(time).format('YYYY/MM/DD'),
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
    newkanjietuclose() {
      this.newkanjietu = false
    },
    //层级下拉框
    handleChange(val) {
      //  //地区选择之后将下拉框界面收起
      if (this.newdomainSimpleVo.type != null) {
        this.$refs.cascader.toggleDropDownVisible()
        if (this.newdomainSimpleVo.type.length > 1) {
          this.newdomainSimpleVo.typesmall = this.newdomainSimpleVo.type[1]
          this.newdomainSimpleVo.typebig = null
        } else {
          this.newdomainSimpleVo.typebig = this.newdomainSimpleVo.type[0]
          this.newdomainSimpleVo.typesmall = null
        }
      }
    },
    getRole1(data) {
      return getRole(data)
      // console.log( getRole(data));
    },
    //初始化获取数据
    async getTabData() {
      let getlist = {
        discoverTimeDTO: {
          startTime: this.whiteSearchList.startCreateTime,
          endTime: this.whiteSearchList.endCreateTime,
        },

        pageable: this.mypageable,
        sourceEnum: this.newdomainSimpleVo.source,
        type: this.newdomainSimpleVo.typebig,
        url: this.newdomainSimpleVo.url,
        category: this.newdomainSimpleVo.typesmall,
      }

      const { data: res } = await this.$http.post(
        '/discover/getDiscoverPage',
        getlist
      )
      // console.log(res);
      if (res.code == 200) {
        // if(res.data.content.length>0){
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
    async searchTabData() {
      this.mypageable.pageNum = 1
      this.getTabData()
      // this.getTabData()
      // this.resetFun()
      // let getlist = {
      //   startDiscoverDate: this.whiteSearchList.startCreateTime,
      //   endDiscoverDate: this.whiteSearchList.endCreateTime,
      //   mypageable: this.mypageable,
      //   // url: this.newdomainSimpleVo.domain,
      //   type: this.newdomainSimpleVo.domain,
      //   visits: this.newdomainSimpleVo.visits,
      // }
      // const { data: res } = await this.$http.post(
      //   '/discover/getDiscover',
      //   getlist
      // )
      // // console.log(res);
      // if (res.code == 200) {
      //   this.mypageable.pageNum = 1
      //   this.tableData = res.data.content
      //   this.total = res.data.totalElements
      //   this.totalPages = res.data.totalPages
      // } else {
      //   this.$message('无数据')
      //   this.mypageable.pageNum = 1
      //   this.mypageable.pageSize = 10
      //   this.getTabData()
      //   this.resetFun()
      // }
    },

    //重置方法
    resetFun() {
      this.newdomainSimpleVo.dateValue_find = null
      this.newdomainSimpleVo = {
        domain: null, //域名
        dateValue_find: null, //时间
      }
      ;(this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      }),
        this.getTabData()
    },
    handleSelectionChange(val) {
      this.tableDatalist = val
    },

    // newput() {
    //   if (this.tableDatalist.length == 0) {
    //     this.$confirm(
    //       '您可以对数据进行勾选下载，若要下载全部发现数据点击确定?',
    //       '提示',
    //       {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //       }
    //     )
    //       .then(async () => {
    //         this.put()
    //       })
    //       .catch(() => {
    //         this.$message('已取消')
    //       })
    //   } else {
    //     this.put()
    //   }
    // },
    //下载   //文件流
    async put() {
      // console.log(this.tableDatalist)
      // if (this.tableDatalist.length > 0) {
      // let arr = []
      // this.tableDatalist.forEach((item) => {
      //   arr.push(item.id)
      // })
      let getlist = {
        discoverTimeDTO: {
          startTime: this.whiteSearchList.startCreateTime,
          endTime: this.whiteSearchList.endCreateTime,
        },

        pageable: this.mypageable,
        sourceEnum: this.newdomainSimpleVo.source,
        type: this.newdomainSimpleVo.typebig,
        url: this.newdomainSimpleVo.url,
        category: this.newdomainSimpleVo.typesmall,
      }
      this.loadingbuttext = '...加载中'
      this.loadingbut = true
      this.$http({
        method: 'POST',
        url: '/discover/downloadDiscover',
        responseType: 'blob',
        data: getlist,
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
            let title = dayjs().format('YYYYMMDD') + '发现导出.xlsx'

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

      // const { data: res } = await this.$http.post(
      //   '/discover/downloadDiscover',
      //   getlist
      // )

      // if (res.code == 200) {
      //   this.loadingbuttext = '导出'
      //   this.loadingbut = false
      //   let newurl = res.expandData.url
      //   let eleLink = document.createElement('a')
      //   eleLink.download = name
      //   // const down = window.location.origin
      //   // eleLink.href = "http://172.31.1.61:8080" + newurl;
      //   // const down = window.location.origin
      //   eleLink.href = newurl
      //   // console.log(eleLink);
      //   eleLink.click()
      //   eleLink.remove()
      //   this.$refs.multipleTable.clearSelection()
      // } else {
      //   this.$message(res.message)
      // }
      // }
      //  else {
      //   // this.$message('请勾选')
      //   this.errFlag = true
      //   clearTimeout(this.errFlagTimer)
      //   this.errFlagTimer = setTimeout(() => {
      //     this.errFlag = false
      //   }, 2000)
      //   // this.err
      // }
    },
    //访问量
    // async fangwenl(val) {
    //   this.gridData = []
    //   this.loading = true
    //   this.yuming = val.url
    //   this.arr.push(val.id)
    //   this.dialogTableVisible = true
    //   let list = {
    //     mypageable: {
    //       pageNum: this.mypageable1.pageNum1,
    //       pageSize: this.mypageable1.pageSize1,
    //     },
    //     masterIds: this.arr,
    //     endDiscoverTime: null,
    //     startDiscoverTime: null,
    //   }
    //   const { data: res } = await this.$http.post('/discover/getRawData', list)
    //   if (res.code == 200) {
    //     this.loading = false
    //     this.gridData = res.data.content
    //     this.total1 = res.data.totalElements
    //     this.totalPages1 = res.data.totalPages
    //   }
    // },
    handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val
      this.getTabData()
    },
    // async   handleSizeChange1(val) {
    //   // console.log(val);
    //   this.mypageable1.pageSize1 = val;
    //   // this.fangwenl();
    //    let list={
    //  mypageable:{
    //    pageNum:this.mypageable1.pageNum1,
    //    pageSize:this.mypageable1.pageSize1
    //  },

    //  masterIds:this.arr,
    //  endDiscoverTime: null,
    //  startDiscoverTime: null,
    //   }
    //   const {data:res}= await this.$http.post('/discover/getRawData',list)
    //   if(res.code==200){
    //     this.gridData=res.data.content
    //       this.total1 = res.data.totalElements;
    //     this.totalPages1 = res.data.totalPages;
    //   }
    // },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNum = val

      // console.log( this.mypageable.pageNum);
      this.getTabData()
    },
    async handleCurrentChange1(val) {
      this.gridData = []
      this.loading = true
      this.mypageable1.pageNum1 = val

      // console.log( this.mypageable.pageNum);
      // this.fangwenl();
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        masterIds: this.arr,
        endDiscoverTime: null,
        startDiscoverTime: null,
      }
      const { data: res } = await this.$http.post('/discover/getRawData', list)
      if (res.code == 200) {
        this.loading = false
        this.gridData = res.data.content
        this.total1 = res.data.totalElements
        this.totalPages1 = res.data.totalPages
      }
    },
    modelType1_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.source = null
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
    // handleClose(done) {
    //   this.mypageable1.pageNum1 = 1
    //   this.arr = []
    //   this.dialogTableVisible = false
    // },
    //    eldialogout() {
    //   (this.isShow = false), this.$refs.multipleTable.clearSelection(); //清除选中的数据
    // },
    getRowKeys(row) {
      return row.id
    },
    bigtype(val) {
      var status = ''
      switch (val) {
        case 'KF':
          status = '冒充客服类'
          break
        case 'GJF':
          status = '冒充公检法类'
          break
        case 'SD':
          status = '刷单返利类'
          break
        case 'DK':
          status = '贷款代办信用卡类'
          break
        case 'JJGW':
          status = '冒充军警购物诈骗'
          break
        case 'SZP':
          status = '杀猪盘'
          break
        // case 'DS':
        //   status = '电商类诈骗'
        //   break
        case 'JY':
          status = '网络婚恋、交友类'
          break
        case 'ZX':
          status = '虚假征信类'
          break
        case 'MC':
          status = '冒充领导、熟人类'
          break
        case 'YX':
          status = '网络游戏产品虚假交易类'
          break
        case 'OTHER':
          status = '其他类型诈骗'
          break
        case 'APP':
          status = '分发平台'
          break
        case 'XZYM':
          status = '下载页面'
          break
        case 'HC':
          status = '灰产'
          break
        default:
          status = val
          break
      }
      return status
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

    zP(val) {
      if (val == 'DK') {
        return '贷款代办信用卡类'
      } else if (val == 'SD') {
        return '刷单返利类'
      } else if (val == 'GJF') {
        return '冒充公检法类'
      } else if (val == 'KF') {
        return '冒充客服类'
      } else if (val == 'OTHER') {
        return '其他类型诈骗'
      } else if (val == 'JJGW') {
        return '冒充军警购物诈骗'
      } else if (val == 'SZP') {
        return '杀猪盘'
      } else if (val == 'DS') {
        return '电商类诈骗'
      } else if (val == 'JY') {
        return '网络婚恋、交友类'
      } else if (val == 'ZX') {
        return '虚假征信类'
      } else if (val == 'MC') {
        return '冒充领导、熟人类'
      } else if (val == 'YX') {
        return '网络游戏产品虚假交易类'
      } else if (val == 'APP') {
        return '分发平台'
      } else if (val == 'XZYM') {
        return '下载页面'
      } else {
        return val
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
    // 转ip
    zhuanip(num) {
      var str
      var tt = new Array()
      tt[0] = (num >>> 24) >>> 0
      tt[1] = ((num << 8) >>> 24) >>> 0
      tt[2] = (num << 16) >>> 24
      tt[3] = (num << 24) >>> 24
      str =
        String(tt[0]) +
        '.' +
        String(tt[1]) +
        '.' +
        String(tt[2]) +
        '.' +
        String(tt[3])
      return str
    },
  },
}
</script>

<style  scoped lang='less'>
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
  background-color: #192d45 !important;
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

.bottom1 {
  width: 100%;
  height: 50px /* 60/16 */ /* 40/16 */;

  box-sizing: border-box;
  .ss1 {
    float: right;
    margin-right: 46px /* 46/16 */;
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
  // border-top: 1px solid #596168;
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
}
#bar_qx {
  height: 10rem /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
  margin-left: 0.625rem /* 10/16 */ /* 20/16 */;
}
#bar_zz {
  height: 10rem /* 200/16 */;
  // margin-left: 1.875rem /* 30/16 */ /* 20/16 */;
  margin-left: 0.625rem;
}
.right {
  width: 40%;
  height: 10rem;

  // float: right;
  // padding: 1.25rem /* 20/16 */ /* 50/16 */ 3.125rem /* 100/16 */;
  box-sizing: border-box;
  background-color: #07293f;
}
.el-table__body /deep/ .el-button--mini {
  color: #fff;
}
// .el-table::before {
//   height: 10px;
// }
// .dialogInfo /deep/ .el-table__row {
//   height: 40px !important;
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
// .bg {
//   border: 1px solid #1c7aa8;
//   // border-radius: .625rem /* 10/16 */;
//   padding: 0.625rem /* 10/16 */ /* 20/16 */;
//   background-color:rgb(1, 29, 58,.9) ;
//   opacity: .9;
//   // background: url(../assets/img/list/zhongkuang.png) no-repeat;
//   // background-size: 100%;
// }
/*alert 成功弹出框样式*/
// .dialogInfo /deep/ .el-dialog {
//   background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
//   background-size: 100% 100%;
//   padding: 10px;
//   opacity: 0.85;
//   box-sizing: border-box;
//   .el-dialog__headerbtn {
//     top: 8px !important;
//     .el-dialog__close {
//       color: #fff;
//       font-size: 16px;
//     }
//   }
//   .el-dialog__header {
//     margin: 20px 50px 0px 40px;
//     background: url(../assets/img/shouye/标题矩形.png) no-repeat;
//     background-size: 100% 100%;
//   }
//   .el-dialog__title,
//   .gailan h3,
//   .gailan1 h3 {
//     color: #2fbcfc;
//   }
//   .gailan h3,
//   .gailan1 h3 {
//     padding-left: 10px;
//   }
// }
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
  // background-color: #23749c;
  background-color: #7f8a96 !important;
}
.list_xia {
  padding-bottom: 20px;
  background-color: rgba(8, 38, 61, 0.6);
}

/* 修改表格的滚动条*/
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

/* 表格滚动条的滑块*/
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #7f8a96 !important;
  //  background-color: #7f8a96;
  border-radius: 3px;
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
