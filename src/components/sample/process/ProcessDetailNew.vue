<template>
<div>
    <ProcessDetail
      :processForm="processForm"
      :staticOptions="staticOptions"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getTestMethod="getTestMethod"
      v-on:getExperimentItemsParameter="getExperimentItemsParameter"
      v-on:updateProcessForm="updateProcessForm"
      v-on:deleteProcessForm="resetProcessForm"
      v-on:new="resetProcessForm"
      v-on:copy="resetProcessId"
      />
      <el-table :data="staticOptions.processTableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="sampleNumber"
          label="样品编号"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="sampleSubNumber"
          label="试样编号"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          prop="testedItem"
          label="检测项目"
          :formatter="testedItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethod"
          label="检测方法"
          :formatter="testMethodFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="drawingDesign"
          label="加工图号"
          :formatter="drawingDesignFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatus"
          label="当前流转状态"
          :formatter="processingStatusFormatter"
          width="150">
        </el-table-column>
        <el-table-column
          prop="processPriority"
          label="优先级"
          :formatter="processPriorityFormatter"
          width="80">
        </el-table-column>
        <el-table-column
          prop="receiveSampleTime"
          label="接收样品时间"
          :formatter="receiveSampleTimeFormatter"
          width="150">
        </el-table-column>
        <el-table-column
          prop="expectedCompletionTime"
          label="要求完成时间"
          :formatter="expectedCompletionTimeFormatter"
          width="150">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import ProcessDetail from '@/components/sample/process/ProcessDetail'
export default {
  name: 'processDetailNew',
  components: {ProcessDetail},
  data () {
    return {
      processForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        testedItem: '',
        experimentItemsParameter: '',
        testMethod: '',
        drawingDesign: '',
        comment: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: '',
        processingStatues: [],
        processPriority: ''
      },
      processResetForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        testedItem: '',
        experimentItemsParameter: '',
        testMethod: '',
        drawingDesign: '',
        comment: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: '',
        processingStatues: [],
        processPriority: ''
      },
      staticOptions: {
        testMethods: [],
        filteredTestMethods: [],
        experimentItemsParameters: [],
        filteredExperimentItemsParameters: [],
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
    dblclick (row, event) {
      this.$router.push('/lims/processDetailEdit/' + row.id)
    },
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.id === agreementId) {
          vm.processForm.sampleName = agreement.sampleName
          vm.processForm.materialNumber = agreement.materialNumber
          vm.processForm.receiveSampleTime = agreement.receiveSampleTime
          vm.processForm.expectedCompletionTime = agreement.expectedCompletionTime
          vm.processForm.comment = agreement.comment
          vm.processForm.processPriority = agreement.processPriority
        }
      })
      this.loadAgreementProcess(agreementId)
    },
    getDrawingDesigns (testedItemId) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    getTestMethod (testedItemId) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    getExperimentItemsParameter (testedItemId) {
      this.staticOptions.filteredExperimentItemsParameters =
        this.staticOptions.experimentItemsParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    resetProcessId () {
      this.processForm.id = ''
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
    },
    updateProcessForm (event) {
      this.processForm.id = event.id
    },
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.staticOptions.agreements = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadAgreementProcess (agreementId) {
      let vm = this
      this.$ajax.get('/api/sample/process/agreement/' + agreementId)
        .then(function (res) {
          vm.staticOptions.processTableData = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        })
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.staticOptions.testMethods = res.data
        })
    },
    loadExperimentItemsParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentItemsParameter/getExperimentItemsParameter')
        .then(function (res) {
          vm.staticOptions.experimentItemsParameters = res.data
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.staticOptions.processPriorities = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.staticOptions.drawingDesigns.forEach(item => {
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
    processPriorityFormatter (row, column) {
      let name = ''
      this.staticOptions.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    },
    processingStatusFormatter (row, column) {
      let name = ''
      this.staticOptions.processingStatuses.forEach(item => {
        if (row.processingStatus === item.id) {
          name = item.processingStatusName
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
    this.loadTestMethodData()
    this.loadExperimentItemsParameterData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
    this.loadDepartment()
    this.loadAgreement()
  }
}
</script>
