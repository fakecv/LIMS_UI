<template>
  <ConsumableProcurementDetail
   :consumableProcurementForm="consumableProcurementForm"
   :staticOptions="staticOptions"
   v-on:deleteConsumableProcurementForm="resetConsumableProcurementForm"
   v-on:new="resetConsumableProcurementForm"
   v-on:copy="resetConsumableProcurementId"
  />
</template>

<script>
import ConsumableProcurementDetail from '@/components/equipment/consumableprocurement/ConsumableProcurementDetail'
export default {
  name: 'consumableProcurementDetailEdit',
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
    loadConsumableProcurement (consumableProcurementId) {
      let vm = this
      this.$ajax.get('/api/equipment/consumableProcurement/' + consumableProcurementId)
        .then(function (res) {
          vm.consumableProcurementForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetConsumableProcurementForm () {
      this.consumableProcurementForm = JSON.parse(JSON.stringify(this.consumableProcurementResetForm))
    },
    resetConsumableProcurementId () {
      this.consumableProcurementForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadConsumableProcurement(this.$route.params.id)
    }
  }
}
</script>
