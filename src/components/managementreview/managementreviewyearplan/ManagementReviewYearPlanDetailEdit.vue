<template>
  <ManagementReviewYearPlanDetail
   :managementReviewYearPlanForm="managementReviewYearPlanForm"
   :staticOptions="staticOptions"
   v-on:deleteManagementReviewYearPlanForm="resetManagementReviewYearPlanForm"
   v-on:new="resetManagementReviewYearPlanForm"
   v-on:copy="resetManagementReviewYearPlanId"
  />
</template>

<script>
import ManagementReviewYearPlanDetail from '@/components/managementreview/managementreviewyearplan/ManagementReviewYearPlanDetail'
export default {
  name: 'managementReviewYearPlanDetailEdit',
  components: {ManagementReviewYearPlanDetail},
  data () {
    return {
      managementReviewYearPlanForm: {
        managementReviewYearPlanName: '',
        type: '',
        number: '',
        leader: '',
        planDate: '',
        place: '',
        purpose: '',
        according: '',
        content: '',
        edit: '',
        approve: '',
        note: '',
        sort: '',
        id: ''
      },
      managementReviewYearPlanResetForm: {
        managementReviewYearPlanName: '',
        type: '',
        number: '',
        leader: '',
        planDate: '',
        place: '',
        purpose: '',
        according: '',
        content: '',
        edit: '',
        approve: '',
        note: '',
        sort: '',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    loadManagementReviewYearPlan (managementReviewYearPlanId) {
      let vm = this
      this.$ajax.get('/api/managementreview/managementReviewYearPlan/' + managementReviewYearPlanId)
        .then(function (res) {
          vm.managementReviewYearPlanForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetManagementReviewYearPlanForm () {
      this.managementReviewYearPlanForm = JSON.parse(JSON.stringify(this.managementReviewYearPlanResetForm))
    },
    resetManagementReviewYearPlanId () {
      this.managementReviewYearPlanForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadManagementReviewYearPlan(this.$route.params.id)
    }
  }
}
</script>
