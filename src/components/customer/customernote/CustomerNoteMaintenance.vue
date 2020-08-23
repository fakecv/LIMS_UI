<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="customerNoteForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="客户单位">
              <el-select name="customerCompany" filterable clearable default-first-option v-model="customerNoteForm.customerCompany">
                <el-option v-for="item in staticOptions.customerCompanies"
                  :key="item.id"
                  :label="item.customerCompanyName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户样品备注信息名称" label-width="160px">
              <el-input name="customerNoteName" v-model="customerNoteForm.customerNoteName" autoComplete="customerNoteName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户样品备注信息" label-width="160px">
              <el-input name="customerNote" v-model="customerNoteForm.customerNote" autoComplete="customerNote"></el-input>
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
    <el-table :data="tableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="customerCompany"
          label="客户单位"
          :formatter="customerCompanyFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="customerNoteName"
          label="客户样品备注信息名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="customerNoteDescription"
          label="客户样品备注信息"
          show-overflow-tooltip
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="customerNoteForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalCustomerNotes">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'customerNoteMaintenance',
  data () {
    return {
      tableData: [],
      totalCustomerNotes: 0,
      customerNoteForm: {
        customerCompany: '',
        customerNoteName: '',
        customerNoteDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
      staticOptions: {
        customerCompanies: []
      }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/customerNoteDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.customerNoteForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.customerNoteForm.currentPage = val
      this.onSubmit()
    },
    loadCustomerCompanyData () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.staticOptions.customerCompanies = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    // load all the customerNotees
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/customer/customerNote/queryCustomerNote', this.customerNoteForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalCustomerNotes = res.data.totalCustomerNotes || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    customerCompanyFormatter (row, column) {
      let name = ''
      this.staticOptions.customerCompanies.forEach(item => {
        if (row.customerCompany === item.id) {
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
