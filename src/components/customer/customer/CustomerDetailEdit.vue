<template>
  <CustomerDetail
   :customerRequestForm="customerRequestForm"
   :staticOptions="staticOptions"
   v-on:deleteCustomerForm="resetCustomerForm"
   v-on:new="resetCustomerForm"
   v-on:copy="resetCustomerId"
  />
</template>

<script>
import CustomerDetail from '@/components/customer/customer/CustomerDetail'
export default {
  name: 'customerDetailEdit',
  components: {CustomerDetail},
  data () {
    return {
      customerRequestForm: {
        customerName: '',
        companyId: '',
        id: ''
      },
      customerResetForm: {
        customerName: '',
        companyId: '',
        id: ''
      },
      staticOptions: {
        customerCompanies: []
      }
    }
  },
  methods: {
    loadCustomerCompanyData () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.staticOptions.customerCompanies = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadCustomer (customerId) {
      let vm = this
      this.$ajax.get('/api/customer/customer/' + customerId)
        .then(function (res) {
          vm.customerRequestForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetCustomerForm () {
      this.customerRequestForm = JSON.parse(JSON.stringify(this.customerResetForm))
    },
    resetCustomerId () {
      this.customerRequestForm.id = ''
    }
  },
  activated () {
    this.loadCustomerCompanyData()
    if (this.$route.params.id !== undefined) {
      this.loadCustomer(this.$route.params.id)
    }
  }
}
</script>
