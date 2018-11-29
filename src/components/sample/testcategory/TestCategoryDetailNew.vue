<template>
  <TestCategoryDetail
   :testCategoryForm="testCategoryForm"
   v-on:updateTestCategoryForm="updateTestCategoryForm"
   v-on:deleteTestCategoryForm="resetTestCategoryForm"
   v-on:new="resetTestCategoryForm"
   v-on:copy="resetTestCategoryId"
  />
</template>

<script>
import TestCategoryDetail from '@/components/sample/testcategory/TestCategoryDetail'
export default {
  name: 'testCategoryDetailNew',
  components: {TestCategoryDetail},
  data () {
    return {
      testCategoryForm: {
        testCategoryName: '',
        testCategoryDescription: '',
        id: ''
      },
      testCategoryResetForm: {
        testCategoryName: '',
        testCategoryDescription: '',
        id: ''
      }
    }
  },
  methods: {
    updateTestCategoryForm (event) {
      this.testCategoryForm.id = event.id
    },
    resetTestCategoryId () {
      this.testCategoryForm.id = ''
    },
    resetTestCategoryForm () {
      this.testCategoryForm = JSON.parse(JSON.stringify(this.testCategoryResetForm))
    }
  },
  mounted () {
  }
}
</script>
