import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/api/axios'
import "./assets/css/time.css";

import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import preventClick from './utils/controlClickState'
import formatDate from './utils/formatDate'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

import scroll from 'vue-seamless-scroll'
import './lib/lib-flexible'
// import echartsGL from 'echarts-gl' // 引入echarts
// import dataV from '@jiaminghi/data-view'
// import VueLazyload from 'vue-Lazyload'


Vue.prototype.$echarts = echarts

// Vue.prototype.$echartsGL = echartsGL // 引入组件
Vue.prototype.$http = axios
Vue.prototype.formatDate = formatDate
Vue.prototype.$times = dayjs
Vue.use(Element)
// Vue.use(preventClick)
Vue.use(scroll)
// Vue.use(dataV)

Vue.config.productionTip = false
Vue.directive("preventReClick",
{
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
      }
    })
  }
}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



