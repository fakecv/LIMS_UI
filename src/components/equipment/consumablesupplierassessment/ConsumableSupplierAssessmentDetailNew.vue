<template>
  <ConsumableSupplierAssessmentDetail
   :consumableSupplierAssessmentForm="consumableSupplierAssessmentForm"
   :staticOptions="staticOptions"
   v-on:updateConsumableSupplierAssessmentForm="updateConsumableSupplierAssessmentForm"
   v-on:deleteConsumableSupplierAssessmentForm="resetConsumableSupplierAssessmentForm"
   v-on:new="resetConsumableSupplierAssessmentForm"
   v-on:copy="resetConsumableSupplierAssessmentId"
  />
</template>

<script>
import ConsumableSupplierAssessmentDetail from '@/components/equipment/consumablesupplierassessment/ConsumableSupplierAssessmentDetail'
export default {
  name: 'consumableSupplierAssessmentDetailNew',
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
    updateConsumableSupplierAssessmentForm (event) {
      this.consumableSupplierAssessmentForm.id = event.id
    },
    resetConsumableSupplierAssessmentId () {
      this.consumableSupplierAssessmentForm.id = ''
    },
    resetConsumableSupplierAssessmentForm () {
      this.consumableSupplierAssessmentForm = JSON.parse(JSON.stringify(this.consumableSupplierAssessmentResetForm))
    }
  },
  mounted () {
  }
}
</script>
