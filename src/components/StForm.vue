<template>
  <div>
  <el-radio-group v-model="radio2">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
  <icon name="input" :w="18.19" :h="18.19"></icon>
  <div id="app">
  <child1
  :pChild1="child1"
  :pChild2="child2"
  v-on:test1="onTest1"
  v-on:test2="onTest2">
  </child1>
  </div>
  <el-button type="primary" @click="dialogVisible = true">Load from File</el-button>
  <el-dialog title="Load JSON document from file" :visible.sync="dialogVisible">
    <el-upload :file-list="uploadFiles" action="alert" :auto-upload="false" multiple :on-change="loadJsonFromFile">
      <el-button size="small" type="primary">Select a file</el-button>
      <div slot="tip">upload only jpg/png files, and less than 500kb</div>
    </el-upload>
    <span slot="footer">
      <el-button type="primary" @click="dialogVisible = false">cancel</el-button>
      <el-button type="primary" @click="loadJsonFromFileConfirmed">confirm</el-button>
    </span>
  </el-dialog>
  <div>
    <dynamic-form :formConfig="menuFormConfig" v-model="menuForm" ref="menuForm">
    </dynamic-form>
  </div>
</div>

</template>

<script>
import child1 from './child1.vue'
export default {
  data () {
    return {
      radio2: 9,
      child1: 'hello',
      child2: 'world',
      // data for upload files
      uploadFilename: null,
      multipleUpload: false,
      uploadFiles: [],
      showDialog: false,
      msg: 'Hello Vue.',
      msg1: '',
      msg2: '',
      msg3: '',
      dialogVisible: false,
      menuForm: {}
    }
  },
  components: { child1 },
  created () {
    let vm = this
    this.$nextTick(function () {
      this.$ajax.get('/api/systemMenu')
        .then(function (res) {
          // vm.menuFormConfig = res.data
          vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: 'qry', initV: res.data})
          console.log(vm.menuFormConfig)
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    })
  },
  methods: {
    loadData () {
      let vm = this
      this.$nextTick(function () {
        this.$ajax.get('/api/systemMenu')
          .then(function (res) {
            vm.$nextTick(() => {
              vm.menuFormConfig = res.data
              // vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: 'qry', initV: res.data})
            })
            console.log(vm.menuFormConfig)
          }).catch(function (error) {
            console.log(error.message)
            vm.$message('Something wrong happen!')
          })
      })
    },
    changeMsg () {
      this.msg = 'Hello world.'
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    },
    onTest1 () {
      console.log('test1 running...')
    },
    onTest2 () {
      console.log('test2 running')
    },
    downloadJsonToFile () {
      if (window.document.createEvent) {
        if (this.downloadLink !== null) window.URL.revokeObjectURL(this.downloadLink)
        this.downloadLink = window.URL.createObjectURL(new window.Blob([this.jsonContent], { type: 'application/json' }))
        this.downloadFilename = 'document.json'
        this.$nextTick(() => {
          let link = this.$refs.downloadLink
          link.click()
        })
      }
    },
    getUploadFiles (event) {
      this.uploadFiles = event
    },
    loadJsonFromFileCanceled () {
      this.$refs.loadJsonDialog.close()
    },
    loadJsonFromFile (file, fileList) {
      this.uploadFilename = file.name
      this.uploadFiles = fileList
    },
    loadJsonFromFileConfirmed () {
      console.log(this.uploadFiles)
      if (this.uploadFiles) {
        for (let i = 0; i < this.uploadFiles.length; i++) {
          let file = this.uploadFiles[i]
          console.log(file.raw)
          if (!file) continue
          let reader = new FileReader()
          reader.onload = async (e) => {
            try {
              let document = JSON.parse(e.target.result)
              console.log(document)
            } catch (err) {
              console.log(`load JSON document from file error: ${err.message}`)
              this.showSnackbar(`Load JSON document from file error: ${err.message}`, 4000)
            }
          }
          reader.readAsText(file.raw)
        }
      }
      this.dialogVisible = false
    }
  }
}
</script>
