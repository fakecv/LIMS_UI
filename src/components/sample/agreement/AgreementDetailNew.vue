<template>
  <AgreementDetail :agreementForm="agreementForm"/>
</template>

<script>
import AgreementDetail from '@/components/sample/agreement/AgreementDetail'
export default {
  name: 'agreementDetailNew',
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
  },
  mounted () {
  }
}
</script>
