<template>
  <div>
    <div class="block text-right">
      <el-button type="primary" icon="el-icon-download" circle @click="checkAgreement">查看协议</el-button>
      <el-button type="primary" icon="el-icon-download" circle @click="addNewProcess">增加</el-button>
    </div>
    <el-table  id="out-table" :data="tableData"
      style="width: 100%"
      tooltip-effect="dark"
      @row-dblclick=dblclick
      :row-style="processTableStyle"
      >
      <el-table-column
        type="expand">
        <template slot-scope="scope">
        <el-table :data="scope.row.testedItemTasks" size="mini">
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
        <el-table-column
          prop="processPriority"
          label="优先级"
          width="180">
        </el-table-column>
        </el-table>
      </template>
      </el-table-column>
      <el-table-column
        prop="sampleSubNumber"
        label="试样编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="drawingDesign"
        label="加工图号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="submitFrom"
        label="提交部门"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交时间"
        :formatter="submitTimeFormatter"
        width="180">
      </el-table-column>
      <el-table-column
        prop="processingStatus"
        label="当前流转状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="submitTo"
        label="提交至"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="processPriority"
        label="优先级"
        show-overflow-tooltip
        width="80">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="其它"
        show-overflow-tooltip
        width="180">
      </el-table-column>
    </el-table>
    <div class="block text-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="processRequestForm.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        :total="totalProcesss">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'processReview',
  data () {
    return {
      tableData: [],
      totalProcesss: 0,
      agreementId: '',
      processRequestForm: {
        agreementNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      staticOptions: {
        testedItemTaskTableData: [],
        testedItemProducts: [],
        testMethods: [],
        filteredTestMethods: [],
        testParameters: [],
        filteredTestParameters: [],
        testedItems: [],
        drawingDesigns: [],
        filteredDrawingDesigns: [],
        processingStatuses: [],
        processPriorities: [],
        departments: [],
        processTableData: [],
        agreements: []
      }
    }
  },
  methods: {
    addNewProcess () {
      this.$router.push('/lims/processDetailAdd/' + this.processRequestForm.agreementNumber)
    },
    checkAgreement () {
      this.$router.push('/lims/agreementDetailEdit/' + this.fetchAgreementId(this.processRequestForm.agreementNumber))
    },
    fetchAgreementId (agreementNumber) {
      let agreementId = ''
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.agreementNumber === agreementNumber) {
          agreementId = agreement.id
        }
      })
      return agreementId
    },
    processTableStyle ({row, rowIndex}) {
      let backgroundColor = '#FFFFFF'
      let color = '#000000'
      this.staticOptions.processPriorities.forEach(item => {
        if (row.processPriority === item.processPriorityName) {
          backgroundColor = item.processPriorityColor
          color = item.processPriorityFontColor
        }
      })
      return 'background: ' + backgroundColor + ';color: ' + color
    },
    dblclick (row, event) {
      this.$router.push('/lims/processDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.processRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processRequestForm.currentPage = val
      this.onSubmit()
    },
    // load all the processes
    onSubmit (agreementId) {
      let vm = this
      // keep history query conditions
      if (this.$store.state.maintenanceParameters['processRequestForm']) {
        this.processRequestForm = this.$store.state.maintenanceParameters['processRequestForm']
      }
      this.$store.commit('query', { fid: 'processRequestForm', requestForm: this.processRequestForm })
      this.processRequestForm.agreementNumber = agreementId
      this.$ajax
        .post('/api/sample/process/queryProcess', this.processRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcesss = res.data.totalProcesss || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    // loading configurable parameters start
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.staticOptions.agreements = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.staticOptions.testMethods = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.staticOptions.processPriorities = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    // loading configurable parameters end
    // when agreement ID is choosen, all processes within it will be shown,
    // those formatters are for table data
    agreementFormatter (row, column) {
      let name = ''
      this.agreements.forEach(item => {
        if (row.agreementNumber === item.id) {
          name = item.agreementNumber
        }
      })
      return name
    },
    departmentFormatter (row, column) {
      let name = ''
      this.departments.forEach(item => {
        if (row.department === item.id) {
          name = item.departmentName
        }
      })
      return name
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    submitTimeFormatter (row, column) {
      if (row.submitTime) {
        let dateTT = new Date(row.submitTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.staticOptions.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    },
    testMethodFormatter (row, column) {
      let name = ''
      this.staticOptions.testMethods.forEach(item => {
        if (row.testMethod === item.id) {
          name = item.testMethodName
        }
      })
      return name
    },
    testParameterFormatter (row, column) {
      let name = ''
      this.staticOptions.testParameters.forEach(item => {
        if (row.testParameter === item.id) {
          name = item.testParameterName
        }
      })
      return name
    },
    processingStatusFormatter (row, column) {
      let name = ''
      this.processingStatuses.forEach(item => {
        if (row.processingStatus === item.id) {
          name = item.processingStatusName
        }
      })
      return name
    },
    processPriorityFormatter (row, column) {
      let name = ''
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    },
    receiveSampleTimeFormatter (row, column) {
      if (row.receiveSampleTime) {
        let dateTT = new Date(row.receiveSampleTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.onSubmit(this.$route.params.id)
    }
    this.loadTestMethodData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadDepartment()
    this.loadAgreement()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
  }
}
</script>
