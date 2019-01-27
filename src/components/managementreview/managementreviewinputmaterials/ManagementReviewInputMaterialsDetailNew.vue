<template>
  <ManagementReviewInputMaterialsDetail
   :managementReviewInputMaterialsForm="managementReviewInputMaterialsForm"
   :staticOptions="staticOptions"
   v-on:updateManagementReviewInputMaterialsForm="updateManagementReviewInputMaterialsForm"
   v-on:deleteManagementReviewInputMaterialsForm="resetManagementReviewInputMaterialsForm"
   v-on:new="resetManagementReviewInputMaterialsForm"
   v-on:copy="resetManagementReviewInputMaterialsId"
  />
</template>

<script>
import ManagementReviewInputMaterialsDetail from '@/components/managementreview/managementreviewinputmaterials/ManagementReviewInputMaterialsDetail'
export default {
  name: 'managementReviewInputMaterialsDetailNew',
  components: {ManagementReviewInputMaterialsDetail},
  data () {
    return {
      managementReviewInputMaterialsForm: {
        managementReviewInputMaterialsName: '',
        type: '',
        planNumber: '',
        reportingDepartment: '',
        reportingContent: '',
        existingProblems: '',
        improvingAdvices: '',
        editedBy: '',
        editDate: '',
        note: '',
        sort: '',
        id: ''
      },
      managementReviewInputMaterialsResetForm: {
        managementReviewInputMaterialsName: '',
        type: '',
        planNumber: '',
        reportingDepartment: '',
        reportingContent: '',
        existingProblems: '',
        improvingAdvices: '',
        editedBy: '',
        editDate: '',
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
    updateManagementReviewInputMaterialsForm (event) {
      this.managementReviewInputMaterialsForm.id = event.id
    },
    resetManagementReviewInputMaterialsId () {
      this.managementReviewInputMaterialsForm.id = ''
    },
    resetManagementReviewInputMaterialsForm () {
      this.managementReviewInputMaterialsForm = JSON.parse(JSON.stringify(this.managementReviewInputMaterialsResetForm))
    }
  },
  mounted () {
  }
}
</script>
