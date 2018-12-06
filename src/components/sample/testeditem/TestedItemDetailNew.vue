<template>
  <TestedItemDetail
   :testedItemForm="testedItemForm"
    :staticOptions="staticOptions"
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
        sort: '',
        testedItemNumber: '',
        price: ''
      },
      testedItemResetForm: {
        id: '',
        testedItemName: '',
        sort: '',
        testedItemNumber: '',
        price: ''
      },
      staticOptions: {
        testCategories: []
      }
    }
  },
  methods: {
    loadTestCategory () {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/getTestCategory')
        .then(function (res) {
          vm.staticOptions.testCategories = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
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
    this.loadTestCategory()
    this.sampleNumberGenerator()
  }
}
</script>
