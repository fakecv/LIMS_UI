<template>
  <CustomerDetail
   :customerForm="customerForm"
   v-on:deleteCustomer="resetCustomerForm"
   v-on:new="resetCustomerForm"
   v-on:copy="resetCustomerId"/>
</template>

<script>
import CustomerDetail from '@/components/customer/CustomerDetail'
export default {
  name: 'customerDetailEdit',
  components: {CustomerDetail},
  data () {
    return {
      customerForm: {
        id: '',
        name: '',
        mobileNumber: '',
        fax: '',
        email: '',
        address: ''
      },
      customerResetForm: {
        id: '',
        name: '',
        mobileNumber: '',
        fax: '',
        email: '',
        address: ''
      }
    }
  },
  methods: {
    loadCustomer (customerId) {
      let vm = this
      this.$ajax.get('/api/customer/' + customerId)
        .then(function (res) {
          vm.customerForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetCustomerForm () {
      this.customerForm = JSON.parse(JSON.stringify(this.customerResetForm))
    },
    resetCustomerId () {
      this.customerForm.id = ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadCustomer(this.$route.params.id)
    }
  }
}
</script>
