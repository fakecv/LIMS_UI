    <template>
    <div>
      <el-container style="padding: 10px">
      <el-form :model="processRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托编号">
              <el-input name="processNumber" v-model="processRequestForm.processNumber"></el-input>
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
            <el-form-item label="来样编号">
              <el-input name="sampleClientNumber" v-model="processRequestForm.sampleClientNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="试样编号">
              <el-input name="sampleNumber" v-model="processRequestForm.sampleNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目">
              <el-input name="experimentalItem" v-model="processRequestForm.experimentalItem"></el-input>
            </el-form-item>
          </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="检测方法">
                <el-select name="createUserId" filterable default-first-option v-model="processRequestForm.experimentalMethod">
                <el-option v-for="item in experimentalMethods"
                  :key="item.Id"
                  :label="item.experimentalMethodNumber"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
    </el-container>
      <el-table :data="tableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="agreementNumber"
          label="委托编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampletName"
          label="样品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="receiveSampleTime"
          label="接收样品时间"
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
          width="180">
        </el-table-column>
        <el-table-column
          prop="drawingDesign"
          label="加工图号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processingStatus"
          label="当前流转状态"
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
          vm.staticOptions.drawingDesigns = res.data
        })
    }
  },
  mounted () {
    this.onSubmit()
    this.loadExperimentalMethodData()
    this.loadDrawingDesignData()
  }
}
</script>
