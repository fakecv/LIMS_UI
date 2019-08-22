<template>
  <ConsumableSupplierAssessmentDetail
   :consumableSupplierAssessmentForm="consumableSupplierAssessmentForm"
   :staticOptions="staticOptions"
   v-on:deleteConsumableSupplierAssessmentForm="resetConsumableSupplierAssessmentForm"
   v-on:new="resetConsumableSupplierAssessmentForm"
   v-on:copy="resetConsumableSupplierAssessmentId"
  />
</template>

<script>
import ConsumableSupplierAssessmentDetail from '@/components/equipment/consumablesupplierassessment/ConsumableSupplierAssessmentDetail'
export default {
  name: 'consumableSupplierAssessmentDetailEdit',
  components: {ConsumableSupplierAssessmentDetail},
  data () {
    return {
      consumableSupplierAssessmentForm: {
        consumableSupplierName: '',
        supplierDescription: '',
        socialReputation: '',
        qualification: '',
        deliveryPeriod: '',
        afterSalesServiceQuality: '',
        technicalSupportCapability: '',
        technicalParameter: '',
        productionLicense: '',
        hcRequirement: '',
        costPerformance: '',
        note: '',
        assessmentResult: '',
        confirmation: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      consumableSupplierAssessmentResetForm: {
        consumableSupplierName: '',
        supplierDescription: '',
        socialReputation: '',
        qualification: '',
        deliveryPeriod: '',
        afterSalesServiceQuality: '',
        technicalSupportCapability: '',
        technicalParameter: '',
        productionLicense: '',
        hcRequirement: '',
        costPerformance: '',
        note: '',
        assessmentResult: '',
        confirmation: '',
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
    loadConsumableSupplierAssessment (consumableSupplierAssessmentId) {
      let vm = this
      this.$ajax.get('/api/equipment/consumableSupplierAssessment/' + consumableSupplierAssessmentId)
        .then(function (res) {
          vm.consumableSupplierAssessmentForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetConsumableSupplierAssessmentForm () {
      this.consumableSupplierAssessmentForm = JSON.parse(JSON.stringify(this.consumableSupplierAssessmentResetForm))
    },
    resetConsumableSupplierAssessmentId () {
      this.consumableSupplierAssessmentForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadConsumableSupplierAssessment(this.$route.params.id)
    }
  }
}
</script>
