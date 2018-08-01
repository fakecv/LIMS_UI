<template>
  <ExperimentalMethodDetail :experimentalMethodForm="experimentalMethodForm"/>
</template>

<script>
import ExperimentalMethodDetail from '@/components/sample/experimentalMethod/ExperimentalMethodDetail'
export default {
  name: 'experimentalMethodDetailEdit',
  components: {ExperimentalMethodDetail},
  data () {
    return {
      experimentalMethodForm: {
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
          vm.$message('Somthing wrong happen in loadExperimentalMethod!')
        })
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
