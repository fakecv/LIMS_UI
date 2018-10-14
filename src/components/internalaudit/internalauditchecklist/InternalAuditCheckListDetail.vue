<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container id="auditContainer" style="padding: 10px">
      <el-form :model="internalAuditCheckListForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="被审核岗位">
                <el-select name="auditDepartment" filterable default-first-option v-model="internalAuditCheckListForm.auditDepartment">
                <el-option v-for="item in staticOptions.auditDepartments"
                  :key="item.Id"
                  :label="item.auditDepartmentName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="内部审核员">
                <el-select name="internalAuditor" filterable default-first-option v-model="internalAuditCheckListForm.internalAuditor">
                <el-option v-for="item in staticOptions.internalAuditors"
                  :key="item.Id"
                  :label="item.internalAuditorName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="审核日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="internalAuditCheckListForm.auditDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="条款">
              <el-input name="terms" v-model="internalAuditCheckListForm.terms" autoComplete="terms"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核内容">
              <el-input type="textarea" name="auditContent" v-model="internalAuditCheckListForm.auditContent" autoComplete="auditContent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核方法">
              <el-input name="auditMethod" v-model="internalAuditCheckListForm.auditMethod" autoComplete="auditMethod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核说明">
              <el-input type="textarea" name="auditNote" v-model="internalAuditCheckListForm.auditNote" autoComplete="auditNote"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="审核结果">
              <el-select name="auditResult" v-model="internalAuditCheckListForm.auditResult">
               <el-option label="Yes" value="Yes"></el-option>
               <el-option label="No" value="No"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="审批人">
              <el-select name="checker" filterable default-first-option v-model="internalAuditCheckListForm.checker">
                <el-option v-for="item in staticOptions.internalAuditors"
                  :key="item.Id"
                  :label="item.internalAuditorName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'internalAuditCheckListDetail',
  props: ['internalAuditCheckListForm', 'staticOptions'],
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
      this.$ajax.post('/api/internalauditchecklist/internalAuditCheckList', this.internalAuditCheckListForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateInternalAuditCheckListForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.internalAuditCheckListForm.id && this.internalAuditCheckListForm.id !== '') {
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
      this.$ajax.get('/api/internalauditchecklist/internalAuditCheckList/delete/' + this.internalAuditCheckListForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteInternalAuditCheckList')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
#auditContainer {
  margin-top: 10px;
}
</style>
