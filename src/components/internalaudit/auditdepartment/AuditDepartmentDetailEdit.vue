<template>
  <AuditDepartmentDetail
   :auditDepartmentForm="auditDepartmentForm"
   v-on:deleteAuditDepartment="resetAuditDepartmentForm"
   v-on:new="resetAuditDepartmentForm"
   v-on:copy="resetAuditDepartmentId"/>
</template>

<script>
import AuditDepartmentDetail from '@/components/internalaudit/auditDepartment/AuditDepartmentDetail'
export default {
  name: 'auditDepartmentDetailEdit',
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
    loadAuditDepartment (auditDepartmentId) {
      let vm = this
      this.$ajax.get('/api/auditdepartment/auditDepartment/' + auditDepartmentId)
        .then(function (res) {
          vm.auditDepartmentForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetAuditDepartmentForm () {
      this.auditDepartmentForm = JSON.parse(JSON.stringify(this.auditDepartmentResetForm))
    },
    resetAuditDepartmentId () {
      this.auditDepartmentForm.id = ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadAuditDepartment(this.$route.params.id)
    }
  }
}
</script>
