<template>
  <RoleGroupDetail ref="roleGroupDetail" :userRoleGroupForm="userRoleGroupForm"
  :staticOptions="staticOptions"
  v-on:updateUserRoleGroupForm="updateRoleGroupForm"
  v-on:deleteUserRoleGroup="resetRoleGroupForm"
  v-on:updateUserRoles="updateUserRoles"
  v-on:reloadUserRoles="reloadUserRoles"
  v-on:deleteUserRoles="deleteUserRoles"
  v-on:new="resetRoleGroupForm"
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
          console.log(error.message)
          vm.$message('Somthing wrong happen in load menuLinks!')
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
    updateUserRoles (event) {
      let vm = this
      this.userRoleGroupForm.userRoleIds = []
      this.staticOption.selectedUserRoles = event
      event.forEach(row => {
        vm.userRoleGroupForm.userRoleIds.push(row.id)
      })
    },
    deleteUserRoles (event) {
      console.log('role group edit deleteUserRoles')
      let vm = this
      event.forEach(row => {
        console.log('role group edit deleteUserRoles for each' + row.id)
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
