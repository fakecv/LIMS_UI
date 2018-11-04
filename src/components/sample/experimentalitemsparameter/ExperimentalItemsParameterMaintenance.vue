    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="experimentalItemsParameterRequestForm" label-width="150px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="experimentalItem" filterable default-first-option v-model="experimentalItemsParameterRequestForm.experimentalItem">
                <el-option v-for="item in experimentalItems"
                  :key="item.Id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="检测项目参数名称">
              <el-input name="experimentalItemsParameterName" v-model="experimentalItemsParameterRequestForm.experimentalItemsParameterName"></el-input>
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
          prop="experimentalItemsParameterName"
          :formatter="experimentalItemFormatter"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItemsParameterName"
          label="检测项目参数名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItemsParameterDescription"
          label="检测项目参数描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="experimentalItemsParameterRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalExperimentalItemsParameters">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'experimentalItemsParameterMaintenance',
  data () {
    return {
      tableData: [],
      totalExperimentalItemsParameters: 0,
      experimentalItemsParameterRequestForm: {
        experimentalItemsParameterName: '',
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
      this.experimentalItemsParameterRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.experimentalItemsParameterRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItemsParameter/getExperimentalItemsParameter')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/experimentalItemsParameterDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/experimentalItemsParameter/queryExperimentalItemsParameter', this.experimentalItemsParameterRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalExperimentalItemsParameters = res.data.totalExperimentalItemsParameters || 0
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
