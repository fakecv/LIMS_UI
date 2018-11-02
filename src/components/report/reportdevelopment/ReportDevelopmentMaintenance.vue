<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="reportDevelopmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="报告名称">
              <el-input name="reportName" v-model="reportDevelopmentForm.reportName" autoComplete="reportName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="页面大小">
              <el-select name="pageSize" filterable default-first-option v-model="reportDevelopmentForm.pageSize">
                <el-option v-for="item in pageSizes"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="是否横置">
              <el-radio-group v-model="reportDevelopmentForm.rotate">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
              </el-radio-group>
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
    <el-table :data="tableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="reportName"
          label="报告名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pageSize"
          label="页面大小"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rotate"
          label="是否横置"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="reportDevelopmentForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalReportDevelopments">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'reportDevelopmentMaintenance',
  data () {
    return {
      tableData: [],
      pageSizes: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'],
      totalReportDevelopments: 0,
      reportDevelopmentForm: {
        reportName: '',
        pageSize: '',
        rotate: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/reportDevelopmentDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.reportDevelopmentForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.reportDevelopmentForm.currentPage = val
      this.onSubmit()
    },
    // load all the reportDevelopmentes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/report/reportDevelopment/queryReportDevelopment', this.reportDevelopmentForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalReportDevelopments = res.data.totalReportDevelopments || 0
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
