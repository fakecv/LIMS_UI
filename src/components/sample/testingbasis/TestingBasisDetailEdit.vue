<template>
  <TestingBasisDetail
   :testingBasisRequestForm="testingBasisRequestForm"
   :staticOptions="staticOptions"
   v-on:deleteTestingBasisForm="resetTestingBasisForm"
   v-on:new="resetTestingBasisForm"
   v-on:copy="resetTestingBasisId"
  />
</template>

<script>
import TestingBasisDetail from '@/components/sample/testingbasis/TestingBasisDetail'
export default {
  name: 'testingBasisDetailEdit',
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
    loadTestingBasis (testingBasisId) {
      let vm = this
      this.$ajax.get('/api/sample/testingBasis/' + testingBasisId)
        .then(function (res) {
          vm.testingBasisRequestForm = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    resetTestingBasisForm () {
      this.testingBasisRequestForm = JSON.parse(JSON.stringify(this.testingBasisResetForm))
    },
    resetTestingBasisId () {
      this.testingBasisRequestForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadTestingBasis(this.$route.params.id)
    }
  }
}
</script>
