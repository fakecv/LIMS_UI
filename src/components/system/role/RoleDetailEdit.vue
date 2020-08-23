<template>
  <RoleDetail :staticOptions="staticOptions"
   :roleForm="roleForm"
    v-on:new="resetRoleForm"
    v-on:copy="resetRoleId"
    v-on:deleteUserRole="resetRoleForm"
    />
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
        privileges: '',
        userRoleDescription: ''
      },
      roleResetForm: {
        id: '',
        userRoleName: '',
        menuId: [],
        privileges: '',
        userRoleDescription: ''
      },
      staticOptions: {
        linkMenus: [],
        privileges: ['new', 'copy', 'unlock', 'delete', 'save', 'auth'],
        checkedPrivileges: []
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadUserRole (userRoleId) {
      let vm = this
      this.$ajax.get('/api/role/' + userRoleId)
        .then(function (res) {
          vm.roleForm = res.data
          vm.staticOptions.checkedPrivileges = vm.roleForm.privileges.split(',')
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    resetRoleForm () {
      this.roleForm = this.roleResetForm
    },
    resetRoleId () {
      this.roleForm.id = ''
    }
  },
  activated () {
    this.loadMenuLinks()
    if (this.$route.params.id !== undefined) {
      this.loadUserRole(this.$route.params.id)
    }
  }
}
</script>
