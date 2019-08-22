<template>
  <SupplierAssessmentDetail
   :supplierAssessmentForm="supplierAssessmentForm"
   :staticOptions="staticOptions"
   v-on:deleteSupplierAssessmentForm="resetSupplierAssessmentForm"
   v-on:new="resetSupplierAssessmentForm"
   v-on:copy="resetSupplierAssessmentId"
  />
</template>

<script>
import SupplierAssessmentDetail from '@/components/equipment/supplierassessment/SupplierAssessmentDetail'
export default {
  name: 'supplierAssessmentDetailEdit',
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
    loadSupplierAssessment (supplierAssessmentId) {
      let vm = this
      this.$ajax.get('/api/equipment/supplierAssessment/' + supplierAssessmentId)
        .then(function (res) {
          vm.supplierAssessmentForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetSupplierAssessmentForm () {
      this.supplierAssessmentForm = JSON.parse(JSON.stringify(this.supplierAssessmentResetForm))
    },
    resetSupplierAssessmentId () {
      this.supplierAssessmentForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadSupplierAssessment(this.$route.params.id)
    }
  }
}
</script>
