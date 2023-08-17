<template>
  <div class="right_main_under">
    <Navlist></Navlist>
    <el-row style="margin-bottom: 20px" v-if="getRole1('saveRole')">
      <el-col :span="24">
        <!-- <el-button
          class="el-button-chaxun left top"
          type="primary"
          size="mini"
          @click="add"
          >添加</el-button
        > -->
      </el-col>
    </el-row>

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
      <el-table-column label="序号" prop="id" v-if="loadings">
      </el-table-column>
      <el-table-column prop="ID" label="序号" type="index" width="150">
        <template slot-scope="scope">
          <div v-if="Object.keys(scope.row).length > 0">
            <span v-text="getIndex(scope.$index)"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName">
        <!-- <template slot-scope="scope">
                {{ js(scope.row.roleName) }}
              </template> -->
      </el-table-column>
      <el-table-column label="角色标识" prop="remark"> </el-table-column>
      <el-table-column label="角色描述" prop="descr"> </el-table-column>
      <!-- <el-table-column label="数据权限" prop="fraudTime">
            </el-table-column> -->
      <el-table-column label="创建时间" prop="createTime"> </el-table-column>
      <el-table-column
        label="操作"
        v-if="getRole1('updateRoleName' && 'delRole' && 'saveRoleMenuRefList')"
      >
        <template slot-scope="scope">
          <div v-if="Object.keys(scope.row).length > 0">
            <el-button
              type="text"
              size="mini"
              @click="bj(scope.row)"
              v-if="getRole1('updateRoleName')"
              style="color: #7ffdf9"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="del(scope.row.id)"
              v-if="getRole1('delRole')"
              style="color: #fa7b7e"
              >删除</el-button
            >
            <!-- <el-button
                  type="text"
                  size="mini"
                  @click="qxs(scope.row.id)"
                  v-if="getRole1('saveRoleMenuRefList')"
                  >权限</el-button
                > -->
          </div>
        </template>
        <!-- <el-button type="text" size="mini">查看</el-button> -->
      </el-table-column>
    </el-table>
    <!-- //分页 -->
    <div class="bottom">
      <div class="right">
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

    <!-- ============================= -->
    <!-- 
    <el-dialog
      title="新 增"
      :visible.sync="dialog"
      width="35%"
      :before-close="handleClose"
      class="dialogInfo"
    >
      <el-form
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="domainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="角色名称:">
          <el-input v-model="domainSimpleVo.jsmc1"></el-input>
        </el-form-item>
        <el-form-item label="角色标识:">
          <el-input v-model="domainSimpleVo.jsbs1" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述:">
          <el-input
            v-model="domainSimpleVo.jsms1"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
       <el-form-item label="数据权限:">
          <el-input
            v-model="domainSimpleVo.sjqx1"
            placeholder="请输入数据权限"
          ></el-input>
        </el-form-item> -->
    <!-- </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false" type="primary" size="mini"
          >保 存</el-button
        >
        <el-button type="primary" @click="dialog = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog> -->
    <!-- ============================== -->
    <el-dialog
      title="编 辑"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules1"
        ref="domainSimpleVo1"
        label-width="100px"
        :inline="true"
        :model="domainSimpleVo1"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="id:">
          <el-input v-model="domainSimpleVo1.id1" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称:" prop="jsmc1">
          <el-input
            v-model.trim="domainSimpleVo1.jsmc1"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色标识:" prop="yhm1">
          <el-select
            v-model="domainSimpleVo1.yhm1"
            placeholder="请选择角色标识"
          >
            <el-option
              label="CD_SUPER_ADMIN"
              value="CD_SUPER_ADMIN"
            ></el-option>
            <el-option label="CD_OPERATION" value="CD_OPERATION"></el-option>
            <!-- <el-option label="CD_ADMIN" value="CD_ADMIN"></el-option> -->
          </el-select>
          <!-- <el-input
            
            v-model="domainSimpleVo1.yhm1"
            placeholder="请输入角色标识"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="角色描述:" prop="pass1">
          <el-input
            :rows="4"
            resize="none"
            type="textarea"
            v-model.trim="domainSimpleVo1.pass1"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="数据权限:">
          <el-input
            v-model="newdomainSimpleVo.ssbm"
            placeholder="请输入数据权限"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm1('domainSimpleVo1')"
          type="primary"
          size="mini"
          class="el-button-xitongerr"
          >修 改</el-button
        >
        <el-button
          class="el-button-xitongup"
          type="primary"
          @click="dialogVisible = false"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ------------------- -->

    <el-dialog
      title="新 增"
      :visible.sync="dialog"
      width="35%"
      :before-close="handleClose"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules"
        ref="newdomainSimpleVo"
        label-width="90px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="角色名称:" prop="jsmc">
          <el-input
            v-model.trim="newdomainSimpleVo.jsmc"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色标识:" prop="yhm">
          <el-select
            v-model="newdomainSimpleVo.yhm"
            placeholder="请选择角色标识"
          >
            <el-option
              label="CD_SUPER_ADMIN"
              value="CD_SUPER_ADMIN"
            ></el-option>
            <el-option label="CD_OPERATION" value="CD_OPERATION"></el-option>
            <el-option label="CD_ADMIN" value="CD_ADMIN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述:" prop="pass">
          <el-input
            :rows="4"
            resize="none"
            type="textarea"
            v-model.trim="newdomainSimpleVo.pass"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm('newdomainSimpleVo')"
          type="primary"
          size="mini"
          class="el-button-xitongerr"
          >添 加</el-button
        >
        <el-button
          class="el-button-xitongup"
          type="primary"
          @click="quxiao2"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ===================== -->
    <el-dialog
      title="权限"
      :visible.sync="newdialog"
      width="30%"
      :before-close="handleClose2"
      class="dialogInfo"
    >
      <!-- <el-tree
        :data="newdata"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expanded-keys="[2, 3]"
        :props="defaultProps"
      > -->
      <!-- eslint -->
      <div class="tree_sorcll">
        <el-tree
          ref="tree"
          :data="newdata"
          show-checkbox
          highlight-current
          node-key="id"
          :expand-on-click-node="false"
          :props="defaultProps"
          @check-change="handleCheckChange"
          :default-checked-keys="labellist"
          :check-strictly="true"
        >
        </el-tree>
      </div>

      <!-- </el-tree> -->
      <span slot="footer" class="dialog-footer">
        <el-button
          class="el-button-xitongerr"
          @click="genxin"
          type="primary"
          size="mini"
          >更 新</el-button
        >
        <el-button
          class="el-button-xitongup"
          type="primary"
          @click="newdialog = false"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import getRole from '@/utils/promission.js'
export default {
  name: 'jiaose',
  data() {
    return {
      rules: {
        jsmc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度不能超出20个字符',
            trigger: 'blur',
          },
        ],
        yhm: [{ required: true, message: '请选择角色标识', trigger: 'blur' }],
        pass: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度不能超出100个字符',
            trigger: 'blur',
          },
        ],
      },
      rules1: {
        jsmc1: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度不能超出20个字符',
            trigger: 'blur',
          },
        ],
        yhm1: [{ required: true, message: '请选择角色标识', trigger: 'blur' }],
        pass1: [
          { required: true, message: '请选择角色描述', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度不能超出100个字符',
            trigger: 'blur',
          },
        ],
      },
      loadings: false,
      arr1: [],
      // form1:{
      //   permissions:[]
      // },
      newdata: [],
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      newdialog: false,
      dialog: false,
      dialogVisible: false,
      form: {
        role: '',
        role1: '',
        role2: '',
      },
      domainSimpleVo: {
        jsmc1: '',
        jsbs1: '',
        jsms1: '',
        sjqx1: '',
      },
      tableData: [],
      newdomainSimpleVo: {
        jsmc: '',
        yhm: '',
        pass: '',
        ssbm: '',
      },
      domainSimpleVo1: {
        id1: '',
        jsmc1: '',
        yhm1: '',
        pass1: '',
        ssbm1: '',
      },
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: '',
      quanxian: '',
      a: [],
      b: [],
      labellist: [],
      heights: undefined,
    }
  },
  mounted() {
    this.yangshi()
  },
  created() {
    this.getTabData()
    this.quan()
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
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

    async quan() {
      const { data: res } = await this.$http.post('/menu/queryUserMenuList')
      if (res.data == 200) {
        console.log(res.data)
      }
    },

    getIndex($index) {
      //$index为数据下标,对英序号要加一
      // console.log($index)
      return (
        (this.mypageable.pageNum - 1) * this.mypageable.pageSize + $index + 1
      )
    },
    getRole1(data) {
      return getRole(data)
      // console.log( getRole(data));
    },
    // 新增验证
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tianjia()

          this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['newdomainSimpleVo'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    quxiao2() {
      let that = this
      this.$nextTick(() => {
        that.$refs['newdomainSimpleVo'].clearValidate()
      })
      this.dialog = false
    },
    //初始化列表
    async getTabData() {
      let list = {
        pageSize: this.mypageable.pageSize,
        pageNum: this.mypageable.pageNum,
      }
      const { data: res } = await this.$http.post('/role/findAllRole', list)
      // console.log(res);
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
    //添加
    async tianjia() {
      let list = {
        roleName: this.newdomainSimpleVo.jsmc,
        descr: this.newdomainSimpleVo.pass,
        remark: this.newdomainSimpleVo.yhm,
      }
      const { data: res } = await this.$http.post('/role/saveRole', list)
      if (res.code == 200) {
        this.$message(res.message)
        this.getTabData()
        this.dialog = false
      } else {
        this.$message(res.message)
        this.dialog = false
      }
    },
    submitForm1(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.xiugai()

          this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['domainSimpleVo1'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    //修改
    async xiugai() {
      let list = {
        id: this.domainSimpleVo1.id1,
        roleName: this.domainSimpleVo1.jsmc1,
        descr: this.domainSimpleVo1.pass1,
        remark: this.domainSimpleVo1.yhm1,
      }
      const { data: res } = await this.$http.post('/role/updateRoleName', list)
      if (res.code == 200) {
        this.$message(res.message)
        this.getTabData()
        this.clear1()
        this.dialogVisible = false
      } else {
        this.$message(res.message)
        this.dialogVisible = false
      }
    },
    //删除
    async del(val) {
      let list = {
        id: val,
      }
      const { data: res } = await this.$http.post('/role/delRole', list)
      if (res.code == 200) {
        this.$message(res.message)
        let totalPage = Math.ceil((this.total - 1) / this.mypageable.pageSize) // 总页数
        let currentPage =
          this.mypageable.pageNum > totalPage
            ? totalPage
            : this.mypageable.pageNum
        this.mypageable.pageNum = currentPage < 1 ? 1 : currentPage

        this.getTabData()
      } else {
        this.$message(res.message)
      }
    },
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes() // 重点
      // console.log(res)
      let arr = []
      res.forEach((item) => {
        arr.push(item.id)
      })
      this.arr1 = arr.concat(
        this.$refs.tree.getHalfCheckedKeys() // 重点
      )
      // console.log(this.arr1)
      // this.form1.permissions = arr;
      // console.log(this.form1.permissions);
    },

    //更新
    async genxin(val) {
      // console.log(this.b);
      let list = {
        roleId: this.quanxian,
        menuIds: this.arr1.toString(),
      }
      console.log(list)
      const { data: res } = await this.$http.post(
        '/roleMenuRef/saveRoleMenuRefList',
        list
      )
      if (res.code == 200) {
        // this.a = [];
        // this.b = [];
        // this.qx();
        this.newdialog = false
        this.$message(res.message)
        this.$router.go(0)
      } else {
        this.$message(res.message)
      }
    },

    //新增
    handleClose() {
      this.dialog = false
    },
    //权限
    async qx(val) {
      const { data: res } = await this.$http.get('/menu/queryMenuTree')
      // console.log(res);
      if (res.code == 200) {
        this.newdialog = true
        this.newdata = res.data
      }
    },
    //当前角色选择的权限
    async qxs(val) {
      this.quanxian = val
      this.labellist = []
      const { data: res } = await this.$http.get('/menu/queryRoleMenuList', {
        params: {
          role_id: this.quanxian,
        },
      })
      // console.log(res);
      if (res.code == 200) {
        this.getAllNodeId(this.labellist, res.data)
        // console.log(this.labellist)
        this.qx()
      } else {
        this.qx()
      }
    },
    // 递归获取所有节点id
    getAllNodeId(expandedKeys, moduleDataList) {
      for (let i = 0; i < moduleDataList.length; i++) {
        // console.log('i in getAllNodeId: ', i)
        // console.log(
        //   'moduleDataList[i].id  in getAllNodeId: ',
        //   moduleDataList[i].id
        // )
        expandedKeys.push(moduleDataList[i].id)
        if (moduleDataList[i].children) {
          expandedKeys = this.getAllNodeId(
            expandedKeys,
            moduleDataList[i].children
          )
        }
      }
      return expandedKeys
    },

    search() {},
    clear() {
      this.form.role = ''
      this.form.role1 = ''
      this.form.role2 = ''
    },
    clear1() {
      ;(this.domainSimpleVo.id = ''),
        (this.domainSimpleVo.jsmc = ''),
        (this.domainSimpleVo.pass = ''),
        (this.domainSimpleVo.yhm = '')
    },
    handleSelectionChange() {},
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
      this.dialog = true
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
    // 编辑
    bj(val) {
      // console.log(val);
      this.dialogVisible = true
      this.domainSimpleVo1.jsmc1 = val.roleName
      this.domainSimpleVo1.yhm1 = val.remark
      this.domainSimpleVo1.pass1 = val.descr
      this.domainSimpleVo1.id1 = val.id
      let that = this
      this.$nextTick(() => {
        that.$refs['domainSimpleVo1'].clearValidate()
      })
    },

    handleClose1() {
      this.dialogVisible = false
    },
    //权限
    handleClose2() {
      this.newdialog = false
    },

    js(val) {
      if (val == 'superAdmin') {
        return '超管'
      } else if (val == 'operation') {
        return '操作员'
      } else if (val == 'admin') {
        return '管理员'
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
  },
}
</script>

<style scoped lang='less'>
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
  float: left;
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
.top {
  margin-bottom: 10px;
}
.dialogInfo /deep/ .el-dialog {
  background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  opacity: 0.85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 3px !important;
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
/deep/ .el-textarea__inner {
  background-color: #234861bf;
  border: 1px solid #394865;
}
/deep/ .el-textarea__inner::-webkit-input-placeholder {
  color: #ccc;
  font-family: 'siyuanheitinormal1';
}
/deep/ .el-textarea__inner {
  // background-color: #234861bf;
  border: 0.005208rem solid #394865;
  color: #fdf6ec;
  font-family: 'siyuanheitinormal1';
}
/deep/ .el-tree {
  color: #fff;
  background: url(../assets/img/shouye/内容背景框.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px;
}
/deep/ .el-tree-node__content:hover {
  background-color: transparent;
}
/deep/ .el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
.tree_sorcll {
  width: 100%;
  height: 350px;
  overflow-y: scroll;
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
.list_xia {
  padding-bottom: 20px;
  background-color: rgba(8, 38, 61, 0.6);
}
</style>