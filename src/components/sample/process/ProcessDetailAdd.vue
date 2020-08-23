<template>
  <div>
    <el-container>
      <el-header style="min-width:500px;">
        <el-button-group>
          <el-button :ref="action.ref" type="info" v-for="(action,index) in actions"
            :key="index" size="mini" :icon="action.icon"
            :loading="action.loading"
            @click="actionHandle(action)"
            :disabled="action.disabled"
            >
            {{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-main>
        <el-table ref="processTable" :data="staticOptions.processTableData"
        style="width: 100%"
        tooltip-effect="dark"
        :default-sort = "{prop: 'sampleSubNumber'}"
        :row-style="processTableStyle"
        @selection-change="handleProcessTableSelectionChange"
        @row-dblclick="dblclick"
        >
          <el-table-column
            type="expand">
            <template slot-scope="scope">
              <el-table :data="scope.row.testedItemTasks" size="mini">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
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
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="sampleClientNumber"
            label="来样编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sampleNumber"
            label="样品编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sampleSubNumber"
            sortable
            :sort-method = "sampleSubNumberSortFunction"
            label="试样编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="drawingDesign"
            label="加工图号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="processPriority"
            label="优先级"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="其它"
            show-overflow-tooltip
            width="180">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
      <el-dialog
        :title= "'委托协议编号：' + agreementNumber"
        :visible.sync="dialog"
        ref="drawer"
        :append-to-body="true"
        >
        <div class="demo-drawer__content">
          <ProcessDetail ref="processDetail"
            :agreementId="agreementId"
            :processForm="processForm"
            :staticOptions="staticOptions"
            v-on:getDrawingDesigns="getDrawingDesigns"
            v-on:getTestMethod="getTestMethod"
            v-on:getTestParameter="getTestParameter"
            v-on:updateTestedItemTasks="updateTestedItemTasks"
            v-on:updateTestedItemTask="updateTestedItemTask"
            v-on:addTestedItemTask="addTestedItemTask"
            v-on:updateTestedItemProduct="updateTestedItemProduct"
            />
          <div style="padding: 40px;" class="demo-drawer__footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="confirmSaveToDB" :loading="loading">{{ loading ? '提交中 ...' : '保存' }}</el-button>
          </div>
        </div>
      </el-dialog>
    <workflowDialog ref="workflowDialog"
     v-on:addWorkflow="confirmAddWorkflow"
     v-on:closeWorkflowDialog="closeWorkflowDialog"
    :workflowDialog="workflowDialog"/>
  </div>
</template>

<script>
import ProcessDetail from '@/components/sample/process/ProcessDetail'
import workflowDialog from '@/components/sample/process/dialog/WorkflowDialog'
export default {
  name: 'processDetailAdd',
  components: {ProcessDetail, workflowDialog},
  props: ['agreementId', 'agreementNumber', 'agreementComment', 'processPriority', 'sampleNumbers'],
  data () {
    return {
      dialog: false,
      loading: false,
      defaultExpandAll: false,
      title: '委托协议编号：' + this.agreementNumber,
      actions: [
        {'ref': 'new', 'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false, 'disabled': false},
        {'ref': 'copy', 'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false, 'disabled': false},
        {'ref': 'submit', 'name': '提交/驳回', 'id': '3', 'icon': 'el-icon-document', 'loading': false, 'disabled': false},
        {'ref': 'delete', 'name': '删除', 'id': '4', 'icon': 'el-icon-delete', 'loading': false, 'disabled': false},
        {'ref': 'delete', 'name': '展开所有', 'id': '5', 'icon': 'el-icon-phone-outline', 'loading': false, 'disabled': false}
      ],
      processForm: {
        id: '',
        agreementId: '',
        agreementNumber: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        read: 'no',
        workflows: [],
        submitTo: ''
      },
      processResetForm: {
        id: '',
        agreementId: '',
        agreementNumber: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        read: 'no',
        workflows: [],
        submitTo: ''
      },
      workflowForm: {
        id: '',
        submitFrom: '',
        submitTo: '',
        submitDate: '',
        submitPerson: '',
        currentStatus: ''
      },
      workflowDialog: false,
      staticOptions: {
        department: '',
        testCategories: [],
        testedItemProducts: [],
        testMethods: [],
        checkedTestMethods: [],
        filteredTestMethods: [],
        testParameters: [],
        filteredTestParameters: [],
        checkedTestParameters: [],
        testedItems: [],
        filteredTestedItems: [],
        drawingDesigns: [],
        filteredDrawingDesigns: [],
        processingStatuses: [],
        processPriorities: [],
        departments: [],
        processTableData: [],
        selectedProcessTableData: [],
        agreements: [],
        sampleNumbers: [],
        sampleNumberButton: false
      }
    }
  },
  methods: {
    sampleSubNumberSortFunction (str1, str2) {
      if (this.getMainNumber(str1) === this.getMainNumber(str2)) {
        return this.getNumber(str1) - this.getNumber(str2)
      } else {
        return this.getMainNumber(str1) - this.getMainNumber(str2)
      }
    },
    getNumber (str1) {
      let var1 = str1.sampleSubNumber.split('-')
      let var2 = 0
      for (let i = 0; i < var1.length; i++) {
        var2 += Number(var1[i])
      }
      return var2
    },
    getMainNumber (str1) {
      let var1 = str1.sampleSubNumber.split('-')

      return Number(var1[0])
    },
    processTableStyle ({row, rowIndex}) {
      let backgroundColor = '#FFFFFF'
      let color = '#000000'
      this.staticOptions.processPriorities.forEach(item => {
        if (row.processPriority === item.processPriorityName) {
          backgroundColor = item.processPriorityColor
          color = item.processPriorityFontColor
        }
      })
      return 'background: ' + backgroundColor + ';color: ' + color
    },
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
      } else if (action.id === '3') {
        this.submit()
      } else if (action.id === '4') {
        this.confirmDelete()
      } else if (action.id === '5') {
        this.expandAll()
      }
    },
    ifExpandAll () {
      this.$nextTick(function () {
        if (this.defaultExpandAll) {
          this.actions[4].icon = 'el-icon-phone'
          this.actions[4].name = '收起所有'
          this.staticOptions.processTableData.forEach(row => {
            this.$refs.processTable.toggleRowExpansion(row, true)
          })
        } else {
          this.actions[4].icon = 'el-icon-phone-outline'
          this.actions[4].name = '展开所有'
          this.staticOptions.processTableData.forEach(row => {
            this.$refs.processTable.toggleRowExpansion(row, false)
          })
        }
      })
    },
    expandAll () {
      if (this.defaultExpandAll) {
        this.actions[4].icon = 'el-icon-phone-outline'
        this.actions[4].name = '展开所有'
        this.defaultExpandAll = false
        this.staticOptions.processTableData.forEach(row => {
          this.$refs.processTable.toggleRowExpansion(row, false)
        })
      } else {
        this.actions[4].icon = 'el-icon-phone'
        this.actions[4].name = '收起所有'
        this.defaultExpandAll = true
        this.staticOptions.processTableData.forEach(row => {
          this.$refs.processTable.toggleRowExpansion(row, true)
        })
      }
    },
    handleProcessTableSelectionChange (selection) {
      this.staticOptions.selectedProcessTableData = selection
    },
    new () {
      this.dialog = true
      this.staticOptions.sampleNumberButton = false
      this.resetProcessForm()
      // point to user department
      this.queryApplicationUserDepartment()
      // give agreement comment to process, meanwhile, process comment will update it back from back end.
      this.processForm.comment = this.agreementComment
      this.processForm.agreementId = this.agreementId
      this.processForm.agreementNumber = this.agreementNumber
      this.processForm.processPriority = this.processPriority
    },
    copy () {
      let vm = this
      this.staticOptions.checkedTestMethods = []
      this.staticOptions.checkedTestParameters = []
      this.staticOptions.selectedProcessTableData.forEach(item => {
        vm.processForm = JSON.parse(JSON.stringify(item))
        vm.processForm.id = ''
        vm.processForm.sampleNumber = ''
        vm.processForm.sampleSubNumber = ''
        vm.processForm.workflows = []
        vm.staticOptions.processTableData.push(vm.processForm)
      })
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
    },
    submit () {
      this.workflowDialog = true
    },
    confirmAddWorkflow (event) {
      if (this.staticOptions.selectedProcessTableData.length > 0) {
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
    confirmDelete () {
      let vm = this
      if (this.staticOptions.selectedProcessTableData.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
          // vm.staticOptions.selectedProcessTableData = []
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    addWorkflow (event) {
      let vm = this
      let ids = []
      this.staticOptions.selectedProcessTableData.forEach(item => {
        ids.push(item.id)
      })
      this.workflowForm.id = ids.join(',')
      this.workflowForm.submitTo = event.submitTo
      this.workflowForm.comment = event.comment
      this.workflowForm.processingStatus = event.processingStatus
      this.$ajax.post('/api/sample/process/submitProcesses/', this.workflowForm)
        .then(function (res) {
          vm.$message('已经成功提交！')
          vm.loadAgreementProcess(vm.agreementId)
          vm.staticOptions.selectedProcessTableData = []
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    delete () {
      let vm = this
      let processIds = []
      this.staticOptions.selectedProcessTableData.forEach(item => {
        processIds.push(item.id)
      })
      this.$ajax.get('/api/sample/process/deleteProcesses/' + processIds.join(','))
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.staticOptions.sampleNumberButton = false
          vm.loadAgreementProcess(vm.agreementId)
          vm.staticOptions.selectedProcessTableData = []
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    confirmSaveToDB () {
      let vm = this
      this.$confirm('确认保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.saveToDB()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/process', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.processForm = res.data
          vm.loading = false
          vm.staticOptions.sampleNumberButton = false
          vm.dialog = false
          vm.loadAgreementProcess(vm.agreementId)
          vm.$emit('refreshAgreement')
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
          vm.loading = false
          // vm.dialog = false
        })
    },
    dblclick (row, event) {
      this.processForm = row
      this.loadSampleNumbers()
      this.dialog = true
      this.staticOptions.sampleNumberButton = false
    },
    getDrawingDesigns (testedItemIds) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return testedItemIds.indexOf(val.testedItem) >= 0
        })
    },
    getTestMethod (testedItemId) {
      this.staticOptions.filteredTestMethods =
        this.staticOptions.testMethods.filter(function (val) {
          if (val.testedItem instanceof Array) {
            for (let i = 0; i < val.testedItem.length; i++) {
              if (val.testedItem[i] === testedItemId) {
                return true
              }
            }
          } else {
            if (val.testedItem === testedItemId) {
              return true
            }
          }
          return false
        })
    },
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    updateTestedItemTasks () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProductGroup => {
        testItemProductGroup.testedItemTasks.forEach(item => {
          vm.processForm.testedItemTasks.push(item)
        })
        vm.fetchDrawingDesign()
      })
    },
    updateTestedItemProduct () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProduct => {
        vm.$ajax.post('/api/sample/testedItemProduct/getTestedItemTasks', testItemProduct)
          .then(function (res) {
            res.data.processPriority = vm.processForm.processPriority
            vm.processForm.testedItemTasks.push(res.data)
            vm.fetchDrawingDesign()
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              message: error.response.data.detail
            })
          })
      })
    },
    addTestedItemTask () {
      let vm = this
      vm.$ajax.get('/api/sample/testedItemProduct/getTestedItemTask')
        .then(function (res) {
          res.data.processPriority = vm.processForm.processPriority
          vm.processForm.testedItemTasks.push(res.data)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    updateTestedItemTask () {
      this.fetchDrawingDesign()
    },
    fetchDrawingDesign () {
      let testedItemIds = []
      this.processForm.testedItemTasks.forEach(item => {
        testedItemIds.push(item.testedItem)
      })
      this.getDrawingDesigns(testedItemIds)
    },
    loadAgreementProcess (agreementId) {
      let vm = this
      if (agreementId !== '') {
        this.$ajax.get('/api/sample/process/agreement/' + agreementId)
          .then(function (res) {
            vm.staticOptions.processTableData = res.data
            vm.ifExpandAll()
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              message: error.response.data.detail
            })
          })
      }
    },
    loadSampleNumbers () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getSampleNumbers')
        .then(function (res) {
          vm.staticOptions.sampleNumbers = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.staticOptions.departments = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    queryApplicationUserDepartment () {
      let vm = this
      this.$ajax.get('/api/users/queryApplicationUserDepartment')
        .then(function (res) {
          vm.processForm.submitFrom = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadTestCategory () {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/getTestCategory')
        .then(function (res) {
          vm.staticOptions.testCategories = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadTestedItemData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.staticOptions.testedItems = res.data
          vm.staticOptions.filteredTestedItems = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadTestMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.staticOptions.testMethods = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadTestParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.staticOptions.testParameters = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.staticOptions.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.staticOptions.processPriorities = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.detail
          })
        })
    },
    processPriorityFormatter (row, column) {
      let name = ''
      this.staticOptions.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    },
    submitTimeFormatter (row, column) {
      if (row.submitDate) {
        let dateTT = new Date(row.submitDate)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.staticOptions.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    }
  },
  activated () {
    if (this.agreementId) { this.loadAgreementProcess(this.agreementId) }
    this.queryApplicationUserDepartment()
    this.loadTestCategory()
    this.loadTestMethodData()
    this.loadTestParameterData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
    this.loadDepartment()
  },
  watch: {
    agreementId () {
      this.loadAgreementProcess(this.agreementId)
    }
  }
}
</script>
<style>
</style>
