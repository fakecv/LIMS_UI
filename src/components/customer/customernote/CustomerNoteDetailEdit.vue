<template>
  <CustomerNoteDetail
   :customerNoteForm="customerNoteForm"
   :staticOptions="staticOptions"
   v-on:deleteCustomerNoteForm="resetCustomerNoteForm"
   v-on:new="resetCustomerNoteForm"
   v-on:copy="resetCustomerNoteId"
  />
</template>

<script>
import CustomerNoteDetail from '@/components/customer/customernote/CustomerNoteDetail'
export default {
  name: 'customerNoteDetailEdit',
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
    loadCustomerNote (customerNoteId) {
      let vm = this
      this.$ajax.get('/api/customer/customerNote/' + customerNoteId)
        .then(function (res) {
          vm.customerNoteForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadCustomerData () {
      let vm = this
      this.$ajax.get('/api/customer/getCustomer')
        .then(function (res) {
          vm.staticOptions.customers = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetCustomerNoteForm () {
      this.customerNoteForm = JSON.parse(JSON.stringify(this.customerNoteResetForm))
    },
    resetCustomerNoteId () {
      this.customerNoteForm.id = ''
    }
  },
  activated () {
    this.loadCustomerData()
    if (this.$route.params.id !== undefined) {
      this.loadCustomerNote(this.$route.params.id)
    }
  }
}
</script>
