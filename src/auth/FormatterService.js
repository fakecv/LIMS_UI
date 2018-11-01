import axios from 'axios'
export default class FormatterService {
  // agreements = []
  // experimentalMethods = []
  // experimentalItems = []
  // drawingDesigns = []
  // processingStatuses = []
  // processPriorities = []
  // departments = []
  constructor (agreements,
    experimentalMethods,
    experimentalItems,
    drawingDesigns,
    processingStatuses,
    processPriorities,
    departments) {
  // constructor () {
    this.agreements = agreements
    this.experimentalMethods = experimentalMethods
    this.experimentalItems = experimentalItems
    this.drawingDesigns = drawingDesigns
    this.departments = departments
    this.processingStatuses = processingStatuses
    this.processPriorities = processPriorities
  }
  loadAgreement () {
    let vm = this
    axios.get('/api/sample/agreement/getAgreement')
      .then(function (res) {
        vm.agreements = res.data
      }).catch(function (error) {
        vm.$message(error.response.data.message)
      })
  }
  loadExperimentalMethodData () {
    let vm = this
    axios
      .get('/api/sample/experimentalMethod/getExperimentalMethod')
      .then(function (res) {
        vm.experimentalMethods = res.data
      })
  }
  loadExperimentalItemData () {
    let vm = this
    axios
      .get('/api/sample/experimentalItem/getExperimentalItem')
      .then(function (res) {
        vm.experimentalItems = res.data
      })
  }
  loadDrawingDesignData () {
    let vm = this
    axios.get('/api/sample/drawingDesign/getDrawingDesign')
      .then(function (res) {
        vm.drawingDesigns = res.data
      })
  }
  loadDepartment () {
    let vm = this
    axios.get('/api/sample/department/getDepartment')
      .then(function (res) {
        vm.departments = res.data
      }).catch(function (error) {
        vm.$message(error.response.data.message)
      })
  }
  loadProcessingStatusData () {
    let vm = this
    axios.get('/api/sample/processingStatus/getProcessingStatus')
      .then(function (res) {
        vm.processingStatuses = res.data
      })
  }
  loadProcessPriorityData () {
    let vm = this
    axios.get('/api/sample/processPriority/getProcessPriority')
      .then(function (res) {
        vm.processPriorities = res.data
      }).catch(function (error) {
        vm.$message(error.response.data.message)
      })
  }
  receiveSampleTimeFormatter (row, column) {
    if (row.receiveSampleTime) {
      let dateTT = new Date(row.receiveSampleTime)
      let hours = dateTT.getHours() < 10 ? '0' : ''
      let min = dateTT.getMinutes() < 10 ? '0' : ''
      return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
    }
  }
  departmentFormatter (row, column) {
    var that = this
    let name = ''
    that.departments.forEach(item => {
      if (row.department === item.id) {
        name = item.departmentName
      }
    })
    return name
  }
  processingStatusFormatter (row, column) {
    var that = this
    let name = ''
    that.processingStatuses.forEach(item => {
      if (row.processingStatus === item.id) {
        name = item.processingStatusName
      }
    })
    return name
  }
  processPriorityFormatter (row, column) {
    var that = this
    let name = ''
    that.processPriorities.forEach(item => {
      if (row.processPriority === item.id) {
        name = item.processPriorityName
      }
    })
    return name
  }
  experimentalMethodFormatter (row, column) {
    var that = this
    let name = ''
    that.experimentalMethods.forEach(item => {
      if (row.experimentalMethod === item.id) {
        name = item.experimentalMethodName
      }
    })
    return name
  }
  experimentalItemFormatter (row, column) {
    var that = this
    let name = ''
    that.experimentalItems.forEach(item => {
      if (row.experimentalItem === item.id) {
        name = item.experimentalItemName
      }
    })
    return name
  }
  drawingDesignFormatter (row, column) {
    var that = this
    let name = ''
    that.drawingDesigns.forEach(item => {
      if (row.drawingDesign === item.id) {
        name = item.drawingDesignName
      }
    })
    return name
  }
  agreementFormatter (row, column) {
    let name = ''
    let agreements = this.agreements
    agreements.forEach(item => {
      if (row.agreementNumber === item.id) {
        name = item.agreementNumber
      }
    })
    return name
  }
  expectedCompletionTimeFormatter (row, column) {
    if (row.expectedCompletionTime) {
      let dateTT = new Date(row.expectedCompletionTime)
      let hours = dateTT.getHours() < 10 ? '0' : ''
      let min = dateTT.getMinutes() < 10 ? '0' : ''
      return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
    }
  }
}
