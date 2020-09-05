<template>
<div class="login">
  <el-container class="login-container">
    <el-header class="login-header" style="height: 150px">
      登录系统
    </el-header>
    <el-main class="login-main">
      <el-tabs v-model="activeName" style="color::active: #005458" @tab-click="clickTab">
        <el-tab-pane label="用户登录" name="first" style="{color: #005458, active: {color: #005458} width: 175px}">
          <el-form :model="loginForm" :rules="simpleRules" ref="loginForm" label-width="0px" @keyup.enter.native="submitForm('loginForm')">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" placeholder="输入用户名">
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
        <el-tab-pane label="更改密码" name="second">
          <el-form :model="loginForm" :rules="rules" ref="passwordForm" label-width="0px">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" placeholder="输入用户名">
                <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="oldPassword">
              <el-input type="password" v-model="loginForm.oldPassword" placeholder="输入原密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="输入新密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input type="password" v-model="loginForm.confirmPassword" placeholder="确认新密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="updateForm('passwordForm')" style="width: 100%">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="third">
          <el-form :model="loginForm" :rules="rules" ref="regForm" label-width="0px">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" placeholder="输入用户名">
                <template slot="prepend"><i class="fa fa-user" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="输入密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input type="password" v-model="loginForm.confirmPassword" placeholder="确认密码">
                <template slot="prepend"><i class="fa fa-lock" aria-hidden="true"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="regForm('regForm')" style="width: 100%">注册</el-button>
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
export default {
  name: 'login',
  props: ['auth', 'authenticated'],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value === this.loginForm.oldPassword) {
        callback(new Error('新密码不能和原密码一致!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      loginForm: {
        userName: '',
        password: '',
        oldPassword: '',
        confirmPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validateOldPass, trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      simpleRules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clickTab () {
      this.loginForm.password = ''
      this.loginForm.oldPassword = ''
      this.loginForm.confirmPassword = ''
    },
    submitForm (formName) {
      const loginVM = {username: this.loginForm.userName, password: this.loginForm.password, rememberMe: false}
      var vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$ajax.post('/api/users/authenticate', loginVM)
            .then(function (res) {
              vm.auth.login(res.headers.authorization)
            }).catch(function (error) {
              vm.$message({
                showClose: true,
                duration: 0,
                type: 'error',
                message: error.response.data.detail
              })
            })
        } else {
          return false
        }
      })
    },
    updateForm (formName) {
      var vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$ajax.post('/api/users/updatePassword', this.loginForm)
            .then(function (res) {
              vm.$message('密码更新成功，请重新登录！')
            }).catch(function (error) {
              vm.$message({
                showClose: true,
                duration: 0,
                type: 'error',
                message: error.response.data.detail
              })
            })
        } else {
          return false
        }
      })
    },
    regForm (formName) {
      var register = {
        userName: this.loginForm.userName,
        password: this.loginForm.password
      }
      var vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$ajax.post('/api/users/sign-up', register)
            .then(function (res) {
              vm.$message('注册成功！')
            }).catch(function (error) {
              vm.$message({
                showClose: true,
                duration: 0,
                message: error.response.data.detail
              })
            })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    if (this.$route.params.id !== undefined) {
      this.activeName = this.$route.params.id
    }
    if (this.$route.params.userName !== undefined) {
      this.loginForm.userName = this.$route.params.userName
    }
  }
}
</script>
<style scoped>
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
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    overflow: scroll;
    /* Equal to height of footer */
    /* But also accounting for potential margin-bottom of last child */
    margin-bottom: -50px;
    background: #404040
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
      min-height: 300px;
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
