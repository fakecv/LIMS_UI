<template>
  <div>
    <el-row>
      <el-col :span="14">
  <el-button-group style="min-width: 200px">
    <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
    </el-button>
  </el-button-group>
</el-col>
<el-col :span="10">
  <el-form ref="form" label-width="80px">
    <el-form-item label="表单名称">
      <el-input size="mini" v-model="domain" placeholder="大写字母开头"></el-input>
    </el-form-item>
    <el-form-item label="类包名称">
      <el-input size="mini" v-model="packageName" placeholder="小写字母开头"></el-input>
    </el-form-item>
  </el-form>
</el-col>
</el-row>
</div>
</template>
<script>
export default {
  name: 'actionHeader',
  data () {
    return {
      domain: '',
      packageName: ''
    }
  },
  props: ['actions'],
  methods: {
    actionHandle (action) {
      this.$emit('add', action)
    },
    getDomainPackageName () {
      this.domain = this.$store.state.forms[this.$route.params.fid].domain
      this.packageName = this.$store.state.forms[this.$route.params.fid].packageName
    }
  },
  activated () {
    this.getDomainPackageName()
  }
}
</script>
