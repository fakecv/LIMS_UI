<template>
  <AgreementDetail
    ref="agreementDetail"
    :agreementForm="agreementForm"
    :staticOptions="staticOptions"
    v-on:updateCustomerCompany="updateCustomerCompany"
    v-on:updateCustomer="updateCustomer"
    v-on:updateUser="updateUser"
    v-on:reloadUserData="reloadUserData"
    v-on:updateAgreementForm="updateAgreementForm"
    v-on:deleteAgreementForm="resetAgreementForm"
    v-on:new="newAgreementForm"
    v-on:copy="copyAgreement"
    v-on:removeImage="removeImage"
    v-on:addImage="addImage"
    v-on:agreementNumberGenerator="agreementNumberGenerator"
    v-on:refreshAgreement="refreshAgreement"
    />
</template>

<script>
import AgreementDetail from '@/components/sample/agreement/AgreementDetail'
export default {
  name: 'agreementDetailNew',
  components: {AgreementDetail},
  data () {
    return {
      agreementForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: new Date(Date.now()),
        expectedCompletionTime: new Date(Date.now() + 864e5 * 7),
        processPriority: '',
        materialNumber: '',
        noOfSample: '1组(2件)',
        done: 'false',
        comment: '',
        finishedSampleHandlingMethod: '1',
        reportTransferMode: ['取'],
        reportTransferModeOther: '',
        noOfReport: '1',
        sampleCheckResult: 'yes',
        sampleCheckResultNotes: '',
        experimentalCategory: '委托检测',
        sampleStoreRequest: '',
        privacyDeclaim: '',
        customerId: '',
        customerName: '',
        customerCompany: '',
        customerMobileNumber: '',
        customerFax: '',
        customerEmail: '',
        customerAddress: '',
        receiverName: '',
        receiverMobileNumber: '',
        receiverFax: '',
        receiverEmail: '',
        receiverAddress: '',
        testDuration: '5',
        distribution: '当面',
        distributionOption: 'yes',
        duration: '',
        invoice: 'no',
        invoiceTitle: '',
        samplingBasis: '',
        testingBasis: '',
        sampleSpecification: '',
        imageNameList: []
      },
      agreementResetForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: new Date(Date.now()),
        expectedCompletionTime: new Date(Date.now() + 864e5 * 7),
        processPriority: '',
        materialNumber: '',
        noOfSample: '1组(2件)',
        done: 'false',
        comment: '',
        finishedSampleHandlingMethod: '1',
        reportTransferMode: ['取'],
        reportTransferModeOther: '',
        noOfReport: '1',
        sampleCheckResult: 'yes',
        sampleCheckResultNotes: '',
        experimentalCategory: '委托检测',
        sampleStoreRequest: '',
        privacyDeclaim: '',
        customerId: '',
        customerName: '',
        customerCompany: '',
        customerMobileNumber: '',
        customerFax: '',
        customerEmail: '',
        customerAddress: '',
        receiverName: '',
        receiverMobileNumber: '',
        receiverFax: '',
        receiverEmail: '',
        receiverAddress: '',
        testDuration: '5',
        distribution: '当面',
        distributionOption: 'yes',
        duration: '',
        invoice: 'no',
        invoiceTitle: '',
        samplingBasis: '',
        testingBasis: '',
        sampleSpecification: '',
        imageNameList: []
      },
      staticOptions: {
        processListed: true,
        processPriorities: [],
        customerNames: [],
        customerNotes: [],
        testingBasises: [],
        sampleNumbers: [],
        users: [],
        totalCustomers: 0,
        totalUsers: 0,
        images: [],
        privileges: '',
        actions: [
          {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false, 'show': false},
          {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false, 'show': false},
          {'name': '保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false, 'show': false},
          {'name': '删除', 'id': '4', 'icon': 'el-icon-delete', 'loading': false, 'show': false},
          {'name': '文件预览', 'id': '5', 'icon': 'el-icon-upload2', 'loading': false, 'show': false},
          {'name': '保存为模板', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false, 'show': false}
          // {'name': '下载委托协议', 'id': '7', 'icon': 'el-icon-upload2', 'loading': false, 'show': true},
          // {'name': '下载样品加工及流程表', 'id': '8', 'icon': 'el-icon-upload2', 'loading': false, 'show': true},
          // {'name': '下载检测任务单', 'id': '9', 'icon': 'el-icon-upload2', 'loading': false, 'show': true}
        ]
      },
      userRequestForm: {
        name: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    displayActions () {
      this.staticOptions.actions.forEach(item => {
        if (item.name === '新建' && this.staticOptions.privileges.indexOf('new') > -1) {
          item.show = true
        }
        if (item.name === '复制' && this.staticOptions.privileges.indexOf('copy') > -1) {
          item.show = true
        }
        if (item.name === '保存' && this.staticOptions.privileges.indexOf('save') > -1) {
          item.show = true
        }
        if (item.name === '解锁' && this.staticOptions.privileges.indexOf('unlock') > -1) {
          item.show = true
        }
        if (item.name === '删除' && this.staticOptions.privileges.indexOf('delete') > -1) {
          item.show = true
        }
        if (item.name === '文件预览' && this.staticOptions.privileges.indexOf('preview') > -1) {
          item.show = true
        }
        if (item.name === '保存为模板' && this.staticOptions.privileges.indexOf('saveAsTemplate') > -1) {
          item.show = true
        }
      })
    },
    populatePrivileges () {
      let vm = this
      this.$ajax.get('/api/users/getPrivileges/' + '_lims_agreementDetailNew')
        .then(function (res) {
          vm.staticOptions.privileges = res.data
          vm.displayActions()
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.detail
          })
        })
    },
    agreementNumberGenerator () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/generateAgreeNumber')
        .then(function (res) {
          vm.agreementForm.agreementNumber = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadAgreement (agreementId) {
      let vm = this
      if (this.staticOptions.images) {
        this.staticOptions.images.length = 0
      }
      this.$ajax.get('/api/sample/agreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm = res.data
          if (res.data.imageNameList && res.data.imageNameList !== undefined && res.data.imageNameList.length > 0) {
            vm.agreementForm.imageNameList.forEach(image => {
              vm.downloadToFrontEnd(image, vm.agreementForm.agreementNumber)
            })
          }
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    downloadToFrontEnd (fileName, agreementId) {
      let vm = this
      let downloadFormTemp = {agreementNumber: agreementId, fileName: fileName}
      var reader = new FileReader()
      this.$ajax.post('/api/sample/agreement/downloadFile', downloadFormTemp, { responseType: 'blob' })
        .then(function (res) {
          reader.readAsDataURL(res.data)
          reader.onload = function () {
            var imageCP = {}
            imageCP.url = reader.result
            imageCP.title = fileName
            vm.staticOptions.images.push(imageCP)
          }
        }).catch(function (error) {
          reader.onload = function () {
            let jsonData = JSON.parse(this.result)
            vm.$message(jsonData.message)
          }
          reader.readAsText(error.response.data)
        })
    },
    copyAgreement (agreementId) {
      let vm = this
      this.$ajax.get('/api/sample/agreement/copyAgreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm.id = res.data.id
          vm.agreementForm.agreementNumber = res.data.agreementNumber
          vm.agreementForm.processPriority = ''
          vm.agreementForm.testDuration = vm.agreementResetForm.testDuration
          vm.agreementForm.receiveSampleTime = new Date(Date.now())
          vm.agreementForm.expectedCompletionTime = new Date(Date.now() + 864e5 * 7)
          vm.agreementForm.done = vm.agreementResetForm.done
          vm.agreementForm.duration = vm.agreementResetForm.duration
          vm.agreementForm.imageNameList = []
          if (vm.staticOptions.images) {
            vm.staticOptions.images.length = 0
          }
          vm.$router.push('/lims/agreementDetailNew/' + vm.agreementForm.id)
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.staticOptions.processPriorities = res.data
          vm.agreementForm.processPriority = vm.staticOptions.processPriorities[0].processPriorityName
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestingBasis () {
      let vm = this
      this.$ajax.get('/api/sample/testingBasis/getTestingBasis')
        .then(function (res) {
          vm.staticOptions.testingBasises = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateAgreementForm (event) {
      this.agreementForm = event
      this.$router.push('/lims/agreementDetailNew/' + event.id)
      this.staticOptions.processListed = false
    },
    newAgreementForm () {
      // it's better than vm.staticOptions.images = [], any reference will be also cleared.
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
      this.agreementForm.processPriority = this.staticOptions.processPriorities[0].processPriorityName
      if (this.staticOptions.images) {
        this.staticOptions.images.length = 0
      }
      this.agreementForm.receiveSampleTime = new Date(Date.now())
      this.agreementForm.expectedCompletionTime = new Date(Date.now() + 864e5 * 7)
      this.getTopOneUser()
      this.staticOptions.processListed = true
      this.$refs.agreementDetail.activeName = 'agreement'
    },
    resetAgreementForm () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/deleteFileFolder/' + this.agreementForm.agreementNumber)
        .then(function (res) {
          vm.newAgreementForm()
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateCustomerCompany (row) {
      this.agreementForm.customerId = row.id
      this.agreementForm.customerName = row.name
      this.agreementForm.customerCompany = row.customerCompanyName
      this.agreementForm.customerMobileNumber = row.mobileNumber
      this.agreementForm.customerFax = row.fax
      this.agreementForm.customerEmail = row.email
      this.agreementForm.customerAddress = row.address
      this.agreementForm.customerInvoiceTitle = row.customerCompanyName
      this.agreementForm.invoiceTitle = row.customerCompanyName
      this.getCustomerNames(row.id)
    },
    updateCustomer (row) {
      this.staticOptions.customerNames.forEach(item => {
        if (item.id === row) {
          this.agreementForm.customerName = item.customerName
          this.agreementForm.customerMobileNumber = item.mobileNumber
          this.agreementForm.customerEmail = item.email
        }
      })
    },
    getCustomerNames (customerCompanyId) {
      let vm = this
      this.$ajax.get('/api/customer/customer/getCustomerNames/' + customerCompanyId)
        .then(function (res) {
          vm.staticOptions.customerNames = res.data || []
        })
    },
    reloadUserData (event) {
      let vm = this
      this.$ajax.post('/api/users/queryApplicationUser', event)
        .then(function (res) {
          vm.staticOptions.users = res.data.pageResult || []
          vm.staticOptions.totalUsers = res.data.totalUsers || 0
        })
    },
    initUserData () {
      let vm = this
      this.$ajax.post('/api/users/queryApplicationUser', this.userRequestForm)
        .then(function (res) {
          vm.staticOptions.users = res.data.pageResult || []
          vm.staticOptions.totalUsers = res.data.totalUsers || 0
        })
    },
    getTopOneUser () {
      let vm = this
      this.$ajax.get('/api/users/getTopOne')
        .then(function (res) {
          vm.agreementForm.receiverName = res.data.name
          vm.agreementForm.receiverMobileNumber = res.data.mobileNumber
          vm.agreementForm.receiverFax = res.data.fax
          vm.agreementForm.receiverEmail = res.data.email
          vm.agreementForm.receiverAddress = res.data.address
        })
    },
    updateUser (row) {
      this.agreementForm.reeiverName = row.name
      this.agreementForm.receiverName = row.name
      this.agreementForm.receiverMobileNumber = row.mobileNumber
      this.agreementForm.receiverFax = row.fax
      this.agreementForm.receiverEmail = row.email
      this.agreementForm.receiverAddress = row.address
    },
    addImage (imageCP) {
      this.agreementForm.imageNameList.push(imageCP.title)
      this.staticOptions.images.push(imageCP)
    },
    removeImage (item) {
      let vm = this
      let downloadFormTemp = {agreementNumber: this.agreementForm.agreementNumber, fileName: item.title}
      this.$ajax.post('/api/sample/agreement/deleteFile', downloadFormTemp)
        .then(function (res) {
          vm.staticOptions.images.forEach(image => {
            if (image.title === item.title) {
              vm.staticOptions.images.splice(vm.staticOptions.images.indexOf(image), 1)
              vm.agreementForm.imageNameList.splice(vm.agreementForm.imageNameList.indexOf(item.title), 1)
            }
          })
          vm.saveToDB()
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/agreement', this.agreementForm)
        .then(function (res) {
          vm.$message('图片已删除!')
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    refreshAgreement (event) {
      this.loadAgreement(event)
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadAgreement(this.$route.params.id)
      this.staticOptions.processListed = false
    }
    this.loadProcessPriorityData()
    this.initUserData()
    this.populatePrivileges()
    this.loadTestingBasis()
    this.$refs.agreementDetail.activeName = 'agreement'
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'agreementTemplateMaintenance') {
      next(vm => {
        vm.$message('已复制模板！')
      })
    } else {
      next()
    }
  }
}
</script>
