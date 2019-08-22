<template>
  <ProcurementDetail
   :procurementForm="procurementForm"
   :staticOptions="staticOptions"
   v-on:deleteProcurementForm="resetProcurementForm"
   v-on:new="resetProcurementForm"
   v-on:copy="resetProcurementId"
  />
</template>

<script>
import ProcurementDetail from '@/components/equipment/procurement/ProcurementDetail'
export default {
  name: 'procurementDetailEdit',
  components: {ProcurementDetail},
  data () {
    return {
      procurementForm: {
        procurementName: '',
        requestNo: '',
        申请日期: '',
        department: '',
        applicantName: '',
        applicableItem: '',
        manufacturer: '',
        specification: '',
        reason: '',
        performance: '',
        afterSaleService: '',
        acceptance: '',
        amount: '',
        arrivalTime: '',
        check: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      procurementResetForm: {
        procurementName: '',
        requestNo: '',
        申请日期: '',
        department: '',
        applicantName: '',
        applicableItem: '',
        manufacturer: '',
        specification: '',
        reason: '',
        performance: '',
        afterSaleService: '',
        acceptance: '',
        amount: '',
        arrivalTime: '',
        check: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      staticOptions: {
        departments: [],
        results: []
      }
    }
  },
  methods: {
    loadProcurement (procurementId) {
      let vm = this
      this.$ajax.get('/api/equipment/procurement/' + procurementId)
        .then(function (res) {
          vm.procurementForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetProcurementForm () {
      this.procurementForm = JSON.parse(JSON.stringify(this.procurementResetForm))
    },
    resetProcurementId () {
      this.procurementForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadProcurement(this.$route.params.id)
    }
  }
}
</script>
