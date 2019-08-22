<template>
  <ManagementReviewInputMaterialsDetail
   :managementReviewInputMaterialsForm="managementReviewInputMaterialsForm"
   :staticOptions="staticOptions"
   v-on:deleteManagementReviewInputMaterialsForm="resetManagementReviewInputMaterialsForm"
   v-on:new="resetManagementReviewInputMaterialsForm"
   v-on:copy="resetManagementReviewInputMaterialsId"
  />
</template>

<script>
import ManagementReviewInputMaterialsDetail from '@/components/managementreview/managementreviewinputmaterials/ManagementReviewInputMaterialsDetail'
export default {
  name: 'managementReviewInputMaterialsDetailEdit',
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
    loadManagementReviewInputMaterials (managementReviewInputMaterialsId) {
      let vm = this
      this.$ajax.get('/api/managementreview/managementReviewInputMaterials/' + managementReviewInputMaterialsId)
        .then(function (res) {
          vm.managementReviewInputMaterialsForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetManagementReviewInputMaterialsForm () {
      this.managementReviewInputMaterialsForm = JSON.parse(JSON.stringify(this.managementReviewInputMaterialsResetForm))
    },
    resetManagementReviewInputMaterialsId () {
      this.managementReviewInputMaterialsForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadManagementReviewInputMaterials(this.$route.params.id)
    }
  }
}
</script>
