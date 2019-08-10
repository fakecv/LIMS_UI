    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="drawingDesignRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="检测项目名称">
              <el-select name="testedItem" filterable clearable default-first-option v-model="drawingDesignRequestForm.testedItem">
                <el-option v-for="item in testedItems"
                  :key="item.Id"
                  :label="item.testedItemName"
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
      <el-row type="flex" justify="end">
        <el-button-group size="mini">
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveTop">置顶</el-button>
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveUp">上移</el-button>
          <el-button type="primary" @click.native="moveDown">下移<i class="el-icon-arrow-down"></i></el-button>
          <el-button type="primary" @click.native="moveBottom">置底<i class="el-icon-arrow-down"></i></el-button>
        </el-button-group>
      </el-row>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      @row-dblclick=dblclick
      @selection-change="handleSelectionChange"
      @select="handleSelection">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="testedItem"
          label="检测项目名称"
          :formatter="testedItemFormatter"
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
      indexArray: [],
      drawingDesignForm: {},
      tempDrawingDesignForm: {},
      totalDrawingDesigns: 0,
      drawingDesignRequestForm: {
        testedItem: '',
        drawingDesignName: '',
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
    handleSelection (selection, row) {
      if (selection.indexOf(row) > 0) {
        selection.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item)
        })
      }
    },
    handleSelectionChange (selection) {
      let vm = this
      this.indexArray = []
      selection.forEach(item => {
        vm.indexArray.push(vm.tableData.indexOf(item))
      })
    },
    moveUp () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveUpSingle(item)
      })
    },
    moveTop () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveTopSingle(item)
      })
    },
    moveUpSingle (index) {
      let vm = this
      let tmp = ''
      if (index > 0) {
        this.tempDrawingDesignForm = this.tableData[(index - 1)]
        this.drawingDesignForm = this.tableData[index]
        tmp = this.tempDrawingDesignForm.sort
        this.tempDrawingDesignForm.sort = this.drawingDesignForm.sort
        this.drawingDesignForm.sort = tmp
        this.$ajax.all([this.update(this.drawingDesignForm), this.update(this.tempDrawingDesignForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      if (index > 0) {
        this.drawingDesignForm = this.tableData[index]
        this.$ajax.post('/api/sample/drawingDesign/moveToTop', this.drawingDesignForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveDown () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveDownSingle(item)
      })
    },
    moveBottom () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveBottomSingle(item)
      })
    },
    moveDownSingle (index) {
      let vm = this
      let tmp = ''
      if (index < this.tableData.length - 1) {
        this.tempDrawingDesignForm = this.tableData[(index + 1)]
        this.drawingDesignForm = this.tableData[index]
        tmp = this.tempDrawingDesignForm.sort
        this.tempDrawingDesignForm.sort = this.drawingDesignForm.sort
        this.drawingDesignForm.sort = tmp
        this.$ajax.all([this.update(this.drawingDesignForm), this.update(this.tempDrawingDesignForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      if (index < this.tableData.length - 1) {
        this.drawingDesignForm = this.tableData[index]
        this.$ajax.post('/api/sample/drawingDesign/moveToBottom', this.drawingDesignForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/drawingDesign', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/drawingDesign/queryDrawingDesign', this.drawingDesignRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalDrawingDesigns = res.data.totalDrawingDesigns || 0
          vm.$nextTick(() => {
            vm.tableData.forEach(row => {
              if (row.id === val.id) {
                vm.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          })
        }).catch(function (error) {
          vm.$message(error.response.data.message)
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
  },
  activated () {
    this.onSubmit()
  }

}
</script>
