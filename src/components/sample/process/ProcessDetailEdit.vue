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
    loadProcess (processId) {
      let vm = this
      this.$ajax.get('/api/sample/process/' + processId)
        .then(function (res) {
          vm.processForm = res.data
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
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadProcess(this.$route.params.id)
    }
  }
}
</script>
