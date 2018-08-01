<template>
  <DrawingDesignDetail :drawingDesignForm="drawingDesignForm"/>
</template>

<script>
import DrawingDesignDetail from '@/components/sample/drawingDesign/DrawingDesignDetail'
export default {
  name: 'drawingDesignDetailEdit',
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
    loadDrawingDesign (drawingDesignId) {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/' + drawingDesignId)
        .then(function (res) {
          vm.drawingDesignForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadDrawingDesign!')
        })
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadDrawingDesign(this.$route.params.id)
    }
  }
}
</script>
