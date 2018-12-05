<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="reportElementForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="报告名称">
              <el-select name="reportName" filterable default-first-option v-model="reportElementForm.reportName" @change="getCascadeItems">
                <el-option v-for="item in staticOptions.reports"
                  :key="item.id"
                  :label="item.reportName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="序号">
              <el-input name="reportElementSort" v-model="reportElementForm.reportElementSort" autoComplete="reportElementSort"></el-input>
              <el-button :disabled="disableSortButton" @click="numberGenerator">生成序号</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="输入值特征">
              <el-radio-group v-model="reportElementForm.reportElementInput" :disabled="staticOptions.input" @change="handleInputChange">
                <el-radio label="no">无</el-radio>
                <el-radio label="direct">直接输入</el-radio>
                <el-radio label="indirect">关联输入</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput ==='no'" :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="单元格名称">
              <el-input name="reportElementName" v-model="reportElementForm.reportElementName" autoComplete="reportElementName"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput ==='no'" :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="单元格标签">
              <el-input name="reportElementLabel" v-model="reportElementForm.reportElementLabel" autoComplete="reportElementLabel"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput ==='no'" :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="类别">
              <el-select name="type" filterable default-first-option v-model="reportElementForm.type">
                <el-option v-for="item in staticOptions.types"
                  :key="item.id"
                  :label="item.type"
                  :value="item.type">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput !=='no'" :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="是否所属组">
              <el-radio-group v-model="reportElementForm.group" @change="handleGroupChange">
                <el-radio label="yes">是</el-radio>
                <el-radio label="no">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.group ==='yes'" :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所属组类名">
              <el-select name="groupClass" filterable default-first-option v-model="reportElementForm.groupClass" @change="handleGroupClassChange">
                <el-option v-for="item in staticOptions.collectionNames"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput ==='direct'" :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="值内容">
              <el-select name="value" filterable default-first-option v-model="reportElementForm.value">
                <el-option v-for="item in staticOptions.values"
                  :key="item.fieldName"
                  :label="item.fieldName"
                  :value="item.fieldName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput ==='indirect'" :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联对象">
              <el-select name="value" filterable default-first-option v-model="reportElementForm.object" @change="handleObjectChange">
                <el-option v-for="item in staticOptions.objects"
                  :key="item.id"
                  :label="item.enrichObject"
                  :value="item.enrichObject">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="reportElementForm.reportElementInput ==='indirect'" :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联值内容">
              <el-select name="value" filterable default-first-option v-model="reportElementForm.indirectValue">
                <el-option v-for="item in staticOptions.indirectValues"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="边框特征">
              <el-select name="border" filterable default-first-option v-model="reportElementForm.border">
                <el-option v-for="item in staticOptions.borders"
                  :key="item.id"
                  :label="item.border"
                  :value="item.border">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="单元格属性">
              <el-select name="property" filterable default-first-option v-model="reportElementForm.property">
                <el-option v-for="item in staticOptions.propertys"
                  :key="item.id"
                  :label="item.property"
                  :value="item.property">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="字体大小">
              <el-select name="fontSize" filterable default-first-option v-model="reportElementForm.fontSize">
                <el-option v-for="item in staticOptions.fontSizes"
                  :key="item.id"
                  :label="item.fontSize"
                  :value="item.fontSize">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="文本位置">
              <el-select name="textAlign" filterable default-first-option v-model="reportElementForm.textAlign">
                <el-option v-for="item in staticOptions.textAligns"
                  :key="item.id"
                  :label="item.textAlign"
                  :value="item.textAlign">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所占行数">
              <el-input name="row" v-model="reportElementForm.row" autoComplete="row"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所占列数">
              <el-input name="column" v-model="reportElementForm.column" autoComplete="column"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'reportElementDetail',
  props: ['reportElementForm', 'staticOptions'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '4', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '5', 'icon': 'el-icon-delete', 'loading': false},
        {'name': '文件导入', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '7', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      disableSortButton: false
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
      this.disableSortButton = false
    },
    copy () {
      this.$emit('copy')
      this.disableSortButton = false
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/report/reportElement', this.reportElementForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updatereportElementForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.reportElementForm.id && this.reportElementForm.id !== '') {
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
      this.$ajax.get('/api/report/reportElement/delete/' + this.reportElementForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteReportElementForm')
          vm.disableSortButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleObjectChange (val) {
      let vm = this
      this.staticOptions.objects.forEach(item => {
        if (item.enrichObject === val) {
          vm.staticOptions.indirectValues = item.enrichValues.split(',')
        }
      })
    },
    handleInputChange (val) {
      this.$emit('handleInputChange', val)
    },
    handleGroupChange (val) {
      this.$emit('handleGroupChange', val)
    },
    handleGroupClassChange (val) {
      this.$emit('handleGroupClassChange', val)
    },
    numberGenerator () {
      let vm = this
      this.$ajax.get('/api/report/reportElement/generateSortNumber')
        .then(function (res) {
          vm.reportElementForm.reportElementSort = res.data
          vm.disableSortButton = true
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getCascadeItems (val) {
      this.reportElementForm.value = ''
      this.$emit('getCascadeItems', val)
    }
  }
}
</script>
<style lang="less">
</style>
