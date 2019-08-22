<template>
  <ReportDevelopmentDetail :reportDevelopmentForm="reportDevelopmentForm"
   :staticOptions="staticOptions"
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
        collectionName: '',
        rotate: 'false',
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
    loadCollectionData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getCollectionNames')
        .then(function (res) {
          vm.staticOptions.collectionNames = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
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
  activated () {
    this.loadCollectionData()
  }
}
</script>
