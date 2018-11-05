<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="reportElementForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="报告名称">
              <el-select name="reportName" filterable default-first-option v-model="reportElementForm.reportName">
                <el-option v-for="item in staticOptions.reportNames"
                  :key="item.id"
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
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="边框特征">
              <el-select name="border" filterable default-first-option v-model="reportElementForm.border">
                <el-option v-for="item in staticOptions.borders"
                  :key="item.id"
                  :label="item.border"
                  :value="item.border">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="单元格属性">
              <el-select name="property" filterable default-first-option v-model="reportElementForm.property">
                <el-option v-for="item in staticOptions.propertys"
                  :key="item.id"
                  :label="item.property"
                  :value="item.property">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="字体大小">
              <el-select name="fontSize" filterable default-first-option v-model="reportElementForm.fontSize">
                <el-option v-for="item in staticOptions.fontSizes"
                  :key="item.id"
                  :label="item.fontSize"
                  :value="item.fontSize">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="文本位置">
              <el-select name="textAlign" filterable default-first-option v-model="reportElementForm.textAlign">
                <el-option v-for="item in staticOptions.textAligns"
                  :key="item.id"
                  :label="item.textAlign"
                  :value="item.textAlign">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="是否所属组">
              <el-radio-group v-model="reportElementForm.group">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所属组类名">
              <el-input name="groupClass" v-model="reportElementForm.groupClass" autoComplete="groupClass"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所占行数">
              <el-input name="row" v-model="reportElementForm.row" autoComplete="row"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所占列数">
              <el-input name="column" v-model="reportElementForm.column" autoComplete="column"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="值内容">
              <el-select name="value" filterable default-first-option v-model="reportElementForm.value">
                <el-option v-for="item in staticOptions.values"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="类别">
              <el-select name="type" filterable default-first-option v-model="reportElementForm.type">
                <el-option v-for="item in staticOptions.types"
                  :key="item.id"
                  :label="item.type"
                  :value="item.type">
                </el-option>
                </el-select>
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
          prop="reportElementName"
          label="单元格名称"
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
          prop="value"
          label="值内容"
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
      staticOptions: {
        values: [
          {id: 1, value: 'property1'},
          {id: 2, value: 'property2'}
        ],
        types: [
          {id: 1, type: '字符串'},
          {id: 2, type: '数组'}
        ],
        textAligns: [
          {id: 1, textAlign: '靠左'},
          {id: 2, textAlign: '居中'},
          {id: 3, textAlign: '靠右'}
        ],
        reportNames: [
          {id: 1, reportName: '报表1'},
          {id: 2, reportName: '报表2'}
        ],
        fontSizes: [
          {id: 1, fontSize: '大号'},
          {id: 2, fontSize: '中号'},
          {id: 3, fontSize: '小号'},
          {}
        ],
        borders: [
          {id: 1, border: '普通'},
          {id: 2, border: '无边框'},
          {id: 3, border: '下边框'},
          {id: 4, border: '上边框'}
        ],
        propertys: [
          {id: 1, property: '表头'},
          {id: 2, property: '文本'}
        ]
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
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
    }
  },
  mounted () {
    this.onSubmit()
  }
}
</script>
