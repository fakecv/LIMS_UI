<template>
  <CustomerDetail
   :customerRequestForm="customerRequestForm"
   :staticOptions="staticOptions"
   v-on:updateCustomerForm="updateCustomerForm"
   v-on:deleteCustomerForm="resetCustomerForm"
   v-on:new="resetCustomerForm"
   v-on:copy="resetCustomerId"
  />
</template>

<script>
import CustomerDetail from '@/components/customer/customer/CustomerDetail'
export default {
  name: 'customerDetailNew',
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
    updateCustomerForm (event) {
      this.customerRequestForm.id = event.id
    },
    resetCustomerId () {
      this.customerRequestForm.id = ''
    },
    resetCustomerForm () {
      this.customerRequestForm = JSON.parse(JSON.stringify(this.customerResetForm))
    }
  },
  activated () {
    this.loadCustomerCompanyData()
    this.resetCustomerForm()
  }
}
</script>
