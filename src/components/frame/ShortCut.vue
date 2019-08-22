<template>
  <el-container>
    <el-header>
      <i class="fa fa-link" aria-hidden="true"><span style="margin:10px;">快捷键一览</span></i>
    </el-header>
    <el-row>
      <el-col :xl="6" :lg="8" :sm="12" :xs="24" v-for="item in menuItems " :key="item.sort" style="margin-bottom:20px;">
        <div @click="gotoLink(item.value)">
            <i :class="item.icon" aria-hidden="true"><el-button type="text">{{item.sort}}{{item.alias}}</el-button></i>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: 'shortCut',
  data () {
    return {
      menuItems: []
    }
  },
  methods: {
    getSystemMenu () {
      let vm = this
      this.$ajax.get('/api/systemMenu/displayedMenuItems')
        .then(function (res) {
          vm.menuItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    gotoLink (value) {
      this.$router.push(value)
    }
  },
  activated () {
    this.getSystemMenu()
  }
}
</script>
<style scoped>
  .box-card {
    width: 120px;
    height: 50px;
    text-align:center;
  }

</style>
