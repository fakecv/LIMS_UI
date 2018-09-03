<template>
  <ExperimentalItemDetail
   :experimentalItemForm="experimentalItemForm"
   v-on:new="resetExperimentalItemForm"
   v-on:copy="resetExperimentalItemId"
   v-on:deleteExperimentalItem="resetExperimentalItemForm"
   />
</template>

<script>
import ExperimentalItemDetail from '@/components/sample/experimentalitem/ExperimentalItemDetail'
export default {
  name: 'experimentalItemDetailEdit',
  components: {ExperimentalItemDetail},
  data () {
    return {
      experimentalItemForm: {
        id: '',
        experimentalItemName: '',
        experimentalItemNumber: ''
      },
      experimentalItemResetForm: {
        id: '',
        experimentalItemName: '',
        experimentalItemNumber: ''
      }
    }
  },
  methods: {
    loadExperimentalItem (experimentalItemId) {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItem/' + experimentalItemId)
        .then(function (res) {
          vm.experimentalItemForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    resetExperimentalItemForm () {
      this.experimentalItemForm = JSON.parse(JSON.stringify(this.experimentalItemResetForm))
    },
    resetExperimentalItemId () {
      this.experimentalItemForm.id = ''
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadExperimentalItem(this.$route.params.id)
    }
  }
}
</script>
