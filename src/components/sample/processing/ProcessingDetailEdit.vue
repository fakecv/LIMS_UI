<template>
  <ProcessingDetail
   :processingForm="processingForm"
   v-on:deleteProcessing="resetProcessingForm"
   v-on:new="resetProcessingForm"
   v-on:copy="resetProcessingId"/>
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
    loadProcessing (processingId) {
      let vm = this
      this.$ajax.get('/api/sample/processing/' + processingId)
        .then(function (res) {
          vm.processingForm = res.data
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
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadProcessing(this.$route.params.id)
    }
  }
}
</script>
