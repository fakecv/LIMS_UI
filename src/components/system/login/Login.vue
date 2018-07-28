<template>
<div class="app">
  <el-container class="login-container">
    <el-header class="login-header" style="height: 150px">
      登录系统
    </el-header>
    <el-main class="login-main">
      <el-tabs v-model="activeName" style="color::active: #005458">
        <el-tab-pane label="用户登录" name="first" style="{color: #005458, active: {color: #005458} width: 175px}">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="输入用户名">
                <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="输入密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="submitForm('loginForm')" style="width: 100%">登录</el-button>
            </el-form-item>
            <el-form-item>
              <router-link style="color: #005458" :to="{name: 'forgetPassword'}">忘记密码了？</router-link>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="second">
          <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="输入用户名">
                <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="输入密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="regForm('registerForm')" style="width: 100%">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer class="login-footer">
        <i>@阿敦</i>
    </el-footer>
  </el-container>
</div>
</template>
<script>
import toastr from 'toastr'
export default {
  name: 'login',
  props: ['auth', 'authenticated'],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      activeName: 'first',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      var credentials = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      var vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$ajax.post('/api/login', credentials)
            .then(function (res) {
              vm.auth.login(res.headers.authorization)
            }).catch(function (error) {
              console.log(error.message)
              toastr.options = { positionClass: 'toast-top-center' }
              toastr.error('用户名或者密码输入不正确！')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    regForm (formName) {
      var register = {
        username: this.registerForm.username,
        password: this.registerForm.password
      }
      var vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$ajax.post('/api/users/sign-up', register)
            .then(function (res) {
              toastr.success('注册成功！')
            }).catch(function (error) {
              toastr.error(error.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    this.activeName = this.$route.params.id
  }
}
</script>
<style scoped>
  body {
    background: #37373f;
  }
  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 0px 0px 0px 0px;
    background: #e38335;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container > .el-header {
    margin: 0px auto 0px auto;
    color: #005458;
    line-height: 150px;
    text-align: center;
    background: #e3d7d3;
    width: 348px;
    border-radius: 5px;
  }
  .login-main {
    background: #ffffff;
    margin: -5px auto;
    width: 348px;
    text-align: center;
  }
  .login-footer {
    margin: 0px 0px 35px 0px;
    text-align: left;
    color: #005458;
    padding: 30px 10px 10px 0px;
    background: #e38335
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
    .login-container {
      border-radius: 5px;
      min-width: 300px;
      background-clip: padding-box;
      margin: 0;
      width: 100%;
      height: 100%;
      padding: 0px 0px 0px 0px;
      background: #e38335;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
    .login-container > .el-header {
      margin: 0px auto 0px auto;
      line-height: 50px;
      text-align: center;
      color: #005458;
      padding: 0px 0px 0px 0px;
      background: #e3d7d3;
      width: 100%;
      border-radius: 5px;
    }
    .login-main {
      background: #ffffff;
      margin: -100px 0px auto;
      width: 100%;
      text-align: center;
    }
    .login-footer {
      margin: 0px 0px 35px 0px;
      text-align: left;
      color: #005458;
      padding: 30px 10px 10px 0px;
      background: #e38335
    }
  }
</style>
