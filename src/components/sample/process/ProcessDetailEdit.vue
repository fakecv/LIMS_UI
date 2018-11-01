<template>
  <ProcessDetail
    :processForm="processForm"
    :staticOptions="staticOptions"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getExperimentalMethod="getExperimentalMethod"
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
        experimentalItem: '',
        experimentItemsParameter: '',
        experimentalMethod: '',
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
        experimentalItem: '',
        experimentItemsParameter: '',
        experimentalMethod: '',
        drawingDesign: '',
        comment: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: '',
        processingStatues: [],
        processPriority: ''
      },
      staticOptions: {
        experimentalMethods: [],
        filteredExperimentalMethods: [],
        experimentItemsParameters: [],
        filteredExperimentItemsParameters: [],
        experimentalItems: [],
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
    getDrawingDesigns (experimentalItemId) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentItemsParameter (experimentalItemId) {
      this.staticOptions.filteredExperimentItemsParameters =
        this.staticOptions.experimentItemsParameters.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalMethod (experimentalItemId) {
      this.staticOptions.filteredExperimentalMethods =
        this.staticOptions.experimentalMethods.filter(function (val) {
          return val.experimentalItem === experimentalItemId
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
    loadExperimentalItemData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItem/getExperimentalItem')
        .then(function (res) {
          vm.staticOptions.experimentalItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.staticOptions.experimentalMethods = res.data
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
          vm.getExperimentalMethod(vm.processForm.experimentalItem)
          vm.getExperimentItemsParameter(vm.processForm.experimentalItem)
          vm.getDrawingDesigns(vm.processForm.experimentalItem)
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
    this.loadExperimentalMethodData()
    this.loadExperimentItemsParameterData()
    this.loadExperimentalItemData()
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
