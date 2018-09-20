<template>
  <div>
    <el-row>
      <el-button @click="downloadToFrontEnd">下载</el-button>
      <el-button @click="goBackAgreement">返回</el-button>
    </el-row>
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
  name: 'agreementReport',
  props: {
  },
  components: {
    pdf
  },
  data () {
    return {
      src: {},
      numPages: undefined,
      fullscreenLoading: false,
      agreementNumber: ''
    }
  },
  methods: {
    downloadToFrontEnd () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/downloadPdfFile/' + this.agreementNumber, {responseType: 'blob'})
        .then(function (res) {
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
      link.setAttribute('download', this.agreementNumber + '.pdf')

      document.body.appendChild(link)
      link.click()
    },
    openFullScreen2 () {
      let vm = this
      const loading = this.$loading({
        lock: true,
        text: '正在努力生成报告，报告编号为：' + vm.agreementNumber,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var loadingTask = pdf.createLoadingTask('/api/sample/agreement/downloadPdfFile/' + this.agreementNumber)
      this.src = loadingTask
      this.src.then(pdf => {
        vm.numPages = pdf.numPages
        loading.close()
      })
    },
    goBackAgreement () {
      this.$router.go(-1)
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.agreementNumber = this.$route.params.id
      this.openFullScreen2()
    }
  }
}
</script>

<style scoped>
</style>
