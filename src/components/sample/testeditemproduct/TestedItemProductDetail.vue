<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目类别">
                <el-select name="testedItem" filterable default-first-option v-model="testedItemProductForm.testCategory" @change="getFilteredTestItems">
                  <el-option v-for="item in staticOptions.testCategories"
                    :key="item.id"
                    :label="item.testCategoryName"
                    :value="item.id">
                  </el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目">
              <el-select name="testedItem" filterable default-first-option v-model="testedItemProductForm.testedItem" @change="getCascadeItems">
                <el-option v-for="item in staticOptions.filteredTestedItems"
                  :key="item.id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测方法">
              <el-input name="testMethod" v-model="testedItemProductForm.testMethod" autoComplete="testMethod"></el-input>
              <el-checkbox :indeterminate="staticOptions.isTestMethodIndeterminate" v-model="staticOptions.testMethodCheckAll" @change="handleTestMethodCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group ref="testMethod" v-model="staticOptions.checkedTestMethods" @change="handleCheckedTestMethodsChange">
                <el-checkbox v-for="testMethod in staticOptions.filteredTestMethods"
                 :label="testMethod.testMethodName" :key="testMethod.id">
                 {{testMethod.testMethodName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目参数">
              <el-input name="testParameter" v-model="testedItemProductForm.testParameter" autoComplete="testParameter"></el-input>
              <el-checkbox :indeterminate="staticOptions.isIndeterminate" v-model="staticOptions.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group ref="testParameter" v-model="staticOptions.checkedTestParameters" @change="handleCheckedTestParametersChange">
                <el-checkbox v-for="testParameter in staticOptions.filteredTestParameters"
                 :label="testParameter.testParameterName" :key="testParameter.id">
                 {{testParameter.testParameterName}}</el-checkbox>
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
  name: 'testedItemProductDetail',
  props: ['testedItemProductForm', 'staticOptions'],
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
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
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
      this.$ajax.post('/api/sample/testedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateTestedItemProductForm', res.data)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    confirmDelete () {
      let vm = this
      if (this.testedItemProductForm.id && this.testedItemProductForm.id !== '') {
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
      this.$ajax.get('/api/sample/testedItemProduct/delete/' + this.testedItemProductForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteTestedItemProductForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    getFilteredTestItems (val) {
      this.$emit('getFilteredTestItems', val)
    },
    getCascadeItems (val) {
      this.$emit('getCascadeItems', val)
    },
    handleCheckedTestParametersChange (value) {
      this.$emit('handleCheckedTestParametersChange', value)
    },
    handleCheckedTestMethodsChange (methods) {
      this.$emit('handleCheckedTestMethodsChange', methods)
    },
    handleTestMethodCheckAllChange (val) {
      this.$emit('handleTestMethodCheckAllChange', val)
    },
    handleCheckAllChange (val) {
      this.$emit('handleCheckAllChange', val)
    }
  }
}
</script>
<style lang="less">
</style>
