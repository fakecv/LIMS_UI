<template lang="pug">
  div
    el-container
      el-header(style="height: 100px")
        router-view(name="header" :actions="actions" @add="actionHandler")
      el-container(style="padding: 10px")
        router-view(name="aside" style="width:380px")
        router-view(name="main")
      router-view
      el-dialog(title="提示" :visible.sync="dialogVisible")
        el-upload(:on-change="loadJsonFromFileConfirmed" :file-list="fileList" action="alert" :auto-upload="false")
          el-button(size="small" type="primary") 点击上传...
          div(slot="tip") 只能上传json文件，且不超过500kb
        span(slot="footer")
          el-button(@click="dialogVisible = false") cancel
          el-button(type="primary" @click="dialogVisible = false") confirm
</template>
<script>
export default {
  name: 'UIGenerator',
  data () {
    return {
      actions: [
        {'name': '创建', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '保存', 'id': '2', 'icon': 'el-icon-document', 'loading': false},
        {'name': '导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '导出', 'id': '4', 'icon': 'el-icon-download', 'loading': false},
        {'name': '数据库导入', 'id': '5', 'icon': 'el-icon-upload', 'loading': false}
      ],
      // data for upload files
      uploadFilename: null,
      multipleUpload: false,
      fileList: [],
      showDialog: false,
      // data for json content
      jsonContent: '',
      downloadLink: null,
      downloadFilename: null,
      dialogVisible: false
    }
  },
  methods: {
    actionHandler (action) {
      var vm = this
      if (action.id === '1') {
        // this.jsonContent = ''
        this.$store.state.forms[this.$route.params.fid].formItemList = []
      } else if (action.id === '2') {
        this.submit(this.$store.state.forms[this.$route.params.fid])
      } else if (action.id === '3') {
        this.dialogVisible = true
      } else if (action.id === '4') {
        this.downloadJsonToFile()
      } else if (action.id === '5') {
        this.$ajax.get('/api/formTemplate')
          .then(function (res) {
            let document = res.data
            vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: vm.$route.params.fid, initV: document})
          }).catch(function (error) {
            console.log(error.message)
            vm.$message('Something wrong happen!')
          })
      }
    },
    submit (formTemplateJason) {
      var vm = this
      this.$ajax.post('/api/formTemplate', formTemplateJason)
        .then(function (res) {
          vm.$message('Data has been uploaded successfully!')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    downloadJsonToFile () {
      var vm = this
      if (window.document.createEvent) {
        if (this.downloadLink !== null) window.URL.revokeObjectURL(this.downloadLink)
        vm.downloadLink = window.URL.createObjectURL(new window.Blob([JSON.stringify(this.$store.state.forms[this.$route.params.fid], null, 2)], { type: 'application/json' }))
        this.downloadFilename = 'document.json'
        this.$nextTick(() => {
          let el = document.createElement('a')
          el.href = vm.downloadLink
          el.download = vm.$store.state.forms[this.$route.params.fid].domain + '.txt'
          el.click()
          window.URL.revokeObjectURL(this.downloadLink)
        })
      }
    },
    loadJsonFromFileConfirmed (file, fileList) {
      let reader = new FileReader()
      reader.onload = async (e) => {
        try {
          let document = JSON.parse(e.target.result)
          this.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: this.$route.params.fid, initV: document})
        } catch (err) {
          console.log(`load JSON document from file error: ${err.message}`)
          this.showSnackbar(`Load JSON document from file error: ${err.message}`, 4000)
        }
      }
      reader.readAsText(file.raw)
    }
  }
}
</script>
<style>
</style>
