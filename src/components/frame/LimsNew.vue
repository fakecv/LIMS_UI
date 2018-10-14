<template>
<div class="lims">
  <el-container>
    <el-header class="lims-header" style="height: 69px">
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-button icon="el-icon-menu" style="background: c3c3c3;" @click="collapseChange">{{menuStatus}}</el-button>
          <img :src="companyImageSource" class="image" alt=""/>
        </el-col>
        <el-col :span="8" class="hidden-md-and-down">
          <el-row type="flex" justify="center">
          <el-autocomplete
          class="inline-input"
          v-model="state2"
          prefix-icon="el-icon-search"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          ></el-autocomplete>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-col :span="2">
              <el-dropdown @command="handleCommand">
                <i class="fa fa-user" aria-hidden="true" style="float:right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">查看</el-dropdown-item>
                  <el-dropdown-item command="b">新增</el-dropdown-item>
                  <el-dropdown-item command="c" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="8">
              <span>{{userProfile.sub}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-container class="frame">
        <el-aside v-bind:style="{marginBottom: '20px', width: elAside + 'px'}">
          <el-menu :default-active="$route.path" @open="handleOpen" @close="handleClose" @select="menuSelected" class="lims-el-menu-vertical" :unique-opened="true">
            <NavMenu :menuData="leftMenus" :showEnableOnly="showEnableOnly" :iconSize="'10px'"></NavMenu>
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
              <!-- <blockquote class="minsx-quote">{{instruction}}</blockquote> -->
              <router-view></router-view>
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
      instruction: '暂无使用说明',
      restaurants: [],
      state1: '',
      state2: '',
      menuStatus: '收起菜单',
      companyImageSource: companyImageSource
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
    this.getTopMenus()
    this.initialPosition()
    this.restaurants = this.loadAll()
  },
  created () {
    // this.loadData()
  },
  methods: {
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
          vm.$message(error.response.data.message)
        })
    },
    handleCommand (command) {
      switch (command) {
        case 'a' :
          alert('a')
          break
        case 'b' :
          alert('b')
          break
        case 'c' :
          this.auth.logout()
      }
    },
    handleOpen (key, keyPath) {
      // console.log(key)
      // console.log(keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
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
            message: '对不起[' + menu.alias + ']暂未开通  您可以关注Minsx主页[www.minsx.com]随时获取项目进度!',
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
          console.log('LimsNew')
          vm.leftMenus = response.data.children
        //  vm.leftMenus = response.data.childs
          // vm.leftMenus.forEach(child => {
          //   console.log(child.name)
          // })
          // vm.defaultOpeneds.push(child.entity.name)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    handleSelect (item) {
      // console.log(item)
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
    background-color: #c3c3c3;
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
