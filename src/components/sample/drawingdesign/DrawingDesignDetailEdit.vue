<template>
  <DrawingDesignDetail
   :drawingDesignForm="drawingDesignForm"
   :staticOptions="staticOptions"
   v-on:deleteDrawingDesignForm="resetDrawingDesignForm"
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
        testedItem: '',
        drawingDesignName: '',
        sort: '',
        drawingDesignNumber: ''
      },
      drawingDesignResetForm: {
        id: '',
        testedItem: '',
        sort: '',
        drawingDesignName: '',
        drawingDesignNumber: ''
      },
      staticOptions: {
        testedItems: []
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
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
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
    this.loadTestedItemData()
    if (this.$route.params.id !== undefined) {
      this.loadDrawingDesign(this.$route.params.id)
    }
  }
}
</script>
