<template>
  <el-container>
    <el-header style="min-width:400px;">
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px" direction="vertical">
      <el-form :model="roleForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-form-item label="角色名称">
            <el-input name="roleName" v-model="roleForm.userRoleName"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-cascader :options="staticOptions.linkMenus" v-model="roleForm.menuId" style="width: 100%;" :change-on-select="true">
            </el-cascader>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" name="roleDescription" v-model="roleForm.userRoleDescription"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-container direction="vertical">
      <el-row>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </el-row>
      <el-row>
        <el-checkbox-group v-model="staticOptions.checkedPrivileges" @change="handleCheckedPriviledgesChange">
          <el-checkbox label="new">新建</el-checkbox>
          <el-checkbox label="copy">复制</el-checkbox>
          <el-checkbox label="unlock">解锁</el-checkbox>
          <el-checkbox label="delete">删除</el-checkbox>
          <el-checkbox label="save">保存</el-checkbox>
          <el-checkbox label="auth">授权</el-checkbox>
          <el-checkbox label="preview">文件预览</el-checkbox>
          <el-checkbox label="saveAsTemplate">保存为模板</el-checkbox>
        </el-checkbox-group>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'roleDetail',
  props: ['staticOptions', 'roleForm'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-delete', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      isIndeterminate: false,
      checkAll: false
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.staticOptions.checkedPrivileges = val ? this.staticOptions.privileges : []
      this.isIndeterminate = false
      console.log(this.staticOptions.checkedPrivileges)
    },
    handleCheckedPriviledgesChange (value) {
      console.log(this.staticOptions.checkedPrivileges)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.staticOptions.privileges.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.staticOptions.privileges.length
    },
    actionHandle (action) {
      // var vm = this
      if (action.id === '1') {
        this.saveToDB()
      } else if (action.id === '2') {
        this.confirmDelete()
      } else if (action.id === '3') {
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.new()
      } else if (action.id === '6') {
        this.copy()
      } else if (action.id === '7') {
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
      this.$message('复制成功!')
    },
    saveToDB () {
      let vm = this
      this.roleForm.privileges = this.staticOptions.checkedPrivileges.join(',')
      console.log(this.roleForm.privileges)
      this.$ajax.post('/api/role', this.roleForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateRoleForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.roleForm.id && this.roleForm.id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/role/delete/' + this.roleForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteUserRole')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
