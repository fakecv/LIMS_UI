    <template>
    <div>
      <el-container style="padding: 10px">
      <el-form :model="agreementRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托编号">
              <el-input name="agreementNumber" v-model="agreementRequestForm.agreementNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托单位">
              <el-input name="client" v-model="agreementRequestForm.client"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="样品名称">
              <el-input name="sampleName" v-model="agreementRequestForm.sampleName"></el-input>
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
          width="180">
        </el-table-column>
        <el-table-column
          prop="client"
          label="委托单位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampletName"
          label="样品名称"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="agreementRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalAgreements">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'agreementMaintenance',
  data () {
    return {
      tableData: [],
      totalAgreements: 0,
      agreementRequestForm: {
        agreementNumber: '',
        client: '',
        sampleName: '',
        experimentalCategory: [],
        itemsPerPage: 20,
        currentPage: 1
      },
      experimentalMethods: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    handleSizeChange (val) {
      this.agreementRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.agreementRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    dblclick (row, event) {
      this.$router.push('/lims/agreementDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/agreement/queryAgreement', this.agreementRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalAgreements = res.data.totalAgreements || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
