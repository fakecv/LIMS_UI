<template>
  <CustomerNoteDetail
   :customerNoteForm="customerNoteForm"
   :staticOptions="staticOptions"
   v-on:updateCustomerNoteForm="updateCustomerNoteForm"
   v-on:deleteCustomerNoteForm="resetCustomerNoteForm"
   v-on:new="resetCustomerNoteForm"
   v-on:copy="resetCustomerNoteId"
   v-on:loadQuotation="loadQuotation"
   v-on:auditQuotation="auditQuotation"
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
        customerCompanies: []
      }
    }
  },
  methods: {
    loadQuotation () {
      let vm = this
      this.$ajax.post('/api/illegal/bidding/quotationList/loadQuotation')
        .then(function (res) {
          console.log('load quotation')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    auditQuotation () {
      let vm = this
      this.$ajax.post('/api/illegal/bidding/quotationList/auditQuotation')
        .then(function (res) {
          console.log('audit quotation')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadCustomerCompanyData () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.staticOptions.customerCompanies = res.data
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
    this.loadCustomerCompanyData()
    this.resetCustomerNoteForm()
  }
}
</script>
