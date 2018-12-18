<template>
  <el-container>
    <el-header style="min-width:400px;">
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="processPriorityForm" label-width="120px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="优先级名称">
              <el-input name="processPriorityName" v-model="processPriorityForm.processPriorityName" autoComplete="priorityName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级背景颜色">
              <el-color-picker v-model="processPriorityForm.processPriorityColor"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级文字颜色">
              <el-color-picker v-model="processPriorityForm.processPriorityFontColor"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="优先级描述">
              <el-input type="textarea" name="processPriorityDescription" v-model="processPriorityForm.processPriorityDescription" autoComplete="priorityDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'processPriorityDetail',
  props: ['processPriorityForm'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-delete', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    actionHandle (action) {
      // var vm = this
      if (action.id === '1') {
        this.saveToDB()
      } else if (action.id === '2') {
        this.confirmDelete()
      } else if (action.id === '3') {
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.new()
      } else if (action.id === '6') {
        this.copy()
      } else if (action.id === '7') {
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
      this.$message('复制成功!')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/processPriority', this.processPriorityForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessPriorityForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.processPriorityForm.id && this.processPriorityForm.id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/delete/' + this.processPriorityForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteProcessPriorityForm')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
