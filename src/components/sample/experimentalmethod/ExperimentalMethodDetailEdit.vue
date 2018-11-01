<template>
  <ExperimentalMethodDetail
   :experimentalMethodForm="experimentalMethodForm"
   :staticOptions="staticOptions"
   v-on:new="resetExperimentalMethodForm"
   v-on:copy="resetExperimentalMethodId"
   v-on:deleteExperimentalMethod="resetExperimentalMethodForm"
   />
</template>

<script>
import ExperimentalMethodDetail from '@/components/sample/experimentalMethod/ExperimentalMethodDetail'
export default {
  name: 'experimentalMethodDetailEdit',
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
    loadExperimentalMethod (experimentalMethodId) {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/' + experimentalMethodId)
        .then(function (res) {
          vm.experimentalMethodForm = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    },
    resetExperimentalMethodId () {
      this.experimentalMethodForm.id = ''
    }
  },
  mounted () {
    this.loadExperimentalItemData()
    if (this.$route.params.id !== undefined) {
      this.loadExperimentalMethod(this.$route.params.id)
    }
  }
}
</script>
