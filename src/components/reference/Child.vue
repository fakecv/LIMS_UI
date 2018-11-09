<template>
 <div id="app">
    <child1 :pChild1="child1" :pChild2="child2" @test1="test1"></child1>
 </div>
</template>
<script>
import child1 from './child1.vue'
export default {
  name: 'child',
  data () {
    return {
      child1: 'hello child1',
      child2: 'hello child2'
    }
  },
  components: { child1 },
  methods: {
    test1 () {
      console.log('test1')
    },
    test2 () {
      console.log('test2')
    }
  }
}
</script>
