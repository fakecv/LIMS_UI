<template>
  <DepartmentDetail
   :departmentForm="departmentForm"
   v-on:deleteDepartment="resetDepartmentForm"
   v-on:new="resetDepartmentForm"
   v-on:copy="resetDepartmentId"/>
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
      },
      departmentResetForm: {
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
          vm.$message(error.response.data.message)
        })
    },
    resetDepartmentForm () {
      this.departmentForm = JSON.parse(JSON.stringify(this.departmentResetForm))
    },
    resetDepartmentId () {
      this.departmentForm.id = ''
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
