<template>
  <ProcessingStatusDetail
   :processingStatusForm="processingStatusForm"
   v-on:deleteProcessingStatusForm="resetProcessingStatusForm"
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
        sort: '',
        processingStatusDescription: ''
      },
      processingStatusResetForm: {
        id: '',
        processingStatusName: '',
        sort: '',
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
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadProcessingStatus(this.$route.params.id)
    }
  }
}
</script>
