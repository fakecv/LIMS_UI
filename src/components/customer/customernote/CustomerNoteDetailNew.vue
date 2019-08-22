<template>
  <CustomerNoteDetail
   :customerNoteForm="customerNoteForm"
   :staticOptions="staticOptions"
   v-on:updateCustomerNoteForm="updateCustomerNoteForm"
   v-on:deleteCustomerNoteForm="resetCustomerNoteForm"
   v-on:new="resetCustomerNoteForm"
   v-on:copy="resetCustomerNoteId"
  />
</template>

<script>
import CustomerNoteDetail from '@/components/customer/customernote/CustomerNoteDetail'
export default {
  name: 'customerNoteDetailNew',
  components: {CustomerNoteDetail},
  data () {
    return {
      customerNoteForm: {
        customerCompany: '',
        customerNoteName: '',
        customerNoteDescription: '',
        id: ''
      },
      customerNoteResetForm: {
        customerCompany: '',
        customerNoteName: '',
        customerNoteDescription: '',
        id: ''
      },
      staticOptions: {
        customers: []
      }
    }
  },
  methods: {
    loadCustomerData () {
      let vm = this
      this.$ajax.get('/api/customer/getCustomer')
        .then(function (res) {
          vm.staticOptions.customers = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    updateCustomerNoteForm (event) {
      this.customerNoteForm.id = event.id
    },
    resetCustomerNoteId () {
      this.customerNoteForm.id = ''
    },
    resetCustomerNoteForm () {
      this.customerNoteForm = JSON.parse(JSON.stringify(this.customerNoteResetForm))
    }
  },
  activated () {
    this.loadCustomerData()
  }
}
</script>
