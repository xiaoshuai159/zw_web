import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";




Vue.use(VueRouter)
const routes = [
  // {
  //   path: '/',name:'statisticAnalysis', meta:{ title:'大屏统计' }, component: ()=>import('../views/statisticAnalysis')
  // },
  {
    path: '/home' ,name: 'login', meta: { title: '登录页' }, component: () => import('../views/Login' )
  },
  {
    path: '/notPrivilege', name: 'notPrivilege', meta: { title: '无权限' }, component: () => import('../views/403')
  },
  {
    path: '/notPage', name: 'notPage', meta: { title: '无页面' }, component: () => import('../views/404')
  },
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/shouye',
    name: 'shouye',
    meta: {
      title: '首页'
    },
    component: () => import("../views/shouye")
  },
  {
    path: '/home',
    name: 'Home',
    // redirect: '/shouye',
    children: [
      // {
      //   path: '/shouye',
      //   name: 'shouye',
      //   meta: {
      //     title: '首页'
      //   },
      //   component: () => import("../views/shouye")
      // },

      {
        path: '/domain',
        name: 'domain',
        meta: {
          title: '反制——数据详情'
        },
        component: () => import('../views/domain')
      },

      {
        path: '/getWarning',
        // name:'search_bak',
        name: 'getWarning',
        meta: {
          title: '预警-数据详情'
        },
        component: () => import("../views/getWarning")
      },
      {
        path: '/getWarningfourg',
        // name:'search_bak',
        name: 'getWarningfourg',
        meta: {
          title: '预警4G-数据详情'
        },
        component: () => import("../views/getWarningfourg")
      },
      // {
      //   path: '/finished',
      //   // name:'search_bak',
      //   name: 'finished',
      //   meta: {
      //     title: '预警-统计结果'
      //   },
      //   component: () => import("../views/finished")
      // },
      {
        path: '/boce',
        // name:'search_bak',
        name: 'boce',
        meta: {
          title: '反制——拨测详情'
        },
        component: () => import("../views/boce")
      },
      {
        path: '/tongJiResults',
        // name:'search_bak',
        name: 'tongJiResults',
        meta: {
          title: '预警-已完成任务'
        },
        component: () => import("../views/tongJiResults")
      },
      {
        path: '/getUploadDomain',
        name: 'getUploadDomain',
        meta: {
          title: '反制——上传样本'
        },
        component: () => import('../views/getUploadDomain')
      },
      // {
      //   path: '/allocate',
      //   name: 'allocate',
      //   meta: {
      //     title: '管控'
      //   },
      //   component: () => import('../views/allocate')
      // },
      {
        path: '/getDiscover',
        name: 'getDiscover',
        meta: {
          title: '访问记录——数据详情'
        },
        component: () => import('../views/getDiscover')
      },
      {
        path: '/gitDiscoverca',
        name: 'gitDiscoverca',
        meta: {
          title: '访问记录——长安数据详情'
        },
        component: () => import('../views/gitDiscoverca')
      },
      // {
      //   path: '/taishi',
      //   name: 'taishi',
      //   meta: {
      //     title: '情报感知'
      //   },
      //   component: () => import('../views/taishi')
      // },
      {
        path: '/xitong',
        name: 'xitong',
        meta: {
          title: '系统管理'
        },
        component: () => import('../views/xitong')
      },
      
      {
        path: '/findUser',
        name: 'findUser',
        meta: {
          title: '系统管理——用户管理'
        },
        component: () => import('../views/findUser')
      },
      {
        path: '/findRole',
        name: 'findRole',
        meta: {
          title: '系统管理——角色管理'
        },
        component: () => import('../views/findRole')
      },
      {
        path: '/allMenu',
        name: 'allMenu',
        meta: {
          title: '系统管理——菜单管理'
        },
        component: () => import('../views/allMenu')
      },
      {
        path: '/dept',
        name: 'dept',
        meta: {
          title: '系统管理——部门管理'
        },
        component: () => import('../views/dept')
      },
      // {
      //   path: '/empty',
      //   name: 'empty',
      //   meta: {
      //     title: '刷新'
      //   },
      //   component: () => import('../views/empty')
      // },
      {
        path: '/Statisticsht',
        name: 'Statisticsht',
        meta: {
          title: '统计模块——反制'
        },
        component: () => import('../views/Statisticsht')
      },
      {
        path: '/Statisticshtyj',
        name: 'Statisticshtyj',
        meta: {
          title: '统计模块——预警'
        },
        component: () => import('../views/Statisticshtyj')
      },
    
      {
        path: '/Statisticshtqs',
        name: 'Statisticshtqs',
        meta: {
          title: '统计模块——趋势'
        },
        component: () => import('../views/Statisticshtqs')
      },
      {
        path: '/warnData',
        name: 'warnData',
        meta: {
          title: '统计模块——趋势'
        },
        component: () => import('../views/warnData')
      },
      
    ],
    component: Home
  },

]


 
const router = new VueRouter({
  // mode: 'history',
  mode:'hash',
  routes
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 前置守卫
router.beforeEach((to, from, next) => {
  
  if (to.path === '/home') return next()
  const user = window.sessionStorage.getItem('isLogin')
  if (user == 'true') return next()
alert('请登录')
next("/home")
})






export default router
