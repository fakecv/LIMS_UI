<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="templateFileRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件名称">
              <el-input name="fileName" v-model="templateFileRequestForm.fileName" autoComplete="fileName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件位置">
              <el-input name="location" v-model="templateFileRequestForm.location" autoComplete="location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件内容">
              <el-input name="content" v-model="templateFileRequestForm.content" autoComplete="content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件显示名称">
              <el-input name="displayName" v-model="templateFileRequestForm.displayName" autoComplete="displayName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文件下载链接">
              <el-input name="link" v-model="templateFileRequestForm.link" autoComplete="link"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="是否在列表中显示">
              <el-switch name="switch" v-model="templateFileRequestForm.show" autoComplete="show"></el-switch>
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
          prop="fileName"
          show-overflow-tooltip
          label="文件名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="location"
          label="文件位置"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          show-overflow-tooltip
          label="文件内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="displayName"
          label="文件显示名称"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="show"
          label="是否在列表中显示"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="templateFileRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTemplateFiles">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'templateFileMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      templateFileForm: {},
      tempTemplateFileForm: {},
      totalTemplateFiles: 0,
      templateFileRequestForm: {
        fileName: '',
        location: '',
        content: '',
        displayName: '',
        link: '',
        show: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    handleSizeChange (val) {
      this.templateFileRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.templateFileRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/templateFile/getTemplateFile')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/templateFileDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/templateFile/queryTemplateFile', this.templateFileRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTemplateFiles = res.data.totalTemplateFiles || 0
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
        this.tempTemplateFileForm = this.tableData[(index - 1)]
        this.templateFileForm = this.tableData[index]
        tmp = this.tempTemplateFileForm.sort
        this.tempTemplateFileForm.sort = this.templateFileForm.sort
        this.templateFileForm.sort = tmp
        this.$ajax.all([this.update(this.templateFileForm), this.update(this.tempTemplateFileForm)])
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
        this.templateFileForm = this.tableData[index]
        this.$ajax.post('/api/sample/templateFile/moveToTop', this.templateFileForm)
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
        this.tempTemplateFileForm = this.tableData[(index + 1)]
        this.templateFileForm = this.tableData[index]
        tmp = this.tempTemplateFileForm.sort
        this.tempTemplateFileForm.sort = this.templateFileForm.sort
        this.templateFileForm.sort = tmp
        this.$ajax.all([this.update(this.templateFileForm), this.update(this.tempTemplateFileForm)])
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
        this.templateFileForm = this.tableData[index]
        this.$ajax.post('/api/sample/templateFile/moveToBottom', this.templateFileForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/templateFile', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/templateFile/queryTemplateFile', this.templateFileRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTemplateFiles = res.data.totalTemplateFiles || 0
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
    }
  },
  mounted () {
    this.onSubmit()
  },
  activated () {
    this.onSubmit()
  }

}
</script>
