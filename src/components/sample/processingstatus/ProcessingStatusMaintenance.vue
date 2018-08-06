    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="processingStatusRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="部门名称">
              <el-input name="processingStatusName" v-model="processingStatusRequestForm.processingStatusName"></el-input>
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
          prop="processingStatusName"
          label="状态名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatusDescription"
          label="状态描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="processingStatusRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcessingStatuss">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'processingStatusMaintenance',
  data () {
    return {
      tableData: [],
      totalProcessingStatuss: 0,
      processingStatusRequestForm: {
        processingStatusName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.processingStatusRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processingStatusRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          console.log('processingStatusMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/processingStatusDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/processingStatus/queryProcessingStatus', this.processingStatusRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessingStatuss = res.data.totalProcessingStatuss || 0
          console.log('totalDeparts is: ' + vm.totalProcessingStatuss)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
