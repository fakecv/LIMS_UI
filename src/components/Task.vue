<template>
<div>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
      ]"
    >
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'task',
  data () {
    return {
      dynamicValidateForm: {
        email: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      var vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var task = {description: vm.dynamicValidateForm.email}
          vm.$ajax.post('/api/tasks', task)
            .then(function (rep) {
              alert('submit!')
            }).catch(function (err) {
              console.log(err.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
