<template>
<div>
    <ProcessDetail
      :processForm="processForm"
      :agreementForm="agreementForm"
      :staticOptions="staticOptions"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getTestMethod="getTestMethod"
      v-on:getTestParameter="getTestParameter"
      v-on:updateProcessForm="updateProcessForm"
      v-on:updateTestedItemTasks="updateTestedItemTasks"
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
          prop="processPriority"
          label="优先级"
          :formatter="processPriorityFormatter"
          width="80">
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
      agreementForm: {
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: '',
        sampleClientNumber: ''
      },
      processForm: {
        id: '',
        agreementNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: ''
      },
      processResetForm: {
        id: '',
        agreementNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: ''
      },
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
    dblclick (row, event) {
      this.$router.push('/lims/processDetailEdit/' + row.id)
    },
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.id === agreementId) {
          vm.agreementForm.sampleName = agreement.sampleName
          vm.agreementForm.materialNumber = agreement.materialNumber
          vm.agreementForm.receiveSampleTime = agreement.receiveSampleTime
          vm.agreementForm.expectedCompletionTime = agreement.expectedCompletionTime
          vm.processForm.comment = agreement.comment
          vm.processForm.processPriority = agreement.processPriority
        }
      })
      // to display other added processes within the same agreementId at the bottom of page.
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
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    resetProcessId () {
      this.processForm.id = ''
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
      this.staticOptions.testedItemTaskTableData = []
    },
    updateProcessForm (event) {
      this.processForm.id = event.id
    },
    updateTestedItemTasks () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProductGroup => {
        vm.$ajax.post('/api/sample/testedItemProductGroup/getTestedItemTasks', testItemProductGroup)
          .then(function (res) {
            vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      })
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
    loadTestParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.staticOptions.testParameters = res.data
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
    processPriorityFormatter (row, column) {
      let name = ''
      this.staticOptions.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    }
  },
  mounted () {
    this.loadTestMethodData()
    this.loadTestParameterData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
    this.loadDepartment()
    this.loadAgreement()
  }
}
</script>
