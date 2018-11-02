<template>
  <ReportDevelopmentDetail
   :reportDevelopmentForm="reportDevelopmentForm"
   v-on:deleteReportDevelopment="resetReportDevelopmentForm"
   v-on:new="resetReportDevelopmentForm"
   v-on:copy="resetReportDevelopmentId"/>
</template>

<script>
import ReportDevelopmentDetail from '@/components/report/reportdevelopment/ReportDevelopmentDetail'
export default {
  name: 'reportDevelopmentDetailEdit',
  components: {ReportDevelopmentDetail},
  data () {
    return {
      reportDevelopmentForm: {
        reportName: '',
        pageSize: '',
        rotate: '',
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
    loadReportDevelopment (reportDevelopmentId) {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/' + reportDevelopmentId)
        .then(function (res) {
          vm.reportDevelopmentForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetReportDevelopmentForm () {
      this.reportDevelopmentForm = JSON.parse(JSON.stringify(this.reportDevelopmentResetForm))
    },
    resetReportDevelopmentId () {
      this.reportDevelopmentForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadReportDevelopment(this.$route.params.id)
    }
  }
}
</script>
