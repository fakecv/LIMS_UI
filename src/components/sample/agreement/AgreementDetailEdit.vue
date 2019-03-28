<template>
  <AgreementDetail
    :agreementForm="agreementForm"
    :customerForm="customerForm"
    :userForm="userForm"
    :staticOptions="staticOptions"
    v-on:updateCustomer="updateCustomer"
    v-on:reloadCustomerData="reloadCustomerData"
    v-on:updateUser="updateUser"
    v-on:reloadUserData="reloadUserData"
    v-on:deleteAgreementForm="resetAgreementForm"
    v-on:new="resetAgreementForm"
    v-on:copy="resetAgreementId"
    v-on:removeImage="removeImage"
    v-on:addImage="addImage"
    v-on:agreementNumberGenerator="agreementNumberGenerator"
    />
</template>

<script>
import AgreementDetail from '@/components/sample/agreement/AgreementDetail'
export default {
  name: 'agreementDetailEdit',
  components: {AgreementDetail},
  data () {
    return {
      agreementForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: '',
        expectedCompletionTime: '',
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
        receiverId: '',
        testDuration: '5',
        distribution: '',
        distributionOption: 'no',
        duration: '',
        invoice: 'yes',
        invoiceTitle: '',
        imageNameList: []
      },
      agreementResetForm: {
        id: '',
        agreementNumber: '',
        sampleName: '',
        receiveSampleTime: '',
        expectedCompletionTime: '',
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
        receiverId: '',
        testDuration: '5',
        distribution: '',
        distributionOption: 'no',
        duration: '',
        invoice: 'yes',
        invoiceTitle: '',
        imageNameList: []
      },
      customerForm: {},
      userForm: {},
      staticOptions: {
        processPriorities: [],
        customers: [],
        customerNotes: [],
        users: [],
        totalCustomers: 0,
        totalUsers: 0,
        actions: [
          {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false, 'show': false},
          {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false, 'show': false},
          {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false, 'show': false},
          {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false, 'show': false},
          {'name': '删除', 'id': '2', 'icon': 'el-icon-delete', 'loading': false, 'show': false},
          {'name': '文件预览', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false, 'show': true},
          {'name': '查看样品流转', 'id': '4', 'icon': 'el-icon-download', 'loading': false, 'show': true}
        ],
        images: []
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
        if (item.name === '新建' && this.staticOptions.privileges.indexOf('new') > 0) {
          item.show = true
        }
        if (item.name === '复制' && this.staticOptions.privileges.indexOf('copy') > 0) {
          item.show = true
        }
        if (item.name === '数据库保存' && this.staticOptions.privileges.indexOf('save') > 0) {
          item.show = true
        }
        if (item.name === '解锁' && this.staticOptions.privileges.indexOf('unlock') > -1) {
          item.show = true
        }
        if (item.name === '删除' && this.staticOptions.privileges.indexOf('delete') > 0) {
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
      this.$ajax.get('/api/sample/agreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm = res.data
          if (res.data.customerId !== '') {
            vm.loadCustomer(res.data.customerId)
          }
          if (res.data.receiverId !== '') {
            vm.loadReceiver(res.data.receiverId)
          }
          if (res.data.imageNameList.length > 0) {
            vm.agreementForm.imageNameList.forEach(image => {
              vm.downloadToFrontEnd(image, vm.agreementForm.agreementNumber)
            })
          }
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadCustomer (customerId) {
      let vm = this
      this.$ajax.get('/api/customer/' + customerId)
        .then(function (res) {
          vm.customerForm = res.data
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
    loadReceiver (receiverId) {
      let vm = this
      this.$ajax.get('/api/users/' + receiverId)
        .then(function (res) {
          vm.userForm = res.data
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
            imageCP.imageUrl = reader.result
            imageCP.caption = fileName
            vm.staticOptions.images.push(imageCP)
          }
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    resetAgreementId () {
      this.agreementForm.id = ''
      this.staticOptions.images.length = 0
      this.agreementNumberGenerator()
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
      this.customerForm.id = row.id
      this.customerForm.name = row.name
      this.customerForm.company = row.company
      this.customerForm.mobileNumber = row.mobileNumber
      this.customerForm.fax = row.fax
      this.customerForm.email = row.email
      this.customerForm.address = row.address
      this.agreementForm.invoiceTitle = row.company
    },
    reloadUserData () {
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
    updateUser (row) {
      this.agreementForm.receiverId = row.id
      this.userForm.name = row.name
      this.userForm.mobileNumber = row.mobileNumber
      this.userForm.fax = row.fax
      this.userForm.email = row.email
      this.userForm.address = row.address
    },
    addImage (imageCP) {
      this.agreementForm.imageNameList.push(imageCP.caption)
      this.staticOptions.images.push(imageCP)
    },
    removeImage (item) {
      let vm = this
      let downloadFormTemp = {agreementNumber: this.agreementForm.agreementNumber, fileName: item.caption}
      this.$ajax.post('/api/sample/agreement/deleteFile', downloadFormTemp)
        .then(function (res) {
          vm.staticOptions.images.forEach(image => {
            if (image.caption === item.caption) {
              vm.staticOptions.images.splice(vm.staticOptions.images.indexOf(image), 1)
              vm.agreementForm.imageNameList.splice(vm.agreementForm.imageNameList.indexOf(item.caption), 1)
            }
          })
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.loadProcessPriorityData()
    this.initCustomerData()
    this.initUserData()
    this.populatePrivileges()
    if (this.$route.params.id !== undefined) {
      this.loadAgreement(this.$route.params.id)
    }
  }
}
</script>
