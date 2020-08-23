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
        testCategory: '',
        price: ''
      },
      testedItemResetForm: {
        id: '',
        testedItemName: '',
        sort: '',
        testedItemNumber: '',
        testCategory: '',
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
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
  activated () {
    this.resetTestedItemForm()
    this.loadTestCategory()
  }
}
</script>
