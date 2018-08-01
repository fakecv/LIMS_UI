<template>
  <ProcessingStatusDetail :processingStatusForm="processingStatusForm"/>
</template>

<script>
import ProcessingStatusDetail from '@/components/sample/processingStatus/ProcessingStatusDetail'
export default {
  name: 'processingStatusDetailEdit',
  components: {ProcessingStatusDetail},
  data () {
    return {
      processingStatusForm: {
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
          vm.$message('Somthing wrong happen in loadProcessingStatus!')
        })
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
