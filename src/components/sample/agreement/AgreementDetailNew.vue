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
        agreementNumber: '',
        client: '',
        sampleName: '',
        receiveSampleTime: '',
        expectedCompletionTime: '',
        materialNumber: '',
        noOfSample: '',
        sampleClientNumber: '',
        sampleNumber: '',
        experimentalNumber: '',
        experimentalItem: '',
        experimentalMethod: '',
        comments: '',
        finishedSampleHandlingMethod: '',
        reportTransferMode: '',
        noOfReport: '',
        sampleCheckResult: '',
        experimentalCategory: '',
        privacyDeclaim: '',
        clientName: '',
        clientMobileNumber: '',
        clientFaxNumber: '',
        clientEmail: '',
        clientAdress: '',
        receiverName: '',
        receiverMobileNumber: '',
        receiverFaxNumber: '',
        receiverEmail: '',
        receiverAdress: ''
      },
      agreementResetForm: {
        id: '',
        agreementNumber: '',
        client: '',
        sampleName: '',
        receiveSampleTime: '',
        expectedCompletionTime: '',
        materialNumber: '',
        noOfSample: '',
        sampleClientNumber: '',
        sampleNumber: '',
        experimentalNumber: '',
        experimentalItem: '',
        experimentalMethod: '',
        comments: '',
        finishedSampleHandlingMethod: '',
        reportTransferMode: '',
        noOfReport: '',
        sampleCheckResult: '',
        experimentalCategory: '',
        privacyDeclaim: '',
        clientName: '',
        clientMobileNumber: '',
        clientFaxNumber: '',
        clientEmail: '',
        clientAdress: '',
        receiverName: '',
        receiverMobileNumber: '',
        receiverFaxNumber: '',
        receiverEmail: '',
        receiverAdress: ''
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
