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
        customerCompanies: []
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadCustomerCompanyData () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.staticOptions.customerCompanies = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
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
    this.loadCustomerCompanyData()
    if (this.$route.params.id !== undefined) {
      this.loadCustomerNote(this.$route.params.id)
    }
  }
}
</script>
