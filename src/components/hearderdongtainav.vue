<template>
  <div>
    <div class="nav">
      <!-- <div class="menu_xuanzhong" v-if="this.daohang.length != 2">
        <img src="../assets/img/shouye/选中.png" alt="" />
      </div> -->
      <!-- 内容——头部导航 -->
      <!-- <div class="dianl" @click="low">
        <img src="../assets/img/shouye/左.png" alt="" />
      </div>
      <div class="dianr" @click="up">
        <img src="../assets/img/shouye/右.png" alt="" />
      </div> -->
      <div class="nav_li">
        <!-- v-if="this.daohang.length >= 3" -->
        <ul class="daohang3">
          <li
            v-for="(item, index) in daohang"
            :key="index"
            :class="
              item.name == '验证' || item.name == '处置'
                ? 'jinzhi1'
                : item.name == namenav
                ? 'five'
                : 'six'
            "
          >
            <span>
              <router-link
                :to="{ path: item.path, query: { name: item.name } }"
                :class="
                  item.name == '验证' || item.name == '处置'
                    ? 'jinzhi1'
                    : item.name == namenav
                    ? 'five'
                    : 'six'
                "
                >{{ item.name }}</router-link
              >
            </span>
          </li>
        </ul>
        <!-- <ul v-if="this.daohang.length == 2" class="daohang2">
          <li v-for="(item, index) in daohang" :key="index">
            <router-link :to="item.path" class="three">{{
              item.name
            }}</router-link>
          </li>
        </ul>
        <ul v-if="this.daohang.length == 1" class="daohang1">
          <li v-for="(item, index) in daohang" :key="index">
            <router-link :to="item.path" class="three">{{
              item.name
            }}</router-link>
           
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //居中导航
      daohang: [],
      daohang1: [
        {
          name: '首页',
          path: '/shouye',
        },
            {
          name: '预警',
          // path: '/getWarning',
          path:'/getWarningfourg'
        },
        {
          name: '发现',
          path: '/gitDiscoverca',
        },
    
        // {
        //   name: '统计',
        //   path: '/Statisticsht',
        // },
        {
          name: '系统管理',
          path: '/findUser',
        },
        // {
        //   name: '处置',
        //   path: '',
        // },

        // {
        //   name: '验证',
        //   path: '',
        // },
      ],
      daohang2: [
      {
          name: '首页',
          path: '/shouye',
        },
            {
          name: '预警',
          // path: '/getWarning',
          path:'/getWarningfourg'
        },
        {
          name: '发现',
          path: '/gitDiscoverca',
        },
    
        // {
        //   name: '统计',
        //   path: '/Statisticsht',
        // },
        // {
        //   name: '系统管理',
        //   path: '/findUser',
        // },
        // {
        //   name: '处置',
        //   path: '',
        // },

        // {
        //   name: '验证',
        //   path: '',
        // },
      ],
      namenav: '',
      navnumlist: [],
    }
  },
  // created() {
  //   this.daohangqx();
  // //  console.log( this.$store.state.navlist);

  // },
  mounted() {
    // this.daohang=   JSON.parse(window.localStorage.getItem("nav"))
  },
  created() {
    // this.daohangqx()
    this.dh()
    this.daohangzhiding()
    // console.log(this.$route.path=='/domain');
    // console.log(this.$route.path);
  },
  methods: {
    dh() {
      let dntit = JSON.parse(window.sessionStorage.getItem('qx'))

      let cj = 'CD_SUPER_ADMIN'

      if (dntit == cj) {
        this.daohang = this.daohang1
      } else  if (dntit != cj) {
        this.daohang = this.daohang2
      }
    },
    //导航
    // async daohangqx() {
    //   const that = this
    //   const { data: res } = await this.$http.get('/menu/queryUserNavList')
    //   //  console.log(res.data);
    //   if (res.code == 200) {
    //     res.data = res.data.map((item) => {
    //       return {
    //         name: item.menuName,
    //         path: item.menuUrl,
    //       }
    //     })

    //     // 排序
    //     // for (var i = 0; i < res.data.length; i++) {
    //     //   if (res.data[i].name == this.namenav) {

    //     //     let num = res.data.splice(i - 1, res.data.length).reverse()

    //     //     for (var j = 0; j < num.length; j++) {
    //     //       res.data.unshift(num[j])
    //     //     }
    //     //   }
    //     // }

    //     this.daohang = res.data
    //     console.log(this.daohang)
    //   }

    //   // this.items = res.data;
    // },
    async daohangzhiding() {
      const { data: res } = await this.$http.post('/menu/queryUserMenuList')
      // console.log('daohangzhiding');
      if (res.code == 200) {
        let navres = this.$route.path.slice(1, this.$route.path.length)

        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].children != null) {
            for (var j = 0; j < res.data[i].children.length; j++) {
              if (navres == res.data[i].children[j].name) {
                this.namenav = res.data[i].menuName
              }
            }
          } else {
            if (navres == res.data[i].name) {
              this.namenav = res.data[i].menuName
            }
          }
        }
      }
      // this.daohangqx()
    },
    // 点击上下方法
    remove(array, index) {
      if (index <= array.length - 1) {
        for (var i = index; i < array.length; i++) {
          array[i] = array[i + 1]
        }
      }
      array.length = array.length - 1

      return array
    },
    // 模块————导航上
    up() {
      if (this.daohang.length == 1) {
        this.$message('当前您的权限只有一项')
      } else {
        var arr = this.daohang.slice(0, 1)
        this.daohang = this.remove(this.daohang, 0)
        this.daohang = [...this.daohang, ...arr]
      }

      // console.log(this.daohang);
    },
    // 模块————导航下
    low() {
      if (this.daohang.length == 1) {
        this.$message('当前您的权限只有一项')
      } else {
        var arr = this.daohang.slice(
          this.daohang.length - 1,
          this.daohang.length
        )
        this.daohang = this.remove(this.daohang, this.daohang.length)
        // console.log( this.daohang);
        this.daohang = [...arr, ...this.daohang]
      }
    },
  },
}
</script>

<style scoped lang='less'>
.nav {
  width: 1027px;
  height: 40px;
  margin: 0 auto;
  // border: 1px solid red;
  // background: url('../assets/newimg/newhome/形状 6.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.nav_li {
  // width: 830px;
  height: 54%;
  // border: 1px solid blue;
  //  margin-left: 60px;
  // padding-top: 10px;
  box-sizing: border-box;
  // overflow: hidden;
  // margin-left: 10px;
  position: relative;
  left: 50%;
  float: left;
}
.dianl {
  position: absolute;
  width: 50px /* 50/16 */;
  height: 32px;
  cursor: pointer;
  left: 30px;
  top: 0;
}
.dianl img {
  width: 100% /* 50/16 */;
  height: 100%;
}
.dianr {
  position: absolute;
  width: 50px /* 50/16 */;
  height: 32px;
  cursor: pointer;
  right: 30px;
  top: 0;
}
.dianr img {
  width: 100% /* 50/16 */;
  height: 100%;
}
.menu_xuanzhong {
  position: absolute;
  width: 20px /* 50/16 */;
  height: 20px;
  bottom: 0;
  left: 47%;
}
.menu_xuanzhong img {
  width: 100%;
  height: 100%;
}
.nav_li .daohang3 li {
  font-family: '黑体';
  float: left;
  list-style-type: none;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 100px;
  border: 3px solid #0d6fd8;
  margin-right: 8px;
  box-shadow: 0 0 10px #1768be inset, 0 0 0px #b5c5d4;
  transform: skewX(45deg);
}
.nav_li .daohang3 li span {
  display: inline-block;
  transform: skewX(-45deg);
}
.nav_li .daohang2 li {
  float: left;
  list-style-type: none;
  text-align: center;
  // font-size: 1.25rem /* 20/16 */;
  // color: #fff;
  font-weight: 400;

  // padding: 0  ;
  // padding-top: 5px;
  // padding-right: 1.1rem;
  // padding-left: 1.4rem;
  // box-sizing: border-box;
  // width: 5.6rem /* 71/16 */ /* 44.5/16 */;
  width: 212px;
  height: 50px;
  // padding-left: 0.7rem;
  // box-sizing: border-box;
}
.nav_li .daohang1 li {
  float: left;
  list-style-type: none;
  text-align: center;
  // font-size: 1.25rem /* 20/16 */;
  // color: #fff;
  font-weight: 400;
  // padding: 0  ;
  // padding-top: 5px;
  // padding-right: 1.1rem;
  // padding-left: 1.4rem;
  // box-sizing: border-box;
  // width: 5.6rem /* 71/16 */ /* 44.5/16 */;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // padding-left: 0.7rem;
  // box-sizing: border-box;
}
.three {
  font-size: 22px /* 20/16 */ /* 18/16 */;
  color: #dfe0f7;
  font-weight: 500;
}
.three:hover {
  color: #fff;
  text-shadow: 0 0 20px rgba(0, 121, 255, 0.5);
}

.threes {
  font-size: 20px /* 16/16 */;
  color: #fff;
  font-weight: 500;
}
.four {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  background-image: linear-gradient(to left, #d6e1e5 0%, #51626d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  // pointer-events: none;
}
// .five {
//   font-size: 20px /* 16/16 */;
//   font-weight: 500;
//   background-image: linear-gradient(to right, #d6e1e5 0%, #51626d 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   // pointer-events: none;
// }
.five {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  color: #fff;
  border-bottom-color: #07e7e6 !important;
  // pointer-events: none;
}
.six {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  color: #b5b5d4;
  // text-shadow: 0 0 20px #0079ff;
  // background-image: linear-gradient(to right, #d6e1e5 0%, #51626d 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // pointer-events: none;
}
.six:hover {
  color: #fff;
  border-bottom-color: #07e7e6 !important;
}
.nav_li .daohang3 li:hover {
  color: #fff;
  border-bottom-color: #07e7e6;
}
.daohang3 {
  position: relative;
  left: -50%;
  // left: 11%;
}
.jinzhi1 {
  font-size: 20px /* 16/16 */;
  font-weight: 500;
  color: #b5b5d4;
  cursor: not-allowed !important;
}
</style>