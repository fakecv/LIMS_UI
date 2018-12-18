<template>
  <ProcessPriorityDetail
   :processPriorityForm="processPriorityForm"
   v-on:deleteProcessPriorityForm="resetProcessPriorityForm"
   v-on:new="resetProcessPriorityForm"
   v-on:copy="resetProcessPriorityId"/>
</template>

<script>
import ProcessPriorityDetail from '@/components/sample/processpriority/ProcessPriorityDetail'
export default {
  name: 'processPriorityDetailEdit',
  components: {ProcessPriorityDetail},
  data () {
    return {
      processPriorityForm: {
        id: '',
        processPriorityName: '',
        processPriorityColor: '',
        processPriorityFontColor: '',
        processPriorityDescription: ''
      },
      processPriorityResetForm: {
        id: '',
        processPriorityName: '',
        processPriorityColor: '#FFFFFF',
        processPriorityFontColor: '#000000',
        processPriorityDescription: ''
      }
    }
  },
  methods: {
    loadProcessPriority (processPriorityId) {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/' + processPriorityId)
        .then(function (res) {
          vm.processPriorityForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetProcessPriorityForm () {
      this.processPriorityForm = JSON.parse(JSON.stringify(this.processPriorityResetForm))
    },
    resetProcessPriorityId () {
      this.processPriorityForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadProcessPriority(this.$route.params.id)
    }
  }
}
</script>
