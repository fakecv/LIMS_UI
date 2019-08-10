<template>
  <div class="app">
    <div class="container1">
      <router-view
      :auth="auth"
      :authenticated="authenticated">
      </router-view>
    </div>
    <div id="footer">
      <span>上海阿敦信息科技有限公司</span>
    </div>
  </div>
</template>
<script>
import AuthService from './auth/AuthService'
const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth
export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated,
      appClass: ''
    }
  },
  methods: {
    login,
    logout
  }
}
</script>
<style scoped>
.app {
  position: fixed;
  min-height: 100%;
  width: 100%;
  height: 100%;
  overflow-y:scroll;
  font-family: '微软雅黑', 'Courier New', Courier, monospace;
  font-size: 10px;
  background: url(../static/image/background.jpg);
  /* background: rgb(0, 128, 128); */
  background-size: cover;
}
.container1 {
  min-height: 100%;
  margin-bottom: -30px;
  background: white;
}
#footer {
  height: 30px;
  line-height: 24px;
  text-align: center;
  font-size: 6px;
  color:steelblue;
  border-top: 1px solid #A9A9A9;
  border-bottom: 5px solid #e38335;
  z-index: -1;
}
</style>
