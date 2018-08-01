<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="experimentalMethodForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-form-item label="部门名称">
            <el-input name="experimentalMethodName" v-model="experimentalMethodForm.experimentalMethodName"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="部门描述">
            <el-input type="textarea" name="experimentalMethodDescription" v-model="experimentalMethodForm.experimentalMethodDescription"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'experimentalMethodDetail',
  props: ['experimentalMethodForm'],
  data () {
    return {
      actions: [
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    actionHandle (action) {
      // var vm = this
      console.log(action.id)
      if (action.id === '1') {
        this.saveToDB()
      } else if (action.id === '2') {
        console.log(action.id)
        this.delete()
      } else if (action.id === '3') {
        console.log(action.id)
      } else if (action.id === '4') {
        console.log(action.id)
      }
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/experimentalMethod', this.experimentalMethodForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/delete/' + this.experimentalMethodForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
        }).catch(function (error) {
          console.log('ExperimentalMethodDetail delete ' + error)
          vm.$message('Something wrong happen!')
        })
    }
  }
}
</script>
<style lang="less">
</style>
