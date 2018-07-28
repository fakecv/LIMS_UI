<template>
  <div>
    <template v-for="navMenu in menuData">
        <el-menu-item v-if="navMenu.childs==null&&navMenu.entity&&((showEnableOnly&&navMenu.entity.state==='ENABLE')||(!showEnableOnly))"
                      :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.value">
          <i :class="navMenu.entity.icon" :style="{fontSize:iconSize}"></i>
          <span slot="title" style="font-size: 12px">{{navMenu.entity.alias}}</span>
        </el-menu-item>
        <el-submenu v-if="navMenu.childs&&navMenu.entity&&((showEnableOnly&&navMenu.entity.state==='ENABLE')||(!showEnableOnly))"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :popper-append-to-body="true">
          <template slot="title">
            <i :class="navMenu.entity.icon" :style="{fontSize:iconSize}"></i>
            <span> {{navMenu.entity.alias}}</span>
          </template>
          <NavMenu :menuData="navMenu.childs" :showEnableOnly="showEnableOnly" :iconSize="iconSize"></NavMenu>
        </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'NavMenu',
  props: ['menuData', 'showEnableOnly', 'textColor', 'iconColor', 'iconSize'],
  data () {
    return {}
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
