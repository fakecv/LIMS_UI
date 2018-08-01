<template>
  <ProcessingDetail :processingForm="processingForm"/>
</template>

<script>
import ProcessingDetail from '@/components/sample/processing/ProcessingDetail'
export default {
  name: 'processingDetailNew',
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
  },
  mounted () {
  }
}
</script>
