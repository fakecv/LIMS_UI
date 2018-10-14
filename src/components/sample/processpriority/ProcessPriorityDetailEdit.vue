<template>
  <ProcessPriorityDetail
   :processPriorityForm="processPriorityForm"
   v-on:deleteProcessPriority="resetProcessPriorityForm"
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
    loadProcessPriority (processPriorityId) {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/' + processPriorityId)
        .then(function (res) {
          vm.processPriorityForm = res.data
        }).catch(function (error) {
          console.log(error.message)
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
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadProcessPriority(this.$route.params.id)
    }
  }
}
</script>
