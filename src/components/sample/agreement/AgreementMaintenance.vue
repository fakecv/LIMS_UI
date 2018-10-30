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
            <el-form-item label="样品名称">
              <el-input name="sampleName" v-model="agreementRequestForm.sampleName"></el-input>
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
          prop="agreementNumber"
          label="委托编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sampleName"
          label="样品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="receiveSampleTime"
          label="样品接收时间"
          :formatter="receiveSampleTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="expectedCompletionTime"
          label="要求完成时间"
          :formatter="expectedCompletionTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="其他信息"
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
export default {
  name: 'agreementMaintenance',
  data () {
    return {
      tableData: [],
      totalAgreements: 0,
      agreementRequestForm: {
        agreementNumber: '',
        done: 'false',
        sampleName: '',
        experimentalCategory: [],
        itemsPerPage: 20,
        currentPage: 1
      },
      experimentalMethods: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
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
    }

  },
  mounted () {
    this.onSubmit()
  }

}
</script>
