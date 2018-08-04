    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="userRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="部门名称">
              <el-input name="userName" v-model="userRequestForm.userName"></el-input>
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
          prop="userName"
          label="部门名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userDescription"
          label="部门描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="userRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalUsers">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'userMaintenance',
  data () {
    return {
      tableData: [],
      totalUsers: 0,
      userRequestForm: {
        userName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.userRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.userRequestForm.currentPage = val
      this.onSubmit()
    },
    dblclick (row, event) {
      this.$router.push('/lims/userDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/security/user/queryUser', this.userRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUsers = res.data.totalUsers || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
