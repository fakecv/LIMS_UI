    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="testParameterRequestForm" label-width="150px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="testedItem" filterable clearable default-first-option v-model="testParameterRequestForm.testedItem">
                <el-option v-for="item in testedItems"
                  :key="item.Id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="检测项目参数名称">
              <el-input name="testParameterName" v-model="testParameterRequestForm.testParameterName"></el-input>
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
          prop="testParameterName"
          :formatter="testedItemFormatter"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testParameterName"
          label="检测项目参数名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testParameterDescription"
          label="检测项目参数描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testParameterRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestParameters">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testParameterMaintenance',
  data () {
    return {
      tableData: [],
      totalTestParameters: 0,
      testParameterRequestForm: {
        testParameterName: '',
        testedItem: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: []
    }
  },
  methods: {
    loadTestedItemData () {
      let vm = this
      this.$ajax
        .get('/api/sample/testedItem/getTestedItem')
        .then(function (res) {
          vm.testedItems = res.data
        })
    },
    handleSizeChange (val) {
      this.testParameterRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testParameterRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/testParameter/getTestParameter')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/testParameterDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/testParameter/queryTestParameter', this.testParameterRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestParameters = res.data.totalTestParameters || 0
        })
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    }
  },
  mounted () {
    this.onSubmit()
    this.loadTestedItemData()
  }

}
</script>
