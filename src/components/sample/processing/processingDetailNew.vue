<template>
  <ProcessingDetail :processingForm="processingForm"
  v-on:updateProcessingForm="updateProcessingForm"
  v-on:deleteProcessingForm="resetProcessingForm"
  v-on:new="resetProcessingForm"
  v-on:copy="resetProcessingId"/>
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
        processingName: '',
        processingDescription: ''
      },
      processingResetForm: {
        id: '',
        processingName: '',
        processingDescription: ''
      }
    }
  },
  methods: {
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
  }
}
</script>
