<template>
  <TestParameterDetail
   :testParameterForm="testParameterForm"
   :staticOptions="staticOptions"
   v-on:deleteTestParameterForm="resetTestParameterForm"
   v-on:new="resetTestParameterForm"
   v-on:copy="resetTestParameterId"/>
</template>

<script>
import TestParameterDetail from '@/components/sample/testParameter/TestParameterDetail'
export default {
  name: 'testParameterDetailEdit',
  components: {TestParameterDetail},
  data () {
    return {
      testParameterForm: {
        id: '',
        testParameterName: '',
        testParameterDescription: '',
        sort: ''
      },
      testParameterResetForm: {
        id: '',
        testParameterName: '',
        testParameterDescription: '',
        sort: ''
      },
      staticOptions: {
        testedItems: []
      }
    }
  },
  methods: {
    loadTestParameter (testParameterId) {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/' + testParameterId)
        .then(function (res) {
          vm.testParameterForm = res.data
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
    resetTestParameterForm () {
      this.testParameterForm = JSON.parse(JSON.stringify(this.testParameterResetForm))
    },
    resetTestParameterId () {
      this.testParameterForm.id = ''
    }
  },
  activated () {
    this.loadTestedItemData()
    if (this.$route.params.id !== undefined) {
      this.loadTestParameter(this.$route.params.id)
    }
  }
}
</script>
