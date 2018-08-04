<template>
  <RoleDetail :staticOptions="staticOptions"
   :roleForm="roleForm"
    v-on:updateRoleForm="updateRoleForm"
    v-on:deleteUserRole="resetRoleForm"/>
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
          vm.$message(error.response.data.message)
        })
    },
    updateRoleForm (event) {
      console.log('updateRoleForm' + event.id)

      this.roleForm.id = event.id
    },
    resetRoleForm () {
      this.roleForm = this.roleResetForm
    }
  },
  mounted () {
    this.loadMenuLinks()
  }
}
</script>
