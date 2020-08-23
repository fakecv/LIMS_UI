<template>
  <MenuDetail :staticOptions="staticOptions"
   :menuForm="menuForm"
   v-on:updateMenuForm="updateMenuForm"
   v-on:deleteMenuItem="resetMenuForm"
   v-on:new="resetMenuForm"
   v-on:copy="resetMenuId"/>
</template>

<script>
import MenuDetail from '@/components/system/menu/MenuDetail'
export default {
  name: 'menuDetail',
  components: {MenuDetail},
  data () {
    return {
      staticOptions: {
        parentMenu: []
      },
      menuForm: {
        id: '',
        parentMenuId: [],
        parentId: '',
        name: '',
        icon: '',
        alias: '',
        state: false,
        sort: '',
        type: '',
        description: ''
      },
      menuResetForm: {
        id: '',
        parentMenuId: [],
        parentId: '',
        name: '',
        icon: '',
        alias: '',
        state: false,
        sort: '',
        type: '',
        description: ''
      }
    }
  },
  methods: {
    loadParentMenu () {
      let vm = this
      this.$ajax.get('/api/systemMenu/parentMenuOptions')
        .then(function (res) {
          vm.staticOptions.parentMenu = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateMenuForm (event) {
      this.menuForm.id = event.id
    },
    resetMenuForm () {
      this.loadParentMenu()
      this.menuForm = JSON.parse(JSON.stringify(this.menuResetForm))
    },
    resetMenuId () {
      this.menuForm.id = ''
    }
  },
  activated () {
    this.loadParentMenu()
    this.resetMenuForm()
  }
}
</script>
