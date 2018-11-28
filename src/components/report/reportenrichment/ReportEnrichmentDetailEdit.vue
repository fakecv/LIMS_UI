<template>
  <ReportEnrichmentDetail
   :reportEnrichmentForm="reportEnrichmentForm"
   :staticOptions="staticOptions"
   v-on:deleteReportEnrichmentForm="resetReportEnrichmentForm"
   v-on:new="resetReportEnrichmentForm"
   v-on:copy="resetReportEnrichmentId"
  />
</template>

<script>
import ReportEnrichmentDetail from '@/components/report/reportenrichment/ReportEnrichmentDetail'
export default {
  name: 'reportEnrichmentDetailEdit',
  components: {ReportEnrichmentDetail},
  data () {
    return {
      reportEnrichmentForm: {
        reportName: '',
        enrichKey: '',
        enrichObject: '',
        enrichValues: '',
        id: ''
      },
      reportEnrichmentResetForm: {
        reportName: '',
        enrichKey: '',
        enrichObject: '',
        enrichValues: '',
        id: ''
      }
    }
  },
  methods: {
    loadReportEnrichment (reportEnrichmentId) {
      let vm = this
      this.$ajax.get('/api/report/reportEnrichment/' + reportEnrichmentId)
        .then(function (res) {
          vm.reportEnrichmentForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetReportEnrichmentForm () {
      this.reportEnrichmentForm = JSON.parse(JSON.stringify(this.reportEnrichmentResetForm))
    },
    resetReportEnrichmentId () {
      this.reportEnrichmentForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadReportEnrichment(this.$route.params.id)
    }
  }
}
</script>
