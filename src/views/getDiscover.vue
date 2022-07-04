<template>
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
          <!-- 手机号码 -->
          <el-form-item label="手机号码">
            <el-input
              v-model.trim="newdomainSimpleVo.domain"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
          <!-- 源IP -->
          <el-form-item label="源IP">
            <el-input
              v-model.trim="newdomainSimpleVo.ip"
              placeholder="源IP"
            ></el-input>
          </el-form-item>
          <!-- url -->
          <el-form-item label="域名">
            <el-input
              v-model.trim="newdomainSimpleVo.url"
              placeholder="域名"
            ></el-input>
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
      width="100%"
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
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column
        label="发现日期"
        prop="captureTime"
        width="120"
        show-overflow-tooltip
      >
        <!-- min-width="10%" -->
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="phone"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column label="类型" prop=""> </el-table-column> -->
      <el-table-column label="Imisi" prop="imis" width="120"> </el-table-column>
      <el-table-column label="源IP" prop="sourceIp" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.sourceIp">
            {{ zhuanip(scope.row.sourceIp) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="目标IP" prop="targetIp" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.targetIp">
            {{ zhuanip(scope.row.targetIp) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="源端口" prop="sourcePort" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="目的端口" prop="targetPort" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="域名" prop="domain" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="经度" prop="longitude" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="纬度" prop="latitude" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="基站号" prop="baseStation" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="上网人姓名" prop="onlineName" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="上网人地" prop="address" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="host名称" prop="hostName" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="用户名" prop="userName" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="密码" prop="passWord" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="url" prop="url" width="120" show-overflow-tooltip>
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
          layout=" prev,  next, jumper"
          
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>
    <!-- </div> -->

    <!-- 访问量 -->

    <el-dialog
      :title="'访问详情——' + this.yuming"
      :visible.sync="dialogTableVisible"
      class="dialogInfo"
      width="75%"
      height="500px"
      style="color: #fff"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <!--  -->
      <el-table
        height="300px"
        :row-class-name="tableRowClassName"
        :data="gridData"
        class="tableStyle"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-loading="loading"
        :row-style="{ height: 0 }"
        :cell-style="{ padding: 0 }"
      >
        <el-table-column prop="discoverTime" label="访问时间"></el-table-column>
        <el-table-column label="源IP">
          <template slot-scope="scope">
            {{ zhuanip(scope.row.sourceIp) }}
          </template>
        </el-table-column>
        <el-table-column prop="sourcePort" label="源端口"></el-table-column>
        <el-table-column prop="sourceAddress" label="归属地"></el-table-column>
        <el-table-column label="目标IP">
          <template slot-scope="scope">
            {{ zhuanip(scope.row.targetIp) }}
          </template>
        </el-table-column>
        <el-table-column prop="targetPort" label="目标端口"></el-table-column>
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
      errFlag: false,
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
        startCreateTime:dayjs().format('YYYY-MM-DD') +' '+ '00:' +
            '00:' +
            '00'
      ,
          // dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          // ' ' +
          // '00:' +
          // '00:' +
          // '00',  往前一个月
        endCreateTime:
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
      },
      isLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: '',
        region: '',
      },
      newdomainSimpleVo: {
                dateValue_find: [ dayjs().format('YYYY-MM-DD') +' '+ '00:' +
            '00:' +
            '00'
      ,
          dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
        ],
          //  dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
          //   ' ' +
          //   '00:' +
          //   '00:' +
          //   '00'  //往前一个月
        //发现日期
        domain: null, //手机号码
        visits: null, //部署
        ip: null, //源IP
        url: null, //url
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
        ],
        fraudypeData: [
          { value: 'DK', label: '贷款' },
          { value: 'SD', label: '刷单返利类' },
          { value: 'GJF', label: '冒充公检法及政府机关类' },

          // { value: "GW", label: "网络购物" },
          { value: 'QT', label: '其他类型诈骗' },
          { value: 'GW', label: '冒充电商客服类' },
          { value: 'JJGW', label: '冒充军警购物诈骗' },
          { value: 'SZP', label: '杀猪盘' },
          { value: 'DS', label: '虚假购物/服务类' },
          { value: 'JY', label: '网络婚恋/交友类(非杀猪盘类)' },
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
      heights: undefined,
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
    // this.meiju()
  },
  methods: {
    // async  meiju(){
    //     const{data:res}=await this.$http.get('/discover/getTypeEnum')
    //     if(res.code==200){
    //       console.log(res.data);
    //     }
    //   },
    yangshi() {
      this.heights =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 270
      document.querySelector('#onetable .el-table__body tbody').style.height =
        ((this.heights - 5) / 10) * 8 + 'px' // var rows = document.querySelectorAll('#onetable .el-table__row ') // // console.log( document.querySelectorAll('#onetable .el-table__row ')); // rows.forEach((item) => { //   item.style.height = Math.floor(this.heights / 11) + 'px' // })

      document.querySelector('#onetable .has-gutter tr ').style.height =
        Math.floor(this.heights / 11) + 'px' // // 监听浏览器高度变化，修改表格高度

      window.onresize = () => {
        this.heights =
          window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 270

        document.querySelector('#onetable .el-table__body tbody').style.height =
          ((this.heights - 5) / 10) * 9 + 'px' // var rows = document.querySelectorAll('#onetable .el-table__row ') // rows.for
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

        customPageable: this.mypageable,
        ip: this.newdomainSimpleVo.ip,
        phone: this.newdomainSimpleVo.domain,
        domain: this.newdomainSimpleVo.url,
      }
      const { data: res } = await this.$http.post(
        '/discover/getRawPage',
        getlist
      )
      // console.log(res);
      if (res.code == 200) {
         
        this.tableData = res.data.content
        // console.log(    this.tableData);
        let tableDataLength = this.tableData.length
   
        // let timer = null
     
        // timer ? clearTimeout(timer) : ''
        if (this.tableData.length < 10) {
          for (var i = this.tableData.length; i < 10; i++) {
            this.tableData.push({})
          }
        }
        // if (tableDataLength < 10) {
        //   timer = setTimeout(() => {
        //     for (var i = tableDataLength; i < 10; i++) {
        //       document.querySelectorAll('#onetable tbody .el-checkbox')[
        //         i
        //       ].style.display = 'none'
        //     }
        //   })
        // }
          
        this.total = res.data.totalElements
        this.totalPages = res.data.totalPages // }else{ //   this.$message('无数据') // }
        
   }
    },
    //查询
    async searchTabData() {

      this.mypageable.pageNum = 1
              setTimeout(()=>{
            document.querySelector('.bottom  .el-pagination  .btn-next').disabled=false
         },10)
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
      this.newdomainSimpleVo = {
        ip: null, //域名
        domain: null, //时间
        url: null,
      }
      ;(this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      }),
        (this.mypageable.pageNum = 1)
      this.mypageable.pageSize = 10
             setTimeout(()=>{
            document.querySelector('.bottom  .el-pagination  .btn-next').disabled=false
         },10)
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
    //下载   文件流
    async put() {
      // console.log(this.tableDatalist)
      // if (this.tableDatalist.length > 0) {
      let getlist = {
        discoverTimeDTO: {
          startTime: this.whiteSearchList.startCreateTime,
          endTime: this.whiteSearchList.endCreateTime,
        },

        customPageable: this.mypageable,
        ip: this.newdomainSimpleVo.ip,
        phone: this.newdomainSimpleVo.domain,
        domain: this.newdomainSimpleVo.url,
      }
      this.loadingbuttext = '...加载中'
      this.loadingbut = true
      // const { data: res } = await this.$http.post(
      //   '/discover/downloadRaw',
      //   getlist
      // )
      this.$http({
        method: 'POST',
        url: '/discover/downloadRaw',
        responseType: 'blob',
        data: getlist,
      })
        .then((res) => {
          // const blob = new Blob([res.data], {
          //   type: 'application/vnd.ms-excel',
          // })
          //        const url = window.URL.createObjectURL(blob)
          // window.open(url, '_blank')
          let that = this
        

          // console.log(title);
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
           let title = dayjs().format('YYYYMMDD') + '流量导出.xlsx'
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
          console.log(err)
          // console.log(err)
          this.$message.error('文件下载失败！')
          this.loadingbuttext = '导出'
          this.loadingbut = false
        })

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
      // } else {
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
    async fangwenl(val) {
      this.gridData = []
      this.loading = true
      this.yuming = val.url
      this.arr.push(val.id)
      this.dialogTableVisible = true
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
  async  handleCurrentChange(val) {
  

      this.mypageable.pageNum = val

      let getlist = {
        discoverTimeDTO: {
          startTime: this.whiteSearchList.startCreateTime,
          endTime: this.whiteSearchList.endCreateTime,
        },

        customPageable: this.mypageable,
        ip: this.newdomainSimpleVo.ip,
        phone: this.newdomainSimpleVo.domain,
        domain: this.newdomainSimpleVo.url,
      }
      const { data: res } = await this.$http.post(
        '/discover/getRawPage',
        getlist
      )
      // console.log(res);
      if (res.code == 200) {
          if(res.data.content.length>0){
               setTimeout(()=>{
            document.querySelector('.bottom  .el-pagination  .btn-next').disabled=false
         },10)
        this.tableData = res.data.content

        if (this.tableData.length < 10) {
          for (var i = this.tableData.length; i < 10; i++) {
            this.tableData.push({})
          }
        }
           this.total = res.data.totalElements
        this.totalPages = res.data.totalPages
    }else{
        this.mypageable.pageNum = val-1
          this.getTabData()
        
         setTimeout(()=>{
            document.querySelector('.bottom  .el-pagination  .btn-next').disabled=true
         },10)

   }
        
     
      // }else{ //   this.$message('无数据') // }
      
      // this.getTabData()
      }
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
        this.newdomainSimpleVo.domain = null
      }
    },
    fraudType_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.domain = null
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
    handleClose(done) {
      this.mypageable1.pageNum1 = 1
      this.arr = []
      this.dialogTableVisible = false
    },
    //    eldialogout() {
    //   (this.isShow = false), this.$refs.multipleTable.clearSelection(); //清除选中的数据
    // },
    getRowKeys(row) {
      return row.id
    },
    zP(val) {
      if (val == 'DK') {
        return '贷款'
      } else if (val == 'SD') {
        return '刷单返利类'
      } else if (val == 'GJF') {
        return '冒充公检法及政府机关类'
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
        return '网络婚恋/交友类(非杀猪盘类)'
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
.dialogInfo /deep/ .el-table__row {
  height: 40px !important;
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
/*alert 成功弹出框样式*/
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/弹框3.png) no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  opacity: 0.85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 15px !important;
    right: 20px !important;
    .el-dialog__close {
      color: #fff;
      font-size: 16px;
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
</style>
