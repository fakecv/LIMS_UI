<template>
  <userDetail ref="userDetail" :userForm="userForm"
    :staticOptions="staticOptions"
    v-on:modifyPassword="modifyPassword"
    v-on:updateUserRoleGroups="updateUserRoleGroups"
    v-on:reloadUserRoleGroups="reloadUserRoleGroups"
    v-on:deleteUserRoleGroups="deleteUserRoleGroups"
    v-on:new="resetUserForm"
    v-on:copy="resetUserId"
    v-on:updateUserForm="updateUserForm"
    v-on:deleteUser="resetUserForm"/>
</template>

<script>
import UserDetail from '@/components/system/user/userDetail'
export default {
  name: 'userDetailEdit',
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
        logonTimes: '',
        modifiable: true
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
        logonTimes: '',
        modifiable: false
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
      this.userForm.modifiable = true
    },
    resetUserId () {
      this.userForm.id = ''
    },
    resetUserForm () {
      this.userForm = JSON.parse(JSON.stringify(this.userResetForm))
    },
    modifyPassword () {
      this.userForm.modifiable = false
      this.userForm.password = ''
    },
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
    reloadUserRoleGroups (event) {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', event)
        .then(function (res) {
          vm.staticOptions.userRoleGroups = res.data.pageResult || []
          vm.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
          vm.$refs.userDetail.addUserRoleGroups()
        })
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
    loadSelectedUserRoleGroup (userId) {
      let vm = this
      this.$ajax.get('/api/users/selectedUserRoleGroups/' + userId)
        .then(function (res) {
          vm.staticOptions.selectedUserRoleGroups = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadUser (userId) {
      let vm = this
      this.$ajax.get('/api/users/' + userId)
        .then(function (res) {
          vm.userForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.initRoleGroups()
    this.loadDepartment()
    if (this.$route.params.id !== undefined) {
      this.loadUser(this.$route.params.id)
      this.loadSelectedUserRoleGroup(this.$route.params.id)
    }
  },
  activated () {
    this.initRoleGroups()
    this.loadDepartment()
    if (this.$route.params.id !== undefined) {
      this.loadUser(this.$route.params.id)
      this.loadSelectedUserRoleGroup(this.$route.params.id)
    }
  }
}
</script>
