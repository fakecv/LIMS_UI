<template>
  <DepartmentDetail :departmentForm="departmentForm"/>
</template>

<script>
import DepartmentDetail from '@/components/sample/department/DepartmentDetail'
export default {
  name: 'departmentDetailEdit',
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
    loadDepartment (departmentId) {
      let vm = this
      this.$ajax.get('/api/sample/department/' + departmentId)
        .then(function (res) {
          vm.departmentForm = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadDepartment!')
        })
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    if (this.$route.params.id !== undefined) {
      this.loadDepartment(this.$route.params.id)
    }
  }
}
</script>
