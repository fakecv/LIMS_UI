var experimentalMethods = [];
var experimentalItems = [];
var drawingDesigns = [];
var agreements = [];
var processingStatuses = [];
var processPriorities = [];
var departments = [];
export function receiveSampleTimeFormatter (row, column) {
  if (row.receiveSampleTime) {
    let dateTT = new Date(row.receiveSampleTime)
    let hours = dateTT.getHours() < 10 ? '0' : ''
    let min = dateTT.getMinutes() < 10 ? '0' : ''
    return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
  }
}
export function departmentFormatter (row, column) {
  var that = this
  let name = ''
  that.departments.forEach(item => {
    if (row.department === item.id) {
      name = item.departmentName
    }
  })
  return name
}
export function processingStatusFormatter (row, column) {
  var that = this
  let name = ''
  that.processingStatuses.forEach(item => {
    if (row.processingStatus === item.id) {
      name = item.processingStatusName
    }
  })
  return name
}
export function processPriorityFormatter (row, column) {
  var that = this
  let name = ''
  that.processPriorities.forEach(item => {
    if (row.processPriority === item.id) {
      name = item.processPriorityName
    }
  })
  return name
}
export function experimentalMethodFormatter (row, column) {
  var that = this
  let name = ''
  that.experimentalMethods.forEach(item => {
    if (row.experimentalMethod === item.id) {
      name = item.experimentalMethodName
    }
  })
  return name
}
export function experimentalItemFormatter (row, column) {
  var that = this
  let name = ''
  that.experimentalItems.forEach(item => {
    if (row.experimentalItem === item.id) {
      name = item.experimentalItemName
    }
  })
  return name
}
export function drawingDesignFormatter (row, column) {
  var that = this
  let name = ''
  that.drawingDesigns.forEach(item => {
    if (row.drawingDesign === item.id) {
      name = item.drawingDesignName
    }
  })
  return name
}
export function agreementFormatter (row, column) {
  var that = this
  let name = ''
  that.agreements.forEach(item => {
    if (row.agreementNumber === item.id) {
      name = item.agreementNumber
    }
  })
  return name
}
export function expectedCompletionTimeFormatter (row, column) {
  if (row.expectedCompletionTime) {
    let dateTT = new Date(row.expectedCompletionTime)
    let hours = dateTT.getHours() < 10 ? '0' : ''
    let min = dateTT.getMinutes() < 10 ? '0' : ''
    return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
  }
}
