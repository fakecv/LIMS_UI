<template>
  <ProcessDetail
    :processForm="processForm"
    :staticOptions="staticOptions"
    v-on:getAgreementInfo="getAgreementInfo"
    v-on:updateProcessForm="updateProcessForm"
    v-on:deleteProcessForm="resetProcessForm"
    v-on:new="resetProcessForm"
    v-on:copy="resetProcessId"
    />
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
        experimentalItem: '',
        experimentalMethod: '',
        drawingDesign: '',
        comment: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: ''
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
        experimentalMethod: '',
        drawingDesign: '',
        comment: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: ''
      },
      staticOptions: {
        experimentalMethods: [],
        drawingDesigns: [],
        processingStatuses: [],
        departments: [],
        agreements: []
      }
    }
  },
  methods: {
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.staticOptions.experimentalMethods = res.data
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.staticOptions.agreements = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    updateProcessForm (event) {
      this.processForm.id = event.id
    },
    resetProcessId () {
      this.processForm.id = ''
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
    },
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.id === agreementId) {
          vm.processForm.sampleName = agreement.sampleName
          vm.processForm.materialNumber = agreement.materialNumber
          vm.processForm.receiveSampleTime = agreement.receiveSampleTime
          vm.processForm.expectedCompletionTime = agreement.expectedCompletionTime
        }
      })
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadDepartment()
    this.loadAgreement()
  }
}
</script>
