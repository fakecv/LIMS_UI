<template>
  <ReportElementDetail
   :reportElementForm="reportElementForm"
   :staticOptions="staticOptions"
  v-on:getCascadeItems="getCascadeItems"
  v-on:handleInputChange="handleInputChange"
   v-on:deleteReportElementForm="resetReportElementForm"
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
        reportElementInput: 'no',
        object: '',
        indirectValue: '',
        reportElementSort: '',
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
        reportElementInput: 'no',
        object: '',
        indirectValue: '',
        reportElementSort: '',
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
        types: [
          {id: 1, type: '字符串'},
          {id: 2, type: '数组'}
        ],
        values: [],
        indirectValues: [],
        objects: [],
        textAligns: [
          {id: 1, textAlign: '居中'},
          {id: 2, textAlign: '靠左'},
          {id: 3, textAlign: '靠右'}
        ],
        fontSizes: [
          {id: 1, fontSize: '大号'},
          {id: 2, fontSize: '中号'},
          {id: 3, fontSize: '小号'}
        ],
        propertys: [
          {id: 1, property: '表头'},
          {id: 2, property: '文本'}
        ],
        borders: [
          {id: 1, border: '普通'},
          {id: 2, border: '无边框'},
          {id: 3, border: '上边框'},
          {id: 4, border: '下边框'}
        ],
        reports: []
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
    loadReportData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getReportDevelopment')
        .then(function (res) {
          vm.staticOptions.reports = res.data
          vm.getCascadeItems(vm.reportElementForm.reportName)
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
          vm.staticOptions.values = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleInputChange (event) {
      switch (event) {
        case 'no':
          console.log('no')
          break
        case 'direct':
          console.log('direct')
          break
        case 'indirect':
          console.log('indirect')
          break
      }
    },
    resetReportElementForm () {
      console.log('resetReportElementForm')
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
    this.loadReportData()
  }
}
</script>
