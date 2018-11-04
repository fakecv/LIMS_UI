<template>
  <TestedItemProductDetail
    :testedItemProductForm="testedItemProductForm"
    :staticOptions="staticOptions"
    v-on:getCascadeItems="getCascadeItems"
    v-on:getDrawingDesigns="getDrawingDesigns"
    v-on:getExperimentalMethod="getExperimentalMethod"
    v-on:getExperimentalItemsParameter="getExperimentalItemsParameter"
    v-on:deleteTestedItemProduct="resetTestedItemProductForm"
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
        testedItemProductName: '',
        experimentalItem: '',
        experimentalItemsParameter: '',
        experimentalMethod: '',
        drawingDesign: '',
        id: ''
      },
      testedItemProductResetForm: {
        testedItemProductName: '',
        experimentalItem: '',
        experimentalItemsParameter: '',
        experimentalMethod: '',
        drawingDesign: '',
        id: ''
      },
      staticOptions: {
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
    loadTestedItemProduct (testedItemProductId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProduct/' + testedItemProductId)
        .then(function (res) {
          vm.testedItemProductForm = res.data
          vm.getDrawingDesigns(vm.testedItemProductForm.experimentalItem)
          vm.$nextTick(() => {
            vm.getCascadeItems(vm.testedItemProductForm.experimentalItem)
          })
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
      console.log('getCascadeItems')
      this.getDrawingDesigns(itemId)
      this.getExperimentalMethod(itemId)
      this.getExperimentalItemsParameter(itemId)
    },
    getDrawingDesigns (experimentalItemId) {
      console.log('getDrawingDesigns')
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalMethod (experimentalItemId) {
      console.log('getExperimentalMethod')
      this.staticOptions.filteredExperimentalMethods =
        this.staticOptions.experimentalMethods.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalItemsParameter (experimentalItemId) {
      console.log('getExperimentalItemsParameter' + experimentalItemId)
      this.staticOptions.filteredExperimentalItemsParameters =
        this.staticOptions.experimentalItemsParameters.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalItemData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItem/getExperimentalItem')
        .then(function (res) {
          vm.staticOptions.experimentalItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.staticOptions.experimentalMethods = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalItemsParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItemsParameter/getExperimentalItemsParameter')
        .then(function (res) {
          vm.staticOptions.experimentalItemsParameters = res.data
        })
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.staticOptions.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadTestedItemProduct(this.$route.params.id)
    }
    this.loadExperimentalMethodData()
    this.loadExperimentalItemData()
    this.loadDrawingDesignData()
    this.loadExperimentalItemsParameterData()
  }
}
</script>
