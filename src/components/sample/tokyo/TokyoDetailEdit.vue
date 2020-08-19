<template>
  <TokyoDetail
   :tokyoRequestForm="tokyoRequestForm"
   :staticOptions="staticOptions"
   v-on:deleteTokyoForm="resetTokyoForm"
   v-on:new="resetTokyoForm"
   v-on:copy="resetTokyoId"
  />
</template>

<script>
import TokyoDetail from '@/components/sample/tokyo/TokyoDetail'
export default {
  name: 'tokyoDetailEdit',
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
    loadTokyo (tokyoId) {
      let vm = this
      this.$ajax.get('/api/sample/tokyo/' + tokyoId)
        .then(function (res) {
          vm.tokyoRequestForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetTokyoForm () {
      this.tokyoRequestForm = JSON.parse(JSON.stringify(this.tokyoResetForm))
    },
    resetTokyoId () {
      this.tokyoRequestForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadTokyo(this.$route.params.id)
    }
  }
}
</script>
