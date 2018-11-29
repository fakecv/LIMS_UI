<template>
  <ReportEnrichmentDetail
   :reportEnrichmentForm="reportEnrichmentForm"
   :staticOptions="staticOptions"
   v-on:getCascadeItems="getCascadeItems"
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
      },
      staticOptions: {
        reports: [],
        enrichKeys: [],
        enrichObjects: [],
        enrichValues: [],
        checkedEnrichValues: []
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
    loadReportData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getReportDevelopment')
        .then(function (res) {
          vm.staticOptions.reports = res.data
          vm.staticOptions.enrichObjects = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getCascadeItems (event) {
      let vm = this
      let collectionName = ''
      this.staticOptions.reports.forEach(item => {
        if (item.id === event) {
          collectionName = item.collectionName
        }
      })
      this.$ajax.get('/api/report/reportElement/getFieldNames/' + collectionName)
        .then(function (res) {
          vm.staticOptions.enrichKeys = res.data
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
    this.loadReportData()
    if (this.$route.params.id !== undefined) {
      this.loadReportEnrichment(this.$route.params.id)
    }
  }
}
</script>
