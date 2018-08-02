<template>
  <RoleGroupDetail :userRoleGroupForm="userRoleGroupForm"/>
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
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
