<template>
  <ManagementReviewYearPlanDetail
   :managementReviewYearPlanForm="managementReviewYearPlanForm"
   :staticOptions="staticOptions"
   v-on:updateManagementReviewYearPlanForm="updateManagementReviewYearPlanForm"
   v-on:deleteManagementReviewYearPlanForm="resetManagementReviewYearPlanForm"
   v-on:new="resetManagementReviewYearPlanForm"
   v-on:copy="resetManagementReviewYearPlanId"
  />
</template>

<script>
import ManagementReviewYearPlanDetail from '@/components/managementreview/managementreviewyearplan/ManagementReviewYearPlanDetail'
export default {
  name: 'managementReviewYearPlanDetailNew',
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
    updateManagementReviewYearPlanForm (event) {
      this.managementReviewYearPlanForm.id = event.id
    },
    resetManagementReviewYearPlanId () {
      this.managementReviewYearPlanForm.id = ''
    },
    resetManagementReviewYearPlanForm () {
      this.managementReviewYearPlanForm = JSON.parse(JSON.stringify(this.managementReviewYearPlanResetForm))
    }
  },
  mounted () {
  }
}
</script>
