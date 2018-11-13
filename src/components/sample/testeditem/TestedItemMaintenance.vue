    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="testedItemRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-input name="testedItemName" v-model="testedItemRequestForm.testedItemName"></el-input>
            </el-form-item>
            <el-form-item label="检测项目说明">
              <el-input name="testedItemNumber" v-model="testedItemRequestForm.testedItemNumber"></el-input>
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
          prop="testedItemName"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemNumber"
          label="检测项目说明"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItems">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testedItemMaintenance',
  data () {
    return {
      tableData: [],
      totalTestedItems: 0,
      testedItemRequestForm: {
        testedItemName: '',
        testedItemNumber: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.testedItemRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testedItemRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/testedItemDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/testedItem/queryTestedItem', this.testedItemRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItems = res.data.totalTestedItems || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
