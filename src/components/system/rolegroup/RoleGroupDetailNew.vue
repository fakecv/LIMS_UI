<template>
  <RoleGroupDetail :userRoleGroupForm="userRoleGroupForm"
  :staticOptions="staticOptions"
  v-on:updateUserRoleGroupForm="updateRoleGroupForm"
  v-on:deleteUserRoleGroup="resetRoleGroupForm"
  v-on:updateUserRoles="updateUserRoles"/>
</template>

<script>
import RoleGroupDetail from '@/components/system/rolegroup/RoleGroupDetail'
export default {
  name: 'roleGroupDetailNew',
  components: {RoleGroupDetail},
  data () {
    return {
      roleRequestForm: {
        userRoleName: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      userRoleGroupForm: {
        id: '',
        userRoleGroupName: '',
        userRoleIds: [],
        userRoleGroupDescription: ''
      },
      userRoleGroupResetForm: {
        id: '',
        userRoleGroupName: '',
        userRoleIds: [],
        userRoleGroupDescription: ''
      },
      staticOptions: {
        selectedUserRoles: [],
        userRoles: [],
        linkMenus: [],
        totalRoles: 0
      }
    }
  },
  methods: {
    updateRoleGroupForm (event) {
      this.userRoleGroupForm.id = event.id
    },
    loadMenuLinks () {
      let vm = this
      this.$ajax.post('/api/systemMenu/menuLinks', 'LINK')
        .then(function (res) {
          vm.staticOptions.linkMenus = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in load menuLinks!')
        })
    },
    loadUserRoles (event) {
      let vm = this
      this.$ajax.post('/api/role/queryUserRole', event)
        .then(function (res) {
          vm.userRoles = res.data.pageResult || []
          vm.totalRoles = res.data.totalUserRoles || 0
          console.log('totalRoles is: ' + vm.totalRoles)
        })
    },
    updateUserRoles (event) {
      let vm = this
      console.log('updateUserRoles' + event)
      this.userRoleGroupForm.userRoleIds = []
      this.staticOption.selectedUserRoles = event
      event.forEach(row => {
        vm.userRoleGroupForm.userRoleIds.push(row.id)
      })
    },
    initUserRoles () {
      let vm = this
      this.$ajax.post('/api/role/queryUserRole', this.roleRequestForm)
        .then(function (res) {
          vm.staticOptions.userRoles = res.data.pageResult || []
          vm.staticOptions.totalRoles = res.data.totalUserRoles || 0
          console.log('totalRoles is: ' + vm.totalRoles)
        })
    },
    resetRoleGroupForm () {
      this.userRoleGroupForm = this.userRoleGroupResetForm
    }
  },
  mounted () {
    this.initUserRoles()
    this.loadMenuLinks()
  }
}
</script>
