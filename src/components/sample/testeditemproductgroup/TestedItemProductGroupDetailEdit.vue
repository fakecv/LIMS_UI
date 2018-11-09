<template>
  <TestedItemProductGroupDetail
   :testedItemProductGroupForm="testedItemProductGroupForm"
   :staticOptions="staticOptions"
   v-on:updateTestedItemProducts="updateTestedItemProducts"
   v-on:reloadTestedItemProducts="reloadTestedItemProducts"
   v-on:deleteTestedItemProducts="deleteTestedItemProducts"
   v-on:deleteTestedItemProductGroup="resetTestedItemProductGroupForm"
   v-on:new="resetTestedItemProductGroupForm"
   v-on:copy="resetTestedItemProductGroupId"
  />
</template>

<script>
import TestedItemProductGroupDetail from '@/components/sample/testeditemproductgroup/TestedItemProductGroupDetail'
export default {
  name: 'testedItemProductGroupDetailEdit',
  components: {TestedItemProductGroupDetail},
  data () {
    return {
      testedItemProductForm: {
        testedItemProductName: '',
        experimentalItem: '',
        experimentalItemsParameter: '',
        experimentalMethod: '',
        drawingDesign: '',
        itemsPerPage: 20,
        currentPage: 1,
        id: ''
      },
      testedItemProductGroupForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        testedItemProducts: [],
        id: ''
      },
      testedItemProductGroupResetForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        testedItemProducts: [],
        id: ''
      },
      staticOptions: {
        selectedTestedItemProducts: [],
        testedItemProducts: [],
        totalTestedItemProducts: '',
        experimentalMethods: [],
        filteredExperimentalMethods: [],
        experimentalItemsParameters: [],
        filteredExperimentalItemsParameters: [],
        experimentalItems: [],
        drawingDesigns: [],
        filteredDrawingDesigns: []
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
          vm.staticOptions.totalRoles = res.data.totalTestedItemProducts || 0
          vm.$refs.testedItemProductGroupDetail.addTestedItemProducts()
        })
    },
    updateTestedItemProducts (id) {
      console.log('new updateTestedItemProducts' + id)
      let vm = this
      var index = this.testedItemProductGroupForm.testedItemProducts.indexOf(id)
      if (index > -1) {
        this.testedItemProductGroupForm.testedItemProducts.splice(index, 1)
        this.staticOptions.testedItemProducts.forEach(row => {
          if (row.id === id) {
            vm.staticOptions.selectedTestedItemProducts.splice(row, 1)
          }
        })
      } else {
        this.testedItemProductGroupForm.testedItemProducts.push(id)
        this.staticOptions.testedItemProducts.forEach(row => {
          if (row.id === id) {
            vm.staticOptions.selectedTestedItemProducts.push(row)
          }
        })
      }
    },
    addTestedItemProduct (id) {
      this.testedItemProductGroupForm.testedItemProducts.push(id)
    },
    removeTestedItemProduct (id) {
      var index = this.testedItemProductGroupForm.testedItemProducts.indexOf(id)
      if (index > -1) {
        this.testedItemProductGroupForm.testedItemProducts.splice(index, 1)
      }
    },
    deleteTestedItemProducts (event) {
      let vm = this
      event.forEach(row => {
        for (var i = 0; i < vm.staticOptions.selectedTestedItemProducts.length; i++) {
          if (vm.staticOptions.selectedTestedItemProducts[i].id === row.id) {
            vm.staticOptions.selectedTestedItemProducts.splice(i, 1)
          }
        }
      })
      this.testedItemProductGroupForm.testedItemProducts = []
      this.staticOptions.selectedTestedItemProducts.forEach(row => {
        vm.testedItemProductGroupForm.testedItemProducts.push(row.id)
      })
    },
    loadTestedItemProductGroup (testedItemProductGroupId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProductGroup/' + testedItemProductGroupId)
        .then(function (res) {
          vm.testedItemProductGroupForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    initTestedItemProducts () {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProduct/queryTestedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          console.log(res.data.pageResult)
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
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadTestedItemProductGroup(this.$route.params.id)
      this.loadSelectedTestedItemProducts(this.$route.params.id)
    }
    this.initTestedItemProducts()
  }
}
</script>
