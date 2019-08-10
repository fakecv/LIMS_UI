<template>
  <el-dialog :visible.sync="testedItemTaskFormVisible" append-to-body>
    <el-container style="padding: 10px">
      <el-form :model="testedItemTaskForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目类别">
                <el-select name="testedItem" filterable default-first-option v-model="testedItemTaskForm.testCategory" @change="handleTestCategoryChange">
                  <el-option v-for="item in testCategories"
                    :key="item.id"
                    :label="item.testCategoryName"
                    :value="item.id">
                  </el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目">
              <el-select name="testedItem" filterable default-first-option v-model="testedItemTaskForm.testedItem" @change="handleTestedItemChange">
                <el-option v-for="item in filteredTestedItems"
                  :key="item.id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目参数">
              <el-input name="testParameter" v-model="testedItemTaskForm.testParameter" autoComplete="testParameter"></el-input>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedTestParameters1" @change="handleCheckedTestParametersChange">
                <el-checkbox v-for="testParameter in filteredTestParameters"
                 :label="testParameter.testParameterName" :key="testParameter.id">
                 {{testParameter.testParameterName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测方法">
              <el-input name="testMethod" v-model="testedItemTaskForm.testMethod" autoComplete="testMethod"></el-input>
              <el-checkbox :indeterminate="isTestMethodIndeterminate" v-model="testMethodCheckAll" @change="handleTestMethodCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedTestMethods1" @change="handleCheckedTestMethodsChange">
                <el-checkbox v-for="testMethod in filteredTestMethods"
                 :label="testMethod.testMethodName" :key="testMethod.id">
                 {{testMethod.testMethodName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
            <!-- <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="优先级">
                <el-select name="processPriority" filterable default-first-option v-model="testedItemTaskForm.processPriority">
                <el-option v-for="item in processPriorities"
                  :key="item.id"
                  :label="item.processPriorityName"
                  :value="item.processPriorityName">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          <el-col :span="24">
            <el-form-item label="驳回原因">
              <el-input type="textarea" name="rejectNote" v-model="testedItemTaskForm.rejectNote" autoComplete="rejectNote"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeTestedItemTaskDialog">取 消</el-button>
      <el-button type="primary" @click="updateTestedItemTask">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'testedItemTaskDialog',
  props: [
    'testCategories',
    'filteredTestedItems',
    'filteredTestParameters',
    'filteredTestMethods',
    'processPriorities',
    'checkedTestParameters',
    'checkedTestMethods',
    'testedItemTaskForm',
    'testedItemTaskFormVisible'
  ],
  data () {
    return {
      isTestMethodIndeterminate: true,
      testMethodCheckAll: false,
      isIndeterminate: true,
      checkAll: false,
      checkedTestMethods1: this.checkedTestMethods,
      checkedTestParameters1: this.checkedTestParameters,
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12}
    }
  },
  methods: {
    handleTestCategoryChange (testCategoryId) {
      this.$emit('handleTestCategoryChange', testCategoryId)
    },
    handleTestedItemChange (val) {
      this.$emit('handleTestedItemChange', val)
    },
    updateTestedItemTask (val) {
      this.$emit('updateTestedItemTask', val)
    },
    closeTestedItemTaskDialog () {
      this.$emit('closeTestedItemTaskDialog')
    },
    handleCheckAllChange (val) {
      let vm = this
      this.checkedTestParameters1 = []
      if (val) {
        this.filteredTestParameters.forEach(testParameter => {
          vm.checkedTestParameters1.push(testParameter.testParameterName)
        })
      }
      this.$emit('handleCheckAllChange', val)
      this.isIndeterminate = false
    },
    handleCheckedTestParametersChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.filteredTestParameters.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.filteredTestParameters.length
      this.$emit('handleCheckedTestParametersChange', value)
    },
    handleTestMethodCheckAllChange (val) {
      this.isTestMethodIndeterminate = false
      let vm = this
      this.checkedTestMethods1 = []
      if (val) {
        this.filteredTestMethods.forEach(testMethod => {
          vm.checkedTestMethods1.push(testMethod.testMethodName)
        })
      }
      this.$emit('handleTestMethodCheckAllChange', val)
    },
    handleCheckedTestMethodsChange (value) {
      let checkedCount = value.length
      this.testMethodCheckAll = checkedCount === this.filteredTestMethods.length
      this.isTestMethodIndeterminate = checkedCount > 0 && checkedCount < this.filteredTestMethods.length
      this.$emit('handleCheckedTestMethodsChange', value)
    }
  }

}
</script>
<style>

</style>
