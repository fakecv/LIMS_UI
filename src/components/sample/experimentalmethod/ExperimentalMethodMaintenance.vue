    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="experimentalMethodRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="experimentalItem" filterable default-first-option v-model="experimentalMethodRequestForm.experimentalItem">
                <el-option v-for="item in experimentalItems"
                  :key="item.Id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="实验方法编号">
              <el-input name="experimentalMethodName" v-model="experimentalMethodRequestForm.experimentalMethodName"></el-input>
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
          prop="experimentalItem"
          label="检测项目名称"
          :formatter="experimentalItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalMethodName"
          label="实验方法编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalMethodNumber"
          label="实验方法描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="experimentalMethodRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalExperimentalMethods">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'experimentalMethodMaintenance',
  data () {
    return {
      tableData: [],
      totalExperimentalMethods: 0,
      experimentalMethodRequestForm: {
        experimentalMethodName: '',
        experimentalMethodNumber: '',
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
      this.experimentalMethodRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.experimentalMethodRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          console.log('experimentalMethodMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/experimentalMethodDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/experimentalMethod/queryExperimentalMethod', this.experimentalMethodRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalExperimentalMethods = res.data.totalExperimentalMethods || 0
          console.log('totalDeparts is: ' + vm.totalExperimentalMethods)
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
