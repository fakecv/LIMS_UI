<template>
  <TestedItemProductDetail
    :testedItemProductForm="testedItemProductForm"
    :staticOptions="staticOptions"
    v-on:getCascadeItems="getCascadeItems"
    v-on:getFilteredTestItems="getFilteredTestItems"
    v-on:deleteTestedItemProductForm="resetTestedItemProductForm"
    v-on:new="resetTestedItemProductForm"
    v-on:copy="resetTestedItemProductId"/>
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
        id: '',
        processingStatuses: []

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
        drawingDesigns: [],
        filteredDrawingDesigns: []
      }
    }
  },
  methods: {
    loadTestedItemProduct (testedItemProductId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProduct/' + testedItemProductId)
        .then(function (res) {
          vm.testedItemProductForm = res.data
          // vm.staticOptions.checkedTestParameters = vm.testedItemProductForm.testParameter.split(',')
          vm.getDrawingDesigns(vm.testedItemProductForm.testedItem)
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
    getCascadeItems (itemId) {
      this.resetCascadeForms()
      this.getDrawingDesigns(itemId)
      this.getTestMethod(itemId)
      this.getTestParameter(itemId)
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === itemId) {
          this.testedItemProductForm.testedItemName = item.testedItemName
        }
      })
    },
    resetCascadeForms () {
      this.testedItemProductForm.drawingDesign = ''
      this.testedItemProductForm.testMethod = ''
      this.testedItemProductForm.testParameter = ''
    },
    getFilteredTestItems (testCategoryId) {
      this.testedItemProductForm.testedItem = ''
      this.staticOptions.filteredTestedItems =
        this.staticOptions.testedItems.filter(function (val) {
          return val.testCategory === testCategoryId
        })
    },
    getDrawingDesigns (testedItemId) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    getTestMethod (testedItemId) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
          vm.staticOptions.filteredDrawingDesigns = res.data
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
    this.loadDrawingDesignData()
    this.loadTestParameterData()
    if (this.$route.params.id !== undefined) {
      this.loadTestedItemProduct(this.$route.params.id)
    }
  }
}
</script>
