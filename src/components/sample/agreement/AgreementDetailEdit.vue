<template>
  <AgreementDetail
   :agreementForm="agreementForm"
   v-on:deleteAgreement="resetAgreementForm"
   v-on:new="resetAgreementForm"
   v-on:copy="resetAgreementId"/>
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
    if (this.$route.params.id !== undefined) {
      this.loadAgreement(this.$route.params.id)
    }
  }
}
</script>
