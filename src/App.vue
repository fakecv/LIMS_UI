<template>
  <div class="app">
    <div class="container">
      <router-view
      :auth="auth"
      :authenticated="authenticated">
      </router-view>
    </div>
    <div id="footer">
      <i>@阿敦</i>
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
  width: 100%;
  height: 100%;
  overflow-y:scroll;
  background: rgb(0,128,128);
}
.container {
  min-height: 100%;
  margin-bottom: -30px;
}
#footer {
  height: 30px;
  line-height: 24px;
  text-align: center;
  border-top: 1px solid #A9A9A9;
  border-bottom: 5px solid #e38335;
  z-index: -1;
}
</style>
