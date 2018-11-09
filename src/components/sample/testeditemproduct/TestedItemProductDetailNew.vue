<template>
  <TestedItemProductDetail :testedItemProductForm="testedItemProductForm"
    :staticOptions="staticOptions"
    v-on:getCascadeItems="getCascadeItems"
    v-on:updateTestedItemProductForm="updateTestedItemProductForm"
    v-on:deleteTestedItemProductForm="resetTestedItemProductForm"
    v-on:new="resetTestedItemProductForm"
    v-on:copy="resetTestedItemProductId"
  />
</template>

<script>
import TestedItemProductDetail from '@/components/sample/testeditemproduct/TestedItemProductDetail'
export default {
  name: 'testedItemProductDetailNew',
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
        selectedTestedItemProducts: [],
        experimentalMethods: [],
        filteredExperimentalMethods: [],
        experimentalItemsParameters: [],
        filteredExperimentalItemsParameters: [],
        experimentalItems: [],
        drawingDesigns: [],
        processingStatuses: [],
        filteredDrawingDesigns: []
      }
    }
  },
  methods: {
    updateTestedItemProductForm (event) {
      this.testedItemProductForm.id = event.id
    },
    resetTestedItemProductId () {
      this.testedItemProductForm.id = ''
    },
    resetTestedItemProductForm () {
      this.testedItemProductForm = JSON.parse(JSON.stringify(this.testedItemProductResetForm))
    },
    getCascadeItems (itemId) {
      this.resetCascadeForms()
      this.getDrawingDesigns(itemId)
      this.getExperimentalMethod(itemId)
      this.getExperimentalItemsParameter(itemId)
    },
    resetCascadeForms () {
      this.testedItemProductForm.drawingDesign = ''
      this.testedItemProductForm.experimentalMethod = ''
      this.testedItemProductForm.experimentalItemsParameter = ''
    },
    getDrawingDesigns (experimentalItemId) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalMethod (experimentalItemId) {
      this.staticOptions.filteredExperimentalMethods =
        this.staticOptions.experimentalMethods.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalItemsParameter (experimentalItemId) {
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
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.loadExperimentalItemData()
    this.loadDrawingDesignData()
    this.loadExperimentalItemsParameterData()
  }
}
</script>
