<template>
  <TestedItemProductGroupDetail ref="testedItemProductGroupDetail"
    :testedItemProductGroupForm="testedItemProductGroupForm"
    :staticOptions="staticOptions"
    :testedItemTaskForm="testedItemTaskForm"
    :testedItemProductForm="testedItemProductForm"

    v-on:getFilteredTestItems="getFilteredTestItems"
    v-on:getCascadeItems="getCascadeItems"
    v-on:handleTestedItemProductSelection="handleTestedItemProductSelection"
    v-on:handleTestedItemProductCurrentChange="handleTestedItemProductCurrentChange"
    v-on:handleTestedItemProductSizeChange = "handleTestedItemProductSizeChange"
    v-on:loadTestedItemProductData="reloadTestedItemProducts"
    v-on:updateTestedItemProducts="updateTestedItemProducts"

    v-on:copy="resetTestedItemProductGroupId"
    v-on:deleteTestedItemProducts="deleteTestedItemProducts"
    v-on:deleteTestedItemProductGroupForm="resetTestedItemProductGroupForm"
    v-on:new="resetTestedItemProductGroupForm"
    v-on:updateTestedItemProductGroupForm="updateTestedItemProductGroupForm"

    v-on:loadTestedItemTask="loadTestedItemTask"
    v-on:insertTestedItemProduct="insertTestedItemProduct"
    v-on:handleTestCategoryChange="handleTestCategoryChange"
    v-on:handleTestedItemChange="handleTestedItemChange"
    v-on:handleCheckedTestParametersChange="handleCheckedTestParametersChange"
    v-on:handleCheckedTestMethodsChange="handleCheckedTestMethodsChange"
    v-on:handleTestMethodCheckAllChange="handleTestMethodCheckAllChange"
    v-on:handleCheckAllChange="handleCheckAllChange"
    v-on:loadTestedItemProduct="loadTestedItemProduct"
    v-on:newTestedItemProducts="newTestedItemProducts"
  />
</template>

<script>
import TestedItemProductGroupDetail from '@/components/sample/testeditemproductgroup/TestedItemProductGroupDetail'
export default {
  name: 'testedItemProductGroupDetailNew',
  components: {TestedItemProductGroupDetail},
  data () {
    return {
      testedItemProductGroupForm: {
        testedItemProductGroupName: '',
        sort: '',
        testedItemProductGroupDescription: '',
        testedItemTasks: [],
        id: ''
      },
      testedItemProductGroupResetForm: {
        testedItemProductGroupName: '',
        sort: '',
        testedItemProductGroupDescription: '',
        testedItemTasks: [],
        id: ''
      },
      testedItemProductForm: {
        testedItem: '',
        testParameter: '',
        testMethod: '',
        itemsPerPage: 20,
        currentPage: 1,
        testedItemProduct: ''
      },
      testedItemTaskForm: {
        testedItemProductId: '',
        testedItem: '',
        testParameter: '',
        testMethod: '',
        itemsPerPage: 20,
        currentPage: 1
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
        filteredDrawingDesigns: [],
        testedItemTaskTableData: [],
        testedItemProductTableData: [],
        totalTestedItemProducts: '',
        isIndeterminate: true,
        checkAll: false,
        isTestMethodIndeterminate: true,
        testMethodCheckAll: false
      }
    }
  },
  methods: {
    deleteTestedItemProducts (event) {
      let vm = this
      event.forEach(row => {
        for (var i = 0; i < vm.testedItemProductGroupForm.testedItemProducts.length; i++) {
          if (vm.testedItemProductGroupForm.testedItemProducts[i].id === row.id) {
            vm.testedItemProductGroupForm.testedItemProducts.splice(i, 1)
          }
        }
      })
    },
    getFilteredTestItems (testCategoryId) {
      this.testedItemProductForm.testedItem = ''
      this.staticOptions.filteredTestedItems =
          this.staticOptions.testedItems.filter(function (val) {
            return val.testCategory === testCategoryId
          })
    },
    handleTestCategoryChange (testCategoryId) {
      this.testedItemTaskForm.testedItem = ''
      this.staticOptions.filteredTestedItems =
          this.staticOptions.testedItems.filter(function (val) {
            return val.testCategory === testCategoryId
          })
    },
    getCascadeItems (itemId) {
      this.resetCascadeForms(this.testedItemProductForm)
      this.getTestMethod(itemId, this.testedItemProductForm)
      this.getTestParameter(itemId, this.testedItemProductForm)
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === itemId) {
          this.testedItemProductForm.testedItemName = item.testedItemName
        }
      })
    },
    handleTestedItemChange (itemId) {
      this.resetCascadeForms(this.testedItemTaskForm)
      this.getTestMethod(itemId, this.testedItemTaskForm)
      this.getTestParameter(itemId, this.testedItemTaskForm)
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === itemId) {
          this.testedItemTaskForm.testedItemName = item.testedItemName
        }
      })
    },
    getTestedItem (testCategoryId) {
      this.staticOptions.filteredTestedItems =
          this.staticOptions.testedItems.filter(function (val) {
            return val.testCategory === testCategoryId
          })
    },
    getTestMethod (testedItemId, form) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          return val.testedItem === testedItemId
        })
      if (form.testMethod.length > 0) {
        this.staticOptions.checkedTestMethods = form.testMethod.split(';')
      }
    },
    getTestParameter (testedItemId, form) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
      if (form.testParameter.length > 0) {
        this.staticOptions.checkedTestParameters = form.testParameter.split(',')
      }
    },
    handleCheckedTestMethodsChange (methods) {
      let checkedCount1 = methods.length
      this.staticOptions.testMethodCheckAll = checkedCount1 === this.staticOptions.filteredTestMethods.length
      this.staticOptions.isTestMethodIndeterminate = checkedCount1 > 0 && checkedCount1 < this.staticOptions.filteredTestMethods.length
      this.testedItemTaskForm.testMethod = methods.join(';')
    },
    handleCheckedTestParametersChange (value) {
      let checkedCount = value.length
      this.staticOptions.checkAll = checkedCount === this.staticOptions.filteredTestParameters.length
      this.staticOptions.isIndeterminate = checkedCount > 0 && checkedCount < this.staticOptions.filteredTestParameters.length
      this.testedItemTaskForm.testParameter = value.join(',')
    },
    handleTestMethodCheckAllChange (val) {
      let vm = this
      this.staticOptions.checkedTestMethods = []
      if (val) {
        this.staticOptions.filteredTestMethods.forEach(testMethod => {
          vm.staticOptions.checkedTestMethods.push(testMethod.testMethodName)
        })
        this.testedItemTaskForm.testMethod = this.staticOptions.checkedTestMethods.join(';')
      } else {
        this.testedItemTaskForm.testMethod = ''
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
        this.testedItemTaskForm.testParameter = this.staticOptions.checkedTestParameters.join(',')
      } else {
        this.testedItemTaskForm.testParameter = ''
      }
      this.staticOptions.isIndeterminate = false
    },
    handleTestedItemProductSelection (val) {
      this.staticOptions.selectedDialogTestedItemProducts = []
      val.forEach(item => {
        this.staticOptions.selectedDialogTestedItemProducts.push(item)
      })
    },
    handleTestedItemProductCurrentChange (val) {
      this.testedItemProductForm.currentPage = val
      this.reloadTestedItemProducts(this.testedItemProductForm)
    },
    handleTestedItemProductSizeChange (val) {
      this.testedItemProductForm.itemsPerPage = val
      this.reloadTestedItemProducts(this.testedItemProductForm)
    },
    initTestedItemProducts () {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProduct/queryTestedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.staticOptions.testedItemProducts = res.data.pageResult || []
          vm.staticOptions.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
        })
    },
    insertTestedItemProduct (form) {
      this.testedItemProductGroupForm.testedItemTasks.push(JSON.parse(JSON.stringify(form)))
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
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.staticOptions.testMethods = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.staticOptions.testParameters = res.data
        })
    },
    loadTestedItemProduct (testedItemProductId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProduct/' + testedItemProductId)
        .then(function (res) {
          vm.testedItemProductForm = res.data
          vm.getTestMethod(vm.testedItemProductForm.testedItem, this.testedItemProductForm)
          vm.getTestParameter(vm.testedItemProductForm.testedItem, this.testedItemProductForm)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestedItemTask (itemTaskForm) {
      this.testedItemTaskForm = itemTaskForm
      this.getTestedItem(itemTaskForm.testCategory)
      this.getTestMethod(itemTaskForm.testedItem, this.testedItemTaskForm)
      this.getTestParameter(itemTaskForm.testedItem, this.testedItemTaskForm)
    },
    loadSelectedTestedItemProducts (testedItemProductGroupId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProductGroup/selectedTestedItemProducts/' + testedItemProductGroupId)
        .then(function (res) {
          vm.staticOptions.selectedTestedItemProducts = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    newTestedItemProducts (id) {
      let vm = this
      vm.$ajax.get('/api/sample/testedItemProduct/getTestedItemTask')
        .then(function (res) {
          vm.testedItemTaskForm = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    reloadTestedItemProducts (testedItemProductForm) {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProduct/queryTestedItemProduct', testedItemProductForm)
        .then(function (res) {
          vm.staticOptions.testedItemProducts = res.data.pageResult || []
          vm.staticOptions.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
          // vm.$refs.testedItemProductGroupDetail.addTestedItemProducts()
        })
    },
    resetCascadeForms (form) {
      form.testMethod = ''
      form.testParameter = ''
      this.selectedTestedItemProducts = []
      this.staticOptions.checkedTestMethods = []
      this.staticOptions.checkedTestParameters = []
      this.staticOptions.isTestMethodIndeterminate = false
      this.staticOptions.isIndeterminate = false
      this.staticOptions.testMethodCheckAll = false
      this.staticOptions.checkAll = false
    },
    resetTestedItemProductGroupId () {
      this.testedItemProductGroupForm.id = ''
    },
    resetTestedItemProductGroupForm () {
      this.testedItemProductGroupForm = JSON.parse(JSON.stringify(this.testedItemProductGroupResetForm))
      this.staticOptions.selectedTestedItemProducts = []
    },
    updateRoleGroupForm (event) {
      this.testedItemProductGroupForm.id = event.id
    },
    updateTestedItemProducts () {
      let vm = this
      if (this.staticOptions.selectedDialogTestedItemProducts) {
        this.staticOptions.selectedDialogTestedItemProducts.forEach(element => {
          vm.$ajax.post('/api/sample/testedItemProduct/getTestedItemTasks', element)
            .then(function (res) {
              vm.testedItemProductGroupForm.testedItemTasks.push(res.data)
            }).catch(function (error) {
              vm.$message({
                showClose: true,
                message: error.response.data.message
              })
            })
        })
      }
    },
    updateTestedItemProductGroupForm (event) {
      this.testedItemProductGroupForm.id = event.id
    }
  },
  mounted () {
    this.initTestedItemProducts()
    this.loadTestCategory()
    this.loadTestMethodData()
    this.loadTestParameterData()
    this.loadTestedItemData()
  },
  activated () {
    this.resetTestedItemProductGroupForm()
    this.initTestedItemProducts()
    this.loadTestCategory()
    this.loadTestMethodData()
    this.loadTestParameterData()
    this.loadTestedItemData()
  }
}
</script>
