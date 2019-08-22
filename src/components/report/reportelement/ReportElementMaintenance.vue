<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="reportElementForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="报告名称">
              <el-select name="reportName" filterable default-first-option v-model="reportElementForm.reportName">
                <el-option v-for="item in staticOptions.reports"
                  :key="item.Id"
                  :label="item.reportName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="单元格名称">
              <el-input name="reportElementName" v-model="reportElementForm.reportElementName" autoComplete="reportElementName"></el-input>
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
          :formatter="reportFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportElementSort"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportElementName"
          label="单元格名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportElementLabel"
          label="单元格标签"
          width="180">
        </el-table-column>
        <el-table-column
          prop="value"
          label="值内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="object"
          label="关联对象"
          width="180">
        </el-table-column>
        <el-table-column
          prop="indirectValue"
          label="关联值内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="border"
          label="边框特征"
          width="180">
        </el-table-column>
        <el-table-column
          prop="property"
          label="单元格属性"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fontSize"
          label="字体大小"
          width="180">
        </el-table-column>
        <el-table-column
          prop="textAlign"
          label="文本位置"
          width="180">
        </el-table-column>
        <el-table-column
          prop="group"
          label="是否所属组"
          width="180">
        </el-table-column>
        <el-table-column
          prop="groupClass"
          label="所属组类名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="row"
          label="所占行数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="column"
          label="所占列数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="reportElementForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalReportElements">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'reportElementMaintenance',
  data () {
    return {
      tableData: [],
      totalReportElements: 0,
      reportElementForm: {
        reportName: '',
        reportElementName: '',
        reportElementSort: '',
        border: '',
        property: '',
        fontSize: '',
        textAlign: '',
        group: '',
        groupClass: '',
        row: '',
        column: '',
        value: '',
        type: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      staticOptions: {
        reports: []
      }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/reportElementDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.reportElementForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.reportElementForm.currentPage = val
      this.onSubmit()
    },
    // load all the reportElementes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/report/reportElement/queryReportElement', this.reportElementForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalReportElements = res.data.totalReportElements || 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadReportData () {
      let vm = this
      this.$ajax.get('/api/report/reportDevelopment/getReportDevelopment')
        .then(function (res) {
          vm.staticOptions.reports = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    reportFormatter (row, column) {
      let name = ''
      this.staticOptions.reports.forEach(item => {
        if (row.reportName === item.id) {
          name = item.reportName
        }
      })
      return name
    }
  },
  activated () {
    this.onSubmit()
    this.loadReportData()
  }
}
</script>
