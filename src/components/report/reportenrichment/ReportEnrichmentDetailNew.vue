<template>
  <ReportEnrichmentDetail
   :reportEnrichmentForm="reportEnrichmentForm"
   :staticOptions="staticOptions"
   v-on:getCascadeItems="getCascadeItems"
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
        group: 'no',
        id: ''
      },
      reportEnrichmentResetForm: {
        reportName: '',
        enrichKey: '',
        enrichObject: '',
        enrichValues: '',
        group: 'no',
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
    loadReportData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getReportDevelopment')
        .then(function (res) {
          vm.staticOptions.reports = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.detail
          })
        })
    },
    loadCollectionData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getCollectionNames')
        .then(function (res) {
          vm.staticOptions.enrichObjects = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.detail
          })
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
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.detail
          })
        })
    },
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
  activated () {
    this.loadReportData()
    this.loadCollectionData()
  }
}
</script>
