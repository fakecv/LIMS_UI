<template>
  <GeneralApplicanceRequestDetail
   :generalApplicanceRequestForm="generalApplicanceRequestForm"
   :staticOptions="staticOptions"
   v-on:updateGeneralApplicanceRequestForm="updateGeneralApplicanceRequestForm"
   v-on:deleteGeneralApplicanceRequestForm="resetGeneralApplicanceRequestForm"
   v-on:new="resetGeneralApplicanceRequestForm"
   v-on:copy="resetGeneralApplicanceRequestId"
  />
</template>

<script>
import GeneralApplicanceRequestDetail from '@/components/equipment/generalapplicancerequest/GeneralApplicanceRequestDetail'
export default {
  name: 'generalApplicanceRequestDetailNew',
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
    updateGeneralApplicanceRequestForm (event) {
      this.generalApplicanceRequestForm.id = event.id
    },
    resetGeneralApplicanceRequestId () {
      this.generalApplicanceRequestForm.id = ''
    },
    resetGeneralApplicanceRequestForm () {
      this.generalApplicanceRequestForm = JSON.parse(JSON.stringify(this.generalApplicanceRequestResetForm))
    }
  },
  mounted () {
  }
}
</script>
