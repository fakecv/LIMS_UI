<template>
  <ExperimentalMethodDetail
   :experimentalMethodForm="experimentalMethodForm"
    v-on:new="resetExperimentalMethodForm"
    v-on:copy="resetExperimentalMethodId"
    v-on:updateExperimentalMethodForm="updateExperimentalMethodForm"
    v-on:deleteExperimentalMethodForm="resetExperimentalMethodForm"
  />
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
        experimentalMethodNumber: ''
      },
      experimentalMethodResetForm: {
        id: '',
        experimentalMethodName: '',
        experimentalMethodNumber: ''
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
