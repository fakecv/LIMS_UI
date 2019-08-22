<template>
  <InternalAuditCheckListDetail
    :internalAuditCheckListForm="internalAuditCheckListForm"
    :staticOptions="staticOptions"
    v-on:updateInternalAuditCheckListForm="updateInternalAuditCheckListForm"
    v-on:deleteInternalAuditCheckListForm="resetInternalAuditCheckListForm"
    v-on:new="resetInternalAuditCheckListForm"
    v-on:copy="resetInternalAuditCheckListId"
  />
</template>

<script>
import InternalAuditCheckListDetail from '@/components/internalaudit/internalAuditCheckList/InternalAuditCheckListDetail'
export default {
  name: 'internalAuditCheckListDetailNew',
  components: {InternalAuditCheckListDetail},
  data () {
    return {
      internalAuditCheckListForm: {
        id: '',
        auditDepartment: '',
        auditDate: '',
        checker: '',
        terms: '',
        auditContent: '',
        auditMethod: '',
        auditNote: '',
        auditResult: '',
        internalAuditor: ''
      },
      internalAuditCheckListResetForm: {
        id: '',
        auditDepartment: '',
        auditDate: '',
        checker: '',
        terms: '',
        auditContent: '',
        auditMethod: '',
        auditNote: '',
        auditResult: '',
        internalAuditor: ''
      },
      staticOptions: {
        auditDepartments: [],
        internalAuditors: []
      }
    }
  },
  methods: {
    updateInternalAuditCheckListForm (event) {
      this.internalAuditCheckListForm.id = event.id
    },
    resetInternalAuditCheckListId () {
      this.internalAuditCheckListForm.id = ''
    },
    resetInternalAuditCheckListForm () {
      this.internalAuditCheckListForm = JSON.parse(JSON.stringify(this.internalAuditCheckListResetForm))
    },
    loadAuditDepartment () {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/auditDepartment/getAuditDepartment')
        .then(function (res) {
          vm.staticOptions.auditDepartments = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadInternalAuditor () {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/internalAuditor/getInternalAuditor')
        .then(function (res) {
          vm.staticOptions.internalAuditors = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  activated () {
    this.loadAuditDepartment()
    this.loadInternalAuditor()
  }
}
</script>
