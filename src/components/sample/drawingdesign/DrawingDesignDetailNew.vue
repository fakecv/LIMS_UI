<template>
  <DrawingDesignDetail :drawingDesignForm="drawingDesignForm"/>
</template>

<script>
import DrawingDesignDetail from '@/components/sample/drawingDesign/DrawingDesignDetail'
export default {
  name: 'drawingDesignDetailNew',
  components: {DrawingDesignDetail},
  data () {
    return {
      drawingDesignForm: {
        drawingDesignName: '',
        drawingDesignDescription: ''
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
