<template>
  <el-dialog :title="agreementForm.agreementNumber" :visible.sync="samplePictureViewDialog" append-to-body>
    <el-container style="padding: 10px">
      <v-gallery :images="images"  >
      </v-gallery>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeSamplePictureViewDialog">取 消</el-button>
      <el-button type="primary" @click="closeSamplePictureViewDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'samplePictureViewDialog',
  props: ['samplePictureViewDialog', 'agreementId'],
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12},
      images: [],
      agreementForm: {}
    }
  },
  methods: {
    closeSamplePictureViewDialog () {
      this.$emit('closeSamplePictureViewDialog')
    },
    downloadToFrontEnd (fileName, agreementId) {
      let vm = this
      let downloadFormTemp = {agreementNumber: agreementId, fileName: fileName}
      var reader = new FileReader()
      this.$ajax.post('/api/sample/agreement/downloadFile', downloadFormTemp, { responseType: 'blob' })
        .then(function (res) {
          if (!res.data) {
            return
          }
          reader.readAsDataURL(res.data)
          reader.onload = function () {
            var imageCP = {}
            imageCP.url = reader.result
            imageCP.title = fileName
            vm.images.push(imageCP)
          }
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadAgreement (agreementId) {
      let vm = this
      this.images = []
      this.$ajax.get('/api/sample/agreement/' + agreementId)
        .then(function (res) {
          vm.agreementForm = res.data
          if (res.data.imageNameList !== undefined && res.data.imageNameList.length > 0) {
            vm.agreementForm.imageNameList.forEach(image => {
              vm.downloadToFrontEnd(image, vm.agreementForm.agreementNumber)
            })
          } else {
            var imageCP = {}
            imageCP.url = null
            imageCP.title = '没有样品图片'
            vm.images.push(imageCP)
          }
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    }
  },
  watch: {
    agreementId (newValue, oldValue) {
      this.loadAgreement(newValue)
      return newValue
    }
  }

}
</script>
<style>

</style>
