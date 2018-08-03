<template>
  <RoleGroupDetail :userRoleGroupForm="userRoleGroupForm"
  :staticOptions="staticOptions"
   v-on:deleteUserRoleGroup="resetRoleGroupForm"
   v-on:updateUserRoles="updateUserRoles"
   v-on:reloadUserRoles="loadUserRoles"/>
</template>

<script>
import RoleGroupDetail from '@/components/system/rolegroup/RoleGroupDetail'
export default {
  name: 'roleGroupDetailEdit',
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
    loadUserRoleGroup (userRoleGroupId) {
      let vm = this
      this.$ajax.get('/api/roleGroup/' + userRoleGroupId)
        .then(function (res) {
          vm.userRoleGroupForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in user role!')
        })
    },
    loadSelectedUserRoles (userRoleGroupId) {
      let vm = this
      this.$ajax.get('/api/roleGroup/selectedUserRoles/' + userRoleGroupId)
        .then(function (res) {
          vm.staticOptions.selectedUserRoles = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in user role!')
        })
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
          vm.staticOptions.userRoles = res.data.pageResult || []
          vm.staticOptions.totalRoles = res.data.totalUserRoles || 0
          console.log('totalRoles is: ' + vm.totalRoles)
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
    updateUserRoles (event) {
      let vm = this
      console.log('updateUserRoles' + event)
      this.userRoleGroupForm.userRoleIds = []
      this.staticOptions.selectedUserRoles = event
      event.forEach(row => {
        vm.userRoleGroupForm.userRoleIds.push(row.id)
      })
    },
    resetRoleGroupForm () {
      this.userRoleGroupForm = this.userRoleGroupResetForm
    }
  },
  mounted () {
    this.initUserRoles()
    this.loadMenuLinks()
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadUserRoleGroup(this.$route.params.id)
      this.loadSelectedUserRoles(this.$route.params.id)
    }
  }
}
</script>
