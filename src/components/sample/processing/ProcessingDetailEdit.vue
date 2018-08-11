<template>
  <ProcessingDetail
    :processingForm="processingForm"
    :staticOptions="staticOptions"
    v-on:deleteProcessing="resetProcessingForm"
    v-on:new="resetProcessingForm"
    v-on:copy="resetProcessingId"
    />
</template>

<script>
import ProcessingDetail from '@/components/sample/processing/ProcessingDetail'
export default {
  name: 'processingDetailEdit',
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
        drawingDesigns: [],
        processingStatuses: [],
        departments: []
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
    loadProcessing (processingId) {
      let vm = this
      this.$ajax.get('/api/sample/processing/' + processingId)
        .then(function (res) {
          vm.processingForm = res.data
          if (res.data.customerId !== '') {
            vm.loadCustomer(res.data.customerId)
          }
          if (res.data.receiverId !== '') {
            vm.loadReceiver(res.data.receiverId)
          }
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetProcessingForm () {
      this.processingForm = JSON.parse(JSON.stringify(this.processingResetForm))
    },
    resetProcessingId () {
      this.processingForm.id = ''
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadDepartment()
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadProcessing(this.$route.params.id)
    }
  }
}
</script>
