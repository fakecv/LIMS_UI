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
      <el-form :model="userForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="用户名">
              <el-input name="userName" v-model="userForm.userName" autoComplete="userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="用户密码">
              <el-input type="password" name="password" v-model="userForm.password" :readonly="userForm.modifiable" autoComplete="off">
                <el-button slot="append" @click.native="modifyPassword">更改密码</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所属部门">
              <el-select name="department" v-model=userForm.department>
               <el-option v-for="item in staticOptions.departments"
                :key="item.Id"
                :label="item.departmentName"
                :value="item.id">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="真实姓名">
              <el-input name="name" v-model="userForm.name" autoComplete="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="性别">
              <el-select name="sex" v-model=userForm.sex>
               <el-option label="男" value="male"></el-option>
               <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="职称">
              <el-input name="title" v-model="userForm.title" autoComplete="title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文化程度">
              <el-select name="degreeOfEducation" v-model=userForm.degreeOfEducation>
               <el-option label="大专" value="juniorCollege"></el-option>
               <el-option label="大学" value="college"></el-option>
               <el-option label="高职" value="technicalSecondarySchool"></el-option>
               <el-option label="硕士" value="master"></el-option>
               <el-option label="博士" value="doctor"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所学专业">
              <el-input name="major" v-model="userForm.major" autoComplete="major"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="毕业时间">
              <el-date-picker id="graduateOn" type="date" placeholder="选择日期" v-model="userForm.graduateOn" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="手机号码">
              <el-input name="mobileNumber" v-model="userForm.mobileNumber" autoComplete="mobileNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="注册邮箱">
              <el-input name="email" v-model="userForm.email" autoComplete="email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="传真">
              <el-input name="fax" v-model="userForm.fax" autoComplete="fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="通讯地址">
              <el-input name="address" v-model="userForm.address" autoComplete="address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="上次登录时间">
              <el-date-picker id="lastLogonAt" type="date" readonly placeholder="选择日期" v-model="userForm.lastLogonAt" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="登录时间">
              <el-date-picker id="logonAt" type="date" readonly placeholder="选择日期" v-model="userForm.logonAt" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="登录次数">
              <el-input name="logonTimes" readonly v-model="userForm.logonTimes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item label="用户角色组">
              <button type="button" class="btn btn-secondary" @click="addUserRoleGroups">添加角色组</button>
              <button type="button" class="btn btn-secondary" @click="deleteUserRoleGroups">删除角色组</button>
            </el-form-item>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
  <el-table ref="userRoleGroupTable" :data="staticOptions.selectedUserRoleGroups" style="width: 100%" @selection-change="handleUserRoleGroupChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="userRoleGroupName"
      label="角色组名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userRoleGroupDescription"
      label="角色组描述"
      width="180">
    </el-table-column>
  </el-table>
  <el-dialog title="角色组列表" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-container style="padding: 10px">
        <el-form :model="roleGroupRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="角色组名称">
              <el-input name="userRoleGroupName" v-model="roleGroupRequestForm.userRoleGroupName"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item>
              <el-button type="primary" @click="reloadUserRoleGroups">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-container>
      <el-table ref="userRoleGroupTable" :data="staticOptions.userRoleGroups" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="userRoleGroupName"
          label="角色组名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userRoleDescription"
          label="角色组描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="roleGroupRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="staticOptions.totalRoleGroups">
        </el-pagination>
      </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="updateUserRoleGroups">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'userDetail',
  props: ['staticOptions', 'userForm'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      deletedUserRoleGroups: [],
      multipleSelection: [],
      dialogFormVisible: false,
      roleGroupRequestForm: {
        userRoleGroupName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
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
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/users', this.userForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateUserForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/users/delete/' + this.userForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteUser')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    modifyPassword () {
      this.$emit('modifyPassword')
    },
    handleSizeChange (val) {
      this.roleGroupRequestForm.itemsPerPage = val
      this.$emit('reloadUserRoleGroups', this.roleGroupRequestForm)
    },
    handleCurrentChange (val) {
      this.roleGroupRequestForm.currentPage = val
      this.$emit('reloadUserRoleGroups', this.roleGroupRequestForm)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleUserRoleGroupChange (val) {
      this.deletedUserRoleGroups = val
    },
    updateUserRoleGroups () {
      this.$emit('updateUserRoleGroups', this.multipleSelection)
      this.dialogFormVisible = false
    },
    reloadUserRoleGroups () {
      this.$emit('reloadUserRoleGroups', this.roleGroupRequestForm)
    },
    addUserRoleGroups () {
      let vm = this
      this.dialogFormVisible = true
      this.$nextTick(() => {
        vm.$refs.userRoleGroupTable.clearSelection()
        vm.staticOptions.userRoleGroups.forEach(row => {
          if (vm.userForm.roleGroups && vm.userForm.roleGroups.indexOf(row.id) !== -1) {
            vm.$refs.userRoleGroupTable.toggleRowSelection(row, true)
          }
        })
      })
    },
    deleteUserRoleGroups () {
      this.$emit('deleteUserRoleGroups', this.deletedUserRoleGroups)
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
</style>
