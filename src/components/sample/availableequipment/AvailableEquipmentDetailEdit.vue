<template>
  <AvailableEquipmentDetail
   :availableEquipmentRequestForm="availableEquipmentRequestForm"
   :staticOptions="staticOptions"
   v-on:deleteAvailableEquipmentForm="resetAvailableEquipmentForm"
   v-on:new="resetAvailableEquipmentForm"
   v-on:copy="resetAvailableEquipmentId"
  />
</template>

<script>
import AvailableEquipmentDetail from '@/components/sample/availableequipment/AvailableEquipmentDetail'
export default {
  name: 'availableEquipmentDetailEdit',
  components: {AvailableEquipmentDetail},
  data () {
    return {
      availableEquipmentRequestForm: {
        availableEquipmentName: '',
        availableEquipmentDescription: '',
        id: ''
      },
      availableEquipmentResetForm: {
        availableEquipmentName: '',
        availableEquipmentDescription: '',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    loadAvailableEquipment (availableEquipmentId) {
      let vm = this
      this.$ajax.get('/api/sample/availableEquipment/' + availableEquipmentId)
        .then(function (res) {
          vm.availableEquipmentRequestForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetAvailableEquipmentForm () {
      this.availableEquipmentRequestForm = JSON.parse(JSON.stringify(this.availableEquipmentResetForm))
    },
    resetAvailableEquipmentId () {
      this.availableEquipmentRequestForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadAvailableEquipment(this.$route.params.id)
    }
  }
}
</script>
