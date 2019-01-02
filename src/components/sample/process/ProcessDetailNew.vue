<template>
<div>
    <ProcessDetail
      :processForm="processForm"
      :agreementForm="agreementForm"
      :staticOptions="staticOptions"
      v-on:getDrawingDesigns="getDrawingDesigns"
      v-on:getAgreementInfo="getAgreementInfo"
      v-on:getTestMethod="getTestMethod"
      v-on:getTestParameter="getTestParameter"
      v-on:updateProcessForm="updateProcessForm"
      v-on:updateTestedItemTasks="updateTestedItemTasks"
      v-on:updateTestedItemTask="updateTestedItemTask"
      v-on:addTestedItemTask="addTestedItemTask"
      v-on:updateTestedItemProduct="updateTestedItemProduct"
      v-on:deleteProcessForm="resetProcessForm"
      v-on:new="resetProcessForm"
      v-on:copy="resetProcessId"
      />
      <el-table :data="staticOptions.processTableData"
      style="width: 100%"
      tooltip-effect="dark"
      @row-dblclick=dblclick
      >
      <el-table-column
        type="expand">
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
        <el-table-column
          prop="rejectNote"
          label="驳回原因"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        </el-table>
      </template>
      </el-table-column>
      <el-table-column
        prop="agreementNumber"
        label="委托编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sampleSubNumber"
        label="试样编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="drawingDesign"
        label="加工图号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="submitFrom"
        label="提交部门"
        width="180">
      </el-table-column>
      <el-table-column
        prop="processingStatus"
        label="当前流转状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="submitTo"
        label="提交至"
        width="180">
      </el-table-column>
      <el-table-column
        prop="processPriority"
        label="优先级"
        show-overflow-tooltip
        width="80">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="其它"
        show-overflow-tooltip
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ProcessDetail from '@/components/sample/process/ProcessDetail'
export default {
  name: 'processDetailNew',
  components: {ProcessDetail},
  data () {
    return {
      agreementForm: {
        sampleName: '',
        receiveSampleTime: '',
        materialNumber: '',
        expectedCompletionTime: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
      },
      processForm: {
        id: '',
        agreementNumber: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
      },
      processResetForm: {
        id: '',
        agreementNumber: '',
        sampleClientNumber: '',
        sampleNumber: '',
        sampleSubNumber: '',
        comment: '',
        testedItemTasks: [],
        processPriority: '',
        submitTime: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: ''
      },
      staticOptions: {
        department: '',
        testCategories: [],
        testedItemTaskTableData: [],
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
        agreements: []
      }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/processDetailEdit/' + row.id)
    },
    getAgreementInfo (agreementId) {
      let vm = this
      this.staticOptions.agreements.forEach(agreement => {
        if (agreement.agreementNumber === agreementId) {
          vm.agreementForm.sampleName = agreement.sampleName
          vm.agreementForm.materialNumber = agreement.materialNumber
          vm.agreementForm.receiveSampleTime = agreement.receiveSampleTime
          vm.agreementForm.expectedCompletionTime = agreement.expectedCompletionTime
          vm.processForm.comment = agreement.comment
          vm.processForm.processPriority = agreement.processPriority
        }
      })
      // to display other added processes within the same agreementId at the bottom of page.
      this.loadAgreementProcess(agreementId)
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
          return val.testedItem === testedItemId
        })
    },
    getTestParameter (testedItemId) {
      this.staticOptions.filteredTestParameters =
        this.staticOptions.testParameters.filter(function (val) {
          return val.testedItem === testedItemId
        })
    },
    resetProcessId () {
      this.processForm.id = ''
    },
    resetProcessForm () {
      this.processForm = JSON.parse(JSON.stringify(this.processResetForm))
      this.staticOptions.testedItemTaskTableData = []
    },
    updateProcessForm (event) {
      this.processForm.id = event.id
    },
    updateTestedItemTasks () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProductGroup => {
        testItemProductGroup.testedItemTasks.forEach(item => {
          item.processPriority = vm.processForm.processPriority
          vm.staticOptions.testedItemTaskTableData.push(item)
        })
        // vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
        vm.fetchDrawingDesign()
      })
    },
    updateTestedItemProduct () {
      let vm = this
      this.staticOptions.testedItemProducts.forEach(testItemProduct => {
        vm.$ajax.post('/api/sample/testedItemProduct/getTestedItemTasks', testItemProduct)
          .then(function (res) {
            res.data.processPriority = vm.processForm.processPriority
            vm.staticOptions.testedItemTaskTableData.push(res.data)
            // vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
            vm.fetchDrawingDesign()
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              message: error.response.data.message
            })
          })
      })
    },
    addTestedItemTask () {
      let vm = this
      vm.$ajax.get('/api/sample/testedItemProduct/getTestedItemTask')
        .then(function (res) {
          res.data.processPriority = vm.processForm.processPriority
          vm.staticOptions.testedItemTaskTableData.push(res.data)
          // vm.staticOptions.testedItemTaskTableData.push.apply(vm.staticOptions.testedItemTaskTableData, res.data)
          // vm.fetchDrawingDesign()
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    updateTestedItemTask () {
      this.fetchDrawingDesign()
    },
    fetchDrawingDesign () {
      let testedItemIds = []
      this.staticOptions.testedItemTaskTableData.forEach(item => {
        testedItemIds.push(item.testedItem)
      })
      this.getDrawingDesigns(testedItemIds)
    },
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.staticOptions.agreements = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    loadAgreementProcess (agreementId) {
      let vm = this
      this.$ajax.get('/api/sample/process/agreement/' + agreementId)
        .then(function (res) {
          vm.staticOptions.processTableData = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
            message: error.response.data.message
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
  mounted () {
    this.queryApplicationUserDepartment()
    this.loadTestCategory()
    this.loadTestMethodData()
    this.loadTestParameterData()
    this.loadTestedItemData()
    this.loadDrawingDesignData()
    this.loadProcessingStatusData()
    this.loadProcessPriorityData()
    this.loadDepartment()
    this.loadAgreement()
  }
}
</script>
