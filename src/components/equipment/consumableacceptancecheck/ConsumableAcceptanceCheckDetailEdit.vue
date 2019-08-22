<template>
  <ConsumableAcceptanceCheckDetail
   :consumableAcceptanceCheckForm="consumableAcceptanceCheckForm"
   :staticOptions="staticOptions"
   v-on:deleteConsumableAcceptanceCheckForm="resetConsumableAcceptanceCheckForm"
   v-on:new="resetConsumableAcceptanceCheckForm"
   v-on:copy="resetConsumableAcceptanceCheckId"
  />
</template>

<script>
import ConsumableAcceptanceCheckDetail from '@/components/equipment/consumableacceptancecheck/ConsumableAcceptanceCheckDetail'
export default {
  name: 'consumableAcceptanceCheckDetailEdit',
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
    loadConsumableAcceptanceCheck (consumableAcceptanceCheckId) {
      let vm = this
      this.$ajax.get('/api/equipment/consumableAcceptanceCheck/' + consumableAcceptanceCheckId)
        .then(function (res) {
          vm.consumableAcceptanceCheckForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetConsumableAcceptanceCheckForm () {
      this.consumableAcceptanceCheckForm = JSON.parse(JSON.stringify(this.consumableAcceptanceCheckResetForm))
    },
    resetConsumableAcceptanceCheckId () {
      this.consumableAcceptanceCheckForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadConsumableAcceptanceCheck(this.$route.params.id)
    }
  }
}
</script>
