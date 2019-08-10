<template>
  <NumberGeneratorDetail :numberGeneratorForm="numberGeneratorForm"
  v-on:updateNumberGeneratorForm="updateNumberGeneratorForm"
  v-on:deleteNumberGeneratorForm="resetNumberGeneratorForm"
  v-on:new="resetNumberGeneratorForm"
  v-on:copy="resetNumberGeneratorId"/>
</template>

<script>
import NumberGeneratorDetail from '@/components/sample/numbergenerator/NumberGeneratorDetail'
export default {
  name: 'numberGeneratorDetailNew',
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
    updateNumberGeneratorForm (event) {
      this.numberGeneratorForm.id = event.id
    },
    resetNumberGeneratorId () {
      this.numberGeneratorForm.id = ''
    },
    resetNumberGeneratorForm () {
      this.numberGeneratorForm = JSON.parse(JSON.stringify(this.numberGeneratorResetForm))
    }
  },
  activated () {
    this.resetNumberGeneratorForm()
  }
}
</script>
