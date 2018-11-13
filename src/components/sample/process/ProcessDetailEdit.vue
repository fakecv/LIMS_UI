<template>
  <ProcessDetail
    :processForm="processForm"
    :staticOptions="staticOptions"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getTestMethod="getTestMethod"
      v-on:getExperimentItemsParameter="getExperimentItemsParameter"
      v-on:deleteProcessForm="resetProcessForm"
      v-on:new="resetProcessForm"
      v-on:copy="resetProcessId"
    />
</template>

<script>
import ProcessDetail from '@/components/sample/process/ProcessDetail'
export default {
  name: 'processDetailEdit',
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
    getExperimentItemsParameter (testedItemId) {
      this.staticOptions.filteredExperimentItemsParameters =
        this.staticOptions.experimentItemsParameters.filter(function (val) {
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
    loadExperimentItemsParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentItemsParameter/getExperimentItemsParameter')
        .then(function (res) {
          vm.staticOptions.experimentItemsParameters = res.data
        })
    },
    loadProcess (processId) {
      let vm = this
      this.$ajax.get('/api/sample/process/' + processId)
        .then(function (res) {
          vm.processForm = res.data
          vm.getTestMethod(vm.processForm.testedItem)
          vm.getExperimentItemsParameter(vm.processForm.testedItem)
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
    this.loadExperimentItemsParameterData()
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
