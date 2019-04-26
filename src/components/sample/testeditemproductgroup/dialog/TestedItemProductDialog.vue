<template>
  <el-container>
    <el-container style="padding: 10px">
      <el-form :model="testedItemTaskForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目类别">
                <el-select name="testCategory" filterable default-first-option v-model="testedItemTaskForm.testCategory" @change="handleTestCategoryChange">
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
              <el-select name="testedItem" filterable default-first-option v-model="testedItemTaskForm.testedItem" @change="handleTestedItemChange">
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
              <el-input name="testMethod" v-model="testedItemTaskForm.testMethod" autoComplete="testMethod"></el-input>
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
              <el-input name="testParameter" v-model="testedItemTaskForm.testParameter" autoComplete="testParameter"></el-input>
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
  props: ['testedItemTaskForm', 'staticOptions'],
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    handleTestCategoryChange (val) {
      this.$emit('handleTestCategoryChange', val)
    },
    handleTestedItemChange (val) {
      this.$emit('handleTestedItemChange', val)
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
