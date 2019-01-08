<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="equipmentAcceptanceForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="设备名称">
              <el-input name="equipmentName" v-model="equipmentAcceptanceForm.equipmentName" autoComplete="equipmentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="规格型号">
              <el-input name="specification" v-model="equipmentAcceptanceForm.specification" autoComplete="specification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="生产厂家">
              <el-input name="manufacturer" v-model="equipmentAcceptanceForm.manufacturer" autoComplete="manufacturer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="购置日期">
              <el-date-picker type="datetime" placeholder="请选择购置日期" default-time="12:00:00" v-model="equipmentAcceptanceForm.purchaseDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="出厂日期">
              <el-date-picker type="datetime" placeholder="请选择出厂日期" default-time="12:00:00" v-model="equipmentAcceptanceForm.manufactureDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="出厂编号">
              <el-input name="manufactureNo" v-model="equipmentAcceptanceForm.manufactureNo" autoComplete="manufactureNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="到货日期">
              <el-date-picker type="datetime" placeholder="请选择到货日期" default-time="12:00:00" v-model="equipmentAcceptanceForm.arrivalDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="验收日期">
              <el-date-picker type="datetime" placeholder="请选择验收日期" default-time="12:00:00" v-model="equipmentAcceptanceForm.checkDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="启用日期">
              <el-date-picker type="datetime" placeholder="请选择启用日期" default-time="12:00:00" v-model="equipmentAcceptanceForm.serviceDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="外包装情况">
              <el-select name="packaging" filterable clearable default-first-option v-model="equipmentAcceptanceForm.packaging">
                <el-option v-for="item in staticOptions.packagings"
                  :key="item.id"
                  :label="item.packaging"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="清单检查">
              <el-select name="checklist" filterable clearable default-first-option v-model="equipmentAcceptanceForm.checklist">
                <el-option v-for="item in staticOptions.checklists"
                  :key="item.id"
                  :label="item.checklist"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="仪器设备表面">
              <el-select name="surface" filterable clearable default-first-option v-model="equipmentAcceptanceForm.surface">
                <el-option v-for="item in staticOptions.surfaces"
                  :key="item.id"
                  :label="item.surface"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="产品清单">
              <el-select name="productChecklist" filterable clearable default-first-option v-model="equipmentAcceptanceForm.productChecklist">
                <el-option v-for="item in staticOptions.productChecklists"
                  :key="item.id"
                  :label="item.productChecklist"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="调试/指标检查">
              <el-input name="indication" v-model="equipmentAcceptanceForm.indication" autoComplete="indication"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="溯源情况">
              <el-radio-group v-model="equipmentAcceptanceForm.traceabilityRequest">
                <el-radio label="OPTIONS">选项</el-radio>
                <el-radio label="LINK">链接</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="溯源机构">
              <el-input name="sourceManufacturer" v-model="equipmentAcceptanceForm.sourceManufacturer" autoComplete="sourceManufacturer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="证书编号">
              <el-input name="certificationNo" v-model="equipmentAcceptanceForm.certificationNo" autoComplete="certificationNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="总体结论">
              <el-select name="result" filterable clearable default-first-option v-model="equipmentAcceptanceForm.result">
                <el-option v-for="item in staticOptions.results"
                  :key="item.id"
                  :label="item.result"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="不合格原因">
              <el-input name="defaultReason" v-model="equipmentAcceptanceForm.defaultReason" autoComplete="defaultReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="验收人">
              <el-select name="checker" filterable clearable default-first-option v-model="equipmentAcceptanceForm.checker">
                <el-option v-for="item in staticOptions.checkers"
                  :key="item.id"
                  :label="item.checker"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="设备员">
              <el-select name="maker" filterable clearable default-first-option v-model="equipmentAcceptanceForm.maker">
                <el-option v-for="item in staticOptions.makers"
                  :key="item.id"
                  :label="item.maker"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文本">
              <el-input name="sort" v-model="equipmentAcceptanceForm.sort" autoComplete="sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'equipmentAcceptanceDetail',
  props: ['equipmentAcceptanceForm', 'staticOptions'],
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
      this.$ajax.post('/api/equipment/equipmentAcceptance', this.equipmentAcceptanceForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateEquipmentAcceptanceForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.equipmentAcceptanceForm.id && this.equipmentAcceptanceForm.id !== '') {
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
      this.$ajax.get('/api/equipment/equipmentAcceptance/delete/' + this.equipmentAcceptanceForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteEquipmentAcceptanceForm')
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
