<template>
  <DepartmentDetail :departmentForm="departmentForm"
  v-on:updateDepartmentForm="updateDepartmentForm"
  v-on:deleteDepartmentForm="resetDepartmentForm"
  v-on:new="resetDepartmentForm"
  v-on:copy="resetDepartmentId"/>
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
      },
      departmentResetForm: {
        id: '',
        departmentName: '',
        departmentDescription: ''
      }
    }
  },
  methods: {
    updateDepartmentForm (event) {
      this.departmentForm.id = event.id
    },
    resetDepartmentId () {
      this.departmentForm.id = ''
    },
    resetDepartmentForm () {
      this.departmentForm = JSON.parse(JSON.stringify(this.departmentResetForm))
    }
  },
  mounted () {
  }
}
</script>
