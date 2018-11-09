<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductGroupForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="组名称">
              <el-input name="testedItemProductGroupName" v-model="testedItemProductGroupForm.testedItemProductGroupName" autoComplete="testedItemProductGroupName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组描述">
              <el-input type="textarea" name="testedItemProductGroupDescription" v-model="testedItemProductGroupForm.testedItemProductGroupDescription" autoComplete="testedItemProductGroupDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="检测项目">
            <button type="button" size='mini' class="btn btn-secondary" @click="addTestedItemProducts">添加检测项目</button>
            <button type="button" class="btn btn-secondary" @click="deleteTestedItemProducts">删除检测项目</button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <div>
      <el-table :data="staticOptions.selectedTestedItemProducts" style="width: 100%" @selection-change="handleTestedItemProductChange">
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
    </div>
    <el-dialog title="角色列表" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
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
              <el-select name="experimentalItem" filterable clearable default-first-option v-model="testedItemProductForm.experimentalItem" @change="getCascadeItems">
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
            <el-button type="primary" @click="reloadTestedItemProducts">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table ref="testedItemProductTable" :data="staticOptions.testedItemProducts" style="width: 100%" @select="handleSelect">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          :total="staticOptions.totalTestedItemProducts">
        </el-pagination>
      </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="updateTestedItemProducts">确 定</el-button>
        </div>
    </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'testedItemProductGroupDetail',
  props: ['testedItemProductGroupForm', 'staticOptions'],
  data () {
    return {
      testedItemProductForm: {
        testedItemProductName: '',
        experimentalItem: '',
        itemsPerPage: 20,
        currentPage: 1,
        experimentalItemsParameter: '',
        experimentalMethod: '',
        drawingDesign: '',
        id: ''
      },
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '4', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '5', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '7', 'icon': 'el-icon-download', 'loading': false}
      ],
      multipleSelection: [],
      deletedTestedItemProducts: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      dialogFormVisible: false
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
        this.$message('复制成功!')
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.confirmDelete()
      } else if (action.id === '6') {
      } else if (action.id === '7') {
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProductGroup', this.testedItemProductGroupForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updatetestedItemProductGroupForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    confirmDelete () {
      let vm = this
      if (this.testedItemProductGroupForm.id && this.testedItemProductGroupForm.id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/testedItemProductGroup/delete/' + this.testedItemProductGroupForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deletetestedItemProductGroupForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    addTestedItemProducts () {
      let vm = this
      this.dialogFormVisible = true
      this.$nextTick(() => {
        vm.$refs.testedItemProductTable.clearSelection()
        vm.staticOptions.testedItemProducts.forEach(row => {
          if (vm.testedItemProductGroupForm.testedItemProducts && vm.testedItemProductGroupForm.testedItemProducts.indexOf(row.id) !== -1) {
            vm.$refs.testedItemProductTable.toggleRowSelection(row, true)
          }
        })
      })
    },
    deleteTestedItemProducts () {
      this.$emit('deleteTestedItemProducts', this.deletedTestedItemProducts)
    },
    handleCurrentChange (val) {
      this.testedItemProductForm.currentPage = val
      this.$emit('reloadTestedItemProducts', this.testedItemProductForm)
    },
    handleSelect (selection, row) {
      console.log('handleSelect')
      this.$emit('updateTestedItemProducts', row.id)
    },
    handleSizeChange (val) {
      this.testedItemProductForm.itemsPerPage = val
      this.$emit('reloadTestedItemProducts', this.testedItemProductForm)
    },
    handleTestedItemProductChange (val) {
      console.log('handleTestedItemProductChange')
      this.deletedTestedItemProducts = val
    },
    reloadTestedItemProducts () {
      this.$emit('reloadTestedItemProducts', this.testedItemProductForm)
    },
    updateTestedItemProducts () {
      this.dialogFormVisible = false
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
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
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
    this.loadExperimentalMethodData()
    this.loadExperimentalItemData()
    this.loadDrawingDesignData()
    this.loadExperimentalItemsParameterData()
  }
}
</script>
<style lang="less">
</style>
