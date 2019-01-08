<template>
  <TraceabilityServiceProviderDetail
   :traceabilityServiceProviderForm="traceabilityServiceProviderForm"
   :staticOptions="staticOptions"
   v-on:deleteTraceabilityServiceProviderForm="resetTraceabilityServiceProviderForm"
   v-on:new="resetTraceabilityServiceProviderForm"
   v-on:copy="resetTraceabilityServiceProviderId"
  />
</template>

<script>
import TraceabilityServiceProviderDetail from '@/components/equipment/traceabilityserviceprovider/TraceabilityServiceProviderDetail'
export default {
  name: 'traceabilityServiceProviderDetailEdit',
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
    loadTraceabilityServiceProvider (traceabilityServiceProviderId) {
      let vm = this
      this.$ajax.get('/api/equipment/traceabilityServiceProvider/' + traceabilityServiceProviderId)
        .then(function (res) {
          vm.traceabilityServiceProviderForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetTraceabilityServiceProviderForm () {
      this.traceabilityServiceProviderForm = JSON.parse(JSON.stringify(this.traceabilityServiceProviderResetForm))
    },
    resetTraceabilityServiceProviderId () {
      this.traceabilityServiceProviderForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadTraceabilityServiceProvider(this.$route.params.id)
    }
  }
}
</script>
