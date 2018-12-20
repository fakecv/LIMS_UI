<template>
  <ProcessingStatusDetail :processingStatusForm="processingStatusForm"
  v-on:updateProcessingStatusForm="updateProcessingStatusForm"
  v-on:deleteProcessingStatusForm="resetProcessingStatusForm"
  v-on:new="resetProcessingStatusForm"
  v-on:copy="resetProcessingStatusId"/>
</template>

<script>
import ProcessingStatusDetail from '@/components/sample/processingStatus/ProcessingStatusDetail'
export default {
  name: 'processingStatusDetailNew',
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
    updateProcessingStatusForm (event) {
      this.processingStatusForm.id = event.id
    },
    resetProcessingStatusId () {
      this.processingStatusForm.id = ''
    },
    resetProcessingStatusForm () {
      this.processingStatusForm = JSON.parse(JSON.stringify(this.processingStatusResetForm))
    }
  },
  mounted () {
  }
}
</script>
