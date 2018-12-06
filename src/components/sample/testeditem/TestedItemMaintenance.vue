    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="testedItemRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
          <el-form-item label="检测项目类别">
              <el-select name="testedItem" filterable clearable default-first-option v-model="testedItemRequestForm.testCategory">
                <el-option v-for="item in staticOptions.testCategories"
                  :key="item.id"
                  :label="item.testCategoryName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
        </el-row>
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-input name="testedItemName" v-model="testedItemRequestForm.testedItemName"></el-input>
            </el-form-item>
            <el-form-item label="检测项目说明">
              <el-input name="testedItemNumber" v-model="testedItemRequestForm.testedItemNumber"></el-input>
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
          prop="testCategory"
          label="检测项目类别"
          :formatter="testCategoryFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemName"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="检测项目序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="检测项目价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemNumber"
          label="检测项目说明"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItems">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testedItemMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      totalTestedItems: 0,
      testedItemRequestForm: {
        testedItemName: '',
        testedItemNumber: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemForm: {},
      tempTestedItemForm: {},
      staticOptions: {
        testCategories: []
      }
    }
  },
  methods: {
    loadTestCategory () {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/getTestCategory')
        .then(function (res) {
          vm.staticOptions.testCategories = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleSizeChange (val) {
      this.testedItemRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testedItemRequestForm.currentPage = val
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
        this.tempTestedItemForm = this.tableData[(index - 1)]
        this.testedItemForm = this.tableData[index]
        tmp = this.tempTestedItemForm.sort
        this.tempTestedItemForm.sort = this.testedItemForm.sort
        this.testedItemForm.sort = tmp
        this.$ajax.all([this.update(this.testedItemForm), this.update(this.tempTestedItemForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      let tmp = ''
      if (index > 0) {
        this.tempTestedItemForm = this.tableData[0]
        this.testedItemForm = this.tableData[index]
        tmp = this.tempTestedItemForm.sort
        this.tempTestedItemForm.sort = this.testedItemForm.sort
        this.testedItemForm.sort = tmp
        this.$ajax.all([this.update(this.testedItemForm), this.update(this.tempTestedItemForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
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
        this.tempTestedItemForm = this.tableData[(index + 1)]
        this.testedItemForm = this.tableData[index]
        tmp = this.tempTestedItemForm.sort
        this.tempTestedItemForm.sort = this.testedItemForm.sort
        this.testedItemForm.sort = tmp
        this.$ajax.all([this.update(this.testedItemForm), this.update(this.tempTestedItemForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      let tmp = ''
      if (index < this.tableData.length - 1) {
        this.tempTestedItemForm = this.tableData[this.tableData.length - 1]
        this.testedItemForm = this.tableData[index]
        tmp = this.tempTestedItemForm.sort
        this.tempTestedItemForm.sort = this.testedItemForm.sort
        this.testedItemForm.sort = tmp
        this.$ajax.all([this.update(this.testedItemForm), this.update(this.tempTestedItemForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/testedItem', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/testedItem/queryTestedItem', this.testedItemRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItems = res.data.totalTestedItems || 0
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
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/testedItemDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/testedItem/queryTestedItem', this.testedItemRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItems = res.data.totalTestedItems || 0
        })
    },
    testCategoryFormatter (row, column) {
      let name = ''
      this.staticOptions.testCategories.forEach(item => {
        if (row.testCategory === item.id) {
          name = item.testCategoryName
        }
      })
      return name
    }
  },
  mounted () {
    this.onSubmit()
    this.loadTestCategory()
  }

}
</script>
