<template>
  <div>
    <label class="file-select">
      <div class="select-button">
        <span v-if="value">Selected File: {{value.name}}</span>
        <span v-else>Select File</span>
      </div>
      <input type="file" @change="handleFileChange"/>
    </label>
    <el-button @click="downloadToFrontEnd">下载</el-button>
    <pdf
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style="display: inline-block; width: 100%"
    ></pdf>
  </div>
</template>
<script>
import pdf from 'vue-pdf'

export default {
  name: 'fileUpload',
  props: {
    value: File
  },
  components: {
    pdf
  },
  data () {
    return {
      src: {},
      numPages: undefined
    }
  },
  methods: {
    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
    },
    downloadToFrontEnd () {
      let vm = this
      // let downloadFormTemp = {agreementNumber: agreementId, fileName: fileName}

      // const fileURL = URL.createObjectURL(file);
      this.$ajax.get('/api/sample/agreement/downloadPdfFile/5b78251d34cb682670b68ad1', {responseType: 'blob'})
        .then(function (res) {
          // vm.src = new Blob([res.data], {type: 'application/pdf'})
          vm.download(res.data)
        }
        ).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    download (data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]), {type: 'application/pdf'})
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'report.pdf')

      document.body.appendChild(link)
      link.click()
    }
  },
  mounted () {
    var loadingTask = pdf.createLoadingTask('/api/sample/agreement/downloadPdfFile/5b78251d34cb682670b68ad1')
    this.src = loadingTask
    let vm = this
    // this.downloadToFrontEnd('augur', '5b78251d34cb682670b68ad1')
    this.src.then(pdf => {
      vm.numPages = pdf.numPages
    })
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>
