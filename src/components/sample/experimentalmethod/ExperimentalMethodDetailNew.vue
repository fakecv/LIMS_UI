<template>
  <ExperimentalMethodDetail
   :experimentalMethodForm="experimentalMethodForm"
   :staticOptions="staticOptions"
    v-on:new="resetExperimentalMethodForm"
    v-on:copy="resetExperimentalMethodId"
    v-on:updateExperimentalMethodForm="updateExperimentalMethodForm"
    v-on:deleteExperimentalMethodForm="resetExperimentalMethodForm"
  />
</template>

<script>
import ExperimentalMethodDetail from '@/components/sample/experimentalMethod/ExperimentalMethodDetail'
export default {
  name: 'experimentalMethodDetailNew',
  components: {ExperimentalMethodDetail},
  data () {
    return {
      experimentalMethodForm: {
        id: '',
        experimentalMethodName: '',
        experimentalMethodNumber: '',
        experimentalItem: ''
      },
      experimentalMethodResetForm: {
        id: '',
        experimentalMethodName: '',
        experimentalMethodNumber: '',
        experimentalItem: ''
      },
      staticOptions: {
        experimentalItems: []
      }
    }
  },
  methods: {
    updateExperimentalMethodForm (event) {
      this.experimentalMethodForm.id = event.id
    },
    resetExperimentalMethodId () {
      this.experimentalMethodForm.id = ''
    },
    loadExperimentalItemData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItem/getExperimentalItem')
        .then(function (res) {
          vm.staticOptions.experimentalItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    resetExperimentalMethodForm () {
      this.experimentalMethodForm = JSON.parse(JSON.stringify(this.experimentalMethodResetForm))
    }
  },
  mounted () {
    this.loadExperimentalItemData()
  }
}
</script>
