<template>
  <InternalAuditorDetail
   :internalAuditorForm="internalAuditorForm"
   v-on:deleteInternalAuditor="resetInternalAuditorForm"
   v-on:new="resetInternalAuditorForm"
   v-on:copy="resetInternalAuditorId"/>
</template>

<script>
import InternalAuditorDetail from '@/components/internalaudit/internalAuditor/InternalAuditorDetail'
export default {
  name: 'internalAuditorDetailEdit',
  components: {InternalAuditorDetail},
  data () {
    return {
      internalAuditorForm: {
        id: '',
        internalAuditorName: '',
        internalAuditorDescription: ''
      },
      internalAuditorResetForm: {
        id: '',
        internalAuditorName: '',
        internalAuditorDescription: ''
      }
    }
  },
  methods: {
    loadInternalAuditor (internalAuditorId) {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/internalAuditor/' + internalAuditorId)
        .then(function (res) {
          vm.internalAuditorForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetInternalAuditorForm () {
      this.internalAuditorForm = JSON.parse(JSON.stringify(this.internalAuditorResetForm))
    },
    resetInternalAuditorId () {
      this.internalAuditorForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadInternalAuditor(this.$route.params.id)
    }
  }
}
</script>
