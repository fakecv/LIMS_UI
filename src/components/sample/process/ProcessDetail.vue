<template>
  <div>
    <el-container>
      <el-header style="min-width:500px;">
        <el-button-group>
          <el-button :ref="action.name" type="info" v-for="(action,index) in actions"
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
        <el-form :model="processForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托编号">
                <el-select name="agreementNumber" filterable default-first-option v-model="processForm.agreementNumber" @change="getAgreementNumber">
                <el-option v-for="item in staticOptions.agreements"
                  :key="item.Id"
                  :label="item.agreementNumber"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品名称">
                <el-input name="sampleName" v-model="processForm.sampleName" readonly autoComplete="sampleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品接收时间">
                <el-date-picker type="datetime" placeholder="选择日期" readonly v-model="processForm.receiveSampleTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="材质牌号">
                <el-input name="materialNumber" v-model="processForm.materialNumber" readonly autoComplete="materialNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="要求完成时间">
                <el-date-picker type="datetime" placeholder="选择日期" readonly v-model="processForm.expectedCompletionTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="来样编号">
                <el-input name="sampleClientNumber" v-model="processForm.sampleClientNumber" autoComplete="sampleClientNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="优先级">
                <el-select name="processPriority" filterable default-first-option v-model="processForm.processPriority">
                <el-option v-for="item in staticOptions.processPriorities"
                  :key="item.Id"
                  :label="item.processPriorityName"
                  :value="item.id">
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
                <el-button  :disabled="sampleNumberButton" @click="sampleNumberGenerator">生成样品编号</el-button>
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
    </el-container>
  <div>
    <el-row type="flex" justify="end">
      <el-button-group style="min-width: 200px">
        <el-button type="success" icon="el-icon-plus" circle @click="addTestedItemTask"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteTestedItemTask"></el-button>
      </el-button-group>
    </el-row>
    <el-table :data="TestedItemTasks" style="width: 100%" @row-dblclick="dblclick">
        <el-table-column
          prop="testedItemProductName"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItem"
          label="检测项目"
          :formatter="experimentalItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItemsParameter"
          label="检测项目参数"
          :formatter="experimentalItemsParameterFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalMethod"
          label="检测方法"
          :formatter="experimentalMethodFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="drawingDesign"
          label="加工图号"
          :formatter="drawingDesignFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatus"
          label="当前流转状态"
          :formatter="processingStatusFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="submitFrom"
          label="提交部门"
          :formatter="departmentFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="submitTo"
          label="提交至"
          :formatter="departmentFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processPriority"
          label="优先级"
          :formatter="processPriorityFormatter"
          width="180">
        </el-table-column>
      </el-table>
  </div>
  <el-dialog :visible.sync="testedItemTaskFormVisible" :modal-append-to-body="false">
    <TestedItemTask :staticOptions="staticOptions">
    </TestedItemTask>
  </el-dialog>
  </div>
</template>
<script>
import TestedItemTask from '@/components/sample/testeditemproduct/TestedItemTaskDetail'
export default {
  name: 'processDetail',
  components: [TestedItemTask],
  props: ['processForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      sampleNumberButton: false,
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false, 'disabled': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false, 'disabled': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false, 'disabled': false},
        {'name': '数据库保存并提交', 'id': '4', 'icon': 'el-icon-check', 'loading': false, 'disabled': false},
        {'name': '解锁', 'id': '5', 'icon': 'el-icon-edit', 'loading': false, 'disabled': false},
        {'name': '删除', 'id': '6', 'icon': 'el-icon-delete', 'loading': false, 'disabled': false},
        {'name': '文件导入', 'id': '7', 'icon': 'el-icon-upload2', 'loading': false, 'disabled': false},
        {'name': '文件保存', 'id': '8', 'icon': 'el-icon-download', 'loading': false, 'disabled': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      testedItemTaskFormVisible: false
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
        this.submit()
      } else if (action.id === '5') {
        this.actions[3].disabled = false
      } else if (action.id === '6') {
        this.confirmDelete()
      } else if (action.id === '7') {
      } else if (action.id === '8') {
      }
    },
    new () {
      this.$emit('new')
      this.sampleNumberButton = false
    },
    copy () {
      this.$emit('copy')
      this.$message('复制成功!')
      this.sampleNumberButton = false
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/process', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessForm', res.data)
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    submit () {
      let vm = this
      this.$ajax.post('/api/sample/process/submitProcess', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessForm', res.data)
          vm.sampleNumberButton = false
          vm.actions[3].disabled = true
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    addTestedItemTask () {
      console.log('addTestedItemTask')
      this.testedItemTaskFormVisible = true
    },
    dblclick () {
      this.testedItemTaskFormVisible = true
    },
    deleteTestedItemTask () {
      console.log('deleteTestedItemTask')
    },
    getAgreementNumber  (val) {
      this.$emit('getAgreementInfo', val)
    },
    getExperimentalMethod  (val) {
      this.processForm.drawingDesign = ''
      this.processForm.experimentItemsParameter = ''
      this.processForm.experimentalMethod = ''
      this.$emit('getExperimentalMethod', val)
      this.$emit('getExperimentItemsParameter', val)
      this.$emit('getDrawingDesigns', val)
    },
    sampleNumberGenerator () {
      let vm = this
      this.$ajax.get('/api/sample/process/generateSampleNumber')
        .then(function (res) {
          vm.processForm.sampleNumber = res.data
          vm.processForm.sampleSubNumber = res.data
          vm.sampleNumberButton = true
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    departmentFormatter (row, column) {
      let name = ''
      this.departments.forEach(item => {
        if (row.department === item.id) {
          name = item.departmentName
        }
      })
      return name
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.drawingDesigns.forEach(item => {
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
    experimentalItemFormatter (row, column) {
      let name = ''
      this.experimentalItems.forEach(item => {
        if (row.experimentalItem === item.id) {
          name = item.experimentalItemName
        }
      })
      return name
    },
    experimentalMethodFormatter (row, column) {
      let name = ''
      this.experimentalMethods.forEach(item => {
        if (row.experimentalMethod === item.id) {
          name = item.experimentalMethodName
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
    }
  }
}
</script>
<style lang="less">
</style>
