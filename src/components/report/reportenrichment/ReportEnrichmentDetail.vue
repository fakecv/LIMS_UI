<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="reportEnrichmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="报表名称">
              <el-select name="reportName" filterable clearable default-first-option v-model="reportEnrichmentForm.reportName" @change="getCascadeItems">
                <el-option v-for="item in staticOptions.reports"
                  :key="item.id"
                  :label="item.reportName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联字段">
              <el-select name="enrichKey" filterable clearable default-first-option v-model="reportEnrichmentForm.enrichKey">
                <el-option v-for="item in staticOptions.enrichKeys"
                  :key="item.fieldName"
                  :label="item.fieldName"
                  :value="item.fieldName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联对象">
              <el-select name="enrichObject" filterable clearable default-first-option v-model="reportEnrichmentForm.enrichObject" @change="handleEnrichObjectChange">
                <el-option v-for="item in staticOptions.enrichObjects"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联值" >
              <el-input name="enrichValues" v-model="reportEnrichmentForm.enrichValues" autoComplete="enrichValues"></el-input>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="staticOptions.checkedEnrichValues" @change="handleReportEnrichmentValuesChange">
                <el-checkbox v-for="reportEnrichment in staticOptions.enrichValues" :label="reportEnrichment.fieldName" :key="reportEnrichment.fieldName">
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'reportEnrichmentDetail',
  props: ['reportEnrichmentForm', 'staticOptions'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '4', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '5', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '7', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      isIndeterminate: true,
      checkAll: false
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
        this.$message('复制成功!')
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.confirmDelete()
      } else if (action.id === '6') {
      } else if (action.id === '7') {
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
      this.$ajax.post('/api/report/reportEnrichment', this.reportEnrichmentForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateReportEnrichmentForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.reportEnrichmentForm.id && this.reportEnrichmentForm.id !== '') {
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
      this.$ajax.get('/api/report/reportEnrichment/delete/' + this.reportEnrichmentForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteReportEnrichmentForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getCascadeItems (val) {
      this.reportEnrichmentForm.enrichKey = ''
      this.$emit('getCascadeItems', val)
    },
    handleReportEnrichmentValuesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.staticOptions.enrichKeys.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.staticOptions.enrichKeys.length
      this.reportEnrichmentForm.enrichValues = value.join(',')
    },
    handleCheckAllChange (val) {
      let vm = this
      if (val) {
        this.staticOptions.enrichValues.forEach(enrichValue => {
          vm.staticOptions.checkedEnrichValues.push(enrichValue)
        })
        this.reportEnrichmentForm.enrichValues = this.staticOptions.checkedEnrichValues.join(',')
      } else {
        this.staticOptions.checkedEnrichValues = []
        this.reportEnrichmentForm.enrichValues = ''
      }
      this.isIndeterminate = false
    },
    handleEnrichObjectChange (val) {
      let vm = this
      this.staticOptions.enrichValues = []
      this.$ajax.get('/api/report/reportElement/getFieldNames/' + val)
        .then(function (res) {
          vm.staticOptions.enrichValues = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
