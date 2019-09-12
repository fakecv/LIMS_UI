<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="customerRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户姓名">
              <el-input name="customerName" v-model="customerRequestForm.customerName" autoComplete="customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="客户单位">
              <el-select name="companyId" filterable clearable default-first-option v-model="customerRequestForm.companyId">
                <el-option v-for="item in staticOptions.customerCompanies"
                  :key="item.id"
                  :label="item.customerCompanyName"
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
          prop="customerName"
          label="客户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="companyId"
          label="客户单位"
          :formatter="customerCompanyFormatter"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="customerRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalCustomers">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'customerMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      customerForm: {},
      tempCustomerForm: {},
      totalCustomers: 0,
      customerRequestForm: {
        customerName: '',
        companyId: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      staticOptions: {
        customerCompanies: []
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.customerRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.customerRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/customer/customer/getCustomer')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    loadCustomerCompanyData () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.staticOptions.customerCompanies = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/customerDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/customer/customer/queryCustomer', this.customerRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalCustomers = res.data.totalCustomers || 0
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
        this.tempCustomerForm = this.tableData[(index - 1)]
        this.customerForm = this.tableData[index]
        tmp = this.tempCustomerForm.sort
        this.tempCustomerForm.sort = this.customerForm.sort
        this.customerForm.sort = tmp
        this.$ajax.all([this.update(this.customerForm), this.update(this.tempCustomerForm)])
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
        this.customerForm = this.tableData[index]
        this.$ajax.post('/api/customer/customer/moveToTop', this.customerForm)
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
        this.tempCustomerForm = this.tableData[(index + 1)]
        this.customerForm = this.tableData[index]
        tmp = this.tempCustomerForm.sort
        this.tempCustomerForm.sort = this.customerForm.sort
        this.customerForm.sort = tmp
        this.$ajax.all([this.update(this.customerForm), this.update(this.tempCustomerForm)])
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
        this.customerForm = this.tableData[index]
        this.$ajax.post('/api/customer/customer/moveToBottom', this.customerForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/customer/customer', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/customer/customer/queryCustomer', this.customerRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalCustomers = res.data.totalCustomers || 0
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
    customerCompanyFormatter (row, column) {
      let name = ''
      this.staticOptions.customerCompanies.forEach(item => {
        if (row.companyId === item.id) {
          name = item.customerCompanyName
        }
      })
      return name
    }
  },
  activated () {
    this.onSubmit()
    this.loadCustomerCompanyData()
  }

}
</script>
