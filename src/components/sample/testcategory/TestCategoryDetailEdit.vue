<template>
  <TestCategoryDetail
   :testCategoryForm="testCategoryForm"
   v-on:deleteTestCategoryForm="resetTestCategoryForm"
   v-on:new="resetTestCategoryForm"
   v-on:copy="resetTestCategoryId"
  />
</template>

<script>
import TestCategoryDetail from '@/components/sample/testcategory/TestCategoryDetail'
export default {
  name: 'testCategoryDetailEdit',
  components: {TestCategoryDetail},
  data () {
    return {
      testCategoryForm: {
        testCategoryName: '',
        sort: '',
        testCategoryDescription: '',
        id: ''
      },
      testCategoryResetForm: {
        testCategoryName: '',
        sort: '',
        testCategoryDescription: '',
        id: ''
      }
    }
  },
  methods: {
    loadTestCategory (testCategoryId) {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/' + testCategoryId)
        .then(function (res) {
          vm.testCategoryForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetTestCategoryForm () {
      this.testCategoryForm = JSON.parse(JSON.stringify(this.testCategoryResetForm))
    },
    resetTestCategoryId () {
      this.testCategoryForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadTestCategory(this.$route.params.id)
    }
  }
}
</script>
