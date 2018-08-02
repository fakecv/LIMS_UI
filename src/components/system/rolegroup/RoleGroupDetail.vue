<template>
  <div>
    <el-container>
      <el-header>
        <el-button-group>
          <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-container style="padding: 10px">
        <el-form :model="userRoleGroupForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="角色组名称">
              <el-input name="userRoleGroupName" v-model="userRoleGroupForm.userRoleGroupName"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="角色组角色">
              <button type="button" class="btn btn-secondary" @click="loadUserRoles">添加角色</button>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item label="角色组描述">
              <el-input type="textarea" name="userRoleGroupDescription" v-model="userRoleGroupForm.userRoleGroupDescription"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
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
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-row>
            </el-form>
          </el-container>
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
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
                <el-cascader :options="linkMenus" v-model="scope.row.menuId" style="width: 350px;">
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
              :total="totalRoles">
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
  props: ['userRoleGroupForm'],
  data () {
    return {
      tableData: [],
      totalRoles: 0,
      roleRequestForm: {
        userRoleName: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      linkMenus: [],
      userRoles: [],
      multipleSelection: [],
      dialogFormVisible: false,
      selectedUserRoles: [],
      userRoleGroupRequestForm: {
        id: '',
        currentPage: 1,
        itemsPerPage: 20
      },
      actions: [
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
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
        this.delete()
      } else if (action.id === '3') {
        console.log(action.id)
      } else if (action.id === '4') {
        console.log(action.id)
      }
    },
    handleSizeChange (val) {
      this.roleRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.roleRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    formatter (row, column) {
      return this.menuList[row.menuId]
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/role/queryUserRole', this.roleRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalRoles = res.data.totalUserRoles || 0
          console.log('totalRoles is: ' + vm.totalRoles)
        })
    },
    loadMenuLinks () {
      let vm = this
      this.$ajax.post('/api/systemMenu/menuLinks', 'LINK')
        .then(function (res) {
          vm.linkMenus = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in load menuLinks!')
        })
    },
    loadUserRoles () {
      this.dialogFormVisible = true
      this.loadMenuLinks()
      this.onSubmit()
    },
    handleSelectionChange (val) {
      // this.multipleSelection = val
      val.forEach(row => {
        console.log(row.id)
        this.multipleSelection.push(row.id)
      })
    },
    updateUserRoles () {
      this.$emit('updateUserRoles', this.multipleSelection)
      this.dialogFormVisible = false
      this.multipleSelection = []
    },
    nextPage () {
      this.userRoleGroupRequestForm.currentPage += 1
      this.query()
    },
    lastPage () {
      if (this.userRoleGroupRequestForm.currentPage > 1) {
        this.userRoleGroupRequestForm.currentPage -= 1
        this.query()
      }
    },
    query () {
      let vm = this
      this.data = []
      const loading = this.$loading({
        lock: true,
        text: '加载角色列表，请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.userRoleGroupRequestForm.id = this.userRoleGroupForm.id
      this.$ajax.post('/api/roleGroup/queryTransferFormUserRole', this.userRoleGroupRequestForm)
        .then(function (res) {
          res.data.userRoles.forEach(item => {
            vm.userRoles.push({key: item.id, label: item.userRoleName})
          })
          res.data.selectedUserRoles.forEach(item => {
            vm.selectedUserRoles.push({key: item.id, label: item.userRoleName})
          })
          loading.close()
        }).catch(function (error) {
          console.log(error.message)
          loading.close()
        })
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/roleGroup', this.userRoleGroupForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          console.log('saveToDB')
          console.log(res.data)
          vm.$emit('updateUserRoleGroupForm', res.data)
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/roleGroup/delete/' + this.userRoleGroupForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteUserRoleGroup')
        }).catch(function (error) {
          console.log('RoleDetail delete ' + error)
          vm.$message('Something wrong happen!')
        })
    }
  },
  mounted () {
    this.query()
  }
}
</script>
<style lang="less">
  .transfer-footer-right {
    margin-left: 50px;
    padding: 5px;
  }
  .transfer-footer-left {
    margin-left: 20px;
    padding: 5px;
  }
  .el-transfer-panel, .el-transfer-panel__body, .el-transfer-panel__body, .el-checkbox-group {
    height: 650px;
  }
</style>
