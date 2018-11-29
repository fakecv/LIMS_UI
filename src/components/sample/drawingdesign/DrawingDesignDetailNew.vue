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
        testedItem: '',
        drawingDesignName: '',
        drawingDesignNumber: ''
      },
      drawingDesignResetForm: {
        id: '',
        testedItem: '',
        drawingDesignName: '',
        drawingDesignNumber: ''
      },
      staticOptions: {
        testedItems: []
      }
    }
  },
  methods: {
    updateDrawingDesignForm (event) {
      this.drawingDesignForm.id = event.id
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
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
    this.loadTestedItemData()
  }
}
</script>
