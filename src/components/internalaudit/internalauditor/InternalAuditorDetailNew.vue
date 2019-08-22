<template>
  <InternalAuditorDetail :internalAuditorForm="internalAuditorForm"
  v-on:updateInternalAuditorForm="updateInternalAuditorForm"
  v-on:deleteInternalAuditorForm="resetInternalAuditorForm"
  v-on:new="resetInternalAuditorForm"
  v-on:copy="resetInternalAuditorId"/>
</template>

<script>
import InternalAuditorDetail from '@/components/internalaudit/internalAuditor/InternalAuditorDetail'
export default {
  name: 'internalAuditorDetailNew',
  components: {InternalAuditorDetail},
  data () {
    return {
      internalAuditorForm: {
        id: '',
        internalAuditorName: '',
        internalAuditorDescription: ''
      },
      internalAuditorResetForm: {
        id: '',
        internalAuditorName: '',
        internalAuditorDescription: ''
      }
    }
  },
  methods: {
    updateInternalAuditorForm (event) {
      this.internalAuditorForm.id = event.id
    },
    resetInternalAuditorId () {
      this.internalAuditorForm.id = ''
    },
    resetInternalAuditorForm () {
      this.internalAuditorForm = JSON.parse(JSON.stringify(this.internalAuditorResetForm))
    }
  },
  activated () {
    this.resetInternalAuditorForm()
  }
}
</script>
