<template>
  <el-dialog title="样品提交" :visible.sync="workflowDialog"  append-to-body>
    <el-container style="padding: 10px">
      <el-form :model="workflowForm" label-width="100px" label-position="left" size="mini">
        <el-row>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交至">
              <el-select name="submitTo" filterable default-first-option v-model="workflowForm.submitTo">
                <el-option v-for="item in departments"
                  :key="item.id"
                  :label="item.departmentName"
                  :value="item.departmentName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="当前流转状态">
              <el-select name="processingStatus" filterable default-first-option v-model="workflowForm.processingStatus">
                <el-option v-for="item in processingStatuses"
                  :key="item.id"
                  :label="item.processingStatusName"
                  :value="item.processingStatusName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提交说明">
              <el-input type="textarea" autosize v-model="workflowForm.comment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeWorkflowDialog">取 消</el-button>
      <el-button type="primary" @click="addWorkflow">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'workflowDialog',
  props: ['workflowDialog'],
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12},
      departments: [],
      processingStatuses: [],
      workflowForm: {
        id: '',
        submitFrom: '',
        submitTo: '',
        submitDate: '',
        submitPerson: '',
        comment: '',
        processingStatus: ''
      }
    }
  },
  methods: {
    addWorkflow () {
      if (this.workflowForm.processingStatus.indexOf('驳回') > -1 && this.workflowForm.comment === '') {
        this.$message('驳回必须填写驳回说明！')
      } else {
        this.$emit('addWorkflow', this.workflowForm)
      }
    },
    closeWorkflowDialog () {
      this.$emit('closeWorkflowDialog')
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.departments = res.data
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
          vm.processingStatuses = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    }
  },
  activated () {
    this.loadDepartment()
    this.loadProcessingStatusData()
  }

}
</script>
<style>

</style>
