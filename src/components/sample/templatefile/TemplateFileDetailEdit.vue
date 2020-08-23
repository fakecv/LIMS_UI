<template>
  <TemplateFileDetail
   :templateFileForm="templateFileForm"
   :staticOptions="staticOptions"
   v-on:deleteTemplateFileForm="resetTemplateFileForm"
   v-on:new="resetTemplateFileForm"
   v-on:copy="resetTemplateFileId"
  />
</template>

<script>
import TemplateFileDetail from '@/components/sample/templatefile/TemplateFileDetail'
export default {
  name: 'templateFileDetailEdit',
  components: {TemplateFileDetail},
  data () {
    return {
      templateFileForm: {
        fileName: '',
        location: '',
        content: '',
        displayName: '',
        link: '',
        show: 'yes',
        id: ''
      },
      templateFileResetForm: {
        fileName: '',
        location: '',
        content: '',
        displayName: '',
        link: '',
        show: 'yes',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    loadTemplateFile (templateFileId) {
      let vm = this
      this.$ajax.get('/api/sample/templateFile/' + templateFileId)
        .then(function (res) {
          vm.templateFileForm = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    resetTemplateFileForm () {
      this.templateFileForm = JSON.parse(JSON.stringify(this.templateFileResetForm))
    },
    resetTemplateFileId () {
      this.templateFileForm.id = ''
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadTemplateFile(this.$route.params.id)
    }
  }
}
</script>
