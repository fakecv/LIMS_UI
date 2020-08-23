<template>
  <ReportDevelopmentDetail
   :reportDevelopmentForm="reportDevelopmentForm"
   :staticOptions="staticOptions"
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
        collectionName: '',
        rotate: '',
        id: ''
      },
      reportDevelopmentResetForm: {
        reportName: '',
        pageSize: 'A4',
        collectionName: '',
        rotate: 'false',
        id: ''
      },
      staticOptions: {
        collectionNames: []
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadCollectionData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getCollectionNames')
        .then(function (res) {
          vm.staticOptions.collectionNames = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    resetReportDevelopmentForm () {
      this.reportDevelopmentForm = JSON.parse(JSON.stringify(this.reportDevelopmentResetForm))
    },
    resetReportDevelopmentId () {
      this.reportDevelopmentForm.id = ''
    }
  },
  activated () {
    this.loadCollectionData()
    if (this.$route.params.id !== undefined) {
      this.loadReportDevelopment(this.$route.params.id)
    }
  }
}
</script>
