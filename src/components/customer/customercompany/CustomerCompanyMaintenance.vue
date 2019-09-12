<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="customerCompanyRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="单位名称">
              <el-input name="customerCompanyName" v-model="customerCompanyRequestForm.customerCompanyName" autoComplete="customerCompanyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户姓名">
              <el-input name="name" v-model="customerCompanyRequestForm.name" autoComplete="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="手机号码">
              <el-input name="mobileNumber" v-model="customerCompanyRequestForm.mobileNumber" autoComplete="mobileNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="传真">
              <el-input name="fax" v-model="customerCompanyRequestForm.fax" autoComplete="fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="邮箱">
              <el-input name="email" v-model="customerCompanyRequestForm.email" autoComplete="email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="单位地址">
              <el-input name="address" v-model="customerCompanyRequestForm.address" autoComplete="address"></el-input>
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
          prop="customerCompanyName"
          label="单位名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobileNumber"
          label="手机号码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fax"
          label="传真"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="单位地址"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="customerCompanyRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalCustomerCompanys">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'customerCompanyMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      customerCompanyForm: {},
      tempCustomerCompanyForm: {},
      totalCustomerCompanys: 0,
      customerCompanyRequestForm: {
        customerCompanyName: '',
        name: '',
        mobileNumber: '',
        fax: '',
        email: '',
        address: '',
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
      this.customerCompanyRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.customerCompanyRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/customerCompanyDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/customer/customerCompany/queryCustomerCompany', this.customerCompanyRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalCustomerCompanys = res.data.totalCustomerCompanys || 0
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
        this.tempCustomerCompanyForm = this.tableData[(index - 1)]
        this.customerCompanyForm = this.tableData[index]
        tmp = this.tempCustomerCompanyForm.sort
        this.tempCustomerCompanyForm.sort = this.customerCompanyForm.sort
        this.customerCompanyForm.sort = tmp
        this.$ajax.all([this.update(this.customerCompanyForm), this.update(this.tempCustomerCompanyForm)])
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
        this.customerCompanyForm = this.tableData[index]
        this.$ajax.post('/api/customer/customerCompany/moveToTop', this.customerCompanyForm)
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
        this.tempCustomerCompanyForm = this.tableData[(index + 1)]
        this.customerCompanyForm = this.tableData[index]
        tmp = this.tempCustomerCompanyForm.sort
        this.tempCustomerCompanyForm.sort = this.customerCompanyForm.sort
        this.customerCompanyForm.sort = tmp
        this.$ajax.all([this.update(this.customerCompanyForm), this.update(this.tempCustomerCompanyForm)])
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
        this.customerCompanyForm = this.tableData[index]
        this.$ajax.post('/api/customer/customerCompany/moveToBottom', this.customerCompanyForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/customer/customerCompany', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/customer/customerCompany/queryCustomerCompany', this.customerCompanyRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalCustomerCompanys = res.data.totalCustomerCompanys || 0
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
