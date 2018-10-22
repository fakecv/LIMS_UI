    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="experimentItemsParameterRequestForm" label-width="150px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="experimentalItem" filterable default-first-option v-model="experimentItemsParameterRequestForm.experimentalItem">
                <el-option v-for="item in experimentalItems"
                  :key="item.Id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="检测项目参数名称">
              <el-input name="experimentItemsParameterName" v-model="experimentItemsParameterRequestForm.experimentItemsParameterName"></el-input>
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
          prop="experimentItemsParameterName"
          :formatter="experimentalItemFormatter"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentItemsParameterName"
          label="检测项目参数名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentItemsParameterDescription"
          label="检测项目参数描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="experimentItemsParameterRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalExperimentItemsParameters">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'experimentItemsParameterMaintenance',
  data () {
    return {
      tableData: [],
      totalExperimentItemsParameters: 0,
      experimentItemsParameterRequestForm: {
        experimentItemsParameterName: '',
        experimentalItem: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      experimentalItems: []
    }
  },
  methods: {
    loadExperimentalItemData () {
      let vm = this
      this.$ajax
        .get('/api/sample/experimentalItem/getExperimentalItem')
        .then(function (res) {
          vm.experimentalItems = res.data
        })
    },
    handleSizeChange (val) {
      this.experimentItemsParameterRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.experimentItemsParameterRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentItemsParameter/getExperimentItemsParameter')
        .then(function (res) {
          console.log('experimentItemsParameterMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/experimentItemsParameterDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/experimentItemsParameter/queryExperimentItemsParameter', this.experimentItemsParameterRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalExperimentItemsParameters = res.data.totalExperimentItemsParameters || 0
          console.log('totalDeparts is: ' + vm.totalExperimentItemsParameters)
        })
    },
    experimentalItemFormatter (row, column) {
      let name = ''
      this.experimentalItems.forEach(item => {
        if (row.experimentalItem === item.id) {
          name = item.experimentalItemName
        }
      })
      return name
    }
  },
  mounted () {
    this.onSubmit()
    this.loadExperimentalItemData()
  }

}
</script>
