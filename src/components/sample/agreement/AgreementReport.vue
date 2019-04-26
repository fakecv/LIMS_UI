<template>
  <div class="pdf">
    <el-row>
      <el-button @click="downloadToFrontEnd">重新加载</el-button>
      <el-button @click="goBackAgreement">返回</el-button>
      <el-button @click="print1">打印</el-button>
    </el-row>
    <iframe id='previewPdf' :src="'/static/pdf/web/viewer.html?file=' + fileUrl" height="800"
        width="100%" class="page">
    </iframe>
    <!-- <pdf ref="myPdfComponent1"
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
    ></pdf> -->
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import pdfJS from '../../../../static/pdf/build/pdf'
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
      fileUrl: '',
      fullscreenLoading: false,
      agreementNumber: '',
      loading: {}
    }
  },
  methods: {
    print1 () {
      document.getElementById('previewPdf').contentWindow.print()
    },
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
      this.fileUrl = url
      // let link = document.createElement('a')
      // link.style.display = 'none'
      // link.href = url
      // link.setAttribute('download', this.agreementNumber + '.pdf')
      // document.body.appendChild(link)
      // link.click()
    },
    print (data) {
      let pdfjsLib = pdfJS
      pdfjsLib.PDFJS.workerSrc = '/static/pdf/build/pdf.worker.js'
      let url = window.URL.createObjectURL(new Blob([data]), {type: 'application/pdf'})
      let loadingTask = pdfjsLib.getDocument(url)
      loadingTask.promise.then((pdf) => {
        let numPages = pdf.numPages
        let container = document.getElementById('mycanvas')
        let pageNumber = 1
        this.getPage(pdf, pageNumber, container, numPages)
      }, function (reason) {
        alert(reason)
      })
    },
    getPage (pdf, pageNumber, container, numPages) { // 获取pdf
      let _this = this
      pdf.getPage(pageNumber).then((page) => {
        let scale = (container.offsetWidth / page.view[2])
        let viewport = page.getViewport(scale)
        let canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        container.appendChild(canvas)
        let ctx = canvas.getContext('2d')
        var renderContext = {
          canvasContext: ctx,
          transform: [1, 0, 0, 1, 0, 0],
          viewport: viewport,
          intent: 'print'
        }
        page.render(renderContext).then(() => {
          pageNumber += 1
          if (pageNumber <= numPages) {
            _this.getPage(pdf, pageNumber, container, numPages)
          }
        })
      })
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
      this.downloadToFrontEnd()
    }
  }
}
</script>

<style scoped>
  .pdf {
    overflow: hidden;
  }
  .page {
    size: landscape;
  }
</style>
