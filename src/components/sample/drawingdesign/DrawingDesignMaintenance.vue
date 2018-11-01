    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="drawingDesignRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="experimentalItem" filterable default-first-option v-model="drawingDesignRequestForm.experimentalItem">
                <el-option v-for="item in experimentalItems"
                  :key="item.Id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
          </el-form-item>
            <el-form-item label="图纸名称">
              <el-input name="drawingDesignName" v-model="drawingDesignRequestForm.drawingDesignName"></el-input>
            </el-form-item>
            <el-form-item label="图纸编号">
              <el-input name="drawingDesignNumber" v-model="drawingDesignRequestForm.drawingDesignNumber"></el-input>
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
          prop="drawingDesignName"
          label="图纸名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="drawingDesignNumber"
          label="图纸编号"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="drawingDesignRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalDrawingDesigns">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'drawingDesignMaintenance',
  data () {
    return {
      tableData: [],
      totalDrawingDesigns: 0,
      drawingDesignRequestForm: {
        experimentalItem: '',
        drawingDesignName: '',
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
      this.drawingDesignRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.drawingDesignRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/drawingDesignDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/drawingDesign/queryDrawingDesign', this.drawingDesignRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalDrawingDesigns = res.data.totalDrawingDesigns || 0
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
