<template>
  <DepartmentDetail
   :departmentForm="departmentForm"
   v-on:deleteDepartmentForm="resetDepartmentForm"
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
        sort: '',
        departmentDescription: ''
      },
      departmentResetForm: {
        id: '',
        sort: '',
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
    if (this.$route.params.id !== undefined) {
      this.loadDepartment(this.$route.params.id)
    }
  },
  activated () {
    if (this.$route.params.id !== undefined) {
      this.loadDepartment(this.$route.params.id)
    }
  }
}
</script>
