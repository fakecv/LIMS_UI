<template>
  <ConsumableProcurementDetail
   :consumableProcurementForm="consumableProcurementForm"
   :staticOptions="staticOptions"
   v-on:updateConsumableProcurementForm="updateConsumableProcurementForm"
   v-on:deleteConsumableProcurementForm="resetConsumableProcurementForm"
   v-on:new="resetConsumableProcurementForm"
   v-on:copy="resetConsumableProcurementId"
  />
</template>

<script>
import ConsumableProcurementDetail from '@/components/equipment/consumableprocurement/ConsumableProcurementDetail'
export default {
  name: 'consumableProcurementDetailNew',
  components: {ConsumableProcurementDetail},
  data () {
    return {
      consumableProcurementForm: {
        consumableProcurementName: '',
        requestNo: '',
        department: '',
        technicalParameter: '',
        amount: '',
        purpose: '',
        suggestedSupplier: '',
        check: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      consumableProcurementResetForm: {
        consumableProcurementName: '',
        requestNo: '',
        department: '',
        technicalParameter: '',
        amount: '',
        purpose: '',
        suggestedSupplier: '',
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
    updateConsumableProcurementForm (event) {
      this.consumableProcurementForm.id = event.id
    },
    resetConsumableProcurementId () {
      this.consumableProcurementForm.id = ''
    },
    resetConsumableProcurementForm () {
      this.consumableProcurementForm = JSON.parse(JSON.stringify(this.consumableProcurementResetForm))
    }
  },
  activated () {
    this.resetConsumableProcurementForm()
  }
}
</script>
