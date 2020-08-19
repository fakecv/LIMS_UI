<template>
  <TokyoDetail
   :tokyoRequestForm="tokyoRequestForm"
   :staticOptions="staticOptions"
   v-on:updateTokyoForm="updateTokyoForm"
   v-on:deleteTokyoForm="resetTokyoForm"
   v-on:new="resetTokyoForm"
   v-on:copy="resetTokyoId"
  />
</template>

<script>
import TokyoDetail from '@/components/sample/tokyo/TokyoDetail'
export default {
  name: 'tokyoDetailNew',
  components: {TokyoDetail},
  data () {
    return {
      tokyoRequestForm: {
        var1: '',
        var2: '',
        id: ''
      },
      tokyoResetForm: {
        var1: '',
        var2: '',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    updateTokyoForm (event) {
      this.tokyoRequestForm.id = event.id
    },
    resetTokyoId () {
      this.tokyoRequestForm.id = ''
    },
    resetTokyoForm () {
      this.tokyoRequestForm = JSON.parse(JSON.stringify(this.tokyoResetForm))
    }
  },
  activated () {
    this.resetTokyoForm()
  }
}
</script>
