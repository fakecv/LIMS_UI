<template>
  <ProviderDetail
   :providerForm="providerForm"
   :staticOptions="staticOptions"
   v-on:deleteProviderForm="resetProviderForm"
   v-on:new="resetProviderForm"
   v-on:copy="resetProviderId"
  />
</template>

<script>
import ProviderDetail from '@/components/equipment/provider/ProviderDetail'
export default {
  name: 'providerDetailEdit',
  components: {ProviderDetail},
  data () {
    return {
      providerForm: {
        providerName: '',
        sort: '',
        providerAddress: '',
        providerMobile: '',
        providerType: '',
        product: '',
        service: '',
        inclusionDate: '',
        note: '',
        id: ''
      },
      providerResetForm: {
        providerName: '',
        sort: '',
        providerAddress: '',
        providerMobile: '',
        providerType: '',
        product: '',
        service: '',
        inclusionDate: '',
        note: '',
        id: ''
      }
    }
  },
  methods: {
    loadProvider (providerId) {
      let vm = this
      this.$ajax.get('/api/equipment/provider/' + providerId)
        .then(function (res) {
          vm.providerForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetProviderForm () {
      this.providerForm = JSON.parse(JSON.stringify(this.providerResetForm))
    },
    resetProviderId () {
      this.providerForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadProvider(this.$route.params.id)
    }
  }
}
</script>
