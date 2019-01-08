<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="consumableSupplierAssessmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="关键耗材供应商名称">
              <el-input name="consumableSupplierName" v-model="consumableSupplierAssessmentForm.consumableSupplierName" autoComplete="consumableSupplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商简介">
              <el-input name="supplierDescription" v-model="consumableSupplierAssessmentForm.supplierDescription" autoComplete="supplierDescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="社会知名度">
              <el-select name="socialReputation" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.socialReputation">
                <el-option v-for="item in staticOptions.socialReputations"
                  :key="item.id"
                  :label="item.socialReputation"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="资质情况">
              <el-select name="qualification" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.qualification">
                <el-option v-for="item in staticOptions.qualifications"
                  :key="item.id"
                  :label="item.qualification"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="供货期">
              <el-select name="deliveryPeriod" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.deliveryPeriod">
                <el-option v-for="item in staticOptions.deliveryPeriods"
                  :key="item.id"
                  :label="item.deliveryPeriod"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="售后服务质量">
              <el-select name="afterSalesServiceQuality" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.afterSalesServiceQuality">
                <el-option v-for="item in staticOptions.afterSalesServiceQualitys"
                  :key="item.id"
                  :label="item.afterSalesServiceQuality"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="技术支持能力">
              <el-select name="technicalSupportCapability" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.technicalSupportCapability">
                <el-option v-for="item in staticOptions.technicalSupportCapabilitys"
                  :key="item.id"
                  :label="item.technicalSupportCapability"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关键耗材参数说明">
              <el-select name="technicalParameter" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.technicalParameter">
                <el-option v-for="item in staticOptions.technicalParameters"
                  :key="item.id"
                  :label="item.technicalParameter"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关键耗材生产许可情况">
              <el-select name="productionLicense" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.productionLicense">
                <el-option v-for="item in staticOptions.productionLicenses"
                  :key="item.id"
                  :label="item.productionLicense"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="是否满足危化品要求">
              <el-select name="hcRequirement" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.hcRequirement">
                <el-option v-for="item in staticOptions.hcRequirements"
                  :key="item.id"
                  :label="item.hcRequirement"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="价格情况">
              <el-select name="costPerformance" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.costPerformance">
                <el-option v-for="item in staticOptions.costPerformances"
                  :key="item.id"
                  :label="item.costPerformance"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="其它说明">
              <el-input name="note" v-model="consumableSupplierAssessmentForm.note" autoComplete="note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="综合评价结果">
              <el-select name="assessmentResult" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.assessmentResult">
                <el-option v-for="item in staticOptions.assessmentResults"
                  :key="item.id"
                  :label="item.assessmentResult"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="确认意见">
              <el-select name="confirmation" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.confirmation">
                <el-option v-for="item in staticOptions.confirmations"
                  :key="item.id"
                  :label="item.confirmation"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="审核意见">
              <el-select name="audit" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.audit">
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
              <el-select name="approve" filterable clearable default-first-option v-model="consumableSupplierAssessmentForm.approve">
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
              <el-input name="sort" v-model="consumableSupplierAssessmentForm.sort" autoComplete="sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'consumableSupplierAssessmentDetail',
  props: ['consumableSupplierAssessmentForm', 'staticOptions'],
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
      this.$ajax.post('/api/equipment/consumableSupplierAssessment', this.consumableSupplierAssessmentForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateConsumableSupplierAssessmentForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.consumableSupplierAssessmentForm.id && this.consumableSupplierAssessmentForm.id !== '') {
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
      this.$ajax.get('/api/equipment/consumableSupplierAssessment/delete/' + this.consumableSupplierAssessmentForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteConsumableSupplierAssessmentForm')
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
