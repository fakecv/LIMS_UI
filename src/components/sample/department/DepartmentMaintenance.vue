    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="departmentRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="部门名称">
              <el-input name="departmentName" v-model="departmentRequestForm.departmentName"></el-input>
            </el-form-item>
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
          prop="departmentName"
          label="部门名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="departmentDescription"
          label="部门描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="departmentRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalDepartments">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'departmentMaintenance',
  data () {
    return {
      tableData: [],
      totalDepartments: 0,
      departmentRequestForm: {
        departmentName: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      indexArray: [],
      departmentForm: {},
      tempDepartmentForm: {}
    }
  },
  methods: {
    handleSizeChange (val) {
      this.departmentRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.departmentRequestForm.currentPage = val
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
        this.tempDepartmentForm = this.tableData[(index - 1)]
        this.departmentForm = this.tableData[index]
        tmp = this.tempDepartmentForm.sort
        this.tempDepartmentForm.sort = this.departmentForm.sort
        this.departmentForm.sort = tmp
        this.$ajax.all([this.update(this.departmentForm), this.update(this.tempDepartmentForm)])
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
        this.departmentForm = this.tableData[index]
        this.$ajax.post('/api/sample/department/moveToTop', this.departmentForm)
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
        this.tempDepartmentForm = this.tableData[(index + 1)]
        this.departmentForm = this.tableData[index]
        tmp = this.tempDepartmentForm.sort
        this.tempDepartmentForm.sort = this.departmentForm.sort
        this.departmentForm.sort = tmp
        this.$ajax.all([this.update(this.departmentForm), this.update(this.tempDepartmentForm)])
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
        this.departmentForm = this.tableData[index]
        this.$ajax.post('/api/sample/department/moveToBottom', this.departmentForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/department', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/department/queryDepartment', this.departmentRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalDepartments = res.data.totalDepartments || 0
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
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/departmentDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/department/queryDepartment', this.departmentRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalDepartments = res.data.totalDepartments || 0
        })
    }
  },
  activated () {
    this.onSubmit()
  }
}
</script>
