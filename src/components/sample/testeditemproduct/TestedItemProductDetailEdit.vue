<template>
  <TestedItemProductDetail
    :testedItemProductForm="testedItemProductForm"
    :staticOptions="staticOptions"
    v-on:getCascadeItems="getCascadeItems"
    v-on:getFilteredTestItems="getFilteredTestItems"
    v-on:deleteTestedItemProductForm="resetTestedItemProductForm"
    v-on:new="resetTestedItemProductForm"
    v-on:copy="resetTestedItemProductId"
    v-on:handleCheckedTestParametersChange="handleCheckedTestParametersChange"
    v-on:handleCheckedTestMethodsChange="handleCheckedTestMethodsChange"
    v-on:handleTestMethodCheckAllChange="handleTestMethodCheckAllChange"
    v-on:handleCheckAllChange="handleCheckAllChange"
    />
</template>

<script>
import TestedItemProductDetail from '@/components/sample/testeditemproduct/TestedItemProductDetail'
export default {
  name: 'testedItemProductDetailEdit',
  components: {TestedItemProductDetail},
  data () {
    return {
      testedItemProductForm: {
        sort: '',
        testCategory: '',
        testedItem: '',
        testedItemName: '',
        testParameter: '',
        testMethod: '',
        id: ''
      },
      testedItemProductResetForm: {
        sort: '',
        testCategory: '',
        testedItem: '',
        testedItemName: '',
        testParameter: '',
        testMethod: '',
        id: ''
      },
      staticOptions: {
        testCategories: [],
        selectedTestedItemProducts: [],
        testMethods: [],
        filteredTestMethods: [],
        checkedTestMethods: [],
        testParameters: [],
        filteredTestParameters: [],
        checkedTestParameters: [],
        testedItems: [],
        filteredTestedItems: [],
        isIndeterminate: true,
        checkAll: false,
        isTestMethodIndeterminate: true,
        testMethodCheckAll: false
      }
    }
  },
  methods: {
    loadTestedItemProduct (testedItemProductId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProduct/' + testedItemProductId)
        .then(function (res) {
          vm.testedItemProductForm = res.data
          vm.getTestMethod(vm.testedItemProductForm.testedItem)
          vm.getTestParameter(vm.testedItemProductForm.testedItem)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetTestedItemProductForm () {
      this.testedItemProductForm = JSON.parse(JSON.stringify(this.testedItemProductResetForm))
    },
    resetTestedItemProductId () {
      this.testedItemProductForm.id = ''
    },
    getFilteredTestItems (testCategoryId) {
      this.testedItemProductForm.testedItem = ''
      this.staticOptions.filteredTestedItems =
          this.staticOptions.testedItems.filter(function (val) {
            return val.testCategory === testCategoryId
          })
    },
    getCascadeItems (itemId) {
      this.resetCascadeForms()
      this.getTestMethod(itemId)
      this.getTestParameter(itemId)
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === itemId) {
          this.testedItemProductForm.testedItemName = item.testedItemName
        }
      })
    },
    resetCascadeForms () {
      this.testedItemProductForm.testMethod = ''
      this.testedItemProductForm.testParameter = ''
      this.selectedTestedItemProducts = []
      this.staticOptions.checkedTestMethods = []
      this.staticOptions.checkedTestParameters = []
      this.staticOptions.isTestMethodIndeterminate = false
      this.staticOptions.isIndeterminate = false
      this.staticOptions.testMethodCheckAll = false
      this.staticOptions.checkAll = false
    },
    getTestMethod (testedItemId) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          return val.testedItem === testedItemId
        })
      if (this.testedItemProductForm.testMethod.length > 0) {
        this.staticOptions.checkedTestMethods = this.testedItemProductForm.testMethod.split(';')
      }
    },
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
      if (this.testedItemProductForm.testParameter.length > 0) {
        this.staticOptions.checkedTestParameters = this.testedItemProductForm.testParameter.split(',')
      }
    },
    handleCheckedTestMethodsChange (methods) {
      let checkedCount1 = methods.length
      this.staticOptions.testMethodCheckAll = checkedCount1 === this.staticOptions.filteredTestMethods.length
      this.staticOptions.isTestMethodIndeterminate = checkedCount1 > 0 && checkedCount1 < this.staticOptions.filteredTestMethods.length
      this.testedItemProductForm.testMethod = methods.join(';')
    },
    handleCheckedTestParametersChange (value) {
      let checkedCount = value.length
      this.staticOptions.checkAll = checkedCount === this.staticOptions.filteredTestParameters.length
      this.staticOptions.isIndeterminate = checkedCount > 0 && checkedCount < this.staticOptions.filteredTestParameters.length
      this.testedItemProductForm.testParameter = value.join(',')
    },
    handleTestMethodCheckAllChange (val) {
      let vm = this
      this.staticOptions.checkedTestMethods = []
      if (val) {
        this.staticOptions.filteredTestMethods.forEach(testMethod => {
          vm.staticOptions.checkedTestMethods.push(testMethod.testMethodName)
        })
        this.testedItemProductForm.testMethod = this.staticOptions.checkedTestMethods.join(';')
      } else {
        this.testedItemProductForm.testMethod = ''
      }
      this.staticOptions.isTestMethodIndeterminate = false
    },
    handleCheckAllChange (val) {
      let vm = this
      this.staticOptions.checkedTestParameters = []
      if (val) {
        this.staticOptions.filteredTestParameters.forEach(testParameter => {
          vm.staticOptions.checkedTestParameters.push(testParameter.testParameterName)
        })
        this.testedItemProductForm.testParameter = this.staticOptions.checkedTestParameters.join(',')
      } else {
        this.testedItemProductForm.testParameter = ''
      }
      this.staticOptions.isIndeterminate = false
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
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
          vm.staticOptions.filteredTestedItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.staticOptions.testMethods = res.data
          vm.staticOptions.filteredTestMethods = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.staticOptions.testParameters = res.data
          vm.staticOptions.filteredTestParameters = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.loadTestCategory()
    this.loadTestedItemData()
    this.loadTestMethodData()
    this.loadTestParameterData()
    if (this.$route.params.id !== undefined) {
      this.loadTestedItemProduct(this.$route.params.id)
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadTestedItemProduct(this.$route.params.id)
    }
  }
}
</script>
