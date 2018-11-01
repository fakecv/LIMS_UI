    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="departmentRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="部门名称">
              <el-input name="departmentName" v-model="departmentRequestForm.departmentName"></el-input>
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
          prop="departmentName"
          label="部门名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="departmentDescription"
          label="部门描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="departmentRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalDepartments">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'departmentMaintenance',
  data () {
    return {
      tableData: [],
      totalDepartments: 0,
      departmentRequestForm: {
        departmentName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.departmentRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.departmentRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/departmentDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/department/queryDepartment', this.departmentRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalDepartments = res.data.totalDepartments || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
