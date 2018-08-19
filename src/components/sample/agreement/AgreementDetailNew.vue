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
    v-on:updateAgreementForm="updateAgreementForm"
    v-on:deleteAgreementForm="resetAgreementForm"
    v-on:new="newAgreementForm"
    v-on:copy="resetAgreementId"
    v-on:removeImage="removeImage"
    v-on:addImage="addImage"
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
        client: '',
        sampleName: '',
        receiveSampleTime: '',
        expectedCompletionTime: '',
        materialNumber: '',
        noOfSample: '',
        comments: '',
        finishedSampleHandlingMethod: '',
        reportTransferMode: [],
        reportTransferModeOther: '',
        noOfReport: '',
        sampleCheckResult: '',
        experimentalCategory: [],
        experimentalCategoryOther: '',
        privacyDeclaim: '',
        customerId: '',
        receiverId: '',
        imageNameList: []
      },
      agreementResetForm: {
        id: '',
        agreementNumber: '',
        client: '',
        sampleName: '',
        receiveSampleTime: '',
        expectedCompletionTime: '',
        materialNumber: '',
        noOfSample: '',
        comments: '',
        finishedSampleHandlingMethod: '',
        reportTransferMode: [],
        reportTransferModeOther: '',
        noOfReport: '',
        sampleCheckResult: '',
        experimentalCategory: [],
        experimentalCategoryOther: '',
        privacyDeclaim: '',
        customerId: '',
        receiverId: '',
        imageNameList: []
      },
      customerForm: {},
      userForm: {},
      staticOptions: {
        experimentalMethods: [],
        customers: [],
        users: [],
        totalCustomers: 0,
        totalUsers: 0,
        images: []
      },
      customerRequestForm: {
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
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.staticOptions.experimentalMethods = res.data
        })
    },
    updateAgreementForm (event) {
      this.agreementForm.id = event.id
    },
    resetAgreementId () {
      this.agreementForm.id = ''
      this.staticOptions.images.length = 0
    },
    newAgreementForm () {
      // it's better than vm.staticOptions.images = [], any reference will be also cleared.
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
      this.staticOptions.images.length = 0
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
    reloadCustomerData () {
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
      this.customerForm.name = row.name
      this.customerForm.mobileNumber = row.mobileNumber
      this.customerForm.fax = row.fax
      this.customerForm.email = row.email
      this.customerForm.address = row.address
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
      console.log('addImage')
      console.log(imageCP.caption)
      this.agreementForm.imageNameList.push(imageCP.caption)
      this.staticOptions.images.push(imageCP)
    },
    removeImage (item) {
      console.log('removeImage')
      let vm = this
      let downloadFormTemp = {agreementNumber: this.agreementForm.agreementNumber, fileName: item.caption}
      this.$ajax.post('/api/sample/agreement/deleteFile', downloadFormTemp)
        .then(function (res) {
          vm.staticOptions.images.forEach(image => {
            console.log(image.caption)
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
    this.loadExperimentalMethodData()
    this.initCustomerData()
    this.initUserData()
  }
}
</script>
