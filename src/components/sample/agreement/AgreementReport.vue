<template>
  <div class="pdf">
    <el-row>
      <el-button @click="downloadToFrontEnd">下载</el-button>
      <!-- <el-button @click="$refs.myPdfComponent.print()">print</el-button> -->
      <el-button @click="goBackAgreement">返回</el-button>
    </el-row>
    <pdf  ref="myPdfComponent"
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
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
      numPages: 0,
      fullscreenLoading: false,
      agreementNumber: '',
      loading: {}
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
        text: '正在努力生成报告，报告编号为：' + vm.agreementNumber.split(',')[0],
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var headers = {'Authorization': localStorage.getItem('id_token')}
      var loadingTask = pdf.createLoadingTask({
        url: '/api/sample/agreement/downloadPdfFile/' + this.agreementNumber,
        httpHeaders: headers})
      this.src = loadingTask
      this.src.then(pdf => {
        vm.numPages = pdf.numPages
        loading.close()
      }).catch(function (error) {
        loading.close()
        console.log(error.message)
        vm.$message('未选择打印内容')
      })
    },
    goBackAgreement () {
      this.$router.go(-1)
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.agreementNumber = this.$route.params.id
      this.openFullScreen2()
    }
  }
}
</script>

<style scoped>
  .pdf {
    overflow: hidden;
  }
</style>
