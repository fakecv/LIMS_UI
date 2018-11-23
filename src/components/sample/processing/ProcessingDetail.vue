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
      <el-container style="padding: 10px">
        <el-form :model="processForm" label-width="100px" label-position="left" size="mini" readonly>
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托编号">
                <el-input name="agreementNumber" v-model="processForm.agreementNumber" readonly autoComplete="agreementNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品名称">
                <el-input name="sampleName" v-model="agreementForm.sampleName" readonly autoComplete="sampleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品接收时间">
                <el-date-picker type="datetime" placeholder="选择日期" readonly v-model="agreementForm.receiveSampleTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="材质牌号">
                <el-input name="materialNumber" v-model="agreementForm.materialNumber" readonly autoComplete="materialNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="要求完成时间">
                <el-date-picker type="datetime" placeholder="选择日期" readonly v-model="agreementForm.expectedCompletionTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="来样编号">
                <el-input name="sampleClientNumber" v-model="agreementForm.sampleClientNumber" autoComplete="sampleClientNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="加工图号">
              <el-select name="drawingDesign" filterable default-first-option v-model="processForm.drawingDesign">
                <el-option v-for="item in staticOptions.filteredDrawingDesigns"
                  :key="item.id"
                  :label="item.drawingDesignName"
                  :value="item.drawingDesignName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
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
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
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
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="提交至">
              <el-select name="submitTo" filterable default-first-option v-model="processForm.submitTo">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.departmentName"
                  :value="item.departmentName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="优先级">
                <el-select name="processPriority" filterable default-first-option v-model="processForm.processPriority">
                <el-option v-for="item in staticOptions.processPriorities"
                  :key="item.Id"
                  :label="item.processPriorityName"
                  :value="item.processPriorityName">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="其他信息">
                <el-input type="textarea" name="comment" v-model="processForm.comment" autoComplete="comment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="样品编号">
                <el-input name="sampleNumber" v-model="processForm.sampleNumber" autoComplete="sampleNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="试样编号">
                <el-input name="sampleSubNumber" v-model="processForm.sampleSubNumber" autoComplete="sampleSubNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
    <el-table :data="staticOptions.testedItemTaskTableData" style="width: 100%" size="mini">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="testedItemTaskName"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testCategory"
          label="检测类别"
          :formatter="testCategoryFormatter"
          width="180">
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
      </el-table>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'processingDetail',
  props: ['agreementForm', 'processForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      sampleNumberButton: false,
      actions: [
        {'ref': 'delete', 'name': '删除', 'id': '6', 'icon': 'el-icon-delete', 'loading': false, 'disabled': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      testedItemProductGroupFormVisible: false,
      testedItemProductGroupForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemTaskForm: {
        testedItemTaskName: '',
        testedItem: '',
        testParameter: '',
        testMethod: '',
        drawingDesign: '',
        submitFrom: '',
        processingStatus: '',
        submitTo: '',
        processPriority: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemProductGroupTableData: [],
      deletedTestedItemTasks: [],
      totalTestedItemProductGroups: 0
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        // this.new()
      } else if (action.id === '2') {
        // this.copy()
      } else if (action.id === '3') {
        // this.saveToDB()
      } else if (action.id === '4') {
        // this.submit()
      } else if (action.id === '5') {
        // this.actions[3].disabled = false
      } else if (action.id === '6') {
        this.confirmDelete()
      }
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
      this.$ajax.get('/api/sample/processing/delete/' + this.processForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteProcessForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getAgreementNumber  (val) {
      this.$emit('getAgreementInfo', val)
    },
    getTestMethod  (val) {
      this.processForm.drawingDesign = ''
      this.processForm.testParameter = ''
      this.processForm.testMethod = ''
      this.$emit('getTestMethod', val)
      this.$emit('getTestParameter', val)
      this.$emit('getDrawingDesigns', val)
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    receiveSampleTimeFormatter (row, column) {
      if (row.receiveSampleTime) {
        let dateTT = new Date(row.receiveSampleTime)
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
</style>
