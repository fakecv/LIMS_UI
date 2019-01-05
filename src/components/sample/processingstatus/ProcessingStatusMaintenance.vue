    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="processingStatusRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="部门名称">
              <el-input name="processingStatusName" v-model="processingStatusRequestForm.processingStatusName"></el-input>
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
          prop="processingStatusName"
          label="状态名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatusDescription"
          label="状态描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="processingStatusRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcessingStatuss">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'processingStatusMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      processingStatusForm: {},
      tempProcessingStatusForm: {},
      totalProcessingStatuss: 0,
      processingStatusRequestForm: {
        processingStatusName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.processingStatusRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processingStatusRequestForm.currentPage = val
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
        this.tempProcessingStatusForm = this.tableData[(index - 1)]
        this.processingStatusForm = this.tableData[index]
        tmp = this.tempProcessingStatusForm.sort
        this.tempProcessingStatusForm.sort = this.processingStatusForm.sort
        this.processingStatusForm.sort = tmp
        this.$ajax.all([this.update(this.processingStatusForm), this.update(this.tempProcessingStatusForm)])
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
        this.processingStatusForm = this.tableData[index]
        this.$ajax.post('/api/sample/processingStatus/moveToTop', this.processingStatusForm)
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
        this.tempProcessingStatusForm = this.tableData[(index + 1)]
        this.processingStatusForm = this.tableData[index]
        tmp = this.tempProcessingStatusForm.sort
        this.tempProcessingStatusForm.sort = this.processingStatusForm.sort
        this.processingStatusForm.sort = tmp
        this.$ajax.all([this.update(this.processingStatusForm), this.update(this.tempProcessingStatusForm)])
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
        this.processingStatusForm = this.tableData[index]
        this.$ajax.post('/api/sample/processingStatus/moveToBottom', this.processingStatusForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/processingStatus', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/processingStatus/queryProcessingStatus', this.processingStatusRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessingStatuss = res.data.totalProcessingStatuss || 0
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
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/processingStatusDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/processingStatus/queryProcessingStatus', this.processingStatusRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessingStatuss = res.data.totalProcessingStatuss || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
