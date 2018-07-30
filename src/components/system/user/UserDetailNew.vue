<template>
  <userDetail :userForm="userForm"/>
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
        logonTimes: ''
      }
    }
  },
  methods: {
    loadParentMenu () {
      let vm = this
      this.$ajax.get('/api/systemMenu/parentMenuOptions')
        .then(function (res) {
          vm.staticOptions.parentMenu = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadParentMenu!')
        })
    }
  },
  mounted () {
    this.loadParentMenu()
  }
}
</script>
