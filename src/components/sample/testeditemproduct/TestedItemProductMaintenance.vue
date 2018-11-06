<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目名称">
              <el-input name="testedItemProductName" v-model="testedItemProductForm.testedItemProductName" autoComplete="testedItemProductName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目">
              <el-select name="experimentalItem" filterable default-first-option v-model="testedItemProductForm.experimentalItem" @change="getCascadeItems">
                <el-option v-for="item in staticOptions.experimentalItems"
                  :key="item.id"
                  :label="item.experimentalItemName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目参数">
              <el-select name="experimentalItemsParameter" filterable default-first-option v-model="testedItemProductForm.experimentalItemsParameter">
                <el-option v-for="item in staticOptions.filteredExperimentalItemsParameters"
                  :key="item.id"
                  :label="item.experimentalItemsParameterName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测方法">
              <el-select name="experimentalMethod" filterable default-first-option v-model="testedItemProductForm.experimentalMethod">
                <el-option v-for="item in staticOptions.filteredExperimentalMethods"
                  :key="item.id"
                  :label="item.experimentalMethodName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="加工图号">
              <el-select name="drawingDesign" filterable default-first-option v-model="testedItemProductForm.drawingDesign">
                <el-option v-for="item in staticOptions.filteredDrawingDesigns"
                  :key="item.id"
                  :label="item.drawingDesignName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
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
          prop="testedItemProductName"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItem"
          label="检测项目"
          :formatter="experimentalItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalItemsParameter"
          label="检测项目参数"
          :formatter="experimentalItemsParameterFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="experimentalMethod"
          label="检测方法"
          :formatter="experimentalMethodFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="drawingDesign"
          label="加工图号"
          :formatter="drawingDesignFormatter"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemProductForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItemProducts">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testedItemProductMaintenance',
  data () {
    return {
      tableData: [],
      totalTestedItemProducts: 0,
      testedItemProductForm: {
        testedItemProductName: '',
        experimentalItem: '',
        experimentalItemsParameter: '',
        experimentalMethod: '',
        drawingDesign: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      staticOptions: {
        experimentalMethods: [],
        filteredExperimentalMethods: [],
        experimentalItemsParameters: [],
        filteredExperimentalItemsParameters: [],
        experimentalItems: [],
        drawingDesigns: [],
        filteredDrawingDesigns: []
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/testedItemProductDetailEdit/' + row.id)
    },
    getCascadeItems (itemId) {
      this.resetCascadeForms()
      this.getDrawingDesigns(itemId)
      this.getExperimentalMethod(itemId)
      this.getExperimentalItemsParameter(itemId)
    },
    resetCascadeForms () {
      this.testedItemProductForm.drawingDesign = ''
      this.testedItemProductForm.experimentalMethod = ''
      this.testedItemProductForm.experimentalItemsParameter = ''
    },
    getDrawingDesigns (experimentalItemId) {
      this.staticOptions.filteredDrawingDesigns =
        this.staticOptions.drawingDesigns.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalMethod (experimentalItemId) {
      this.staticOptions.filteredExperimentalMethods =
        this.staticOptions.experimentalMethods.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    getExperimentalItemsParameter (experimentalItemId) {
      this.staticOptions.filteredExperimentalItemsParameters =
        this.staticOptions.experimentalItemsParameters.filter(function (val) {
          return val.experimentalItem === experimentalItemId
        })
    },
    handleSizeChange (val) {
      this.testedItemProductForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testedItemProductForm.currentPage = val
      this.onSubmit()
    },
    // load all the testedItemProductes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProduct/queryTestedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadDrawingDesignData () {
      let vm = this
      this.$ajax.get('/api/sample/drawingDesign/getDrawingDesign')
        .then(function (res) {
          vm.staticOptions.drawingDesigns = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalItemData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItem/getExperimentalItem')
        .then(function (res) {
          vm.staticOptions.experimentalItems = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalMethodData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalMethod/getExperimentalMethod')
        .then(function (res) {
          vm.staticOptions.experimentalMethods = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadExperimentalItemsParameterData () {
      let vm = this
      this.$ajax.get('/api/sample/experimentalItemsParameter/getExperimentalItemsParameter')
        .then(function (res) {
          vm.staticOptions.experimentalItemsParameters = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.staticOptions.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    },
    experimentalItemFormatter (row, column) {
      let name = ''
      this.staticOptions.experimentalItems.forEach(item => {
        if (row.experimentalItem === item.id) {
          name = item.experimentalItemName
        }
      })
      return name
    },
    experimentalMethodFormatter (row, column) {
      let name = ''
      this.staticOptions.experimentalMethods.forEach(item => {
        if (row.experimentalMethod === item.id) {
          name = item.experimentalMethodName
        }
      })
      return name
    },
    experimentalItemsParameterFormatter (row, column) {
      let name = ''
      this.staticOptions.experimentalItemsParameters.forEach(item => {
        if (row.experimentalItemsParameter === item.id) {
          name = item.experimentalItemsParameterName
        }
      })
      return name
    }
  },
  mounted () {
    this.onSubmit()
    this.loadExperimentalMethodData()
    this.loadExperimentalItemData()
    this.loadDrawingDesignData()
    this.loadExperimentalItemsParameterData()
  }
}
</script>
