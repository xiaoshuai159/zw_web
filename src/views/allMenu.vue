<template>
  <div class="right_main_under1">
    <Navlist></Navlist>

      <el-row :span="24"  style="margin-bottom: 20px;">
        <el-button
          class="el-button-chaxun"
          type="primary"
          size="mini"
          @click="add1"
          >新增一级</el-button
        >
      </el-row>
 
    
        <el-table
          :row-class-name="tableRowClassName"
          :data="tableData1"
          style="width: 100%;"
            height="calc(100% - 10%)"
          row-key="id"
        :header-cell-style="{'text-align':'center'}"
          class="tableStyle1"
          :default-expand-all="true"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="menuName" label="菜单名字"> </el-table-column>
          <el-table-column prop="id" label="id" v-if="oneloading">
          </el-table-column>
          <el-table-column prop="pid" label="pid" v-if="oneloading">
          </el-table-column>
          <el-table-column prop="menuUrl" label="路径" v-if="oneloading">
          </el-table-column>
          <el-table-column prop="name" label="路由" align="center"> </el-table-column>
          <el-table-column prop="sort" label="排序" align="center"> </el-table-column>
          <el-table-column prop="creatTime" label="创建时间" align="center"> </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" align="center">
          </el-table-column>

          <el-table-column label="删除标记" align="center">
            <template slot-scope="scope">
              {{ biaoji(scope.row.delFlag) }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ user(scope.row.menuType) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                style="color: #7ffdf9"
                @click="add(scope.row.id)"
                >新增</el-button
              >
              <el-button type="text" size="mini" @click="upload(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="mini"
                style="color: #f97b8f"
                @click="del(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
<div class="bottom"></div>
   

    <!-- 111111111111111111111111 -->
    <el-dialog
      title="新 增"
      :visible.sync="dialog"
      width="40%"
      :before-close="handleClose"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules1"
        ref="domainSimpleVo"
        label-width="100px"
        :inline="true"
        :model="domainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="菜单名称:" prop="menuName1">
          <el-input v-model="domainSimpleVo.menuName1"></el-input>
        </el-form-item>
        <el-form-item label="路径:" prop="menuUrl1">
          <el-input
            v-model="domainSimpleVo.menuUrl1"
            placeholder="请输入新路径(如：/xxx/xxx)"
          ></el-input>
        </el-form-item>

        <el-form-item label="序号:" prop="xuhao1">
          <el-input
            v-model="domainSimpleVo.xuhao1"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item label="类型:" prop="state1">
          <el-select v-model="domainSimpleVo.state1" placeholder="请选择">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="按钮" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由:" prop="name1">
          <el-input
            v-model="domainSimpleVo.name1"
            placeholder="请输入路由(如：/xxx)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm1('domainSimpleVo')"
          type="primary"
          size="mini"
          class="el-button-chaxun"
          >保 存</el-button
        >
        <el-button
          class="el-button-chongzhi"
          type="primary"
          @click="dialog = false"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++++++ 新增一级 -->
    <el-dialog
      title="新增一级"
      :visible.sync="dialogyiji"
      width="40%"
      :before-close="handleCloseyiji"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules"
        ref="domainSimpleVoyiji"
        label-width="100px"
        :inline="true"
        :model="domainSimpleVoyiji"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="菜单名称:" prop="menuName1">
          <el-input v-model="domainSimpleVoyiji.menuName1"></el-input>
        </el-form-item>
        <el-form-item label="路径:" prop="menuUrl1">
          <el-input
            v-model="domainSimpleVoyiji.menuUrl1"
            placeholder="请输入新路径(如：/xxx/xxx)"
          ></el-input>
        </el-form-item>

        <el-form-item label="序号:" prop="xuhao1">
          <el-input
            v-model="domainSimpleVoyiji.xuhao1"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item label="类型:" prop="state1">
          <el-select v-model="domainSimpleVoyiji.state1" placeholder="请选择">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="按钮" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由:" prop="name1">
          <el-input
            v-model="domainSimpleVoyiji.name1"
            placeholder="请输入路由(如：/xxx)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="baocun1" type="primary" size="mini">保 存</el-button> -->

        <el-button
          class="el-button-chaxun"
          @click="submitForm('domainSimpleVoyiji')"
          type="primary"
          size="mini"
          >保 存</el-button
        >
        <el-button
          class="el-button-chongzhi"
          type="primary"
          @click="dialogyiji = false"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++++++ -->
    <!-- ============================== 修改-->
    <el-dialog
      title="修 改"
      :visible.sync="dialog1"
      width="40%"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules2"
        ref="domainSimpleVo1"
        label-width="100px"
        :inline="true"
        :model="domainSimpleVo1"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="菜单名称:" prop="menuName11">
          <el-input v-model="domainSimpleVo1.menuName11"></el-input>
        </el-form-item>
        <el-form-item label="路径:" v-if="hide">
          <el-input
            v-model="domainSimpleVo1.menuUrl11"
            placeholder="请输入新路径(如：/xxx/xxx)"
          ></el-input>
        </el-form-item>

        <el-form-item label="序号:" prop="xuhao11">
          <el-input
            v-model="domainSimpleVo1.xuhao11"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item label="类型:" prop="state11">
          <el-select v-model="domainSimpleVo1.state11" placeholder="请选择">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="按钮" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由:" prop="name11">
          <el-input
            disabled
            v-model="domainSimpleVo1.name11"
            placeholder="请输入路由(如：/xxx)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm2('domainSimpleVo1')"
          type="primary"
          size="mini"
          class="el-button-chaxun"
          >确定</el-button
        >
        <el-button
          class="el-button-chongzhi"
          type="primary"
          @click="dialog1 = false"
          size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ================================== -->
  </div>
</template>

<script>
import Navlist from '@/components/hearderdongtainav.vue'
import getRole from '@/utils/promission.js'
export default {
  name: 'NEwmeun',
  data() {
    return {
      rules: {
        menuName1: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur',
          },
        ],
        menuUrl1: [
          {
            required: true,
            message: '请输入路径',
            trigger: 'blur',
          },
        ],
        xuhao1: [
          {
            required: true,
            message: '请输入序号',
            trigger: 'blur',
          },
        ],
        state1: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          },
        ],
        name1: [
          {
            required: true,
            message: '请选择路由',
            trigger: 'blur',
          },
        ],
      },

      rules1: {
        menuName1: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur',
          },
        ],
        menuUrl1: [
          {
            required: true,
            message: '请输入路径',
            trigger: 'blur',
          },
        ],
        xuhao1: [
          {
            required: true,
            message: '请输入序号',
            trigger: 'blur',
          },
        ],
        state1: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          },
        ],
        name1: [
          {
            required: true,
            message: '请选择路由',
            trigger: 'blur',
          },
        ],
      },
      rules2: {
        menuName11: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur',
          },
        ],
        menuUrl11: [
          {
            required: true,
            message: '请输入路径',
            trigger: 'blur',
          },
        ],
        xuhao11: [
          {
            required: true,
            message: '请输入序号',
            trigger: 'blur',
          },
        ],
        state11: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          },
        ],
        name11: [
          {
            required: true,
            message: '请选择路由',
            trigger: 'blur',
          },
        ],
      },
      hide: false,
      domainSimpleVo: {
        menuName1: '',
        menuUrl1: '',
        xuhao1: '',
        state1: '',
        name1: '',
      },
      domainSimpleVoyiji: {
        menuName1: '',
        menuUrl1: '',
        xuhao1: '',
        state1: '',
        name1: '',
      },
      domainSimpleVo1: {
        menuName11: '',
        menuUrl11: '',
        xuhao11: '',
        state11: '',
        name11: '',
        pid1: '',
        id1: '',
      },
      pid: '',
      pidfather: '',
      oneloading: false,
      activeName: 'first',
      activeName1: 'first',
      dialog: false,
      dialogyiji: false,
      dialog1: false,

      zuo: {
        name1: null,
        router: null,
      },
      anniu: {
        name2: null,
        qxbs: null,
      },
      xiuzuo: {
        name1: null,
        router: null,
      },
      xiuanniu: {
        name2: null,
        qxbs: null,
      },
      tableData1: [],
    }
  },
  created() {
    this.getdata()
  },
  components: {
    Navlist: Navlist, //将别名demo 变成 组件 Demo
  },
  methods: {
    getRole1(data) {
      return getRole(data)
      // console.log( getRole(data));
    },
    // 初始化渲染
    async getdata() {
      const { data: res } = await this.$http.get('/menu/queryMenuTree')
      // console.log(res);
      if (res.code == 200) {
        this.tableData1 = res.data
        // console.log(this.tableData1)
      }
    },
    add(val) {
      // console.log(val);
      this.pid = val
      let that = this
      // this.$nextTick(() => {
      //   that.$refs['domainSimpleVo'].clearValidate()
      // })
      this.dialog = true
    },
    add1(val) {
      this.pidfather = val
      this.dialogyiji = true
      let that = this
      this.$nextTick(() => {
        that.$refs['domainSimpleVoyiji'].clearValidate()
      })
    },

    submitForm1(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.baocun()
          this.$nextTick(() => {
            that.$refs['domainSimpleVo'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    async baocun() {
      let list = {
        menuName: this.domainSimpleVo.menuName1,
        menuUrl: this.domainSimpleVo.menuUrl1,
        sort: this.domainSimpleVo.xuhao1,
        menuType: this.domainSimpleVo.state1,
        pid: this.pid,
        name: this.domainSimpleVo.name1,
      }
      console.log(list)
      const { data: res } = await this.$http.post('menu/saveMenu', list)
      if (res.code == 200) {
        this.$message('添加成功')
        this.getdata()
        this.dialog = false
      } else {
        this.dialog = false
        this.$message(res.message)
      }
    },
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.baocun1()

          this.$nextTick(() => {
            that.$refs['domainSimpleVoyiji'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    async baocun1() {
      let list = {
        menuName: this.domainSimpleVoyiji.menuName1,
        menuUrl: this.domainSimpleVoyiji.menuUrl1,
        sort: this.domainSimpleVoyiji.xuhao1,
        menuType: this.domainSimpleVoyiji.state1,
        // pid: this.pidfather,
        name: this.domainSimpleVoyiji.name1,
      }
      const { data: res } = await this.$http.post('menu/saveMenu', list)
      if (res.code == 200) {
        this.$message('添加成功')
        this.getdata()
        this.xinzengyijizhikong()
        this.dialogyiji = false
      } else {
        this.xinzengyijizhikong()
        this.dialogyiji = false
        this.$message(res.message)
      }
    },
    xinzengyijizhikong() {
      this.domainSimpleVoyiji.menuName1 = ''
      this.domainSimpleVoyiji.menuUrl1 = ''
      this.domainSimpleVoyiji.xuhao1 = ''
      this.domainSimpleVoyiji.state1 = ''
      this.domainSimpleVoyiji.name1 = ''
    },
    async del(val) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let list = {
            id: val,
          }
          const { data: res } = await this.$http.post('/menu/delMenuById', list)
          if (res.code == 200) {
            this.getdata()
            this.$message('删除成功!')
          } else {
            this.$message(res.message)
          }
        })
        .catch(() => {
          this.$message('已取消删除')
        })
    },
    upload(val) {
      this.domainSimpleVo1.menuName11 = val.menuName
      this.domainSimpleVo1.menuUrl11 = val.menuUrl
      this.domainSimpleVo1.xuhao11 = val.sort
      this.domainSimpleVo1.state11 = JSON.stringify(val.menuType)
      this.domainSimpleVo1.name11 = val.name
      this.domainSimpleVo1.pid1 = val.pid
      this.domainSimpleVo1.id1 = val.id

      this.dialog1 = true
      let that = this
      this.$nextTick(() => {
        that.$refs['domainSimpleVo1'].clearValidate()
      })
    },
    submitForm2(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.err()
          this.$nextTick(() => {
            that.$refs['domainSimpleVo1'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    async err() {
      let list = {
        id: this.domainSimpleVo1.id1,
        pid: this.domainSimpleVo1.pid1,
        menuName: this.domainSimpleVo1.menuName11,
        menuUrl: this.domainSimpleVo1.menuUrl11,
        sort: this.domainSimpleVo1.xuhao11,
        menuType: this.domainSimpleVo1.state11,
        name: this.domainSimpleVo1.name11,
      }
      const { data: res } = await this.$http.post('/menu/updateMenuById', list)
      if (res.code == 200) {
        this.dialog1 = false
        this.$message('修改成功')
        this.getdata()
      } else {
        this.$message(res.message)
      }
    },
    handleClose() {
      this.dialog = false
    },
    handleCloseyiji() {
      this.dialogyiji = false
    },
    handleClose1() {
      this.dialog1 = false
    },
    handleClickes(tab, event) {
      console.log(tab, event)
    },
    user(val) {
      if (val == 0) {
        return '菜单'
      } else if (val == 1) {
        return '按钮'
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
    biaoji(val) {
      if (val == 0) {
        return '正常'
      } else if (val == 1) {
        return '删除'
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
// 列表斑马线
.right_main_under1 /deep/ .el-table__body tr:hover > td {
  background-color: transparent !important;
}

.eright_main_under1 /deep/ .el-table__body tr.current-row > td {
  background-color: transparent !important;
}
.el-table::before {
  height: 0px;
}
.el-table {
  border: 0;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent;
}
.el-tabs--border-card {
  background: transparent;
  border: 0;
}
.right_main_under1 /deep/ .el-tabs__header {
  background-color: transparent !important;
}
.right_main_under1 /deep/ .el-form-item__label {
  color: #bfcbd9;
}
/deep/ tbody .el-table_1_column_1 {
  text-align: left !important;
}

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
// .liay{
//   height: 680px;
//   overflow-y:scroll

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
/deep/ .gutter {
  border-bottom-width: 0 !important;
}
.bottom {
  width: 100%;
  height: 10px;
  background-color: rgba(11, 48, 78,.5);
padding-bottom: 1%;
}
</style>