<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="customerNoteForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户单位">
              <el-select name="customerCompany" filterable clearable default-first-option v-model="customerNoteForm.customerCompany">
                <el-option v-for="item in staticOptions.customerCompanies"
                  :key="item.id"
                  :label="item.customerCompanyName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户样品备注信息名称" label-width="160px">
              <el-input name="customerNoteName" v-model="customerNoteForm.customerNoteName" autoComplete="customerNoteName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户样品备注信息" label-width="160px">
              <el-input type="textarea" name="customerNoteDescription" v-model="customerNoteForm.customerNoteDescription" autoComplete="customerNoteDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'customerNoteDetail',
  props: ['customerNoteForm', 'staticOptions'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '4', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '5', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '7', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12}
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
        this.$message('复制成功!')
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.confirmDelete()
      } else if (action.id === '6') {
        console.log('6')
        // this.loadQuotation()
      } else if (action.id === '7') {
        // this.auditQuotation()
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
    },
    loadQuotation () {
      this.$emit('loadQuotation')
    },
    auditQuotation () {
      this.$emit('auditQuotation')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/customer/customerNote', this.customerNoteForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateCustomerNoteForm', res.data)
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
      if (this.customerNoteForm.id && this.customerNoteForm.id !== '') {
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
      this.$ajax.get('/api/customer/customerNote/delete/' + this.customerNoteForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteCustomerNoteForm')
          vm.sampleNumberButton = false
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
