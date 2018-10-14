    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="processPriorityRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="优先级名称">
              <el-input name="processPriorityName" v-model="processPriorityRequestForm.processPriorityName"></el-input>
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
          prop="processPriorityName"
          label="优先级名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processPriorityDescription"
          label="优先级描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="processPriorityRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcessPrioritys">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'processPriorityMaintenance',
  data () {
    return {
      tableData: [],
      totalProcessPrioritys: 0,
      processPriorityRequestForm: {
        processPriorityName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.processPriorityRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processPriorityRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          console.log('processPriorityMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/processPriorityDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/processPriority/queryProcessPriority', this.processPriorityRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessPrioritys = res.data.totalProcessPrioritys || 0
          console.log('totalDeparts is: ' + vm.totalProcessPrioritys)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
