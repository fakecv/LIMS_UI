    <template>
    <div>
      <el-button type="primary" @click="submit">批量提交</el-button>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      :row-style="processTableStyle"
      @selection-change="handleTaskSelect"
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
        <el-table-column
          prop="processPriority"
          label="优先级"
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
    <workflowDialog ref="workflowDialog"
     v-on:addWorkflow="confirmAddWorkflow"
     v-on:closeWorkflowDialog="closeWorkflowDialog"
    :workflowDialog="workflowDialog"/>
    </div>
  </template>

<script>
import workflowDialog from '@/components/sample/process/dialog/WorkflowDialog'
export default {
  name: 'taskListMaintenance',
  components: {workflowDialog},
  data () {
    return {
      workflowDialog: false,
      workflowForm: {
        id: '',
        submitFrom: '',
        submitTo: '',
        submitDate: '',
        submitPerson: '',
        currentStatus: ''
      },
      selectedTasks: [],
      processPriorities: [],
      tableData: [],
      totalTaskLists: 0,
      taskListRequestForm: {
        processId: '',
        bussinessId: '',
        link: '',
        type: '',
        submitFrom: '',
        submitTime: '',
        status: '',
        processPriority: '',
        bussinessDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleTaskSelect (selection) {
      console.log('select')
      this.selectedTasks = selection
    },
    submit () {
      this.workflowDialog = true
    },
    confirmAddWorkflow (event) {
      if (this.selectedTasks.length > 0) {
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addWorkflow(event)
          this.closeWorkflowDialog()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
          this.closeWorkflowDialog()
        })
      }
    },
    closeWorkflowDialog () {
      this.workflowDialog = false
    },
    addWorkflow (event) {
      let vm = this
      let ids = []
      this.selectedTasks.forEach(item => {
        ids.push(item.processId)
      })
      this.workflowForm.id = ids.join(',')
      this.workflowForm.submitTo = event.submitTo
      this.workflowForm.processingStatus = event.processingStatus
      this.$ajax.post('/api/sample/process/submitProcesses/', this.workflowForm)
        .then(function (res) {
          vm.$message('已经成功提交！')
          vm.onSubmit()
          vm.selectedTasks = []
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.processPriorities = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    processTableStyle ({row, rowIndex}) {
      let backgroundColor = '#FFFFFF'
      let color = '#000000'
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.processPriorityName) {
          backgroundColor = item.processPriorityColor
          color = item.processPriorityFontColor
        }
      })
      return 'background: ' + backgroundColor + ';color: ' + color
    },
    handleSizeChange (val) {
      this.taskListRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.taskListRequestForm.currentPage = val
      this.onSubmit()
    },
    dblclick (row, event) {
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
    this.loadProcessPriorityData()
  },
  activated () {
    this.onSubmit()
    this.loadProcessPriorityData()
  }
}
</script>
