    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="numberGeneratorRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="部门名称">
              <el-input name="numberGeneratorName" v-model="numberGeneratorRequestForm.numberGeneratorName"></el-input>
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
          prop="numberGeneratorName"
          label="编号名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="numberGeneratorPrifix"
          label="编号前缀"
          width="180">
        </el-table-column>
        <el-table-column
          prop="numberGeneratorPostfix"
          label="编号后缀"
          width="180">
        </el-table-column>
        <el-table-column
          prop="numberGeneratorValue"
          label="编号当前值"
          width="180">
        </el-table-column>
        <el-table-column
          prop="numberGeneratorDescription"
          label="编号描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="numberGeneratorRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalNumberGenerators">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'numberGeneratorMaintenance',
  data () {
    return {
      tableData: [],
      totalNumberGenerators: 0,
      numberGeneratorRequestForm: {
        numberGeneratorName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.numberGeneratorRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.numberGeneratorRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/numberGenerator/getNumberGenerator')
        .then(function (res) {
          console.log('numberGeneratorMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/numberGeneratorDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/numberGenerator/queryNumberGenerator', this.numberGeneratorRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalNumberGenerators = res.data.totalNumberGenerators || 0
          console.log('totalDeparts is: ' + vm.totalNumberGenerators)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
