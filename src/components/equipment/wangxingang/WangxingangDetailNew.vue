<template>
  <WangxingangDetail
   :wangxingangForm="wangxingangForm"
   :staticOptions="staticOptions"
   v-on:updateWangxingangForm="updateWangxingangForm"
   v-on:deleteWangxingangForm="resetWangxingangForm"
   v-on:new="resetWangxingangForm"
   v-on:copy="resetWangxingangId"
  />
</template>

<script>
import WangxingangDetail from '@/components/equipment/wangxingang/WangxingangDetail'
export default {
  name: 'wangxingangDetailNew',
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
    updateWangxingangForm (event) {
      this.wangxingangForm.id = event.id
    },
    resetWangxingangId () {
      this.wangxingangForm.id = ''
    },
    resetWangxingangForm () {
      this.wangxingangForm = JSON.parse(JSON.stringify(this.wangxingangResetForm))
    }
  },
  activated () {
    this.resetWangxingangForm()
  }
}
</script>
