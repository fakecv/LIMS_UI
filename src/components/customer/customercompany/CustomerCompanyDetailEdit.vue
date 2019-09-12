<template>
  <CustomerCompanyDetail
   :customerCompanyRequestForm="customerCompanyRequestForm"
   :staticOptions="staticOptions"
   v-on:deleteCustomerCompanyForm="resetCustomerCompanyForm"
   v-on:new="resetCustomerCompanyForm"
   v-on:copy="resetCustomerCompanyId"
  />
</template>

<script>
import CustomerCompanyDetail from '@/components/customer/customercompany/CustomerCompanyDetail'
export default {
  name: 'customerCompanyDetailEdit',
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
    loadCustomerCompany (customerCompanyId) {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/' + customerCompanyId)
        .then(function (res) {
          vm.customerCompanyRequestForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetCustomerCompanyForm () {
      this.customerCompanyRequestForm = JSON.parse(JSON.stringify(this.customerCompanyResetForm))
    },
    resetCustomerCompanyId () {
      this.customerCompanyRequestForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadCustomerCompany(this.$route.params.id)
    }
  }
}
</script>
