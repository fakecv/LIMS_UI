<template>
  <CustomerDetail :customerForm="customerForm"
  v-on:updateCustomerForm="updateCustomerForm"
  v-on:deleteCustomerForm="resetCustomerForm"
  v-on:new="resetCustomerForm"
  v-on:copy="resetCustomerId"/>
</template>

<script>
import CustomerDetail from '@/components/customer/CustomerDetail'
export default {
  name: 'customerDetailNew',
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
    updateCustomerForm (event) {
      this.customerForm.id = event.id
    },
    resetCustomerId () {
      this.customerForm.id = ''
    },
    resetCustomerForm () {
      this.customerForm = JSON.parse(JSON.stringify(this.customerResetForm))
    }
  },
  mounted () {
  }
}
</script>
