<template>
<div class="lims">
  <el-container>
    <el-header class="lims-header" style="height: 69px">
      <el-row type="flex" justify="space-between">
        <el-col :span="3">
          <el-button icon="el-icon-menu" style="background: c3c3c3;" @click="collapseChange">{{menuStatus}}</el-button>
        </el-col>
        <el-col :span="5" class="hidden-md-and-down">
          <img :src="companyImageSource" class="image" alt=""/>
        </el-col>
        <el-col :span="10" class="hidden-md-and-down">
          <el-row type="flex" justify="left">
            <el-autocomplete
              class="inline-input"
              clearable
              default-first-option
              v-model="state2"
              prefix-icon="el-icon-search"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="true"
              @select="handleSelect"
            >
            </el-autocomplete>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-dropdown split-button type="primary" @command="handleCommand" style="min-width: 200px;">
            <i class="fa fa-user" aria-hidden="true"><span style="margin: 10px;">{{userProfile.sub}}</span></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">导航</el-dropdown-item>
              <el-dropdown-item command="b">快捷键一览</el-dropdown-item>
              <el-dropdown-item command="changePassword">更改密码</el-dropdown-item>
              <el-dropdown-item command="c" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-container class="frame">
        <el-aside v-bind:style="{marginBottom: '20px', width: elAside + 'px'}">
          <el-menu :default-active="$route.path"
            @open="handleOpen" @close="handleClose"
            @select="menuSelected"
            class="lims-el-menu-vertical"
            :unique-opened="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
            <NavMenu :menuData="leftMenus" :showEnableOnly="showEnableOnly" :iconSize="'18px'"></NavMenu>
          </el-menu>
        </el-aside>
        <el-main style="margin-bottom: 30px;padding: 0px" :border="true">
          <el-container>
            <el-header style="padding: 0px;height: 20px">
              <div id="positions">
                <Position :positions="positions"></Position>
              </div>
            </el-header>
            <!--this div will add scroll bar for the el-main, don't remove it-->
            <el-main>
              <blockquote class="minsx-quote">{{instruction}}</blockquote>
              <router-view :leftMenus="leftMenus" v-on:getTopMenus="getTopMenus"></router-view>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</div>
</template>
<script>
import 'font-awesome/css/font-awesome.min.css'
import NavMenu from './NavMenu'
import Position from './position'
import router from '@/router'
const companyImageSource = require('../../../static/image/hairui.png')
export default {
  name: 'lims',
  props: ['auth'],
  components: { NavMenu, Position },
  data () {
    return {
      userProfile: {},
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 3, 'xl': 3},
      header: {},
      activeMenu: '/lims/task',
      isCollapse: false,
      openedsMenu: [],
      showEnableOnly: true,
      topMenus: [],
      leftMenus: [],
      positions: [],
      elAside: 235,
      instruction: '导航页',
      state1: '',
      state2: '',
      menuStatus: '收起菜单',
      companyImageSource: companyImageSource,
      menuItems: [],
      shortCuts: []
    }
  },
  mounted: function () {
    this.$notify({
      title: '重要重要!',
      type: 'warning',
      message: '可以管理用户和角色的关系。',
      duration: 1000
    })
    this.header = {Authorization: localStorage.getItem('id_token')}
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'))
    this.checkIfFirstTimeLogin()
    this.getTopMenus()
    this.initialPosition()
    this.getSystemMenu()
  },
  created () {
  },
  methods: {
    checkIfFirstTimeLogin () {
      let vm = this
      this.$ajax.get('/api/users/checkIfFirstTimeLogin/' + this.userProfile.sub)
        .then(function (res) {
          if (res.data === 'yes') {
            vm.$message({
              showClose: true,
              duration: 0,
              message: '第一次登录，请更新密码！'
            })
            vm.$router.replace({path: '/login/second/' + vm.userProfile.sub})
          }
          vm.fetchShortCuts(vm.menuItems)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.message
          })
        })
    },
    changePassword () {
      this.$router.replace({path: '/login/second/' + this.userProfile.sub})
    },
    // search input
    getSystemMenu () {
      let vm = this
      this.$ajax.get('/api/systemMenu/displayedMenuItems')
        .then(function (res) {
          vm.menuItems = res.data
          vm.fetchShortCuts(vm.menuItems)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.message
          })
        })
    },
    fetchShortCuts (menuItems) {
      let vm = this
      menuItems.forEach(element => {
        let shortCut = {}
        shortCut.value = element.sort
        shortCut.path = element.value
        vm.shortCuts.push(shortCut)
      })
    },
    collapseChange () {
      this.elAside = this.isCollapse ? 235 : 0
      this.menuStatus = this.isCollapse ? '收起菜单' : '展开菜单'
      this.isCollapse = !this.isCollapse
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/systemMenu')
        .then(function (res) {
          vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: 'qry', initV: res.data})
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.message
          })
        })
    },
    handleCommand (command) {
      switch (command) {
        case 'a' :
          router.push({name: 'navPage'})
          this.initialPosition()
          this.instruction = '导航页'
          break
        case 'b' :
          router.push({name: 'shortCut'})
          this.initialPosition()
          this.instruction = '快捷键一览'
          break
        case 'changePassword' :
          this.changePassword()
          break
        case 'c' :
          this.auth.logout()
      }
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    menuSelected (key, keyPath, value) {
      let menu = value.$attrs.data
      if (menu.classifier === 'TOP') {
        if (menu.type === 'MENU') {
          this.getLeftMenus(menu.id)
        }
      } else if (menu.classifier === 'LEFT') {

      }
      /* 公共部分 */
      if (menu.type === 'LINK') {
        if (menu.value !== null && menu.value !== '') {
          this.$router.push(menu.value)
          this.instruction = menu.description
        } else {
          this.$notify.success({
            title: '温馨提示：',
            message: '对不起[' + menu.alias + ']暂未开通',
            showClose: false
          })
        }
      }
      this.positions = this.getPositionsByMenus(value)
    },
    initialPosition () {
      this.positions = [{
        value: '/lims',
        icon: 'el-icon-success',
        alias: '系统首页'
      }]
    },
    getTopMenus () {
      var vm = this
      // this.$ajax.get('/static/menu.json')
      this.$ajax.get('/api/systemMenu')
        .then(function (response) {
          vm.leftMenus = response.data.children
        //  vm.leftMenus = response.data.childs
          // vm.leftMenus.forEach(child => {
          // })
          // vm.defaultOpeneds.push(child.entity.name)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            message: error.response.data.message
          })
        })
    },
    /* 根据选取菜单改变导航面包屑 */
    getPositionsByMenus (value) {
      let positions = []
      let currnetMenu = value
      while (typeof (currnetMenu.$attrs.data) !== 'undefined') {
        let menu = currnetMenu.$attrs.data
        positions.push({
          value: menu.value === null ? null : (menu.value === '' ? null : '/' + menu.value),
          icon: menu.icon,
          alias: menu.alias
        })
        currnetMenu = currnetMenu.$parent.$parent
      }
      return positions.reverse()
    },
    querySearch (queryString, cb) {
      var shortCuts = this.shortCuts
      var results = queryString ? shortCuts.filter(this.createFilter(queryString)) : shortCuts
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (menuItem) => {
        return (menuItem.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.$router.push(item.path)
      // this.$router.push(item.value)
    }

  }
}
</script>
<style>
.lims-el-menu-vertical:not(.el-menu--collapse) {
  min-height: 100%;
  margin-bottom: 10px;
}
.el-form-item__content {
  font-size: 3px;
}
  .el-aside {
    height: 100%;
  }
  .lims-header {
    background: transparent;
    font-size: 14px;
    padding: 10px 0 10px 0;
    top: 0;
    background: rgba(255,255,255,0.9);
    left: 0;
    right: 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .appFooter {
    background-color: #e3d7d3;
  }
  .minsx-quote {
    margin-bottom: 10px;
    padding: 15px;
    margin-left: 0;
    margin-top: 0;
    margin-right: 0;
    top: 800px;
    line-height: 22px;
    border-left: 5px solid #e38335;
    border-radius: 0 2px 2px 0;
    font-size: 13px;
    color: #909399;
  }
  #positions {
    right: 0;
    top: 0;
    left: -15px;
    height: 24px;
    background-color: rgb(236,236,236);
    border-bottom: 1px solid #A9A9A9;
    padding: 5px;
    overflow: hidden;
  }
  .el-header, .el-footer {
    line-height: 55px;
  }
  .lims {
    background: white;
  }
  .image {
    height: 30px;
    width: 80px;
  }
</style>
