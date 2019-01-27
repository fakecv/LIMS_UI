<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="managementReviewInputMaterialsForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="评审年度">
              <el-input name="managementReviewInputMaterialsName" v-model="managementReviewInputMaterialsForm.managementReviewInputMaterialsName" autoComplete="managementReviewInputMaterialsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="评审方式">
              <el-select name="type" filterable clearable default-first-option v-model="managementReviewInputMaterialsForm.type">
                <el-option v-for="item in staticOptions.types"
                  :key="item.id"
                  :label="item.type"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="计划编号">
              <el-select name="planNumber" filterable clearable default-first-option v-model="managementReviewInputMaterialsForm.planNumber">
                <el-option v-for="item in staticOptions.planNumbers"
                  :key="item.id"
                  :label="item.planNumber"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="汇报部门">
              <el-input name="reportingDepartment" v-model="managementReviewInputMaterialsForm.reportingDepartment" autoComplete="reportingDepartment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="汇报内容">
              <el-input name="reportingContent" v-model="managementReviewInputMaterialsForm.reportingContent" autoComplete="reportingContent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="存在问题">
              <el-input name="existingProblems" v-model="managementReviewInputMaterialsForm.existingProblems" autoComplete="existingProblems"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="改进建议">
              <el-input name="improvingAdvices" v-model="managementReviewInputMaterialsForm.improvingAdvices" autoComplete="improvingAdvices"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="编制人">
              <el-input name="editedBy" v-model="managementReviewInputMaterialsForm.editedBy" autoComplete="editedBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="编制日期">
              <el-date-picker type="datetime" placeholder="请选择" default-time="12:00:00" v-model="managementReviewInputMaterialsForm.editDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="备注">
              <el-input name="note" v-model="managementReviewInputMaterialsForm.note" autoComplete="note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="序号">
              <el-input name="sort" v-model="managementReviewInputMaterialsForm.sort" autoComplete="sort"></el-input>
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
          prop="managementReviewInputMaterialsName"
          label="评审年度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="评审方式"
          width="180">
        </el-table-column>
        <el-table-column
          prop="planNumber"
          label="计划编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportingDepartment"
          label="汇报部门"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportingContent"
          label="汇报内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="existingProblems"
          label="存在问题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="improvingAdvices"
          label="改进建议"
          width="180">
        </el-table-column>
        <el-table-column
          prop="editedBy"
          label="编制人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="editDate"
          label="编制日期"
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
          :current-page.sync="managementReviewInputMaterialsRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalManagementReviewInputMaterialss">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'managementReviewInputMaterialsMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      managementReviewInputMaterialsForm: {},
      tempManagementReviewInputMaterialsForm: {},
      totalManagementReviewInputMaterialss: 0,
      managementReviewInputMaterialsRequestForm: {
        managementReviewInputMaterialsName: '',
        type: '',
        planNumber: '',
        reportingDepartment: '',
        reportingContent: '',
        existingProblems: '',
        improvingAdvices: '',
        editedBy: '',
        editDate: '',
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
      this.managementReviewInputMaterialsRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.managementReviewInputMaterialsRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/managementreview/managementReviewInputMaterials/getManagementReviewInputMaterials')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/managementReviewInputMaterialsDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/managementreview/managementReviewInputMaterials/queryManagementReviewInputMaterials', this.managementReviewInputMaterialsRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalManagementReviewInputMaterialss = res.data.totalManagementReviewInputMaterialss || 0
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
        this.tempManagementReviewInputMaterialsForm = this.tableData[(index - 1)]
        this.managementReviewInputMaterialsForm = this.tableData[index]
        tmp = this.tempManagementReviewInputMaterialsForm.sort
        this.tempManagementReviewInputMaterialsForm.sort = this.managementReviewInputMaterialsForm.sort
        this.managementReviewInputMaterialsForm.sort = tmp
        this.$ajax.all([this.update(this.managementReviewInputMaterialsForm), this.update(this.tempManagementReviewInputMaterialsForm)])
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
        this.managementReviewInputMaterialsForm = this.tableData[index]
        this.$ajax.post('/api/managementreview/managementReviewInputMaterials/moveToTop', this.managementReviewInputMaterialsForm)
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
        this.tempManagementReviewInputMaterialsForm = this.tableData[(index + 1)]
        this.managementReviewInputMaterialsForm = this.tableData[index]
        tmp = this.tempManagementReviewInputMaterialsForm.sort
        this.tempManagementReviewInputMaterialsForm.sort = this.managementReviewInputMaterialsForm.sort
        this.managementReviewInputMaterialsForm.sort = tmp
        this.$ajax.all([this.update(this.managementReviewInputMaterialsForm), this.update(this.tempManagementReviewInputMaterialsForm)])
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
        this.managementReviewInputMaterialsForm = this.tableData[index]
        this.$ajax.post('/api/managementreview/managementReviewInputMaterials/moveToBottom', this.managementReviewInputMaterialsForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/managementreview/managementReviewInputMaterials', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/managementreview/managementReviewInputMaterials/queryManagementReviewInputMaterials', this.managementReviewInputMaterialsRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalManagementReviewInputMaterialss = res.data.totalManagementReviewInputMaterialss || 0
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
