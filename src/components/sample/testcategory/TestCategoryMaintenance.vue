<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="testCategoryForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测类别名称">
              <el-input name="testCategoryName" v-model="testCategoryForm.testCategoryName" autoComplete="testCategoryName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测类别描述">
              <el-input name="testCategoryDescription" v-model="testCategoryForm.testCategoryDescription" autoComplete="testCategoryDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table :data="tableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="testCategoryName"
          label="检测类别名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testCategoryDescription"
          label="检测类别描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testCategoryForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestCategorys">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testCategoryMaintenance',
  data () {
    return {
      tableData: [],
      totalTestCategorys: 0,
      testCategoryForm: {
        testCategoryName: '',
        testCategoryDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/testCategoryDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.testCategoryForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testCategoryForm.currentPage = val
      this.onSubmit()
    },
    // load all the testCategoryes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/testCategory/queryTestCategory', this.testCategoryForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestCategorys = res.data.totalTestCategorys || 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }
}
</script>
