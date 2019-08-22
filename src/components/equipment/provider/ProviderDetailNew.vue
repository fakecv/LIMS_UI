<template>
  <ProviderDetail
   :providerForm="providerForm"
   v-on:updateProviderForm="updateProviderForm"
   v-on:deleteProviderForm="resetProviderForm"
   v-on:new="resetProviderForm"
   v-on:copy="resetProviderId"
  />
</template>

<script>
import ProviderDetail from '@/components/equipment/provider/ProviderDetail'
export default {
  name: 'providerDetailNew',
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
    updateProviderForm (event) {
      this.providerForm.id = event.id
    },
    resetProviderId () {
      this.providerForm.id = ''
    },
    resetProviderForm () {
      this.providerForm = JSON.parse(JSON.stringify(this.providerResetForm))
    }
  },
  activated () {
    this.resetProviderForm()
  }
}
</script>
