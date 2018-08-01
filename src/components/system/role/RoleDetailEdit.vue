<template>
  <RoleDetail :staticOptions="staticOptions" :roleForm="roleForm"/>
</template>

<script>
import RoleDetail from '@/components/system/role/RoleDetail'
export default {
  name: 'roleDetailEdit',
  components: {RoleDetail},
  data () {
    return {
      roleForm: {
        menuId: '',
        roleName: '',
        roleId: '',
        roleDescription: ''
      },
      staticOptions: {
        linkMenu: []
      }
    }
  },
  methods: {
    loadMenuLinks () {
      let vm = this
      this.$ajax.post('/api/systemMenu/menuLinks', 'LINK')
        .then(function (res) {
          vm.staticOptions.linkMenu = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadParentMenu!')
        })
    },
    loadRole (roleId) {
      let vm = this
      this.$ajax.get('/api/security/singleRole/' + roleId)
        .then(function (res) {
          vm.roleForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadRole!')
        })
    }
  },
  mounted () {
    this.loadMenuLinks()
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadMenuItem(this.$route.params.id)
    }
  }
}
</script>
