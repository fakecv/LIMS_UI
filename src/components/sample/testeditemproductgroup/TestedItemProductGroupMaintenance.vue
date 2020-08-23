<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductGroupRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="组名称">
              <el-input name="testedItemProductGroupName" v-model="testedItemProductGroupRequestForm.testedItemProductGroupName" autoComplete="testedItemProductGroupName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="组描述">
              <el-input name="testedItemProductGroupDescription" v-model="testedItemProductGroupRequestForm.testedItemProductGroupDescription" autoComplete="testedItemProductGroupDescription"></el-input>
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
          prop="testedItemProductGroupName"
          label="组名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemProductGroupDescription"
          label="组描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemProductGroupRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItemProductGroups">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testedItemProductGroupMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      totalTestedItemProductGroups: 0,
      testedItemProductGroupRequestForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemProductGroupForm: {},
      tempTestedItemProductGroupForm: {},
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/testedItemProductGroupDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.testedItemProductGroupRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testedItemProductGroupRequestForm.currentPage = val
      this.onSubmit()
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
        this.tempTestedItemProductGroupForm = this.tableData[(index - 1)]
        this.testedItemProductGroupForm = this.tableData[index]
        tmp = this.tempTestedItemProductGroupForm.sort
        this.tempTestedItemProductGroupForm.sort = this.testedItemProductGroupForm.sort
        this.testedItemProductGroupForm.sort = tmp
        this.$ajax.all([this.update(this.testedItemProductGroupForm), this.update(this.tempTestedItemProductGroupForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      if (index > 0) {
        this.testedItemProductGroupForm = this.tableData[index]
        this.$ajax.post('/api/sample/testedItemProductGroup/moveToTop', this.testedItemProductGroupForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
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
        this.tempTestedItemProductGroupForm = this.tableData[(index + 1)]
        this.testedItemProductGroupForm = this.tableData[index]
        tmp = this.tempTestedItemProductGroupForm.sort
        this.tempTestedItemProductGroupForm.sort = this.testedItemProductGroupForm.sort
        this.testedItemProductGroupForm.sort = tmp
        this.$ajax.all([this.update(this.testedItemProductGroupForm), this.update(this.tempTestedItemProductGroupForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      if (index < this.tableData.length - 1) {
        this.testedItemProductGroupForm = this.tableData[index]
        this.$ajax.post('/api/sample/testedItemProductGroup/moveToBottom', this.testedItemProductGroupForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/testedItemProductGroup', val)
    },
    reload (val) {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProductGroup/queryTestedItemProductGroup', this.testedItemProductGroupRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItemProductGroups = res.data.totalTestedItemProductGroups || 0
          vm.$nextTick(() => {
            vm.tableData.forEach(row => {
              if (row.id === val.id) {
                vm.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          })
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    // load all the testedItemProductGroupes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProductGroup/queryTestedItemProductGroup', this.testedItemProductGroupRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItemProductGroups = res.data.totalTestedItemProductGroups || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    }
  },
  activated () {
    this.onSubmit()
  }
}
</script>
