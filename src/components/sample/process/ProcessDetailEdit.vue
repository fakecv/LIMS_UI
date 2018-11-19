<template>
  <ProcessDetail
    :processForm="processForm"
      :agreementForm="agreementForm"
    :staticOptions="staticOptions"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getTestMethod="getTestMethod"
      v-on:getTestParameter="getTestParameter"
      v-on:deleteProcessForm="resetProcessForm"
      v-on:new="resetProcessForm"
      v-on:copy="resetProcessId"
      v-on:updateTestedItemTasks="updateTestedItemTasks"
    />
</template>

<script>
import ProcessDetail from '@/components/sample/process/ProcessDetail'
export default {
  name: 'processDetailEdit',
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
        processPriority: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
      },
      processResetForm: {
        id: '',
        agreementNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
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
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.id === agreementId) {
          vm.agreementForm.sampleName = agreement.sampleName
          vm.agreementForm.materialNumber = agreement.materialNumber
          vm.agreementForm.receiveSampleTime = agreement.receiveSampleTime
          vm.agreementForm.expectedCompletionTime = agreement.expectedCompletionTime
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
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    getTestMethod (testedItemId) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
    },
    resetProcessId () {
      this.processForm.id = ''
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
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.staticOptions.testParameters = res.data
        })
    },
    loadProcess (processId) {
      let vm = this
      this.$ajax.get('/api/sample/process/' + processId)
        .then(function (res) {
          vm.processForm = res.data
          vm.staticOptions.testedItemTaskTableData = vm.processForm.testedItemTasks
          vm.getAgreementInfo(vm.processForm.agreementNumber)
          vm.getTestMethod(vm.processForm.testedItem)
          vm.getTestParameter(vm.processForm.testedItem)
          vm.getDrawingDesigns(vm.processForm.testedItem)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
    if (this.$route.params.id !== undefined) {
      this.loadProcess(this.$route.params.id)
    }
  }
}
</script>
