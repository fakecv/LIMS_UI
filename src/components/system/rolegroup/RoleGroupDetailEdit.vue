<template>
  <RoleGroupDetail :userRoleGroupForm="userRoleGroupForm" v-on:deleteUserRoleGroup="resetRoleGroupForm"/>
</template>

<script>
import RoleGroupDetail from '@/components/system/rolegroup/RoleGroupDetail'
export default {
  name: 'roleGroupDetailEdit',
  components: {RoleGroupDetail},
  data () {
    return {
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
      }
    }
  },
  methods: {
    loadUserRoleGroup (userRoleGroupId) {
      let vm = this
      this.$ajax.get('/api/roleGroup/' + userRoleGroupId)
        .then(function (res) {
          vm.userRoleGroupForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in user role!')
        })
    },
    resetRoleGroupForm () {
      this.userRoleGroupForm = this.userRoleGroupResetForm
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadUserRoleGroup(this.$route.params.id)
    }
  }
}
</script>
