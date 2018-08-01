<template>
  <AgreementDetail :agreementForm="agreementForm"/>
</template>

<script>
import AgreementDetail from '@/components/sample/agreement/AgreementDetail'
export default {
  name: 'agreementDetailEdit',
  components: {AgreementDetail},
  data () {
    return {
      agreementForm: {
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
          vm.$message('Somthing wrong happen in loadAgreement!')
        })
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
