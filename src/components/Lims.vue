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
        <el-menu id="limsMenu" unique-opened :default-active="$route.path" @open="handleOpen" @close="handleClose">
          <template v-for="(item,index) in this.routes" v-if="!item.hidden">
            <el-submenu :key="index" :index="index + ''">
              <template slot="title">
                <i :class="item.iconCls" style="color: #20a0ff;width: 14px;"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item width="100px"
                style="padding-left: 60px;padding-right:0px;margin-left: 0px;width: 100px;text-align: left"
                v-for="child in item.children"
                :index="child.path"
                :key="child.path">{{child.name}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main  style="height: 800px;">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <i>@简更</i>
    </el-footer>
  </el-container>
</template>
<script>
import Autocomplete from 'vue2-autocomplete-js'
import 'font-awesome/css/font-awesome.min.css'
require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
export default {
  name: 'lims',
  props: ['auth'],
  components: { Autocomplete },
  data () {
    return {
      limsForm: {
        email: ''
      },
      header: {},
      activeMenu: '/lims/task',
      isCollapse: false,
      openedsMenu: [],
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }],
        email1: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    user () {
      return 'augur'
    },
    routes () {
      var routes = [
        {
          name: 'equipment',
          iconCls: 'fa fa-user',
          children: [
            {name: 'User Detail', path: '/lims/userDetail'},
            {name: 'User Maintenance', path: '/lims/userMaintenance'},
            {name: 'Task Management', path: '/lims/task'},
            {name: 'hello1', path: '1-4'},
            {name: 'hello', path: '1-5'},
            {name: 'hello1', path: '1-6'},
            {name: 'hello18', path: '1-118'}
          ]
        },
        {name: 'management', iconCls: 'fa fa-user', children: [{name: 'hello', path: '1-2'}]}
      ]
      return routes
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
</style>
