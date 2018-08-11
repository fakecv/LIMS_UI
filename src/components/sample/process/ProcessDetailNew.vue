<template>
  <ProcessDetail
    :processForm="processForm"
    :customerForm="customerForm"
    :userForm="userForm"
    :staticOptions="staticOptions"
    v-on:updateCustomer="updateCustomer"
    v-on:reloadCustomerData="reloadCustomerData"
    v-on:updateUser="updateUser"
    v-on:reloadUserData="reloadUserData"
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
        sampleSubNumber: '',
        experimentalItem: '',
        experimentalMethod: '',
        drawingDesign: '',
        comments: '',
        processingStatus: ''
      },
      processResetForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: '',
        sampleSubNumber: '',
        experimentalItem: '',
        experimentalMethod: '',
        drawingDesign: '',
        comments: '',
        processingStatus: ''
      },
      staticOptions: {
        experimentalMethods: [],
        drawingDesigns: []
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
    updateProcessForm (event) {
      this.processForm.id = event.id
    },
    resetProcessId () {
      this.processForm.id = ''
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
  }
}
</script>
