    <template>
    <div>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      @row-dblclick=dblclick>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="bussinessId"
          label="业务编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="bussinessDescription"
          label="业务描述"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="业务类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="submitFrom"
          label="提交人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="submitTime"
          label="提交时间"
          :formatter="submitTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="当前状态"
          show-overflow-tooltip
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="taskListRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTaskLists">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'taskListMaintenance',
  data () {
    return {
      tableData: [],
      totalTaskLists: 0,
      taskListRequestForm: {
        bussinessId: '',
        link: '',
        type: '',
        submitFrom: '',
        submitTime: '',
        status: '',
        bussinessDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.taskListRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.taskListRequestForm.currentPage = val
      this.onSubmit()
    },
    dblclick (row, event) {
      console.log(row.link)
      this.$router.push(row.link)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/tasklist/queryTaskList', this.taskListRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTaskLists = res.data.totalTaskLists || 0
        })
    },
    submitTimeFormatter (row, column) {
      if (row.submitTime) {
        let dateTT = new Date(row.submitTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
