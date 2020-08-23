<template lang="pug">
  div
    el-container
      el-header(style="height: 100px")
        router-view(name="header" ref="UIGeneratorHeader" :actions="actions" @add="actionHandler")
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
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '导入', 'id': '4', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '导出', 'id': '5', 'icon': 'el-icon-download', 'loading': false},
        {'name': '删除', 'id': '6', 'icon': 'el-icon-delete', 'loading': false}
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
      dialogVisible: false,
      formTemplateId: ''
    }
  },
  methods: {
    actionHandler (action) {
      if (action.id === '1') {
        this.reset()
      } else if (action.id === '2') {
        this.$message('复制成功！')
        this.$store.state.forms[this.$route.params.fid].id = ''
        this.$store.state.forms[this.$route.params.fid].domain = ''
      } else if (action.id === '3') {
        this.submit()
      } else if (action.id === '4') {
        this.dialogVisible = true
      } else if (action.id === '5') {
        this.downloadJsonToFile()
      } else if (action.id === '6') {
        this.confirmDelete()
      }
    },
    reset () {
      this.$store.state.forms[this.$route.params.fid].id = ''
      this.$store.state.forms[this.$route.params.fid].packageName = ''
      this.$store.state.forms[this.$route.params.fid].domain = ''
      this.$store.state.forms[this.$route.params.fid].formItemList = []
      this.formTemplateId = ''
      this.$refs.UIGeneratorHeader.domain = ''
      this.$refs.UIGeneratorHeader.packageName = ''
    },
    confirmDelete () {
      let vm = this
      if (this.formTemplateId && this.formTemplateId !== '' && this.formTemplateId !== '0') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      vm.$store.state.forms[this.$route.params.fid].formItemList = []
      vm.$store.state.forms[this.$route.params.fid].domain = ''
      vm.$store.state.forms[this.$route.params.fid].packageName = ''
      this.$refs.UIGeneratorHeader.domain = ''
      this.$refs.UIGeneratorHeader.packageName = ''
      this.$ajax.get('/api/system/formDevelopment/delete/' + this.formTemplateId)
        .then(function (res) {
          vm.$message({
            type: 'success',
            message: '已经成功删除！'
          })
          vm.formTemplateId = ''
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    submit () {
      var vm = this
      this.$store.commit('FORM_UPDATE_WITH_FID_DOMAIN', { fid: this.$route.params.fid, domain: vm.$refs.UIGeneratorHeader.domain })
      this.$store.commit('FORM_UPDATE_WITH_FID_PACKAGENAME', { fid: this.$route.params.fid, packageName: vm.$refs.UIGeneratorHeader.packageName })
      var formTemplateJason = this.$store.state.forms[this.$route.params.fid]
      this.$ajax.post('/api/formTemplate', formTemplateJason)
        .then(function (res) {
          let document = res.data
          vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: vm.$route.params.fid, initV: document})
          vm.$message('Data has been uploaded successfully!')
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
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
          this.showSnackbar(`Load JSON document from file error: ${err.message}`, 4000)
        }
      }
      reader.readAsText(file.raw)
    }
  },
  activated () {
    this.formTemplateId = this.$route.params.id
    this.$store.state.forms[this.$route.params.fid].id = this.$route.params.id
  }
}
</script>
<style>
</style>
