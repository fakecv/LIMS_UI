<template>
  <div style="padding: 40px;">
    <el-container>
      <el-form :model="processForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="优先级">
              <el-select name="processPriority" filterable default-first-option v-model="processForm.processPriority">
              <el-option v-for="item in staticOptions.processPriorities"
                :key="item.id"
                :label="item.processPriorityName"
                :value="item.processPriorityName">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="来样编号">
              <el-input name="sampleClientNumber" v-model="processForm.sampleClientNumber" autoComplete="sampleClientNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="样品编号">
              <el-input name="sampleNumber" v-model="processForm.sampleNumber" autoComplete="sampleNumber"></el-input>
              <el-button  :disabled="staticOptions.sampleNumberButton" @click="sampleNumberGenerator">生成样品编号</el-button>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="试样编号">
              <el-input name="sampleSubNumber" v-model="processForm.sampleSubNumber" autoComplete="sampleSubNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button-group style="min-width: 200px">
            <el-button type="success" icon="el-icon-plus" size="mini" circle @click="addTestedItemTask"></el-button>
            <el-button type="success" icon="el-icon-tickets" size="mini" circle @click="addTestedItemProduct">添加检测项目产品</el-button>
            <el-button type="success" icon="el-icon-goods" size="mini" circle @click="addTestedItemProductGroup">添加检测项目组</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteTestedItemTask"></el-button>
          </el-button-group>
        </el-row>
      </el-form>
    </el-container>
    <el-row>
      <el-col :span="24">
        <el-table :data="processForm.testedItemTasks"
        @row-dblclick="dblclick"
        @selection-change="handleTestedItemTaskChange"
        size="mini"
        height="250">
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
          <!-- <el-table-column
            prop="processPriority"
            label="优先级"
            :formatter="processPriorityFormatter"
            width="180">
              <template slot-scope="scope">
                <el-select name="processPriority" filterable default-first-option v-model="scope.row.processPriority" size="mini">
                  <el-option v-for="item in staticOptions.processPriorities"
                    :key="item.id"
                    :label="item.processPriorityName"
                    :value="item.processPriorityName">
                  </el-option>
                  </el-select>
              </template>
          </el-table-column> -->
          <el-table-column
            prop="rejectNote"
            label="驳回原因"
            show-overflow-tooltip
            width="180">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-container style="padding: 10px">
      <el-form :model="processForm" label-width="100px" label-position="left" size="mini">
        <el-row>
          <el-col :span="24">
            <el-form-item label="其它信息">
              <el-input type="textarea" name="comment" v-model="processForm.comment" autoComplete="comment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="加工图号">
              <el-select name="drawingDesign" filterable clearable default-first-option allow-create v-model="processForm.drawingDesign">
                <el-option v-for="item in staticOptions.filteredDrawingDesigns"
                  :key="item.id"
                  :label="item.drawingDesignName"
                  :value="item.drawingDesignName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交部门">
              <el-select name="submitFrom" filterable default-first-option v-model="processForm.submitFrom">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.departmentName"
                  :value="item.departmentName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="当前流转状态">
              <el-select name="processingStatus" filterable default-first-option v-model="processForm.processingStatus">
                <el-option v-for="item in staticOptions.processingStatuses"
                  :key="item.id"
                  :label="item.processingStatusName"
                  :value="item.processingStatusName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交至">
              <el-select name="submitTo" filterable default-first-option v-model="processForm.submitTo">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.departmentName"
                  :value="item.departmentName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </el-container>
    <testedItemProductDialog :append-to-body="true"
      :testCategories="staticOptions.testCategories"
      :filteredTestedItems="staticOptions.filteredTestedItems"
      :filteredTestParameters="staticOptions.filteredTestParameters"
      :filteredTestMethods="staticOptions.filteredTestMethods"
      :testedItemProductForm="testedItemProductForm"
      :testedItemProductTableData="testedItemProductTableData"
      :testedItemProductFormVisible="testedItemProductFormVisible"
      :totalTestedItemProducts="totalTestedItemProducts"
      :testedItems="staticOptions.testedItems"
      v-on:handleTestCategoryChange="handleTestCategoryChange"
      v-on:handleTestedItemChange="handleTestedItemChange"
      v-on:loadTestedItemProductData="loadTestedItemProductData"
      v-on:handleTestedItemProductChange="handleTestedItemProductChange"
      v-on:handleTestedItemProductSizeChange="handleTestedItemProductSizeChange"
      v-on:handleTestedItemProductCurrentChange="handleTestedItemProductCurrentChange"
      v-on:updateTestedItemProduct="updateTestedItemProduct"
      />
    <testedItemTaskDialog
      :testCategories="staticOptions.testCategories"
      :filteredTestedItems="staticOptions.filteredTestedItems"
      :filteredTestParameters="staticOptions.filteredTestParameters"
      :filteredTestMethods="staticOptions.filteredTestMethods"
      :processPriorities="staticOptions.processPriorities"
      :checkedTestMethods="staticOptions.checkedTestMethods"
      :checkedTestParameters="staticOptions.checkedTestParameters"
      :testedItemTaskForm="testedItemTaskForm"
      :testedItemTaskFormVisible.sync="testedItemTaskFormVisible"
      v-on:handleTestCategoryChange="handleTestCategoryChange"
      v-on:closeTestedItemTaskDialog="closeTestedItemTaskDialog"
      v-on:handleTestedItemChange="handleTestedItemChange"
      v-on:handleCheckAllChange="handleCheckAllChange"
      v-on:handleCheckedTestParametersChange="handleCheckedTestParametersChange"
      v-on:handleTestMethodCheckAllChange="handleTestMethodCheckAllChange"
      v-on:handleCheckedTestMethodsChange="handleCheckedTestMethodsChange"
      v-on:updateTestedItemTask="updateTestedItemTask"
      />
    <testedItemProductGroupDialog
      :testedItemProductGroupForm="testedItemProductGroupForm"
      :testedItemProductGroupTableData="testedItemProductGroupTableData"
      :testedItemProductGroupFormVisible="testedItemProductGroupFormVisible"
      :totalTestedItemProductGroups="totalTestedItemProductGroups"
      v-on:loadTestedItemProductGroupData="loadTestedItemProductGroupData"
      v-on:handleTestedItemProductGroupChange="handleTestedItemProductGroupChange"
      v-on:handleTestedItemProductGroupSizeChange="handleTestedItemProductGroupSizeChange"
      v-on:handleTestedItemProductGroupCurrentChange="handleTestedItemProductGroupCurrentChange"
      v-on:updateTestedItemTasks="updateTestedItemTasks"
      />
  </div>
</template>
<script>
import testedItemProductDialog from './dialog/TestedItemProductDialog'
import testedItemTaskDialog from './dialog/TestedItemTaskDialog'
import testedItemProductGroupDialog from './dialog/TestedItemProductGroupDialog'
export default {
  name: 'processDetail',
  components: {
    testedItemProductDialog,
    testedItemProductGroupDialog,
    testedItemTaskDialog
  },
  props: ['agreementId', 'processForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12},
      testedItemProductGroupFormVisible: false,
      testedItemProductFormVisible: false,
      testedItemTaskFormVisible: false,
      testedItemProductGroupForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        testedItemTasks: [],
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemTaskForm: {
        testedItemTaskName: '',
        testCategory: '',
        testedItem: '',
        testedItemName: '',
        testParameter: '',
        testMethod: '',
        processPriority: '',
        rejectNote: ''
      },
      testedItemProductForm: {
        testCategory: '',
        testedItem: '',
        testedItemName: '',
        testParameter: '',
        testMethod: '',
        id: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemProductGroupTableData: [],
      testedItemProductTableData: [],
      deletedTestedItemTasks: [],
      totalTestedItemProductGroups: 0,
      totalTestedItemProducts: 0
    }
  },
  methods: {
    addTestedItemTask () {
      this.$emit('addTestedItemTask')
    },
    addTestedItemProductGroup () {
      this.loadTestedItemProductGroupData()
      this.staticOptions.testedItemProducts = []
      this.testedItemProductGroupFormVisible = true
    },
    addTestedItemProduct () {
      this.loadTestedItemProductData()
      this.staticOptions.testedItemProducts = []
      this.testedItemProductFormVisible = true
    },
    dblclick (row, event) {
      this.testedItemTaskFormVisible = true
      this.testedItemTaskForm = row
      this.getFilteredTestItems(this.testedItemTaskForm.testCategory)
      this.getTestMethod(this.testedItemTaskForm.testedItem)
    },
    updateTestedItemProduct (val) {
      this.$emit('updateTestedItemProduct', val)
      this.testedItemProductFormVisible = false
    },
    updateTestedItemTask () {
      this.testedItemTaskFormVisible = false
      this.$emit('updateTestedItemTask')
    },
    updateTestedItemTasks (val) {
      this.$emit('updateTestedItemTasks', val)
      this.testedItemProductGroupFormVisible = false
    },
    deleteTestedItemTask () {
      let vm = this
      this.deletedTestedItemTasks.forEach(item => {
        for (var i = 0; i < vm.processForm.testedItemTasks.length; i++) {
          if (vm.processForm.testedItemTasks[i].id === item.id) {
            vm.processForm.testedItemTasks.splice(i, 1)
          }
        }
      })
      this.deletedTestedItemTasks = []
    },
    handleTestedItemProductGroupSizeChange (val) {
      this.testedItemProductGroupForm.itemsPerPage = val
      this.loadTestedItemProductGroupData()
    },
    handleTestedItemProductGroupCurrentChange (val) {
      this.testedItemProductGroupForm.currentPage = val
      this.loadTestedItemProductGroupData()
    },
    handleTestedItemProductSizeChange (val) {
      this.testedItemProductForm.itemsPerPage = val
      this.loadTestedItemProductData()
    },
    handleTestedItemProductCurrentChange (val) {
      this.testedItemProductForm.currentPage = val
      this.loadTestedItemProductData()
    },
    handleTestedItemProductGroupChange (val) {
      let vm = this
      this.staticOptions.testedItemProducts = []
      val.forEach(item => {
        vm.staticOptions.testedItemProducts.push(item)
      })
    },
    handleTestedItemProductChange (val) {
      let vm = this
      this.staticOptions.testedItemProducts = []
      val.forEach(item => {
        vm.staticOptions.testedItemProducts.push(item)
      })
    },
    handleTestedItemTaskChange (val) {
      this.deletedTestedItemTasks = val
    },
    handleCheckedTestParametersChange (value) {
      this.testedItemTaskForm.testParameter = value.join(',')
    },
    handleCheckAllChange (val) {
      let vm = this
      this.staticOptions.checkedTestParameters = []
      if (val) {
        this.staticOptions.filteredTestParameters.forEach(testParameter => {
          vm.staticOptions.checkedTestParameters.push(testParameter.testParameterName)
        })
        this.testedItemTaskForm.testParameter = this.staticOptions.checkedTestParameters.join(',')
      } else {
        this.testedItemTaskForm.testParameter = ''
      }
    },
    handleCheckedTestMethodsChange (value) {
      this.testedItemTaskForm.testMethod = value.join(';')
    },
    handleTestMethodCheckAllChange (val) {
      let vm = this
      this.staticOptions.checkedTestMethods = []
      if (val) {
        this.staticOptions.filteredTestMethods.forEach(testMethod => {
          vm.staticOptions.checkedTestMethods.push(testMethod.testMethodName)
        })
        this.testedItemTaskForm.testMethod = this.staticOptions.checkedTestMethods.join(';')
      } else {
        this.testedItemTaskForm.testMethod = ''
      }
    },
    closeTestedItemTaskDialog () {
      this.testedItemTaskFormVisible = false
    },
    // load all the testedItemProductGroups
    loadTestedItemProductGroupData () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProductGroup/queryTestedItemProductGroup', this.testedItemProductGroupForm)
        .then(function (res) {
          vm.testedItemProductGroupTableData = res.data.pageResult || []
          vm.totalTestedItemProductGroups = res.data.totalTestedItemProductGroups || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    // load all the testedItemProductes
    loadTestedItemProductData () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProduct/queryTestedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.testedItemProductTableData = res.data.pageResult || []
          vm.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    copy () {
      this.$emit('copy')
      this.$message('复制成功!')
      this.staticOptions.sampleNumberButton = false
    },
    confirmDelete () {
      let vm = this
      if (this.processForm.id && this.processForm.id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/process/delete/' + this.processForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteProcessForm')
          vm.staticOptions.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    getAgreementNumber  (val) {
      this.$emit('getAgreementInfo', val)
    },
    getFilteredTestItems (testCategoryId) {
      this.staticOptions.filteredTestedItems =
        this.staticOptions.testedItems.filter(function (val) {
          return val.testCategory === testCategoryId
        })
    },
    handleTestCategoryChange (testCategoryId) {
      this.testedItemTaskForm.testedItem = ''
      this.getFilteredTestItems(testCategoryId)
    },
    getTestMethod  (val) {
      this.$emit('getTestMethod', val)
      this.$emit('getTestParameter', val)
      // this.$emit('getDrawingDesigns', val)
    },
    handleTestedItemChange (val) {
      this.testedItemTaskForm.drawingDesign = ''
      this.testedItemTaskForm.testParameter = ''
      this.testedItemTaskForm.testMethod = ''
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === val) {
          this.testedItemTaskForm.testedItemName = item.testedItemName
        }
      })
      this.getTestMethod(val)
    },
    sampleNumberGenerator () {
      let vm = this
      this.$ajax.get('/api/sample/process/generateSampleNumber')
        .then(function (res) {
          vm.processForm.sampleNumber = res.data
          vm.processForm.sampleSubNumber = res.data
          vm.staticOptions.sampleNumberButton = true
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.staticOptions.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
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
    processingStatusFormatter (row, column) {
      let name = ''
      this.staticOptions.processingStatuses.forEach(item => {
        if (row.processingStatus === item.id) {
          name = item.processingStatusName
        }
      })
      return name
    },
    receiveSampleTimeFormatter (row, column) {
      if (row.receiveSampleTime) {
        let dateTT = new Date(row.receiveSampleTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    submitFromFormatter (row, column) {
      let name = ''
      this.staticOptions.departments.forEach(item => {
        if (row.submitFrom === item.id) {
          name = item.departmentName
        }
      })
      return name
    },
    submitToFormatter (row, column) {
      let name = ''
      this.staticOptions.departments.forEach(item => {
        if (row.submitTo === item.id) {
          name = item.departmentName
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
    },
    testMethodFormatter (row, column) {
      let name = ''
      this.staticOptions.testMethods.forEach(item => {
        if (row.testMethod === item.id) {
          name = item.testMethodName
        }
      })
      return name
    },
    testParameterFormatter (row, column) {
      let name = ''
      this.staticOptions.testParameters.forEach(item => {
        if (row.testParameter === item.id) {
          name = item.testParameterName
        }
      })
      return name
    },
    testCategoryFormatter (row, column) {
      let name = ''
      this.staticOptions.testCategories.forEach(item => {
        if (row.testCategory === item.id) {
          name = item.testCategoryName
        }
      })
      return name
    }
  }
}
</script>
<style lang="less">
.testedItemTask {
  overflow: auto;
}
.process {
  overflow: scroll;
}
</style>
