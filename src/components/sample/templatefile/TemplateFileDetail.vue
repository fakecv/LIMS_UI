<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="templateFileForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件名称">
              <el-input name="fileName" v-model="templateFileForm.fileName" autoComplete="fileName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件位置">
              <el-input name="location" v-model="templateFileForm.location" autoComplete="location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文件内容">
              <el-input type="textarea" autosize name="content" v-model="templateFileForm.content" autoComplete="content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件显示名称">
              <el-input name="displayName" v-model="templateFileForm.displayName" autoComplete="displayName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否在列表中显示" label-width="200px">
              <el-radio-group v-model="templateFileForm.show">
                <el-radio label="yes">是</el-radio>
                <el-radio label="no">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-upload ref="upload"
            class="upload-demo"
            drag
            action="dummy"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="handleChange"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选取文件</em></div>
            <div class="el-upload__tip" slot="tip">只能上传doc文件，且不超过2M</div>
          </el-upload>
          <el-button @click="uploadToServer">上传模板文件</el-button>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'templateFileDetail',
  props: ['templateFileForm', 'staticOptions'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '4', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '5', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '7', 'icon': 'el-icon-download', 'loading': false}
      ],
      fileList: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
        this.$message('复制成功!')
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.confirmDelete()
      } else if (action.id === '6') {
      } else if (action.id === '7') {
      }
    },
    uploadPics () {
      let vm = this
      var formData = new FormData()
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.fileList.forEach(file => {
        formData.append('files', file.raw)
      })
      this.$ajax.post('/api/sample/templateFile/uploadMultipleFiles', formData, config)
        .then(function (res) {
          vm.$message('图片已经上传到服务器!')
          vm.fileList.forEach(file => {
            vm.downloadToFrontEnd(file.raw)
          })
          vm.fileList = []
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleChange (file, fileList) {
      this.fileList = fileList
    },
    uploadToServer () {
      if (this.fileList.length > 0) {
        this.uploadPics()
        this.$refs.upload.clearFiles()
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
      this.$message('复制成功!')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/templateFile', this.templateFileForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateTemplateFileForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.templateFileForm.id && this.templateFileForm.id !== '') {
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
      this.$ajax.get('/api/sample/templateFile/delete/' + this.templateFileForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteTemplateFileForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
