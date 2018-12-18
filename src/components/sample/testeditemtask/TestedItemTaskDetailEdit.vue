<template>
  <TestedItemTaskDetail
   :testedItemTaskForm="testedItemTaskForm"
   :staticOptions="staticOptions"
    v-on:getCascadeItems="getCascadeItems"
   v-on:deleteTestedItemTaskForm="resetTestedItemTaskForm"
   v-on:new="resetTestedItemTaskForm"
   v-on:copy="resetTestedItemTaskId"
  />
</template>

<script>
import TestedItemTaskDetail from '@/components/sample/testeditemtask/TestedItemTaskDetail'
export default {
  name: 'testedItemTaskDetailEdit',
  components: {TestedItemTaskDetail},
  data () {
    return {
      testedItemTaskForm: {
        testedItemTaskName: '',
        testedItem: '',
        testedItemName: '',
        testParameter: [],
        testMethod: '',
        processPriority: '',
        id: ''
      },
      testedItemTaskResetForm: {
        testedItemTaskName: '',
        testedItem: '',
        testedItemName: '',
        testParameter: [],
        testMethod: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: '',
        processPriority: '',
        id: ''
      },
      staticOptions: {
        testMethods: [],
        filteredTestMethods: [],
        testParameters: [],
        filteredTestItemsParameters: [],
        testedItems: [],
        drawingDesigns: [],
        filteredDrawingDesigns: []
      }
    }
  },
  methods: {
    loadTestedItemTask (testedItemTaskId) {
      let vm = this
      this.$ajax.get('/api/sample/testedItemTask/' + testedItemTaskId)
        .then(function (res) {
          vm.testedItemTaskForm = res.data
          vm.getDrawingDesigns(vm.testedItemTaskForm.testedItem)
          vm.getTestMethod(vm.testedItemTaskForm.testedItem)
          vm.getTestParameter(vm.testedItemTaskForm.testedItem)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    updateTestedItemTaskForm (event) {
      this.testedItemTaskForm.id = event.id
    },
    resetTestedItemTaskId () {
      this.testedItemTaskForm.id = ''
    },
    resetTestedItemTaskForm () {
      this.testedItemTaskForm = JSON.parse(JSON.stringify(this.testedItemTaskResetForm))
    },
    getCascadeItems (itemId) {
      this.resetCascadeForms()
      this.getDrawingDesigns(itemId)
      this.getTestMethod(itemId)
      this.getTestParameter(itemId)
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === itemId) {
          this.testedItemTaskForm.testedItemName = item.testedItemName
        }
      })
    },
    resetCascadeForms () {
      this.testedItemTaskForm.drawingDesign = ''
      this.testedItemTaskForm.testMethod = ''
      this.testedItemTaskForm.testParameter = ''
    },
    getDrawingDesigns (testedItemId) {
      console.log(this.drawingDesigns)
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
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          console.log('loadDrawingDesignData')
          console.log(res.data)
          vm.staticOptions.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.staticOptions.processPriorities = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          console.log(res.data)
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
    drawingDesignFormatter (row, column) {
      let name = ''
      this.staticOptions.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.staticOptions.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    },
    testMethodFormatter (row, column) {
      let name = ''
      this.staticOptions.testMethods.forEach(item => {
        if (row.testMethod === item.id) {
          name = item.testMethodName
        }
      })
      return name
    },
    testParameterFormatter (row, column) {
      let name = ''
      this.staticOptions.testParameters.forEach(item => {
        if (row.testParameter === item.id) {
          name = item.testParameterName
        }
      })
      return name
    }
  },
  mounted () {
    this.loadTestMethodData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadTestParameterData()
    this.loadDepartment()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
    if (this.$route.params.id !== undefined) {
      this.loadTestedItemTask(this.$route.params.id)
    }
  }
}
</script>
