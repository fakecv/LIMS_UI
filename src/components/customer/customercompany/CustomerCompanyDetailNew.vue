<template>
  <CustomerCompanyDetail
   :customerCompanyRequestForm="customerCompanyRequestForm"
   :staticOptions="staticOptions"
   v-on:updateCustomerCompanyForm="updateCustomerCompanyForm"
   v-on:deleteCustomerCompanyForm="resetCustomerCompanyForm"
   v-on:new="resetCustomerCompanyForm"
   v-on:copy="resetCustomerCompanyId"
  />
</template>

<script>
import CustomerCompanyDetail from '@/components/customer/customercompany/CustomerCompanyDetail'
export default {
  name: 'customerCompanyDetailNew',
  components: {CustomerCompanyDetail},
  data () {
    return {
      customerCompanyRequestForm: {
        customerCompanyName: '',
        name: '',
        mobileNumber: '',
        fax: '',
        email: '',
        address: '',
        id: ''
      },
      customerCompanyResetForm: {
        customerCompanyName: '',
        name: '',
        mobileNumber: '',
        fax: '',
        email: '',
        address: '',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    updateCustomerCompanyForm (event) {
      this.customerCompanyRequestForm.id = event.id
    },
    resetCustomerCompanyId () {
      this.customerCompanyRequestForm.id = ''
    },
    resetCustomerCompanyForm () {
      this.customerCompanyRequestForm = JSON.parse(JSON.stringify(this.customerCompanyResetForm))
    }
  },
  activated () {
    this.resetCustomerCompanyForm()
  }
}
</script>
