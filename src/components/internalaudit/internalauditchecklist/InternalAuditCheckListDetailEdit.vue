<template>
  <InternalAuditCheckListDetail
    :internalAuditCheckListForm="internalAuditCheckListForm"
    :staticOptions="staticOptions"
    v-on:deleteInternalAuditCheckList="resetInternalAuditCheckListForm"
    v-on:new="resetInternalAuditCheckListForm"
    v-on:copy="resetInternalAuditCheckListId"
   />
</template>

<script>
import InternalAuditCheckListDetail from '@/components/internalaudit/internalAuditCheckList/InternalAuditCheckListDetail'
export default {
  name: 'internalAuditCheckListDetailEdit',
  components: {InternalAuditCheckListDetail},
  data () {
    return {
      internalAuditCheckListForm: {
        id: '',
        auditDepartment: '',
        checker: '',
        auditDate: '',
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
        checker: '',
        auditDate: '',
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
    loadInternalAuditCheckList (internalAuditCheckListId) {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/internalAuditCheckList/' + internalAuditCheckListId)
        .then(function (res) {
          vm.internalAuditCheckListForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    },
    resetInternalAuditCheckListForm () {
      this.internalAuditCheckListForm = JSON.parse(JSON.stringify(this.internalAuditCheckListResetForm))
    },
    resetInternalAuditCheckListId () {
      this.internalAuditCheckListForm.id = ''
    }
  },
  activated () {
    this.loadAuditDepartment()
    this.loadInternalAuditor()
    if (this.$route.params.id !== undefined) {
      this.loadInternalAuditCheckList(this.$route.params.id)
    }
  }
}
</script>
