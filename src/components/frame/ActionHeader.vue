<template>
  <div>
    <el-row>
      <el-col :span="14">
  <el-button-group>
    <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
    </el-button>
  </el-button-group>
</el-col>
<el-col :span="10" style="padding-top: 10px">
  <el-form ref="form" label-width="80px">
    <el-form-item label="表单名称">
      <el-input v-model="domain"></el-input>
    </el-form-item>
  </el-form>
</el-col>
</el-row>
</div>
</template>
<script>
export default {
  name: 'actoinHeader',
  data () {
    return {
    }
  },
  props: ['actions'],
  computed: {
    domain: {
      get () {
        return this.$store.state.forms[this.$route.params.fid].domain
      },
      set (domain) {
        this.$store.commit('FORM_UPDATE_WITH_FID_DOMAIN', { fid: this.$route.params.fid, domain })
      }
    }
  },
  methods: {
    actionHandle (action) {
      // action.loading = true
      this.$emit('add', action)
    }
  }
}
</script>
