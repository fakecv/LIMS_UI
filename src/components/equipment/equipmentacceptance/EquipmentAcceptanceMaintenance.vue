<template>
  <div>
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
          prop="equipmentName"
          label="设备名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格型号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂家"
          width="180">
        </el-table-column>
        <el-table-column
          prop="purchaseDate"
          label="购置日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="manufactureDate"
          label="出厂日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="manufactureNo"
          label="出厂编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="arrivalDate"
          label="到货日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="checkDate"
          label="验收日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="serviceDate"
          label="启用日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="packaging"
          label="外包装情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="checklist"
          label="清单检查"
          width="180">
        </el-table-column>
        <el-table-column
          prop="surface"
          label="仪器设备表面"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productChecklist"
          label="产品清单"
          width="180">
        </el-table-column>
        <el-table-column
          prop="indication"
          label="调试/指标检查"
          width="180">
        </el-table-column>
        <el-table-column
          prop="traceabilityRequest"
          label="溯源情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sourceManufacturer"
          label="溯源机构"
          width="180">
        </el-table-column>
        <el-table-column
          prop="certificationNo"
          label="证书编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="result"
          label="总体结论"
          width="180">
        </el-table-column>
        <el-table-column
          prop="defaultReason"
          label="不合格原因"
          width="180">
        </el-table-column>
        <el-table-column
          prop="checker"
          label="验收人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="maker"
          label="设备员"
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
          :current-page.sync="equipmentAcceptanceRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalEquipmentAcceptances">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'equipmentAcceptanceMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      equipmentAcceptanceForm: {},
      tempEquipmentAcceptanceForm: {},
      totalEquipmentAcceptances: 0,
      equipmentAcceptanceRequestForm: {
        equipmentName: '',
        specification: '',
        manufacturer: '',
        purchaseDate: '',
        manufactureDate: '',
        manufactureNo: '',
        arrivalDate: '',
        checkDate: '',
        serviceDate: '',
        packaging: '',
        checklist: '',
        surface: '',
        productChecklist: '',
        indication: '',
        traceabilityRequest: '',
        sourceManufacturer: '',
        certificationNo: '',
        result: '',
        defaultReason: '',
        checker: '',
        maker: '',
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
      this.equipmentAcceptanceRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.equipmentAcceptanceRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/equipmentAcceptance/getEquipmentAcceptance')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/equipmentAcceptanceDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/equipmentAcceptance/queryEquipmentAcceptance', this.equipmentAcceptanceRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalEquipmentAcceptances = res.data.totalEquipmentAcceptances || 0
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
        this.tempEquipmentAcceptanceForm = this.tableData[(index - 1)]
        this.equipmentAcceptanceForm = this.tableData[index]
        tmp = this.tempEquipmentAcceptanceForm.sort
        this.tempEquipmentAcceptanceForm.sort = this.equipmentAcceptanceForm.sort
        this.equipmentAcceptanceForm.sort = tmp
        this.$ajax.all([this.update(this.equipmentAcceptanceForm), this.update(this.tempEquipmentAcceptanceForm)])
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
        this.equipmentAcceptanceForm = this.tableData[index]
        this.$ajax.post('/api/equipment/equipmentAcceptance/moveToTop', this.equipmentAcceptanceForm)
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
        this.tempEquipmentAcceptanceForm = this.tableData[(index + 1)]
        this.equipmentAcceptanceForm = this.tableData[index]
        tmp = this.tempEquipmentAcceptanceForm.sort
        this.tempEquipmentAcceptanceForm.sort = this.equipmentAcceptanceForm.sort
        this.equipmentAcceptanceForm.sort = tmp
        this.$ajax.all([this.update(this.equipmentAcceptanceForm), this.update(this.tempEquipmentAcceptanceForm)])
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
        this.equipmentAcceptanceForm = this.tableData[index]
        this.$ajax.post('/api/equipment/equipmentAcceptance/moveToBottom', this.equipmentAcceptanceForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/equipmentAcceptance', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/equipmentAcceptance/queryEquipmentAcceptance', this.equipmentAcceptanceRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalEquipmentAcceptances = res.data.totalEquipmentAcceptances || 0
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
