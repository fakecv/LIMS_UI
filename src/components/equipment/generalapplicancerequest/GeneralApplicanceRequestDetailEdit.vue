<template>
  <GeneralApplicanceRequestDetail
   :generalApplicanceRequestForm="generalApplicanceRequestForm"
   :staticOptions="staticOptions"
   v-on:deleteGeneralApplicanceRequestForm="resetGeneralApplicanceRequestForm"
   v-on:new="resetGeneralApplicanceRequestForm"
   v-on:copy="resetGeneralApplicanceRequestId"
  />
</template>

<script>
import GeneralApplicanceRequestDetail from '@/components/equipment/generalapplicancerequest/GeneralApplicanceRequestDetail'
export default {
  name: 'generalApplicanceRequestDetailEdit',
  components: {GeneralApplicanceRequestDetail},
  data () {
    return {
      generalApplicanceRequestForm: {
        applianceName: '',
        requestNo: '',
        department: '',
        packagingInfo: '',
        specification: '',
        amount: '',
        usage: '',
        audit: '',
        approve: '',
        sort: '',
        id: ''
      },
      generalApplicanceRequestResetForm: {
        applianceName: '',
        requestNo: '',
        department: '',
        packagingInfo: '',
        specification: '',
        amount: '',
        usage: '',
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
    loadGeneralApplicanceRequest (generalApplicanceRequestId) {
      let vm = this
      this.$ajax.get('/api/equipment/generalApplicanceRequest/' + generalApplicanceRequestId)
        .then(function (res) {
          vm.generalApplicanceRequestForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetGeneralApplicanceRequestForm () {
      this.generalApplicanceRequestForm = JSON.parse(JSON.stringify(this.generalApplicanceRequestResetForm))
    },
    resetGeneralApplicanceRequestId () {
      this.generalApplicanceRequestForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadGeneralApplicanceRequest(this.$route.params.id)
    }
  }
}
</script>
