<template>
  <RoleGroupDetail ref="roleGroupDetail"
  :staticOptions="staticOptions"
  v-on:updateUserRoles="updateUserRoles"
  v-on:reloadUserRoles="reloadUserRoles"
  v-on:deleteUserRoles="deleteUserRoles"
   :userRoleGroupForm="userRoleGroupForm"
  v-on:new="resetRoleGroupForm"
  v-on:updateUserRoleGroupForm="updateRoleGroupForm"
  v-on:deleteUserRoleGroup="resetRoleGroupForm"
  v-on:copy="resetRoleGroupId"/>
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
    updateUserRoles (id) {
      let vm = this
      var index = this.userRoleGroupForm.userRoleIds.indexOf(id)
      if (index > -1) {
        console.log('splice ' + id)
        this.userRoleGroupForm.userRoleIds.splice(index, 1)
        this.staticOptions.userRoles.forEach(row => {
          if (row.id === id) {
            vm.staticOptions.selectedUserRoles.splice(row, 1)
          }
        })
      } else {
        console.log('push ' + id)
        this.userRoleGroupForm.userRoleIds.push(id)
        this.staticOptions.userRoles.forEach(row => {
          if (row.id === id) {
            vm.staticOptions.selectedUserRoles.push(row)
          }
        })
      }
    },
    addUserRole (id) {
      this.userRoleGroupForm.userRoleIds.push(id)
    },
    removeUserRole (id) {
      var index = this.userRoleGroupForm.userRoleIds.indexOf(id)
      if (index > -1) {
        this.userRoleGroupForm.userRoleIds.splice(index, 1)
      }
    },
    deleteUserRoles (event) {
      let vm = this
      event.forEach(row => {
        vm.staticOptions.selectedUserRoles.splice(row, 1)
      })
      this.userRoleGroupForm.userRoleIds = []
      this.staticOptions.selectedUserRoles.forEach(row => {
        vm.userRoleGroupForm.userRoleIds.push(row.id)
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
    resetRoleGroupForm () {
      this.userRoleGroupForm = JSON.parse(JSON.stringify(this.userRoleGroupResetForm))
    },
    resetRoleGroupId () {
      this.userRoleGroupForm = ''
    }
  },
  mounted () {
    this.initUserRoles()
    this.loadMenuLinks()
  }
}
</script>
