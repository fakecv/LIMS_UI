<template>
  <WangxingangDetail
   :wangxingangForm="wangxingangForm"
   :staticOptions="staticOptions"
   v-on:deleteWangxingangForm="resetWangxingangForm"
   v-on:new="resetWangxingangForm"
   v-on:copy="resetWangxingangId"
  />
</template>

<script>
import WangxingangDetail from '@/components/equipment/wangxingang/WangxingangDetail'
export default {
  name: 'wangxingangDetailEdit',
  components: {WangxingangDetail},
  data () {
    return {
      wangxingangForm: {
        wangxingangName: '',
        sort: '',
        id: ''
      },
      wangxingangResetForm: {
        wangxingangName: '',
        sort: '',
        id: ''
      }
    }
  },
  methods: {
    loadWangxingang (wangxingangId) {
      let vm = this
      this.$ajax.get('/api/equipment/wangxingang/' + wangxingangId)
        .then(function (res) {
          vm.wangxingangForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetWangxingangForm () {
      this.wangxingangForm = JSON.parse(JSON.stringify(this.wangxingangResetForm))
    },
    resetWangxingangId () {
      this.wangxingangForm.id = ''
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.loadWangxingang(this.$route.params.id)
    }
  }
}
</script>
