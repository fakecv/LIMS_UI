    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="internalAuditCheckListRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="条款">
              <el-input name="terms" v-model="internalAuditCheckListRequestForm.terms"></el-input>
            </el-form-item>
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
          prop="terms"
          label="条款"
          width="180">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="审核内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="auditMethod"
          label="审核方法"
          width="180">
        </el-table-column>
        <el-table-column
          prop="auditNote"
          label="审核说明"
          width="180">
        </el-table-column>
        <el-table-column
          prop="auditResult"
          label="审核结果"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="internalAuditCheckListRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalInternalAuditCheckLists">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'internalAuditCheckListMaintenance',
  data () {
    return {
      tableData: [],
      totalInternalAuditCheckLists: 0,
      internalAuditCheckListRequestForm: {
        terms: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.internalAuditCheckListRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.internalAuditCheckListRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/internalAuditCheckList/getInternalAuditCheckList')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/internalAuditCheckListDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/internalauditchecklist/internalAuditCheckList/queryInternalAuditCheckList', this.internalAuditCheckListRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalInternalAuditCheckLists = res.data.totalInternalAuditCheckLists || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
