import Vue from 'vue'
import Vuex from 'vuex'
import forms from './modules/forms' // 顶部查询表单
import maintenanceParameters from './modules/maintenanceParameters' // 保留查询表单

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemKey: '', // 当前选中的item
    asideActiveName: 'items-list', // 侧边栏标签当前活动位置
    privilegeMap: {
      path: '',
      privileges: ''
    }
  },
  mutations: {
    SELECT_ITEM (state, newKey) {
      state.itemKey = newKey
      // 只要itemKey变化, 就切换至'组件配置'页
      state.asideActiveName = 'item-config'
    },
    TOGGLE_ASIDE_ACTIVE (state, newName) {
      state.asideActiveName = newName
    }
    // POPULATE_PRIVILEGES (state, privilegeMap) {
    //   state.privilegeMap = privilegeMap
    // }
  },
  modules: {
    // todo 表格table 图表Chart
    forms,
    maintenanceParameters
  }
})

export default store
