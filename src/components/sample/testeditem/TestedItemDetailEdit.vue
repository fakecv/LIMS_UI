<template>
  <TestedItemDetail
   :testedItemForm="testedItemForm"
    :staticOptions="staticOptions"
   v-on:new="resetTestedItemForm"
   v-on:copy="resetTestedItemId"
   v-on:deleteTestedItem="resetTestedItemForm"
   />
</template>

<script>
import TestedItemDetail from '@/components/sample/testeditem/TestedItemDetail'
export default {
  name: 'testedItemDetailEdit',
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
    loadTestedItem (testedItemId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/' + testedItemId)
        .then(function (res) {
          vm.testedItemForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestCategory () {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/getTestCategory')
        .then(function (res) {
          vm.staticOptions.testCategories = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetTestedItemForm () {
      this.testedItemForm = JSON.parse(JSON.stringify(this.testedItemResetForm))
    },
    resetTestedItemId () {
      this.testedItemForm.id = ''
    }
  },
  mounted () {
    this.loadTestCategory()
    if (this.$route.params.id !== undefined) {
      this.loadTestedItem(this.$route.params.id)
    }
  }
}
</script>
