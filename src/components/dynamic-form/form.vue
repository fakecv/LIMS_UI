<template>
  <el-form class="dynamic-form" :inline="formConfig.inline" :model="value" :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth" :size='formConfig.size' :status-icon="formConfig.statusIcon">

    <dynamic-form-item
      v-for="item in formConfig.formItemList"
      :key="item.key"
      v-show="value[item.key]!==undefined"
      :item="item"
      :value="value[item.key]"
      @input="handleInput($event, item.key)"
      :style="{'min-width':columnMinWidth}"></dynamic-form-item>
    <slot/>

  </el-form>
</template>

<script>
export default {
  props: ['formConfig', 'value', 'columnMinWidth'],
  methods: {
    handleInput (val, key) {
      // 这里element-ui没有上报event，直接就是value了
      this.$emit('input', { ...this.value, [key]: val })
    },
    setDefaultValue () {
      const formData = { ...this.value }
      // 设置默认值
      this.formConfig.formItemList.forEach(item => {
        const { key, value } = item
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value
        }
      })
      this.$emit('input', { ...formData })
    }
  },
  activated () {
    this.setDefaultValue()
  }
}
</script>

<style lang="less">
</style>
