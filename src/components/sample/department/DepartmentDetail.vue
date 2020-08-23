<template>
  <el-container>
    <el-header style="min-width:400px;">
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px" direction="vertical">
      <el-form :model="departmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-form-item label="部门名称">
            <el-input name="departmentName" v-model="departmentForm.departmentName"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="部门描述">
            <el-input type="textarea" name="departmentDescription" v-model="departmentForm.departmentDescription"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'departmentDetail',
  props: ['departmentForm'],
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
      modalclose: true,
      keyinput: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: true,
      imagecountseparator: 'of',
      showimagecount: true,
      showthumbnails: true,
      imageNumber: 1,
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      images: [
        {caption: '1', imageUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=294891024,3760856881&fm=26&gp=0.jpg'},
        {caption: '2', imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565668569011&di=2b6c2fd67f310dbb66a7c90a61b02cfc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0197fa570a2bfb6ac7251f05e8c74a.jpg%401280w_1l_2o_100sh.jpg'},
        {caption: '3', imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565668569009&di=48f9ead951671d4e654f5eec564c811f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016e45578d9c010000012e7ece8753.jpg%40900w_1l_2o'},
        {caption: '4', imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565668569009&di=0afefaa510ec9f0147196456dea00228&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01550d5964b431a8012193a33b5cb8.jpg%401280w_1l_2o_100sh.jpg'}
      ]
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
      this.$message('复制成功!')
      this.$emit('copy')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/department', this.departmentForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateDepartmentForm', res.data)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    confirmDelete () {
      let vm = this
      if (this.departmentForm.id && this.departmentForm.id !== '') {
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
      this.$ajax.get('/api/sample/department/delete/' + this.departmentForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteDepartmentForm')
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    }
  }
}
</script>
<style lang="less">
</style>
