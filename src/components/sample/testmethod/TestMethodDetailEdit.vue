<template>
  <TestMethodDetail
   :testMethodForm="testMethodForm"
   :staticOptions="staticOptions"
   v-on:new="resetTestMethodForm"
   v-on:copy="resetTestMethodId"
   v-on:deleteTestMethodForm="resetTestMethodForm"
   />
</template>

<script>
import TestMethodDetail from '@/components/sample/testMethod/TestMethodDetail'
export default {
  name: 'testMethodDetailEdit',
  components: {TestMethodDetail},
  data () {
    return {
      testMethodForm: {
        id: '',
        testMethodName: '',
        sort: '',
        testMethodNumber: '',
        testedItem: ''
      },
      testMethodResetForm: {
        id: '',
        testMethodName: '',
        sort: '',
        testMethodNumber: '',
        testedItem: ''
      },
      staticOptions: {
        testedItems: []
      }
    }
  },
  methods: {
    loadTestMethod (testMethodId) {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/' + testMethodId)
        .then(function (res) {
          vm.testMethodForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    },
    resetTestMethodId () {
      this.testMethodForm.id = ''
      // this.testMethodForm.sort = ''
    }
  },
  activated () {
    this.loadTestedItemData()
    if (this.$route.params.id !== undefined) {
      this.loadTestMethod(this.$route.params.id)
    }
  }
}
</script>
