<template>
  <DrawingDesignDetail :drawingDesignForm="drawingDesignForm"
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
        drawingDesignName: '',
        drawingDesignDescription: ''
      },
      drawingDesignResetForm: {
        id: '',
        drawingDesignName: '',
        drawingDesignDescription: ''
      }
    }
  },
  methods: {
    updateDrawingDesignForm (event) {
      this.drawingDesignForm.id = event.id
    },
    resetDrawingDesignId () {
      this.drawingDesignForm.id = ''
    },
    resetDrawingDesignForm () {
      this.drawingDesignForm = JSON.parse(JSON.stringify(this.drawingDesignResetForm))
    }
  },
  mounted () {
  }
}
</script>
