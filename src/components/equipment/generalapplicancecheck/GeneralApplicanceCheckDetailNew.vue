<template>
  <GeneralApplicanceCheckDetail
   :generalApplicanceCheckForm="generalApplicanceCheckForm"
   :staticOptions="staticOptions"
   v-on:updateGeneralApplicanceCheckForm="updateGeneralApplicanceCheckForm"
   v-on:deleteGeneralApplicanceCheckForm="resetGeneralApplicanceCheckForm"
   v-on:new="resetGeneralApplicanceCheckForm"
   v-on:copy="resetGeneralApplicanceCheckId"
  />
</template>

<script>
import GeneralApplicanceCheckDetail from '@/components/equipment/generalapplicancecheck/GeneralApplicanceCheckDetail'
export default {
  name: 'generalApplicanceCheckDetailNew',
  components: {GeneralApplicanceCheckDetail},
  data () {
    return {
      generalApplicanceCheckForm: {
        applianceName: '',
        requestNo: '',
        department: '',
        specification: '',
        amount: '',
        audit: '',
        checkDate: '',
        sort: '',
        id: ''
      },
      generalApplicanceCheckResetForm: {
        applianceName: '',
        requestNo: '',
        department: '',
        specification: '',
        amount: '',
        audit: '',
        checkDate: '',
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
    updateGeneralApplicanceCheckForm (event) {
      this.generalApplicanceCheckForm.id = event.id
    },
    resetGeneralApplicanceCheckId () {
      this.generalApplicanceCheckForm.id = ''
    },
    resetGeneralApplicanceCheckForm () {
      this.generalApplicanceCheckForm = JSON.parse(JSON.stringify(this.generalApplicanceCheckResetForm))
    }
  },
  activated () {
    this.resetGeneralApplicanceCheckForm()
  }
}
</script>
