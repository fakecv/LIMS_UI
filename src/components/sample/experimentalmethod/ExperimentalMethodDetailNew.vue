<template>
  <ExperimentalMethodDetail :experimentalMethodForm="experimentalMethodForm"/>
</template>

<script>
import ExperimentalMethodDetail from '@/components/sample/experimentalMethod/ExperimentalMethodDetail'
export default {
  name: 'experimentalMethodDetailNew',
  components: {ExperimentalMethodDetail},
  data () {
    return {
      experimentalMethodForm: {
        experimentalMethodName: '',
        experimentalMethodDescription: ''
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
