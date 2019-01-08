<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="consumableAcceptanceCheckForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="关键耗材名称">
              <el-input name="consumableProcurementName" v-model="consumableAcceptanceCheckForm.consumableProcurementName" autoComplete="consumableProcurementName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="申请单号">
              <el-input name="requestNo" v-model="consumableAcceptanceCheckForm.requestNo" autoComplete="requestNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="申请部门">
              <el-select name="department" filterable clearable default-first-option v-model="consumableAcceptanceCheckForm.department">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.department"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="包装情况">
              <el-input name="packagingInfo" v-model="consumableAcceptanceCheckForm.packagingInfo" autoComplete="packagingInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="规格/等级">
              <el-input name="specification" v-model="consumableAcceptanceCheckForm.specification" autoComplete="specification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="证书">
              <el-input name="certification" v-model="consumableAcceptanceCheckForm.certification" autoComplete="certification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="数量">
              <el-input name="amount" v-model="consumableAcceptanceCheckForm.amount" autoComplete="amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="有效期">
              <el-date-picker type="datetime" placeholder="请选择" default-time="12:00:00" v-model="consumableAcceptanceCheckForm.expireDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商">
              <el-input name="supplier" v-model="consumableAcceptanceCheckForm.supplier" autoComplete="supplier"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="其它说明">
              <el-input name="note" v-model="consumableAcceptanceCheckForm.note" autoComplete="note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="验收结论">
              <el-select name="result" filterable clearable default-first-option v-model="consumableAcceptanceCheckForm.result">
                <el-option v-for="item in staticOptions.results"
                  :key="item.id"
                  :label="item.result"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="室意见">
              <el-select name="check" filterable clearable default-first-option v-model="consumableAcceptanceCheckForm.check">
                <el-option v-for="item in staticOptions.checks"
                  :key="item.id"
                  :label="item.check"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文本">
              <el-input name="sort" v-model="consumableAcceptanceCheckForm.sort" autoComplete="sort"></el-input>
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
          prop="packagingInfo"
          label="包装情况"
          width="180">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格/等级"
          width="180">
        </el-table-column>
        <el-table-column
          prop="certification"
          label="证书"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="expireDate"
          label="有效期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应商"
          width="180">
        </el-table-column>
        <el-table-column
          prop="note"
          label="其它说明"
          width="180">
        </el-table-column>
        <el-table-column
          prop="result"
          label="验收结论"
          width="180">
        </el-table-column>
        <el-table-column
          prop="check"
          label="室意见"
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
          :current-page.sync="consumableAcceptanceCheckRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalConsumableAcceptanceChecks">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'consumableAcceptanceCheckMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      consumableAcceptanceCheckForm: {},
      tempConsumableAcceptanceCheckForm: {},
      totalConsumableAcceptanceChecks: 0,
      consumableAcceptanceCheckRequestForm: {
        consumableProcurementName: '',
        requestNo: '',
        department: '',
        packagingInfo: '',
        specification: '',
        certification: '',
        amount: '',
        expireDate: '',
        supplier: '',
        note: '',
        result: '',
        check: '',
        sort: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      staticOptions: {
        departments: [],
        results: [],
        checks: []
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.consumableAcceptanceCheckRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.consumableAcceptanceCheckRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/consumableAcceptanceCheck/getConsumableAcceptanceCheck')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/consumableAcceptanceCheckDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/consumableAcceptanceCheck/queryConsumableAcceptanceCheck', this.consumableAcceptanceCheckRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalConsumableAcceptanceChecks = res.data.totalConsumableAcceptanceChecks || 0
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
        this.tempConsumableAcceptanceCheckForm = this.tableData[(index - 1)]
        this.consumableAcceptanceCheckForm = this.tableData[index]
        tmp = this.tempConsumableAcceptanceCheckForm.sort
        this.tempConsumableAcceptanceCheckForm.sort = this.consumableAcceptanceCheckForm.sort
        this.consumableAcceptanceCheckForm.sort = tmp
        this.$ajax.all([this.update(this.consumableAcceptanceCheckForm), this.update(this.tempConsumableAcceptanceCheckForm)])
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
        this.consumableAcceptanceCheckForm = this.tableData[index]
        this.$ajax.post('/api/equipment/consumableAcceptanceCheck/moveToTop', this.consumableAcceptanceCheckForm)
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
        this.tempConsumableAcceptanceCheckForm = this.tableData[(index + 1)]
        this.consumableAcceptanceCheckForm = this.tableData[index]
        tmp = this.tempConsumableAcceptanceCheckForm.sort
        this.tempConsumableAcceptanceCheckForm.sort = this.consumableAcceptanceCheckForm.sort
        this.consumableAcceptanceCheckForm.sort = tmp
        this.$ajax.all([this.update(this.consumableAcceptanceCheckForm), this.update(this.tempConsumableAcceptanceCheckForm)])
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
        this.consumableAcceptanceCheckForm = this.tableData[index]
        this.$ajax.post('/api/equipment/consumableAcceptanceCheck/moveToBottom', this.consumableAcceptanceCheckForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/consumableAcceptanceCheck', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/consumableAcceptanceCheck/queryConsumableAcceptanceCheck', this.consumableAcceptanceCheckRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalConsumableAcceptanceChecks = res.data.totalConsumableAcceptanceChecks || 0
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
