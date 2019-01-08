<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="consumableProcurementForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="关键耗材名称">
              <el-input name="consumableProcurementName" v-model="consumableProcurementForm.consumableProcurementName" autoComplete="consumableProcurementName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="申请单号">
              <el-input name="requestNo" v-model="consumableProcurementForm.requestNo" autoComplete="requestNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="申请部门">
              <el-select name="department" filterable clearable default-first-option v-model="consumableProcurementForm.department">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.department"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="等级或技术参数要求">
              <el-input name="technicalParameter" v-model="consumableProcurementForm.technicalParameter" autoComplete="technicalParameter"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="规格/数量">
              <el-input name="amount" v-model="consumableProcurementForm.amount" autoComplete="amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="用途">
              <el-input name="purpose" v-model="consumableProcurementForm.purpose" autoComplete="purpose"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="建议供应商">
              <el-input name="suggestedSupplier" v-model="consumableProcurementForm.suggestedSupplier" autoComplete="suggestedSupplier"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="室意见">
              <el-select name="check" filterable clearable default-first-option v-model="consumableProcurementForm.check">
                <el-option v-for="item in staticOptions.checks"
                  :key="item.id"
                  :label="item.check"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="审核意见">
              <el-select name="audit" filterable clearable default-first-option v-model="consumableProcurementForm.audit">
                <el-option v-for="item in staticOptions.audits"
                  :key="item.id"
                  :label="item.audit"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="批准意见">
              <el-select name="approve" filterable clearable default-first-option v-model="consumableProcurementForm.approve">
                <el-option v-for="item in staticOptions.approves"
                  :key="item.id"
                  :label="item.approve"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文本">
              <el-input name="sort" v-model="consumableProcurementForm.sort" autoComplete="sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'consumableProcurementDetail',
  props: ['consumableProcurementForm', 'staticOptions'],
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
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
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
      this.$ajax.post('/api/equipment/consumableProcurement', this.consumableProcurementForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateConsumableProcurementForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.consumableProcurementForm.id && this.consumableProcurementForm.id !== '') {
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
      this.$ajax.get('/api/equipment/consumableProcurement/delete/' + this.consumableProcurementForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteConsumableProcurementForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
