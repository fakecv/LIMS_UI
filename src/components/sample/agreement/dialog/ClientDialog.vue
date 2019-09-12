<template>
  <el-dialog title="客户列表" :visible.sync="customerDialogFormVisible" :modal-append-to-body="false">
    <el-container style="padding: 10px">
      <el-form :model="customerRequestForm" label-width="100px" label-position="left" size="mini">
      <el-row :gutter="20">
        <el-form-item label="客户单位">
          <el-input name="company" v-model="customerRequestForm.customerCompanyName" autoComplete="company"></el-input>
        </el-form-item>
      </el-row>
        <el-row :gutter="20">
          <el-form-item label="客户名称">
            <el-input name="name" v-model="customerRequestForm.name" autoComplete="name"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="reloadCustomerData">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table ref="customerTable" :data="customers" style="width: 100%"
      highlight-current-row
      @row-click="handleCustomerRowClick"
      @row-dblclick="handleCustomerRowDLClick"
      >
      <el-table-column prop="customerCompanyName" label="客户单位"
        show-overflow-tooltip
        width="180"></el-table-column>
      <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
      <el-table-column prop="mobileNumber" label="客户电话" width="180"></el-table-column>
      <el-table-column prop="address"
        show-overflow-tooltip
        label="通讯地址" width="180"></el-table-column>
      <el-table-column prop="email" label="客户邮箱" width="180"></el-table-column>
      <el-table-column prop="fax" label="客户传真" width="180"></el-table-column>
    </el-table>
    <div class="block text-right">
      <el-pagination
        @size-change="handleCustomerSizeChange"
        @current-change="handleCustomerCurrentChange"
        :current-page.sync="customerRequestForm.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        :total="totalCustomers">
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="customerDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="confirmCustomer">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'clientDialog',
  props: ['customerDialogFormVisible'],
  data () {
    return {
      customerRequestForm: {
        name: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      customers: [],
      totalCustomers: 0
    }
  },
  methods: {
    confirmCustomer () {
      this.$emit('confirmCustomer')
    },
    reloadCustomerData () {
      let vm = this
      this.$ajax.post('/api/customer/customerCompany/queryCustomerCompany', this.customerRequestForm)
        .then(function (res) {
          vm.customers = res.data.pageResult || []
          vm.totalCustomers = res.data.totalCustomers || 0
        })
    },
    initCustomerData () {
      let vm = this
      this.$ajax.post('/api/customer/customerCompany/queryCustomerCompany', this.customerRequestForm)
        .then(function (res) {
          vm.customers = res.data.pageResult || []
          vm.totalCustomers = res.data.totalCustomers || 0
        })
    },
    handleCustomerSizeChange (val) {
      this.customerRequestForm.itemsPerPage = val
      this.reloadCustomerData()
    },
    handleCustomerCurrentChange () {
      this.reloadCustomerData()
    },
    handleCustomerRowClick (row, event, column) {
      this.$emit('handleCustomerRowClick', row)
    },
    handleCustomerRowDLClick (row, event, column) {
      this.$emit('handleCustomerRowDLClick', row)
    }
  },
  mounted () {
    this.initCustomerData()
  }
}
</script>
<style>

</style>
