<template>
  <TestingBasisDetail
   :testingBasisRequestForm="testingBasisRequestForm"
   :staticOptions="staticOptions"
   v-on:updateTestingBasisForm="updateTestingBasisForm"
   v-on:deleteTestingBasisForm="resetTestingBasisForm"
   v-on:new="resetTestingBasisForm"
   v-on:copy="resetTestingBasisId"
  />
</template>

<script>
import TestingBasisDetail from '@/components/sample/testingbasis/TestingBasisDetail'
export default {
  name: 'testingBasisDetailNew',
  components: {TestingBasisDetail},
  data () {
    return {
      testingBasisRequestForm: {
        testingBasisName: '',
        testingBasisDescription: '',
        id: ''
      },
      testingBasisResetForm: {
        testingBasisName: '',
        testingBasisDescription: '',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    updateTestingBasisForm (event) {
      this.testingBasisRequestForm.id = event.id
    },
    resetTestingBasisId () {
      this.testingBasisRequestForm.id = ''
    },
    resetTestingBasisForm () {
      this.testingBasisRequestForm = JSON.parse(JSON.stringify(this.testingBasisResetForm))
    }
  },
  activated () {
    this.resetTestingBasisForm()
  }
}
</script>
