    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="testMethodRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="testedItem" filterable clearable default-first-option v-model="testMethodRequestForm.testedItem">
                <el-option v-for="item in testedItems"
                  :key="item.Id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="试验方法编号">
              <el-input name="testMethodName" v-model="testMethodRequestForm.testMethodName"></el-input>
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
          prop="testedItem"
          label="检测项目名称"
          :formatter="testedItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethodName"
          label="试验方法编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethodNumber"
          label="试验方法描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testMethodRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestMethods">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testMethodMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      totalTestMethods: 0,
      testMethodRequestForm: {
        testMethodName: '',
        testMethodNumber: '',
        testedItem: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testMethodForm: {},
      tempTestMethodForm: {},
      testedItems: []
    }
  },
  methods: {
    loadTestedItemData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.testedItems = res.data
        })
    },
    handleSizeChange (val) {
      this.testMethodRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testMethodRequestForm.currentPage = val
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
        this.tempTestMethodForm = this.tableData[(index - 1)]
        this.testMethodForm = this.tableData[index]
        tmp = this.tempTestMethodForm.sort
        this.tempTestMethodForm.sort = this.testMethodForm.sort
        this.testMethodForm.sort = tmp
        this.$ajax.all([this.update(this.testMethodForm), this.update(this.tempTestMethodForm)])
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
        this.testMethodForm = this.tableData[index]
        this.$ajax.post('/api/sample/testMethod/moveToTop', this.testMethodForm)
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
        this.tempTestMethodForm = this.tableData[(index + 1)]
        this.testMethodForm = this.tableData[index]
        tmp = this.tempTestMethodForm.sort
        this.tempTestMethodForm.sort = this.testMethodForm.sort
        this.testMethodForm.sort = tmp
        this.$ajax.all([this.update(this.testMethodForm), this.update(this.tempTestMethodForm)])
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
        this.testMethodForm = this.tableData[index]
        this.$ajax.post('/api/sample/testMethod/moveToBottom', this.testMethodForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/testMethod', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/testMethod/queryTestMethod', this.testMethodRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestMethods = res.data.totalTestMethods || 0
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
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/testMethodDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/testMethod/queryTestMethod', this.testMethodRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestMethods = res.data.totalTestMethods || 0
        })
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
  },
  mounted () {
    this.onSubmit()
    this.loadTestedItemData()
  },
  activated () {
    this.onSubmit()
    this.loadTestedItemData()
  }
}
</script>
