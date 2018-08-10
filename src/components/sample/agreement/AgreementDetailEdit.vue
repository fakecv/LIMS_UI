<template>
  <AgreementDetail
    :agreementForm="agreementForm"
    :staticOptions="staticOptions"
    v-on:deleteAgreement="resetAgreementForm"
    v-on:new="resetAgreementForm"
    v-on:copy="resetAgreementId"
    />
</template>

<script>
import AgreementDetail from '@/components/sample/agreement/AgreementDetail'
export default {
  name: 'agreementDetailEdit',
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
      },
      staticOptions: {
        experimentalMethods: []
      }
    }
  },
  methods: {
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.staticOptions.experimentalMethods = res.data
        })
    },
    loadAgreement (agreementId) {
      let vm = this
      this.$ajax.get('/api/sample/agreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetAgreementForm () {
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
    },
    resetAgreementId () {
      this.agreementForm.id = ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    this.loadExperimentalMethodData()
    if (this.$route.params.id !== undefined) {
      this.loadAgreement(this.$route.params.id)
    }
  }
}
</script>
