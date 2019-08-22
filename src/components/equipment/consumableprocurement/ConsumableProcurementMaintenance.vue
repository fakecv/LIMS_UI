<template>
  <div>
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
          prop="consumableProcurementName"
          label="关键耗材名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="requestNo"
          label="申请单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department"
          label="申请部门"
          width="180">
        </el-table-column>
        <el-table-column
          prop="technicalParameter"
          label="等级或技术参数要求"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="规格/数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="purpose"
          label="用途"
          width="180">
        </el-table-column>
        <el-table-column
          prop="suggestedSupplier"
          label="建议供应商"
          width="180">
        </el-table-column>
        <el-table-column
          prop="check"
          label="室意见"
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
          :current-page.sync="consumableProcurementRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalConsumableProcurements">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'consumableProcurementMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      consumableProcurementForm: {},
      tempConsumableProcurementForm: {},
      totalConsumableProcurements: 0,
      consumableProcurementRequestForm: {
        consumableProcurementName: '',
        requestNo: '',
        department: '',
        technicalParameter: '',
        amount: '',
        purpose: '',
        suggestedSupplier: '',
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
      this.consumableProcurementRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.consumableProcurementRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/consumableProcurement/getConsumableProcurement')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/consumableProcurementDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/consumableProcurement/queryConsumableProcurement', this.consumableProcurementRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalConsumableProcurements = res.data.totalConsumableProcurements || 0
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
        this.tempConsumableProcurementForm = this.tableData[(index - 1)]
        this.consumableProcurementForm = this.tableData[index]
        tmp = this.tempConsumableProcurementForm.sort
        this.tempConsumableProcurementForm.sort = this.consumableProcurementForm.sort
        this.consumableProcurementForm.sort = tmp
        this.$ajax.all([this.update(this.consumableProcurementForm), this.update(this.tempConsumableProcurementForm)])
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
        this.consumableProcurementForm = this.tableData[index]
        this.$ajax.post('/api/equipment/consumableProcurement/moveToTop', this.consumableProcurementForm)
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
        this.tempConsumableProcurementForm = this.tableData[(index + 1)]
        this.consumableProcurementForm = this.tableData[index]
        tmp = this.tempConsumableProcurementForm.sort
        this.tempConsumableProcurementForm.sort = this.consumableProcurementForm.sort
        this.consumableProcurementForm.sort = tmp
        this.$ajax.all([this.update(this.consumableProcurementForm), this.update(this.tempConsumableProcurementForm)])
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
        this.consumableProcurementForm = this.tableData[index]
        this.$ajax.post('/api/equipment/consumableProcurement/moveToBottom', this.consumableProcurementForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/consumableProcurement', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/consumableProcurement/queryConsumableProcurement', this.consumableProcurementRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalConsumableProcurements = res.data.totalConsumableProcurements || 0
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
  activated () {
    this.onSubmit()
  }

}
</script>
