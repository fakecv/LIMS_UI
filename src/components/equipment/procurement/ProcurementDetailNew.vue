<template>
  <ProcurementDetail
   :procurementForm="procurementForm"
   :staticOptions="staticOptions"
   v-on:updateProcurementForm="updateProcurementForm"
   v-on:deleteProcurementForm="resetProcurementForm"
   v-on:new="resetProcurementForm"
   v-on:copy="resetProcurementId"
  />
</template>

<script>
import ProcurementDetail from '@/components/equipment/procurement/ProcurementDetail'
export default {
  name: 'procurementDetailNew',
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
    updateProcurementForm (event) {
      this.procurementForm.id = event.id
    },
    resetProcurementId () {
      this.procurementForm.id = ''
    },
    resetProcurementForm () {
      this.procurementForm = JSON.parse(JSON.stringify(this.procurementResetForm))
    }
  },
  activated () {
    this.resetProcurementForm()
  }
}
</script>
