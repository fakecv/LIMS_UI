<template>
  <el-container>
    <el-header style="min-width:400px;">
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="experimentItemsParameterForm" label-width="150px" label-position="left" size="mini">
        <el-row>
          <el-form-item label="检测项目名称">
              <el-select name="experimentalItem" filterable default-first-option v-model="experimentItemsParameterForm.experimentalItem">
                <el-option v-for="item in staticOptions.experimentalItems"
                  :key="item.Id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="检测项目参数">
              <el-input name="experimentItemsParameterName" v-model="experimentItemsParameterForm.experimentItemsParameterName" autoComplete="experimentItemsParameterName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col>
            <el-form-item label="检测项目参数描述">
              <el-input type="textarea" name="experimentItemsParameterDescription" v-model="experimentItemsParameterForm.experimentItemsParameterDescription" autoComplete="experimentItemsParameterDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'experimentItemsParameterDetail',
  props: ['experimentItemsParameterForm', 'staticOptions'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
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
        this.confirmDelete()
      } else if (action.id === '3') {
        console.log(action.id)
      } else if (action.id === '4') {
        console.log(action.id)
      } else if (action.id === '5') {
        this.new()
      } else if (action.id === '6') {
        this.copy()
      } else if (action.id === '7') {
        console.log(action.id)
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/experimentItemsParameter', this.experimentItemsParameterForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateExperimentItemsParameterForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.experimentItemsParameterForm.id && this.experimentItemsParameterForm.id !== '') {
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
      this.$ajax.get('/api/sample/experimentItemsParameter/delete/' + this.experimentItemsParameterForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteExperimentItemsParameter')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
