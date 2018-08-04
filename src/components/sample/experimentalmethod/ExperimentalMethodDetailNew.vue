<template>
  <ExperimentalMethodDetail :experimentalMethodForm="experimentalMethodForm"
  v-on:updateExperimentalMethodForm="updateExperimentalMethodForm"
  v-on:deleteExperimentalMethodForm="resetExperimentalMethodForm"
  v-on:new="resetExperimentalMethodForm"
  v-on:copy="resetExperimentalMethodId"/>
</template>

<script>
import ExperimentalMethodDetail from '@/components/sample/experimentalMethod/ExperimentalMethodDetail'
export default {
  name: 'experimentalMethodDetailNew',
  components: {ExperimentalMethodDetail},
  data () {
    return {
      experimentalMethodForm: {
        id: '',
        experimentalMethodName: '',
        experimentalMethodDescription: ''
      },
      experimentalMethodResetForm: {
        id: '',
        experimentalMethodName: '',
        experimentalMethodDescription: ''
      }
    }
  },
  methods: {
    updateExperimentalMethodForm (event) {
      this.experimentalMethodForm.id = event.id
    },
    resetExperimentalMethodId () {
      this.experimentalMethodForm.id = ''
    },
    resetExperimentalMethodForm () {
      this.experimentalMethodForm = JSON.parse(JSON.stringify(this.experimentalMethodResetForm))
    }
  },
  mounted () {
  }
}
</script>
