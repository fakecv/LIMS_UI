<template>
  <userDetail
   :staticOptions="staticOptions"
    :userForm="userForm"
    v-on:updateUserForm="updateUserForm"
    v-on:updateUserRoleGroups="updateUserRoleGroups"
    v-on:deleteUserRoleGroups="deleteUserRoleGroups"
    v-on:deleteUserForm="resetUserForm"
    v-on:new="resetUserForm"
    v-on:copy="resetUserId"/>
</template>

<script>
import UserDetail from '@/components/system/user/userDetail'
export default {
  name: 'userDetailNew',
  components: {UserDetail},
  data () {
    return {
      userForm: {
        id: '',
        userName: '',
        password: '',
        department: '',
        sort: '',
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
        fax: '',
        address: '',
        logonAt: '',
        lastLogonAt: '',
        logonTimes: 0,
        modifiable: false
      },
      userResetForm: {
        id: '',
        userName: '',
        password: '',
        department: '',
        sort: '',
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
        fax: '',
        address: '',
        logonAt: '',
        lastLogonAt: '',
        logonTimes: 0,
        modifiable: false
      },
      staticOptions: {
        userRoleGroups: [],
        selectedUserRoleGroups: [],
        departments: [],
        totalUserRoleGroups: 0
      },
      userRoleGroupRequestForm: {
        userRoleGroupName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    initRoleGroups () {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', this.userRoleGroupRequestForm)
        .then(function (res) {
          vm.staticOptions.userRoleGroups = res.data.pageResult || []
          vm.staticOptions.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
        })
    },
    reloadUserRoleGroups () {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', this.userRoleGroupRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
        })
    },
    updateUserForm (event) {
      this.userForm.id = event.id
      this.userForm.modifiable = true
    },
    updateUserRoleGroups (event) {
      let vm = this
      this.userForm.roleGroups = []
      this.staticOptions.selectedUserRoleGroups = event
      event.forEach(row => {
        vm.userForm.roleGroups.push(row.id)
      })
    },
    deleteUserRoleGroups (event) {
      let vm = this
      event.forEach(row => {
        for (var i = 0; i < vm.staticOptions.selectedUserRoleGroups.length; i++) {
          if (vm.staticOptions.selectedUserRoleGroups[i].id === row.id) {
            vm.staticOptions.selectedUserRoleGroups.splice(i, 1)
          }
        }
      })
      this.userForm.roleGroups = []
      this.staticOptions.selectedUserRoleGroups.forEach(row => {
        vm.userForm.roleGroups.push(row.id)
      })
    },
    resetUserId () {
      this.userForm.id = ''
    },
    resetUserForm () {
      this.userForm = JSON.parse(JSON.stringify(this.userResetForm))
    }
  },
  activated () {
    this.loadDepartment()
    this.initRoleGroups()
    this.resetUserForm()
  }
}
</script>
