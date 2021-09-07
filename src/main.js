import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import locale from 'element-ui/lib/locale/lang/en' // lang i18n 英文
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 中文
// 选择elementUi 默认语言为中文
Vue.use(ElementUI, { zhLocale })

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import store from './store/index.js'
import './assets/css/theme/theme-blue/index.css'
import querystring from 'querystring'
Vue.prototype.$qs = querystring
// import dataV from '@jiaminghi/data-view'
// Vue.use(dataV)
import { borderBox11 } from '@jiaminghi/data-view'
Vue.use(borderBox11)

import { borderBox8 } from '@jiaminghi/data-view'
Vue.use(borderBox8)

import { decoration10 } from '@jiaminghi/data-view'
Vue.use(decoration10)

import { decoration7 } from '@jiaminghi/data-view'
Vue.use(decoration7)

// Vue.prototype.$qs = querystring
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
