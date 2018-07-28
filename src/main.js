// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import '@/components/dynamic-form'
import store from './store'
import ElementUI from 'element-ui'
import toastr from 'toastr'
import Icon from 'vue2-svg-icon/Icon.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'toastr/build/toastr.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
// import Scheduler from '@progress/kendo-scheduler-vue-wrapper'
// import SchedulerResource from '@progress/kendo-scheduler-vue-wrapper'
// import SchedulerView from '@progress/kendo-scheduler-vue-wrapper'
import { SchedulerInstaller } from '@progress/kendo-scheduler-vue-wrapper'
import fullCalendar from 'vue-fullcalendar'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
// import 'material-icons/css/material-icons.css'
import AuthService from './auth/AuthService'
import VueClipboard from 'vue-clipboard2'
import App from './App'
import filter from '@/components/filter'

const auth = new AuthService()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(toastr)
// Vue.use(Scheduler)
// Vue.use(SchedulerResource)
// Vue.use(SchedulerView)
Vue.use(SchedulerInstaller)
Vue.use(filter)
// Vue.use(VueMaterial)
Vue.use(VueClipboard)
Vue.component('icon', Icon)
Vue.component('full-calendar', fullCalendar)
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
    console.log('unauthorized, logging out ...')
    auth.logout()
    router.replace('/login')
  }
  return Promise.reject(error)
})
Vue.prototype.$ajax = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
