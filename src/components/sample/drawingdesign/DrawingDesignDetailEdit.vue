<template>
  <DrawingDesignDetail
   :drawingDesignForm="drawingDesignForm"
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
    loadDrawingDesign (drawingDesignId) {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/' + drawingDesignId)
        .then(function (res) {
          vm.drawingDesignForm = res.data
        }).catch(function (error) {
          console.log(error.message)
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
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadDrawingDesign(this.$route.params.id)
    }
  }
}
</script>
