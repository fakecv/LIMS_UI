<template>
  <AvailableEquipmentDetail
   :availableEquipmentRequestForm="availableEquipmentRequestForm"
   :staticOptions="staticOptions"
   v-on:updateAvailableEquipmentForm="updateAvailableEquipmentForm"
   v-on:deleteAvailableEquipmentForm="resetAvailableEquipmentForm"
   v-on:new="resetAvailableEquipmentForm"
   v-on:copy="resetAvailableEquipmentId"
  />
</template>

<script>
import AvailableEquipmentDetail from '@/components/sample/availableequipment/AvailableEquipmentDetail'
export default {
  name: 'availableEquipmentDetailNew',
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
    updateAvailableEquipmentForm (event) {
      this.availableEquipmentRequestForm.id = event.id
    },
    resetAvailableEquipmentId () {
      this.availableEquipmentRequestForm.id = ''
    },
    resetAvailableEquipmentForm () {
      this.availableEquipmentRequestForm = JSON.parse(JSON.stringify(this.availableEquipmentResetForm))
    }
  },
  activated () {
    this.resetAvailableEquipmentForm()
  }
}
</script>
