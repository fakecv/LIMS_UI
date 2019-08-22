<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="managementReviewYearPlanForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="评审年度">
              <el-input name="managementReviewYearPlanName" v-model="managementReviewYearPlanForm.managementReviewYearPlanName" autoComplete="managementReviewYearPlanName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="评审方式">
              <el-select name="type" filterable clearable default-first-option v-model="managementReviewYearPlanForm.type">
                <el-option v-for="item in staticOptions.types"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="计划编号">
              <el-input name="number" v-model="managementReviewYearPlanForm.number" autoComplete="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="负责人">
              <el-input name="leader" v-model="managementReviewYearPlanForm.leader" autoComplete="leader"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="计划日期">
              <el-date-picker type="datetime" placeholder="请选择" default-time="12:00:00" v-model="managementReviewYearPlanForm.planDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="评审地点">
              <el-input name="place" v-model="managementReviewYearPlanForm.place" autoComplete="place"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="评审目的">
              <el-input name="purpose" v-model="managementReviewYearPlanForm.purpose" autoComplete="purpose"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="评审依据">
              <el-input name="according" v-model="managementReviewYearPlanForm.according" autoComplete="according"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="评审内容">
              <el-input name="content" v-model="managementReviewYearPlanForm.content" autoComplete="content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="编制">
              <el-input name="edit" v-model="managementReviewYearPlanForm.edit" autoComplete="edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="批准">
              <el-input name="approve" v-model="managementReviewYearPlanForm.approve" autoComplete="approve"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="备注">
              <el-input name="note" v-model="managementReviewYearPlanForm.note" autoComplete="note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="序号">
              <el-input name="sort" v-model="managementReviewYearPlanForm.sort" autoComplete="sort"></el-input>
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
          prop="managementReviewYearPlanName"
          label="评审年度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="评审方式"
          width="180">
        </el-table-column>
        <el-table-column
          prop="number"
          label="计划编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="负责人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="planDate"
          label="计划日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="place"
          label="评审地点"
          width="180">
        </el-table-column>
        <el-table-column
          prop="purpose"
          label="评审目的"
          width="180">
        </el-table-column>
        <el-table-column
          prop="according"
          label="评审依据"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="评审内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="edit"
          label="编制"
          width="180">
        </el-table-column>
        <el-table-column
          prop="approve"
          label="批准"
          width="180">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="序号"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="managementReviewYearPlanRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalManagementReviewYearPlans">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'managementReviewYearPlanMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      managementReviewYearPlanForm: {},
      tempManagementReviewYearPlanForm: {},
      totalManagementReviewYearPlans: 0,
      managementReviewYearPlanRequestForm: {
        managementReviewYearPlanName: '',
        type: '',
        number: '',
        leader: '',
        planDate: '',
        place: '',
        purpose: '',
        according: '',
        content: '',
        edit: '',
        approve: '',
        note: '',
        sort: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.managementReviewYearPlanRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.managementReviewYearPlanRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/managementreview/managementReviewYearPlan/getManagementReviewYearPlan')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/managementReviewYearPlanDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/managementreview/managementReviewYearPlan/queryManagementReviewYearPlan', this.managementReviewYearPlanRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalManagementReviewYearPlans = res.data.totalManagementReviewYearPlans || 0
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
        this.tempManagementReviewYearPlanForm = this.tableData[(index - 1)]
        this.managementReviewYearPlanForm = this.tableData[index]
        tmp = this.tempManagementReviewYearPlanForm.sort
        this.tempManagementReviewYearPlanForm.sort = this.managementReviewYearPlanForm.sort
        this.managementReviewYearPlanForm.sort = tmp
        this.$ajax.all([this.update(this.managementReviewYearPlanForm), this.update(this.tempManagementReviewYearPlanForm)])
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
        this.managementReviewYearPlanForm = this.tableData[index]
        this.$ajax.post('/api/managementreview/managementReviewYearPlan/moveToTop', this.managementReviewYearPlanForm)
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
        this.tempManagementReviewYearPlanForm = this.tableData[(index + 1)]
        this.managementReviewYearPlanForm = this.tableData[index]
        tmp = this.tempManagementReviewYearPlanForm.sort
        this.tempManagementReviewYearPlanForm.sort = this.managementReviewYearPlanForm.sort
        this.managementReviewYearPlanForm.sort = tmp
        this.$ajax.all([this.update(this.managementReviewYearPlanForm), this.update(this.tempManagementReviewYearPlanForm)])
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
        this.managementReviewYearPlanForm = this.tableData[index]
        this.$ajax.post('/api/managementreview/managementReviewYearPlan/moveToBottom', this.managementReviewYearPlanForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/managementreview/managementReviewYearPlan', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/managementreview/managementReviewYearPlan/queryManagementReviewYearPlan', this.managementReviewYearPlanRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalManagementReviewYearPlans = res.data.totalManagementReviewYearPlans || 0
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
