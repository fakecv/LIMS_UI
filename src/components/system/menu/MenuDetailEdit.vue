<template>
  <MenuDetail :staticOptions="staticOptions"
   :menuForm="menuForm"
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
      },
      staticOptions: {
        parentMenu: []
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
          vm.$message(error.response.data.message)
        })
    },
    loadMenuItem (menuItemid) {
      let vm = this
      this.$ajax.get('/api/systemMenu/singleMenuItem/' + menuItemid)
        .then(function (res) {
          vm.menuForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    if (this.$route.params.id !== undefined) {
      this.loadMenuItem(this.$route.params.id)
    }
  }
}
</script>
