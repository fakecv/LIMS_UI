export default {
  state: {
    'qry': {
      inline: true, // 是否使用inline排版
      labelPosition: 'right', // 标签对齐方式
      labelWidth: '', // 标签宽度
      size: 'small', // 尺寸
      statusIcon: true, // 显示验证图标
      domain: '',
      packageName: '',
      formItemList: []
    }
  },
  mutations: {
    FORM_UPDATE_WITH_FID_G (state, { fid, newV }) {
      state[fid] = {...newV}
    },
    FORM_IMPORT_WITH_FID_G (state, { fid, initV }) {
      state[fid] = initV
    },
    FORM_UPDATE_WITH_FID_DOMAIN (state, { fid, domain }) {
      state[fid].domain = domain
    },
    FORM_UPDATE_WITH_FID_PACKAGENAME (state, { fid, packageName }) {
      state[fid].packageName = packageName
    }
  }
  // actions: {
  //   addItem({ commit }, formItem) {
  //     commit('UPDATE_LIST', formItem)
  //   }
  // },
}
