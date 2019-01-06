<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="providerForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商/服务商名称">
              <el-input name="providerName" v-model="providerForm.providerName" autoComplete="providerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="序号">
              <el-input name="sort" v-model="providerForm.sort" autoComplete="sort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商/服务商地址">
              <el-input name="providerAddress" v-model="providerForm.providerAddress" autoComplete="providerAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商/服务商联系电话">
              <el-input name="providerMobile" v-model="providerForm.providerMobile" autoComplete="providerMobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="类别">
              <el-radio-group v-model="providerForm.providerType">
                <el-radio label="OPTIONS">选项</el-radio>
                <el-radio label="LINK">链接</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应产品">
              <el-input name="product" v-model="providerForm.product" autoComplete="product"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="服务">
              <el-input name="service" v-model="providerForm.service" autoComplete="service"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="列入时间">
              <el-date-picker type="datetime" placeholder="请选择列入时间" default-time="12:00:00" v-model="providerForm.inclusionDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="备注">
              <el-input name="note" v-model="providerForm.note" autoComplete="note"></el-input>
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
          prop="providerName"
          label="供应商/服务商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="providerAddress"
          label="供应商/服务商地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="providerMobile"
          label="供应商/服务商联系电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="providerType"
          label="类别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="product"
          label="供应产品"
          width="180">
        </el-table-column>
        <el-table-column
          prop="service"
          label="服务"
          width="180">
        </el-table-column>
        <el-table-column
          prop="inclusionDate"
          label="列入时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="providerRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalProviders">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'providerMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      providerForm: {},
      tempProviderForm: {},
      totalProviders: 0,
      providerRequestForm: {
        providerName: '',
        sort: '',
        providerAddress: '',
        providerMobile: '',
        providerType: '',
        product: '',
        service: '',
        inclusionDate: '',
        note: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    handleSizeChange (val) {
      this.providerRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.providerRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/provider/getProvider')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/providerDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/provider/queryProvider', this.providerRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProviders = res.data.totalProviders || 0
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
        this.tempProviderForm = this.tableData[(index - 1)]
        this.providerForm = this.tableData[index]
        tmp = this.tempProviderForm.sort
        this.tempProviderForm.sort = this.providerForm.sort
        this.providerForm.sort = tmp
        this.$ajax.all([this.update(this.providerForm), this.update(this.tempProviderForm)])
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
        this.providerForm = this.tableData[index]
        this.$ajax.post('/api/equipment/provider/moveToTop', this.providerForm)
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
        this.tempProviderForm = this.tableData[(index + 1)]
        this.providerForm = this.tableData[index]
        tmp = this.tempProviderForm.sort
        this.tempProviderForm.sort = this.providerForm.sort
        this.providerForm.sort = tmp
        this.$ajax.all([this.update(this.providerForm), this.update(this.tempProviderForm)])
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
        this.providerForm = this.tableData[index]
        this.$ajax.post('/api/equipment/provider/moveToBottom', this.providerForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/provider', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/provider/queryProvider', this.providerRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProviders = res.data.totalProviders || 0
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
