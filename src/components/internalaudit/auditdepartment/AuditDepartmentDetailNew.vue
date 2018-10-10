<template>
  <AuditDepartmentDetail :auditDepartmentForm="auditDepartmentForm"
  v-on:updateAuditDepartmentForm="updateAuditDepartmentForm"
  v-on:deleteAuditDepartmentForm="resetAuditDepartmentForm"
  v-on:new="resetAuditDepartmentForm"
  v-on:copy="resetAuditDepartmentId"/>
</template>

<script>
import AuditDepartmentDetail from '@/components/internalaudit/auditDepartment/AuditDepartmentDetail'
export default {
  name: 'auditDepartmentDetailNew',
  components: {AuditDepartmentDetail},
  data () {
    return {
      auditDepartmentForm: {
        id: '',
        auditDepartmentName: '',
        auditDepartmentDescription: ''
      },
      auditDepartmentResetForm: {
        id: '',
        auditDepartmentName: '',
        auditDepartmentDescription: ''
      }
    }
  },
  methods: {
    updateAuditDepartmentForm (event) {
      this.auditDepartmentForm.id = event.id
    },
    resetAuditDepartmentId () {
      this.auditDepartmentForm.id = ''
    },
    resetAuditDepartmentForm () {
      this.auditDepartmentForm = JSON.parse(JSON.stringify(this.auditDepartmentResetForm))
    }
  },
  mounted () {
  }
}
</script>
