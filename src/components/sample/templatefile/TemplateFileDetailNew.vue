<template>
  <TemplateFileDetail
   :templateFileForm="templateFileForm"
   :staticOptions="staticOptions"
   v-on:updateTemplateFileForm="updateTemplateFileForm"
   v-on:deleteTemplateFileForm="resetTemplateFileForm"
   v-on:new="resetTemplateFileForm"
   v-on:copy="resetTemplateFileId"
  />
</template>

<script>
import TemplateFileDetail from '@/components/sample/templatefile/TemplateFileDetail'
export default {
  name: 'templateFileDetailNew',
  components: {TemplateFileDetail},
  data () {
    return {
      templateFileForm: {
        fileName: '',
        location: '',
        content: '',
        displayName: '',
        link: '',
        show: '',
        id: ''
      },
      templateFileResetForm: {
        fileName: '',
        location: '',
        content: '',
        displayName: '',
        link: '',
        show: '',
        id: ''
      },
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    updateTemplateFileForm (event) {
      this.templateFileForm.id = event.id
    },
    resetTemplateFileId () {
      this.templateFileForm.id = ''
    },
    resetTemplateFileForm () {
      this.templateFileForm = JSON.parse(JSON.stringify(this.templateFileResetForm))
    }
  },
  mounted () {
  }
}
</script>
