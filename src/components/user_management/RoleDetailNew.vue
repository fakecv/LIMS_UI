<template>
  <RoleDetail :staticOptions="staticOptions" :roleForm="roleForm"/>
</template>

<script>
import RoleDetail from '@/components/user_management/RoleDetail'
export default {
  name: 'roleDetailNew',
  components: {RoleDetail},
  data () {
    return {
      roleForm: {
        parentMenuId: [],
        roleName: '',
        roleId: ''
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
    }
  },
  mounted () {
    this.loadParentMenu()
  }
}
</script>
