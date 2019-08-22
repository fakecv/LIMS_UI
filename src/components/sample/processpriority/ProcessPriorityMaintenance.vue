    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="processPriorityRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="优先级名称">
              <el-input name="processPriorityName" v-model="processPriorityRequestForm.processPriorityName"></el-input>
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
      <el-table ref="multipleTable" :row-style="processPriorityTableStyle"
      :data="tableData" style="width: 100%"
      @row-dblclick=dblclick
      @selection-change="handleSelectionChange"
      @select="handleSelection">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="processPriorityName"
          label="优先级名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processPriorityDescription"
          label="优先级描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="processPriorityRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcessPrioritys">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'processPriorityMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      processPriorityForm: {},
      tempProcessPriorityForm: {},
      totalProcessPrioritys: 0,
      processPriorityRequestForm: {
        processPriorityName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.processPriorityRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processPriorityRequestForm.currentPage = val
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
        this.tempProcessPriorityForm = this.tableData[(index - 1)]
        this.processPriorityForm = this.tableData[index]
        tmp = this.tempProcessPriorityForm.sort
        this.tempProcessPriorityForm.sort = this.processPriorityForm.sort
        this.processPriorityForm.sort = tmp
        this.$ajax.all([this.update(this.processPriorityForm), this.update(this.tempProcessPriorityForm)])
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
        this.processPriorityForm = this.tableData[index]
        this.$ajax.post('/api/sample/processPriority/moveToTop', this.processPriorityForm)
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
        this.tempProcessPriorityForm = this.tableData[(index + 1)]
        this.processPriorityForm = this.tableData[index]
        tmp = this.tempProcessPriorityForm.sort
        this.tempProcessPriorityForm.sort = this.processPriorityForm.sort
        this.processPriorityForm.sort = tmp
        this.$ajax.all([this.update(this.processPriorityForm), this.update(this.tempProcessPriorityForm)])
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
        this.processPriorityForm = this.tableData[index]
        this.$ajax.post('/api/sample/processPriority/moveToBottom', this.processPriorityForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/processPriority', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/processPriority/queryProcessPriority', this.processPriorityRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessPrioritys = res.data.totalProcessPrioritys || 0
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
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/processPriorityDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/processPriority/queryProcessPriority', this.processPriorityRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessPrioritys = res.data.totalProcessPrioritys || 0
        })
    },
    processPriorityTableStyle ({row, rowIndex}) {
      return 'background: ' + row.processPriorityColor + ';color: ' + row.processPriorityFontColor
    }
  },
  activated () {
    this.onSubmit()
  }

}
</script>
