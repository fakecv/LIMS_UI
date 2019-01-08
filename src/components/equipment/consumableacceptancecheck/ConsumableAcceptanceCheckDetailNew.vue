<template>
  <ConsumableAcceptanceCheckDetail
   :consumableAcceptanceCheckForm="consumableAcceptanceCheckForm"
   :staticOptions="staticOptions"
   v-on:updateConsumableAcceptanceCheckForm="updateConsumableAcceptanceCheckForm"
   v-on:deleteConsumableAcceptanceCheckForm="resetConsumableAcceptanceCheckForm"
   v-on:new="resetConsumableAcceptanceCheckForm"
   v-on:copy="resetConsumableAcceptanceCheckId"
  />
</template>

<script>
import ConsumableAcceptanceCheckDetail from '@/components/equipment/consumableacceptancecheck/ConsumableAcceptanceCheckDetail'
export default {
  name: 'consumableAcceptanceCheckDetailNew',
  components: {ConsumableAcceptanceCheckDetail},
  data () {
    return {
      consumableAcceptanceCheckForm: {
        consumableProcurementName: '',
        requestNo: '',
        department: '',
        packagingInfo: '',
        specification: '',
        certification: '',
        amount: '',
        expireDate: '',
        supplier: '',
        note: '',
        result: '',
        check: '',
        sort: '',
        id: ''
      },
      consumableAcceptanceCheckResetForm: {
        consumableProcurementName: '',
        requestNo: '',
        department: '',
        packagingInfo: '',
        specification: '',
        certification: '',
        amount: '',
        expireDate: '',
        supplier: '',
        note: '',
        result: '',
        check: '',
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
    updateConsumableAcceptanceCheckForm (event) {
      this.consumableAcceptanceCheckForm.id = event.id
    },
    resetConsumableAcceptanceCheckId () {
      this.consumableAcceptanceCheckForm.id = ''
    },
    resetConsumableAcceptanceCheckForm () {
      this.consumableAcceptanceCheckForm = JSON.parse(JSON.stringify(this.consumableAcceptanceCheckResetForm))
    }
  },
  mounted () {
  }
}
</script>
