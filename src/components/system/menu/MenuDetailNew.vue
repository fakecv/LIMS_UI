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
    }
  },
  mounted () {
    this.loadParentMenu()
  }
}
</script>
