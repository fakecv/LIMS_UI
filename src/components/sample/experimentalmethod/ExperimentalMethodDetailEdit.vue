<template>
  <ExperimentalMethodDetail
   :experimentalMethodForm="experimentalMethodForm"
   v-on:deleteExperimentalMethod="resetExperimentalMethodForm"
   v-on:new="resetExperimentalMethodForm"
   v-on:copy="resetExperimentalMethodId"/>
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
        experimentalMethodDescription: ''
      },
      experimentalMethodResetForm: {
        id: '',
        experimentalMethodName: '',
        experimentalMethodDescription: ''
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
          console.log(error.message)
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
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadExperimentalMethod(this.$route.params.id)
    }
  }
}
</script>
