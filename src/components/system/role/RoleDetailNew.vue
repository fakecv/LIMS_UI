<template>
  <RoleDetail :staticOptions="staticOptions"
   :roleForm="roleForm"
    v-on:new="resetRoleForm"
    v-on:copy="resetRoleId"
    v-on:updateRoleForm="updateRoleForm"
    v-on:deleteUserRole="resetRoleForm"
    />
</template>

<script>
import RoleDetail from '@/components/system/role/RoleDetail'
export default {
  name: 'roleDetailNew',
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
    updateRoleForm (event) {
      this.roleForm.id = event.id
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
    this.resetRoleForm()
  }
}
</script>
