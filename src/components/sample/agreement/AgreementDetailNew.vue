<template>
  <AgreementDetail :agreementForm="agreementForm"
  v-on:updateAgreementForm="updateAgreementForm"
  v-on:deleteAgreementForm="resetAgreementForm"
  v-on:new="resetAgreementForm"
  v-on:copy="resetAgreementId"/>
</template>

<script>
import AgreementDetail from '@/components/sample/agreement/AgreementDetail'
export default {
  name: 'agreementDetailNew',
  components: {AgreementDetail},
  data () {
    return {
      agreementForm: {
        id: '',
        agreementName: '',
        agreementDescription: ''
      },
      agreementResetForm: {
        id: '',
        agreementName: '',
        agreementDescription: ''
      }
    }
  },
  methods: {
    updateAgreementForm (event) {
      this.agreementForm.id = event.id
    },
    resetAgreementId () {
      this.agreementForm.id = ''
    },
    resetAgreementForm () {
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
    }
  },
  mounted () {
  }
}
</script>
