<template>
  <div v-on:input="input1">
    <p>My File Selector: <file-select v-model="file"></file-select></p>
    <p v-if="file">{{file.name}}</p>
  </div>
</template>

<script>
import FileSelect from './FileUpload.vue'

export default {
  components: {
    FileSelect
  },

  data () {
    return {
      file: null
    }
  },
  methods: {
    input1 (event) {
    }
  }
}
</script>
