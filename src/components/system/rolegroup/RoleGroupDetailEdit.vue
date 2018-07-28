<template>
  <RoleGroupDetail :staticOptions="staticOptions" :roleForm="roleForm"/>
</template>

<script>
import RoleGroupDetail from '@/components/system/rolegroup/RoleGroupDetail'
export default {
  name: 'roleGroupDetailEdit',
  components: {RoleGroupDetail},
  data () {
    return {
      roleGroupForm: {
        roleGroupId: [],
        roleGroupName: '',
        createUserId: ''
      },
      staticOptions: {
        parentMenu: []
      }
    }
  },
  methods: {
    query () {
      let vm = this
      this.data = []
      const loading = this.$loading({
        lock: true,
        text: '加载角色列表，请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$ajax.get('/api/queryRoles', this.form)
        .then(function (res) {
          res.data.pageResult.forEach(item => {
            vm.data.push({key: item.name, label: item.name})
          })
          loading.close()
        }).catch(function (error) {
          console.log(error.message)
          loading.close()
        })
      this.$ajax.post('/api/queryRoleGroup', this.roleGroupForm.roleGroupId)
        .then(function (res) {
          res.data.pageResult.forEach(item => {
            vm.data.push({key: item.name, label: item.name})
          })
          loading.close()
        }).catch(function (error) {
          console.log(error.message)
          loading.close()
        })
    }
  },
  mounted () {
    this.loadParentMenu()
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadMenuItem(this.$route.params.id)
    }
  }
}
</script>
