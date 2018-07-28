<template>
  <div>
    <template v-for="navMenu in menuData">
        <el-menu-item v-if="navMenu.children==null&&navMenu&&((showEnableOnly&&navMenu.state)||(!showEnableOnly))"
                      :key="navMenu.id" :data="navMenu" :index="navMenu.value">
          <i :class="navMenu.icon" :style="{fontSize:iconSize}"></i>
          <span slot="title" style="font-size: 12px">{{navMenu.alias}}</span>
        </el-menu-item>
        <el-submenu v-if="navMenu.children&&navMenu&&((showEnableOnly&&navMenu.state)||(!showEnableOnly))"
                    :key="navMenu.id" :data="navMenu" :index="navMenu.name" :popper-append-to-body="true">
          <template slot="title">
            <i :class="navMenu.icon" :style="{fontSize:iconSize}"></i>
            <span> {{navMenu.alias}}</span>
          </template>
          <NavMenu :menuData="navMenu.children" :showEnableOnly="showEnableOnly" :iconSize="iconSize"></NavMenu>
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
// </script>
<style scoped>
</style>
