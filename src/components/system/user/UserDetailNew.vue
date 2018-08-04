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
        roleGroups: '',
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
        roleGroups: '',
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
        departments: [],
        roleGroups: []
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
    loadRoleGroups () {
      let vm = this
      this.$ajax.get('/api/roleGroup/getRoleGroup')
        .then(function (res) {
          vm.staticOptions.roleGroups = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
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
    this.loadRoleGroups()
  }
}
</script>
