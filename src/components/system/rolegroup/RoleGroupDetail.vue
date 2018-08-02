<template>
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
        <div style="text-align: center; height: 850px;width: 600px;margin: auto">
          <el-transfer
            style="text-align: left; display: inline-block;"
            v-model="selectedUserRoles"
            :titles="['角色列表', '已包含角色列表']"
            :left-default-checked="[1]"
            :button-texts="['到左边', '到右边']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="userRoles">
            <el-row  class="transfer-footer-left" slot="left-footer">
              <el-col :span="12">
                <el-button type="primary" size="mini" @click="lastPage">上一页</el-button>
              </el-col>
              <el-col :span="12">
               <el-button type="primary" size="mini" @click="nextPage">下一页</el-button>
              </el-col>
            </el-row>
            <el-row  class="transfer-footer-right" slot="right-footer">
            </el-row>
          </el-transfer>
        </div>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'roleGroupDetail',
  props: ['userRoleGroupForm'],
  data () {
    return {
      userRoles: [],
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
    handleChange (value, direction, movedKeys) {

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
      this.$ajax.post('/api/roleGroup', this.roleGroupForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          console.log('saveToDB')
          console.log(res.data)
          vm.$emit('updateRoleForm', res.data)
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/role/delete/' + this.roleForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteUserRole')
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
