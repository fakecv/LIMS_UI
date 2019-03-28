<template>
  <el-dialog :visible.sync="testedItemProductFormVisible" :modal-append-to-body="false">
    <div>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目类别">
                <el-select name="testedItem" filterable clearable default-first-option v-model="testedItemProductForm.testCategory" @change="handleTestCategoryChange">
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
              <el-select name="testedItem" filterable clearable default-first-option v-model="testedItemProductForm.testedItem" @change="handleTestedItemChange">
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
              <el-select name="testParameter" filterable clearable default-first-option v-model="testedItemProductForm.testParameter">
                <el-option v-for="item in filteredTestParameters"
                  :key="item.id"
                  :label="item.testParameterName"
                  :value="item.testParameterName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测方法">
              <el-select name="testMethod" filterable clearable default-first-option v-model="testedItemProductForm.testMethod">
                <el-option v-for="item in filteredTestMethods"
                  :key="item.id"
                  :label="item.testMethodName"
                  :value="item.testMethodName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="loadTestedItemProductData">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table :data="testedItemProductTableData" style="width: 100%"  @selection-change="handleTestedItemProductChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="testedItem"
          label="检测项目"
          :formatter="testedItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testParameter"
          label="检测项目参数"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethod"
          label="检测方法"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleTestedItemProductSizeChange"
          @current-change="handleTestedItemProductCurrentChange"
          :current-page.sync="testedItemProductForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItemProducts">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="testedItemProductFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTestedItemProduct">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'testedItemProductDialog',
  props: ['testCategories',
    'filteredTestedItems',
    'filteredTestParameters',
    'filteredTestMethods',
    'testedItemProductForm',
    'testedItemProductTableData',
    'testedItemProductFormVisible',
    'totalTestedItemProducts',
    'testedItems'
  ],
  data () {
    return {
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
    loadTestedItemProductData () {
      this.$emit('loadTestedItemProductData')
    },
    handleTestedItemProductChange (val) {
      this.$emit('handleTestedItemProductChange', val)
    },
    handleTestedItemProductSizeChange (val) {
      this.$emit('handleTestedItemProductSizeChange', val)
    },
    handleTestedItemProductCurrentChange (val) {
      this.$emit('handleTestedItemProductCurrentChange', val)
    },
    updateTestedItemProduct (val) {
      this.$emit('updateTestedItemProduct', val)
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    }
  }

}
</script>
<style>

</style>
