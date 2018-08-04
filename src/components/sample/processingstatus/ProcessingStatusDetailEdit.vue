<template>
  <ProcessingStatusDetail
   :processingStatusForm="processingStatusForm"
   v-on:deleteProcessingStatus="resetProcessingStatusForm"
   v-on:new="resetProcessingStatusForm"
   v-on:copy="resetProcessingStatusId"/>
</template>

<script>
import ProcessingStatusDetail from '@/components/sample/processingStatus/ProcessingStatusDetail'
export default {
  name: 'processingStatusDetailEdit',
  components: {ProcessingStatusDetail},
  data () {
    return {
      processingStatusForm: {
        id: '',
        processingStatusName: '',
        processingStatusDescription: ''
      },
      processingStatusResetForm: {
        id: '',
        processingStatusName: '',
        processingStatusDescription: ''
      }
    }
  },
  methods: {
    loadProcessingStatus (processingStatusId) {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/' + processingStatusId)
        .then(function (res) {
          vm.processingStatusForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetProcessingStatusForm () {
      this.processingStatusForm = JSON.parse(JSON.stringify(this.processingStatusResetForm))
    },
    resetProcessingStatusId () {
      this.processingStatusForm.id = ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadProcessingStatus(this.$route.params.id)
    }
  }
}
</script>
