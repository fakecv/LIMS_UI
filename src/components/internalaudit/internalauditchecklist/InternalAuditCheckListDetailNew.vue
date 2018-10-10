<template>
  <InternalAuditCheckListDetail :internalAuditCheckListForm="internalAuditCheckListForm"
  v-on:updateInternalAuditCheckListForm="updateInternalAuditCheckListForm"
  v-on:deleteInternalAuditCheckListForm="resetInternalAuditCheckListForm"
  v-on:new="resetInternalAuditCheckListForm"
  v-on:copy="resetInternalAuditCheckListId"/>
</template>

<script>
import InternalAuditCheckListDetail from '@/components/internalaudit/internalAuditCheckList/InternalAuditCheckListDetail'
export default {
  name: 'internalAuditCheckListDetailNew',
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
    updateInternalAuditCheckListForm (event) {
      this.internalAuditCheckListForm.id = event.id
    },
    resetInternalAuditCheckListId () {
      this.internalAuditCheckListForm.id = ''
    },
    resetInternalAuditCheckListForm () {
      this.internalAuditCheckListForm = JSON.parse(JSON.stringify(this.internalAuditCheckListResetForm))
    }
  },
  mounted () {
  }
}
</script>
