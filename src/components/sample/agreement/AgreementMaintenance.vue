    <template>
    <div>
      <el-container style="padding: 10px">
      <el-form :model="agreementRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="委托编号">
              <el-input name="agreementNumber" v-model="agreementRequestForm.agreementNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="完成状态">
              <el-select name="done" clearable v-model="agreementRequestForm.done">
               <el-option label="未完成" value="false"></el-option>
               <el-option label="已完成" value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="材质牌号">
              <el-input name="materialNumber" v-model="agreementRequestForm.materialNumber" autoComplete="materialNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="样品名称">
              <el-input name="sampleName" v-model="agreementRequestForm.sampleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="客户单位">
              <el-input name="company" v-model="agreementRequestForm.customerCompany"></el-input>
            </el-form-item>
          </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="其它信息">
                <el-input name="comment" v-model="agreementRequestForm.comment"></el-input>
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
    <div class="block text-right">
      <!-- <el-button type="primary" icon="el-icon-download" circle @click="exportExcel">导出</el-button> -->
      <el-button type="primary" icon="el-icon-download" circle @click="exportSettlementList">导出结算清单</el-button>
    </div>
      <el-table id="out-table" :data="tableData" height="500" style="width: 100%" @row-dblclick=dblclick :row-style="agreementTableStyle"
      @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="agreementNumber"
          label="委托编号"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampleName"
          label="样品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processPriority"
          label="优先级"
          width="80">
      </el-table-column>
        <el-table-column
          prop="materialNumber"
          label="材质牌号"
          width="180">
      </el-table-column>
        <el-table-column
          prop="customerCompany"
          label="委托单位"
          show-overflow-tooltip
          width="180">
      </el-table-column>
        <el-table-column
          prop="receiveSampleTime"
          label="样品接收时间"
          sortable
          :formatter="receiveSampleTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="expectedCompletionTime"
          label="要求完成时间"
          sortable
          :formatter="expectedCompletionTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="其它信息"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="done"
          label="完成状态"
          :formatter="doneFormatter"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="agreementRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalAgreements">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'agreementMaintenance',
  data () {
    return {
      tableData: [],
      agreementIds: [],
      totalAgreements: 0,
      agreementRequestForm: {
        agreementNumber: '',
        done: 'false',
        sampleName: '',
        company: '',
        experimentalCategory: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      processPriorities: [],
      customers: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '委托协议.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    handleSelectionChange (val) {
      this.agreementIds = []
      val.forEach(element => {
        this.agreementIds.push(element.id)
      })
    },
    exportSettlementList () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/downloadExportSettlementList/' + this.agreementIds.join(','), {responseType: 'blob'})
        .then(function (res) {
          if (!res.data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([res.data]), {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '结算清单.xlsx')

          document.body.appendChild(link)
          link.click()
        }
        ).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    agreementTableStyle ({row, rowIndex}) {
      let backgroundColor = '#FFFFFF'
      let color = '#000000'
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.processPriorityName) {
          backgroundColor = item.processPriorityColor
          color = item.processPriorityFontColor
        }
      })
      return 'background: ' + backgroundColor + ';color: ' + color
    },
    handleSizeChange (val) {
      this.agreementRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.agreementRequestForm.currentPage = val
      this.onSubmit()
    },
    dblclick (row, event) {
      this.$router.push('/lims/agreementDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      if (this.$store.state.maintenanceParameters['agreementRequestForm']) {
        this.agreementRequestForm = this.$store.state.maintenanceParameters['agreementRequestForm']
      }
      this.$ajax.post('/api/sample/agreement/queryAgreement', this.agreementRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalAgreements = res.data.totalAgreements || 0
        })
    },
    receiveSampleTimeFormatter (row, column) {
      if (row.receiveSampleTime) {
        let dateTT = new Date(row.receiveSampleTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    doneFormatter (row, column) {
      if (row.done === 'true') {
        return '已完成'
      } else {
        return '未完成'
      }
    },
    loadProcessPriorityData () {
      let vm = this
      this.$ajax.get('/api/sample/processPriority/getProcessPriority')
        .then(function (res) {
          vm.processPriorities = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    loadCustomerData () {
      let vm = this
      this.$ajax.get('/api/customer/getCustomer')
        .then(function (res) {
          vm.customers = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    processPriorityFormatter (row, column) {
      let name = ''
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    },
    customerFormatter (row, column) {
      let name = ''
      this.customers.forEach(item => {
        if (row.customerId === item.id) {
          name = item.company
        }
      })
      return name
    }
  },
  mounted () {
    this.loadProcessPriorityData()
    this.loadCustomerData()
    this.onSubmit()
  }

}
</script>
