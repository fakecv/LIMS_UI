<template>
  <AgreementDetail
    :agreementForm="agreementForm"
    :customerForm="customerForm"
    :userForm="userForm"
    :staticOptions="staticOptions"
    v-on:updateCustomer="updateCustomer"
    v-on:reloadCustomerData="reloadCustomerData"
    v-on:updateAgreementForm="updateAgreementForm"
    v-on:deleteAgreementForm="resetAgreementForm"
    v-on:new="resetAgreementForm"
    v-on:copy="resetAgreementId"
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
        sampleClientNumber: '',
        sampleNumber: '',
        experimentalNumber: '',
        experimentalItem: '',
        experimentalMethod: '',
        comments: '',
        finishedSampleHandlingMethod: '',
        reportTransferMode: '',
        noOfReport: '',
        sampleCheckResult: '',
        experimentalCategory: '',
        privacyDeclaim: '',
        clientName: '',
        clientMobileNumber: '',
        clientFaxNumber: '',
        clientEmail: '',
        clientAdress: '',
        receiverName: '',
        receiverMobileNumber: '',
        receiverFaxNumber: '',
        receiverEmail: '',
        receiverAdress: ''
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
        sampleClientNumber: '',
        sampleNumber: '',
        experimentalNumber: '',
        experimentalItem: '',
        experimentalMethod: '',
        comments: '',
        finishedSampleHandlingMethod: '',
        reportTransferMode: '',
        noOfReport: '',
        sampleCheckResult: '',
        experimentalCategory: '',
        privacyDeclaim: '',
        clientName: '',
        clientMobileNumber: '',
        clientFaxNumber: '',
        clientEmail: '',
        clientAdress: '',
        receiverName: '',
        receiverMobileNumber: '',
        receiverFaxNumber: '',
        receiverEmail: '',
        receiverAdress: ''
      },
      customerForm: {},
      userForm: {},
      staticOptions: {
        experimentalMethods: [],
        customers: [],
        users: [],
        totalCustomers: 0
      },
      customerRequestForm: {
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
    },
    resetAgreementForm () {
      this.agreementForm = JSON.parse(JSON.stringify(this.agreementResetForm))
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
      this.customerForm.name = row.name
      this.customerForm.mobileNumber = row.mobileNumber
      this.customerForm.fax = row.fax
      this.customerForm.email = row.email
      this.customerForm.address = row.address
    }
  },
  mounted () {
    this.loadExperimentalMethodData()
    this.initCustomerData()
  }
}
</script>
