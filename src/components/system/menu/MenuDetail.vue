<template>
  <div>
    <el-container id="menudetail" direction="vertical">
      <el-row>
        <el-button-group>
          <el-button  class="actionButton" type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-row>
      <el-row style="padding: 10px">
        <el-form :model="menuForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="上级菜单序号">
                <el-cascader :options="staticOptions.parentMenu" v-model="menuForm.parentMenuId" :change-on-select="true"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单变量名称">
                <el-input name="name" v-model=menuForm.name></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单图标">
                <el-input name="icon" v-model=menuForm.icon></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单显示名称">
                <el-input name="alias" v-model=menuForm.alias></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="是否应用">
                <el-switch name="switch" v-model=menuForm.state></el-switch>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单次序号">
                <el-input name="sort" v-model=menuForm.sort></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单指向页面">
                <el-input name="value" v-model=menuForm.value></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单类型">
                <el-radio-group v-model="menuForm.type">
                  <el-radio label="OPTIONS">选项</el-radio>
                  <el-radio label="LINK">链接</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单描述">
                <el-input name="description" v-model=menuForm.description></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
  </el-container>
      <el-row class="footer-row">
        <el-form :model="menuForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单创建人:">
                <span>{{menuForm.lastModifiedBy}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'menuDetail',
  props: ['staticOptions', 'menuForm'],
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
    saveToDB () {
      let vm = this
      console.log('save to DB ' + this.selectedParentId)
      this.$ajax.post('/api/systemMenu', this.menuForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateMenuForm', res.data)
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.menuForm.id && this.menuForm.id !== '') {
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
      this.$ajax.get('/api/systemMenu/delete/' + this.menuForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteMenuItem')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
.actionButton, .btn-group{
  margin-top: 5px;
}
#menudetail > .el-row {
  margin: 10px;
}
.footer-row {
  background: #e3d7d3;
  padding: 10px;
}
</style>
