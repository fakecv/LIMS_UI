    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="customerRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-form-item label="客户单位">
            <el-input name="name" v-model="customerRequestForm.company" autoComplete="company"></el-input>
          </el-form-item>
        </el-row>
          <el-row :gutter="20">
            <el-form-item label="客户名称">
              <el-input name="name" v-model="customerRequestForm.name"></el-input>
            </el-form-item>
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
          prop="company"
          label="客户单位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobileNumber"
          label="客户电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="客户地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="客户邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fax"
          label="客户传真"
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
      totalCustomers: 0,
      customerRequestForm: {
        name: '',
        itemsPerPage: 20,
        currentPage: 1
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
      this.$ajax.get('/api/customer/getCustomer')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/customerDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/customer/queryCustomer', this.customerRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalCustomers = res.data.totalCustomers || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
