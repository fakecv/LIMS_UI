<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="testCategoryRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测类别名称">
              <el-input name="testCategoryName" v-model="testCategoryRequestForm.testCategoryName" autoComplete="testCategoryName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测类别描述">
              <el-input name="testCategoryDescription" v-model="testCategoryRequestForm.testCategoryDescription" autoComplete="testCategoryDescription"></el-input>
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
      <el-row type="flex" justify="end">
        <el-button-group size="mini">
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveTop">置顶</el-button>
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveUp">上移</el-button>
          <el-button type="primary" @click.native="moveDown">下移<i class="el-icon-arrow-down"></i></el-button>
          <el-button type="primary" @click.native="moveBottom">置底<i class="el-icon-arrow-down"></i></el-button>
        </el-button-group>
      </el-row>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      @row-dblclick=dblclick
      @selection-change="handleSelectionChange"
      @select="handleSelection">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          :current-page.sync="testCategoryRequestForm.currentPage"
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
      indexArray: [],
      testCategoryForm: {},
      tempTestCategoryForm: {},
      totalTestCategorys: 0,
      testCategoryRequestForm: {
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
      this.testCategoryRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testCategoryRequestForm.currentPage = val
      this.onSubmit()
    },
    handleSelection (selection, row) {
      if (selection.indexOf(row) > 0) {
        selection.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item)
        })
      }
    },
    handleSelectionChange (selection) {
      let vm = this
      this.indexArray = []
      selection.forEach(item => {
        vm.indexArray.push(vm.tableData.indexOf(item))
      })
    },
    moveUp () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveUpSingle(item)
      })
    },
    moveTop () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveTopSingle(item)
      })
    },
    moveUpSingle (index) {
      let vm = this
      let tmp = ''
      if (index > 0) {
        this.tempTestCategoryForm = this.tableData[(index - 1)]
        this.testCategoryForm = this.tableData[index]
        tmp = this.tempTestCategoryForm.sort
        this.tempTestCategoryForm.sort = this.testCategoryForm.sort
        this.testCategoryForm.sort = tmp
        this.$ajax.all([this.update(this.testCategoryForm), this.update(this.tempTestCategoryForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      if (index > 0) {
        this.testCategoryForm = this.tableData[index]
        this.$ajax.post('/api/sample/testCategory/moveToTop', this.testCategoryForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveDown () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveDownSingle(item)
      })
    },
    moveBottom () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveBottomSingle(item)
      })
    },
    moveDownSingle (index) {
      let vm = this
      let tmp = ''
      if (index < this.tableData.length - 1) {
        this.tempTestCategoryForm = this.tableData[(index + 1)]
        this.testCategoryForm = this.tableData[index]
        tmp = this.tempTestCategoryForm.sort
        this.tempTestCategoryForm.sort = this.testCategoryForm.sort
        this.testCategoryForm.sort = tmp
        this.$ajax.all([this.update(this.testCategoryForm), this.update(this.tempTestCategoryForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      if (index < this.tableData.length - 1) {
        this.testCategoryForm = this.tableData[index]
        this.$ajax.post('/api/sample/testCategory/moveToBottom', this.testCategoryForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/testCategory', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/testCategory/queryTestCategory', this.testCategoryRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestCategorys = res.data.totalTestCategorys || 0
          vm.$nextTick(() => {
            vm.tableData.forEach(row => {
              if (row.id === val.id) {
                vm.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          })
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    // load all the testCategoryes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/testCategory/queryTestCategory', this.testCategoryRequestForm)
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
  },
  activated () {
    this.onSubmit()
  }
}
</script>
