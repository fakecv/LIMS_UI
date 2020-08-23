<template>
  <TestParameterDetail :testParameterForm="testParameterForm"
    :staticOptions="staticOptions"
    v-on:updateTestParameterForm="updateTestParameterForm"
    v-on:deleteTestParameterForm="resetTestParameterForm"
    v-on:new="resetTestParameterForm"
    v-on:copy="resetTestParameterId"/>
</template>

<script>
import TestParameterDetail from '@/components/sample/testParameter/TestParameterDetail'
export default {
  name: 'testParameterDetailNew',
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
    updateTestParameterForm (event) {
      this.testParameterForm.id = event.id
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    resetTestParameterId () {
      this.testParameterForm.id = ''
    },
    resetTestParameterForm () {
      this.testParameterForm = JSON.parse(JSON.stringify(this.testParameterResetForm))
    }
  },
  activated () {
    this.resetTestParameterForm()
    this.loadTestedItemData()
  }
}
</script>
