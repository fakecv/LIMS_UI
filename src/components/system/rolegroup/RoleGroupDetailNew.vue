<template>
  <RoleGroupDetail :userRoleGroupForm="userRoleGroupForm"
  v-on:updateUserRoleGroupForm="updateRoleGroupForm"
  v-on:deleteUserRoleGroup="resetRoleGroupForm"
  v-on:updateUserRoles="updateUserRoles"/>
</template>

<script>
import RoleGroupDetail from '@/components/system/rolegroup/RoleGroupDetail'
export default {
  name: 'roleGroupDetailNew',
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
    updateRoleGroupForm (event) {
      console.log('updateRoleGroupForm' + event.id)

      this.userRoleGroupForm.id = event.id
    },
    updateUserRoles (event) {
      console.log('updateUserRoles' + event)
      this.userRoleGroupForm.userRoleIds = event
    },
    resetRoleGroupForm () {
      this.userRoleGroupForm = this.userRoleGroupResetForm
    }
  },
  mounted () {
  }
}
</script>
