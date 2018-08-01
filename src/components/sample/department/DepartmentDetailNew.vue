<template>
  <DepartmentDetail :departmentForm="departmentForm"/>
</template>

<script>
import DepartmentDetail from '@/components/sample/department/DepartmentDetail'
export default {
  name: 'departmentDetailNew',
  components: {DepartmentDetail},
  data () {
    return {
      departmentForm: {
        id: '',
        departmentName: '',
        departmentDescription: ''
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
