<template lang="pug">
  el-container
    el-header
      el-button-group
        el-button(type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)") {{action.name}}
    el-container
      dynamic-form(:formConfig="$store.state.forms.qry" v-model="menuForm" ref="menuForm")
</template>
<script>
export default {
  name: 'MenuEditor',
  data () {
    return {
      actions: [
      ],
      menuForm: {},
      // menuFormConfig: {
      //   inline: true, // 是否使用inline排版
      //   labelPosition: 'right', // 标签对齐方式
      //   labelWidth: '', // 标签宽度
      //   size: 'small', // 尺寸
      //   statusIcon: true, // 显示验证图标
      //   domain: '',
      //   formItemList: []
      // },
      menuFormConfig: {}
    }
  },
  methods: {
    actionHandle (action) {
      let vm = this
      console.log(action.id)
      if (action.id === '1') {
        this.$ajax.post('/api/systemMenu', this.menuForm)
          .then(function (res) {
            console.log(res)
            vm.$message('Data has been uploaded successfully!')
          }).catch(function (error) {
            console.log(error.message)
            vm.$message('Something wrong happen!')
          })
      } else if (action.id === '2') {
        console.log(this.menuFormConfig)
        this.loadData()
      }
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/systemMenu')
        .then(function (res) {
          vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: 'qry', initV: res.data})
          vm.$router.push('/lims/MenuEditor')
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    },
    loadActionData () {
      this.actions = [
        {'name': '保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '查询', 'id': '2', 'icon': 'el-icon-upload2', 'loading': false}
      ]
    }
  },
  mounted () {
    this.loadActionData()
    this.loadData()
  }
}
</script>
<style>
</style>
