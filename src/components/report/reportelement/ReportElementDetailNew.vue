<template>
  <ReportElementDetail :reportElementForm="reportElementForm"
   :staticOptions="staticOptions"
  v-on:getCascadeItems="getCascadeItems"
  v-on:loadReportEnrichmentData="loadReportEnrichmentData"
   v-on:handleIsStringChange="handleIsStringChange"
  v-on:handleInputChange="handleInputChange"
  v-on:handleGroupChange="handleGroupChange"
  v-on:handleGroupClassChange="handleGroupClassChange"
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
        reportElementInput: 'no',
        object: '',
        indirectValue: '',
        reportElementLabel: '',
        reportElementSort: '',
        border: '无边框',
        property: '文本',
        fontSize: '中号',
        textAlign: '靠左',
        group: 'no',
        groupClass: '',
        row: '1',
        column: '1',
        value: '',
        type: '字符串',
        isString: 'yes',
        listValue: '',
        id: ''
      },
      reportElementResetForm: {
        reportName: '',
        reportElementName: '',
        reportElementInput: 'no',
        object: '',
        indirectValue: '',
        reportElementLabel: '',
        reportElementSort: '',
        border: '无边框',
        property: '文本',
        fontSize: '中号',
        textAlign: '靠左',
        group: 'no',
        groupClass: '',
        row: '1',
        column: '1',
        value: '',
        type: '字符串',
        isString: 'yes',
        listValue: '',
        id: ''
      },
      staticOptions: {
        listValues: [],
        input: true,
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
          {id: 3, textAlign: '靠右'},
          {id: 4, textAlign: '居中分散'}
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
        reports: [],
        collectionNames: []
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
          vm.$message(error.response.data.message)
        })
    },
    loadReportEnrichmentData (reportId) {
      let vm = this
      this.$ajax.get('/api/report/reportEnrichment/getGroupReportEnrichment/' + reportId)
        .then(function (res) {
          vm.staticOptions.objects = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadCollectionData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getCollectionNames')
        .then(function (res) {
          vm.staticOptions.collectionNames = res.data
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
      this.staticOptions.input = false
    },
    getCascadeItemsWithName (event) {
      let vm = this
      this.$ajax.get('/api/report/reportElement/getFieldNames/' + event)
        .then(function (res) {
          vm.staticOptions.values = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
      this.staticOptions.input = false
    },
    handleInputChange (event) {
      switch (event) {
        case 'no':
          this.reportElementForm.value = ''
          this.reportElementForm.indirectValue = ''
          this.reportElementForm.object = ''
          break
        case 'direct':
          this.reportElementForm.indirectValue = ''
          this.reportElementForm.object = ''
          this.reportElementForm.reportElementName = ''
          this.reportElementForm.reportElementLabel = ''
          break
        case 'indirect':
          this.loadReportEnrichmentData(this.reportElementForm.reportName)
          this.reportElementForm.reportElementName = ''
          this.reportElementForm.reportElementLabel = ''
          this.reportElementForm.value = ''
          break
      }
    },
    handleGroupChange (event) {
      switch (event) {
        case 'no':
          this.getCascadeItems(this.reportElementForm.reportName)
          break
        case 'yes':
          this.loadCollectionData()
          this.staticOptions.values = []
          break
      }
    },
    handleGroupClassChange (event) {
      this.getCascadeItemsWithName(event)
    },
    handleIsStringChange (event) {
      let vm = this
      this.$ajax.get('/api/report/reportElement/getListValues/' + this.reportElementForm.object + '/' + this.reportElementForm.indirectValue)
        .then(function (res) {
          vm.staticOptions.listValues = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.message
          })
        })
    },
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
    this.loadReportData()
  }
}
</script>
