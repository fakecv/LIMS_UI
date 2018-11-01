<template>
<div class="app">
  <el-container class="forgetPassword-container">
    <el-header class="forgetPassword-header" style="height: 150px">
      <div class="forgetPassword-router">
        <router-link style="color: #005458" :to="{name: 'login', params:{id:'first'}}">
          <i class="fa fa-arrow-circle-o-left fa-2x" aria-hidden="true"></i>
        </router-link>
      </div>
      <h3>忘记密码</h3>
    </el-header>
    <el-main class="forgetPassword-main">
      <el-form :model="forgetPasswordForm" :rules="rules" ref="forgetPasswordForm" label-width="0px">
        <el-form-item prop="email">
          <el-input v-model="forgetPasswordForm.email" placeholder="输入邮箱">
            <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="submitForm('forgetPasswordForm')" style="width: 100%">发送</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer class="forgetPassword-footer">
        <i>@阿敦</i>
    </el-footer>
  </el-container>
</div>
</template>
<script>
export default {
  name: 'forgetPassword',
  data () {
    return {
      forgetPasswordForm: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    /* eslint-disable */
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.post('/api/forgetPassword', {email: this.forgetPasswordForm.email, password: this.forgetPasswordForm.password})
            .then(function (res) {
              alert('submit!')
            }.bind(this)).catch(function (err) {
            }.bind(this))
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
  .forgetPassword-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 0px 0px 0px 0px;
    background: #e38335;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .forgetPassword-header {
    margin: 0px auto 0px auto;
    text-align: center;
    color: #005458;
    padding: 50px 0px 0px 0px;
    background: #e3d7d3;
    width: 350px;
    border-radius: 5px;
  }
  .forgetPassword-main {
    background: #ffffff;
    margin: -5px auto;
    width: 350px;
    text-align: center;
  }
  .forgetPassword-footer {
    margin: 0px 0px 35px 0px;
    text-align: left;
    color: #005458;
    padding: 30px 0px 0px 0px;
    background: #e38335
  }
  .forgetPassword-router {
    margin: 0px -20px -20px 10px;
    text-align: left;
    color: #005458;
  }
  .app {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    /* Equal to height of footer */
    /* But also accounting for potential margin-bottom of last child */
    margin-bottom: -50px;
    background: #636371
  }
   @media (max-width: 575.98px) {
    .forgetPassword-container {
      border-radius: 5px;
      background-clip: padding-box;
      margin: 0px auto;
      width: 100%;
      padding: 0px 0px 0px 0px;
      background: #e38335;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
    .forgetPassword-header {
      margin: 0px auto 0px auto;
      text-align: center;
      color: #005458;
      padding: 50px 0px 0px 0px;
      background: #e3d7d3;
      width: 100%;
      border-radius: 5px;
    }
    .forgetPassword-main {
      background: #ffffff;
      margin: -5px auto;
      width: 100%;
      text-align: center;
    }
    .forgetPassword-footer {
      margin: 0px 0px 35px 0px;
      text-align: left;
      color: #005458;
      padding: 30px 0px 0px 0px;
      background: #e38335
    }
    .forgetPassword-router {
      margin: 0px -20px -20px 10px;
      text-align: left;
      color: #005458;
    }
   }
</style>
