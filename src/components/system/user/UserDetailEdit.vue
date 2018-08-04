<template>
  <userDetail :staticOptions="staticOptions" :userForm="userForm"/>
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
        logonTimes: ''
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
        logonTimes: ''
      },
      staticOptions: {
        parentuser: []
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
    loadRoleGroups () {
      let vm = this
      this.$ajax.get('/api/roleGroup/getRoleGroup')
        .then(function (res) {
          vm.staticOptions.roleGroups = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.loadParentuser()
    if (this.$route.params.id !== undefined) {
      this.loaduserItem(this.$route.params.id)
    }
  }
}
</script>
