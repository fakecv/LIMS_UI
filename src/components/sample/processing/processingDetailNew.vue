<template>
  <ProcessingDetail
    :processingForm="processingForm"
    :customerForm="customerForm"
    :userForm="userForm"
    :staticOptions="staticOptions"
    v-on:updateCustomer="updateCustomer"
    v-on:reloadCustomerData="reloadCustomerData"
    v-on:updateUser="updateUser"
    v-on:reloadUserData="reloadUserData"
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
    updateProcessingForm (event) {
      this.processingForm.id = event.id
    },
    resetProcessingId () {
      this.processingForm.id = ''
    },
    resetProcessingForm () {
      this.processingForm = JSON.parse(JSON.stringify(this.processingResetForm))
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadDepartment()
  }
}
</script>
