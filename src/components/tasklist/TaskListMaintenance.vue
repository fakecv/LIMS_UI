    <template>
    <div>
      <el-button type="primary" @click="submit">批量提交/驳回</el-button>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      :row-style="processTableStyle"
      max-height="400"
      @selection-change="handleTaskSelect"
      @row-dblclick=dblclick>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.testedItemTasks" size="mini">
              <el-table-column
                prop="testedItem"
                label="检测项目"
                :formatter="testedItemFormatter"
                width="180">
              </el-table-column>
              <el-table-column
                prop="testParameter"
                label="检测项目参数"
                show-overflow-tooltip
                width="180">
              </el-table-column>
              <el-table-column
                prop="testMethod"
                label="检测方法"
                width="180">
              </el-table-column>
              <el-table-column
                prop="processPriority"
                label="优先级"
                width="180">
              </el-table-column>
              <el-table-column align="right" width="300">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleDownloadTemplateFile(scope.$index, scope.row)">下载模板文件</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="sampleName"
          label="样品名称"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="materialNumber"
          label="材质牌号"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="sampleSubNumber"
          label="试样编号"
          sortable
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="submitFrom"
          label="提交人"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="submitTime"
          label="提交时间"
          sortable
          :formatter="submitTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="当前状态"
          sortable
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="processPriority"
          label="优先级"
          sortable
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="其它信息"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column align="right" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleViewSamplePicture(scope.$index, scope.row)">查看样品图片</el-button>
          </template>
        </el-table-column>
      </el-table>
      <samplePictureViewDialog
        :samplePictureViewDialog="samplePictureViewDialog"
        v-on:closeSamplePictureViewDialog="closeSamplePictureViewDialog"
        :agreementId="agreementId"
        />
      <templateFileDialog
        :templateFileDialog="templateFileDialog"
        v-on:closeTemplateFileDialog="closeTemplateFileDialog"
        :processId="processId"
        />
      <workflowDialog ref="workflowDialog"
        v-on:addWorkflow="confirmAddWorkflow"
        v-on:closeWorkflowDialog="closeWorkflowDialog"
        :workflowDialog="workflowDialog"/>
    </div>
  </template>

<script>
import workflowDialog from '@/components/sample/process/dialog/WorkflowDialog'
import samplePictureViewDialog from '@/components/tasklist/SamplePictureViewDialog'
import templateFileDialog from '@/components/tasklist/TemplateFileDialog'
export default {
  name: 'taskListMaintenance',
  components: {workflowDialog, templateFileDialog, samplePictureViewDialog},
  data () {
    return {
      workflowDialog: false,
      samplePictureViewDialog: false,
      templateFileDialog: false,
      agreementId: '',
      processId: '',
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
      taskListRequestForm: {
        processId: '',
        agreementId: '',
        comment: '',
        sampleName: '',
        materialNumber: '',
        sampleClientNumber: '',
        sampleSubNumber: '',
        sampleNumber: '',
        bussinessId: '',
        link: '',
        type: '',
        submitFrom: '',
        submitTime: '',
        status: '',
        processPriority: '',
        bussinessDescription: '',
        testedItemTasks: []
      },
      staticOptions: {
        testMethods: [],
        testParameters: [],
        testedItems: []
      }
    }
  },
  methods: {
    closeSamplePictureViewDialog () {
      this.samplePictureViewDialog = false
    },
    closeTemplateFileDialog () {
      this.templateFileDialog = false
    },
    handleDownloadTemplateFile (index, row) {
      this.templateFileDialog = true
      this.processId = row.id
    },
    handleViewSamplePicture (index, row) {
      this.agreementId = row.agreementId
      this.samplePictureViewDialog = true
    },
    handleTaskSelect (selection) {
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
    loadTestedItemData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
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
    dblclick (row, event) {
      this.$router.push(row.link)
    },
    onSubmit () {
      let vm = this
      this.$ajax.get('/api/tasklist/queryTaskList')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.staticOptions.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    },
    processingStatusFormatter (row, column) {
      let name = ''
      this.processingStatuses.forEach(item => {
        if (row.processingStatus === item.id) {
          name = item.processingStatusName
        }
      })
      return name
    },
    processPriorityFormatter (row, column) {
      let name = ''
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
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
  activated () {
    this.onSubmit()
    this.loadProcessPriorityData()
    this.loadTestedItemData()
  }
}
</script>
