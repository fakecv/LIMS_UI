<template>
  <div>
    <el-container>
      <el-header style="min-width:400px;">
        <el-button-group>
          <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-container style="padding: 10px">
        <el-form :model="processingForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托编号">
                <el-select name="agreementNumber" filterable default-first-option v-model="processingForm.agreementNumber" @change="getAgreementNumber">
                <el-option v-for="item in staticOptions.agreements"
                  :key="item.Id"
                  :label="item.agreementNumber"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品名称">
                <el-input name="sampleName" v-model="processingForm.sampleName" readonly autoComplete="sampleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品编号">
                <el-input name="sampleNumber" v-model="processingForm.sampleNumber" autoComplete="sampleNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="试样编号">
                <el-input name="sampleSubNumber" v-model="processingForm.sampleSubNumber" autoComplete="sampleSubNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="检测项目">
                <el-select name="experimentalItem" filterable default-first-option v-model="processingForm.experimentalItem">
                <el-option v-for="item in staticOptions.experimentalItems"
                  :key="item.Id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="提交部门">
                <el-select name="submitFrom" filterable default-first-option v-model="processingForm.submitFrom">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.Id"
                  :label="item.departmentName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="提交至">
                <el-select name="submitTo" filterable default-first-option v-model="processingForm.submitTo">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.Id"
                  :label="item.departmentName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="流转状态">
                <el-select name="processingStatus" filterable default-first-option v-model="processingForm.processingStatus">
                <el-option v-for="item in staticOptions.processingStatuses"
                  :key="item.Id"
                  :label="item.processingStatusName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'processingDetail',
  props: ['processingForm', 'staticOptions', 'customerForm', 'userForm'],
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
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        // this.saveToDB()
      } else if (action.id === '2') {
        this.confirmDelete()
      } else if (action.id === '3') {
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        // this.new()
      } else if (action.id === '6') {
        // this.copy()
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
      this.$ajax.post('/api/sample/processing', this.processingForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessingForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.processingForm.id && this.processingForm.id !== '') {
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
      this.$ajax.get('/api/sample/processing/delete/' + this.processingForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteProcessing')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getAgreementNumber  (val) {
      this.$emit('getAgreementInfo', val)
    }
  }
}
</script>
<style lang="less">
</style>
