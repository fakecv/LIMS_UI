<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="procurementForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="仪器设备名称">
              <el-input name="procurementName" v-model="procurementForm.procurementName" autoComplete="procurementName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="申请单号">
              <el-input name="requestNo" v-model="procurementForm.requestNo" autoComplete="requestNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="日期时间">
              <el-date-picker type="datetime" placeholder="请选择" default-time="12:00:00" v-model="procurementForm.申请日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="申请部门">
              <el-select name="department" filterable clearable default-first-option v-model="procurementForm.department">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.department"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="申请人">
              <el-select name="applicantName" filterable clearable default-first-option v-model="procurementForm.applicantName">
                <el-option v-for="item in staticOptions.applicantNames"
                  :key="item.id"
                  :label="item.applicantName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="适用项目">
              <el-input name="applicableItem" v-model="procurementForm.applicableItem" autoComplete="applicableItem"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="生产厂家">
              <el-input name="manufacturer" v-model="procurementForm.manufacturer" autoComplete="manufacturer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="规格型号">
              <el-input name="specification" v-model="procurementForm.specification" autoComplete="specification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="申请理由">
              <el-input name="reason" v-model="procurementForm.reason" autoComplete="reason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="性能指标要求">
              <el-input name="performance" v-model="procurementForm.performance" autoComplete="performance"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="售后服务要求">
              <el-input name="afterSaleService" v-model="procurementForm.afterSaleService" autoComplete="afterSaleService"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="验收要求">
              <el-input name="acceptance" v-model="procurementForm.acceptance" autoComplete="acceptance"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="数量">
              <el-input name="amount" v-model="procurementForm.amount" autoComplete="amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="到货时间">
              <el-date-picker type="datetime" placeholder="请选择" default-time="12:00:00" v-model="procurementForm.arrivalTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="核对意见">
              <el-select name="check" filterable clearable default-first-option v-model="procurementForm.check">
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
              <el-select name="audit" filterable clearable default-first-option v-model="procurementForm.audit">
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
              <el-select name="approve" filterable clearable default-first-option v-model="procurementForm.approve">
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
              <el-input name="sort" v-model="procurementForm.sort" autoComplete="sort"></el-input>
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
          prop="procurementName"
          label="仪器设备名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="requestNo"
          label="申请单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="申请日期"
          label="日期时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department"
          label="申请部门"
          width="180">
        </el-table-column>
        <el-table-column
          prop="applicantName"
          label="申请人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="applicableItem"
          label="适用项目"
          width="180">
        </el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂家"
          width="180">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格型号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reason"
          label="申请理由"
          width="180">
        </el-table-column>
        <el-table-column
          prop="performance"
          label="性能指标要求"
          width="180">
        </el-table-column>
        <el-table-column
          prop="afterSaleService"
          label="售后服务要求"
          width="180">
        </el-table-column>
        <el-table-column
          prop="acceptance"
          label="验收要求"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="arrivalTime"
          label="到货时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="check"
          label="核对意见"
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
          :current-page.sync="procurementRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcurements">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'procurementMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      procurementForm: {},
      tempProcurementForm: {},
      totalProcurements: 0,
      procurementRequestForm: {
        procurementName: '',
        requestNo: '',
        申请日期: '',
        department: '',
        applicantName: '',
        applicableItem: '',
        manufacturer: '',
        specification: '',
        reason: '',
        performance: '',
        afterSaleService: '',
        acceptance: '',
        amount: '',
        arrivalTime: '',
        check: '',
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
      this.procurementRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.procurementRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/procurement/getProcurement')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/procurementDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/procurement/queryProcurement', this.procurementRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcurements = res.data.totalProcurements || 0
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
        this.tempProcurementForm = this.tableData[(index - 1)]
        this.procurementForm = this.tableData[index]
        tmp = this.tempProcurementForm.sort
        this.tempProcurementForm.sort = this.procurementForm.sort
        this.procurementForm.sort = tmp
        this.$ajax.all([this.update(this.procurementForm), this.update(this.tempProcurementForm)])
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
        this.procurementForm = this.tableData[index]
        this.$ajax.post('/api/equipment/procurement/moveToTop', this.procurementForm)
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
        this.tempProcurementForm = this.tableData[(index + 1)]
        this.procurementForm = this.tableData[index]
        tmp = this.tempProcurementForm.sort
        this.tempProcurementForm.sort = this.procurementForm.sort
        this.procurementForm.sort = tmp
        this.$ajax.all([this.update(this.procurementForm), this.update(this.tempProcurementForm)])
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
        this.procurementForm = this.tableData[index]
        this.$ajax.post('/api/equipment/procurement/moveToBottom', this.procurementForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/procurement', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/procurement/queryProcurement', this.procurementRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcurements = res.data.totalProcurements || 0
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
