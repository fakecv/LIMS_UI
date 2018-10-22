<template>
  <ExperimentItemsParameterDetail :experimentItemsParameterForm="experimentItemsParameterForm"
    :staticOptions="staticOptions"
    v-on:updateExperimentItemsParameterForm="updateExperimentItemsParameterForm"
    v-on:deleteExperimentItemsParameterForm="resetExperimentItemsParameterForm"
    v-on:new="resetExperimentItemsParameterForm"
    v-on:copy="resetExperimentItemsParameterId"/>
</template>

<script>
import ExperimentItemsParameterDetail from '@/components/sample/experimentItemsparameter/ExperimentItemsParameterDetail'
export default {
  name: 'experimentItemsParameterDetailNew',
  components: {ExperimentItemsParameterDetail},
  data () {
    return {
      experimentItemsParameterForm: {
        id: '',
        experimentItemsParameterName: '',
        experimentItemsParameterDescription: ''
      },
      experimentItemsParameterResetForm: {
        id: '',
        experimentItemsParameterName: '',
        experimentItemsParameterDescription: ''
      },
      staticOptions: {
        experimentalItems: []
      }
    }
  },
  methods: {
    updateExperimentItemsParameterForm (event) {
      this.experimentItemsParameterForm.id = event.id
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
    resetExperimentItemsParameterId () {
      this.experimentItemsParameterForm.id = ''
    },
    resetExperimentItemsParameterForm () {
      this.experimentItemsParameterForm = JSON.parse(JSON.stringify(this.experimentItemsParameterResetForm))
    }
  },
  mounted () {
    this.loadExperimentalItemData()
  }
}
</script>
