<template>
  <TraceabilityServiceProviderDetail
   :traceabilityServiceProviderForm="traceabilityServiceProviderForm"
   :staticOptions="staticOptions"
   v-on:updateTraceabilityServiceProviderForm="updateTraceabilityServiceProviderForm"
   v-on:deleteTraceabilityServiceProviderForm="resetTraceabilityServiceProviderForm"
   v-on:new="resetTraceabilityServiceProviderForm"
   v-on:copy="resetTraceabilityServiceProviderId"
  />
</template>

<script>
import TraceabilityServiceProviderDetail from '@/components/equipment/traceabilityserviceprovider/TraceabilityServiceProviderDetail'
export default {
  name: 'traceabilityServiceProviderDetailNew',
  components: {TraceabilityServiceProviderDetail},
  data () {
    return {
      traceabilityServiceProviderForm: {
        traceabilityServiceProviderName: '',
        supplierDescription: '',
        legalMetrological: '',
        qualification: '',
        authorityScope: '',
        personnel: '',
        serviceQuality: '',
        note: '',
        assessmentResult: '',
        confirmation: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      traceabilityServiceProviderResetForm: {
        traceabilityServiceProviderName: '',
        supplierDescription: '',
        legalMetrological: '',
        qualification: '',
        authorityScope: '',
        personnel: '',
        serviceQuality: '',
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
    updateTraceabilityServiceProviderForm (event) {
      this.traceabilityServiceProviderForm.id = event.id
    },
    resetTraceabilityServiceProviderId () {
      this.traceabilityServiceProviderForm.id = ''
    },
    resetTraceabilityServiceProviderForm () {
      this.traceabilityServiceProviderForm = JSON.parse(JSON.stringify(this.traceabilityServiceProviderResetForm))
    }
  },
  activated () {
    this.resetTraceabilityServiceProviderForm()
  }
}
</script>
