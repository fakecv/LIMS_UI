    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="auditDepartmentRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="被审核岗位名称">
              <el-input name="auditDepartmentName" v-model="auditDepartmentRequestForm.auditDepartmentName"></el-input>
            </el-form-item>
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
          prop="auditDepartmentName"
          label="被审核岗位名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="auditDepartmentDescription"
          label="被审核岗位描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="auditDepartmentRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalAuditDepartments">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'auditDepartmentMaintenance',
  data () {
    return {
      tableData: [],
      totalAuditDepartments: 0,
      auditDepartmentRequestForm: {
        auditDepartmentName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.auditDepartmentRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.auditDepartmentRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/auditDepartment/getAuditDepartment')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/auditDepartmentDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/internalauditchecklist/auditDepartment/queryAuditDepartment', this.auditDepartmentRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalAuditDepartments = res.data.totalAuditDepartments || 0
          console.log('totalDeparts is: ' + vm.totalAuditDepartments)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
