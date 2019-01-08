<template>
  <EquipmentAcceptanceDetail
   :equipmentAcceptanceForm="equipmentAcceptanceForm"
   :staticOptions="staticOptions"
   v-on:deleteEquipmentAcceptanceForm="resetEquipmentAcceptanceForm"
   v-on:new="resetEquipmentAcceptanceForm"
   v-on:copy="resetEquipmentAcceptanceId"
  />
</template>

<script>
import EquipmentAcceptanceDetail from '@/components/equipment/equipmentacceptance/EquipmentAcceptanceDetail'
export default {
  name: 'equipmentAcceptanceDetailEdit',
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
    loadEquipmentAcceptance (equipmentAcceptanceId) {
      let vm = this
      this.$ajax.get('/api/equipment/equipmentAcceptance/' + equipmentAcceptanceId)
        .then(function (res) {
          vm.equipmentAcceptanceForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetEquipmentAcceptanceForm () {
      this.equipmentAcceptanceForm = JSON.parse(JSON.stringify(this.equipmentAcceptanceResetForm))
    },
    resetEquipmentAcceptanceId () {
      this.equipmentAcceptanceForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadEquipmentAcceptance(this.$route.params.id)
    }
  }
}
</script>
