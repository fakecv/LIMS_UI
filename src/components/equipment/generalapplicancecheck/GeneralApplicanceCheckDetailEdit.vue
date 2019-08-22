<template>
  <GeneralApplicanceCheckDetail
   :generalApplicanceCheckForm="generalApplicanceCheckForm"
   :staticOptions="staticOptions"
   v-on:deleteGeneralApplicanceCheckForm="resetGeneralApplicanceCheckForm"
   v-on:new="resetGeneralApplicanceCheckForm"
   v-on:copy="resetGeneralApplicanceCheckId"
  />
</template>

<script>
import GeneralApplicanceCheckDetail from '@/components/equipment/generalapplicancecheck/GeneralApplicanceCheckDetail'
export default {
  name: 'generalApplicanceCheckDetailEdit',
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
    loadGeneralApplicanceCheck (generalApplicanceCheckId) {
      let vm = this
      this.$ajax.get('/api/equipment/generalApplicanceCheck/' + generalApplicanceCheckId)
        .then(function (res) {
          vm.generalApplicanceCheckForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetGeneralApplicanceCheckForm () {
      this.generalApplicanceCheckForm = JSON.parse(JSON.stringify(this.generalApplicanceCheckResetForm))
    },
    resetGeneralApplicanceCheckId () {
      this.generalApplicanceCheckForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadGeneralApplicanceCheck(this.$route.params.id)
    }
  }
}
</script>
