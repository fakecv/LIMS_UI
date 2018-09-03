<template>
  <ExperimentalItemDetail
   :experimentalItemForm="experimentalItemForm"
    v-on:new="resetExperimentalItemForm"
    v-on:copy="resetExperimentalItemId"
    v-on:updateExperimentalItemForm="updateExperimentalItemForm"
    v-on:deleteExperimentalItemForm="resetExperimentalItemForm"
  />
</template>

<script>
import ExperimentalItemDetail from '@/components/sample/experimentalitem/ExperimentalItemDetail'
export default {
  name: 'experimentalItemDetailNew',
  components: {ExperimentalItemDetail},
  data () {
    return {
      experimentalItemForm: {
        id: '',
        experimentalItemName: '',
        experimentalItemNumber: ''
      },
      experimentalItemResetForm: {
        id: '',
        experimentalItemName: '',
        experimentalItemNumber: ''
      }
    }
  },
  methods: {
    updateExperimentalItemForm (event) {
      this.experimentalItemForm.id = event.id
    },
    resetExperimentalItemId () {
      this.experimentalItemForm.id = ''
    },
    resetExperimentalItemForm () {
      this.experimentalItemForm = JSON.parse(JSON.stringify(this.experimentalItemResetForm))
    }
  },
  mounted () {
  }
}
</script>
