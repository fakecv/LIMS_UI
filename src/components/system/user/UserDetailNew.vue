<template>
  <userDetail
   :staticOptions="staticOptions"
    :userForm="userForm"
    v-on:updateUserForm="updateUserForm"
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
        logonTimes: 0
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
        logonTimes: 0
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
    reloadUserRoleGroups () {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', this.userRoleGroupRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
          console.log('total user role group is: ' + vm.totalUserRoleGroups)
        })
    },
    updateUserForm (event) {
      this.userForm.id = event.id
    },
    resetUserId () {
      this.userForm.id = ''
    },
    resetUserForm () {
      this.userForm = JSON.parse(JSON.stringify(this.userResetForm))
    }
  },
  mounted () {
    this.loadDepartment()
    this.initRoleGroups()
  }
}
</script>
