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
          vm.$message(error.response.data.message)
        })
    },
    loadUserRole (userRoleId) {
      let vm = this
      this.$ajax.get('/api/role/' + userRoleId)
        .then(function (res) {
          vm.roleForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetRoleForm () {
      this.roleForm = this.roleResetForm
    },
    resetRoleId () {
      this.roleForm.id = ''
    }
  },
  mounted () {
    this.loadMenuLinks()
    if (this.$route.params.id !== undefined) {
      this.loadUserRole(this.$route.params.id)
    }
  }
}
</script>
