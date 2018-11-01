<template>
  <DrawingDesignDetail :drawingDesignForm="drawingDesignForm"
   :staticOptions="staticOptions"
  v-on:updateDrawingDesignForm="updateDrawingDesignForm"
  v-on:deleteDrawingDesignForm="resetDrawingDesignForm"
  v-on:new="resetDrawingDesignForm"
  v-on:copy="resetDrawingDesignId"/>
</template>

<script>
import DrawingDesignDetail from '@/components/sample/drawingDesign/DrawingDesignDetail'
export default {
  name: 'drawingDesignDetailNew',
  components: {DrawingDesignDetail},
  data () {
    return {
      drawingDesignForm: {
        id: '',
        experimentalItem: '',
        drawingDesignName: '',
        drawingDesignNumber: ''
      },
      drawingDesignResetForm: {
        id: '',
        experimentalItem: '',
        drawingDesignName: '',
        drawingDesignNumber: ''
      },
      staticOptions: {
        experimentalItems: []
      }
    }
  },
  methods: {
    updateDrawingDesignForm (event) {
      this.drawingDesignForm.id = event.id
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
    resetDrawingDesignId () {
      this.drawingDesignForm.id = ''
    },
    resetDrawingDesignForm () {
      this.drawingDesignForm = JSON.parse(JSON.stringify(this.drawingDesignResetForm))
    }
  },
  mounted () {
    this.loadExperimentalItemData()
  }
}
</script>
