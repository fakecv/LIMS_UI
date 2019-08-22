    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="internalAuditorRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="内部审核员名称">
              <el-input name="internalAuditorName" v-model="internalAuditorRequestForm.internalAuditorName"></el-input>
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
          prop="internalAuditorName"
          label="内部审核员名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="internalAuditorDescription"
          label="内部审核员描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="internalAuditorRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalInternalAuditors">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'internalAuditorMaintenance',
  data () {
    return {
      tableData: [],
      totalInternalAuditors: 0,
      internalAuditorRequestForm: {
        internalAuditorName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.internalAuditorRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.internalAuditorRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/internalauditchecklist/internalAuditor/getInternalAuditor')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/internalAuditorDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/internalauditchecklist/internalAuditor/queryInternalAuditor', this.internalAuditorRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalInternalAuditors = res.data.totalInternalAuditors || 0
        })
    }
  },
  activated () {
    this.onSubmit()
  }

}
</script>
