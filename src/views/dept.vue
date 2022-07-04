<template>
  <div class="right_main_under">
    <Navlist></Navlist>
    <div class="search_select_form bg">
      <template>
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <!-- 处置时间 -->
          <el-form-item label="操作时间">
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
          <el-form-item label="用户名">
            <el-input
              placeholder="请输入用户名"
              v-model.trim="newdomainSimpleVo.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              placeholder="请输入内容"
              v-model.trim="newdomainSimpleVo.project"
            ></el-input>
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

            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>
    <el-table
          :row-class-name="tableRowClassName"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
         :height="heights"
               id="onetable"
      size="mini"
      class="tableStyle"
    >
      <el-table-column label="用户名" prop="userName"> </el-table-column>
      <el-table-column label="操作时间" prop="createTime"> </el-table-column>
      <el-table-column label="操作" prop="remark"> </el-table-column>
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

  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import dayjs from 'dayjs'
export default {
  name: 'bumen',
  data() {
    return {
      newdomainSimpleVo: {
        dateValue_find: null,
        username: "",
        project: null,
      },
      whiteSearchList: {
        // startCreateTime:
        //   dayjs().subtract(1, 'month').format('YYYY-MM-DD') +
        //   ' ' +
        //   '00:' +
        //   '00:' +
        //   '00',
        // endCreateTime:
        //   dayjs().format('YYYY-MM-DD') + ' ' + '23:' + '59:' + '59',
        startCreateTime: null,
        endCreateTime: null,
      },
      tableData: [],
      yingchang: false,
      yin: true,
      yin1: false,
      yin2: false,
      newson: '',
      newfather: '',
      loading2: false,
      loading1: false,
      disabled: true,
      loading: true,
      treezhankai: [],
      quehuan: true,
      form: {
        father: '',
        son: '',
        bm: '',
        sort: '',
        phone: '',
        dz: '',
      },
      form1: {
        phone1: '',
        dz1: '',
        // father1: "",
        son1: '',
        bm1: '',
        sort1: '',
        addbm1: '',
        phone1: '',
        dz1: '',
      },
      form2: {
        // father2: "",
        son2: '',
        bm2: '',
        sort2: '',
        dz2: '',
        phone2: '',
        id2: '',
      },
      data: [],
      dataid: [],
      defaultProps: {
        children: 'children',
        label: 'deptName',
      },
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      heights:undefined,
      total: 1,
      totalPages: '',
      currentNodeKey: '',
      rules: {
        addbm1: [
          { required: true, message: '请输入部门', trigger: 'blur' },
          {
            min: 1,
            max: 40,
            message: '长度不能超出40个字符',
            trigger: 'blur',
          },
        ],
        phone1: [
          {
            required: true,
            message: '请输入电话号',
            trigger: 'blur',
          },

          // {
          //   pattern: /^1[3456789]\d{9}$/,
          //   pattern: /d{3}-d{8}|d{4}-d{7}/,
          //   message: '电话号码格式不正确',
          //   trigger: 'blur',
          // },
        ],
        dz1: [
          { required: true, message: '请输入部门地址', trigger: 'blur' },
          {
            min: 1,
            max: 255,
            message: '长度不能超出256个字符',
            trigger: 'blur',
          },
        ],
      },
      rules1: {
        bm2: [
          { required: true, message: '请输入部门', trigger: 'blur' },
          {
            min: 1,
            max: 40,
            message: '长度不能超出40个字符',
            trigger: 'blur',
          },
        ],
        phone2: [
          {
            required: true,
            message: '请输入电话号',
            trigger: 'blur',
          },

          // {
          //   pattern: /^1[3456789]\d{9}$/,
          //   pattern: /d{3}-d{8}|d{4}-d{7}/,
          //   message: '电话号码格式不正确',
          //   trigger: 'blur',
          // },
        ],
        dz2: [
          { required: true, message: '请输入部门地址', trigger: 'blur' },
          {
            min: 1,
            max: 255,
            message: '长度不能超出256个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  created() {
    this.getdata()
  },
    mounted() {
    this.yangshi()
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
    //初次渲染
    async getdata() {
      let list = {
        pageable: this.mypageable,
        systemTimeDTO: {
          endTime: this.whiteSearchList.endCreateTime,
          startTime: this.whiteSearchList.startCreateTime,
        },
        params: '',
        remark: this.newdomainSimpleVo.project,
        result: '',
        userName: this.newdomainSimpleVo.username,
      }
      const { data: res } = await this.$http.post('/log/getLogPage', list)

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
    searchTabData() {
      this.mypageable.pageNum = 1
      this.getdata()
    },
    resetFun() {
      this.whiteSearchList.endCreateTime = null
      this.whiteSearchList.startCreateTime = null
      this.newdomainSimpleVo.project=""
       this.newdomainSimpleVo.username=""
      this.mypageable.pageNum = 1
      this.getdata()
    },
    //删除
    del() {
      if (this.form.bm == '') {
        this.$message('请选择要删除的部门')
      } else {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            const list = {
              id: this.form.son,
            }
            const { data: res } = await this.$http.post('/dept/delDept', list)
            // console.log(res);
            if (res.code == 200) {
              this.$message(res.data)
              this.zhikong()
              this.getdata()
            }
            // else {
            //   this.$message(res.message);
            // }
          })
          .catch(() => {
            this.$message('已取消删除')
          })
      }
    },
    //添加保存
    // 新增验证
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tianjia()

          this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['form1'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },

    async tianjia() {
      if (this.form1.bm1.substr(-3, this.form1.bm1.length) == '派出所') {
        console.log(this.form1.bm1.substr(-3, this.form1.bm1.length))
        this.$message('该部门无法添加')
      } else {
        const list = {
          deptName: this.form1.addbm1,
          pId: this.form1.son1,
          // sort: this.form1.sort1,
          deptAddr: this.form1.dz1,
          deptPhone: this.form1.phone1,
        }
        const { data: res } = await this.$http.post('/dept/addDept', list)
        if (res.code == 200) {
          this.$message(res.data)
          this.getdata()
          this.zhikong()
        } else {
          this.$message(res.data)

          this.zhikong()
        }
      }
    },
    submitForm1(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.xiugai()

          this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['form2'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    async xiugai() {
      if (this.form2.id2 == -1) {
        this.$message({
          message: '公安部不可修改',
          type: 'warning',
        })
      } else {
        const list = {
          deptName: this.form2.bm2,
          pId: this.form2.son2,
          id: this.form2.id2,
          deptAddr: this.form2.dz2,
          deptPhone: this.form2.phone2,
        }
        console.log(list)
        const { data: res } = await this.$http.post('/dept/updateDept', list)
        if (res.code == 200) {
          this.$message(res.data)
          this.getdata()
          this.zhikong1()
        } else {
          this.$message(res.data)
          this.zhikong1()
        }
      }
    },
    zhikong() {
      // this.form.father = "";
      this.form1.son1 = ''
      // this.form1.sort1 = "";
      this.form1.bm1 = ''
      this.form1.addbm1 = ''
      this.form1.phone1 = ''
      this.form1.dz1 = ''
    },
    zhikong1() {
      // this.form.father = "";
      this.form2.son2 = ''
      // this.form2.sort2 = "";
      this.form2.bm2 = ''
      this.form2.phone2 = ''
      this.form2.dz2 = ''
    },

    handleNodeClick(data) {
      let that = this
      this.$nextTick(() => {
        that.$refs['form1'].clearValidate()
        that.$refs['form2'].clearValidate()
      })
      // console.log(data);

      this.form.father = data.pid
      this.form.son = data.id
      this.form.bm = data.deptName
      // this.form.sort = data.sort;
      this.form.phone = data.deptPhone
      this.form.dz = data.deptAddr
      this.form1.son1 = data.id
      this.form1.bm1 = data.deptName

      // this.form1.bm1 = data.deptName;
      // this.form1.sort1 = data.sort;
      this.form2.son2 = data.pid
      this.form2.bm2 = data.deptName
      // this.form2.sort2 = data.sort;
      this.form2.dz2 = data.deptAddr
      this.form2.phone2 = data.deptPhone
      this.form2.id2 = data.id
      this.treezhankai.push(data.id)

      console.log(this.currentNodeKey)
    },
    // 添加
    add() {
      let that = this
      this.$nextTick(() => {
        that.$refs['form1'].clearValidate()
      })
      if (this.form.bm == '') {
        this.$message('请选择要添加的部门')
      } else {
        if (this.form1.bm1.substr(-3, this.form1.bm1.length) == '派出所') {
          console.log(this.form1.bm1.substr(-3, this.form1.bm1.length))
          this.$message('该部门无法添加')
        } else {
          this.yin = false
          this.yin1 = true
          this.yin2 = false
        }
      }
    },
    upload() {
      let that = this
      this.$nextTick(() => {
        that.$refs['form2'].clearValidate()
      })
      if (this.form.bm == '') {
        this.$message('请选择要编辑的部门')
      } else {
        this.yin = false
        this.yin1 = false
        this.yin2 = true
      }
    },
    err() {
      this.yin = true
      this.yin1 = false
      this.yin2 = false
      this.zhikong1()
      this.zhikong()
      let that = this
      this.$nextTick(() => {
        that.$refs['form1'].clearValidate()
      })
      // this.form2.bm2=""
    },
    err1() {
      this.yin = true
      this.yin1 = false
      this.yin2 = false
      this.zhikong1()
      this.zhikong()
      let that = this
      this.$nextTick(() => {
        that.$refs['form2'].clearValidate()
      })
      // this.form2.bm2=""
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

        handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val
      this.getdata()
    },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNum = val

      // console.log( this.mypageable.pageNum);
      this.getdata()
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
  },
}
</script>

<style scoped lang='less'  >
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
.right_main_under /deep/ .el-button-shanchu:focus,
.right_main_under /deep/ .el-button-shanchu:hover {
  background: url(../assets/img/shouye/删除按钮.png) no-repeat;
  background-size: 100% 100%;
}
.right_main_under /deep/ .el-button-quxiao:focus,
.right_main_under /deep/ .el-button-quxiao:hover {
  background: url(../assets/img/shouye/取消按钮灰.png) no-repeat;
  background-size: 100% 100%;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  letter-spacing: 2px;
}
// .bottom {
//   // background: url(../assets/img/shouye/部门管理.png);
//   border: 3px solid #23749c;

//   background-size: 100% 100%;
//   // padding: 20px 0;
//   margin-top: 30px /* 30/16 */ /* 600/16 */;
//   // overflow: hidden;
//   overflow-y: scroll;
//   height: 95%;
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
  background-color: #23749c;
}
.block {
  padding: 20px;
}
/deep/ .el-timeline-item__timestamp {
  color: #f5f5f5 !important;
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
</style>