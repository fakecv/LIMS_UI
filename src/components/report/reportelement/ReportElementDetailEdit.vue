<template>
  <ReportElementDetail
   :reportElementForm="reportElementForm"
   v-on:deleteReportElement="resetReportElementForm"
   v-on:new="resetReportElementForm"
   v-on:copy="resetReportElementId"/>
</template>

<script>
import ReportElementDetail from '@/components/report/reportelement/ReportElementDetail'
export default {
  name: 'reportElementDetailEdit',
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
    loadReportElement (reportElementId) {
      let vm = this
      this.$ajax.get('/api/report/reportElement/' + reportElementId)
        .then(function (res) {
          vm.reportElementForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetReportElementForm () {
      this.reportElementForm = JSON.parse(JSON.stringify(this.reportElementResetForm))
    },
    resetReportElementId () {
      this.reportElementForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadReportElement(this.$route.params.id)
    }
  }
}
</script>
