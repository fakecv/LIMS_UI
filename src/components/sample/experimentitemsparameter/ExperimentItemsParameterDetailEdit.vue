<template>
  <ExperimentItemsParameterDetail
   :experimentItemsParameterForm="experimentItemsParameterForm"
   :staticOptions="staticOptions"
   v-on:deleteExperimentItemsParameter="resetExperimentItemsParameterForm"
   v-on:new="resetExperimentItemsParameterForm"
   v-on:copy="resetExperimentItemsParameterId"/>
</template>

<script>
import ExperimentItemsParameterDetail from '@/components/sample/experimentItemsparameter/ExperimentItemsParameterDetail'
export default {
  name: 'experimentItemsParameterDetailEdit',
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
    loadExperimentItemsParameter (experimentItemsParameterId) {
      let vm = this
      this.$ajax.get('/api/sample/experimentItemsParameter/' + experimentItemsParameterId)
        .then(function (res) {
          vm.experimentItemsParameterForm = res.data
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
    resetExperimentItemsParameterForm () {
      this.experimentItemsParameterForm = JSON.parse(JSON.stringify(this.experimentItemsParameterResetForm))
    },
    resetExperimentItemsParameterId () {
      this.experimentItemsParameterForm.id = ''
    }
  },
  mounted () {
    this.loadExperimentalItemData()
    if (this.$route.params.id !== undefined) {
      this.loadExperimentItemsParameter(this.$route.params.id)
    }
  }
}
</script>
