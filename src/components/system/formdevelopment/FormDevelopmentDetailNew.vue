<template>
  <FormDevelopmentDetail :formDevelopmentForm="formDevelopmentForm"
  :staticOptions="staticOptions"
  v-on:updateFormDevelopmentForm="updateFormDevelopmentForm"
  v-on:deleteFormDevelopmentForm="resetFormDevelopmentForm"
  v-on:new="resetFormDevelopmentForm"
  v-on:copy="resetFormDevelopmentId"/>
</template>

<script>
import FormDevelopmentDetail from '@/components/system/formdevelopment/FormDevelopmentDetail'
export default {
  name: 'formDevelopmentDetailNew',
  components: {FormDevelopmentDetail},
  data () {
    return {
      formDevelopmentForm: {
        domain: '',
        packageName: '',
        inline: '',
        labelPosition: '',
        labelWidth: '',
        size: '',
        statusIcon: '',
        id: ''
      },
      formDevelopmentResetForm: {
        domain: '',
        packageName: '',
        inline: '',
        labelPosition: '',
        labelWidth: '',
        size: '',
        statusIcon: '',
        id: ''
      },
      staticOptions: {
        sizes: ['small', 'medium', 'large']
      }
    }
  },
  methods: {
    updateFormDevelopmentForm (event) {
      this.formDevelopmentForm.id = event.id
    },
    resetFormDevelopmentId () {
      this.formDevelopmentForm.id = ''
    },
    resetFormDevelopmentForm () {
      this.formDevelopmentForm = JSON.parse(JSON.stringify(this.formDevelopmentResetForm))
    }
  },
  activated () {
    this.resetFormDevelopmentForm()
  }
}
</script>
