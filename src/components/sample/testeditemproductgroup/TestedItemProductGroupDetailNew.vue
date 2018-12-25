<template>
  <TestedItemProductGroupDetail ref="testedItemProductGroupDetail"
   :testedItemProductGroupForm="testedItemProductGroupForm"
   :staticOptions="staticOptions"
   v-on:updateTestedItemProducts="updateTestedItemProducts"
   v-on:reloadTestedItemProducts="reloadTestedItemProducts"
   v-on:deleteTestedItemProducts="deleteTestedItemProducts"
   v-on:updateTestedItemProductGroupForm="updateTestedItemProductGroupForm"
   v-on:deleteTestedItemProductGroupForm="resetTestedItemProductGroupForm"
   v-on:new="resetTestedItemProductGroupForm"
   v-on:copy="resetTestedItemProductGroupId"
  />
</template>

<script>
import TestedItemProductGroupDetail from '@/components/sample/testeditemproductgroup/TestedItemProductGroupDetail'
export default {
  name: 'testedItemProductGroupDetailNew',
  components: {TestedItemProductGroupDetail},
  data () {
    return {
      testedItemProductForm: {
        testedItemProductName: '',
        testedItem: '',
        testParameter: '',
        testMethod: '',
        drawingDesign: '',
        itemsPerPage: 20,
        currentPage: 1,
        id: ''
      },
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
      staticOptions: {
        testCategories: [],
        selectedTestedItemProducts: [],
        selectedDialogTestedItemProducts: [],
        testMethods: [],
        filteredTestMethods: [],
        testParameters: [],
        filteredTestParameters: [],
        checkedTestParameters: [],
        testedItems: [],
        filteredTestedItems: [],
        drawingDesigns: [],
        filteredDrawingDesigns: [],
        totalTestedItemProducts: 0
      }
    }
  },
  methods: {
    updateRoleGroupForm (event) {
      this.testedItemProductGroupForm.id = event.id
    },
    reloadTestedItemProducts (event) {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProduct/queryTestedItemProduct', event)
        .then(function (res) {
          vm.staticOptions.testedItemProducts = res.data.pageResult || []
          vm.staticOptions.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
          // vm.$refs.testedItemProductGroupDetail.addTestedItemProducts()
        })
    },
    updateTestedItemProducts () {
      let vm = this
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
    },
    deleteTestedItemProducts (event) {
      let vm = this
      event.forEach(row => {
        for (var i = 0; i < vm.testedItemProductGroupForm.testedItemTasks.length; i++) {
          if (vm.testedItemProductGroupForm.testedItemTasks[i].id === row.id) {
            vm.testedItemProductGroupForm.testedItemTasks.splice(i, 1)
          }
        }
      })
    },
    initTestedItemProducts () {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProduct/queryTestedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.staticOptions.testedItemProducts = res.data.pageResult || []
          vm.staticOptions.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
        })
    },
    updateTestedItemProductGroupForm (event) {
      this.testedItemProductGroupForm.id = event.id
    },
    resetTestedItemProductGroupId () {
      this.testedItemProductGroupForm.id = ''
    },
    resetTestedItemProductGroupForm () {
      this.testedItemProductGroupForm = JSON.parse(JSON.stringify(this.testedItemProductGroupResetForm))
      this.staticOptions.selectedTestedItemProducts = []
    }
  },
  mounted () {
    this.initTestedItemProducts()
  }
}
</script>
