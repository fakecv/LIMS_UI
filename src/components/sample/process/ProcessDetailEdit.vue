<template>
  <ProcessDetail
    :processForm="processForm"
    :staticOptions="staticOptions"
    v-on:deleteProcess="resetProcessForm"
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
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
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
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.staticOptions.agreements = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcess (processId) {
      let vm = this
      this.$ajax.get('/api/sample/process/' + processId)
        .then(function (res) {
          vm.processForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
    },
    resetProcessId () {
      this.processForm.id = ''
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadDepartment()
    this.loadAgreement()
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadProcess(this.$route.params.id)
    }
  }
}
</script>
