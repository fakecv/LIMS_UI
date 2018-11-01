<template>
  <ProcessingDetail
    :processingForm="processingForm"
    :staticOptions="staticOptions"
    v-on:getAgreementInfo="getAgreementInfo"
    v-on:updateProcessingForm="updateProcessingForm"
    v-on:deleteProcessingForm="resetProcessingForm"
    v-on:new="resetProcessingForm"
    v-on:copy="resetProcessingId"
    />
</template>

<script>
import ProcessingDetail from '@/components/sample/processing/ProcessingDetail'
export default {
  name: 'processingDetailNew',
  components: {ProcessingDetail},
  data () {
    return {
      processingForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        sampleSubNumber: '',
        experimentalItem: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: ''
      },
      processingResetForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        sampleSubNumber: '',
        experimentalItem: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: ''
      },
      staticOptions: {
        experimentalMethods: [],
        experimentalItems: [],
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
    loadExperimentalItemData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItem/getExperimentalItem')
        .then(function (res) {
          vm.staticOptions.experimentalItems = res.data
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
    updateProcessingForm (event) {
      this.processingForm.id = event.id
    },
    resetProcessingId () {
      this.processingForm.id = ''
    },
    resetProcessingForm () {
      this.processingForm = JSON.parse(JSON.stringify(this.processingResetForm))
    },
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.id === agreementId) {
          vm.processingForm.sampleName = agreement.sampleName
        }
      })
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadExperimentalItemData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadDepartment()
    this.loadAgreement()
  }
}
</script>
