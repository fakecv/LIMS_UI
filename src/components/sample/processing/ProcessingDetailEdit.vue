<template>
  <ProcessingDetail :processingForm="processingForm"/>
</template>

<script>
import ProcessingDetail from '@/components/sample/processing/ProcessingDetail'
export default {
  name: 'processingDetailEdit',
  components: {ProcessingDetail},
  data () {
    return {
      processingForm: {
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
          vm.$message('Somthing wrong happen in loadProcessing!')
        })
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
