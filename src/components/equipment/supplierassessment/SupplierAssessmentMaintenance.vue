<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="supplierAssessmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商名称">
              <el-input name="supplierName" v-model="supplierAssessmentForm.supplierName" autoComplete="supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商简介">
              <el-input name="supplierDescription" v-model="supplierAssessmentForm.supplierDescription" autoComplete="supplierDescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="社会知名度">
              <el-select name="socialReputation" filterable clearable default-first-option v-model="supplierAssessmentForm.socialReputation">
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
              <el-select name="qualification" filterable clearable default-first-option v-model="supplierAssessmentForm.qualification">
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
              <el-select name="deliveryPeriod" filterable clearable default-first-option v-model="supplierAssessmentForm.deliveryPeriod">
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
              <el-select name="afterSalesServiceQuality" filterable clearable default-first-option v-model="supplierAssessmentForm.afterSalesServiceQuality">
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
              <el-select name="technicalSupportCapability" filterable clearable default-first-option v-model="supplierAssessmentForm.technicalSupportCapability">
                <el-option v-for="item in staticOptions.technicalSupportCapabilitys"
                  :key="item.id"
                  :label="item.technicalSupportCapability"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="设备技术参数说明">
              <el-select name="technicalParameter" filterable clearable default-first-option v-model="supplierAssessmentForm.technicalParameter">
                <el-option v-for="item in staticOptions.technicalParameters"
                  :key="item.id"
                  :label="item.technicalParameter"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="设备生产许可情况">
              <el-select name="productionLicense" filterable clearable default-first-option v-model="supplierAssessmentForm.productionLicense">
                <el-option v-for="item in staticOptions.productionLicenses"
                  :key="item.id"
                  :label="item.productionLicense"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="与同类产品比较情况">
              <el-select name="comparison" filterable clearable default-first-option v-model="supplierAssessmentForm.comparison">
                <el-option v-for="item in staticOptions.comparisons"
                  :key="item.id"
                  :label="item.comparison"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="性价比情况">
              <el-select name="costPerformance" filterable clearable default-first-option v-model="supplierAssessmentForm.costPerformance">
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
              <el-input name="note" v-model="supplierAssessmentForm.note" autoComplete="note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="综合评价结果">
              <el-select name="assessmentResult" filterable clearable default-first-option v-model="supplierAssessmentForm.assessmentResult">
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
              <el-select name="confirmation" filterable clearable default-first-option v-model="supplierAssessmentForm.confirmation">
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
              <el-select name="audit" filterable clearable default-first-option v-model="supplierAssessmentForm.audit">
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
              <el-select name="approve" filterable clearable default-first-option v-model="supplierAssessmentForm.approve">
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
              <el-input name="sort" v-model="supplierAssessmentForm.sort" autoComplete="sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>

      <el-row type="flex" justify="end">
        <el-button-group size="mini">
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveTop">置顶</el-button>
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveUp">上移</el-button>
          <el-button type="primary" @click.native="moveDown">下移<i class="el-icon-arrow-down"></i></el-button>
          <el-button type="primary" @click.native="moveBottom">置底<i class="el-icon-arrow-down"></i></el-button>
        </el-button-group>
      </el-row>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      @row-dblclick=dblclick
      @selection-change="handleSelectionChange"
      @select="handleSelection">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="supplierDescription"
          label="供应商简介"
          width="180">
        </el-table-column>
        <el-table-column
          prop="socialReputation"
          label="社会知名度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="qualification"
          label="资质情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deliveryPeriod"
          label="供货期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="afterSalesServiceQuality"
          label="售后服务质量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="technicalSupportCapability"
          label="技术支持能力"
          width="180">
        </el-table-column>
        <el-table-column
          prop="technicalParameter"
          label="设备技术参数说明"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productionLicense"
          label="设备生产许可情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="comparison"
          label="与同类产品比较情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="costPerformance"
          label="性价比情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="note"
          label="其它说明"
          width="180">
        </el-table-column>
        <el-table-column
          prop="assessmentResult"
          label="综合评价结果"
          width="180">
        </el-table-column>
        <el-table-column
          prop="confirmation"
          label="确认意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="audit"
          label="审核意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="approve"
          label="批准意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="文本"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="supplierAssessmentRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalSupplierAssessments">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'supplierAssessmentMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      supplierAssessmentForm: {},
      tempSupplierAssessmentForm: {},
      totalSupplierAssessments: 0,
      supplierAssessmentRequestForm: {
        supplierName: '',
        supplierDescription: '',
        socialReputation: '',
        qualification: '',
        deliveryPeriod: '',
        afterSalesServiceQuality: '',
        technicalSupportCapability: '',
        technicalParameter: '',
        productionLicense: '',
        comparison: '',
        costPerformance: '',
        note: '',
        assessmentResult: '',
        confirmation: '',
        audit: '',
        approve: '',
        sort: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      staticOptions: {
        departments: [],
        results: []
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.supplierAssessmentRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.supplierAssessmentRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/supplierAssessment/getSupplierAssessment')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/supplierAssessmentDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/supplierAssessment/querySupplierAssessment', this.supplierAssessmentRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalSupplierAssessments = res.data.totalSupplierAssessments || 0
        })
    },
    handleSelection (selection, row) {
      if (selection.indexOf(row) > 0) {
        selection.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item)
        })
      }
    },
    handleSelectionChange (selection) {
      let vm = this
      this.indexArray = []
      selection.forEach(item => {
        vm.indexArray.push(vm.tableData.indexOf(item))
      })
    },
    moveUp () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveUpSingle(item)
      })
    },
    moveTop () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveTopSingle(item)
      })
    },
    moveUpSingle (index) {
      let vm = this
      let tmp = ''
      if (index > 0) {
        this.tempSupplierAssessmentForm = this.tableData[(index - 1)]
        this.supplierAssessmentForm = this.tableData[index]
        tmp = this.tempSupplierAssessmentForm.sort
        this.tempSupplierAssessmentForm.sort = this.supplierAssessmentForm.sort
        this.supplierAssessmentForm.sort = tmp
        this.$ajax.all([this.update(this.supplierAssessmentForm), this.update(this.tempSupplierAssessmentForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      if (index > 0) {
        this.supplierAssessmentForm = this.tableData[index]
        this.$ajax.post('/api/equipment/supplierAssessment/moveToTop', this.supplierAssessmentForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveDown () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveDownSingle(item)
      })
    },
    moveBottom () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveBottomSingle(item)
      })
    },
    moveDownSingle (index) {
      let vm = this
      let tmp = ''
      if (index < this.tableData.length - 1) {
        this.tempSupplierAssessmentForm = this.tableData[(index + 1)]
        this.supplierAssessmentForm = this.tableData[index]
        tmp = this.tempSupplierAssessmentForm.sort
        this.tempSupplierAssessmentForm.sort = this.supplierAssessmentForm.sort
        this.supplierAssessmentForm.sort = tmp
        this.$ajax.all([this.update(this.supplierAssessmentForm), this.update(this.tempSupplierAssessmentForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      if (index < this.tableData.length - 1) {
        this.supplierAssessmentForm = this.tableData[index]
        this.$ajax.post('/api/equipment/supplierAssessment/moveToBottom', this.supplierAssessmentForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/supplierAssessment', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/supplierAssessment/querySupplierAssessment', this.supplierAssessmentRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalSupplierAssessments = res.data.totalSupplierAssessments || 0
          vm.$nextTick(() => {
            vm.tableData.forEach(row => {
              if (row.id === val.id) {
                vm.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          })
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
