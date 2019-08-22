<template>
  <FormDevelopmentDetail
   :formDevelopmentForm="formDevelopmentForm"
   :staticOptions="staticOptions"
   v-on:deleteFormDevelopment="resetFormDevelopmentForm"
   v-on:new="resetFormDevelopmentForm"
   v-on:copy="resetFormDevelopmentId"/>
</template>

<script>
import FormDevelopmentDetail from '@/components/system/formdevelopment/FormDevelopmentDetail'
export default {
  name: 'formDevelopmentDetailEdit',
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
    loadFormDevelopment (formDevelopmentId) {
      let vm = this
      this.$ajax.get('/api/system/formDevelopment/' + formDevelopmentId)
        .then(function (res) {
          vm.formDevelopmentForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetFormDevelopmentForm () {
      this.formDevelopmentForm = JSON.parse(JSON.stringify(this.formDevelopmentResetForm))
    },
    resetFormDevelopmentId () {
      this.formDevelopmentForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadFormDevelopment(this.$route.params.id)
    }
  }
}
</script>
