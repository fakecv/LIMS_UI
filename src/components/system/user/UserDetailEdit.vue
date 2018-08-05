<template>
  <userDetail ref="userDetail" :userForm="userForm"
    :staticOptions="staticOptions"
    v-on:updateUserRoleGroups="updateUserRoleGroups"
    v-on:reloadUserRoleGroups="reloadUserRoleGroups"
    v-on:deleteUserRoleGroups="deleteUserRoleGroups"
    v-on:new="resetUserForm"
    v-on:copy="resetUserId"
    v-on:deleteUser="resetUserForm"/>
</template>

<script>
import UserDetail from '@/components/system/user/userDetail'
export default {
  name: 'userDetail',
  components: {UserDetail},
  data () {
    return {
      userForm: {
        id: '',
        userName: '',
        password: '',
        department: '',
        roleGroups: [],
        roles: [],
        name: '',
        sex: '',
        title: '',
        degreeOfEducation: '',
        major: '',
        graduateOn: '',
        mobileNumber: '',
        email: '',
        logonAt: '',
        lastLogonAt: '',
        logonTimes: ''
      },
      userResetForm: {
        id: '',
        userName: '',
        password: '',
        department: '',
        roleGroups: [],
        roles: [],
        name: '',
        sex: '',
        title: '',
        degreeOfEducation: '',
        major: '',
        graduateOn: '',
        mobileNumber: '',
        email: '',
        logonAt: '',
        lastLogonAt: '',
        logonTimes: ''
      },
      staticOptions: {
        userRoleGroups: [],
        selectedUserRoleGroups: [],
        departments: [],
        totalRoleGroups: 0
      },
      userRoleGroupRequestForm: {
        userRoleGroupName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    updateUserForm (event) {
      this.userForm.id = event.id
    },
    resetUserId () {
      this.userForm.id = ''
    },
    resetUserForm () {
      this.userForm = JSON.parse(JSON.stringify(this.userResetForm))
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    initRoleGroups () {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', this.userRoleGroupRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
          console.log('total user role group is: ' + vm.totalUserRoleGroups)
        })
    },
    reloadUserRoleGroups (event) {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', event)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
          vm.$refs.userDetail.addUserRoleGroups()
        })
    },
    updateUserRoleGroups (event) {
      let vm = this
      this.userForm.userRoleGroupIds = []
      this.staticOptions.selectedUserRoleGroups = event
      this.staticOptions.selectedUserRoleGroups.forEach(row => {
        vm.userForm.userRoleGroupIds.push(row.id)
      })
    },
    deleteUserRoleGroups (event) {
      let vm = this
      event.forEach(row => {
        console.log('role group edit deleteUserRoles for each' + row.id)
        vm.staticOptions.selectedUserRoleGroups.splice(row, 1)
      })
      this.userForm.userRoleGroupIds = []
      this.staticOptions.selectedUserRoleGroups.forEach(row => {
        vm.userForm.userRoleGroupIds.push(row.id)
      })
    },
    loadSelectedUserRoleGroup (userId) {
      let vm = this
      this.$ajax.get('/api/users/selectedUserRoleGroups/' + userId)
        .then(function (res) {
          vm.staticOptions.selectedUserRoles = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in user role!')
        })
    }
  },
  mounted () {
    console.log('user detail edit')
    this.initRoleGroups()
    this.loadDepartment()
    if (this.$route.params.id !== undefined) {
      this.loadUser(this.$route.params.id)
      this.loadSelectedUserRoleGroup(this.$route.params.id)
    }
  }
}
</script>
