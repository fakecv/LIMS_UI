<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="tokyoRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-row  :gutter="20">
            <el-form-item label="Name">
              <el-input name="var1" v-model="tokyoRequestForm.var1" placeholder="Please input name" autoComplete="var1"></el-input>
            </el-form-item>
          </el-row>
          <el-row  :gutter="20">
            <el-form-item label="title">
              <el-input name="var2" v-model="tokyoRequestForm.var2" placeholder="please input title" autoComplete="var2"></el-input>
            </el-form-item>
          </el-row>
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
          prop="var1"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="var2"
          label="title"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="tokyoRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTokyos">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'tokyoMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      tokyoForm: {},
      tempTokyoForm: {},
      totalTokyos: 0,
      tokyoRequestForm: {
        var1: '',
        var2: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      staticOptions: {
        types: []
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.tokyoRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.tokyoRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/tokyo/getTokyo')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/tokyoDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/tokyo/queryTokyo', this.tokyoRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTokyos = res.data.totalTokyos || 0
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
        this.tempTokyoForm = this.tableData[(index - 1)]
        this.tokyoForm = this.tableData[index]
        tmp = this.tempTokyoForm.sort
        this.tempTokyoForm.sort = this.tokyoForm.sort
        this.tokyoForm.sort = tmp
        this.$ajax.all([this.update(this.tokyoForm), this.update(this.tempTokyoForm)])
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
        this.tokyoForm = this.tableData[index]
        this.$ajax.post('/api/sample/tokyo/moveToTop', this.tokyoForm)
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
        this.tempTokyoForm = this.tableData[(index + 1)]
        this.tokyoForm = this.tableData[index]
        tmp = this.tempTokyoForm.sort
        this.tempTokyoForm.sort = this.tokyoForm.sort
        this.tokyoForm.sort = tmp
        this.$ajax.all([this.update(this.tokyoForm), this.update(this.tempTokyoForm)])
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
        this.tokyoForm = this.tableData[index]
        this.$ajax.post('/api/sample/tokyo/moveToBottom', this.tokyoForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/sample/tokyo', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/sample/tokyo/queryTokyo', this.tokyoRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTokyos = res.data.totalTokyos || 0
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
  activated () {
    this.onSubmit()
  }

}
</script>
