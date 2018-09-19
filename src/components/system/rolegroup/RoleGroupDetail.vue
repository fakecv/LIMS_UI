<template>
  <div>
    <el-container>
      <el-header>
        <el-button-group>
          <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-container style="padding: 10px" direction="vertical">
        <el-form :model="userRoleGroupForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="角色组名称">
              <el-input name="userRoleGroupName" v-model="userRoleGroupForm.userRoleGroupName"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="角色组描述">
              <el-input type="textarea" name="userRoleGroupDescription" v-model="userRoleGroupForm.userRoleGroupDescription"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="角色组角色">
              <button type="button" class="btn btn-secondary" @click="addUserRoles">添加角色</button>
              <button type="button" class="btn btn-secondary" @click="deleteUserRoles">删除角色</button>
            </el-form-item>
          </el-row>
        </el-form>
          <div>
          <el-table ref="userRoleTable" :data="staticOptions.selectedUserRoles" style="width: 100%" @selection-change="handleUserRoleChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="userRoleName"
              label="角色名称"
              width="160">
            </el-table-column>
            <el-table-column
              label="菜单名称"
              width="370">
              <template slot-scope="scope">
                <el-cascader :options="staticOptions.linkMenus" v-model="scope.row.menuId" style="width: 350px;">
                </el-cascader>
              </template>
            </el-table-column>
            <el-table-column
              prop="userRoleDescription"
              label="角色描述"
              width="180">
            </el-table-column>
          </el-table>
          </div>
      </el-container>
    </el-container>
        <el-dialog title="角色列表" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
          <el-container style="padding: 10px">
            <el-form :model="roleRequestForm" label-width="100px" label-position="left" size="mini">
              <el-row :gutter="20">
                <el-form-item label="角色名称">
                  <el-input name="userRoleName" v-model="roleRequestForm.userRoleName"></el-input>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item>
                  <el-button type="primary" @click="reloadUserRoles">查询</el-button>
                </el-form-item>
              </el-row>
            </el-form>

          </el-container>
          <el-table ref="userRoleTable" :data="staticOptions.userRoles" style="width: 100%" @select="handleSelect">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="userRoleName"
              label="角色名称"
              width="180">
            </el-table-column>
            <el-table-column
              label="菜单名称"
              width="370">
              <template slot-scope="scope">
                <el-cascader :options="staticOptions.linkMenus" v-model="scope.row.menuId" style="width: 350px;">
                </el-cascader>
              </template>
            </el-table-column>
            <el-table-column
              prop="userRoleDescription"
              label="角色描述"
              width="180">
            </el-table-column>
          </el-table>
          <div class="block text-right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="roleRequestForm.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="20"
              layout="sizes, prev, pager, next"
              :total="staticOptions.totalRoles">
            </el-pagination>
          </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="updateUserRoles">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'roleGroupDetail',
  props: ['userRoleGroupForm', 'staticOptions'],
  data () {
    return {
      roleRequestForm: {
        userRoleName: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      multipleSelection: [],
      deletedUserRoles: [],
      dialogFormVisible: false,
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    actionHandle (action) {
      // var vm = this
      console.log(action.id)
      if (action.id === '1') {
        this.saveToDB()
      } else if (action.id === '2') {
        console.log(action.id)
        this.confirmDelete()
      } else if (action.id === '3') {
        console.log(action.id)
      } else if (action.id === '4') {
        console.log(action.id)
      } else if (action.id === '5') {
        this.new()
      } else if (action.id === '6') {
        this.copy()
      } else if (action.id === '7') {
        console.log(action.id)
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
    },
    handleSizeChange (val) {
      this.roleRequestForm.itemsPerPage = val
      this.$emit('reloadUserRoles', this.roleRequestForm)
    },
    handleCurrentChange (val) {
      this.roleRequestForm.currentPage = val
      this.$emit('reloadUserRoles', this.roleRequestForm)
    },
    reloadUserRoles () {
      this.$emit('reloadUserRoles', this.roleRequestForm)
    },
    addUserRoles () {
      let vm = this
      this.dialogFormVisible = true
      this.$nextTick(() => {
        vm.$refs.userRoleTable.clearSelection()
        vm.staticOptions.userRoles.forEach(row => {
          if (vm.userRoleGroupForm.userRoleIds && vm.userRoleGroupForm.userRoleIds.indexOf(row.id) !== -1) {
            vm.$refs.userRoleTable.toggleRowSelection(row, true)
          }
        })
      })
    },
    handleSelect (selection, row) {
      console.log('handleSelect' + row.id)
      console.log(selection)
      this.$emit('updateUserRoles', row.id)
    },
    handleUserRoleChange (val) {
      console.log('handleUserRoleChange' + val.length)
      this.deletedUserRoles = val
    },
    deleteUserRoles () {
      this.$emit('deleteUserRoles', this.deletedUserRoles)
    },
    updateUserRoles () {
      this.dialogFormVisible = false
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/roleGroup', this.userRoleGroupForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateUserRoleGroupForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.userRoleGroupForm.id && this.userRoleGroupForm.id !== '') {
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
      this.$ajax.get('/api/roleGroup/delete/' + this.userRoleGroupForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteUserRoleGroup')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
</style>
