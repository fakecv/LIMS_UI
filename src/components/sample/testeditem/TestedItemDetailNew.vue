<template>
  <TestedItemDetail
   :testedItemForm="testedItemForm"
    v-on:new="resetTestedItemForm"
    v-on:copy="resetTestedItemId"
    v-on:updateTestedItemForm="updateTestedItemForm"
    v-on:deleteTestedItemForm="resetTestedItemForm"
  />
</template>

<script>
import TestedItemDetail from '@/components/sample/testeditem/TestedItemDetail'
export default {
  name: 'testedItemDetailNew',
  components: {TestedItemDetail},
  data () {
    return {
      testedItemForm: {
        id: '',
        testedItemName: '',
        testedItemNumber: ''
      },
      testedItemResetForm: {
        id: '',
        testedItemName: '',
        testedItemNumber: ''
      }
    }
  },
  methods: {
    updateTestedItemForm (event) {
      this.testedItemForm.id = event.id
    },
    resetTestedItemId () {
      this.testedItemForm.id = ''
    },
    resetTestedItemForm () {
      this.testedItemForm = JSON.parse(JSON.stringify(this.testedItemResetForm))
    }
  },
  mounted () {
  }
}
</script>
