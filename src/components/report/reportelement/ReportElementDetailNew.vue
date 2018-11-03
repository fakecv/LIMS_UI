<template>
  <ReportElementDetail :reportElementForm="reportElementForm"
  v-on:updateReportElementForm="updateReportElementForm"
  v-on:deleteReportElementForm="resetReportElementForm"
  v-on:new="resetReportElementForm"
  v-on:copy="resetReportElementId"/>
</template>

<script>
import ReportElementDetail from '@/components/report/reportelement/ReportElementDetail'
export default {
  name: 'reportElementDetailNew',
  components: {ReportElementDetail},
  data () {
    return {
      reportElementForm: {
        reportName: '',
        reportElementName: '',
        border: '',
        property: '',
        fontSize: '',
        textAlign: '',
        group: '',
        groupClass: '',
        row: '',
        column: '',
        value: '',
        type: '',
        id: ''
      },
      reportElementResetForm: {
        reportName: '',
        reportElementName: '',
        border: '',
        property: '',
        fontSize: '',
        textAlign: '',
        group: '',
        groupClass: '',
        row: '',
        column: '',
        value: '',
        type: '',
        id: ''
      }
    }
  },
  methods: {
    updateReportElementForm (event) {
      this.reportElementForm.id = event.id
    },
    resetReportElementId () {
      this.reportElementForm.id = ''
    },
    resetReportElementForm () {
      this.reportElementForm = JSON.parse(JSON.stringify(this.reportElementResetForm))
    }
  },
  mounted () {
  }
}
</script>
