<template>
  <userDetail :staticOptions="staticOptions" :userForm="userForm"/>
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
          vm.$message('Somthing wrong happen in loadParentMenu!')
        })
    },
    loadRoleGroups () {
      let vm = this
      this.$ajax.get('/api/security/roleGroup/getRoleGroup')
        .then(function (res) {
          vm.staticOptions.roleGroups = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in getRoleGroup!')
        })
    }
  },
  mounted () {
    this.loadDepartment()
    this.loadRoleGroups()
  }
}
</script>
