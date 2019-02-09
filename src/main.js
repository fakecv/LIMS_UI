// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import AuthService from './auth/AuthService'
import Axios from 'axios'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import filter from '@/components/filter'
// import * as formatter from '@/components/formatter'
import Icon from 'vue2-svg-icon/Icon.vue'
import store from './store'
// import toastr from 'toastr'
// 界面元素开发页面使用
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.js'
// import 'toastr/build/toastr.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'font-awesome/css/font-awesome.min.css'
// import '@progress/kendo-ui'
// import '@progress/kendo-theme-default/dist/all.css'
// import Scheduler from '@progress/kendo-scheduler-vue-wrapper'
// import SchedulerResource from '@progress/kendo-scheduler-vue-wrapper'
// import SchedulerView from '@progress/kendo-scheduler-vue-wrapper'
// import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper'
// import fullCalendar from 'vue-fullcalendar'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
// import 'material-icons/css/material-icons.css'
// import VueClipboard from 'vue-clipboard2'

// Vue.use(toastr)
// Vue.use(Scheduler)
// Vue.use(SchedulerResource)
// Vue.use(SchedulerView)
// Vue.use(SchedulerInstaller)
// Vue.use(VueMaterial)
// Vue.use(VueClipboard)
// Vue.component('full-calendar', fullCalendar)
const auth = new AuthService()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(filter)
Vue.component('icon', Icon)
require('es6-promise').polyfill()
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  if (localStorage.token && new Date().getTime() < localStorage.tokenExpired) {
    next()
  } else {
    // next('/login')
    next()
  }
})
// http request 拦截器
Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('id_token')) {
      config.headers.Authorization = localStorage.getItem('id_token')
    }
    // config.baseURL = '/lims'
    let URL = process.env.URL
    config.baseURL = URL === 'lims' ? 'http://adun.live:17025' : '/'
    return config
  },
  err => {
    return Promise.reject(err)
  })
// // set auth header on start up if token is present
// if (localStorage.getItem('id_token')) {
//   Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
// }
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
Axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    auth.logout()
    router.replace('/login')
  }
  return Promise.reject(error)
})
Vue.prototype.$ajax = Axios
Vue.prototype.$echarts = echarts
// Vue.prototype.$formatter = formatter
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
