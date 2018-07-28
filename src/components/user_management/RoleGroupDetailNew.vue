<template>
  <RoleGroupDetail :staticOptions="staticOptions" :roleForm="roleForm"/>
</template>

<script>
import RoleGroupDetail from '@/components/user_management/RoleGroupDetail'
export default {
  name: 'roleGroupDetailNew',
  components: {RoleGroupDetail},
  data () {
    return {
      roleForm: {
        parentMenuId: [],
        name: '',
        createUserId: ''
      },
      staticOptions: {
        parentMenu: []
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
