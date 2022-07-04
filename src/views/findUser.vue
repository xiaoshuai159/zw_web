<template>
  <div class="right_main_under">
    <Navlist></Navlist>
    <!-- <div class="title_top">查询条件</div> -->
    <div class="bg">
      <el-row>
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            <el-form
              size="mini"
              :inline="true"
              class="demo-form-inline"
              ref="usernamelist"
              :model="usernamelist"
            >
              <!-- :rules="rules2" -->
              <el-form-item label="用户名:" class="search_select_form">
                <!-- prop="name" -->
                <el-input
                  v-model.trim="usernamelist.name"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="margin-left: 10px"
                  class="el-button-chaxun"
                  type="primary"
                  @click.native.stop="search"
                >
                  搜索</el-button
                >
                <el-button
                  class="el-button-chongzhi"
                  style="margin-left: 10px"
                  type="primary"
                  @click.native.stop="clear"
                >
                  清空</el-button
                >
              </el-form-item>
            </el-form>
          </div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">
            <el-button
              style="margin-right: 20px"
              v-if="getRole1('saveUser')"
              class="el-button-chaxun left"
              type="primary"
              size="mini"
              @click="add"
              >添加用户</el-button
            >
          </div></el-col
        >
      </el-row>

      <!-- <el-row >
        <el-col :span="12"
          ><div class="grid-content bg-purple">
           
          </div></el-col
        >
      
      </el-row> -->
    </div>
    <!-- <div class="title_top">查询结果</div> -->

    <!-- <div  class="list_xia"> -->
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
      <!-- :row-style="{ height: 0 }" -->
      <!-- :cell-style="{ padding: 0 }" -->
      <el-table-column label="序号" prop="id" v-if="isLoading">
      </el-table-column>
      <el-table-column label="密码" prop="password" v-if="isLoading">
      </el-table-column>
      <el-table-column label="用户名" prop="username"> </el-table-column>
      <el-table-column label="角色" prop="role_name">
        <!-- <template slot-scope="scope">
             
                {{ juese(scope.row.role_name) }}
              </template> -->
      </el-table-column>

      <el-table-column label="警号" prop="police_num" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="电话号码" prop="phone"> </el-table-column>
      <!-- <el-table-column label="部门" prop="dept_name"> </el-table-column> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ state(scope.row.state) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="create_time"> </el-table-column>
      <el-table-column label="更新时间" prop="update_time"> </el-table-column>
      <el-table-column label="备注" prop="remark" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" v-if="getRole1('updateUser' && 'delUser')">
        <template slot-scope="scope">
          <div v-if="Object.keys(scope.row).length > 0">
            <el-button
              type="text"
              size="mini"
              @click="bj(scope.row)"
              v-if="getRole1('updateUser')"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="del(scope.row.id)"
              v-if="getRole1('delUser')"
              style="color: #fa7b7e"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页 -->
    <div class="bottom">
      <div class="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="customPageable.pageNum"
          :page-sizes="[15, 30, 45]"
          :page-size="customPageable.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>

    <!-- ============================= -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules"
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        size="mini"
        class="demo-form-inline search_select_form"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="newdomainSimpleVo.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="newdomainSimpleVo.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="photo">
          <el-input
            v-model="newdomainSimpleVo.photo"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="state">
          <el-select v-model="newdomainSimpleVo.state" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in this.roleList"
              :value="item.id"
              :label="item.roleName"
              :key="index"
            ></el-option>
            <!-- <el-option label="操作员" value="2"></el-option>
            <el-option label="管理员" value="3"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="警号" prop="jh">
          <el-input
            v-model="newdomainSimpleVo.jh"
            placeholder="请输入警号"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门" prop="bm">
          <el-select
            v-model="newdomainSimpleVo.bm"
            placeholder="请输入部门"
            ref="selecttreeadd"
          >
            <el-option
              hidden
              :value="xiugaixialid"
              :label="newdomainSimpleVo.bm"
            >
            </el-option>
          
            <el-tree
              ref="tree"
              :data="treedata"
              default-expand-all
              node-key="id"
              :props="defaultProps"
              :expand-on-click-node="false"
              :check-on-click-node="true"
              @node-click="handleNodeClick"
              style="height: auto; max-width: 400px"
              class="tree_bg"
            >
              <span class="span-ellipsis" slot-scope="{ node }">
                <span :title="node.label">{{ node.label }}</span>
              </span>
            </el-tree>
         
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注" prop="bz">
          <el-input
            v-model="newdomainSimpleVo.bz"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="状态">
          <el-radio v-model="newdomainSimpleVo.radio" label="1">有效</el-radio>
          <el-radio v-model="newdomainSimpleVo.radio" label="0">锁定</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="el-button-xitongerr"
          type="primary"
          size="mini"
          @click="submitForm('newdomainSimpleVo')"
          >确 定</el-button
        >
        <el-button
          class="el-button-xitongup"
          @click="quxiao"
          type="primary"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++ -->
    <el-dialog
      title="编辑"
      :visible.sync="dialog"
      width="35%"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <!--  -->
      <el-form
        :rules="rules1"
        ref="domainSimpleVo"
        label-width="90px"
        :inline="true"
        :model="domainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="id:" v-if="isLoading">
          <el-input v-model="domainSimpleVo.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="yhm">
          <el-input v-model="domainSimpleVo.yhm" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pass">
          <el-input
            v-model="domainSimpleVo.pass"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号:" prop="xinphoto">
          <el-input
            v-model="domainSimpleVo.xinphoto"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="xinrole">
          <el-select v-model="domainSimpleVo.xinrole" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in this.roleList"
              :value="item.id"
              :label="item.roleName"
              :key="index"
            ></el-option>

            <!-- <el-option label="操作员" value="operation"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="超级管理员" value="superAdmin"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="警号:" prop="xinjh">
          <el-input
            v-model="domainSimpleVo.xinjh"
            placeholder="请输入警号"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="所属部门:" prop="ssbm">
          <el-select
            ref="selecttree"
            v-model="domainSimpleVo.ssbm"
            placeholder="请输入所属部门"
          >
            <el-option
              :value="treeDataValue1"
              style="height: auto; max-width: 500px"
            >
              <el-tree
                ref="tree1"
                :data="treedata1"
                default-expand-all
                node-key="id"
                :props="defaultProps"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                @node-click="handleNodeClick1"
              >
                <span class="span-ellipsis" slot-scope="{ node }">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注:" prop="xinbz">
          <el-input
            v-model="domainSimpleVo.xinbz"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="domainSimpleVo.state" label="1">有效</el-radio>
          <el-radio v-model="domainSimpleVo.state" label="0">锁定</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm1('domainSimpleVo')"
          type="primary"
          size="mini"
          class="el-button-xitongerr"
          >修 改</el-button
        >
        <el-button
          class="el-button-xitongup"
          type="primary"
          @click="quxiao1"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 、、、、、、、、、、、、、、、、、、、、、、 -->
  </div>
</template>

<script>
import getRole from '@/utils/promission.js'
import Navlist from '@/components/hearderdongtainav.vue'
export default {
  name: 'quanxian',
  data() {
    let reg = /^[a-zA-Z0-9]{5,10}$/
    let reg1 = /^(?=.*[a-z])[a-z0-9]+/gi
    var validateNewUser = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入用户名!'))
      } else if (!reg.test(value)) {
        callback(new Error('用户名长度为5到10位且只包含英文字母和数字'))
      } else {
        this.userName(value).then((res) => {
          // console.log(res)
          if (res.data) {
            callback(new Error('用户名不可用'))
          } else {
            callback()
          }
        })
      }
    }

    return {
      heights: undefined,
      flag: 0,
      roleList: [],
      xiugaixialid: '',
      xiugaixialid1: '',
      treeData: '',
      treeData1: '',
      treeDataValue: '',
      treeDataValue1: '',
      treedata: [],
      treedata1: [],
      defaultProps: {
        children: 'children',
        label: 'deptName',
      },
      usernamelist: {
        name: null,
      },
      isLoading: false,
      dialog: false,
      dialogVisible: false,
      form: {
        user: '',
      },
      tableData: [],
      newdomainSimpleVo: {
        user: '',
        pwd: '',
        // bm: '',
        photo: '',
        role: '',
        jh: '',
        radio: '0',
        state: '',
        bz: '',
      },
      domainSimpleVo: {
        ids: '',
        yhm: '',
        pass: '',
        ssbm: '',
        xinphoto: '',
        xinrole: '',
        state: '',
        time: '',
        xinbz: '',
        xinjh: '',
      },
      selectData: {
        stateTypeData: [
          {
            value: 0,
            label: '成都',
          },
        ],
        stateTypeData1: [
          {
            value: 0,
            label: '管理员',
          },
          {
            value: 1,
            label: '游客',
          },
        ],
      },
      customPageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: '',
      rules2: {
        name: [
          { min: 5, max: 20, message: '输入5到20位字符', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{5,10}$/,
            message: '请输入数字与字母组合',
            trigger: 'blur',
          },
        ],
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateNewUser, trigger: 'blur' },
        ],

        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          { min: 8, max: 12, message: '密码长度为8到12位', trigger: 'blur' },
          // {
          //   validator: validateNewPwd,
          //   trigger: 'blur',
          // },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/,
            message: '格式不正确，请输入数字与字母组合',
            trigger: 'blur',
          },
        ],
        // bm: [
        //   {
        //     required: true,
        //     message: '请输入部门',
        //     trigger: 'blur',
        //   },
        // ],
        photo: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },

          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur',
          },
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
        state: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请选择状态',
            trigger: 'change',
          },
        ],
        jh: [
          {
            min: 0,
            max: 40,
            message: '超出限制,最多输入40个字符',
            trigger: 'blur',
          },
        ],
        bz: [{ min: 0, max: 40, message: '最多输入40个字符', trigger: 'blur' }],
      },
      rules1: {
        yhm: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '用户名称长度为5到10位且只能包含英文字母、数字',
            trigger: 'blur',
          },
        ],

        pass: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          { min: 8, max: 12, message: '密码长度为8到12位', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/,
            message: '格式不正确，请输入数字与字母组合',
            trigger: 'blur',
          },
        ],
        ssbm: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'blur',
          },
        ],
        xinphoto: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },

          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur',
          },
        ],

        xinrole: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
          },
        ],
        xinjh: [
          { min: 0, max: 40, message: '最多输入40个字符', trigger: 'blur' },
        ],
        xinbz: [
          { min: 0, max: 40, message: '最多输入40个字符', trigger: 'blur' },
        ],
      },
    }
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },

  created() {
    this.getTabData()
    // this.getdata()
    this.getTabrole()
  },
  watch: {
    'domainSimpleVo.ssbm'() {
      let _this = this
      setTimeout(function () {
        _this.$refs.selecttree.blur()
      }, 50)
    },
    'newdomainSimpleVo.bm'() {
      let _this = this
      setTimeout(function () {
        _this.$refs.selecttreeadd.blur()
      }, 50)
    },
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

    async userName(data) {
      const { data: res } = await this.$http.get('/user/checkUserNameRepeat', {
        params: { username: data },
      })
      if (res.code == 200) {
        // return  {val :false}
        // console.log(res.data);
        return { data: false }
      } else {
        // console.log(res.data);
        return { data: true }
      }
    },
    getRole1(data) {
      return getRole(data)
    },
    //初始化数据
    async getTabData() {
      let list = {
        customPageable: {
          pageNum: this.customPageable.pageNum,
          pageSize: this.customPageable.pageSize,
        },
        username: this.usernamelist.name,
      }
      const { data: res } = await this.$http.post('/user/findUser', list)

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
      } else {
        this.$message('无数据')
      }
    },
    // 添加 ——角色
    async getTabrole() {
      const { data: res } = await this.$http.get(
        '/userRoleRef/queryUserRoleList'
      )
      if (res.code == 200) {
        // console.log(res.data)
        this.roleList = res.data
        // console.log(this.roleList);
      }
    },
    //tree
    // async getdata() {
    //   const { data: res } = await this.$http.get('/dept/queryDeptList')
    //   // console.log(res);
    //   if (res.code == 200) {
    //     this.treedata = res.data
    //     this.treedata1 = res.data
    //     // console.log(this.treedata1)
    //   }
    // },

    //下拉狂
    handleNodeClick(treedata, node, nodeData) {
      this.treeDataValue = treedata
      this.newdomainSimpleVo.bm = treedata.deptName
      this.xiugaixialid = treedata.id
    },
    handleNodeClick1(treedata1, node, nodeData) {
      this.treeDataValue1 = treedata1
      this.domainSimpleVo.ssbm = treedata1.deptName
      this.xiugaixialid1 = treedata1.id
    },

    //删除
    async del(val) {
      //  Number
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data: res } = await this.$http.get('/user/delUser', {
            params: { id: val },
          })
          if (res.code == 200) {
            this.$message('删除成功')
            let totalPage = Math.ceil(
              (this.total - 1) / this.customPageable.pageSize
            ) // 总页数

            let currentPage =
              this.customPageable.pageNum > totalPage
                ? totalPage
                : this.customPageable.pageNum

            this.customPageable.pageNum = currentPage < 1 ? 1 : currentPage

            this.getTabData()
          } else {
            this.$message(res.message)
          }
        })
        .catch(() => {
          this.$message('已取消删除')
        })
    },
    //修改
    submitForm1(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.xiugai()

          // this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['domainSimpleVo'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    async xiugai() {
      // console.log(this.domainSimpleVo.id);
      // if (this.domainSimpleVo.ssbm == '') {
      //   this.$message('请选择部门')
      //   return
      // } else {
      let list = {
        userVo: {
          password: this.domainSimpleVo.pass,
          id: this.domainSimpleVo.ids,
          phone: this.domainSimpleVo.xinphoto,
          policeNum: this.domainSimpleVo.xinjh,
          username: this.domainSimpleVo.yhm,
          remark: this.domainSimpleVo.xinbz,
          state: this.domainSimpleVo.state,
        },
        roleVo: {
          // roleName: this.domainSimpleVo.xinrole,
          id: this.domainSimpleVo.xinrole,
        },
        deptVo: {
          id: this.xiugaixialid1,
          // id: this.xiugaixialid1,
        },
      }

      const { data: res } = await this.$http.post('/user/updateUser', list)

      if (res.code == 200) {
        this.dialog = false
        this.$message(res.data)
        this.getTabData()
        this.domainSimpleVo.ssbm = ''
      } else {
        this.$message(res.message)
      }
      // }
    },
    //
    // submitForm2(formName) {
    //   let that = this
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       that.search()

    //       // this.dialogVisible = false
    //       this.$nextTick(() => {
    //         that.$refs['usernamelist'].clearValidate()
    //       })
    //     } else {
    //       // console.log('error submit!!');
    //       return false
    //     }
    //   })
    // },
    async search() {
      this.customPageable.pageNum = 1
      this.getTabData()
      // this.$nextTick(() => {
      //   that.$refs['usernamelist'].clearValidate()
      // })
      // let list = {
      //   customPageable: {
      //     pageNum: this.customPageable.pageNum,
      //     pageSize: this.customPageable.pageSize,
      //   },
      //   username: this.usernamelist,
      // };
      // const { data: res } = await this.$http.post("/user/findUser", list);

      // if (res.code == 200) {
      //   this.tableData = res.data.content;
      //   this.total = res.data.totalElements;
      //   this.totalPages = res.data.totalPages;
      // } else {
      //   this.$message("无数据");
      // }
    },

    clear() {
      let that = this
      this.usernamelist.name = ''
      this.$nextTick(() => {
        that.$refs['usernamelist'].clearValidate()
      })
      this.getTabData()
    },
    handleSelectionChange() {},
    //置空
    add() {
      this.newdomainSimpleVo = {
        user: '',
        pwd: '',
        bm: '',
        photo: '',
        role: '',
        jh: '',
        radio: '0',
      }
      this.dialogVisible = true
    },

    handleClose(done) {
      this.dialogVisible = false
    },
    handleClose1(done) {
      this.domainSimpleVo.ssbm = ''
      this.dialog = false
    },
    getRowKeys(row) {
      return row.id
    },
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(1)
          this.tianjia()

          this.$nextTick(() => {
            that.$refs['newdomainSimpleVo'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },

    async tianjia() {
      let list = {
        userVo: {
          password: this.newdomainSimpleVo.pwd,
          phone: this.newdomainSimpleVo.photo,
          policeNum: this.newdomainSimpleVo.jh,
          username: this.newdomainSimpleVo.user,
          state: this.newdomainSimpleVo.radio,
          remark: this.newdomainSimpleVo.bz,
        },
        roleVo: {
          id: this.newdomainSimpleVo.state,
        },
        deptVo: {
          id: this.xiugaixialid,
        },
      }
      const { data: res } = await this.$http.post('/user/saveUser', list)
      if (res.code == 200) {
        this.dialogVisible = false
        this.$message(res.data)
        this.getTabData()
      } else {
        this.$message(res.message)
        // this.dialogVisible = false
      }
    },
    quxiao() {
      this.$nextTick(() => {
        this.$refs['newdomainSimpleVo'].clearValidate()
      })
      this.dialogVisible = false
    },
    quxiao1() {
      this.$nextTick(() => {
        this.$refs['domainSimpleVo'].clearValidate()
      })
      this.dialog = false
    },
    handleSizeChange(val) {
      // console.log(val);
      this.customPageable.pageSize = val
      this.getTabData()
    },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.customPageable.pageNum = val

      // console.log( this.customPageable.pageNum);
      this.getTabData()
    },
    // 编辑
    bj(val) {
      console.log(val)
      // console.log(val);
      this.dialog = true
      this.domainSimpleVo.ids = val.id
      this.domainSimpleVo.yhm = val.username
      // this.domainSimpleVo.pass = val.pwd;
      this.domainSimpleVo.ssbm = val.dept_name
      this.xiugaixialid1 = val.dept_id
      // this.domainSimpleVo.ssbm = val.id
      // console.log(   this.domainSimpleVo.ssbm);
      this.domainSimpleVo.xinphoto = val.phone
      this.domainSimpleVo.xinrole = val.role_id
      this.domainSimpleVo.state = JSON.stringify(val.state)
      this.domainSimpleVo.time = val.create_time
      this.domainSimpleVo.xinjh = val.police_num
      this.domainSimpleVo.pass = val.password
      this.domainSimpleVo.xinbz = val.remark
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
    // 角色
    juese(val) {
      // console.log(this.roleList);
      let that = this

      for (var i = 0; i < that.roleList.length; i++) {
        if (val == that.roleList[i].roleName) {
          return (val = that.roleList[i].descr)
        }
      }
      // if (val == 'superAdmin') {
      //   return '超级管理员'
      // } else if (val == 'operation') {
      //   return '操作员'
      // } else if (val == 'admin') {
      //   return '管理员'
      // }
    },
    state(val) {
      if (val == '1') {
        return '有效'
      } else if (val == '0') {
        return '锁定'
      }
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
.right_main_under /deep/ .el-button-xitongerr:focus,
.right_main_under /deep/ .el-button-xitongerr:hover {
  background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}
.right_main_under /deep/ .el-button-xitongup:focus,
.right_main_under /deep/ .el-button-xitongup:hover {
  background: url(../assets/img/shouye/取消按钮.png) no-repeat;
  background-size: cover;
  border: none;
}
// 列表斑马线
.right_main_under /deep/ .el-table__body tr:hover > td {
  background-color: transparent !important;
}

.eright_main_under /deep/ .el-table__body tr.current-row > td {
  background-color: transparent !important;
}

.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.left {
  float: right;
}
.bottom {
  width: 100%;
  height: 40px;
  background-color: rgba(11, 48, 78, 0.5);
  padding-bottom: 1%;
}
.right {
  float: right;
}
.el-table::before {
  height: 0px;
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
//   border-radius: .625rem /* 10/16 */;
//   padding: 0.625rem /* 10/16 */ /* 20/16 */;
//   background-color:rgb(1, 29, 58,.9) ;
//   opacity: .9;
//   // background: url(../assets/img/list/zhongkuang.png) no-repeat;
//   // background-size: 100%;

// }
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  opacity: 0.85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 5px !important;
    right: 5px;
    .el-dialog__close {
      color: #fff;
      font-size: 16px;
    }
  }
  .el-dialog__header {
    margin: 20px 20px 20px 20px;
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

/deep/ .el-tree-node__content:hover {
  background-color: rgba(204, 204, 204, 0.5) !important;
}
/deep/ .el-select-dropdown__item.hover {
}
</style>