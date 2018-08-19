    <template>
    <div>
      <el-container style="padding: 10px">
      <el-form :model="processRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托编号">
              <el-input name="agreementNumber" v-model="processRequestForm.agreementNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托单位">
              <el-input name="client" v-model="processRequestForm.client"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="样品名称">
              <el-input name="sampleName" v-model="processRequestForm.sampleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="样品编号">
              <el-input name="sampleNumber" v-model="processRequestForm.sampleNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="试样编号">
              <el-input name="sampleNumber" v-model="processRequestForm.sampleNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="流转状态">
              <el-select name="processingStatus" filterable default-first-option v-model="processRequestForm.processingStatus">
              <el-option v-for="item in processingStatuses"
                :key="item.Id"
                :label="item.processingStatusName"
                :value="item.id">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
          prop="agreementNumber"
          label="委托编号"
          :formatter="agreementFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampleName"
          label="样品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatus"
          label="当前流转状态"
          :formatter="processingStatusFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="receiveSampleTime"
          label="接收样品时间"
          :formatter="receiveSampleTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="materialNumber"
          label="材质编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="expectedCompletionTime"
          label="要求完成时间"
          :formatter="expectedCompletionTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampleSubNumber"
          label="试样编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItem"
          label="检测项目"
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
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="processRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcesss">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'processMaintenance',
  data () {
    return {
      tableData: [],
      totalProcesss: 0,
      processRequestForm: {
        agreementNumber: '',
        sampleName: '',
        materialNumber: '',
        sampleSubNumber: '',
        experimentalMethod: '',
        drawingDesign: '',
        processingStatus: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      experimentalMethods: [],
      drawingDesigns: [],
      agreements: [],
      processingStatuses: [],
      departments: [],
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.processRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/process/getProcess').then(function (res) {
        vm.tableData = res.data
      })
    },
    dblclick (row, event) {
      this.$router.push('/lims/processDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/process/queryProcess', this.processRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcesss = res.data.totalProcesss || 0
        })
    },
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax
        .get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.experimentalMethods = res.data
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.drawingDesigns = res.data
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.departments = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.agreements = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message(error.response.data.message)
        })
    },
    loadProcessingStatusData () {
      let vm = this
      this.$ajax.get('/api/sample/processingStatus/getProcessingStatus')
        .then(function (res) {
          vm.processingStatuses = res.data
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
    processingStatusFormatter (row, column) {
      let name = ''
      this.processingStatuses.forEach(item => {
        if (row.processingStatus === item.id) {
          name = item.processingStatusName
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
    drawingDesignFormatter (row, column) {
      let name = ''
      this.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    },
    agreementFormatter (row, column) {
      let name = ''
      this.agreements.forEach(item => {
        if (row.agreementNumber === item.id) {
          name = item.agreementNumber
        }
      })
      return name
    },
    receiveSampleTimeFormatter (row, column) {
      if (row.receiveSampleTime) {
        return row.receiveSampleTime.slice(0, 10)
      }
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        return row.expectedCompletionTime.slice(0, 10)
      }
    }
  },
  mounted () {
    this.onSubmit()
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
    this.loadDepartment()
    this.loadAgreement()
    this.loadProcessingStatusData()
  }
}
</script>
