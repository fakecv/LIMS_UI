<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="wangxingangForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="设备名称">
              <el-input name="wangxingangName" v-model="wangxingangForm.wangxingangName" autoComplete="wangxingangName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="批准人">
              <el-input name="sort" v-model="wangxingangForm.sort" autoComplete="sort"></el-input>
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
          prop="wangxingangName"
          label="设备名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="批准人"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="wangxingangRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalWangxingangs">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'wangxingangMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      wangxingangForm: {},
      tempWangxingangForm: {},
      totalWangxingangs: 0,
      wangxingangRequestForm: {
        wangxingangName: '',
        sort: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    handleSizeChange (val) {
      this.wangxingangRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.wangxingangRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/wangxingang/getWangxingang')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/wangxingangDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/wangxingang/queryWangxingang', this.wangxingangRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalWangxingangs = res.data.totalWangxingangs || 0
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
        this.tempWangxingangForm = this.tableData[(index - 1)]
        this.wangxingangForm = this.tableData[index]
        tmp = this.tempWangxingangForm.sort
        this.tempWangxingangForm.sort = this.wangxingangForm.sort
        this.wangxingangForm.sort = tmp
        this.$ajax.all([this.update(this.wangxingangForm), this.update(this.tempWangxingangForm)])
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
        this.wangxingangForm = this.tableData[index]
        this.$ajax.post('/api/equipment/wangxingang/moveToTop', this.wangxingangForm)
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
        this.tempWangxingangForm = this.tableData[(index + 1)]
        this.wangxingangForm = this.tableData[index]
        tmp = this.tempWangxingangForm.sort
        this.tempWangxingangForm.sort = this.wangxingangForm.sort
        this.wangxingangForm.sort = tmp
        this.$ajax.all([this.update(this.wangxingangForm), this.update(this.tempWangxingangForm)])
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
        this.wangxingangForm = this.tableData[index]
        this.$ajax.post('/api/equipment/wangxingang/moveToBottom', this.wangxingangForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/wangxingang', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/wangxingang/queryWangxingang', this.wangxingangRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalWangxingangs = res.data.totalWangxingangs || 0
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
  }

}
</script>
