<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="reportEnrichmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="报表名称">
              <el-select name="reportName" filterable clearable default-first-option v-model="reportEnrichmentForm.reportName">
                <el-option v-for="item in staticOptions.reportNames"
                  :key="item.id"
                  :label="item.reportName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联字段">
              <el-select name="enrichKey" filterable clearable default-first-option v-model="reportEnrichmentForm.enrichKey">
                <el-option v-for="item in staticOptions.enrichKeys"
                  :key="item.id"
                  :label="item.enrichKey"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联对象">
              <el-select name="enrichObject" filterable clearable default-first-option v-model="reportEnrichmentForm.enrichObject">
                <el-option v-for="item in staticOptions.enrichObjects"
                  :key="item.id"
                  :label="item.enrichObject"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="关联值">
              <el-checkbox-group v-model="reportEnrichmentForm.enrichValues">
                  <el-checkbox label="lable1" name="name1"></el-checkbox>
                  <el-checkbox label="lable2" name="name2"></el-checkbox>
                  <el-checkbox label="lable3" name="name3"></el-checkbox>
                  <el-checkbox label="lable4" name="name4"></el-checkbox>
                  <el-checkbox label="lable5" name="name5" @change="optionChange"></el-checkbox>
              </el-checkbox-group>
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
          label="报表名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enrichKey"
          label="关联字段"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enrichObject"
          label="关联对象"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enrichValues"
          label="关联值"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="reportEnrichmentForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalReportEnrichments">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'reportEnrichmentMaintenance',
  data () {
    return {
      tableData: [],
      totalReportEnrichments: 0,
      reportEnrichmentForm: {
        reportName: '',
        enrichKey: '',
        enrichObject: '',
        enrichValues: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/reportEnrichmentDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.reportEnrichmentForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.reportEnrichmentForm.currentPage = val
      this.onSubmit()
    },
    // load all the reportEnrichmentes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/report/reportEnrichment/queryReportEnrichment', this.reportEnrichmentForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalReportEnrichments = res.data.totalReportEnrichments || 0
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
