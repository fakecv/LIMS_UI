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
        processPriorityColor: '#FFFFFF',
        sort: '',
        processPriorityFontColor: '#000000',
        processPriorityDescription: ''
      },
      processPriorityResetForm: {
        id: '',
        processPriorityName: '',
        sort: '',
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    resetProcessPriorityForm () {
      this.processPriorityForm = JSON.parse(JSON.stringify(this.processPriorityResetForm))
    },
    resetProcessPriorityId () {
      this.processPriorityForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadProcessPriority(this.$route.params.id)
    }
  }
}
</script>
