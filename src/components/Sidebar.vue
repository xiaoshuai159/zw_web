<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.path"
      background-color="#01162d"
      text-color="#bfcbd9"
     
      router
  
       active-text-color="rgb(69 125 187)"
    >
      <NavItem
        v-for="(v, index) in items"
        :key="index"
        :item="v"
        :path="v.name"
      />
    </el-menu>
  </div>
</template>

<script>
import NavItem from "./NavItem";

export default {
  data() {
    return {
      pid: [],
      Newname: [],
      Newname1: [],
      active:'',
      items: [
       
      ],
    };
  },
  components: {
    NavItem,
  },
//   watch:{
//     $route(data){
// console.log(data);
//     }
//   },
  mounted() {
    this.qx();
  },
  methods: {
//     handleSelect(index){
//       if(index)
//       // debugger
// console.log(index);
//       // debugger
// this.active=index
//     },
    async qx() {
      const that = this;

      const { data: res } = await this.$http.post("/menu/queryUserMenuList");

      if (res.code == 200) {
        console.log(res.data);
        let chuarr = res.data.filter((item) => item.menuName != "系统管理");
        let chuarr1 = res.data.filter((item) => item.menuName == "系统管理");
        for (var i = 0; i < chuarr1.length; i++) {
          chuarr.push(chuarr1[0]);
        }

        this.items = chuarr;

        // =========================
        // res.data
        chuarr.forEach((item) => {
          that.menuFir(item);
        });
        this.pid = this.getSetArr(this.pid);
        if (!window.sessionStorage.getItem("btn")) {
          window.sessionStorage.setItem("btn", this.Newname1);
        }
        // console.log(this.pid);
        // res.data
        chuarr.forEach((item) => {
          that.menuSec(item);
        });
        // console.log(res.data);
      }

      // console.log(res.data);
      // this.items = res.data;
    },
    getSetArr(arr) {
      return [...new Set(arr)];
    },
    //
    menuFir(data) {
      if (data.menuType != 1) {
        // data["isShow"] = true;
        if (data.children) {
          data.children.forEach((item) => {
            this.menuFir(item);
          });
        }
      } else {
        // data["isShow"] = false;
        this.pid.push(data.pid);
        this.Newname.push(data.name);
        this.Newname1 = this.Newname;
      }
    },

    menuSec(data) {
      var flag = false;
      for (var item in this.pid) {
        // console.log(item);
        // console.log(data.id,this.pid[item]);
        if (data.id != this.pid[item]) {
          flag++;
          continue;
        } else {
          data.menuType = 1;
          break;
        }
      }
      if (data.children) {
        data.children.forEach((item) => {
          this.menuSec(item);
        });
      } else {
        data.menuType = 1;
      }
    },
  },
  computed: {
    // onRoutes() {
    //   return this.$route.path.replace("/", "");
    // },
    // collapse() {
    //   return this.$store.state.collapse;
    // },
  },
};
</script>

<style scoped lang="less">
.sidebar {
  width: 201px;
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
// .sidebar-el-menu:not(.el-menu--collapse) {
//   width: 15rem;
// }
.sidebar > ul {
  height: 100%;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
  height: 67px;
  line-height: 70px;
}
/deep/.el-submenu__title {
}
// .el-submenu{
//   padding: 10px;
//     box-sizing: border-box;
// }
.el-submenu /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.el-menu-item /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
 
</style>
