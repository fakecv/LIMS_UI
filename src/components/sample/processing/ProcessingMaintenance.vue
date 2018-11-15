<template>
  <div>
    <el-container style="padding: 10px">
    <el-form :model="processRequestForm" label-width="100px" label-position="left" size="mini">
      <el-row :gutter="20">
        <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
          <el-form-item label="委托编号">
            <el-select name="agreementNumber" filterable clearable default-first-option v-model="processRequestForm.agreementNumber">
              <el-option v-for="item in agreements"
                :key="item.Id"
                :label="item.agreementNumber"
                :value="item.id">
              </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
          <el-form-item label="样品编号">
            <el-input name="sampleNumber" v-model="processRequestForm.sampleNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
          <el-form-item label="试样编号">
            <el-input name="sampleSubNumber" v-model="processRequestForm.sampleSubNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
          <el-form-item label="优先级">
            <el-select name="processPriority" filterable clearable default-first-option v-model="processRequestForm.processPriority">
              <el-option v-for="item in processPriorities"
                :key="item.Id"
                :label="item.processPriorityName"
                :value="item.id">
              </el-option>
              </el-select>
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
    <el-table :data="tableData"
      style="width: 100%"
      @row-dblclick=dblclick
      :row-style="processTableStyle"
      >
      <el-table-column
        fixed
        prop="agreementNumber"
        label="委托编号"
        :formatter="agreementFormatter"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sampleNumber"
        fixed
        label="样品编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sampleSubNumber"
        fixed
        label="试样编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="processPriority"
        label="优先级"
        :formatter="processPriorityFormatter"
        width="80">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="其它"
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
  name: 'processingMaintenance',
  data () {
    return {
      tableData: [],
      totalProcesss: 0,
      processRequestForm: {
        agreementNumber: '',
        materialNumber: '',
        sampleSubNumber: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testMethods: [],
      testedItems: [],
      drawingDesigns: [],
      agreements: [],
      processingStatuses: [],
      processPriorities: [],
      departments: [],
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    processTableStyle ({row, rowIndex}) {
      let backgroundColor = '#FFFFFF'
      let color = '#000000'
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          backgroundColor = item.processPriorityColor
          color = item.processPriorityFontColor
        }
      })
      return 'background: ' + backgroundColor + ';color: ' + color
    },
    dblclick (row, event) {
      this.$router.push('/lims/processingDetailEdit/' + row.id)
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
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/processing/queryProcessing', this.processRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcesss = res.data.totalProcesss || 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    // loading configurable parameters start
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.agreements = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.departments = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.testMethods = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.testedItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.processPriorities = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
    testedItemFormatter (row, column) {
      let name = ''
      this.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    },
    testMethodFormatter (row, column) {
      let name = ''
      this.testMethods.forEach(item => {
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
  mounted () {
    this.onSubmit()
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
