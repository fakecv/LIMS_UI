<template>
  <ProcessPriorityDetail :processPriorityForm="processPriorityForm"
  v-on:updateProcessPriorityForm="updateProcessPriorityForm"
  v-on:deleteProcessPriorityForm="resetProcessPriorityForm"
  v-on:new="resetProcessPriorityForm"
  v-on:copy="resetProcessPriorityId"/>
</template>

<script>
import ProcessPriorityDetail from '@/components/sample/processpriority/ProcessPriorityDetail'
export default {
  name: 'processPriorityDetailNew',
  components: {ProcessPriorityDetail},
  data () {
    return {
      processPriorityForm: {
        id: '',
        processPriorityName: '',
        processPriorityDescription: ''
      },
      processPriorityResetForm: {
        id: '',
        processPriorityName: '',
        processPriorityDescription: ''
      }
    }
  },
  methods: {
    updateProcessPriorityForm (event) {
      this.processPriorityForm.id = event.id
    },
    resetProcessPriorityId () {
      this.processPriorityForm.id = ''
    },
    resetProcessPriorityForm () {
      this.processPriorityForm = JSON.parse(JSON.stringify(this.processPriorityResetForm))
    }
  },
  mounted () {
  }
}
</script>
