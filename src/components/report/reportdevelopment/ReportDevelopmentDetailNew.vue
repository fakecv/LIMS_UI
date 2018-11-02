<template>
  <ReportDevelopmentDetail :reportDevelopmentForm="reportDevelopmentForm"
  v-on:updateReportDevelopmentForm="updateReportDevelopmentForm"
  v-on:deleteReportDevelopmentForm="resetReportDevelopmentForm"
  v-on:new="resetReportDevelopmentForm"
  v-on:copy="resetReportDevelopmentId"/>
</template>

<script>
import ReportDevelopmentDetail from '@/components/report/reportdevelopment/ReportDevelopmentDetail'
export default {
  name: 'reportDevelopmentDetailNew',
  components: {ReportDevelopmentDetail},
  data () {
    return {
      reportDevelopmentForm: {
        reportName: '',
        pageSize: 'A4',
        rotate: 'false',
        id: ''
      },
      reportDevelopmentResetForm: {
        reportName: '',
        pageSize: 'A4',
        rotate: 'false',
        id: ''
      }
    }
  },
  methods: {
    updateReportDevelopmentForm (event) {
      this.reportDevelopmentForm.id = event.id
    },
    resetReportDevelopmentId () {
      this.reportDevelopmentForm.id = ''
    },
    resetReportDevelopmentForm () {
      this.reportDevelopmentForm = JSON.parse(JSON.stringify(this.reportDevelopmentResetForm))
    }
  },
  mounted () {
  }
}
</script>
