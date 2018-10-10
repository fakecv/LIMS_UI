<template>
  <InternalAuditCheckListDetail
   :internalAuditCheckListForm="internalAuditCheckListForm"
   v-on:deleteInternalAuditCheckList="resetInternalAuditCheckListForm"
   v-on:new="resetInternalAuditCheckListForm"
   v-on:copy="resetInternalAuditCheckListId"/>
</template>

<script>
import InternalAuditCheckListDetail from '@/components/internalaudit/internalAuditCheckList/InternalAuditCheckListDetail'
export default {
  name: 'internalAuditCheckListDetailEdit',
  components: {InternalAuditCheckListDetail},
  data () {
    return {
      internalAuditCheckListForm: {
        id: '',
        internalAuditCheckListName: '',
        internalAuditCheckListDescription: ''
      },
      internalAuditCheckListResetForm: {
        id: '',
        internalAuditCheckListName: '',
        internalAuditCheckListDescription: ''
      }
    }
  },
  methods: {
    loadInternalAuditCheckList (internalAuditCheckListId) {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/internalAuditCheckList/' + internalAuditCheckListId)
        .then(function (res) {
          vm.internalAuditCheckListForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetInternalAuditCheckListForm () {
      this.internalAuditCheckListForm = JSON.parse(JSON.stringify(this.internalAuditCheckListResetForm))
    },
    resetInternalAuditCheckListId () {
      this.internalAuditCheckListForm.id = ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadInternalAuditCheckList(this.$route.params.id)
    }
  }
}
</script>
