<template>
  <RoleGroupDetail ref="roleGroupDetail"
  :staticOptions="staticOptions"
   v-on:updateUserRoles="updateUserRoles"
   v-on:reloadUserRoles="reloadUserRoles"
   v-on:deleteUserRoles="deleteUserRoles"
   :userRoleGroupForm="userRoleGroupForm"
   v-on:new="resetRoleGroupForm"
   v-on:deleteUserRoleGroup="resetRoleGroupForm"
   v-on:copy="resetRoleGroupId"/>
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
          vm.$message(error.response.data.message)
        })
    },
    loadSelectedUserRoles (userRoleGroupId) {
      let vm = this
      this.$ajax.get('/api/roleGroup/selectedUserRoles/' + userRoleGroupId)
        .then(function (res) {
          vm.staticOptions.selectedUserRoles = [].concat(res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadMenuLinks () {
      let vm = this
      this.$ajax.post('/api/systemMenu/menuLinks', 'LINK')
        .then(function (res) {
          vm.staticOptions.linkMenus = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    reloadUserRoles (event) {
      let vm = this
      this.$ajax.post('/api/role/queryUserRole', event)
        .then(function (res) {
          vm.staticOptions.userRoles = res.data.pageResult || []
          vm.staticOptions.totalRoles = res.data.totalUserRoles || 0
          vm.$refs.roleGroupDetail.addUserRoles()
        })
    },
    initUserRoles () {
      let vm = this
      this.$ajax.post('/api/role/queryUserRole', this.roleRequestForm)
        .then(function (res) {
          vm.staticOptions.userRoles = res.data.pageResult || []
          vm.staticOptions.totalRoles = res.data.totalUserRoles || 0
        })
    },
    updateUserRoles (id) {
      let vm = this
      var index = this.userRoleGroupForm.userRoleIds.indexOf(id)
      if (index < 0) {
        this.userRoleGroupForm.userRoleIds.push(id)
        this.staticOptions.userRoles.forEach(row => {
          if (row.id === id) {
            vm.staticOptions.selectedUserRoles.push(row)
          }
        })
      }
    },
    deleteUserRoles (event) {
      let vm = this
      event.forEach(row => {
        for (var i = 0; i < vm.staticOptions.selectedUserRoles.length; i++) {
          if (vm.staticOptions.selectedUserRoles[i].id === row.id) {
            vm.staticOptions.selectedUserRoles.splice(i, 1)
          }
        }
      })
      this.userRoleGroupForm.userRoleIds = []
      this.staticOptions.selectedUserRoles.forEach(row => {
        vm.userRoleGroupForm.userRoleIds.push(row.id)
      })
    },
    resetRoleGroupForm () {
      this.userRoleGroupForm = JSON.parse(JSON.stringify(this.userRoleGroupResetForm))
    },
    resetRoleGroupId () {
      this.userRoleGroupForm = ''
    }
  },
  activated () {
    this.initUserRoles()
    this.loadMenuLinks()
    if (this.$route.params.id !== undefined) {
      this.loadUserRoleGroup(this.$route.params.id)
      this.loadSelectedUserRoles(this.$route.params.id)
    }
  }
}
</script>
