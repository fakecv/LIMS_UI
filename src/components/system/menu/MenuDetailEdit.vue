<template>
  <MenuDetail :staticOptions="staticOptions" :menuForm="menuForm"/>
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
        description: '',
        createUserId: ''
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
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadParentMenu!')
        })
    },
    loadMenuItem (menuItemid) {
      let vm = this
      this.$ajax.get('/api/systemMenu/singleMenuItem/' + menuItemid)
        .then(function (res) {
          vm.menuForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadMenuItem!')
        })
    }
  },
  mounted () {
    this.loadParentMenu()
    if (this.$route.params.id !== undefined) {
      this.loadMenuItem(this.$route.params.id)
    }
  }
}
</script>
