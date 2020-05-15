    <template>
    <div>
      <el-collapse v-model="activeName">
        <el-collapse-item title="查询条件" name="1">
          <el-container style="padding: 10px">
          <el-form :model="agreementRequestForm" label-width="100px" label-position="left" size="mini">
            <el-row :gutter="20">
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
                  <el-select name="company" filterable clearable
                    default-first-option v-model="agreementRequestForm.customerCompany">
                    <el-option v-for="item in customerCompanyNames"
                      :key="item.id"
                      :label="item.customerCompanyName"
                      :value="item.customerCompanyName">
                    </el-option>
                    </el-select>
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
      </el-collapse-item>
      <el-collapse-item title="查询结果" name="2">
        <el-table id="out-table" :data="tableData" height="500" style="width: 100%" @row-dblclick="dblclick" size="mini"
          >
          <el-table-column
            prop="templateName"
            label="模板名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sampleName"
            label="样品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="materialNumber"
            label="材质牌号"
            width="120">
        </el-table-column>
          <el-table-column
            prop="customerCompany"
            label="委托单位"
            show-overflow-tooltip
            width="180">
        </el-table-column>
          <el-table-column
            prop="comment"
            label="其它信息"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block text-right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="agreementRequestForm.currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="50"
            layout="sizes, prev, pager, next"
            :total="totalAgreements">
          </el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'agreementTemplateMaintenance',
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
      customerCompanyNames: [],
      activeName: '2',
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    handleClick (id) {
      let vm = this
      if (id && id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete (id) {
      let vm = this
      this.$ajax.get('/api/sample/agreementTemplate/delete/' + id)
        .then(function (res) {
          vm.$message({
            type: 'success',
            message: '已经成功删除！'
          })
          vm.onSubmit()
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getCustomerCompanyNames () {
      let vm = this
      this.$ajax.get('/api/customer/customerCompany/getCustomerCompany')
        .then(function (res) {
          vm.customerCompanyNames = res.data || []
        })
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
      this.$router.push('/lims/agreementDetailNew/' + row.agreementId)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/agreementTemplate/queryAgreementTemplate', this.agreementRequestForm)
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
    processPriorityFormatter (row, column) {
      let name = ''
      this.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    }
  },
  activated () {
    this.loadProcessPriorityData()
    this.onSubmit()
    this.getCustomerCompanyNames()
  }
}
</script>
