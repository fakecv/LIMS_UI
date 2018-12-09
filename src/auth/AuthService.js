import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'
export default class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login (authResult) {
    this.setSession(authResult)
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    var jwtDec = require('jwt-decode')
    var token = (authResult).substring(7)
    var decoded = jwtDec(token)
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      decoded.exp * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult)
    localStorage.setItem('id_token', authResult)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('userProfile', JSON.stringify(decoded))
    // localStorage.setItem('userProfile', decoded.sub)
    this.authNotifier.emit('authChange', { authenticated: true })
    // 正式上线应该跳转至欢迎页面，或者流转状态列表
    router.push({name: 'navPage'})
    // router.push({path: '/login/second'})
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace({path: '/login/first'})
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
