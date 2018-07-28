<template>
  <el-container>
    <el-header class="lims-header" style="height: 69px">
        <el-col :span="4">
          <img src='../../static/key_note.png' style="height: 50px">
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
        <el-col :span="12">
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6">
              <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">查看</el-dropdown-item>
                  <el-dropdown-item command="b">新增</el-dropdown-item>
                  <el-dropdown-item command="c" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>王小虎</span>
        </el-col>
          </el-row>
        </el-col>
    </el-header>
    <el-container>
      <el-aside :span=4 style="height: 800px;width: 230px">
        <el-menu unique-opened router :default-active="$route.path" @open="handleOpen" @close="handleClose" @select="menuSelected">
         <!--eslint-disable-next-line-->
         <template v-for="navMenu in leftMenus">
             <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&((showEnableOnly&&navMenu.entity.state==='ENABLE')||(!showEnableOnly))"
                           :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name"
                           :route="navMenu.entity.value">
               <i :class="navMenu.entity.icon" :style="{fontSize:iconSize}"></i>
               <span slot="title" >{{navMenu.entity.alias}}</span>
             </el-menu-item>
             <el-submenu v-if="navMenu.childs&&navMenu.entity&&((showEnableOnly&&navMenu.entity.state==='ENABLE')||(!showEnableOnly))"
                         :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
               <template slot="title">
                 <i :class="navMenu.entity.icon" :style="{fontSize:iconSize}"></i>
                 <span> {{navMenu.entity.alias}}</span>
               </template>
               <NavMenu :menuData="navMenu.childs" :showEnableOnly="showEnableOnly" :iconSize="iconSize"></NavMenu>
             </el-submenu>
         </template>
        </el-menu>
      </el-aside>
      <el-main  style="height: 800px;padding: 0px">
         <div id="positions">
           <Position :positions="positions"></Position>
         </div>
         <blockquote class="minsx-quote">{{instruction}}</blockquote>
         <router-view/>
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
import Position from './position'
require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
export default {
  name: 'lims',
  props: ['auth'],
  components: { Autocomplete, Position },
  data () {
    return {
      limsForm: {
        email: ''
      },
      header: {},
      activeMenu: '/lims/task',
      isCollapse: false,
      openedsMenu: [],
      showEnableOnly: true,
      topMenus: [],
      leftMenus: [],
      positions: [],
      instruction: '暂无使用说明',
      iconSize: '16px'
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
    this.getTopMenus()
    this.initialPosition()
  },
  methods: {
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
        value: '/',
        icon: 'el-icon-success',
        alias: '系统首页'
      }]
    },
    getTopMenus () {
      var vm = this
      this.$ajax.get('/static/menu.json')
        .then(function (response) {
          vm.leftMenus = response.data.childs
          // vm.leftMenus.forEach(child => {
          //   console.log(child.entity.name)
          //   vm.defaultOpeneds.push(child.entity.name)
          // vm.getLeftMenus(1)
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
      margin:0;
      padding-right: 30px;
      width: 100%;
  }
  #input_img {
      position:absolute;
      top:3px;
      left:5px;
      width:24px;
      height:24px;
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
  .minsx-quote {
    margin-bottom: 10px;
    padding: 15px;
    margin-left: 0;
    margin-top: 0;
    margin-right: 0;
    line-height: 22px;
    border-left: 5px solid #e38335;
    border-radius: 0 2px 2px 0;
    font-size: 13px;
    color: #909399;
  }
  #positions {
    right: 0;
    top: 0;
    left: -5px;
    height: 24px;
    background-color: #e3d7d3;
    border-bottom: 1px solid #A9A9A9;
    padding: 5px;
    overflow: hidden;
  }
</style>
