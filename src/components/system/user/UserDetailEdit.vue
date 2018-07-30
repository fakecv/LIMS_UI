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
      staticOptions: {
        parentuser: []
      }
    }
  },
  methods: {
    loadParentuser () {
      let vm = this
      this.$ajax.get('/api/systemuser/parentuserOptions')
        .then(function (res) {
          vm.staticOptions.parentuser = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadParentuser!')
        })
    },
    loadUserItem (userItemid) {
      let vm = this
      this.$ajax.get('/api/systemuser/singleuserItem/' + userItemid)
        .then(function (res) {
          vm.userForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loaduserItem!')
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
