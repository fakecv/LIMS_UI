    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="testMethodRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="testedItem" filterable clearable default-first-option v-model="testMethodRequestForm.testedItem">
                <el-option v-for="item in testedItems"
                  :key="item.Id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="实验方法编号">
              <el-input name="testMethodName" v-model="testMethodRequestForm.testMethodName"></el-input>
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
          prop="testedItem"
          label="检测项目名称"
          :formatter="testedItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethodName"
          label="实验方法编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethodNumber"
          label="实验方法描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testMethodRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestMethods">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testMethodMaintenance',
  data () {
    return {
      tableData: [],
      totalTestMethods: 0,
      testMethodRequestForm: {
        testMethodName: '',
        testMethodNumber: '',
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
      this.testMethodRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testMethodRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/getTestMethod')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/testMethodDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/testMethod/queryTestMethod', this.testMethodRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestMethods = res.data.totalTestMethods || 0
          console.log(vm.totalTestMethods)
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
