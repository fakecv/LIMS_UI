<template>
  <TestMethodDetail
   :testMethodForm="testMethodForm"
   :staticOptions="staticOptions"
    v-on:new="resetTestMethodForm"
    v-on:copy="resetTestMethodId"
    v-on:updateTestMethodForm="updateTestMethodForm"
    v-on:deleteTestMethodForm="resetTestMethodForm"
  />
</template>

<script>
import TestMethodDetail from '@/components/sample/testMethod/TestMethodDetail'
export default {
  name: 'testMethodDetailNew',
  components: {TestMethodDetail},
  data () {
    return {
      testMethodForm: {
        id: '',
        testMethodName: '',
        testMethodNumber: '',
        testedItem: ''
      },
      testMethodResetForm: {
        id: '',
        testMethodName: '',
        testMethodNumber: '',
        testedItem: ''
      },
      staticOptions: {
        testedItems: []
      }
    }
  },
  methods: {
    updateTestMethodForm (event) {
      this.testMethodForm.id = event.id
    },
    resetTestMethodId () {
      this.testMethodForm.id = ''
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetTestMethodForm () {
      this.testMethodForm = JSON.parse(JSON.stringify(this.testMethodResetForm))
    }
  },
  mounted () {
    this.loadTestedItemData()
  }
}
</script>
