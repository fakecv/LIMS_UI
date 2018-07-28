<template>
  <el-container>
    <el-header class="lims-header" style="height: 69px">
        <el-col :span="1">
          <el-button type="primary" icon="el-icon-menu" @click="collapseChange"></el-button>
        </el-col>
        <el-col :span="4">
          <img src='../../../static/key_note.png' style="height: 50px;float:right;">
        </el-col>
        <el-col :span="8">
            <div id="input_container">
              <i class="el-icon-search" id="input_img"></i>
            <autocomplete
              url="http://localhost:3000/api/tasks"
              anchor="id"
              label="description"
              id="input"
              :customHeaders="header"
              :required="true"
              :debounce="1000"
              :filterByAnchor="true"
              :on-select="getData">
            </autocomplete>
          </div>
        </el-col>
        <el-col :span="11">
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6">
              <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="float:right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">查看</el-dropdown-item>
                  <el-dropdown-item command="b">新增</el-dropdown-item>
                  <el-dropdown-item command="c" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>{{userProfile.sub}}</span>
        </el-col>
          </el-row>
        </el-col>
    </el-header>
    <el-container>
      <el-aside v-bind:style="{marginBottom: '20px', width: elAside + 'px'}">
        <el-menu unique-opened :default-active="$route.path" @open="handleOpen" @close="handleClose" @select="menuSelected" class="lims-el-menu-vertical">
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
       <el-container>
         <!-- <blockquote class="minsx-quote">{{instruction}}</blockquote> -->
         <router-view></router-view>
     </el-container>
     </el-container>
      </el-main>
    </el-container>
    <el-footer id="footer" style="height: 30px">
      <i>@简更</i>
    </el-footer>
  </el-container>
</template>
<script>
import Autocomplete from 'vue2-autocomplete-js'
import 'font-awesome/css/font-awesome.min.css'
import NavMenu from './NavMenu'
import Position from './position'
require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
export default {
  name: 'lims',
  props: ['auth'],
  components: { Autocomplete, NavMenu, Position },
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
      instruction: '暂无使用说明'
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
    console.log(this.userProfile)
    this.getTopMenus()
    this.initialPosition()
  },
  created () {
    this.loadData()
  },
  methods: {
    collapseChange () {
      console.log('collapse')
      this.elAside = this.isCollapse ? 235 : 0
      this.isCollapse = !this.isCollapse
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/systemMenu')
        .then(function (res) {
          vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: 'qry', initV: res.data})
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    },
    getData (obj) {
      console.log(obj)
      this.$router.push({path: '/lims/task'})
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
      console.log(key)
      console.log(keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    menuSelected (key, keyPath, value) {
      let menu = value.$attrs.data.entity
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
      this.$ajax.get('/static/menu.json')
      // this.$ajax.get('/api/systemMenu')
        .then(function (response) {
          // vm.leftMenus = response.data.children
          vm.leftMenus = response.data.childs
          // vm.leftMenus.forEach(child => {
          //   console.log(child.name)
          // })
          // vm.defaultOpeneds.push(child.entity.name)
        }).catch(function (error) {
          console.log(error)
        })
    },
    /* 根据选取菜单改变导航面包屑 */
    getPositionsByMenus (value) {
      let positions = []
      let currnetMenu = value
      while (typeof (currnetMenu.$attrs.data) !== 'undefined') {
        let menu = currnetMenu.$attrs.data.entity
        positions.push({
          value: menu.value === null ? null : (menu.value === '' ? null : '/' + menu.value),
          icon: menu.icon,
          alias: menu.alias
        })
        currnetMenu = currnetMenu.$parent.$parent
      }
      return positions.reverse()
    }
  }
}
</script>
<style>
.lims-el-menu-vertical:not(.el-menu--collapse) {
  min-height: 880px;
  margin-bottom: 10px;
}
.el-form-item__content {
  font-size: 3px;
}
  .lims-header {
    z-index: 1000;
    background: transparent;
    font-size: 14px;
    padding: 10px 0 10px 0;
    top: 0;
    background: rgba(255,255,255,0.9);
    left: 0;
    right: 0;
    border-bottom: 1px solid #f1f1f1;
  }
  #input_container {
      position:relative;
      padding:0 0 0 24px;
      margin:0 20px;
      width: 200px;
      top: 0px;
  }
  #input {
      height:20px;
      margin:10;
      padding-right: 30px;
      width: 100%;
      border-style:none;
      background-color: #A9A9A9;
      color: #FFFFFF;
  }
  #input_img {
      position:absolute;
      top:18px;
      left:4px;
      width:20px;
      height:20px;
      padding-left: 3px;
      padding-top: 3px;
      background-color: #A9A9A9;
  }
  #footer {
    color: #7F7C7C;
    text-align: center;
    position: absolute;
    bottom: 0px;
    height: 20px;
    line-height: 20px;
    left: 0;
    right: 0;
    padding: 0px;
    border-top: 1px solid #A9A9A9;
    border-bottom: 5px solid #e38335;
  }
  .appFooter {
    background-color: #e3d7d3;
    margin-top: 100px;
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
    background-color: #e3d7d3;
    border-bottom: 1px solid #A9A9A9;
    padding: 5px;
    overflow: hidden;
  }
  .el-header, .el-footer {
    line-height: 55px;
  }
</style>
