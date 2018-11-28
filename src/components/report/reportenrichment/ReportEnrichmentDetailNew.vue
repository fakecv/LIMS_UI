<template>
  <ReportEnrichmentDetail
   :reportEnrichmentForm="reportEnrichmentForm"
   :staticOptions="staticOptions"
   v-on:updateReportEnrichmentForm="updateReportEnrichmentForm"
   v-on:deleteReportEnrichmentForm="resetReportEnrichmentForm"
   v-on:new="resetReportEnrichmentForm"
   v-on:copy="resetReportEnrichmentId"
  />
</template>

<script>
import ReportEnrichmentDetail from '@/components/report/reportenrichment/ReportEnrichmentDetail'
export default {
  name: 'reportEnrichmentDetailNew',
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
    updateReportEnrichmentForm (event) {
      this.reportEnrichmentForm.id = event.id
    },
    resetReportEnrichmentId () {
      this.reportEnrichmentForm.id = ''
    },
    resetReportEnrichmentForm () {
      this.reportEnrichmentForm = JSON.parse(JSON.stringify(this.reportEnrichmentResetForm))
    }
  },
  mounted () {
  }
}
</script>
