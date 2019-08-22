<template>
  <EquipmentAcceptanceDetail
   :equipmentAcceptanceForm="equipmentAcceptanceForm"
   :staticOptions="staticOptions"
   v-on:updateEquipmentAcceptanceForm="updateEquipmentAcceptanceForm"
   v-on:deleteEquipmentAcceptanceForm="resetEquipmentAcceptanceForm"
   v-on:new="resetEquipmentAcceptanceForm"
   v-on:copy="resetEquipmentAcceptanceId"
  />
</template>

<script>
import EquipmentAcceptanceDetail from '@/components/equipment/equipmentacceptance/EquipmentAcceptanceDetail'
export default {
  name: 'equipmentAcceptanceDetailNew',
  components: {EquipmentAcceptanceDetail},
  data () {
    return {
      equipmentAcceptanceForm: {
        equipmentName: '',
        specification: '',
        manufacturer: '',
        purchaseDate: '',
        manufactureDate: '',
        manufactureNo: '',
        arrivalDate: '',
        checkDate: '',
        serviceDate: '',
        packaging: '',
        checklist: '',
        surface: '',
        productChecklist: '',
        indication: '',
        traceabilityRequest: '',
        sourceManufacturer: '',
        certificationNo: '',
        result: '',
        defaultReason: '',
        checker: '',
        maker: '',
        sort: '',
        id: ''
      },
      equipmentAcceptanceResetForm: {
        equipmentName: '',
        specification: '',
        manufacturer: '',
        purchaseDate: '',
        manufactureDate: '',
        manufactureNo: '',
        arrivalDate: '',
        checkDate: '',
        serviceDate: '',
        packaging: '',
        checklist: '',
        surface: '',
        productChecklist: '',
        indication: '',
        traceabilityRequest: '',
        sourceManufacturer: '',
        certificationNo: '',
        result: '',
        defaultReason: '',
        checker: '',
        maker: '',
        sort: '',
        id: ''
      },
      staticOptions: {
        departments: [],
        results: []
      }
    }
  },
  methods: {
    updateEquipmentAcceptanceForm (event) {
      this.equipmentAcceptanceForm.id = event.id
    },
    resetEquipmentAcceptanceId () {
      this.equipmentAcceptanceForm.id = ''
    },
    resetEquipmentAcceptanceForm () {
      this.equipmentAcceptanceForm = JSON.parse(JSON.stringify(this.equipmentAcceptanceResetForm))
    }
  },
  activated () {
    this.resetEquipmentAcceptanceForm()
  }
}
</script>
