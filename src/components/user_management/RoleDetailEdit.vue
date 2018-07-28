<template>
  <RoleDetail :staticOptions="staticOptions" :roleForm="roleForm"/>
</template>

<script>
import RoleDetail from '@/components/user_management/RoleDetail'
export default {
  name: 'roleDetailEdit',
  components: {RoleDetail},
  data () {
    return {
      roleForm: {
        parentMenuId: [],
        name: ''
      },
      staticOptions: {
        parentMenu: []
      }
    }
  },
  methods: {
    loadParentMenu () {
      let vm = this
      this.$ajax.get('/api/systemMenu/parentMenuLinks')
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
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadMenuItem(this.$route.params.id)
    }
  }
}
</script>
