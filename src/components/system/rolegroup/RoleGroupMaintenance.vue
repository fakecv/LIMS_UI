    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="userRoleGroupRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="角色组名称">
              <el-input name="userRoleGroupName" v-model="userRoleGroupRequestForm.userRoleGroupName"></el-input>
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
          prop="userRoleGroupName"
          label="角色组名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userRoleGroupDescription"
          label="角色组描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="userRoleGroupRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalUserRoleGroups">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'roleGroupMaintenance',
  data () {
    return {
      tableData: [],
      totalUserRoleGroups: 0,
      userRoleGroupRequestForm: {
        id: '',
        userRoleGroupName: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.roleGroupRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.roleGroupRequestForm.currentPage = val
      this.onSubmit()
    },
    dblclick (row, event) {
      this.$router.push('/lims/roleGroupDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/roleGroup/queryUserRoleGroup', this.userRoleGroupRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUserRoleGroups = res.data.totalUserRoleGroups || 0
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
