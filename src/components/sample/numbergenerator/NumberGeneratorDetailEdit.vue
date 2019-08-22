<template>
  <NumberGeneratorDetail
   :numberGeneratorForm="numberGeneratorForm"
   v-on:deleteNumberGeneratorForm="resetNumberGeneratorForm"
   v-on:new="resetNumberGeneratorForm"
   v-on:copy="resetNumberGeneratorId"/>
</template>

<script>
import NumberGeneratorDetail from '@/components/sample/numbergenerator/NumberGeneratorDetail'
export default {
  name: 'numberGeneratorDetailEdit',
  components: {NumberGeneratorDetail},
  data () {
    return {
      numberGeneratorForm: {
        id: '',
        numberGeneratorName: '',
        numberGeneratorPrifix: '',
        numberGeneratorPostfix: '',
        numberGeneratorValue: '',
        numberGeneratorDescription: ''
      },
      numberGeneratorResetForm: {
        id: '',
        numberGeneratorName: '',
        numberGeneratorPrifix: '',
        numberGeneratorPostfix: '',
        numberGeneratorValue: '',
        numberGeneratorDescription: ''
      }
    }
  },
  methods: {
    loadNumberGenerator (numberGeneratorId) {
      let vm = this
      this.$ajax.get('/api/sample/numberGenerator/' + numberGeneratorId)
        .then(function (res) {
          vm.numberGeneratorForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetNumberGeneratorForm () {
      this.numberGeneratorForm = JSON.parse(JSON.stringify(this.numberGeneratorResetForm))
    },
    resetNumberGeneratorId () {
      this.numberGeneratorForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadNumberGenerator(this.$route.params.id)
    }
  }
}
</script>
