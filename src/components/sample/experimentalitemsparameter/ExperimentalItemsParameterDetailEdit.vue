<template>
  <ExperimentalItemsParameterDetail
   :experimentalItemsParameterForm="experimentalItemsParameterForm"
   :staticOptions="staticOptions"
   v-on:deleteExperimentalItemsParameter="resetExperimentalItemsParameterForm"
   v-on:new="resetExperimentalItemsParameterForm"
   v-on:copy="resetExperimentalItemsParameterId"/>
</template>

<script>
import ExperimentalItemsParameterDetail from '@/components/sample/experimentalItemsparameter/ExperimentalItemsParameterDetail'
export default {
  name: 'experimentalItemsParameterDetailEdit',
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
    loadExperimentalItemsParameter (experimentalItemsParameterId) {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItemsParameter/' + experimentalItemsParameterId)
        .then(function (res) {
          vm.experimentalItemsParameterForm = res.data
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
    resetExperimentalItemsParameterForm () {
      this.experimentalItemsParameterForm = JSON.parse(JSON.stringify(this.experimentalItemsParameterResetForm))
    },
    resetExperimentalItemsParameterId () {
      this.experimentalItemsParameterForm.id = ''
    }
  },
  mounted () {
    this.loadExperimentalItemData()
    if (this.$route.params.id !== undefined) {
      this.loadExperimentalItemsParameter(this.$route.params.id)
    }
  }
}
</script>
