<template>
  <ProcessDetail
    :processForm="processForm"
      :agreementForm="agreementForm"
      :staticOptions="staticOptions"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getTestMethod="getTestMethod"
      v-on:getTestParameter="getTestParameter"
      v-on:deleteProcessForm="resetProcessForm"
      v-on:new="resetProcessForm"
      v-on:copy="resetProcessId"
      v-on:updateTestedItemTasks="updateTestedItemTasks"
      v-on:updateTestedItemTask="updateTestedItemTask"
      v-on:addTestedItemTask="addTestedItemTask"
      v-on:updateTestedItemProduct="updateTestedItemProduct"
      v-on:checkAgreement="checkAgreement"
      v-on:processReview="processReview"
    />
</template>

<script>
import ProcessDetail from '@/components/sample/process/ProcessDetail'
export default {
  name: 'processDetailEdit',
  components: {ProcessDetail},
  data () {
    return {
      agreementForm: {
        id: '',
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: ''
      },
      agreementResetForm: {
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: ''
      },
      processForm: {
        id: '',
        agreementNumber: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
      },
      processResetForm: {
        id: '',
        agreementNumber: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
      },
      staticOptions: {
        testCategories: [],
        testedItemTaskTableData: [],
        testedItemProducts: [],
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
        processingStatuses: [],
        processPriorities: [],
        departments: [],
        processTableData: [],
        agreements: []
      }
    }
  },
  methods: {
    checkAgreement (agreementNumber) {
      this.$router.push('/lims/agreementDetailEdit/' + this.fetchAgreementId(agreementNumber))
    },
    processReview (agreementNumber) {
      this.$router.push('/lims/processReview/' + agreementNumber)
    },
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.agreementNumber === agreementId) {
          vm.agreementForm.sampleName = agreement.sampleName
          vm.agreementForm.materialNumber = agreement.materialNumber
          vm.agreementForm.receiveSampleTime = agreement.receiveSampleTime
          vm.agreementForm.expectedCompletionTime = agreement.expectedCompletionTime
          // comment is overrided by process, it can't be loaded from agreement again in edit form, same for processPriority
          // vm.processForm.comment = agreement.comment
          // vm.processForm.processPriority = agreement.processPriority
        }
      })
      // to display other added processes within the same agreementId at the bottom of page.
      // this.loadAgreementProcess(agreementId)
    },
    fetchAgreementId (agreementNumber) {
      let agreementId = ''
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.agreementNumber === agreementNumber) {
          agreementId = agreement.id
        }
      })
      return agreementId
    },
    getDrawingDesigns (testedItemIds) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return testedItemIds.indexOf(val.testedItem) >= 0
        })
    },
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    getTestMethod (testedItemId) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          if (val.testedItem instanceof Array) {
            for (let i = 0; i < val.testedItem.length; i++) {
              if (val.testedItem[i] === testedItemId) {
                return true
              }
            }
          } else {
            if (val.testedItem === testedItemId) {
              return true
            }
          }
          return false
        })
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
      this.staticOptions.testedItemTaskTableData = []
      this.staticOptions.filteredDrawingDesigns = []
    },
    resetProcessId () {
      this.processForm.id = ''
    },
    updateTestedItemTasks () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProductGroup => {
        testItemProductGroup.testedItemTasks.forEach(item => {
          item.processPriority = vm.processForm.processPriority
          vm.staticOptions.testedItemTaskTableData.push(item)
        })
        // vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
        vm.fetchDrawingDesign()
      })
    },
    updateTestedItemProduct () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProduct => {
        vm.$ajax.post('/api/sample/testedItemProduct/getTestedItemTasks', testItemProduct)
          .then(function (res) {
            res.data.processPriority = vm.processForm.processPriority
            vm.staticOptions.testedItemTaskTableData.push(res.data)
            // vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
            vm.fetchDrawingDesign()
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      })
    },
    addTestedItemTask () {
      let vm = this
      vm.$ajax.get('/api/sample/testedItemProduct/getTestedItemTask')
        .then(function (res) {
          res.data.processPriority = vm.processForm.processPriority
          vm.staticOptions.testedItemTaskTableData.push(res.data)
          // vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
          // vm.fetchDrawingDesign()
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateTestedItemTask () {
      this.fetchDrawingDesign()
    },
    fetchDrawingDesign () {
      let testedItemIds = []
      this.staticOptions.testedItemTaskTableData.forEach(item => {
        testedItemIds.push(item.testedItem)
      })
      this.getDrawingDesigns(testedItemIds)
    },
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.staticOptions.agreements = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadAgreementProcess (agreementId) {
      let vm = this
      this.$ajax.get('/api/sample/process/agreement/' + agreementId)
        .then(function (res) {
          vm.staticOptions.processTableData = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestCategory () {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/getTestCategory')
        .then(function (res) {
          vm.staticOptions.testCategories = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
          vm.staticOptions.filteredTestedItems = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.staticOptions.testMethods = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.staticOptions.testParameters = res.data
        })
    },
    loadProcess (processId) {
      let vm = this
      this.$ajax.get('/api/sample/process/' + processId)
        .then(function (res) {
          vm.processForm = res.data
          vm.staticOptions.testedItemTaskTableData = vm.processForm.testedItemTasks
          vm.fetchDrawingDesign()
          vm.getAgreementInfo(vm.processForm.agreementNumber)
          vm.getTestMethod(vm.processForm.testedItem)
          vm.getTestParameter(vm.processForm.testedItem)
          // vm.getDrawingDesigns(vm.processForm.testedItem)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.staticOptions.processPriorities = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    }
  },
  mounted () {
    this.loadTestCategory()
    this.loadTestMethodData()
    this.loadTestParameterData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
    this.loadDepartment()
    this.loadAgreement()
    if (this.$route.params.id !== undefined) {
      this.loadProcess(this.$route.params.id)
    }
  }
}
</script>
