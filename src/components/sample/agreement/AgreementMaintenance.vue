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
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="来样编号">
              <el-input name="sampleClientNumber" v-model="agreementRequestForm.sampleClientNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="试样编号">
              <el-input name="sampleNumber" v-model="agreementRequestForm.sampleNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目">
              <el-input name="experimentalItem" v-model="agreementRequestForm.experimentalItem"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测方法">
              <el-select name="createUserId" v-model=agreementRequestForm.createUserId>
               <el-option label="张秀梅" value="zxm"></el-option>
               <el-option label="关锋" value="augur"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测类别">
              <el-checkbox-group v-model="agreementRequestForm.checkBox">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
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
          prop="client"
          label="委托单位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampletName"
          label="样品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampletClientNumber"
          label="来样编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampletNumber"
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
          prop="experimentalCategory"
          label="检测类别"
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
        sampleClientNumber: '',
        sampleNumber: '',
        experimentalMethod: '',
        experimentalCategory: '',
        itemsPerPage: 20,
        currentPage: 1
      },
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
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getAgreement')
        .then(function (res) {
          vm.tableData = res.data
        })
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
