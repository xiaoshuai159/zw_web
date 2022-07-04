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
          enctype="multipart/form-data"
        >
          <!-- 上传人 -->
          <el-form-item label="上传人">
            <el-input
              v-model="newdomainSimpleVo.uploadPerson"
              placeholder="上传人"
            ></el-input>
          </el-form-item>
          <!-- 上传时间 -->
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_find"
              type="datetimerange"
              :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              size="mini"
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
          <!-- 协议 -->
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
          <el-form-item>
            <el-button
              class="el-button-chaxun"
              type="primary"
              size="mini"
              @click.native.stop="searchTabData"
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
            <!-- :loading="isLoading" -->
            <el-button
              class="el-button-daochu"
              type="primary"
              size="mini"
              @click.native.stop="put"
              :loading="loadingbut"
              v-if="getRole1('downloadTemplate')"
              >{{ loadingbuttext }}</el-button
            >
            <el-tooltip
              class="item"
              effect="dark"
              content="上传"
              placement="top"
              style="margin-right: 10px"
            >
              <el-upload
                action="/treatment/uploadDomain"
                accept=".xlsx"
                :before-remove="beforeRemove"
                :on-success="successSendFile"
                :data="{ User: use }"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                class="upload_demo addAllocate"
              >
                <el-button
                  class="el-button-daochu"
                  type="primary"
                  v-preventReClick
                  size="mini"
                  v-if="getRole1('upload')"
                  >上传</el-button
                >
              </el-upload>
            </el-tooltip>
            <el-button
              class="el-button-daochu"
              type="primary"
              size="mini"
              @click.native.stop="authorizationURL"
              v-if="getRole1('relation')"
              >二次发现</el-button
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
      <el-table-column type="selection" :reserve-selection="true" width="55">
      </el-table-column>
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column label="relation_id" prop="relation_id" v-if="isLoading">
      </el-table-column>
      <el-table-column label="URL">
        <template slot-scope="scope">
          <a :href="scope.row.url" class="urlcolor" target="_blank">{{
            scope.row.url
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="诈骗类型" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ zP(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="协议" prop="protocol"> </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">

              <span :style="{ color: netcolor(scope.row.status),fontWeight:'700' }">
            {{zt(scope.row.status)  }}
          </span>
       
        </template>
      </el-table-column>
      <!-- <el-table-column label="上传时间">
        <template slot-scope="scope">
          {{ time(scope.row.upload_time) }}
        </template>
      </el-table-column>
      <el-table-column label="上传人" prop="upload_person"> </el-table-column> -->
      <el-table-column label="数据来源" prop="dataSource">
        <template slot-scope="scope">
          {{ scope.row.dataSource == 'CA' ? '长安发现' : '本地上传' }}
        </template>
      </el-table-column>
      <el-table-column label="二次发现数量"
        ><template slot-scope="scope">
          {{
            scope.row.relation_id == '-1'
              ? (scope.row.relationNum = '0')
              : scope.row.relationNum
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="上传"
        prop="uploadDomainEntityList"
        v-if="isLoading"
      >
        <template slot-scope="scope">
          {{ scope.row.uploadDomainEntityList }}
        </template>

        <!---->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="shangchuan(scope.row.uploadDomainEntityList)"
            >查看上传详情</el-button
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
          :page-sizes="[15,30,45]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>
  <!-- </div> -->
   
    <!-- //弹窗 -->
    <el-dialog
      title="二次发现"
      top="5vh"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :visible.sync="isShow"
      append-to-body
    >
      <!-- @open="open()" -->
      <!-- echars -->
      <el-form :inline="true" size="medium" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <!-- <el-form-item label="样本曲线"> -->
            <div
              id=" bar_dvn"
              ref="chart"
              style="width: 80%; height: 400px"
              @mousedown="mousedown()"
            ></div>
            <!-- </el-form-item> -->
            <!-- myChart -->
          </el-col>
        </el-row>
      </el-form>

      <!-- echars  //关闭-->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click.native.stop="eldialogout">关闭</el-button>
       
      </span> -->
    </el-dialog>
   

    <!-- 看截图 -->
    <el-dialog
      :title="kanjietutitle"
      :visible.sync="newkanjietu"
      width="45%"
      height="40%"
      :before-close="newkanjietuclose"
    >
      <img :src="this.jieURL" ref="img" alt="" class="img" />
    </el-dialog>
    <!-- 上传人弹窗 -->
    <el-dialog
      title="上传详细信息"
      :visible.sync="shangchuanren"
      width="45%"
      height="40%"
      class="dialogInfo"
    >
      <el-table
        :row-class-name="tableRowClassName"
        :data="tableDatashangchuan"
        style="width: 100%"
        max-height="600px"
        size="mini"
        class="tableStyle"
      >
        <!-- <el-table-column label="序号" prop="id"> </el-table-column> -->
        <!-- <el-table-column label="URL" prop="url"> </el-table-column> -->
        <el-table-column label="上传人" prop="uploader"> </el-table-column>
        <el-table-column label="上传时间" prop="uploadTime"> </el-table-column>
        <!-- <el-table-column label="类型" prop="type"> </el-table-column> -->
        <el-table-column label="部门" prop="department">
          <!-- <template slot-scope="scope">
            {{diqu(scope.row.department)}}
          </template> -->
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
import Navlist from '@/components/hearderdongtainav.vue'
import getRole from '@/utils/promission.js'
export default {
  name: 'search',

  data() {
    return {
      loadingbuttext: '模板下载',
      loadingbut: false,
      kanjietutitle: '截图',
      newkanjietu: false,
      // newshenqi:'上传详细信息',
      shangchuanren: false,
      jieURL: '',
      jietu1: '',
      newxinjietu: '',
      whiteSearchList1: {
        startCreateTime1: '',
        endCreateTime1: '',
      },
      isLoading: false,
      isShow: false,
      whiteSearchList: {
        startUploadTime: '',
        endUploadTime: '',
      },

      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: '',
        region: '',
      },
      newdomainSimpleVo: {
        dateValue_find1: null,
        dateValue_find: null, //处置时间
        modelType1: null, //诈骗类型
        protocol: null, //协议
        uploadPerson: null, //上传人
        state: null, //状态
      },

      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },
      domainTimeVo: {
        startFindTime: null,
        endFindTime: null,
        startFinishTime: null,
        endFinishTime: null,
        startIssuedTime: null,
        endIssuedTime: null,
        startUpdateTime: null,
        endUpdateTime: null,
      },
      mypageable: {
        pageNum: 1,
        pageSize: 15,
      },
      total: 1,
      totalPages: '',
      //下拉框的选项数据
      selectData: {
        protocolData: [
          { value: 'HTTP', label: 'HTTP' },
          { value: 'HTTPS', label: 'HTTPS' },
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
      tableDatashangchuan: [],
      currentPage: 1,
      newurl: '',
      use: '',

      // echars
      categoryArray: [{ name: '上传URL' }, { name: '处置URL' }],
      testData: [],
      testLink: [],
      testLink1: [],
      qutest: [],
      qutest1: [],
      qutest2: [],

      whole: 0,
      newlist: [],
      test: [],
      test1: [],
      bumennumlist: [],
      shuangchuanval: [],
    }
  },

  created() {
    this.getdata()
    this.getTabData()
    // this.$nextTick(() => {
    //   this.open();
    // });
    // this.echartslist()
    // this.bumennumlist = this.$store.state.bumenList;
  },
  mounted() {
    this.use = JSON.parse(window.sessionStorage.getItem('one'))

    this.drawLine()
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  methods: {
    getRole1(data) {
      return getRole(data)
      // console.log( getRole(data));
    },
    //+++++++++++++++++++++++++++++曲线图
    // draw() {
    //   // eslint-disable-next-line camelcase
    //   var bar_qx = this.$refs.chart1;
    //   // eslint-disable-next-line camelcase

    //   let myChart = this.$echarts.init(bar_qx);
    //   myChart.setOption(this.newsetOption());
    //   // console.log(myChart);

    //   // console.log(this.qutest);
    // },
    // newsetOption() {
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
    //     color: [' #fac858', '#EE6666'], //绿色  橙色
    //     legend: {
    //       data: [
    //         {
    //           name: '上传域名数',
    //           textStyle: {
    //             color: ['#fac858'],
    //           },
    //         },
    //         {
    //           name: '关联域名数',
    //           textStyle: {
    //             color: ['#EE6666'],
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
    //       data: this.qutest,
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
    //         name: '上传域名数',
    //         type: 'line',

    //         data: this.qutest1,
    //         smooth: true,
    //       },
    //       {
    //         name: '关联域名数',
    //         type: 'line',

    //         data: this.qutest2,
    //         smooth: true,
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

    //++++++++++++++++++++++++++++
    //图表初次渲染
    // 图表初次渲染
    // async echartslist() {
    //   let charecharts = {
    //     startUploadTime: this.whiteSearchList1.startCreateTime1,
    //     endUploadTime: this.whiteSearchList1.endCreateTime1,
    //   }
    //   const { data: res } = await this.$http.post(
    //     'treatment/tongJiUpload',
    //     charecharts
    //   )
    //   if (res.code == 200) {
    //     res.data.tongJiPojos.forEach((item) => {
    //       // console.log(item);
    //       this.qutest.push(item.uploadTime1) //时间
    //       this.qutest1.push(item.urlCount)
    //       this.qutest2.push(item.rcount)
    //     })

    //     // console.log(this.zhutest1);
    //     // setTimeout(() => {
    //     //   this.draw();
    //     // }, 500);
    //   } else {
    //     alert('无数据')
    //   }
    // },
    //图表查询
    // async chaxun1() {
    //   let charecharts1 = {
    //     startUploadTime:
    //       this.whiteSearchList1.startCreateTime1 != null
    //         ? this.whiteSearchList1.startCreateTime1
    //         : null,
    //     endUploadTime:
    //       this.whiteSearchList1.endCreateTime1 != null
    //         ? this.whiteSearchList1.endCreateTime1
    //         : null,
    //   }
    //   const { data: res } = await this.$http.post(
    //     '/treatment/tongJiUpload',
    //     charecharts1
    //   )
    //   if (res.code == 200) {
    //     ;(this.qutest = []),
    //       (this.qutest1 = []),
    //       (this.qutest2 = []),
    //       res.data.tongJiPojos.forEach((item) => {
    //         this.qutest.push(item.uploadTime1) //时间
    //         this.qutest1.push(item.urlCount)
    //         this.qutest2.push(item.rcount)
    //       })

    //     // console.log(this.zhutest1);

    //     // setTimeout(() => {
    //     //   this.draw();
    //     // }, 500);
    //   } else {
    //     alert('无数据')
    //   }
    // },
    //================
    eldialogout() {
      this.testData = []
      this.testLink1 = []
      this.isShow = false
      this.$refs.multipleTable.clearSelection() //清除选中的数据
    },
    getRowKeys(row) {
      return row.id
    },
    //初始化获取数据
    async getTabData() {
      let mypageable = {
        protocol: this.newdomainSimpleVo.protocol,
        uploadPerson: this.newdomainSimpleVo.uploadPerson,
        status: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.modelType1,
        pageNum: this.mypageable.pageNum,
        pageSize: this.mypageable.pageSize,
        startUploadTime: this.whiteSearchList.startUploadTime,
        endUploadTime: this.whiteSearchList.endUploadTime,
      }

      const { data: res } = await this.$http.post(
        '/treatment/getUploadDomain',
        mypageable
      )
      if (res.code == 200) {
        // console.log(res.data);
        this.tableData = res.data.content
        this.total = res.data.totalElements
        this.totalPages = res.data.totalPages
      }
    },
    //查询
    async searchTabData() {
      let getTabDataList = {
        protocol: this.newdomainSimpleVo.protocol,
        uploadPerson: this.newdomainSimpleVo.uploadPerson,
        status: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.modelType1,
        pageNum: this.mypageable.pageNum,
        pageSize: this.mypageable.pageSize,
        startUploadTime: this.whiteSearchList.startUploadTime,
        endUploadTime: this.whiteSearchList.endUploadTime,
      }

      const { data: res } = await this.$http.post(
        '/treatment/getUploadDomain',
        getTabDataList
      )
      if (res.code == 200) {
        this.mypageable.pageNum = 1
        this.tableData = res.data.content
        this.total = res.data.totalElements
        this.totalPages = res.data.totalPages
        if (res.data.content.length > 0) {
        } else {
          this.mypageable.pageNum = 1
          this.mypageable.pageSize = 15
          this.getTabData()
        }
      } else {
        this.$message('无数据')
        this.mypageable.pageNum = 1
        this.mypageable.pageSize = 15
        this.getTabData()
        this.resetFun()
      }
    },
    shangchuan(val) {
      console.log(val)
      this.shuangchuanval = val
      this.shangchuanren = true

      for (var i = 0; i < this.shuangchuanval.length; i++) {
        for (var j = 0; j < this.test1.length; j++) {
          let that = this
          if (that.test1[j][0].id == that.shuangchuanval[i].department) {
            this.shuangchuanval[i].department = this.test1[j][0].deptName
          }
        }
      }

      this.tableDatashangchuan = this.shuangchuanval
    },
    //重置方法
    //点击重置无反应
    resetFun() {
      this.newdomainSimpleVo = {
        modelType1: null, //modelType1
        protocol: null, //协议
        uploadPerson: null, //上传人
        state: null, //状态
        dateValue_find: null, //处置时间
      }
      ;(this.whiteSearchList = {
        startUploadTime: null,
        endUploadTime: null,
      }),
        this.getTabData()
    },
    handleSelectionChange(val) {
      this.tableDatalist = val
    },

    //关联URl
    async authorizationURL() {
      this.testData = []
      this.testLink1 = []
      let test1 = []
      let test2 = []
      let test3 = []
      let net = 100
      let zong = 0
      let test = []
      let test4 = []
      let newtestData = []
      let obj = {}
      if (this.tableDatalist.length > 0) {
        let arr = []

        this.tableDatalist.forEach((item) => {
          arr.push(item.id)
        })
        this.isShow = true
        const { data: res } = await this.$http.post('/treatment/relation', {
          data: arr,
        })
        // console.log(res);
        // console.log(res);
        // console.log(res);
        if (res.code == 200) {
          console.log(res)
          // this.echarsURL = res.data;
          // echarts  data
          // console.log(res.code);
          // ========================================== 原
          // console.log(res);
          Object.keys(res.data).forEach((item) => {
            // console.log(typeof(this.echarsURL[0][item]));
            test1.push({
              name: item,
              category: 0,
            })
            // console.log(    res.data[item]);
            test3.push(
              res.data[item].map((item1) => {
                return {
                  name: item1,
                  category: 1,
                }
              })
            )
          })
          test3.forEach((item, index) => {
            if (item.length > net) {
              test2.push(item.slice(0, net))
            } else {
              test2.push(item)
            }
          })
          newtestData = test1.concat(...test2)
          for (var i = 0; i < newtestData.length; i++) {
            if (!obj[newtestData[i].name]) {
              this.testData.push(newtestData[i])
              obj[newtestData[i].name] = true
            }
          }
          //  console.log(test2);

          // console.log(this.testData);
          // ==========================================线

          for (var key in res.data) {
            zong += res.data[key].length
            let a = key
            //    console.log(res[key]);
            test4.push(
              res.data[key].map((item, index) => {
                return {
                  source: a,
                  target: item,
                }
              })
            )
          }
          test4.forEach((item, index) => {
            if (item.length > net) {
              test.push(item.slice(0, net))
            } else {
              test.push(item)
            }
          })
          // console.log(zong)
          this.whole = zong
          this.testLink.push(...test)
          this.testLink.forEach((item1) => {
            this.testLink1.push(...item1)
          })
          // console.log(this.testLink1);
          // ++++++++++++++++++++++++++++++++++++++++++++++
          // console.log(this.echarsURL);
          this.drawLine()
        } else {
          this.message('操作失败')
        }
      } else {
        this.$message('请选择')
      }
    },
    //弹窗关闭
    // handleClose(done) {
    handleClose() {
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //   })
      //   .catch((_) => {});
      this.isShow = false
      this.$refs.multipleTable.clearSelection() //清除选中的数据
    },
    //echars
    drawLine() {
      const that = this
      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      // eslint-disable-next-line camelcase
      var bar_dvn = this.$refs.chart
      // eslint-disable-next-line camelcase
      if (bar_dvn) {
        // console.log('bar_dv不为空');
        let myChart = this.$echarts.init(bar_dvn)

        // myChart.resize(); //自适应大小
        myChart.setOption(this.setOption())
        myChart.on('click', function (param) {
          // console.log(param);
          that.jietu1 = param.data.name // 截图
          that.net().unbind()
          // that.newkanjietu = true;
          //   this.jieURL = "";
        })
        // console.log(this.setOption());
      }
      // myChart.resize(); //自适应大小
      // myChart.setOption(this.setOption());
    },
    //截图
    async net() {
      let pic = this.jietu1
      // "/treatment/getUrl" + "?fileName=" + val
      const { data: res } = await this.$http.post(
        '/treatment/getImageByUrl' + '?url=' + pic
      )
      if (res.data == null) {
        this.newkanjietu = false
        this.$message('无图片')
      } else {
        this.newkanjietu = true
        this.jieURL = res.data
      }
    },
    setOption() {
      this.testData.forEach(function (node) {
        node.label = {
          show: node.category == 0,
        }
      })
      let option = {
        // title: {
        //   // text: "关联URL",
        // },
        // grid: {
        //   x: 400,
        //   y: 20,
        //   x2: 20,
        //   y2: 25,
        // },
        title: {
          text: '关联' + this.whole + '个',
          top: '7%',
          left: 'left',
          textStyle: {
            //文字颜色

            //字体风格,‘normal‘,‘italic‘,‘oblique‘
            fontStyle: '‘italic‘',
            //字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            fontWeight: '‘bold‘',
            //字体系列
            fontFamily: 'sans-serif',
            //字体大小
            fontSize: 16,
            color: '#fff',
          },
          //      backgroundColor: 'rgba(29, 93, 145,0.5)',
          // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
          // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
          // padding: 5,
        },
        tooltip: {
          formatter: function (x) {
            return x.data.name //设置提示框的内容和格式 节点和边都显示name属性
          },
        }, //提示框
        animationDurationUpdate: 1500,

        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force', //    采用力引导布局  .//circular  采用环形布局
            categories: this.categoryArray,

            // symbolSize: 50, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
            symbolSize: (value, params) => {
              switch (params.data.category) {
                case 0:
                  return 30
                case 1:
                  return 10
              }
            },
            roam: true, //鼠标缩放功能
            label: {
              // show: true, //是否显示标签
              formatter: '{b}',
            },
            focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
            edgeSymbol: ['circle', 'none'], //circle  关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
            edgeSymbolSize: [4, 10],
            draggable: true,
            edgeLabel: {
              fontSize: 20, //关系（也即线）上的标签字体大小
            },
            force: {
              // repulsion: 50, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              // gravity: 0.03, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              // edgeLength: 80, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              // layoutAnimation: true,
              repulsion: 80,
              gravity: 0.01,
              edgeLength: 120,
            },

            //全局颜色，图例、节点、边的颜色都是从这里取，按照之前划分的种类依序选取

            data: this.testData,
            links: this.testLink1,

            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
        legend: [
          {
            x: 'left', //图例位置
            data: ['上传URL', '处置URL'],
              textStyle: {
                color: ['#fff'],
              },
             //关系图中需要与series中的categories的name保持一致
          },
        ],
        color: ['#2aa9d3', '#f3a228'],
      }
      return option
    },
    //

    //
    mousedown() {
      // console.log(data.name);
    },
    //模板下载
    async put() {
      this.loadingbuttext = '...加载中'
      this.loadingbut = true
      const { data: res } = await this.$http.post('/treatment/downloadTemplate')
      // console.log(res);
      if (res.code == 200) {
        this.loadingbuttext = '模板下载'
        this.loadingbut = false
        let newurl = res.expandData.url
        let eleLink = document.createElement('a')
        eleLink.download = name
        eleLink.href = newurl
        eleLink.click()
        eleLink.remove()
      } else {
        this.$message(res.message)
      }
    },
    //上传成功
    successSendFile(res) {
      // this.loading=true
      if (res.code == 200) {
        setTimeout(() => {
          this.$message.success('上传成功')

          this.getTabData()
        }, 1000)
      } else if (res.code == 500) {
        this.$message(res.message)
      }
    },
    //删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    //上传
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    //下载
    // async downloadInfo() {
    //   let seniorData = {
    //     domainFeedbackVo: this.domainFeedbackVo,
    //     domainSimpleVo: this.domainSimpleVo,
    //     domainTimeVo: this.domainTimeVo,
    //     mypageable: this.mypageable,
    //   };

    //   const { data: res } = await this.$http.post(
    //     "/domain/downloadDomain",
    //     seniorData
    //   );
    //   if (res.code == 200) {
    //     //
    //     // window.location.href = res.expandData.url
    //     // window.open(URL)

    //     let url = res.expandData.url;
    //     // var a = document.createElement('a');
    //     // const hostname = document.location.hostname
    //     // // const down = window.location.origin
    //     // // a.href =`${down}/task/download_file/?task_id=${id}&is_login=true`
    //     // // a.href =`localhost:8080${url}`
    //     // a.href =`${url}`
    //     // a.click();

    //     // debugger
    //     // const down = window.location.origin
    //     // let down = BASE_URL
    //     let eleLink = document.createElement("a");
    //     eleLink.download = name;
    //     eleLink.href = url;
    //     eleLink.click();
    //     eleLink.remove();
    //   }
    // },
    handleSizeChange(val) {
      this.mypageable.pageSize = val
      this.getTabData()
    },
    handleCurrentChange(val) {
      this.mypageable.pageNum = val

      this.getTabData()
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

    //上传时间
    dataCreate_change(val) {
      if (val && val != '') {
        this.whiteSearchList.startUploadTime = val[0]
        this.whiteSearchList.endUploadTime = val[1]
      } else {
        this.whiteSearchList.startUploadTime = null
        this.whiteSearchList.endUploadTime = null
      }
    },

    // 状态
    state_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.state = null
      }
    },
    // 协议
    protocol_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.protocol = null
      }
    },
    // 诈骗类型
    modelType1_clearFun(val) {
      if (val == '') {
        this.newdomainSimpleVo.modelType1 = null
      }
    },
    //上传人

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
    zt(val) {
      if (val == 0) {
        return '处置中'
      } else if (val == 1) {
        return '已处置'
      } else if (val == 2) {
        return '已失效'
      }
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
    dataCreate_change1(val) {
      if (val && val != '') {
        this.whiteSearchList1.startCreateTime1 = val[0]
        this.whiteSearchList1.endCreateTime1 = val[1]
      } else {
        this.whiteSearchList1.startCreateTime1 = null
        this.whiteSearchList1.endCreateTime1 = null
      }
    },
    newkanjietuclose() {
      this.newkanjietu = false
      this.jieURL = ''
    },
    //上传时间
    time(val) {
      return this.$times(val).format('YYYY-MM-DD HH:mm:ss')
    },
    //部门数字转文字
    async getdata() {
      const { data: res } = await this.$http.get('/dept/queryDeptList')
      // console.log(res);
      if (res.code == 200) {
        // console.log(res.data);
        this.newlist = res.data
        // this.newlist1.push(res.data);
        this.getIds(this.newlist)
        // console.log(this.test);
        this.test1 = this.test
        // console.log(  this.test1);
      }
      // this.diqu()
    },
    hasChildrenAttr(obj) {
      if (obj.children != null) {
        this.getIds(obj.children)
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

    //格式化数据
    // formatType(row, column) {
    //   var data = row[column.property];
    //   // var data = row["domainEntity"]['model_type1'];
    //   if (data == undefined) {
    //     return "";
    //   } else {
    //     let arr = this.selectData.model_typeData;
    //     if (column.property == "model_type1") {
    //       for (let i = 0; i < arr.length; i++) {
    //         if (data == arr[i].value) {
    //           return arr[i].label;
    //         }
    //       }
    //     }
    //     if (column.property == "model_type2") {
    //       //获取父类
    //       let father = row["model_type1"];
    //       for (let i = 0; i < arr.length; i++) {
    //         if (father == arr[i].value) {
    //           let childArr = arr[i].children;
    //           for (let j = 0; j < childArr.length; j++) {
    //             if (data == childArr[j].value) {
    //               return childArr[j].label;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
  },
}
</script>

<style  scoped lang='less'>
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}

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
  height: 40px; /* 60/16 */ /* 40/16 */
background-color: rgba(11, 48, 78,.5);
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
  color: #409EFF;
}
.urlcolor:visited {
  color: #909090;
}
.tubiao1 {
  width: 100% /* 1558/16 */;
  height: 10rem /* 200/16 */ /* 300/16 */;
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.625rem /* 10/16 */;
}
.left {
  width: 90% /* 779/16 */;
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
.img {
  width: 100%;
  height: 100%;
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
// 弹窗
/deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/弹框3.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 3px !important;
    right: 10px;
    .el-dialog__close {
      color: #fff;
      font-size: 16px;
    }
  }
  .el-dialog__header {
    margin: 20px 20px 0px 20px;
    background: url(../assets/img/shouye/标题矩形.png) no-repeat;
    background-size: 100% 100%;
    .el-dialog__title {
      color: #2fbcfc;
    }
  }
}
.list_xia{
  padding-bottom: 20px;
  background-color: rgba(8, 38, 61,.6);
}
/deep/ .changdu{
  width: 220px !important;
}
</style>
