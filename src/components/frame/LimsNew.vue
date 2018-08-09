<template>
  <el-container>
    <el-header class="lims-header" style="height: 69px">
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-menu" @click="collapseChange"></el-button>
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
          <el-menu :default-active="$route.path" @open="handleOpen" @close="handleClose" @select="menuSelected" class="lims-el-menu-vertical">
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
</template>
<script>
import 'font-awesome/css/font-awesome.min.css'
import NavMenu from './NavMenu'
import Position from './position'
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
      state2: ''
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
    this.restaurants = this.loadAll()
  },
  created () {
    // this.loadData()
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
      console.log(key)
      console.log(keyPath)
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
          console.log(error)
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
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    handleSelect (item) {
      console.log(item)
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
    background-color: #e3d7d3;
    border-bottom: 1px solid #A9A9A9;
    padding: 5px;
    overflow: hidden;
  }
  .el-header, .el-footer {
    line-height: 55px;
  }
</style>
