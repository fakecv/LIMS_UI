<template>
  <DrawingDesignDetail
   :drawingDesignForm="drawingDesignForm"
   :staticOptions="staticOptions"
   v-on:deleteDrawingDesign="resetDrawingDesignForm"
   v-on:new="resetDrawingDesignForm"
   v-on:copy="resetDrawingDesignId"/>
</template>

<script>
import DrawingDesignDetail from '@/components/sample/drawingDesign/DrawingDesignDetail'
export default {
  name: 'drawingDesignDetailEdit',
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
    loadDrawingDesign (drawingDesignId) {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/' + drawingDesignId)
        .then(function (res) {
          vm.drawingDesignForm = res.data
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
    resetDrawingDesignForm () {
      this.drawingDesignForm = JSON.parse(JSON.stringify(this.drawingDesignResetForm))
    },
    resetDrawingDesignId () {
      this.drawingDesignForm.id = ''
    }
  },
  mounted () {
    this.loadExperimentalItemData()
    if (this.$route.params.id !== undefined) {
      this.loadDrawingDesign(this.$route.params.id)
    }
  }
}
</script>
