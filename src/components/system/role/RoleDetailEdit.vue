<template>
  <RoleDetail :staticOptions="staticOptions"
   :roleForm="roleForm"
    v-on:deleteUserRole="resetRoleForm"/>
</template>

<script>
import RoleDetail from '@/components/system/role/RoleDetail'
export default {
  name: 'roleDetailEdit',
  components: {RoleDetail},
  data () {
    return {
      roleForm: {
        id: '',
        userRoleName: '',
        menuId: [],
        userRoleDescription: ''
      },
      roleResetForm: {
        id: '',
        userRoleName: '',
        menuId: [],
        userRoleDescription: ''
      },
      staticOptions: {
        linkMenus: []
      }
    }
  },
  methods: {
    loadMenuLinks () {
      let vm = this
      this.$ajax.post('/api/systemMenu/menuLinks', 'LINK')
        .then(function (res) {
          vm.staticOptions.linkMenus = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadParentMenu!')
        })
    },
    loadUserRole (userRoleId) {
      let vm = this
      this.$ajax.get('/api/role/' + userRoleId)
        .then(function (res) {
          vm.roleForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in user role!')
        })
    },
    resetRoleForm () {
      this.roleForm = this.roleResetForm
    }
  },
  mounted () {
    this.loadMenuLinks()
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadUserRole(this.$route.params.id)
    }
  }
}
</script>
