<template>
  <ProcessingStatusDetail :processingStatusForm="processingStatusForm"/>
</template>

<script>
import ProcessingStatusDetail from '@/components/sample/processingStatus/ProcessingStatusDetail'
export default {
  name: 'processingStatusDetailNew',
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
  },
  mounted () {
  }
}
</script>
