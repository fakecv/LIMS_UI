    <template>
    <div>
      <el-container style="padding: 10px">
      <el-form :model="processingRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托编号">
              <el-input name="processingNumber" v-model="processingRequestForm.processingNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="样品名称">
              <el-input name="sampleName" v-model="processingRequestForm.sampleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="样品编号">
              <el-input name="sampleNumber" v-model="processingRequestForm.sampleNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="试样编号">
              <el-input name="sampleSubNumber" v-model="processingRequestForm.sampleSubNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目">
              <el-input name="experimentalItem" v-model="processingRequestForm.experimentalItem"></el-input>
            </el-form-item>
          </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="检测方法">
                <el-select name="createUserId" filterable default-first-option v-model="processingRequestForm.experimentalMethod">
                <el-option v-for="item in experimentalMethods"
                  :key="item.Id"
                  :label="item.experimentalMethodNumber"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交人">
              <el-input name="submitFrom" v-model="processingRequestForm.experimentalItem"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交至">
              <el-input name="submitTo" v-model="processingRequestForm.experimentalItem"></el-input>
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
          :fomatter="agreementFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampleName"
          label="样品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampleNumber"
          label="样品编号"
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
          prop="submitFrom"
          label="提交人"
          :fomatter="departmentFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="submitTo"
          :fomatter="departmentFormatter"
          label="提交至"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatus"
          label="流转状态"
          :fomatter="processingStatusFormatter"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="processingRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProcessings">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'processingMaintenance',
  data () {
    return {
      tableData: [],
      totalProcessings: 0,
      processingRequestForm: {
        agreementNumber: '',
        sampleName: '',
        sampleSubNumber: '',
        experimentalItem: '',
        submitFrom: '',
        submitTo: '',
        processingStatus: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      experimentalMethods: [],
      drawingDesigns: [],
      departments: [],
      agreements: [],
      processStatuses: [],
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.processingRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processingRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/processing/getProcessing').then(function (res) {
        vm.tableData = res.data
      })
    },
    dblclick (row, event) {
      this.$router.push('/lims/processingDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/processing/queryProcessing', this.processingRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcessings = res.data.totalProcessings || 0
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
    processingStatusFormatter (row, column) {
      let name = ''
      this.processStatuses.forEach(item => {
        if (row.processStatus === item.id) {
          name = item.processStatusName
        }
      })
      return name
    },
    agreementFormatter (row, column) {
      let name = ''
      this.agreements.forEach(item => {
        if (row.agreement === item.id) {
          name = item.agreementName
        }
      })
      return name
    },
    dateFormatter (row, column) {
      if (row.graduateOn) {
        return row.graduateOn.slice(0, 10)
      }
    }
  },
  mounted () {
    this.onSubmit()
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
  }
}
</script>
