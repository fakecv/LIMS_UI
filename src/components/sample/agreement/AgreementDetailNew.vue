<template>
  <AgreementDetail
    ref="agreementDetail"
    :agreementForm="agreementForm"
    :staticOptions="staticOptions"
    v-on:updateCustomer="updateCustomer"
    v-on:reloadCustomerData="reloadCustomerData"
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
        distribution: '',
        distributionOption: 'no',
        duration: '',
        invoice: 'no',
        invoiceTitle: '',
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
        distribution: '',
        distributionOption: 'no',
        duration: '',
        invoice: 'no',
        invoiceTitle: '',
        imageNameList: []
      },
      staticOptions: {
        processListed: true,
        processPriorities: [],
        customers: [],
        customerNotes: [],
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
          {'name': '文件预览', 'id': '5', 'icon': 'el-icon-upload2', 'loading': false, 'show': true}
        ]
      },
      customerRequestForm: {
        company: '',
        name: '',
        itemsPerPage: 20,
        currentPage: 1
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
            message: error.response.data.message
          })
        })
    },
    agreementNumberGenerator () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/generateAgreeNumber')
        .then(function (res) {
          vm.agreementForm.agreementNumber = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadAgreement (agreementId) {
      let vm = this
      this.staticOptions.images.length = 0
      this.$ajax.get('/api/sample/agreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm = res.data
          if (res.data.imageNameList !== undefined && res.data.imageNameList.length > 0) {
            vm.agreementForm.imageNameList.forEach(image => {
              vm.downloadToFrontEnd(image, vm.agreementForm.agreementNumber)
            })
          }
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
          vm.$message(error.response.data.message)
        })
    },
    copyAgreement (agreementId) {
      let vm = this
      this.$ajax.get('/api/sample/agreement/copyAgreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm = res.data
          vm.agreementForm.testDuration = vm.agreementResetForm.testDuration
          vm.agreementForm.receiveSampleTime = new Date(Date.now())
          vm.agreementForm.expectedCompletionTime = new Date(Date.now() + 864e5 * 7)
          vm.agreementForm.done = vm.agreementResetForm.done
          vm.agreementForm.duration = vm.agreementResetForm.duration
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
          vm.$message(error.response.data.message)
        })
    },
    updateAgreementForm (event) {
      this.agreementForm = event
      this.$router.push('/lims/agreementDetailNew/' + event.id)
      this.staticOptions.processListed = false
    },
    resetAgreementId () {
      this.agreementForm.id = ''
      this.staticOptions.images.length = 0
      this.staticOptions.processListed = true
      this.agreementNumberGenerator()
    },
    newAgreementForm () {
      // it's better than vm.staticOptions.images = [], any reference will be also cleared.
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
      this.agreementForm.processPriority = this.staticOptions.processPriorities[0].processPriorityName
      this.staticOptions.images.length = 0
      this.agreementForm.receiveSampleTime = new Date(Date.now())
      this.agreementForm.expectedCompletionTime = new Date(Date.now() + 864e5 * 7)
      this.getTopOneUser()
      this.staticOptions.processListed = true
    },
    resetAgreementForm () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/deleteFileFolder/' + this.agreementForm.agreementNumber)
        .then(function (res) {
          // it's better than vm.staticOptions.images = [], any reference will be also cleared.
          vm.agreementForm = JSON.parse(JSON.stringify(vm.agreementResetForm))
          vm.staticOptions.images.length = 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    reloadCustomerData (event) {
      let vm = this
      this.$ajax.post('/api/customer/queryCustomer', event)
        .then(function (res) {
          vm.staticOptions.customers = res.data.pageResult || []
          vm.staticOptions.totalCustomers = res.data.totalCustomers || 0
        })
    },
    initCustomerData () {
      let vm = this
      this.$ajax.post('/api/customer/queryCustomer', this.customerRequestForm)
        .then(function (res) {
          vm.staticOptions.customers = res.data.pageResult || []
          vm.staticOptions.totalCustomers = res.data.totalCustomers || 0
        })
    },
    updateCustomer (row) {
      this.agreementForm.customerId = row.id
      this.agreementForm.customerName = row.name
      this.agreementForm.customerCompany = row.company
      this.agreementForm.customerMobileNumber = row.mobileNumber
      this.agreementForm.customerFax = row.fax
      this.agreementForm.customerEmail = row.email
      this.agreementForm.customerAddress = row.address
      this.agreementForm.customerInvoiceTitle = row.company
      this.agreementForm.invoiceTitle = row.company
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
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    refreshAgreement () {
      this.loadAgreement(this.$route.params.id)
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadAgreement(this.$route.params.id)
      this.staticOptions.processListed = false
    }
    this.loadProcessPriorityData()
    this.initCustomerData()
    this.initUserData()
    this.populatePrivileges()
  }
}
</script>
