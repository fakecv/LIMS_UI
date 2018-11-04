<template>
  <ExperimentalItemsParameterDetail :experimentalItemsParameterForm="experimentalItemsParameterForm"
    :staticOptions="staticOptions"
    v-on:updateExperimentalItemsParameterForm="updateExperimentalItemsParameterForm"
    v-on:deleteExperimentalItemsParameterForm="resetExperimentalItemsParameterForm"
    v-on:new="resetExperimentalItemsParameterForm"
    v-on:copy="resetExperimentalItemsParameterId"/>
</template>

<script>
import ExperimentalItemsParameterDetail from '@/components/sample/experimentalItemsparameter/ExperimentalItemsParameterDetail'
export default {
  name: 'experimentalItemsParameterDetailNew',
  components: {ExperimentalItemsParameterDetail},
  data () {
    return {
      experimentalItemsParameterForm: {
        id: '',
        experimentalItemsParameterName: '',
        experimentalItemsParameterDescription: ''
      },
      experimentalItemsParameterResetForm: {
        id: '',
        experimentalItemsParameterName: '',
        experimentalItemsParameterDescription: ''
      },
      staticOptions: {
        experimentalItems: []
      }
    }
  },
  methods: {
    updateExperimentalItemsParameterForm (event) {
      this.experimentalItemsParameterForm.id = event.id
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
    resetExperimentalItemsParameterId () {
      this.experimentalItemsParameterForm.id = ''
    },
    resetExperimentalItemsParameterForm () {
      this.experimentalItemsParameterForm = JSON.parse(JSON.stringify(this.experimentalItemsParameterResetForm))
    }
  },
  mounted () {
    this.loadExperimentalItemData()
  }
}
</script>
