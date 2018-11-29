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
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目名称">
              <el-input name="testedItemProductName" v-model="testedItemProductForm.testedItemProductName" autoComplete="testedItemProductName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目产品序号" label-width="140px">
              <el-input name="sort" v-model="testedItemProductForm.sort"></el-input>
            </el-form-item>
          </el-col>
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
            <el-form-item label="检测项目参数">
              <el-input name="testParameter" v-model="testedItemProductForm.testParameter" autoComplete="testParameter"></el-input>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="staticOptions.checkedTestParameters" @change="handleCheckedTestParametersChange">
                <el-checkbox v-for="testParameter in staticOptions.filteredTestParameters" :label="testParameter.testParameterName" :key="testParameter.id">{{testParameter.testParameterName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测方法">
              <el-select name="testMethod" filterable default-first-option v-model="testedItemProductForm.testMethod">
                <el-option v-for="item in staticOptions.filteredTestMethods"
                  :key="item.id"
                  :label="item.testMethodName"
                  :value="item.testMethodName">
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
      this.$ajax.post('/api/sample/testedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updatetestedItemProductForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
          vm.$message(error.response.data.message)
        })
    },
    getFilteredTestItems (val) {
      this.$emit('getFilteredTestItems', val)
    },
    getCascadeItems (val) {
      this.$emit('getCascadeItems', val)
    },
    handleCheckedTestParametersChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.staticOptions.filteredTestParameters.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.staticOptions.filteredTestParameters.length
      this.testedItemProductForm.testParameter = value.join(',')
      // this.testedItemProductForm.testParameter = value
    },
    handleCheckAllChange (val) {
      let vm = this
      if (val) {
        this.staticOptions.filteredTestParameters.forEach(testParameter => {
          vm.staticOptions.checkedTestParameters.push(testParameter.testParameterName)
        })
        this.testedItemProductForm.testParameter = this.staticOptions.checkedTestParameters.join(',')
      } else {
        this.staticOptions.checkedTestParameters = []
        this.testedItemProductForm.testParameter = ''
      }
      this.isIndeterminate = false
    }
  }
}
</script>
<style lang="less">
</style>
