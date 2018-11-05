<template>
  <ReportElementDetail
   :reportElementForm="reportElementForm"
   :staticOptions="staticOptions"
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
      },
      staticOptions: {
        values: [
          {id: 1, value: 'property1'},
          {id: 2, value: 'property2'}
        ],
        types: [
          {id: 1, type: '字符串'},
          {id: 2, type: '数组'}
        ],
        textAligns: [
          {id: 1, textAlign: '靠左'},
          {id: 2, textAlign: '居中'},
          {id: 3, textAlign: '靠右'}
        ],
        reportNames: [
          {id: 1, reportName: '报表1'},
          {id: 2, reportName: '报表2'}
        ],
        fontSizes: [
          {id: 1, fontSize: '大号'},
          {id: 2, fontSize: '中号'},
          {id: 3, fontSize: '小号'},
          {}
        ],
        borders: [
          {id: 1, border: '普通'},
          {id: 2, border: '无边框'},
          {id: 3, border: '下边框'},
          {id: 4, border: '上边框'}
        ],
        propertys: [
          {id: 1, property: '表头'},
          {id: 2, property: '文本'}
        ]
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
