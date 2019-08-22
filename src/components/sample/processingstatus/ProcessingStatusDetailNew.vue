<template>
  <ProcessingStatusDetail :processingStatusForm="processingStatusForm"
  v-on:updateProcessingStatusForm="updateProcessingStatusForm"
  :staticOptions="staticOptions"
  v-on:deleteProcessingStatusForm="resetProcessingStatusForm"
  v-on:new="resetProcessingStatusForm"
  v-on:copy="resetProcessingStatusId"/>
</template>

<script>
import ProcessingStatusDetail from '@/components/sample/processingStatus/ProcessingStatusDetail'
export default {
  name: 'processingStatusDetailNew',
  components: {ProcessingStatusDetail},
  data () {
    return {
      processingStatusForm: {
        id: '',
        processingStatusName: '',
        sort: '',
        processingStatusDescription: ''
      },
      processingStatusResetForm: {
        id: '',
        processingStatusName: '',
        sort: '',
        processingStatusDescription: ''
      },
      staticOptions: {
        departments: [],
        selectedDepartments: []
      }
    }
  },
  methods: {
    updateProcessingStatusForm (event) {
      this.processingStatusForm.id = event.id
    },
    resetProcessingStatusId () {
      this.processingStatusForm.id = ''
    },
    resetProcessingStatusForm () {
      this.processingStatusForm = JSON.parse(JSON.stringify(this.processingStatusResetForm))
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    }
  },
  activated () {
    this.resetProcessingStatusForm()
    this.loadDepartment()
  }
}
</script>
