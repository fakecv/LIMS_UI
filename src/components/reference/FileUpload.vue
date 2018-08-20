<template>
  <div>
    <label class="file-select">
      <div class="select-button">
        <span v-if="value">Selected File: {{value.name}}</span>
        <span v-else>Select File</span>
      </div>
      <input type="file" @change="handleFileChange"/>
    </label>
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
var loadingTask = pdf.createLoadingTask('../../../static/CL01-2018中文版.pdf')
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
      src: loadingTask,
      numPages: undefined
    }
  },
  methods: {
    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
    }
  },
  mounted () {
    this.src.then(pdf => {
      this.numPages = pdf.numPages
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
