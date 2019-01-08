<template>
  <SupplierAssessmentDetail
   :supplierAssessmentForm="supplierAssessmentForm"
   :staticOptions="staticOptions"
   v-on:updateSupplierAssessmentForm="updateSupplierAssessmentForm"
   v-on:deleteSupplierAssessmentForm="resetSupplierAssessmentForm"
   v-on:new="resetSupplierAssessmentForm"
   v-on:copy="resetSupplierAssessmentId"
  />
</template>

<script>
import SupplierAssessmentDetail from '@/components/equipment/supplierassessment/SupplierAssessmentDetail'
export default {
  name: 'supplierAssessmentDetailNew',
  components: {SupplierAssessmentDetail},
  data () {
    return {
      supplierAssessmentForm: {
        supplierName: '',
        supplierDescription: '',
        socialReputation: '',
        qualification: '',
        deliveryPeriod: '',
        afterSalesServiceQuality: '',
        technicalSupportCapability: '',
        technicalParameter: '',
        productionLicense: '',
        comparison: '',
        costPerformance: '',
        note: '',
        assessmentResult: '',
        confirmation: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      supplierAssessmentResetForm: {
        supplierName: '',
        supplierDescription: '',
        socialReputation: '',
        qualification: '',
        deliveryPeriod: '',
        afterSalesServiceQuality: '',
        technicalSupportCapability: '',
        technicalParameter: '',
        productionLicense: '',
        comparison: '',
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
    updateSupplierAssessmentForm (event) {
      this.supplierAssessmentForm.id = event.id
    },
    resetSupplierAssessmentId () {
      this.supplierAssessmentForm.id = ''
    },
    resetSupplierAssessmentForm () {
      this.supplierAssessmentForm = JSON.parse(JSON.stringify(this.supplierAssessmentResetForm))
    }
  },
  mounted () {
  }
}
</script>
